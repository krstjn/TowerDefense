// ============
// WAVE MANAGER
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var waveManager = {

    // "PRIVATE" DATA

    _enemies: [
         { type: ROBOTMAN, hp:  2, delay: 50, vel: 1.0 },
         { type: MOOSE, hp:  6, delay: 50, vel: 1.5 },
         { type: DOG, hp:  3, delay: 50, vel: 2.0 },
         { type: SUPERMAN, hp: 10, delay: 50, vel: 1.2 },
         { type: BIRD, hp:  3, delay: 50, vel: 1.5}
    ],

    nextWaveID: 1, // make all valid IDs non-falsey (i.e. don't start at 0)

    _WAVE_TIME: 1, // A constant that tells the time between waves if no button is pressed
    _timeLeft: 0, // Time left before next wave comes.

    // PUBLIC METHODS

    // Fall fyrir update fall i entityManager til að vita hvort
    // hann eigi að kalla á næsta wave.
    getTimeLeftInSecs: function() {
        return this._timeLeft/100;
    },

    getNextWaveID: function() {
        return this.nextWaveID;
    },

    /**
     * Sends the next wave based on time
     * OLD DESGIN: not used
     * @param {} du
     */
    isNextWaveReadyToGo: function(du) {
        if (this._timeLeft<0) {
            return true;
        }
        this._timeLeft -= du;
        return false;
    },
    /**
     * Gets the next wave from the waves array
     */
    getNextWave: function () {
        if (this.nextWaveID > g_waves.length) {
            return [];
        }
        var wave = g_waves[this.nextWaveID-1];
        this.nextWaveID++;
        this._timeLeft = this._WAVE_TIME;

        return wave;
    },

    /**
     * Gets the stats for the enemy type
     * The types are {ROBOTMAN, MOOSE, DOG,BIRD, SUPERMAN }
     * @param {String} type
     */
    getEnemyStats: function (type) {
        var index = -1;
        var enemy = this._enemies.find((e, i) => {
            index = i;
            return e.type === type;
        });

        return { enemy, index };
    },

    reset: function() {
        this.nextWaveID = 1;
        this._timeLeft = 0;
    }
}
