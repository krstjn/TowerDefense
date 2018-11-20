"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

function Stun(descr) {
    this.setup(descr);

    this.frameIndex = 0,
    this.tickCount = 0,
    this.ticksPerFrame = 1,
    this.numberOfFrames = 49;

}

Stun.prototype = new Entity();

Stun.prototype.update = function(du) {
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
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

Stun.prototype.render = function(ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = 0.4;
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

