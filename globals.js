// =======
// GLOBALS
// =======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Some ugly globals that make our life easier.

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var g_controlWidth = 200;
var g_gameWidth = g_canvas.width - g_controlWidth;
var g_gameHeight = g_canvas.height;


// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;

var g_dificultyMultiplier = 1.3; // Defult dificulty is "NORMAL" or "1.3"
var g_lives = 20;
var g_money = 300;
var g_soundOn = true;
var g_isExplosion = false; // The screen shakes when this is true.
var g_speed = 1; // Defult game speed is 1.
var g_renderNextToggle = true;
