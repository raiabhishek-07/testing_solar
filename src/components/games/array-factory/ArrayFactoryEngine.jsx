"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

class FactoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FactoryScene' });
        this.boxes = [];
        this.reactInitialArray = [];
        this.reactOperations = null;
        this.isAnimating = false;
    }

    preload() {
        this.load.image('forest_bg', '/assets/scenery/forest_bg.png'); // Reuse asset for background
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Factory Background
        const bg = this.add.image(width / 2, height / 2, 'forest_bg').setScrollFactor(0);
        const scaleX = width / bg.width;
        const scaleY = height / bg.height;
        bg.setScale(Math.max(scaleX, scaleY)).setAlpha(0.2).setTint(0x0f172a); 

        // Conveyor Belt Base
        const beltY = height / 2 + 50;
        this.add.rectangle(width / 2, beltY + 40, width + 100, 100, 0x1e293b, 1).setDepth(0);
        this.add.rectangle(width / 2, beltY + 40, width + 100, 80, 0x0f172a, 1).setDepth(0);
        
        // Dynamic Striped belt pattern
        this.beltStrips = [];
        for(let i=0; i<35; i++) {
            const strip = this.add.rectangle(i * 60, beltY + 40, 10, 80, 0x334155, 1).setDepth(0);
            this.beltStrips.push(strip);
        }

        // Steampunk Mechanical Arm Rails
        this.add.rectangle(width / 2, beltY - 200, width, 25, 0x0f172a, 1).setDepth(0);
        this.add.rectangle(width / 2, beltY - 200, width, 10, 0x22d3ee, 0.3).setDepth(0); // Cyan glowing rail

        this.buildBoxes();
    }

    update(time, delta) {
        // Continuously roll the conveyor belt strips
        if (this.beltStrips) {
            this.beltStrips.forEach(strip => {
                strip.x -= 0.05 * delta;
                if (strip.x < -30) {
                    strip.x = this.cameras.main.width + 30;
                }
            });
        }
    }

    buildBoxes() {
        // Clear old boxes
        this.boxes.forEach(b => {
             b.container.destroy();
        });
        this.boxes = [];

        if (!this.reactInitialArray || this.reactInitialArray.length === 0) return;

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const beltY = height / 2 + 50;

        const boxWidth = 80;
        const spacing = 120;
        const totalW = (this.reactInitialArray.length - 1) * spacing;
        const startX = (width - totalW) / 2;

        for(let i=0; i<this.reactInitialArray.length; i++) {
            const val = this.reactInitialArray[i];
            const px = startX + (i * spacing);
            const py = beltY;

            const container = this.add.container(px, py).setDepth(10);
            
            // Premium Steampunk Box layered rendering
            const shadow = this.add.rectangle(6, 6, boxWidth, boxWidth, 0x000000, 0.6);
            const boxOuter = this.add.rectangle(0, 0, boxWidth, boxWidth, 0x92400e, 1); 
            const boxInner = this.add.rectangle(0, 0, boxWidth - 12, boxWidth - 12, 0xd97706, 1);
            
            // Corner Copper Bolts
            const bDist = boxWidth / 2 - 4;
            const bolt1 = this.add.circle(-bDist, -bDist, 3, 0xfcd34d);
            const bolt2 = this.add.circle(bDist, -bDist, 3, 0xfcd34d);
            const bolt3 = this.add.circle(-bDist, bDist, 3, 0xfcd34d);
            const bolt4 = this.add.circle(bDist, bDist, 3, 0xfcd34d);
            
            // Neon Text
            const text = this.add.text(0, 0, val.toString(), {
                fontFamily: 'monospace',
                fontSize: '44px',
                fontWeight: '900',
                color: '#22d3ee',
                stroke: '#083344',
                strokeThickness: 6
            }).setOrigin(0.5);

            container.add([shadow, boxOuter, boxInner, bolt1, bolt2, bolt3, bolt4, text]);
            
            // Floating bounce effect
            this.tweens.add({
                targets: container,
                y: py - 5,
                duration: 1000 + Math.random() * 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.inOut'
            });

            this.boxes.push({
                val: val,
                container: container,
                currentIdx: i
            });
        }
    }

    startOperations(ops) {
        if (!ops || ops.length === 0) return;
        if (this.isAnimating) return; // Prevent spamming
        this.isAnimating = true;

        this.executeOp(ops, 0);
    }

    executeOp(ops, index) {
        if (index >= ops.length) {
            this.isAnimating = false;
            
            // Celebration flash!
            this.cameras.main.flash(500, 34, 211, 238); // Cyan flash
            return;
        }

        const op = ops[index];
        
        // Find the actual physical boxes currently residing at abstract index i and j
        const box1Def = this.boxes.find(b => b.currentIdx === op.i);
        const box2Def = this.boxes.find(b => b.currentIdx === op.j);

        if (!box1Def || !box2Def) {
            this.executeOp(ops, index + 1);
            return;
        }

        const box1 = box1Def.container;
        const box2 = box2Def.container;

        const tempX1 = box1.x;
        const tempX2 = box2.x;

        // Swap logical indexes
        box1Def.currentIdx = op.j;
        box2Def.currentIdx = op.i;

        // Mechanical arm visual
        const armLeft = this.add.line(0, 0, box1.x, box1.y - 40, box1.x, box1.y - 180, 0x22d3ee).setOrigin(0);
        const armRight = this.add.line(0, 0, box2.x, box2.y - 40, box2.x, box2.y - 180, 0x22d3ee).setOrigin(0);
        
        // Animation Sequence: Pick up -> Move across -> Put down
        this.tweens.add({
            targets: [box1, box2],
            y: '-=80',
            duration: 200,
            ease: 'Power2',
            onComplete: () => {
                
                // Cross over
                this.tweens.add({
                    targets: box1,
                    x: tempX2,
                    duration: 400,
                    ease: 'Power2'
                });
                
                this.tweens.add({
                    targets: box2,
                    x: tempX1,
                    duration: 400,
                    ease: 'Power2',
                    onComplete: () => {
                        // Put down
                        this.tweens.add({
                            targets: [box1, box2],
                            y: '+=80',
                            duration: 200,
                            ease: 'Bounce.out',
                            onComplete: () => {
                                armLeft.destroy();
                                armRight.destroy();
                                // Next operation
                                this.time.delayedCall(200, () => {
                                    this.executeOp(ops, index + 1);
                                });
                            }
                        });
                    }
                });
            }
        });
        
        // Tween the visual tracking arms simultaneously
        this.tweens.add({ targets: armLeft, x: tempX2 - tempX1, duration: 400, delay: 200 });
        this.tweens.add({ targets: armRight, x: tempX1 - tempX2, duration: 400, delay: 200 });
    }
}

export default function ArrayFactoryEngine({ initialArray, operations, resetTrigger }) {
    const gameContainer = useRef(null);
    const gameRef = useRef(null);

    useEffect(() => {
        if (!gameContainer.current) return;

        const config = {
            type: Phaser.AUTO,
            width: '100%',
            height: '100%',
            parent: gameContainer.current,
            scene: FactoryScene,
            pixelArt: true,
            backgroundColor: '#061014',
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
            const scene = gameRef.current.scene.getScene('FactoryScene');
            if (scene && initialArray) {
                scene.reactInitialArray = initialArray;
                if (!scene.isAnimating) {
                    scene.buildBoxes();
                }
            }
        }
    }, [initialArray, resetTrigger]);

    // Trigger Sorting Operations
    useEffect(() => {
        if (gameRef.current && gameRef.current.scene && operations) {
            const scene = gameRef.current.scene.getScene('FactoryScene');
            if (scene) {
                scene.reactOperations = operations;
                scene.startOperations(operations);
            }
        }
    }, [operations]);

    return <div ref={gameContainer} className="w-full h-full" />;
}
