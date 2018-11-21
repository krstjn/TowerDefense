"use strict";
/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_waves = [
    [
        {type: ROBOTMAN, amount: 5, initialDelay: 0, bounty: 10, hp: 2}
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0, bounty: 10, hp: 2}
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0, bounty: 10, hp: 2},
        {type: MOOSE, amount: 2, initialDelay: 500, bounty: 20, hp: 6}
    ],
    [
        {type: MOOSE, amount: 5, initialDelay: 0, bounty: 20, hp: 6},
        {type: ROBOTMAN, amount: 5, initialDelay: 25, bounty: 10, hp: 2},
        {type: DOG, amount: 5, initialDelay: 300, bounty: 20, hp: 3}
    ],
    [
        {type: MOOSE, amount: 10, initialDelay: 0, bounty: 20, hp: 6},
        {type: KID, amount: 3, initialDelay: 500, bounty: 30, hp: 10},
        {type: DOG, amount: 5, initialDelay: 650, bounty: 20, hp: 3}
    ],
    [
        {type: BIRD, amount: 1, initialDelay: 0, flying: true, bounty: 20, hp: 3},
        {type: ROBOTMAN, amount: 10, initialDelay: 100, bounty: 10, hp: 2 },
        {type: MOOSE, amount: 10, initialDelay: 125, bounty: 20, hp: 6},
        {type: DOG, amount: 5, initialDelay: 625, bounty: 20, hp: 3},
        {type: KID, amount: 5, initialDelay: 650, bounty: 30, hp: 10},
        {type: BIRD, amount: 5, initialDelay: 900, flying: true, bounty: 20, hp: 3}
    ]
];

for (var i=2; i<=50; i++) {
    g_waves.push(
        [
            {type: ROBOTMAN, amount: 10, initialDelay: 0, bounty: 10*i, hp: 2*i},
            {type: MOOSE, amount: 10, initialDelay: 275, bounty: 20*i, hp: 6*i},
            {type: DOG, amount: 10, initialDelay: 500, bounty: 20*i, hp: 3*i}
        ],
        [
            {type: KID, amount: 10, initialDelay: 0, bounty: 30*i, hp: 10*i},
            {type: ROBOTMAN, amount: 10, initialDelay: 25, bounty: 10*i, hp: 2*i}
        ],
        [
            {type: BIRD, amount: 15, initialDelay: 0, flying: true, bounty: 20*i, hp: 3*i},
            {type: DOG, amount: 15, initialDelay: 25, bounty: 20*i, hp: 3*i}
        ],
        [
            {type: MOOSE, amount: 10, initialDelay: 0, bounty: 20*i, hp: 6*i},
            {type: ROBOTMAN, amount: 10, initialDelay: 250, bounty: 10*i, hp: 2*i},
            {type: KID, amount: 5, initialDelay: 275, bounty: 30*i, hp: 10*i},
            {type: DOG, amount: 10, initialDelay: 500, bounty: 20*i, hp: 3*i}
        ],
        [
            {type: ROBOTMAN, amount: 20, initialDelay: 0, bounty: 10*i, hp: 2*i},
            {type: MOOSE, amount: 20, initialDelay: 500, bounty: 20*i, hp: 6*i},
            {type: DOG, amount: 20, initialDelay: 1000, bounty: 20*i, hp: 3*i},
            {type: KID, amount: 20, initialDelay: 1500, bounty: 30*i, hp: 10*i}
        ],
        [
            {type: ROBOTMAN, amount: 3, initialDelay: 25, bounty: 10*5*i, hp: 2*10*i},
            {type: MOOSE, amount: 3, initialDelay: 500, bounty: 20*5*i, hp: 6*10*i},
            {type: DOG, amount: 3, initialDelay: 1000, bounty: 20*5*i, hp: 3*10*i},
            {type: BIRD, amount: 3, initialDelay: 1200, flying: true, bounty: 20*5*i, hp: 3*10*i},
            {type: KID, amount: 3, initialDelay: 1500, bounty: 30*5*i, hp: 10*10*i}
        ]
    );
};
