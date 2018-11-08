var wave_enemies = [
    { hp: 1, delay: 60, vel: 1 }, 
    { hp: 2, delay: 80, vel: 2 }
];
var waves = [[],
    [{type: 1, amount: 5, initialDelay: 0}],
    [{type: 1, amount: 5, initialDelay: 0}, {type: 2, amount: 3, initialDelay: 90 }],
    [{type: 1, amount: 5, initialDelay: 0}, {type: 2, amount: 5, initialDelay: 90 }],
];