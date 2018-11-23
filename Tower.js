// =====
// Tower
// =====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Tower(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite;
    this.shotVel = this.shotVel; // Shot velocity in pixels
    this.fireRangeRadius = this.fireRangeRadius; // Fire range in pixels
    this.rateOfFire = this.rateOfFire; // Rate of fire in milliseconds
    this.price = this.price;
    this.damage = this.damage;
    this.inRangeTime = null;
    this.index = this.index;
    this.lvl = 1; // Upgrade level
};

Tower.prototype = new Entity();

Tower.prototype.update = function(du) {
    spatialManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    var entityInRange = this.findHitEnemy(this.type);
    if (entityInRange) {
        var entityPos = this.getPos();
        // Make tower point at first enemy in range.
        this.rotation = util.getRotation(
            this.cx,
            this.cy,
            entityInRange.cx,
            entityInRange.cy
        );
        // check if the entity was previosly in range, if not shoot
        // and set the inRangeFrameTime as current _frameTime_ms. Else we
        // we check whether enough time has passed between shots.
        if (this.inRangeTime == null) {
            this.inRangeTime = 0;
            this.shoot(entityInRange);
        } else if (this.shouldShoot(du)) {
            this.shoot(entityInRange);
        }
    } else {
        // To make sure this becomes null when an enemy gets out of range.
        this.inRangeTime = null;
    }

    spatialManager.register(this);
};

// Updates the tower stats and sprite, based on upgrade level
Tower.prototype.upgrade = function() {
    this.lvl += 1;
    if (this.lvl == 2) this.spriteIndex += 6;
    if (this.lvl == 4) this.spriteIndex += 6;
    if (this.lvl == 6) this.spriteIndex += 6;
    if (this.lvl == 8) this.spriteIndex += 6;
    if (this.lvl == 10) this.spriteIndex += 6;
    this.sprite = g_sprites.towers[this.spriteIndex];
    this.price = Math.round(this.price * 2.5 / 10) * 10;
    this.damage *= 2;
    this.fireRangeRadius *= 1.1;
    this.rateOfFire *= 0.9;
    g_money -= this.price;
};

// Sells a tower in the grid
Tower.prototype.sell = function() {
    g_money += Math.floor(this.price*0.75 / 10) * 10;
    g_mapGrids[g_level][this.index] = 1;
    for (var i = 0; i < entityManager._towers.length; i++) {
        if (entityManager._towers[i] === this) {
            entityManager._towers.splice(i, 1);
        }
    }

};

// Checks if enough time has passed between shots
Tower.prototype.shouldShoot = function(du) {
    if (this.rateOfFire < this.inRangeTime) {
        this.inRangeTime -= this.rateOfFire;
        return true;
    }
    this.inRangeTime += du*NOMINAL_UPDATE_INTERVAL;
};

Tower.prototype.getRadius = function() {
    return (this.sprite.width / 2);
};

// Shoot in the direction the tower is pointing
Tower.prototype.shoot = function(target) {
    var dX = +Math.sin(this.rotation);
    var dY = -Math.cos(this.rotation);
    var launchDist = this.getRadius() * 1.2;

    var relVel = this.shotVel;
    var relVelX = dX * relVel;
    var relVelY = dY * relVel;

    var xLength = Math.abs(target.cx - this.cx)-launchDist;
    var yLength = Math.abs(target.cy - this.cy)-launchDist;

    entityManager.fireBullet(
        this.cx + dX * launchDist, this.cy + dY * launchDist,
        relVelX, relVelY, xLength, yLength,
        this.rotation, this.damage, this.type, target);
};

Tower.prototype.render = function(ctx) {
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
