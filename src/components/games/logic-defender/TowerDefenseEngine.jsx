"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const GRID_SIZE = 64;
const MAP_WIDTH = 16;
const MAP_HEIGHT = 10;

// Winding path for bugs to march down
const PATH_COORDS = [
    {x:0, y:2}, {x:1, y:2}, {x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:5},
    {x:3, y:5}, {x:4, y:5}, {x:4, y:4}, {x:4, y:3}, {x:4, y:2}, {x:4, y:1},
    {x:5, y:1}, {x:6, y:1}, {x:7, y:1}, {x:8, y:1}, {x:8, y:2}, {x:8, y:3},
    {x:8, y:4}, {x:8, y:5}, {x:8, y:6}, {x:8, y:7}, {x:7, y:7}, {x:6, y:7},
    {x:5, y:7}, {x:5, y:8}, {x:4, y:8}, {x:3, y:8}, {x:2, y:8}, {x:1, y:8},
    {x:1, y:9}, {x:2, y:9}, {x:3, y:9}, {x:4, y:9}, {x:5, y:9}, {x:6, y:9},
    {x:7, y:9}, {x:8, y:9}, {x:9, y:9}, {x:10, y:9}, {x:10, y:8}, {x:11, y:8},
    {x:12, y:8}, {x:12, y:7}, {x:12, y:6}, {x:11, y:6}, {x:10, y:6}, {x:10, y:5},
    {x:11, y:5}, {x:12, y:5}, {x:13, y:5}, {x:14, y:5}, {x:14, y:4}, {x:14, y:3},
    {x:15, y:3} // Core at 15,3
];

class TDScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TDScene' });
        this.enemies = [];
        this.towers = [];
        this.bullets = [];
        this.pathCurve = null;
        this.nextEnemySpawn = 0;
        
        // Game State
        this.hp = 100;
        this.credits = 500;
        this.wave = 1;
        this.enemiesLeftInWave = 10;
        this.enemySpawnDelay = 1500;
        this.isPlaying = true;

        // Callback hooks
        this.onUpdateHp = null;
        this.onUpdateCredits = null;
        this.onUpdateWave = null;
        this.reactSelectedTower = 'OR';
    }

    preload() {
        this.load.spritesheet('hero', '/assets/hero_walk.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('forest_bg', '/assets/scenery/forest_bg.png');
        this.load.spritesheet('tiny_town', '/assets/tiny_town_tiles.png', { frameWidth: 16, frameHeight: 16 });
    }

    create() {
        // Pixel Art Canvas Background
        const bg = this.add.image(0, 0, 'forest_bg').setOrigin(0, 0);
        bg.setDisplaySize(MAP_WIDTH * GRID_SIZE, MAP_HEIGHT * GRID_SIZE);
        bg.setAlpha(0.2).setTint(0x003366);

        // Path Graphic
        this.pathGraphics = this.add.graphics();
        this.pathCurve = new Phaser.Curves.Path(PATH_COORDS[0].x * GRID_SIZE + GRID_SIZE/2, PATH_COORDS[0].y * GRID_SIZE + GRID_SIZE/2);
        
        this.pathGraphics.lineStyle(GRID_SIZE - 10, 0x111111, 0.5);
        
        for (let i = 1; i < PATH_COORDS.length; i++) {
            const p = PATH_COORDS[i];
            this.pathCurve.lineTo(p.x * GRID_SIZE + GRID_SIZE/2, p.y * GRID_SIZE + GRID_SIZE/2);
        }
        this.pathCurve.draw(this.pathGraphics);
        
        // Draw physical dirt tiles on path
        PATH_COORDS.forEach(p => {
            // Tile 16 is usually dirt path in tiny_town
            const tile = this.add.image(p.x * GRID_SIZE + GRID_SIZE/2, p.y * GRID_SIZE + GRID_SIZE/2, 'tiny_town', 16);
            tile.setScale(4).setTint(0x888888);
        });

        // CPU Core (End of Path)
        const coreP = PATH_COORDS[PATH_COORDS.length - 1];
        this.coreSprite = this.add.circle(coreP.x * GRID_SIZE + GRID_SIZE/2, coreP.y * GRID_SIZE + GRID_SIZE/2, 40, 0x00ffff, 0.8);
        this.tweens.add({ targets: this.coreSprite, scale: 1.2, alpha: 0.4, yoyo: true, repeat: -1, duration: 800 });
        this.add.text(this.coreSprite.x, this.coreSprite.y, "CPU", { font: "20px font-mono", color: "#000" }).setOrigin(0.5);

        // Grid Input Overlay
        this.input.on('pointerdown', this.onGridClick, this);

        // Grid Hover Overlay
        this.hoverCursor = this.add.rectangle(0, 0, GRID_SIZE, GRID_SIZE, 0xffffff, 0.2);
        this.hoverCursor.setOrigin(0,0);
        this.input.on('pointermove', (pointer) => {
            const gx = Math.floor(pointer.x / GRID_SIZE) * GRID_SIZE;
            const gy = Math.floor(pointer.y / GRID_SIZE) * GRID_SIZE;
            this.hoverCursor.setPosition(gx, gy);
        });

        // Sync initial state
        this.updateReactState();
    }

    update(time, delta) {
        if (!this.isPlaying) return;

        // Wave Spawner
        if (time > this.nextEnemySpawn && this.enemiesLeftInWave > 0) {
            this.spawnEnemy();
            this.enemiesLeftInWave--;
            this.nextEnemySpawn = time + this.enemySpawnDelay;
            
            if (this.enemiesLeftInWave === 0 && this.wave < 10) {
                // Next wave start delay
                this.time.delayedCall(5000, () => {
                    this.wave++;
                    this.enemiesLeftInWave = 10 + (this.wave * 2);
                    this.enemySpawnDelay = Math.max(400, 1500 - (this.wave * 100));
                    this.updateReactState();
                });
            }
        }

        // Update Enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            
            // Move along path
            enemy.t += (0.00015 + (this.wave * 0.00001)) * delta; 
            
            if (enemy.t >= 1) {
                // Reached Core
                this.hp -= 10;
                this.updateReactState();
                
                // Camera shake
                this.cameras.main.shake(100, 0.01);
                
                enemy.sprite.destroy();
                enemy.healthBar.destroy();
                this.enemies.splice(i, 1);
                
                if (this.hp <= 0 && this.isPlaying) {
                    this.isPlaying = false;
                    if (this.onGameOver) this.onGameOver();
                }
                continue;
            }

            // Get new position
            const vec = this.pathCurve.getPoint(enemy.t);
            enemy.sprite.setPosition(vec.x, vec.y);
            enemy.healthBar.setPosition(vec.x - 15, vec.y - 30);
        }

        // Update Towers
        this.towers.forEach(tower => {
            if (time < tower.nextFire) return;

            // Gather enemies in strict radius
            const inRange = this.enemies.filter(e => Phaser.Math.Distance.Between(tower.x, tower.y, e.sprite.x, e.sprite.y) <= tower.range);
            
            let target = null;
            let willFire = false;

            if (tower.logic === 'OR') {
                willFire = inRange.length > 0;
                if (willFire) target = inRange[0]; // Nearest on path essentially (not exactly but works for simple TD)
            } 
            else if (tower.logic === 'AND') {
                willFire = inRange.length >= 2;
                if (willFire) target = inRange[0]; // Hits the leader
            }
            else if (tower.logic === 'NOT') {
                willFire = inRange.length === 0 && this.enemies.length > 0;
                if (willFire) {
                    // Global Sniper - hits furthest enemy globally
                    target = this.enemies.reduce((prev, current) => (prev.t > current.t) ? prev : current);
                }
            }
            else if (tower.logic === 'XOR') {
                willFire = inRange.length === 1;
                if (willFire) target = inRange[0];
            }

            if (willFire && target) {
                this.fireBullet(tower, target);
                tower.nextFire = time + tower.fireRate;
            }
        });

        // Update Bullets
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const b = this.bullets[i];
            
            if (!b.target || !b.target.sprite || !b.target.sprite.active) {
                b.sprite.destroy();
                this.bullets.splice(i, 1);
                continue;
            }

            // Move Bullet
            const angle = Phaser.Math.Angle.Between(b.sprite.x, b.sprite.y, b.target.sprite.x, b.target.sprite.y);
            const speed = b.speed * delta;
            b.sprite.x += Math.cos(angle) * speed;
            b.sprite.y += Math.sin(angle) * speed;

            // Collision
            if (Phaser.Math.Distance.Between(b.sprite.x, b.sprite.y, b.target.sprite.x, b.target.sprite.y) < 15) {
                
                // Damage
                b.target.hp -= b.damage;
                b.target.healthBar.fillStyle(0xff0000);
                b.target.healthBar.fillRect(0, 0, (b.target.hp / b.target.maxHp) * 30, 4);

                // Hit Effect
                const hit = this.add.circle(b.sprite.x, b.sprite.y, 20, towerColorMap[b.towerLogic].num, 0.8);
                this.tweens.add({ targets: hit, scale: 2, alpha: 0, duration: 200, onComplete:()=>hit.destroy() });

                if (b.target.hp <= 0) {
                    this.credits += 15;
                    this.updateReactState();
                    
                    // Death FX
                    const death = this.add.sprite(b.target.sprite.x, b.target.sprite.y, 'hero').setFrame(4).setScale(2).setTint(0xff0000);
                    this.tweens.add({ targets: death, scale: 0, rotation: Math.PI, duration: 300, onComplete:()=>death.destroy() });

                    b.target.sprite.destroy();
                    b.target.healthBar.destroy();
                    const index = this.enemies.indexOf(b.target);
                    if (index > -1) this.enemies.splice(index, 1);
                }

                b.sprite.destroy();
                this.bullets.splice(i, 1);
            }
        }
    }

    spawnEnemy() {
        const startPoint = this.pathCurve.getPoint(0);
        const sprite = this.add.sprite(startPoint.x, startPoint.y, 'hero').setScale(1.5).setTint(0xff3333);
        
        // Glitchy walking animation
        if (!this.anims.exists('bug_walk')) {
            this.anims.create({ key: 'bug_walk', frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 8 }), frameRate: 15, repeat: -1 });
        }
        sprite.play('bug_walk');

        // Health Bar container
        const healthBar = this.add.graphics();
        const maxHp = 30 + (this.wave * 15);

        healthBar.fillStyle(0xff0000);
        healthBar.fillRect(0, 0, 30, 4);

        this.enemies.push({
            sprite,
            healthBar,
            t: 0,
            hp: maxHp,
            maxHp: maxHp
        });
    }

    onGridClick(pointer) {
        if (!this.isPlaying) return;

        const gx = Math.floor(pointer.x / GRID_SIZE);
        const gy = Math.floor(pointer.y / GRID_SIZE);

        // Map checks
        if (gx < 0 || gx >= MAP_WIDTH || gy < 0 || gy >= MAP_HEIGHT) return;

        // Check if on path
        const isOnPath = PATH_COORDS.some(p => p.x === gx && p.y === gy);
        if (isOnPath) {
            this.cameras.main.shake(100, 0.005); // Error shake
            return;
        }

        // Check if tower already exists there
        const alreadyTower = this.towers.some(t => t.gx === gx && t.gy === gy);
        if (alreadyTower) return;

        const specs = towerSpecs[this.reactSelectedTower];
        if (!specs) return;

        if (this.credits < specs.cost) {
            this.cameras.main.shake(100, 0.005); // Not enough money error shake
            return;
        }

        this.credits -= specs.cost;
        this.updateReactState();

        const px = gx * GRID_SIZE + GRID_SIZE/2;
        const py = gy * GRID_SIZE + GRID_SIZE/2;

        // Build Tower Visual
        const base = this.add.image(px, py + 10, 'tiny_town', 48).setScale(3).setTint(0x555555); // Stone base
        const head = this.add.circle(px, py - 5, 16, specs.colorNum, 0.9);
        const text = this.add.text(px, py - 5, this.reactSelectedTower, { font: "10px font-mono", color: "#000", fontStyle: "bold" }).setOrigin(0.5);

        // Constant floating
        this.tweens.add({ targets: [head, text], y: '-=4', duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.inOut' });

        // Radius debug circle
        if (specs.range < 1000) {
            const rad = this.add.circle(px, py, specs.range, specs.colorNum, 0.05);
            rad.setStrokeStyle(1, specs.colorNum, 0.2);
        }

        this.towers.push({
            gx, gy, x: px, y: py,
            logic: this.reactSelectedTower,
            range: specs.range,
            damage: specs.damage,
            fireRate: specs.fireRate,
            nextFire: 0,
            sprite: head,
            specs: specs
        });

        // Build Placement FX
        const fx = this.add.circle(px, py, 40, specs.colorNum, 0.5);
        this.tweens.add({ targets: fx, scale: 2, alpha: 0, duration: 400, onComplete:()=>fx.destroy() });
    }

    fireBullet(tower, target) {
        // Recoil
        this.tweens.add({ targets: tower.sprite, scale: 1.3, duration: 50, yoyo: true });

        const sprite = this.add.circle(tower.x, tower.y, 6, 0xffffff, 1);
        sprite.setStrokeStyle(2, tower.specs.colorNum, 1);
        
        // Trail
        const trail = this.add.particles(0, 0, 'dummy', { // Phaser 3.60 generic particles fallback
            speed: 0, lifespan: 200, scale: { start: 0.5, end: 0 },
            alpha: { start: 0.5, end: 0 }, blendMode: 'ADD'
        });
        
        // Fallback for particle texture if 'dummy' fails silently
        const gfx = this.make.graphics({x:0,y:0});
        gfx.fillStyle(tower.specs.colorNum).fillCircle(4,4,4);
        gfx.generateTexture('bullet_trail', 8, 8);
        gfx.destroy();

        const emitter = this.add.particles(0, 0, 'bullet_trail', {
            speed: 0, lifespan: 150, alpha: {start:0.5, end:0}, scale: {start:1, end:0}, blendMode: 'ADD'
        });
        emitter.startFollow(sprite);

        this.bullets.push({
            sprite, target, speed: 0.5, damage: tower.damage, towerLogic: tower.logic, emitter
        });
    }

    updateReactState() {
        if (this.onUpdateHp) this.onUpdateHp(this.hp);
        if (this.onUpdateCredits) this.onUpdateCredits(this.credits);
        if (this.onUpdateWave) this.onUpdateWave(this.wave);
    }
}

const towerColorMap = {
    'OR': { num: 0x00ffff, hex: '#00ffff' },
    'AND': { num: 0xffa500, hex: '#ffa500' },
    'NOT': { num: 0x10b981, hex: '#10b981' },
    'XOR': { num: 0xc084fc, hex: '#c084fc' },
};

const towerSpecs = {
    'OR':  { cost: 100, range: 160, damage: 15, fireRate: 400, colorNum: 0x00ffff },
    'AND': { cost: 200, range: 110, damage: 60, fireRate: 1500, colorNum: 0xffa500 }, // Needs intense crowding
    'NOT': { cost: 150, range: 5000, damage: 45, fireRate: 1000, colorNum: 0x10b981 }, // Range infinite, disabled if enemy within 100? Implementation above implies disabled if 0 enemies. Wait! My implementation above explicitly says: willFire = inRange.length === 0. This implies Range is actually a small personal radius! 
    'XOR': { cost: 250, range: 220, damage: 120, fireRate: 2000, colorNum: 0xc084fc }
};
// Re-adjusting NOT logic specs to match my exact code above:
towerSpecs['NOT'].range = 100; // If any enemies inside 100 radius, it won't fire. But if 0 enemies in radius, it snipes anywhere globally.

export default function TowerDefenseEngine({ selectedTower, onUpdateHp, onUpdateCredits, onUpdateWave, onGameOver }) {
    const gameContainer = useRef(null);
    const gameRef = useRef(null);

    useEffect(() => {
        if (!gameContainer.current) return;

        const config = {
            type: Phaser.AUTO,
            width: MAP_WIDTH * GRID_SIZE,
            height: MAP_HEIGHT * GRID_SIZE,
            parent: gameContainer.current,
            scene: TDScene,
            pixelArt: true,
            backgroundColor: '#02050a',
            audio: {
                noAudio: true
            },
            scale: {
                mode: Phaser.Scale.FIT,
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

    // Sync React props to Phaser
    useEffect(() => {
        if (gameRef.current) {
            const scene = gameRef.current.scene.getScene('TDScene');
            if (scene) {
                scene.reactSelectedTower = selectedTower;
                scene.onUpdateHp = onUpdateHp;
                scene.onUpdateCredits = onUpdateCredits;
                scene.onUpdateWave = onUpdateWave;
                scene.onGameOver = onGameOver;
            }
        }
    }, [selectedTower, onUpdateHp, onUpdateCredits, onUpdateWave, onGameOver]);

    return <div ref={gameContainer} className="w-full h-full cursor-crosshair opacity-90 hover:opacity-100 transition-opacity duration-500" />;
}
