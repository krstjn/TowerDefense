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

    _WAVE_TIME: 1000, // A constant that tells the time between waves if no button is pressed
    _timeLeft: 0, // Time left before next wave comes.

    // PUBLIC METHODS

    // Fall fyrir update fall i entityManager til að vita hvort  
    // hann eigi að kalla á næsta wave.
    hasTimePassed: function(du) {
        console.log(this._timeLeft);
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
    }
}