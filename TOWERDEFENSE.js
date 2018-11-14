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


var KEY_SPATIAL = keyCode('X');

var KEY_NEXT_WAVE = keyCode('Y');

function processDiagnostics() {

  if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

  if (eatKey(KEY_NEXT_WAVE)) {
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
  menuManager.renderMenu(ctx);
  entityManager.render(ctx);
  util.renderLives(ctx);
  util.renderMoney(ctx);
  menuManager.renderClickedTower(ctx);
  util.renderTime(ctx);

  if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

  var requiredImages = {
    background: "images/background.png",
    town: "images/town.png",
    menu: "images/menu.png",
        enemy1      : "images/enemy1ax4.png",
        enemy2	    : "images/enemy2x4.png",
        enemy3	    : "images/enemy3x4.png",
        enemy4	    : "images/enemy4x4.png",
        enemy5	    : "images/enemy5x4.png",
    tower1: "images/tower1.png",
    tower2: "images/tower2.png",
    tower3: "images/tower3.png",
    tower4: "images/tower4.png",
    tower5: "images/tower5.png",
    tower6: "images/tower6.png",
    bullet1: "images/tower1_bullet.png"
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
  ];
  g_sprites.bullet = new Sprite(g_images.bullet1);
  g_sprites.bullet.scale = 0.25;

  entityManager.init();
  menuManager.init();

  main.init();
}

// Kick it off
requestPreloads();
