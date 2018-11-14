// =========
// TOWERDEFENSE
// =========


"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    processDiagnostics();

    entityManager.update(du);

}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');
var KEY_NEXT_WAVE = keyCode('Y');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_0)) entityManager.toggleRocks();

    if (eatKey(KEY_1)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,

        sprite : g_sprites.ship});

    if (eatKey(KEY_2)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,

        sprite : g_sprites.ship2
        });

    if (eatKey(KEY_K)) entityManager.killNearestShip(
        g_mouseX, g_mouseY);
    
    if (eatKey(KEY_NEXT_WAVE)){
        entityManager.sendNextWave();
    }

        
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    util.renderBackground(ctx);
    util.renderTown(ctx);
    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);

    eatKey(Ship.prototype.KEY_FIRE)
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        ship        : "https://notendur.hi.is/~pk/308G/images/ship.png",
        ship2       : "https://notendur.hi.is/~pk/308G/images/ship_2.png",
        rock        : "https://notendur.hi.is/~pk/308G/images/rock.png",
        background  : "images/background.png",
        town        : "images/town.png",
        enemy1      : "images/enemy1ax4.png",
        enemy2	    : "images/enemy2x4.png",
        enemy3	    : "images/enemy3x4.png",
        enemy4	    : "images/enemy4x4.png",
        enemy5	    : "images/enemy5x4.png",
        tower1      : "images/tower1.png",
        bullet1     : "images/tower1_bullet.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.ship  = new Sprite(g_images.ship);
    g_sprites.ship2 = new Sprite(g_images.ship2);
    g_sprites.rock  = new Sprite(g_images.rock);
    g_sprites.enemies = [
        new Sprite(g_images.enemy1, 4),
        new Sprite(g_images.enemy2, 4),
        new Sprite(g_images.enemy3, 4),
        new Sprite(g_images.enemy4, 4),
        new Sprite(g_images.enemy5, 4),
    ];
    g_sprites.tower1 = new Sprite(g_images.tower1);
    g_sprites.bullet = new Sprite(g_images.bullet1);
    g_sprites.bullet.scale = 0.25;

    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
