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

    _nextWaveID: 1, // make all valid IDs non-falsey (i.e. don't start at 0)


    // "PRIVATE" METHODS
    //
    // <none yet>


    // PUBLIC METHODS

    getNextWave: function (waves) {
        var wave = waves[this._nextWaveID];
        this._nextWaveID = this._nextWaveID + 1;

        return wave;
    }
}