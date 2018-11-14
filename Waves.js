"use strict";
/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var time = -1000;

var wave_enemies = [
    { hp:  1, delay: 60, vel: 1.0 }, 
    { hp:  2, delay: 60, vel: 1.5 },
    { hp:  5, delay: 80, vel: 2.0 },
    { hp: 10, delay: 70, vel: 1.2 },
    { hp:  5, delay: 80, vel: 1.5 },
];
var waves = [
    [
        {type: 1, amount: 1, initialDelay: 0}
    ],
    [
        {type: 1, amount: 5, initialDelay: 0  }, 
        {type: 2, amount: 2, initialDelay: 90 }
    ],
    [
        {type: 1, amount: 5, initialDelay: 0  }, 
        {type: 2, amount: 5, initialDelay: 90 }, 
        {type: 3, amount: 5, initialDelay: 130 }
    ],
    [
        {type: 1, amount: 10, initialDelay: 0  }, 
        {type: 2, amount: 3, initialDelay: 90 }, 
        {type: 3, amount: 3, initialDelay: 130 }, 
        {type: 4, amount: 3, initialDelay: 160 }
    ],
    [
        {type: 1, amount: 10, initialDelay: 0  }, 
        {type: 2, amount: 6, initialDelay: 90 }, 
        {type: 3, amount: 3, initialDelay: 130 }, 
        {type: 4, amount: 2, initialDelay: 150 }, 
        {type: 5, amount: 2, initialDelay: 170 }
    ],
];