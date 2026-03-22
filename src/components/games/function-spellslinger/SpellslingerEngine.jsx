"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

class RPGScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RPGScene' });
        this.reactAction = null;
        this.reactStatus = "IDLE";
        
        this.party = [];
        this.boss = null;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Dark fantasy background
        this.add.rectangle(0, 0, width, height, 0x020617).setOrigin(0);
        
        // Floor line
        const floorY = height * 0.7;
        this.add.rectangle(0, floorY, width, height - floorY, 0x0f172a).setOrigin(0);
        this.add.rectangle(0, floorY, width, 5, 0x334155).setOrigin(0);

        // CREATE PARTY (Left Side)
        const partyEmojis = ['🧙‍♂️', '🧝‍♀️', '🧙‍♀️']; // Frost Mage, Fire Elf, Nature Witch
        for(let i=0; i<3; i++) {
            const px = width * 0.2 + (i * 60) - 60;
            const py = floorY - 20 + (i * 30);
            
            const shadow = this.add.ellipse(px, py + 10, 60, 20, 0x000000, 0.5);
            const sprite = this.add.text(px, py - 30, partyEmojis[i], {
                fontSize: '64px',
                resolution: 2 
            }).setOrigin(0.5);

            const container = this.add.container(0, 0, [shadow, sprite]);
            container.originalX = px;
            container.originalY = py;
            container.spriteRef = sprite;

            this.party.push(container);

            // Breathing animation
            this.tweens.add({
                targets: sprite,
                scaleY: 0.95,
                y: py - 28,
                duration: 800 + Math.random() * 400,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.inOut'
            });
        }

        // CREATE BOSS (Right Side)
        const bx = width * 0.75;
        const by = floorY - 50;

        const bossShadow = this.add.ellipse(bx, by + 50, 200, 40, 0x000000, 0.6);
        
        // Dynamically fetch Boss ID passed via global bridge
        this.bossId = window.__currentSpellslingerBossId || 1;
        const bossEmojis = {
            1: '🌋', // Cinder Golem
            2: '👁️‍🗨️', // Void Manifest
            3: '🐉'  // Storm Wyrm
        };
        const bossEmoji = bossEmojis[this.bossId] || '👹';

        const bossBody = this.add.text(bx, by, bossEmoji, {
            fontSize: '180px',
            resolution: 2
        }).setOrigin(0.5);

        this.boss = this.add.container(0, 0, [bossShadow, bossBody]);
        this.boss.bodyRef = bossBody;

        this.tweens.add({
            targets: bossBody,
            scaleY: 1.05,
            scaleX: 0.98,
            y: by - 5,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut'
        });

        // Particle Emitters
        this.iceEmitter = this.add.particles(0, 0, 'particle', {
            speed: { min: 400, max: 800 },
            angle: { min: -20, max: 20 },
            scale: { start: 1, end: 0 },
            lifespan: 1000,
            tint: [0x22d3ee, 0x38bdf8, 0xffffff],
            blendMode: 'ADD',
            emitting: false
        });

        this.healEmitter = this.add.particles(0, 0, 'particle', {
            speed: { min: 100, max: 200 },
            angle: { min: 240, max: 300 },
            scale: { start: 0.5, end: 0 },
            lifespan: 1500,
            gravityY: -200,
            tint: [0x22c55e, 0x4ade80],
            blendMode: 'ADD',
            emitting: false
        });

        this.thunderEmitter = this.add.particles(0, 0, 'particle', {
            speed: { min: 200, max: 500 },
            angle: { min: 0, max: 360 },
            scale: { start: 1.5, end: 0 },
            lifespan: 400,
            tint: 0xfef08a,
            blendMode: 'ADD',
            emitting: false
        });

        this.fizzleEmitter = this.add.particles(0, 0, 'particle', {
            speed: 50,
            angle: { min: 250, max: 290 },
            scale: { start: 0.5, end: 0 },
            lifespan: 800,
            tint: 0x475569,
            emitting: false
        });
    }

    preload() {
        const gfx = this.make.graphics();
        gfx.fillStyle(0xffffff);
        gfx.fillCircle(4, 4, 4);
        gfx.generateTexture('particle', 8, 8);
        gfx.clear();
    }

    executeTurn(action, status) {
        if (!action) return;
        const { func, args } = action;

        // Fizzle scenario, bypass if boss is attacking
        if (func === 'fizzle' || (status === 'FAILED' && func !== 'bossAttack')) {
            const caster = this.party[1]; // Center mage
            this.fizzleEmitter.setPosition(caster.originalX, caster.originalY - 40);
            this.fizzleEmitter.explode(10);
            
            // Sad bump
            this.tweens.add({
                targets: caster,
                y: caster.originalY + 10,
                yoyo: true,
                duration: 200
            });
            return;
        }

        // Action routing
        if (func === 'bossAttack') {
            this.animateBossCounterAttack();
        } else if (func === 'castBlizzard') {
            this.animateAttack(this.party[0], this.iceEmitter, args[1] > 500 ? 100 : 30, 0x22d3ee);
        } else if (func === 'castFireball') {
            // Note: Currently using ice emitter heavily tinted orange for fireball
            this.animateAttack(this.party[0], this.iceEmitter, args[1] > 500 ? 100 : 30, 0xf97316); 
        } else if (func === 'healParty') {
            this.animateHeal(this.party[2], args[0] || 100);
        } else if (func === 'castShield') {
            this.animateShield(this.party[0], args[0]);
        } else if (func === 'castThunder') {
            // Function directly parameter-binding animation logic!
            const strikes = args[0] && typeof args[0] === 'number' ? args[0] : 1;
            this.animateThunder(this.party[1], strikes);
        }
    }

    animateAttack(caster, emitter, count, bossColor) {
        // Step forward
        this.tweens.add({
            targets: caster,
            x: caster.originalX + 40,
            duration: 200,
            yoyo: true,
            hold: 400,
            onYoyo: () => {
                emitter.setPosition(caster.originalX + 60, caster.originalY - 30);
                emitter.explode(count);
                // Synchronized hit
                this.time.delayedCall(100, () => this.animateBossHit(bossColor));
            }
        });
    }

    animateHeal(caster, amount) {
        // Caster staff raise
        this.tweens.add({
            targets: caster,
            y: caster.originalY - 30,
            duration: 300,
            yoyo: true,
            hold: 400,
            onYoyo: () => {
                // Rain healing on entire party
                this.party.forEach(member => {
                    this.healEmitter.setPosition(member.originalX, member.originalY + 20);
                    this.healEmitter.explode(amount > 200 ? 30 : 10);
                    
                    // Flash animation scaling
                    this.tweens.add({
                        targets: member.spriteRef,
                        scale: 1.2,
                        yoyo: true,
                        duration: 150
                    });
                });
            }
        });
    }

    animateThunder(caster, strikes) {
        // Step forward
        this.tweens.add({
            targets: caster,
            x: caster.originalX + 40,
            duration: 200,
            yoyo: true,
            hold: strikes * 300,
            onYoyo: () => {
                for(let i=0; i<strikes; i++) {
                    this.time.delayedCall(i * 300, () => {
                        this.thunderEmitter.setPosition(this.boss.bodyRef.x + this.boss.x, this.boss.bodyRef.y + this.boss.y - 100);
                        this.thunderEmitter.explode(40);
                        this.animateBossHit(0xfef08a);
                    });
                }
            }
        });
    }

    animateBossHit(flashColor) {
        this.cameras.main.shake(300, 0.02);
        
        // Boss hit flash via additively blended white rect overlay
        const flashOverlay = this.add.rectangle(this.boss.bodyRef.x + this.boss.x, this.boss.bodyRef.y + this.boss.y, 250, 250, flashColor, 0.6).setBlendMode('ADD');
        this.tweens.add({ targets: flashOverlay, alpha: 0, duration: 300, onComplete: () => flashOverlay.destroy() });

        this.tweens.add({
            targets: this.boss,
            x: this.boss.x + 10,
            yoyo: true,
            duration: 50,
            repeat: 3
        });
    }

    animateShield(caster, targetName) {
        // Step forward
        this.tweens.add({
            targets: caster,
            x: caster.originalX + 40,
            duration: 200,
            yoyo: true,
            hold: 600,
            onYoyo: () => {
                const shield = this.add.ellipse(caster.originalX + 40, caster.originalY - 10, 80, 150)
                    .setStrokeStyle(4, 0x38bdf8)
                    .setFillStyle(0x0ea5e9, 0.2);
                
                this.tweens.add({
                    targets: shield,
                    scale: 1.2,
                    alpha: 0,
                    duration: 600,
                    onComplete: () => shield.destroy()
                });
            }
        });
    }

    animateBossCounterAttack() {
        // Dramatic pullback
        this.tweens.add({
            targets: this.boss,
            x: this.boss.x + 50,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                // Violent lunge forward
                this.tweens.add({
                    targets: this.boss,
                    x: this.boss.x - 300,
                    duration: 100,
                    yoyo: true,
                    hold: 50,
                    onYoyo: () => {
                        this.cameras.main.shake(400, 0.04);
                        // Damage party
                        this.party.forEach(member => {
                            const flashOverlay = this.add.ellipse(member.originalX, member.originalY, 80, 80, 0xf43f5e, 0.6).setBlendMode('ADD');
                            this.tweens.add({ targets: flashOverlay, alpha: 0, duration: 400, onComplete: () => flashOverlay.destroy() });
                            
                            this.tweens.add({
                                targets: member.spriteRef,
                                x: member.spriteRef.x - 20,
                                yoyo: true,
                                duration: 50,
                                repeat: 4
                            });
                        });
                    }
                });
            }
        });
    }
}

