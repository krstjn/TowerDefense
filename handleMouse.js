1 // ==============
  // MOUSE HANDLING
  // ==============

  "use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_mouseX = 0,
  g_mouseY = 0;

function handleMouse(evt) {

  g_mouseX = evt.clientX - g_canvas.offsetLeft;
  g_mouseY = evt.clientY - g_canvas.offsetTop;

  menuManager.mouseOverTower = null; // reset this each time the mouse is moved
  menuManager.isMouseOverMenuTower(g_mouseX, g_mouseY);
  // If no button is being pressed, then bail
  var button = evt.buttons === undefined ? evt.which : evt.buttons;
  if (!button) return;

  if(g_gameState === PLAYING){
    // Try to create tower, if no tower is selected we'll return from it.
    entityManager.createNewTower(g_mouseX, g_mouseY);
    menuManager.clickedTower = null;
    menuManager.findClickedItem(g_mouseX, g_mouseY);
  }
  // From the Main Menu setup selected level
  if(g_gameState === MAIN_MENU){
    menuManager.setupSelectedLevel(g_mouseX, g_mouseY);
  }

  if(g_gameState === PAUSED || g_gameState === GAME_OVER)
    menuManager.performAction(g_mouseX, g_mouseY);

};

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);
