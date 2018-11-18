"use strict";
/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var enemies = [
     { type: ROBOTMAN, hp:  1, delay: 60, vel: 1.0 }, 
     { type: MOOSE, hp:  2, delay: 60, vel: 1.5 },
     { type: DOG, hp:  5, delay: 80, vel: 2.0 },
     { type: KID, hp: 10, delay: 70, vel: 1.2 },
     { type: BIRD, hp:  5, delay: 80, vel: 1.5},
];

var waves = [
    [
        {type: ROBOTMAN, amount: 1, initialDelay: 0},
        {type: BIRD, amount: 2, initialDelay: 90, flying: true }
    ],
    [
        {type: ROBOTMAN, amount: 5, initialDelay: 0  }, 
        {type: MOOSE, amount: 2, initialDelay: 90 }
    ],
    [
        {type: ROBOTMAN, amount: 5, initialDelay: 0  }, 
        {type: MOOSE, amount: 5, initialDelay: 90 }, 
        {type: DOG, amount: 5, initialDelay: 130 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 3, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 3, initialDelay: 160 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170, flying: true }
    ],
    // copyu peistaði seinasta waves nokkrum sinnum bara til að testa betur
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
    [
        {type: ROBOTMAN, amount: 10, initialDelay: 0  }, 
        {type: MOOSE, amount: 6, initialDelay: 90 }, 
        {type: DOG, amount: 3, initialDelay: 130 }, 
        {type: KID, amount: 2, initialDelay: 150 }, 
        {type: BIRD, amount: 2, initialDelay: 170 }
    ],
];