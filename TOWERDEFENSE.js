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


var g_renderSpatialDebug = false;

// Býr til key array fyrir takkan 1-10 á lyklaborði
var KEY_NUMBER = [];
for (var i = 0; i < 10; i++) {
    KEY_NUMBER[i] = keyCode(i.toString());
}
var KEY_RIGHT_ARROW = '39';
var KEY_LEFT_ARROW = '37';
var KEY_SPATIAL = keyCode('X');
var KEY_NEXT_WAVE = keyCode('Y');
var KEY_MUTE = keyCode('M');
var KEY_TOGGLE_NW_INFO = keyCode('N');
var KEY_TOGGLE_CHEAT = keyCode('C');

function processDiagnostics() {

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
    if (eatKey(KEY_NEXT_WAVE)) entityManager.sendNextWave();
    if (eatKey(KEY_MUTE)) g_soundOn = !g_soundOn;
    if (eatKey(KEY_TOGGLE_NW_INFO)) g_renderNextToggle = !g_renderNextToggle;

    if (eatKey(KEY_RIGHT_ARROW)) {
        g_speed += 0.25;
        console.log(g_speed);
    }
    if (eatKey(KEY_LEFT_ARROW)) {
        if (g_speed > 0.25) { g_speed -= 0.25; }
    }

    for (var i = 1; i <= 6; i++) {
        if (eatKey(KEY_NUMBER[i])) {
            // Try to create tower, if no tower is selected we'll return from it.
            if (g_gameState === PLAYING) {
                entityManager.createNewTower(g_mouseX, g_mouseY);
                menuManager.clickedNewTower = null;
                menuManager.clickedNewTower = i - 1;
            }
        }
    }

    if (eatKey(KEY_TOGGLE_CHEAT)) {
        g_money = Number.POSITIVE_INFINITY;
        g_lives = Number.POSITIVE_INFINITY;
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



/************
 * MainMenu *
 * GameOver *
 * Playing  *
 * Paused   *
 ************/
var g_gameState = MAIN_MENU;
var g_level = 0;

// GAME-SPECIFIC RENDERING
function renderSimulation(ctx) {
    ctx.save();
    if (g_gameState === MAIN_MENU) {
        menuManager.renderStartMenu(ctx);
    } else {
        ctx.save();
        if (g_isExplosion) {
            ctx.translate(util.randRange(-2,2),util.randRange(-2,2));
        }
        util.renderBackground(ctx);
        entityManager.render(ctx);
        menuManager.renderMenu(ctx);
        menuManager.renderclickedNewTower(ctx);
        ctx.restore();
    }
    ctx.restore();
    if (g_gameState === PAUSED) menuManager.renderPausedOrGameOver(ctx, "GAME PAUSED");

    if (g_gameState === GAME_OVER) menuManager.renderPausedOrGameOver(ctx, "GAME OVER");


    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        background1: "images/background1.png",
        background2: "images/background2.png",
        background3: "images/background3.png",
        menu: "images/menu.png",
        infobox: "images/infobox.png",
        nextWaveButton: "images/nextWaveButton.png",
        upgradeButton: "images/upgradeButton.png",
        sellButton: "images/sellButton.png",
        enemy1: "images/enemy1ax4.png",
        enemy2: "images/enemy2x4.png",
        enemy3: "images/enemy3x4.png",
        enemy4: "images/enemy4x4.png",
        enemy5: "images/enemy5x4.png",
        tower1: "images/tower1.png",
        tower2: "images/tower2.png",
        tower3: "images/tower3.png",
        tower4: "images/tower4.png",
        tower5: "images/tower5.png",
        tower6: "images/tower6.png",
        tower12: "images/tower12.png",
        tower22: "images/tower22.png",
        tower32: "images/tower32.png",
        tower42: "images/tower42.png",
        tower52: "images/tower52.png",
        tower62: "images/tower62.png",
        bullet1: "images/tower1_bullet.png",
        explosion: "images/explosion.png",
        death: "images/death.png",
        slow: "images/freeze.png",
        stun: "images/stun2.png",
        poison: "images/poison.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
    g_sprites.enemies = [
        new Sprite(g_images.enemy1, 4),
        new Sprite(g_images.enemy2, 4),
        new Sprite(g_images.enemy3, 4),
        new Sprite(g_images.enemy4, 4),
        new Sprite(g_images.enemy5, 4),
    ];
    g_sprites.towers = [
        new Sprite(g_images.tower1),
        new Sprite(g_images.tower2),
        new Sprite(g_images.tower3),
        new Sprite(g_images.tower4),
        new Sprite(g_images.tower5),
        new Sprite(g_images.tower6),
        new Sprite(g_images.tower1),
        new Sprite(g_images.tower2),
        new Sprite(g_images.tower3),
        new Sprite(g_images.tower4),
        new Sprite(g_images.tower5),
        new Sprite(g_images.tower6),
        new Sprite(g_images.tower1),
        new Sprite(g_images.tower2),
        new Sprite(g_images.tower3),
        new Sprite(g_images.tower4),
        new Sprite(g_images.tower5),
        new Sprite(g_images.tower6),
        new Sprite(g_images.tower12),
        new Sprite(g_images.tower22),
        new Sprite(g_images.tower32),
        new Sprite(g_images.tower42),
        new Sprite(g_images.tower52),
        new Sprite(g_images.tower62),
        new Sprite(g_images.tower12),
        new Sprite(g_images.tower22),
        new Sprite(g_images.tower32),
        new Sprite(g_images.tower42),
        new Sprite(g_images.tower52),
        new Sprite(g_images.tower62),
        new Sprite(g_images.tower12),
        new Sprite(g_images.tower22),
        new Sprite(g_images.tower32),
        new Sprite(g_images.tower42),
        new Sprite(g_images.tower52),
        new Sprite(g_images.tower62),
    ];
    g_sprites.levels = [
        new Sprite(g_images.background1),
        new Sprite(g_images.background2),
        new Sprite(g_images.background3),
    ];
    g_sprites.explosion = new Sprite(g_images.explosion, 9);
    g_sprites.death = new Sprite(g_images.death, 7);
    g_sprites.stun = new Sprite(g_images.stun, 16);
    g_sprites.poison = new Sprite(g_images.poison, 9);
    g_sprites.bullet = new Sprite(g_images.bullet1);
    g_sprites.bullet.scale = 0.25;
    for (var i=0; i<6; i++) {
        g_sprites.towers[i].scale = 0.9;
        g_sprites.towers[i+12].scale = 1.1;
        g_sprites.towers[i+18].scale = 0.9;
        g_sprites.towers[i+30].scale = 1.1;
    }

    //entityManager.init();
    menuManager.init();

    main.init();
}

// Kick it off
requestPreloads();
