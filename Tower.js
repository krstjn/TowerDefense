// ====
// Tower
// ====

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
    this.sprite = this.sprite || g_sprites.ship;

};

Tower.prototype = new Entity();



Tower.prototype.update = function (du) {
    spatialManager.unregister(this);
    if(this._isDeadNow) return entityManager.KILL_ME_NOW;

    var entityInRange = this.findHitEntity();
    if (entityInRange) {
        var entityPos = this.getPos();
        this.rotation = util.getRotation(
            this.cx,
            this.cy,
            entityInRange.cx,
            entityInRange.cy
        );
    }

    spatialManager.register(this);

};

Tower.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 5;
};

// HACKED-IN AUDIO (no preloading)
Tower.prototype.shootSound = new Audio(
  "sounds/rockEvaporate.ogg");

Tower.prototype.shoot = function () {
    this.shootSound.play();
};

Tower.prototype.render = function (ctx) {
    // pass my scale into the sprite, for drawing
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
