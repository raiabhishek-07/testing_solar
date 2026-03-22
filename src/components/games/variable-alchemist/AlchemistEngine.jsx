"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

class AlchemistScene extends Phaser.Scene {
    constructor() {
        super({ key: 'AlchemistScene' });
        this.ingredients = [];
        this.reactStatus = "IDLE";
        this.bottleContainers = [];
        this.cauldronLiquid = null;
        this.bubbles = [];
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Dark Steampunk Lab Background
        this.add.rectangle(0, 0, width, height, 0x05010a).setOrigin(0);
        
        // Background Grid
        const grid = this.add.grid(width/2, height/2, width, height, 40, 40, 0x000000, 0, 0x2e1065, 0.2);
        
        // Shelves
        this.add.rectangle(width/4, height/3, 200, 15, 0x1e1b4b);
        this.add.rectangle(width/2, height/4, 200, 15, 0x1e1b4b);
        this.add.rectangle(width*0.75, height/3, 200, 15, 0x1e1b4b);

        // The Cauldron Base
        const cx = width / 2;
        const cy = height * 0.75;
        
        this.add.ellipse(cx, cy, 300, 120, 0x000000); // Drop shadow
        this.add.circle(cx, cy, 140, 0x0f172a); // Main iron body
        this.add.circle(cx, cy, 140).setStrokeStyle(8, 0x1e293b); // Iron rim
        
        // Cauldron Opening and Liquid
        this.add.ellipse(cx, cy - 100, 220, 80, 0x1e293b); // Rim inside
        this.cauldronLiquid = this.add.ellipse(cx, cy - 90, 200, 60, 0x7e22ce); // Purple boiling liquid
        
        // Liquid breathing tween
        this.tweens.add({
            targets: this.cauldronLiquid,
            scaleX: 1.05,
            scaleY: 1.1,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut'
        });

        // Bubbles Emitter
        this.time.addEvent({
            delay: 300,
            loop: true,
            callback: () => {
                if (this.reactStatus === 'RUNNING') return; // Pause bubbles while throwing
                const bx = cx - 80 + Math.random() * 160;
                const by = cy - 90 + Math.random() * 20;
                const bubble = this.add.circle(bx, by, Math.random() * 10 + 5, 0xd8b4fe, 0.6);
                
                this.tweens.add({
                    targets: bubble,
                    y: by - 100 - Math.random() * 50,
                    alpha: 0,
                    scale: 0.5,
                    duration: 1500 + Math.random() * 1000,
                    onComplete: () => bubble.destroy()
                });
            }
        });
        
        // Particle Emitter Systems
        this.successEmitter = this.add.particles(0, 0, 'sparkle', {
            x: cx, y: cy - 90,
            speed: { min: 200, max: 600 },
            angle: { min: 220, max: 320 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            lifespan: 1500,
            gravityY: 300,
            tint: [ 0xfcd34d, 0xf59e0b, 0xffed4a ],
            quantity: 50,
            emitting: false
        });

        this.failEmitter = this.add.particles(0, 0, 'sludge', {
            x: cx, y: cy - 90,
            speed: { min: 100, max: 400 },
            angle: { min: 200, max: 340 },
            scale: { start: 1, end: 0.2 },
            lifespan: 2000,
            gravityY: 500,
            tint: [ 0x22c55e, 0x16a34a, 0x14532d ],
            quantity: 40,
            emitting: false
        });

        this.buildBottles();
    }

    // Creating internal fake textures for particles
    preload() {
        const gfx = this.make.graphics();
        gfx.fillStyle(0xffffff);
        gfx.fillCircle(4, 4, 4);
        gfx.generateTexture('sparkle', 8, 8);
        gfx.clear();
        
        gfx.fillStyle(0xffffff);
        gfx.fillRect(0, 0, 10, 10);
        gfx.generateTexture('sludge', 10, 10);
        gfx.clear();
    }

    buildBottles() {
        // Clear existing
        this.bottleContainers.forEach(c => c.destroy());
        this.bottleContainers = [];

        if (!this.reactIngredients || this.reactIngredients.length === 0) return;

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const shelfCoords = [
            { x: width/4, y: height/3 - 10 },
            { x: width/2, y: height/4 - 10 },
            { x: width*0.75, y: height/3 - 10 }
        ];

        this.reactIngredients.forEach((ing, i) => {
            if (i >= shelfCoords.length) return;
            const coord = shelfCoords[i];

            const container = this.add.container(coord.x, coord.y);

            // Bottle Glass (Rectangle with rounded top)
            const glass = this.add.rectangle(0, -30, 40, 60, 0xffffff, 0.2);
            glass.setStrokeStyle(2, 0xffffff, 0.4);
            const neck = this.add.rectangle(0, -65, 16, 20, 0xffffff, 0.2);
            neck.setStrokeStyle(2, 0xffffff, 0.4);
            const cork = this.add.rectangle(0, -75, 18, 10, 0x92400e);

            // Liquid color based on Type
            let liquidColor = 0xffffff;
            if (ing.type === 'String') liquidColor = 0xef4444;      // Red
            else if (ing.type === 'Number') liquidColor = 0x3b82f6; // Blue
            else if (ing.type === 'Boolean') liquidColor = 0x22c55e;// Green

            const liquid = this.add.rectangle(0, -20, 36, 40, liquidColor, 0.8);
            
            // Label
            const label = this.add.rectangle(0, -30, 30, 15, 0xfef3c7);
            const text = this.add.text(0, -30, ing.var, {
                fontFamily: 'monospace',
                fontSize: '10px',
                color: '#000',
                fontWeight: 'bold'
            }).setOrigin(0.5);

            container.add([liquid, glass, neck, cork, label, text]);
            
            // Original floating origin
            container.originalX = coord.x;
            container.originalY = coord.y;
            
            // Subtle idle float
            this.tweens.add({
                targets: container,
                y: coord.y - 10,
                duration: 1500 + Math.random() * 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.inOut'
            });

            this.bottleContainers.push(container);
        });
    }

    playBrewAnimation() {
        if (!this.bottleContainers.length) return;
        
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height * 0.75 - 90;

        // Animate bottles flying into the cauldron
        this.bottleContainers.forEach((container, i) => {
            // Stop idle float
            this.tweens.killTweensOf(container);
            
            // Arc trajectory
            this.tweens.add({
                targets: container,
                x: cx,
                y: cy,
                scale: 0.2,
                rotation: Phaser.Math.DegToRad(Math.random() * 360),
                duration: 800 + i * 200,
                ease: 'Back.in',
                onComplete: () => {
                    container.setVisible(false);
                    // Cauldron flash when a bottle hits
                    this.cauldronLiquid.fillColor = 0xd8b4fe;
                    this.time.delayedCall(100, () => this.cauldronLiquid.fillColor = 0x7e22ce);
                }
            });
        });
    }

    playSuccess() {
        this.cameras.main.flash(500, 251, 191, 36); // Gold flash
        this.successEmitter.explode(100);
        this.cauldronLiquid.fillColor = 0xf59e0b; // Turn liquid pure gold
    }

    playFail() {
        this.cameras.main.shake(500, 0.03); // Massive violent shake
        this.cameras.main.flash(300, 34, 197, 94); // Toxic green flash
        this.failEmitter.explode(150);
        this.cauldronLiquid.fillColor = 0x16a34a; // Turn liquid toxic green
    }

    resetBottles() {
        this.cauldronLiquid.fillColor = 0x7e22ce;
        this.buildBottles(); // rebuild resets positions natively
    }
}

export default function AlchemistEngine({ ingredients, status, resetTrigger }) {
    const gameContainer = useRef(null);
    const gameRef = useRef(null);

    // Init Engine
    useEffect(() => {
        if (!gameContainer.current) return;

        const config = {
            type: Phaser.AUTO,
            width: '100%',
            height: '100%',
            parent: gameContainer.current,
            scene: AlchemistScene,
            pixelArt: true,
            backgroundColor: '#05010a',
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

    // Sync Props
    useEffect(() => {
        if (gameRef.current && gameRef.current.scene) {
            const scene = gameRef.current.scene.getScene('AlchemistScene');
            if (scene) {
                scene.reactIngredients = ingredients;
                if (status === 'IDLE') {
                    scene.resetBottles();
                }
            }
        }
    }, [ingredients, resetTrigger]);

    // Handle Status Changes trigger animations
    useEffect(() => {
        if (gameRef.current && gameRef.current.scene) {
            const scene = gameRef.current.scene.getScene('AlchemistScene');
            if (!scene) return;
            
            scene.reactStatus = status;

            if (status === 'RUNNING') {
                scene.playBrewAnimation();
            } else if (status === 'SUCCESS') {
                scene.playSuccess();
            } else if (status === 'FAILED') {
                scene.playFail();
            }
        }
    }, [status]);

    return <div ref={gameContainer} className="w-full h-full" />;
}
