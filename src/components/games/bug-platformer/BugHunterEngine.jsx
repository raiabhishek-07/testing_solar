"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

class PlatformerScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlatformerScene' });
        this.player = null;
        this.cursors = null;
        this.activeBug = null;
    }

    create() {
        try {
            // Absolute Game World Dimensions (independent of browser window size)
            const WORLD_WIDTH = 8000;
            const WORLD_HEIGHT = 800;

            // Cyberpunk background
            this.add.rectangle(0, 0, WORLD_WIDTH, WORLD_HEIGHT, 0x020617).setOrigin(0);

            // Physics Groups
            const platforms = this.physics.add.staticGroup();
            this.bugs = this.physics.add.group();

            // 1. Create Ground (spanning entire world)
            const ground = this.add.rectangle(WORLD_WIDTH/2, WORLD_HEIGHT - 20, WORLD_WIDTH, 40, 0x0f172a);
            this.physics.add.existing(ground, true);
            platforms.add(ground);
            
            // Add neon stroke to ground
            this.add.rectangle(WORLD_WIDTH/2, WORLD_HEIGHT - 40, WORLD_WIDTH, 2, 0x06b6d4);

            // 2. Create Floating Platforms (Absolute positioned)
            this.createPlatform(platforms, 400, WORLD_HEIGHT - 150, 200, 20);
            this.createPlatform(platforms, 800, WORLD_HEIGHT - 300, 200, 20);
            this.createPlatform(platforms, 1200, WORLD_HEIGHT - 450, 200, 20);
            this.createPlatform(platforms, 1600, WORLD_HEIGHT - 250, 300, 20);
            this.createPlatform(platforms, 2100, WORLD_HEIGHT - 400, 200, 20);
            this.createPlatform(platforms, 2600, WORLD_HEIGHT - 200, 250, 20);
            this.createPlatform(platforms, 3200, WORLD_HEIGHT - 350, 200, 20);
            this.createPlatform(platforms, 3800, WORLD_HEIGHT - 500, 200, 20);
            this.createPlatform(platforms, 4400, WORLD_HEIGHT - 300, 300, 20);
            this.createPlatform(platforms, 5000, WORLD_HEIGHT - 150, 200, 20);
            this.createPlatform(platforms, 5600, WORLD_HEIGHT - 400, 250, 20);
            this.createPlatform(platforms, 6200, WORLD_HEIGHT - 250, 200, 20);
            this.createPlatform(platforms, 6800, WORLD_HEIGHT - 500, 300, 20);
            this.createPlatform(platforms, 7400, WORLD_HEIGHT - 300, 300, 20);

            // 3. Create Player (A green neon square like a code cursor)
            this.player = this.add.rectangle(100, WORLD_HEIGHT - 100, 32, 32, 0x4ade80);
            this.physics.add.existing(this.player);
            this.player.body.setCollideWorldBounds(true);
            this.player.body.setBounce(0.1);
            
            // Add a trail particle for the player
            this.playerTrail = this.add.particles(0, 0, 'particle', {
                speed: 0,
                scale: { start: 0.8, end: 0 },
                alpha: { start: 0.5, end: 0 },
                lifespan: 200,
                tint: 0x4ade80,
                blendMode: 'ADD'
            });
            this.playerTrail.startFollow(this.player);

            // 4. Create Bugs (Escalating Complexity Encounters)
            this.createBug(600, WORLD_HEIGHT - 200, 'bug_1'); // Floor bug
            this.createBug(1200, WORLD_HEIGHT - 500, 'bug_2'); // High platform bug
            this.createBug(1700, WORLD_HEIGHT - 300, 'bug_3'); // Mid platform bug
            this.createBug(2300, WORLD_HEIGHT - 200, 'bug_4'); // Floor bug
            this.createBug(3200, WORLD_HEIGHT - 400, 'bug_5'); // Mid platform 
            this.createBug(3800, WORLD_HEIGHT - 550, 'bug_6'); // High platform
            this.createBug(4400, WORLD_HEIGHT - 350, 'bug_7'); // Mid platform
            this.createBug(5200, WORLD_HEIGHT - 200, 'bug_8'); // Floor bug
            this.createBug(6200, WORLD_HEIGHT - 300, 'bug_9'); // Mid platform
            this.createBug(6800, WORLD_HEIGHT - 550, 'bug_10'); // Ultimate high platform bug

            // 5. Collisions
            this.physics.add.collider(this.player, platforms);
            this.physics.add.collider(this.bugs, platforms);

            this.physics.add.overlap(this.player, this.bugs, this.handleBugCollision, null, this);

            // 6. Camera Follow
            this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
            this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
            this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

            // 7. Input
            this.cursors = this.input.keyboard.createCursorKeys();
            this.input.keyboard.clearCaptures(); // CRITICAL: Stop Phaser from stealing Space/Shift/Arrows from Monaco IDE!
            this.wasd = this.input.keyboard.addKeys('W,A,S,D');

        } catch (e) {
            this.add.text(10, 10, 'CRITICAL PHASER ERROR: ' + e.message, { fontSize: '24px', fill: '#ff0000', backgroundColor: '#000', wordWrap: { width: 800 } }).setDepth(9999);
            console.error(e);
        }
    }

    preload() {
        const gfx = this.make.graphics();
        gfx.fillStyle(0xffffff);
        gfx.fillCircle(4, 4, 4);
        gfx.generateTexture('particle', 8, 8);
        gfx.clear();
    }

    createPlatform(group, x, y, width, height) {
        const rect = this.add.rectangle(x, y, width, height, 0x1e293b);
        const neon = this.add.rectangle(x, y - height/2, width, 2, 0x06b6d4);
        group.add(rect);
    }

    createBug(x, y, bugId) {
        const bug = this.add.rectangle(x, y, 40, 40, 0xf43f5e);
        this.physics.add.existing(bug);
        bug.body.setAllowGravity(false); // Hovering bugs
        bug.bugId = bugId;
        
        // Sick glitching idle animation
        this.tweens.add({
            targets: bug,
            y: y - 20,
            duration: 1000 + Math.random() * 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut'
        });

        const glitchTween = this.time.addEvent({
            delay: 1500,
            loop: true,
            callback: () => {
                if (!bug.active) return;
                bug.alpha = 0.5;
                bug.scaleX = 1.2;
                this.time.delayedCall(50, () => {
                    bug.alpha = 1;
                    bug.scaleX = 1;
                });
            }
        });

        this.bugs.add(bug);
    }

    handleBugCollision(player, bug) {
        if (this.activeBug) return; // Already in a battle!

        // Pause physics and player input instantly
        this.physics.pause();
        this.playerTrail.pause();
        this.activeBug = bug;

        // Flash red screen
        this.cameras.main.flash(200, 244, 63, 94);

        // Trigger React UI Bridge globally
        if (window.__bugHunterOnEngaged) {
            window.__bugHunterOnEngaged(bug.bugId);
        }
    }

    update() {
        if (!this.player || !this.player.body || !this.physics.world.isPaused === false) return; // Skip update if physics paused

        const speed = 400; // Increased speed for fluid movement
        const jumpForce = -800; // Massively increased jump force to easily clear platforms

        // Horizontal movement
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.player.body.setVelocityX(-speed);
            // Skew visually for movement feel
            this.player.skewX = 0.2;
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.player.body.setVelocityX(speed);
            this.player.skewX = -0.2;
        } else {
            this.player.body.setVelocityX(0);
            this.player.skewX = 0;
        }

        // Jumping
        const isGrounded = this.player.body.touching.down;
        if ((this.cursors.up.isDown || this.wasd.W.isDown || this.input.keyboard.checkDown(this.cursors.space, 250)) && isGrounded) {
            this.player.body.setVelocityY(jumpForce);
            
            // Jump particles
            const emitter = this.add.particles(0, 0, 'particle', {
                x: this.player.x,
                y: this.player.y + 16,
                speed: { min: 50, max: 150 },
                angle: { min: 0, max: 180 },
                scale: { start: 1, end: 0 },
                lifespan: 400,
                quantity: 10,
                tint: 0x4ade80,
                emitting: false
            });
            emitter.explode();
        }
    }

    // Called from React when code is fixed!
    resolveBug() {
        if (!this.activeBug) return;
        
        // Massive green explosion
        const emitter = this.add.particles(0, 0, 'particle', {
            x: this.activeBug.x,
            y: this.activeBug.y,
            speed: { min: 100, max: 600 },
            angle: { min: 0, max: 360 },
            scale: { start: 1.5, end: 0 },
            lifespan: 800,
            quantity: 50,
            tint: [0x4ade80, 0x22c55e, 0x16a34a],
            blendMode: 'ADD',
            emitting: false
        });
        emitter.explode();

        this.cameras.main.shake(200, 0.02);
        
        this.activeBug.destroy();
        this.activeBug = null;

        // Resume engine
        this.physics.resume();
        this.playerTrail.resume();
    }

    // Called from React when validation fails!
    failBug() {
        if (!this.activeBug) return;
        
        this.cameras.main.shake(300, 0.04);
        this.cameras.main.flash(200, 244, 63, 94); // Red flash

        // Knockback player safely without trapping them in a wall
        this.player.x -= 100;
        this.player.y -= 50;
        this.player.body.setVelocity(0, 0);

        this.activeBug = null;
        this.physics.resume();
        this.playerTrail.resume();
    }
}

export default function BugHunterEngine({ onBugEngaged, combatStatus, resetFlag }) {
    const gameContainer = useRef(null);
    const gameRef = useRef(null);

    // Bind the global callback so the Phaser Scene can trigger React State
    window.__bugHunterOnEngaged = onBugEngaged;

    useEffect(() => {
        if (!gameContainer.current) return;

        const config = {
            type: Phaser.AUTO,
            width: '100%',
            height: '100%',
            parent: gameContainer.current,
            scene: PlatformerScene,
            pixelArt: true,
            backgroundColor: '#020617',
            audio: {
                disableWebAudio: true,
                noAudio: true
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 1200 },
                    debug: false
                }
            },
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

    // Listen for Combat Resolution passed down from React
    useEffect(() => {
        if (gameRef.current && gameRef.current.scene) {
            const scene = gameRef.current.scene.getScene('PlatformerScene');
            if (scene) {
                if (combatStatus === "DEFEATED") {
                    scene.resolveBug();
                } else if (combatStatus === "FAILED") {
                    scene.failBug();
                }
            }
        }
    }, [combatStatus, resetFlag]);

    return <div ref={gameContainer} className="w-full h-full relative" />;
}
