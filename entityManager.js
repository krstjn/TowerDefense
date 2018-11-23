// =============
// ENTITYMANAGER
// =============

/*

A module which handles arbitrary entity-management.
We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var entityManager = {

    // "PRIVATE" DATA
    _bullets: [],
    _enemies: [],
    _towers: [],
    _animations: [],

    _CURRENT_WAVE: 1,
    _ENEMY_ID: 1, // Used so bullets can identify their enemy

    // "PRIVATE" METHODS

    // This function sends the next wave when called.
    _generateEnemies: function() {

        // this object contains all wave info
        var wave = waveManager.getNextWave();

        /**
         * Runs through each type of enemy we're sending and then
         * creates the given amount of each one with an appropriate delay.
         */
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

                this._generateEnemy({
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

    _generateEnemy: function(descr) {
        this._enemies.push(new Enemy(descr));
    },

    // PUBLIC METHODS

    // A special return value, used by other objects,
    // to request the blessed release of death!
    //
    KILL_ME_NOW: -1,


    deferredSetup: function() {
        this._categories = [this._bullets, this._enemies, this._towers, this._animations];
    },

    init: function() {
        // uncomment below if the first wave should come automaticly
        // this._generateEnemies();
    },

    // Called to reset the game, removes all created entities.
    reset: function() {
        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            var i = 0;
            // Clean up the spatialManager, by unregistering entities
            while (i < aCategory.length) {
                var entity = aCategory[i];
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

    isLastEnemy: function (){
        return this._enemies.length === 1;
    },

    // Called to create a bullet
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

    sendNextWave: function() {
        this._generateEnemies();
    },

    /**
     * Creates a tower if we have a tower type selected, we can afford it
     * and the cooridnates are pointing on the map and the location is
     * available.
     * clickedNewTower contains the type of tower we wish to create if any.
     */
    createNewTower: function(xPos, yPos) {
        var tower = menuManager.clickedNewTower;

        if (tower === null) return;
        if (xPos >= g_gameWidth) return;

        var towerCost = menuManager.towerTypes[tower].price;
        if (g_money < towerCost) return;

        // Finds where on the grid the given cooridnates are.
        var xGridNum = Math.floor(xPos / 40);
        var yGridNum = Math.floor(yPos / 40);
        var arrayIndex = 20 * yGridNum + xGridNum;

        /**
         * Checks the map grid to see if position is available.
         * If so we feed the tower constructor the grid location and all the
         * attributes of the tower of the type we're creating.
         */
        if (g_mapGrids[g_level][arrayIndex]) {
            this._towers.push(new Tower({
                cx: xGridNum * 40 + 20,
                cy: yGridNum * 40 + 20,
                sprite: menuManager.towerTypes[tower].sprite,
                spriteIndex: menuManager.towerTypes[tower].spriteIndex,
                shotVel: menuManager.towerTypes[tower].shotVel,
                fireRangeRadius: menuManager.towerTypes[tower].fireRangeRadius,
                rateOfFire: menuManager.towerTypes[tower].rateOfFire,
                price: menuManager.towerTypes[tower].price,
                damage: menuManager.towerTypes[tower].damage,
                type: menuManager.towerTypes[tower].type,
                index: arrayIndex
            }));

            // Deduct the cost of the tower of our savings
            g_money -= towerCost;
        }
        // Make the mapgrid location unavailable after we create a tower there
        g_mapGrids[g_level][arrayIndex] = 0;

        // play a sound when a tower is created
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

    createDeath: function(cx, cy) {
        this._animations.push(new Death({
            cx,
            cy,
            sprite: g_sprites.death,
            numberOfFrames: 7
        }));
    },

    getEnemies: function() {
        return this._enemies;
    },

    getTowers: function() {
        return this._towers;
    },

    /**
     * Returns an array of the enemies sorted by how far they've travelled.
     * This is used to make the tower shoot the first enemy and not the one
     * that's oldest.
     */
    getEnemiesByDist: function() {
        return this._enemies.sort((a, b) => {
            return b.distTravelled - a.distTravelled;
        });
    },

    // Returns a specific enemy
    getEnemyById: function(id) {
        return this._enemies.find(el => {
            return el.ID === id;
        });
    },


    /**
     * Runs through all the arrays of entities and updates each entity. If the
     * entity has a delay and its under zero, then we don't update it, we just
     * decremnt it's delay and make sure it's status is null so it doesn't get
     * killed before it's spawned.
     */
    update: function(du) {

        // OLD DESIGN: Not used anymore
        /*
        if (waveManager.isNextWaveReadyToGo(du)) {
          this._generateEnemies();
        }
        */

        // Multiply the du with our game speed multiplier to speed things up.
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

        // Set game state to WON if waves are finished and all enemies are dead
        if(waveManager.getNextWaveID() > g_waves.length && this._enemies.length === 0){
            g_gameState = WON;
        }
    },

    /**
     * Runs through all the arrays of entities and renders each entity. If the
     * entity has a delay and its under zero, then we don't render it.
     */
    render: function(ctx) {
        for (var c = 0; c < this._categories.length; ++c) {
            var aCategory = this._categories[c];
            for (var i = 0; i < aCategory.length; ++i) {
                if (aCategory[i].delay <= 0 || aCategory[i].delay == undefined)
                    aCategory[i].render(ctx);
            }
        }
    }

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