export default function SpellslingerEngine({ action, status, actionTime, bossId }) {
    const gameContainer = useRef(null);
    const gameRef = useRef(null);

    // Global bridge for Phaser to read static react props iteratively
    window.__currentSpellslingerBossId = bossId;

    // Engine Bootstrap
    useEffect(() => {
        if (!gameContainer.current) return;

        const config = {
            type: Phaser.AUTO,
            width: '100%',
            height: '100%',
            parent: gameContainer.current,
            scene: RPGScene,
            pixelArt: true,
            backgroundColor: '#020617',
            audio: { noAudio: true },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        };

        gameRef.current = new Phaser.Game(config);

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    // Dispatch Engine Commands and Restart on Boss Change
    useEffect(() => {
        if (gameRef.current && gameRef.current.scene) {
            const scene = gameRef.current.scene.getScene('RPGScene');
            if (scene) {
                // If boss changed, physically restart the scene to draw new boss emoji
                if (scene.bossId && scene.bossId !== bossId) {
                    scene.scene.restart();
                    return;
                }
                
                if (action) {
                    scene.executeTurn(action, status);
                }
            }
        }
    }, [action, status, actionTime, bossId]);

    return <div ref={gameContainer} className="w-full h-full border-t border-slate-800 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)]" />;
}
