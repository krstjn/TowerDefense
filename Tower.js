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
  this.sprite = this.sprite || g_sprites.tower1;
  this.shotVel = this.shotVel || 4; // Shot velocity in pixels
  this.fireRangeRadius = this.fireRangeRadius || 100; // Fire range in pixels
  this.rateOfFire = this.rateOfFire || 1000; // Rate of fire in milliseconds
  this.inRangeFrameTime = null;
};

Tower.prototype = new Entity();



Tower.prototype.update = function(du) {
  spatialManager.unregister(this);
  if (this._isDeadNow) return entityManager.KILL_ME_NOW;

  var entityInRange = this.findHitEnemy();
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
    // we check wether enough time has passed between shots.
    if (!this.inRangeFrameTime) {
      this.inRangeFrameTime = main._frameTime_ms;
      this.shoot();
    } else if (this.shouldShoot()) {
      this.shoot();
    }
  } else {
    // To make sure this becomes null when an enemy gets out of range.
    this.inRangeFrameTime = null;
  }

  spatialManager.register(this);
};

// Checks if enough time has passed between shots
Tower.prototype.shouldShoot = function() {
  if (this.inRangeFrameTime + this.rateOfFire < main._frameTime_ms) {
    this.inRangeFrameTime = main._frameTime_ms;
    return true;
  }
}

Tower.prototype.getRadius = function() {
  return (this.sprite.width / 2);
};

// HACKED-IN AUDIO (no preloading)
Tower.prototype.shootSound = new Audio(
  "sounds/rockEvaporate.ogg");

// Shoot in the direction the tower is pointing
Tower.prototype.shoot = function() {
  console.log("bullet was fired at frame time: " + main._frameTime_ms);
  this.shootSound.play();
  var dX = +Math.sin(this.rotation);
  var dY = -Math.cos(this.rotation);
  var launchDist = this.getRadius() * 1.2;

  var relVel = this.shotVel;
  var relVelX = dX * relVel;
  var relVelY = dY * relVel;
  console.log("relvelx = " + relVelX);
  console.log("relvely = " + relVelY);

  entityManager.fireBullet(
    this.cx + dX * launchDist, this.cy + dY * launchDist,
    relVelX, relVelY,
    this.rotation);
};

Tower.prototype.render = function(ctx) {
  this.sprite.drawCentredAt(
    ctx, this.cx, this.cy, this.rotation
  );
};
