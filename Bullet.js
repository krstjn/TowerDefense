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

    this.xDistTravelled = 0;
    this.yDistTravelled = 0;

    // Bullet has different sounds if it's a bomb.
    if (this.type === EXPLODE) {
        this.fireSound = new Audio("sounds/shot1.ogg");
        this.hitSound = new Audio("sounds/explosion.ogg");
        this.hitSound.volume = 0.5;
    }
    // Make a noise when I am created (i.e. fired)
    if (g_soundOn) this.fireSound.play();
}

Bullet.prototype = new Entity();

// Initial, inheritable, default values
Bullet.prototype.xDistTravelled = 0;
Bullet.prototype.yDistTravelled = 0;

Bullet.prototype.fireSound = new Audio("sounds/shot1.ogg");
Bullet.prototype.hitSound = new Audio("sounds/bulletHit.ogg");
// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function(du) {

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.rotation += 1 * du;
    this.rotation = util.wrapRange(this.rotation,
        0, consts.FULL_CIRCLE);

    this.xDistTravelled += Math.abs(this.velX) * du;
    this.yDistTravelled += Math.abs(this.velY) * du;

    /**
     * Handles the bullet-enemy collision by tracking the distance the bullet
     * has traveled instead of actually checking every enemy with every bullet
     * every update. This way the bullet will always hit the enemy the tower
     * fired at.
     */
    if (this.xDistTravelled >= this.xLength ||
        this.yDistTravelled >= this.yLength) {
        if (!this.target) {
            return entityManager.KILL_ME_NOW;
        }
        this.target.takeBulletHit(this.damage, this.type);
        // Check for the special towerTypes
        if (this.type === EXPLODE) entityManager.createExplosion(
            this.target.cx,
            this.target.cy,
            this.damage);
        if (this.type === POISON) entityManager.createPoison(
            this.target);
        if (this.type === STUN) entityManager.createStun(
            this.target.cx,
            this.target.cy);
        // Play a sound when the bullet hits an enemy.
        if (g_soundOn) this.hitSound.play();
        return entityManager.KILL_ME_NOW;
    }

};

Bullet.prototype.getRadius = function() {
    return 4;
};

// "Kill" the bullet if it hits something.
Bullet.prototype.takeBulletHit = function() {
    this.kill();
};

Bullet.prototype.render = function(ctx) {
    g_sprites.bullet.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
