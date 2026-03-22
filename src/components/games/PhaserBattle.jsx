"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
    }

    preload() {
        this.load.spritesheet('hero', '/assets/hero_walk.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.image('forest_bg', '/assets/scenery/forest_bg.png');
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background - Improved Pixel Art Visibility
        const bg = this.add.image(width / 2, height / 2, 'forest_bg').setScrollFactor(0);
        const scaleX = width / bg.width;
        const scaleY = height / bg.height;
        bg.setScale(Math.max(scaleX, scaleY)).setAlpha(0.85).setTint(0xaabbcc);

        // Shift the battle arena substantially upwards so the Bottom UI doesn't clip the sprites.
        // 0.33 perfectly frames them in the top/middle open gap!
        const battleY = height * 0.33;

        // Ground / Arena platform
        const platform = this.add.ellipse(width / 2, battleY + 110, 700, 160, 0x000000, 0.4);

        // Create Animations
        if (!this.anims.exists('walk_left')) {
            this.anims.create({ key: 'walk_left', frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
            this.anims.create({ key: 'turn', frames: [{ key: 'hero', frame: 4 }], frameRate: 20 });
            this.anims.create({ key: 'walk_right', frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }), frameRate: 10, repeat: -1 });
        }

        // PLAYER SPRITE (Left Side)
        this.player = this.add.sprite(width / 2 - 250, battleY, 'hero').setScale(4.5);
        this.player.setFrame(4);
        this.playerBaseX = this.player.x;

        // ENEMY SPRITE (Right Side)
        this.enemy = this.add.sprite(width / 2 + 250, battleY, 'hero').setScale(5);
        this.enemy.setTint(0xff3333); // Red tint for villain
        this.enemy.setFrame(4);
        this.enemy.flipX = true; // Make enemy face left
        this.enemyBaseX = this.enemy.x;

        // Floating idle animations
        this.tweens.add({ targets: this.player, y: this.player.y - 12, duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
        this.tweens.add({ targets: this.enemy, y: this.enemy.y - 18, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.inOut', delay: 200 });

        // Listen for internal events triggered by React
        this.game.events.on('FIRE_PLAYER_ATTACK', this.playerAttack, this);
        this.game.events.on('FIRE_ENEMY_ATTACK', this.enemyAttack, this);
    }

    playerAttack() {
        if (!this.player || !this.enemy) return;
        
        // Dash to enemy
        this.player.anims.play('walk_right', true);
        this.tweens.add({
            targets: this.player,
            x: this.enemy.x - 50,
            duration: 200,
            ease: 'Power2',
            onComplete: () => {
                this.player.anims.play('turn');
                
                // Attack Impact FX
                const flash = this.add.circle(this.enemy.x, this.enemy.y, 80, 0x00ffff, 0.6);
                this.tweens.add({ targets: flash, scale: 1.5, alpha: 0, duration: 300, onComplete: () => flash.destroy() });
                
                // Shake Enemy
                this.tweens.add({ targets: this.enemy, x: this.enemyBaseX + 20, duration: 50, yoyo: true, repeat: 3 });
                this.enemy.setTint(0xffffff);
                this.time.delayedCall(200, () => this.enemy.setTint(0xff3333));

                // Return to base
                this.player.anims.play('walk_left', true);
                this.tweens.add({
                    targets: this.player,
                    x: this.playerBaseX,
                    duration: 300,
                    ease: 'Power2',
                    onComplete: () => this.player.anims.play('turn')
                });
            }
        });
    }

    enemyAttack() {
        if (!this.player || !this.enemy) return;

        // Dash to player
        this.enemy.anims.play('walk_left', true);
        this.tweens.add({
            targets: this.enemy,
            x: this.player.x + 50,
            duration: 200,
            ease: 'Power2',
            onComplete: () => {
                this.enemy.anims.play('turn');
                
                // Attack Impact FX
                const flash = this.add.circle(this.player.x, this.player.y, 80, 0xff0000, 0.6);
                this.tweens.add({ targets: flash, scale: 1.5, alpha: 0, duration: 300, onComplete: () => flash.destroy() });
                
                // Shake Player
                this.tweens.add({ targets: this.player, x: this.playerBaseX - 20, duration: 50, yoyo: true, repeat: 3 });
                this.player.setTint(0xff0000);
                this.time.delayedCall(200, () => this.player.clearTint());

                // Return to base
                this.enemy.anims.play('walk_right', true);
                this.tweens.add({
                    targets: this.enemy,
                    x: this.enemyBaseX,
                    duration: 300,
                    ease: 'Power2',
                    onComplete: () => {
                        this.enemy.anims.play('turn');
                        this.enemy.setFrame(4);
                    }
                });
            }
        });
    }

    destroy() {
        this.game.events.off('FIRE_PLAYER_ATTACK', this.playerAttack, this);
        this.game.events.off('FIRE_ENEMY_ATTACK', this.enemyAttack, this);
    }
}

export default function PhaserBattle({ actionTrigger }) {
    const gameContainer = useRef(null);
    const gameRef = useRef(null);

    useEffect(() => {
        if (!gameContainer.current) return;

        const config = {
            type: Phaser.AUTO,
            width: '100%',
            height: '100%',
            parent: gameContainer.current,
            scene: BattleScene,
            pixelArt: true,
            backgroundColor: 'transparent',
            transparent: true,
            antialias: false,
            scale: {
                mode: Phaser.Scale.RESIZE,
                parent: gameContainer.current,
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

    // Listen to props changes and dispatch to Phaser Scene
    useEffect(() => {
        if (actionTrigger && gameRef.current) {
            if (actionTrigger.type === 'player_attack') {
                gameRef.current.events.emit('FIRE_PLAYER_ATTACK');
            } else if (actionTrigger.type === 'enemy_attack') {
                gameRef.current.events.emit('FIRE_ENEMY_ATTACK');
            }
        }
    }, [actionTrigger]);

    return (
        <div ref={gameContainer} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
    );
}
