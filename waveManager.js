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

var waveManager = {

    _enemies: [
        { type: ROBOTMAN, hp:  1, delay: 60, vel: 1.0 }, 
        { type: MOOSE, hp:  2, delay: 60, vel: 1.5 },
        { type: DOG, hp:  5, delay: 80, vel: 2.0 },
        { type: KID, hp: 10, delay: 70, vel: 1.2 },
        { type: BIRD, hp:  5, delay: 80, vel: 1.5 },
   ],

    // "PRIVATE" DATA

    _nextWaveID: 0, // make all valid IDs non-falsey (i.e. don't start at 0)

    // "PRIVATE" METHODS
    //
    // <none yet>


    // PUBLIC METHODS

    getNextWave: function (wavesInput) {
        var wave = wavesInput[this._nextWaveID];
        this._nextWaveID = this._nextWaveID + 1;
        time += 1000;

        return wave;
    },
    getEnemyStats: function (type) {
        var index = -1;
        var enemy = this._enemies.find((e, i) => {
            index = i;
            return e.type === type;
        });
        
        return { enemy, index };
    }
}