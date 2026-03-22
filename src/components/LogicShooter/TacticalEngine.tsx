'use client';

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { GameAudio, sfxAttack, sfxHit } from '@/lib/sounds';

/**
 * TacticalEngine - The Phaser 3 core for Logic Operative.
 * Receives commands like 'MOVE_UP', 'SCAN', 'ENGAGE'.
 */

export interface TacticalEngineRef {
    executeCommand: (cmd: string, params?: any) => Promise<void>;
    resetScene: () => void;
}

interface TacticalEngineProps {
    onStatusUpdate?: (s: string) => void;
    onTargetDestroyed?: (remaining: number) => void;
}

const TacticalEngine = forwardRef<TacticalEngineRef, TacticalEngineProps>((props, ref) => {
    const { onStatusUpdate, onTargetDestroyed } = props;
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const [health, setHealth] = useState(100);
    const [ammo, setAmmo] = useState(30);
    const [status, setStatus] = useState('READY');
    const phaserInstance = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        executeCommand: async (cmd: string, params?: any) => {
            if (phaserInstance.current) {
                const scene = phaserInstance.current.scene.getScene('GameScene') as any;
                if (scene) return scene.handleExternalCommand(cmd, params);
            }
        },
        resetScene: () => {
            if (phaserInstance.current) {
                const scene = phaserInstance.current.scene.getScene('GameScene') as any;
                if (scene) scene.scene.restart();
            }
        }
    }));

    useEffect(() => {
        let game: any;
        import('phaser').then((Phaser) => {
            
            class Soldier extends Phaser.GameObjects.Container {
                public gun: Phaser.GameObjects.Graphics;
                constructor(scene: Phaser.Scene, x: number, y: number) {
                    super(scene, x, y);
                    scene.add.existing(this);
                    scene.physics.add.existing(this);
                    const body = this.body as Phaser.Physics.Arcade.Body;
                    body.setCollideWorldBounds(true);
                    body.setCircle(15);
                    body.setOffset(-15, -15);

                    const g = scene.add.graphics();
                    g.fillStyle(0x000000, 0.3);
                    g.fillEllipse(0, 5, 20, 10);
                    g.lineStyle(2, 0x00c8ff, 1);
                    g.fillStyle(0x0f172a, 1);
                    g.fillCircle(0, 0, 15);
                    g.strokeCircle(0, 0, 15);
                    g.fillStyle(0x38bdf8, 1);
                    g.fillRect(-10, -10, 20, 12);
                    g.strokeRect(-10, -10, 20, 12);
                    g.fillStyle(0x1e293b, 1);
                    g.fillCircle(0, -2, 6);
                    g.strokeCircle(0, -2, 6);

                    this.gun = scene.add.graphics();
                    this.gun.fillStyle(0x334155, 1);
                    this.gun.fillRect(5, -3, 20, 6);
                    this.add([g, this.gun]);
                }
            }

            class GameScene extends Phaser.Scene {
                private player!: Soldier;
                private env!: Phaser.Physics.Arcade.StaticGroup;
                private targets!: Phaser.Physics.Arcade.Group;
                private bullets!: Phaser.Physics.Arcade.Group;
                private isBusy = false;

                constructor() { super('GameScene'); }

                create() {
                    const { width: vw, height: vh } = this.scale;
                    this.add.grid(vw/2, vh/2, vw, vh, 40, 40, 0x050a05, 1, 0x1a3a1a, 0.1).setDepth(-10);
                    this.env = this.physics.add.staticGroup();
                    this.bullets = this.physics.add.group();
                    this.targets = this.physics.add.group();

                    // Dummy targets for "Logic Building"
                    for(let i=0; i<3; i++) {
                        const tx = Phaser.Math.Between(100, vw-100);
                        const ty = Phaser.Math.Between(100, vh-100);
                        const t = this.add.circle(tx, ty, 10, 0xef4444);
                        this.physics.add.existing(t);
                        this.targets.add(t);
                    }

                    this.player = new Soldier(this, 100, 100);
                    this.physics.add.collider(this.player, this.env);
                }

                public async handleExternalCommand(cmd: string, params?: any) {
                    if (this.isBusy) return;
                    this.isBusy = true;
                    setStatus(`EXECUTING: ${cmd}`);

                    switch(cmd) {
                        case 'MOVE_UP':    await this.moveAgent(0, -60); break;
                        case 'MOVE_DOWN':  await this.moveAgent(0, 60); break;
                        case 'MOVE_LEFT':  await this.moveAgent(-60, 0); break;
                        case 'MOVE_RIGHT': await this.moveAgent(60, 0); break;
                        case 'ENGAGE':      await this.engageTarget(); break;
                        case 'SCAN':        await this.scanArea(); break;
                    }

                    this.isBusy = false;
                    setStatus('IDLE');
                }

                private moveAgent(dx: number, dy: number) {
                    return new Promise<void>(resolve => {
                        const targetX = this.player.x + dx;
                        const targetY = this.player.y + dy;
                        this.tweens.add({
                            targets: this.player,
                            x: targetX,
                            y: targetY,
                            duration: 400,
                            onComplete: () => resolve()
                        });
                    });
                }

                private engageTarget() {
                    return new Promise<void>(resolve => {
                        // Find closest target
                        let closest: any = null;
                        let minDist = 300;
                        this.targets.children.iterate((t: any) => {
                            const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, t.x, t.y);
                            if (d < minDist) { minDist = d; closest = t; }
                            return true;
                        });

                        if (closest) {
                            const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, closest.x, closest.y);
                            this.player.setRotation(angle);
                            this.shoot(closest.x, closest.y);
                        }
                        this.time.delayedCall(500, () => resolve());
                    });
                }

                private shoot(tx: number, ty: number) {
                    sfxAttack();
                    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, tx, ty);
                    const b = this.add.circle(this.player.x, this.player.y, 4, 0xfacc15);
                    this.physics.add.existing(b);
                    const body = b.body as Phaser.Physics.Arcade.Body;
                    body.setVelocity(Math.cos(angle) * 600, Math.sin(angle) * 600);
                    
                    this.physics.add.overlap(b, this.targets, (bullet, target) => {
                        target.destroy();
                        bullet.destroy();
                        sfxHit();
                        if (onTargetDestroyed) onTargetDestroyed(this.targets.countActive());
                    });
                }

                private scanArea() {
                    return new Promise<void>(resolve => {
                        const scanCircle = this.add.circle(this.player.x, this.player.y, 10, 0x00c8ff, 0.2);
                        this.tweens.add({
                            targets: scanCircle,
                            radius: 150,
                            alpha: 0,
                            duration: 600,
                            onComplete: () => { scanCircle.destroy(); resolve(); }
                        });
                    });
                }
            }

            const config = {
                type: Phaser.AUTO,
                parent: gameContainerRef.current!,
                width: 800,
                height: 500,
                backgroundColor: '#050a05',
                physics: { default: 'arcade', arcade: { debug: false } },
                scene: [GameScene]
            };

            game = new Phaser.Game(config);
            phaserInstance.current = game;
        });

        return () => { if (game) game.destroy(true); };
    }, []);

    return (
        <div className="relative glass rounded-3xl overflow-hidden border-brand-purple/20 shadow-2xl">
            <div ref={gameContainerRef} className="w-full h-full" />
            
            {/* Tactical HUD Overlay */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="glass px-4 py-2 border-brand-neon/30 text-brand-neon font-pixel text-[10px] tracking-widest uppercase">
                    System Status: {status}
                </div>
                <div className="flex gap-1 h-2 w-32 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-neon shadow-[0_0_10px_#00ff9f]" style={{ width: `${health}%` }} />
                </div>
            </div>
        </div>
    );
});

TacticalEngine.displayName = 'TacticalEngine';
export default TacticalEngine;
