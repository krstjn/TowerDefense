/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],
_enemies : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {
    var id = this._nextSpatialID;
    this._nextSpatialID = this._nextSpatialID + 1;
    return id;
},

register: function(entity) {
    var pos = entity.getPos();
    var rad = entity.getRadius();
    var spatialID = entity.getSpatialID();
    this._entities[spatialID] = {
        entity,
        posX: pos.posX,
        posY: pos.posY,
        radius: rad
    };

},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    delete this._entities[spatialID];

},

registerEnemy: function(entity) {
    var pos = entity.getPos();
    var rad = entity.getRadius();
    var spatialID = entity.getSpatialID();
    this._enemies[spatialID] = {
        entity,
        posX: pos.posX,
        posY: pos.posY,
        radius: rad,
        distTravelled: entity.distTravelled || -1
    };

},

unregisterEnemy: function(entity) {
    var spatialID = entity.getSpatialID();

    delete this._entities[spatialID];

},

findEntityInRange: function(posX, posY, radius) {

    for (var ID in this._entities){
        var e = this._entities[ID];

        // Calculate the distance between entities and posX and posY
        var wrappedDistSq = util.wrappedDistSq(
            posX, posY, e.posX, e.posY, g_gameWidth, g_gameHeight
        );

        // Calculate the distance that would make them overlap
        var hitDistSq = util.square(radius + e.radius);

        if(wrappedDistSq < hitDistSq){
            return e.entity;
        }
    }
},

findEnemyInRange: function(posX, posY, radius, towerType) {
    var maxDistTravelled = 0;
    var hitEntity;
    var enemies = entityManager.getEnemiesByDist();
    for (var i=0; i<enemies.length; i++)  {
        var e = enemies[i];
        // Calculate the distance between entities and posX and posY
        var distSq = util.distSq(posX, posY, e.cx, e.cy);

        // Calculate the distance that would make them overlap
        var hitDistSq = util.square(radius + e.getRadius());

        if(distSq < hitDistSq){
            if(maxDistTravelled < e.distTravelled){
              // Finnur bara flying óvini ef turn er flying eða normal.
                if(     towerType == FLYING  && e.flying
                    ||  towerType == NORMAL && e.flying
                    ||  towerType != FLYING && !e.flying){ // Finnur bara flying óvini ef turn er flying eða normal.
                  hitEntity = e;
                  maxDistTravelled = e.distTravelled;
                }
            }
        }
    }
    return hitEntity;

},


// Finnur alla óvini innan radíus
findAllEnemiesInRange: function(posX, posY, radius){
    var enemies = entityManager._enemies;
    var hitEnemies = [];

    for (var i=0; i<enemies.length; i++){
        var e = enemies[i];

        var distSq = util.distSq(posX, posY, e.cx, e.cy);

        var hitDistSq = util.square(radius + e.getRadius());
        if(distSq < hitDistSq){
            hitEnemies.push(e);
        }
    }
    return hitEnemies;
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";

    for (var ID in this._entities) {
        var e = this._entities[ID];
        var radius = e.entity.fireRangeRadius || e.radius;
        util.strokeCircle(ctx, e.posX, e.posY, radius);
    }
    ctx.strokeStyle = oldStyle;
}

}
