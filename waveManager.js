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

    // "PRIVATE" DATA

    _enemies: [
        { type: ROBOTMAN, hp:  1, delay: 60, vel: 1.0 }, 
        { type: MOOSE, hp:  2, delay: 60, vel: 1.5 },
        { type: DOG, hp:  5, delay: 80, vel: 2.0 },
        { type: KID, hp: 10, delay: 70, vel: 1.2 },
        { type: BIRD, hp:  5, delay: 80, vel: 1.5,},
   ],

    _nextWaveID: 1, // make all valid IDs non-falsey (i.e. don't start at 0)

    _WAVE_TIME: 1, // A constant that tells the time between waves if no button is pressed
    _timeLeft: 0, // Time left before next wave comes.

    // PUBLIC METHODS

    // Fall fyrir update fall i entityManager til að vita hvort  
    // hann eigi að kalla á næsta wave.
    getTimeLeftInSecs: function() {
        return this._timeLeft/100;
    },
    
    getNextWaveID: function() {
        return this._nextWaveID;
    },

    isNextWaveReadyToGo: function(du) {
        if (this._timeLeft<0) {
            return true;
        }
        this._timeLeft -= du;
        return false;
    },

    getNextWave: function (wavesInput) {
        if (this._nextWaveID >= wavesInput.length) {
            return [];
        }
        var wave = wavesInput[this._nextWaveID-1];
        this._nextWaveID++;
        this._timeLeft = this._WAVE_TIME;

        return wave;
    },
    getEnemyStats: function (type) {
        var index = -1;
        var enemy = this._enemies.find((e, i) => {
            index = i;
            return e.type === type;
        });
        
        return { enemy, index };
    },
    reset: function() {
        this._nextWaveID = 1;
        this._timeLeft = 0;
    }
}