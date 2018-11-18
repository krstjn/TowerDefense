"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

function Explosion(descr){
  this.setup(descr);

  this.frameIndex = 0,
  this.tickCount = 0,
  this.ticksPerFrame = 6,
  this.numberOfFrames = 9;
  this.radius = 50;
  this.damage = 1;

  this.explode();
}

Explosion.prototype = new Entity();

Explosion.prototype.update = function(du) {
  this.tickCount += 1;

  if(this.tickCount > this.ticksPerFrame) {
    this.tickCount = 0;
    // Go to the next frame
    // If the current frame index is in range
    if (this.frameIndex < this.numberOfFrames - 1) {	
      // Go to the next frame
      this.frameIndex += 1;
      
    } else {
      return entityManager.KILL_ME_NOW;
    }    
  }
}

Explosion.prototype.render = function(ctx) {
  var origScale = this.sprite.scale;
  // pass my scale into the sprite, for drawing
  this.sprite.scale = 1.5;
  // this.sprite.drawCentredAt(
  //   ctx, this.cx, this.cy, this.rotation
  // );

  // Hægt að nota þetta til að sjá radíus á sprengingunni
  //util.strokeCircle(ctx, this.cx, this.cy, this.radius);
  this.sprite.drawCentredAtAnimated(
      ctx, 
      this.frameIndex,
      this.cx, 
      this.cy, 
  );
}

// Býr til sprengingu sem hittir alla óvini innan radíus
Explosion.prototype.explode = function(){
  var hitEnemies = spatialManager.findAllEnemiesInRange(this.cx, this.cy, this.radius);

  for(var i=0; i<hitEnemies.length; i++){
    hitEnemies[i].takeBulletHit(this.damage);
  }
}