"use client";
import React, { useEffect, useRef } from 'react';

let PhaserLib = null;

export default function PhaserBattle({ actionTrigger }) {
  const containerRef = useRef(null);
  const gameRef      = useRef(null);

  // ── Boot ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    let destroyed = false;

    const boot = async () => {
      if (!PhaserLib) PhaserLib = (await import('phaser')).default;
      const Phaser = PhaserLib;
      if (!containerRef.current || destroyed) return;

      const rect = containerRef.current.getBoundingClientRect();
      const W = Math.max(rect.width  || 0, window.innerWidth  || 800);
      const H = Math.max(rect.height || 0, window.innerHeight || 500);

      // ════════════════════════════════════════════════════════════════════
      // BATTLE SCENE
      // ════════════════════════════════════════════════════════════════════
      class BattleScene extends Phaser.Scene {
        constructor() { super({ key: 'BattleScene' }); }

        preload() {
          this.load.on('loaderror', () => {});
          this.load.spritesheet('hero', '/assets/hero_walk.png', { frameWidth: 32, frameHeight: 48 });
          this.load.image('forest_bg', '/assets/scenery/forest_bg.png');
        }

        create() {
          const { width, height } = this.cameras.main;
          this.W = width;
          this.H = height;
          this.busy = false; // prevent animation overlap

          // ── Background ────────────────────────────────────────────────
          if (this.textures.exists('forest_bg')) {
            const bg = this.add.image(width / 2, height / 2, 'forest_bg');
            const sc = Math.max(width / bg.width, height / bg.height);
            bg.setScale(sc).setAlpha(0.75);
          }

          const groundY = height * 0.72;
          this.groundY = groundY;

          // ── Animated star particles ───────────────────────────────────
          for (let i = 0; i < 25; i++) {
            const star = this.add.circle(
              Phaser.Math.Between(0, width), Phaser.Math.Between(0, height * 0.6),
              Phaser.Math.Between(1, 2), 0xffffff, Phaser.Math.FloatBetween(0.1, 0.4)
            );
            this.tweens.add({ targets: star, alpha: { from: 0.1, to: 0.5 }, duration: Phaser.Math.Between(800, 2500), yoyo: true, repeat: -1 });
          }

          // ── Arena ground glow ─────────────────────────────────────────
          const glow = this.add.ellipse(width / 2, groundY + 20, width * 0.8, 60, 0x00ffcc, 0.07);
          this.tweens.add({ targets: glow, scaleX: 1.05, duration: 1500, yoyo: true, repeat: -1 });

          // ── Sprites ───────────────────────────────────────────────────
          const heroExists = this.textures.exists('hero');

          // Create animations (once)
          if (heroExists && !this.anims.exists('hero_idle')) {
            this.anims.create({ key: 'hero_idle',  frames: [{ key: 'hero', frame: 4 }], frameRate: 1 });
            this.anims.create({ key: 'hero_run_r', frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }), frameRate: 12, repeat: -1 });
            this.anims.create({ key: 'hero_run_l', frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }), frameRate: 12, repeat: -1 });
          }

          this.heroSpr = heroExists
            ? this.add.sprite(width * 0.22, groundY, 'hero').setScale(4.5)
            : this.add.triangle(width * 0.22, groundY - 20, 0, 40, 20, -20, -20, -20, 0x00ffcc).setScale(2);

          this.villainSpr = heroExists
            ? this.add.sprite(width * 0.78, groundY, 'hero').setScale(5).setTint(0xff3333).setFlipX(true)
            : this.add.triangle(width * 0.78, groundY - 20, 0, 40, 20, -20, -20, -20, 0xff3333).setScale(2);

          if (heroExists) {
            this.heroSpr.play('hero_idle');
            this.villainSpr.play('hero_idle');
          }

          this.heroBaseX    = this.heroSpr.x;
          this.heroBaseY    = this.heroSpr.y;
          this.villainBaseX = this.villainSpr.x;
          this.villainBaseY = this.villainSpr.y;

          // Idle float
          this.tweens.add({ targets: this.heroSpr,    y: this.heroBaseY    - 8,  duration: 1100, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
          this.tweens.add({ targets: this.villainSpr, y: this.villainBaseY - 10, duration: 1300, yoyo: true, repeat: -1, ease: 'Sine.inOut', delay: 250 });

          // Name labels
          this.add.text(this.heroSpr.x,    groundY + 48, '⚔ HERO',    { fontFamily: 'monospace', fontSize: '11px', color: '#00ffcc', fontStyle: 'bold' }).setOrigin(0.5);
          this.add.text(this.villainSpr.x, groundY + 48, '👾 ' + '???', { fontFamily: 'monospace', fontSize: '11px', color: '#ff4444', fontStyle: 'bold' }).setOrigin(0.5);

          // Register events
          this.game.events.on('PLAYER_ATTACK', this.doPlayerAttack, this);
          this.game.events.on('ENEMY_ATTACK',  this.doEnemyAttack,  this);
        }

        // ─────────────────────────────────────────────────────────────────
        // 🟢 PLAYER ATTACK — JUMP + SLAM
        // ─────────────────────────────────────────────────────────────────
        doPlayerAttack() {
          if (this.busy) return;
          this.busy = true;

          const hero    = this.heroSpr;
          const villain = this.villainSpr;
          const hbx = this.heroBaseX, hby = this.heroBaseY;
          const vbx = this.villainBaseX, vby = this.villainBaseY;

          // PHASE 1: RUN toward enemy
          if (hero.anims) hero.play('hero_run_r', true);
          this.tweens.add({
            targets: hero,
            x: vbx - 80,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {

              // PHASE 2: JUMP UP high
              this.tweens.add({
                targets: hero,
                y: hby - 160,
                duration: 220,
                ease: 'Power3.easeOut',
                onComplete: () => {
                  // Spin mid-air
                  this.tweens.add({ targets: hero, angle: 360, duration: 200, once: true });

                  // PHASE 3: SLAM DOWN on villain
                  this.tweens.add({
                    targets: hero,
                    y: vby - 10,
                    duration: 160,
                    ease: 'Power3.easeIn',
                    onComplete: () => {

                      // ===IMPACT===
                      this._spawnImpact(villain.x, villain.y, 0x00ffcc, true);
                      this._shakeCamera();

                      // Villain knocked BACK + DOWN
                      this.tweens.add({ targets: villain, x: vbx + 110, y: vby + 60, angle: 40, duration: 250, ease: 'Power2' });
                      if (villain.setTint) { villain.setTint(0xffffff); this.time.delayedCall(150, () => villain.setTint(0xff3333)); }

                      // Hero bounce up slightly after slam
                      this.tweens.add({
                        targets: hero,
                        y: vby - 80, duration: 120, ease: 'Power1.easeOut',
                        onComplete: () => {

                          // PHASE 4: Villain recover
                          this.tweens.add({ targets: villain, x: vbx, y: vby, angle: 0, duration: 350, ease: 'Back.easeOut' });

                          // Hero run back home
                          if (hero.anims) hero.play('hero_run_l', true);
                          this.tweens.add({
                            targets: hero, x: hbx, y: hby, angle: 0, duration: 350, ease: 'Power2',
                            onComplete: () => {
                              if (hero.anims) hero.play('hero_idle');
                              this.busy = false;
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }

        // ─────────────────────────────────────────────────────────────────
        // 🔴 ENEMY ATTACK — SHOOT PROJECTILE + HERO STUMBLES
        // ─────────────────────────────────────────────────────────────────
        doEnemyAttack() {
          if (this.busy) return;
          this.busy = true;

          const hero    = this.heroSpr;
          const villain = this.villainSpr;
          const hbx = this.heroBaseX, hby = this.heroBaseY;
          const vbx = this.villainBaseX;

          // PHASE 1: Villain prep — lean forward
          this.tweens.add({ targets: villain, x: vbx - 30, duration: 150, ease: 'Back.easeOut', yoyo: true, hold: 50 });

          // Charge glow on villain
          const charge = this.add.circle(villain.x, villain.y - 20, 0, 0xff2200, 0.8);
          this.tweens.add({ targets: charge, radius: 35, alpha: 0.4, duration: 250, onComplete: () => {
            charge.destroy();

            // PHASE 2: Fire PROJECTILE
            const proj = this.add.circle(villain.x - 30, villain.y - 10, 10, 0xff4400, 1);
            const trail1 = this.add.circle(villain.x - 30, villain.y - 10, 6, 0xff8800, 0.6);
            const trail2 = this.add.circle(villain.x - 30, villain.y - 10, 4, 0xffcc00, 0.4);

            // Projectile flies left with arc
            this.tweens.add({
              targets: [proj, trail1, trail2],
              x: hero.x + 20,
              y: {
                getStart: () => villain.y - 10,
                getEnd: () => hero.y - 10,
                ease: 'Sine.inOut'
              },
              duration: 380,
              ease: 'Power2.easeIn',
              onUpdate: (tween, target) => {
                // spinning rotation effect
                if (target === proj) target.setScale(1 + 0.3 * Math.sin(tween.progress * Math.PI * 4));
              },
              onComplete: () => {
                proj.destroy();
                trail1.destroy();
                trail2.destroy();

                // ===IMPACT on Hero===
                this._spawnImpact(hero.x, hero.y - 10, 0xff2200, false);
                this._shakeCamera();

                // PHASE 3: Hero STUMBLES back
                if (hero.setTint) hero.setTint(0xff0000);
                this.tweens.add({
                  targets: hero, x: hbx - 80, y: hby - 40, angle: -30, duration: 220, ease: 'Power3.easeOut',
                  onComplete: () => {
                    // FALL DOWN
                    this.tweens.add({
                      targets: hero, y: hby + 30, angle: -50, duration: 180, ease: 'Power3.easeIn',
                      onComplete: () => {
                        // Brief pause on ground
                        this.time.delayedCall(200, () => {
                          // HERO GETS UP
                          if (hero.clearTint) hero.clearTint();
                          this.tweens.add({ targets: hero, x: hbx, y: hby, angle: 0, duration: 380, ease: 'Back.easeOut',
                            onComplete: () => { this.busy = false; }
                          });
                        });
                      }
                    });
                  }
                });
              }
            });
          }});
        }

        // ─────────────────────────────────────────────────────────────────
        // HELPERS
        // ─────────────────────────────────────────────────────────────────
        _spawnImpact(x, y, color, big) {
          const size = big ? 90 : 60;

          // Main flash ring
          const ring = this.add.circle(x, y, 0, color, 0.7);
          this.tweens.add({ targets: ring, radius: size, alpha: 0, duration: 350, ease: 'Power2.easeOut', onComplete: () => ring.destroy() });

          // Star burst lines
          for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const len = big ? 80 : 50;
            const line = this.add.line(x, y, 0, 0, Math.cos(angle) * len, Math.sin(angle) * len, color, 0.8).setLineWidth(big ? 3 : 2);
            this.tweens.add({ targets: line, alpha: 0, scaleX: 1.5, scaleY: 1.5, duration: 300, onComplete: () => line.destroy() });
          }

          // Spark particles
          for (let i = 0; i < 10; i++) {
            const spark = this.add.circle(x, y, Phaser.Math.Between(3, 7), color, 1);
            const spAngle = Math.random() * Math.PI * 2;
            const spDist  = Phaser.Math.Between(40, big ? 130 : 90);
            this.tweens.add({
              targets: spark,
              x: x + Math.cos(spAngle) * spDist,
              y: y + Math.sin(spAngle) * spDist + Phaser.Math.Between(20, 60),
              alpha: 0, scale: 0,
              duration: Phaser.Math.Between(300, 600),
              ease: 'Power2.easeOut',
              onComplete: () => spark.destroy()
            });
          }

          // Center white flash
          const flash = this.add.circle(x, y, big ? 40 : 25, 0xffffff, 1);
          this.tweens.add({ targets: flash, alpha: 0, radius: big ? 80 : 50, duration: 200, onComplete: () => flash.destroy() });

          // COMBO text
          const label = this.add.text(x, y - 40, big ? '💥 CRITICAL HIT!' : '⚡ ENEMY STRIKES!', {
            fontFamily: 'monospace', fontSize: big ? '18px' : '14px',
            color: big ? '#00ffcc' : '#ff4444', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 3
          }).setOrigin(0.5);
          this.tweens.add({ targets: label, y: label.y - 60, alpha: 0, duration: 900, ease: 'Power2.easeOut', onComplete: () => label.destroy() });
        }

        _shakeCamera() {
          this.cameras.main.shake(250, 0.012);
        }

        shutdown() {
          if (this.game?.events) {
            this.game.events.off('PLAYER_ATTACK', this.doPlayerAttack, this);
            this.game.events.off('ENEMY_ATTACK',  this.doEnemyAttack,  this);
          }
        }
      }
      // ════════════════════════════════════════════════════════════════════

      const config = {
        type: Phaser.CANVAS,
        width:  Math.round(W),
        height: Math.round(H),
        parent: containerRef.current,
        scene: BattleScene,
        pixelArt: true,
        transparent: true,
        backgroundColor: 'transparent',
        antialias: false,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
      };

      try {
        gameRef.current = new Phaser.Game(config);
      } catch (err) {
        console.warn('[PhaserBattle] init error:', err?.message);
      }
    };

    const timer = setTimeout(boot, 180);
    return () => {
      destroyed = true;
      clearTimeout(timer);
      try { gameRef.current?.destroy(true); } catch (_) {}
      gameRef.current = null;
    };
  }, []);

  // ── Dispatch combat events to Phaser ─────────────────────────────────────
  useEffect(() => {
    if (!actionTrigger || !gameRef.current) return;
    try {
      if (actionTrigger.type === 'player_attack') gameRef.current.events.emit('PLAYER_ATTACK');
      else if (actionTrigger.type === 'enemy_attack') gameRef.current.events.emit('ENEMY_ATTACK');
    } catch (_) {}
  }, [actionTrigger]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
