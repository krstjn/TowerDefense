  // ==============
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
  var g_wasMouseDown = false;

  function handleMouse(evt) {

      g_mouseX = evt.clientX - g_canvas.offsetLeft;
      g_mouseY = evt.clientY - g_canvas.offsetTop;

      // reset menuManager's mouse values each time the mouse is moved
      menuManager.mouseOverMenuTower = null;
      menuManager.mouseOverExistingTower = null;

      /**
      * The upgrade info screen can cover the tower selection if you select a
      * tower near the right border. We don't want to be able to select a tower
      * trough that info screen so we only check if the mouse is over a tower
      * if the mouse is not "OverUpgradeInfo".
      */
      if (!menuManager.mouseOverUpgradeInfo()) {
          menuManager.isMouseOverTower(g_mouseX, g_mouseY);
      }
      // If no button is being pressed we return from this handler.
      var button = evt.buttons === undefined ? evt.which : evt.buttons;
      if (!button) {
          g_wasMouseDown = false;
          return;
      }

      // MOUSE CLICK STUFF

      /**
      * checks if player is holding the mousebutton down, if so
      * we bail on the click functions.
      */
      if (g_wasMouseDown) return;

      g_wasMouseDown = true;

      /**
      * We have different mouse actions for each game state.
      */
      if (g_gameState === PLAYING) {
          // Try to create tower, if no tower is selected we'll return from it.
          entityManager.createNewTower(g_mouseX, g_mouseY);
          // reset the clickedNewTower since we just clicked.
          menuManager.clickedNewTower = null;
          /**
          * Makes sure we cant click an existing tower through the
          * tower/upgrade info box
          */
          if (!menuManager.mouseOverUpgradeInfo()) {
              menuManager.clickedExistingTower = null;
          }
          // this finds what item in the menu is being clicked if any.
          menuManager.findClickedItem(g_mouseX, g_mouseY);
      }
      if (g_gameState === MAIN_MENU) {
          menuManager.setupSelectedLevel(g_mouseX, g_mouseY);
          menuManager.setupDificulty(g_mouseX, g_mouseY);
      }

      if (g_gameState === PAUSED || g_gameState === GAME_OVER || g_gameState === WON) {
          g_isExplosion = false; // Make sure the screenshake is turned off.
          menuManager.performAction(g_mouseX, g_mouseY);
      }
  };

  // Handle "down", "up" and "move" events the same way.
  window.addEventListener("mousedown", handleMouse);
  window.addEventListener("mouseup", handleMouse);
  window.addEventListener("mousemove", handleMouse);
