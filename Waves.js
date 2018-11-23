// =====
// WAVES
// =====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Setup up waves 1-6
var g_waves = [
    [
        {type: ROBOTMAN, amount: 5, initDelay: 0, bounty: 10, hp: 2}
    ],
    [
        {type: ROBOTMAN, amount: 10, initDelay: 0, bounty: 10, hp: 2}
    ],
    [
        {type: ROBOTMAN, amount: 10, initDelay: 0, bounty: 10, hp: 2},
        {type: MOOSE, amount: 2, initDelay: 500, bounty: 20, hp: 6}
    ],
    [
        {type: MOOSE, amount: 5, initDelay: 0, bounty: 20, hp: 6},
        {type: ROBOTMAN, amount: 5, initDelay: 25, bounty: 10, hp: 2},
        {type: DOG, amount: 5, initDelay: 300, bounty: 20, hp: 3}
    ],
    [
        {type: MOOSE, amount: 10, initDelay: 0, bounty: 20, hp: 6},
        {type: SUPERMAN, amount: 3, initDelay: 500, bounty: 30, hp: 10},
        {type: DOG, amount: 5, initDelay: 650, bounty: 20, hp: 3}
    ],
    [
        {type: BIRD, amount: 1, initDelay: 0, flying: true, bounty: 20, hp: 6},
        {type: ROBOTMAN, amount: 10, initDelay: 100, bounty: 10, hp: 2 },
        {type: MOOSE, amount: 10, initDelay: 125, bounty: 20, hp: 6},
        {type: DOG, amount: 5, initDelay: 625, bounty: 20, hp: 3},
        {type: SUPERMAN, amount: 5, initDelay: 650, bounty: 30, hp: 10},
        {type: BIRD, amount: 5, initDelay: 900, flying: true, bounty: 20, hp: 6}
    ]
];


/**
 * Setup the rest of waves 7-300, the same 6 waves are used
 * but hp and bounty are increased on each iteration
 */
var _multip = g_dificultyMultiplier;
for (var i=2; i<=50; i++) {
    _multip *= g_dificultyMultiplier;
    g_waves.push(
        [
            {type: ROBOTMAN, amount: 10, initDelay: 0, bounty: 10*i, hp: 2*i*_multip},
            {type: MOOSE, amount: 10, initDelay: 275, bounty: 20*i, hp: 6*i*_multip},
            {type: DOG, amount: 10, initDelay: 500, bounty: 20*i, hp: 3*i*_multip}
        ],
        [
            {type: SUPERMAN, amount: 10, initDelay: 0, bounty: 30*i, hp: 10*i*_multip},
            {type: ROBOTMAN, amount: 10, initDelay: 25, bounty: 10*i, hp: 2*i*_multip}
        ],
        [
            {type: BIRD, amount: 15, initDelay: 0, flying: true, bounty: 20*i, hp: 6*i*_multip},
            {type: DOG, amount: 15, initDelay: 25, bounty: 20*i, hp: 3*i*_multip}
        ],
        [
            {type: MOOSE, amount: 10, initDelay: 0, bounty: 20*i, hp: 6*i*_multip},
            {type: ROBOTMAN, amount: 10, initDelay: 250, bounty: 10*i, hp: 2*i*_multip},
            {type: SUPERMAN, amount: 5, initDelay: 275, bounty: 30*i, hp: 10*i*_multip},
            {type: DOG, amount: 10, initDelay: 500, bounty: 20*i, hp: 3*i*_multip}
        ],
        [
            {type: ROBOTMAN, amount: 20, initDelay: 0, bounty: 10*i, hp: 2*i*_multip},
            {type: MOOSE, amount: 20, initDelay: 500, bounty: 20*i, hp: 6*i*_multip},
            {type: DOG, amount: 20, initDelay: 1000, bounty: 20*i, hp: 3*i*_multip},
            {type: SUPERMAN, amount: 20, initDelay: 1500, bounty: 30*i, hp: 10*i*_multip}
        ],
        [
            {type: ROBOTMAN, amount: 3, initDelay: 25, bounty: 10*5*i, hp: 2*10*i*_multip},
            {type: MOOSE, amount: 3, initDelay: 500, bounty: 20*5*i, hp: 6*10*i*_multip},
            {type: DOG, amount: 3, initDelay: 1000, bounty: 20*5*i, hp: 3*10*i*_multip},
            {type: BIRD, amount: 3, initDelay: 1200, flying: true, bounty: 20*5*i, hp: 6*10*i*_multip},
            {type: SUPERMAN, amount: 3, initDelay: 1500, bounty: 30*5*i, hp: 10*10*i*_multip}
        ]
    );
};
