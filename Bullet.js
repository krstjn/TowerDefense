// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    if (this.type === EXPLODE) {
        this.fireSound = new Audio("sounds/shot1.ogg");
        this.hitSound = new Audio("sounds/explosion.ogg");
        this.hitSound.volume = 0.5;
    }
    // Make a noise when I am created (i.e. fired)
    if (g_soundOn) this.fireSound.play();

    /*
        // Diagnostics to check inheritance stuff
        this._bulletProperty = true;
        console.dir(this);
    */

}

Bullet.prototype = new Entity();



// Initial, inheritable, default values
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

Bullet.prototype.fireSound = new Audio("sounds/shot1.ogg");
Bullet.prototype.hitSound = new Audio("sounds/bulletHit.ogg");
// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function(du) {

    spatialManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation += 1 * du;
    this.rotation = util.wrapRange(this.rotation,
        0, consts.FULL_CIRCLE);

    //
    // Handle collisions
    //
    var e = entityManager.getEnemyById(this.targetID);
    if (e) {
        var distSq = util.distSq(this.cx, this.cy, e.cx, e.cy);
        var hitDistSq = util.square(this.getRadius() + e.getRadius());
        if (hitDistSq >= distSq) {
            e.takeBulletHit(this.damage, this.type);
            if (this.type === EXPLODE) entityManager.createExplosion(e.cx, e.cy, this.damage);
            if (g_soundOn) this.hitSound.play();
            return entityManager.KILL_ME_NOW;
        }
    }

    spatialManager.register(this);

};

Bullet.prototype.getRadius = function() {
    return 4;
};

Bullet.prototype.takeBulletHit = function() {
    this.kill();
};

Bullet.prototype.render = function(ctx) {

    var fadeThresh = Bullet.prototype.lifeSpan / 3;

    if (this.lifeSpan < fadeThresh) {
        ctx.globalAlpha = this.lifeSpan / fadeThresh;
    }

    g_sprites.bullet.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

    ctx.globalAlpha = 1;
};
