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
_rocks   : [],
_bullets : [],
_ships   : [],
_enemies : [],
_towers :  [],

_bShowRocks : false,
_CURRENT_WAVE: 1,
// "PRIVATE" METHODS

_generateRocks : function() {

},

// Býr til 5 óvini á sama stað í upphafi, lætur hann virðast vera með 5 hp.
_generateEnemies : function() {
//   this.generateEnemy({hp: 5, delay: 0   });
//   this.generateEnemy({hp: 5, delay: 80  });
//   this.generateEnemy({hp: 5, delay: 160 });
//   this.generateEnemy({hp: 5, delay: 240 });
    var wave = waves[this._CURRENT_WAVE];
    this._CURRENT_WAVE = this._CURRENT_WAVE + 1;
    console.log(wave);
    for(var i = 0; i < wave.length; i++){
        var enemy = wave_enemies[wave[i].type-1];

        for(var j = 0; j < wave[i].amount; j++){
            
            this.generateEnemy({
                hp: enemy.hp,
                delay: (wave[i].initialDelay + enemy.delay * j),
                vel: enemy.vel
            });
        }
    }
},

_findNearestShip : function(posX, posY) {
    var closestShip = null,
        closestIndex = -1,
        closestSq = 1000 * 1000;

    for (var i = 0; i < this._ships.length; ++i) {

        var thisShip = this._ships[i];
        var shipPos = thisShip.getPos();
        var distSq = util.wrappedDistSq(
            shipPos.posX, shipPos.posY,
            posX, posY,
            g_gameWidth, g_gameHeight);

        if (distSq < closestSq) {
            closestShip = thisShip;
            closestIndex = i;
            closestSq = distSq;
        }
    }
    return {
        theShip : closestShip,
        theIndex: closestIndex
    };
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._rocks, this._bullets, this._ships, this._enemies, this._towers];
},

init: function() {
    this._generateRocks();
    this._generateEnemies();
    //this._generateShip();
},

fireBullet: function(cx, cy, velX, velY, rotation, damage) {
    this._bullets.push(new Bullet({
        cx   : cx,
        cy   : cy,
        velX : velX,
        velY : velY,

        rotation : rotation,
        damage: damage
    }));
},

generateRock : function(descr) {
    this._rocks.push(new Rock(descr));
},

generateEnemy : function(descr) {
    this._enemies.push(new Enemy(descr));
},

generateShip : function(descr) {
    this._ships.push(new Ship(descr));
},

sendNextWave: function(){
    this._generateEnemies();
},

createNewTower : function(xPos, yPos) {
    if(xPos >= g_gameWidth) return;

  var xGridNum = Math.floor(xPos/40);
  var yGridNum = Math.floor(yPos/40);
  var arrayIndex = 20*yGridNum+xGridNum; 
  
  if (g_mapGrids[0][arrayIndex]) {
    this._towers.push(new Tower({
      cx : xGridNum*40+20,
      cy : yGridNum*40+20
    }));
  }
  g_mapGrids[0][arrayIndex] = 0;
},

killNearestShip : function(xPos, yPos) {
    var { theShip } = this._findNearestShip(xPos, yPos);
    if (theShip) {
        theShip.kill();
    }
},

resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
},

haltShips: function() {
    this._forEachOf(this._ships, Ship.prototype.halt);
},

toggleRocks: function() {
    this._bShowRocks = !this._bShowRocks;
},

update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            if(aCategory[i].delay <= 0 || aCategory[i].delay === undefined)
                var status = aCategory[i].update(du);
            else aCategory[i].delay = aCategory[i].delay - 1; 

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }

    if (this._rocks.length === 0) this._generateRocks();

},

render: function(ctx) {

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        if (!this._bShowRocks &&
            aCategory == this._rocks)
            continue;

        for (var i = 0; i < aCategory.length; ++i) {
            if(aCategory[i].delay <= 0 || aCategory[i].delay == undefined)
                aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
