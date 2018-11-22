// ====
// Enemy
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Enemy(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    this.setStartPosition();

    this.frameIndex = 0,
        this.tickCount = 0,
        this.ticksPerFrame = 6,
        this.numberOfFrames = this.numberOfFrames || 1;

    // Default sprite and scale, if not otherwise specified
    this.nextNodeIndex = this.nextNodeIndex || 1;
    this.sprite = this.sprite || g_sprites.enemies[0];
    this.scale = this.scale || 1;
    this.defaultVel = this.vel;
    this.maxHP = this.hp;
    this.bounty = this.bounty || 1;
    this.distTravelled = 0;
    this.slowTimer = 0;
    this.stunTimer = 0;
    this.grunt = this.grunt || new Audio("sounds/maleGrunt.ogg");
    if (this.type == SUPERMAN) this.grunt = new Audio("sounds/femaleGrunt.ogg");
    if (this.type == BIRD) this.grunt = new Audio("sounds/birdGrunt.ogg");
    this.grunt.volume = 0.5;

    this.scale = 0.6 + Math.floor(this.maxHP/50)*0.1;
    if (this.scale>2.5) this.scale = 2.5;
};

Enemy.prototype = new Entity();

// Finnur fyrsta punktinn í pathinu og setur hann sem upphafspunkt fyrir óvininn
Enemy.prototype.setStartPosition = function() {
    var pathNode = g_paths[g_level][0];
    this.cx = pathNode.cx;
    this.cy = pathNode.cy;
};


Enemy.prototype.update = function(du) {
    spatialManager.unregister(this);

    this.tickCount += du;

    if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        // Go to the next frame
        // If the current frame index is in range
        if (this.frameIndex < this.numberOfFrames - 1) {
            // Go to the next frame
            this.frameIndex += 1;

        } else {
            this.frameIndex = 0;
        }
    }

    if (this._isDeadNow) {
        if (entityManager.enemies.length == 1) {
            g_money += (waveManager.nextWaveID-1) * 50;
            if (g_soundOn) menuManager.sellSound.play();
        }
        return entityManager.KILL_ME_NOW;
    }

    this.checkStatus(du); // Uppfærir slow/stun/poison

    // Athugar hvort óvinur sé kominn á endapunkt
    if (this.nextNodeIndex >= g_paths[g_level].length) {
        g_lives--; // Minnkar líf

        if (g_lives <= 0) {
            g_gameState = GAME_OVER;
        } // Endar leikinn ef lífin eru búin
        return entityManager.KILL_ME_NOW; // Eyðir óvini
    }

    var pathNode = g_paths[g_level][this.nextNodeIndex]; // ætti að taka inn hvaða bor/lvl er verið að spila

    // Athugar hvar næsti punktur er og færir enemy í átt að honum.
    // Ef enemy er á næsta punkt þá breytum við næsta punkt.
    if (Math.abs(pathNode.cx - this.cx) < this.vel) this.cx = pathNode.cx;
    if (Math.abs(pathNode.cy - this.cy) < this.vel) this.cy = pathNode.cy;

    let velocity = this.vel * du;

    if (pathNode.cx > this.cx) {
        this.cx += velocity ;
        this.rotation = Math.PI / 2;
    } else if (pathNode.cx < this.cx) {
        this.cx -= velocity;
        this.rotation = Math.PI * 1.5;
    } else if (pathNode.cy > this.cy) {
        this.cy += velocity;
        this.rotation = Math.PI;
    } else if (pathNode.cy < this.cy) {
        this.cy -= velocity;
        this.rotation = 0;
    } else {
        this.nextNodeIndex += 1;
    }
    this.distTravelled += velocity;

    spatialManager.register(this);

};

Enemy.prototype.getRadius = function() {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

Enemy.prototype.takeBulletHit = function(damage, type) {
    if (type === SLOW) this.slowTimer = 60;
    if (type === STUN) this.stunTimer = 30;
    if (type === POISON) {
      this.poisonTimer = 240;
      this.poisonDamage = damage/240;
      return;
    }
    this.hp = this.hp - damage;
    if (this.hp <= 0) {
        this.die();
    }
};

Enemy.prototype.die = function () {
  if (g_soundOn) this.grunt.play();
  entityManager.createDeath(this.cx, this.cy);
  this.kill();
  g_money += this.bounty;
}

Enemy.prototype.render = function(ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    var w = this.width / this.numberOfFrames;
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAtAnimated(
        ctx,
        this.frameIndex,
        this.cx,
        this.cy,
        this.rotation
    );
};

Enemy.prototype.renderHealthBar = function(ctx) {
    var green = "#00ff00"
    var red = "#ff3300"
    var x = this.cx - 10;
    var y = this.cy - 20;
    var wGreen = Math.ceil(20 * (this.hp / this.maxHP));
    var hGreen = 5;
    var wRed = 20;
    var hRed = 5;
    util.fillBox(ctx, x, y, wRed, hRed, red);
    util.fillBox(ctx, x, y, wGreen, hGreen, green);
}


// Uppfærir slow/stun/poison
Enemy.prototype.checkStatus = function(du) {
    if (this.slowTimer > 0) {
        this.vel = this.defaultVel / 2;
        this.slowTimer -= du;
    }

    if (this.stunTimer > 0) {
        this.vel = 0;
        this.stunTimer -= du;
    }

    if (this.slowTimer <= 0 && this.stunTimer <= 0) {
        this.vel = this.defaultVel;
    }

    if (this.poisonTimer > 0) {
        this.hp -= this.poisonDamage;
        this.poisonTimer -= du;
        if (this.hp <= 0) {
          console.log("Deyr í potion");
          this.die();
        }
    }
}
