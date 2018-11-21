/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

    // "PRIVATE" DATA
    _bullets: [],
    _enemies: [],
    _towers: [],
    _animations: [],

    _CURRENT_WAVE: 1,
    _ENEMY_ID: 1,

    // "PRIVATE" METHODS

    _generateEnemies: function() {
        var wave = waveManager.getNextWave();

        for (var i = 0; i < wave.length; i++) {
            var {
                type,
                amount,
                initialDelay,
                flying,
                bounty,
                hp
            } = wave[i];
            var index = -1;
            var {
                enemy,
                index
            } = waveManager.getEnemyStats(type);
            for (var j = 0; j < amount; j++) {

                this.generateEnemy({
                    ID: this._ENEMY_ID++,
                    type: type,
                    hp: hp,
                    delay: (initialDelay + enemy.delay * j),
                    vel: enemy.vel,
                    sprite: g_sprites.enemies[index],
                    numberOfFrames: 4,
                    flying: flying,
                    bounty: bounty,
                });
            }
        }
    },

    // PUBLIC METHODS

    // A special return value, used by other objects,
    // to request the blessed release of death!
    //
    KILL_ME_NOW: -1,

    // Some things must be deferred until after initial construction
    // i.e. thing which need `this` to be defined.
    //
    deferredSetup: function() {
        this._categories = [this._bullets, this._enemies, this._towers, this._animations];
    },

    init: function() {
        this._generateEnemies();
    },
    reset: function() {
        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            var i = 0;
            // Clean up the spatialManager, by unregistering entities
            while (i < aCategory.length) {
                var entity = aCategory[i];
                console.log(entity);
                spatialManager.unregister(entity);
                i++;
            }
        }

        // Clean up entityManager, reset arrays
        this._bullets = [];
        this._enemies = [];
        this._towers = [];

        this.deferredSetup();
    },

    fireBullet: function(cx, cy, velX, velY, xLength, yLength, rotation, damage, type, target) {
        this._bullets.push(new Bullet({
            cx: cx,
            cy: cy,
            velX: velX,
            velY: velY,
            xLength: xLength,
            yLength: yLength,
            rotation: rotation,
            damage: damage,
            type: type,
            target: target
        }));
    },

    generateEnemy: function(descr) {
        this._enemies.push(new Enemy(descr));
    },

    sendNextWave: function() {
        this._generateEnemies();
    },

    createNewTower: function(xPos, yPos) {
        if (menuManager.clickedNewTower === null) return;
        if (xPos >= g_gameWidth) return;
        var towerCost = menuManager._towerTypes[menuManager.clickedNewTower].price;
        if (g_money < towerCost) return;

        var xGridNum = Math.floor(xPos / 40);
        var yGridNum = Math.floor(yPos / 40);
        var arrayIndex = 20 * yGridNum + xGridNum;

        if (g_mapGrids[g_level][arrayIndex]) {
            this._towers.push(new Tower({
                cx: xGridNum * 40 + 20,
                cy: yGridNum * 40 + 20,
                sprite: menuManager._towerTypes[menuManager.clickedNewTower].sprite,
                spriteIndex: menuManager._towerTypes[menuManager.clickedNewTower].spriteIndex,
                shotVel: menuManager._towerTypes[menuManager.clickedNewTower].shotVel,
                fireRangeRadius: menuManager._towerTypes[menuManager.clickedNewTower].fireRangeRadius,
                rateOfFire: menuManager._towerTypes[menuManager.clickedNewTower].rateOfFire,
                price: menuManager._towerTypes[menuManager.clickedNewTower].price,
                damage: menuManager._towerTypes[menuManager.clickedNewTower].damage,
                type: menuManager._towerTypes[menuManager.clickedNewTower].type,
                index: arrayIndex
            }));

            g_money -= towerCost;
        }
        g_mapGrids[g_level][arrayIndex] = 0;
        if (g_soundOn) menuManager.actionSound.play();
    },
    createExplosion: function(cx, cy, damage) {
        this._animations.push(new Explosion({
            cx,
            cy,
            sprite: g_sprites.explosion,
            damage,
            numberOfFrames: 9
        }));
    },
    createPoison: function(entity) {
        this._animations.push(new Poison({
            entity,
            sprite: g_sprites.poison,
        }));
    },
    createStun: function(cx, cy, damage) {
        this._animations.push(new Stun({
            cx,
            cy,
            sprite: g_sprites.stun,
            damage,
        }));
    },
    createDeath: function(cx, cy){
        this._animations.push(new Death({
            cx,
            cy,
            sprite: g_sprites.death,
            numberOfFrames: 7
        }));
    },
    getEnemiesByDist: function() {
        return this._enemies.sort((a, b) => {
            return b.distTravelled - a.distTravelled;
        });
    },
    getEnemyById: function(id) {
        return this._enemies.find(el => {
            return el.ID === id;
        });
    },

    update: function(du) {

        // Kalla á wave tengt tíma EKKI I NOTAD NUNA
        /*
        if (waveManager.isNextWaveReadyToGo(du)) {
          this._generateEnemies();
        }
        */
        du *= g_speed;
        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            var i = 0;
            var status = null;

            while (i < aCategory.length) {

                if (aCategory[i].delay <= 0 || aCategory[i].delay === undefined) {
                    status = aCategory[i].update(du);
                } else {
                    aCategory[i].delay = aCategory[i].delay - du;
                    status = null; // Núllstilla status svo óvinum sem eiga eftir að spawna verði ekki eytt
                }

                if (status === this.KILL_ME_NOW) {
                    // remove the dead guy, and shuffle the others down to
                    // prevent a confusing gap from appearing in the array
                    aCategory.splice(i, 1);
                } else {
                    ++i;
                }
            }
        }
    },

    render: function(ctx) {

        var debugX = 10,
            debugY = 100;

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];

            for (var i = 0; i < aCategory.length; ++i) {
                if (aCategory[i].delay <= 0 || aCategory[i].delay == undefined)
                    aCategory[i].render(ctx);
                //debug.text(".", debugX + i * 10, debugY);

            }
            debugY += 10;
        }
        this._enemies.forEach(el => {
            el.renderHealthBar(ctx);
        });
    }

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
