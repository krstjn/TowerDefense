// ============
// MENU MANAGER
// ============


"use strict"

var menuManager = {

  // towerTypes stores each of the different towers as tower objects.
  // clickedTower knows if and then what tower on the menu we clicked last.
  _towerTypes: [],
  clickedTower: null,


  _levels: [],
  _action: [],

  /**
   * Render the start menu
   * Where a user selects a level to play
   * @param {context} ctx
   */
  renderStartMenu: function(ctx) {
    util.clearCanvas(ctx);
    ctx.fillStyle = "yellow";
    ctx.font = "BOLD 40px Verdana";
    ctx.fillText("TOWER DEFENSE", g_canvas.width/2 - 200, 100);
    ctx.font = "30px Arial";
    ctx.fillText("Select a map to play", g_canvas.width/2 - 140, 150);

    ctx.drawImage(g_images.background1, 180, 250, 200, 150);
    ctx.drawImage(g_images.background2, 400, 250, 200, 150);
    ctx.drawImage(g_images.background3, 620, 250, 200, 150);
  },

  /**
   * Renders an overlay over the game,
   * when paused and when game is over
   * @param {context} ctx
   * @param {string} message
   */
  renderPausedOrGameOver: function(ctx, message) {
    var prevfillStyle = ctx.fillStyle;
    var oldAlpha = ctx.globalAlpha;
    ctx.fillStyle = "white";
    ctx.globalAlpha = 0.7;
    ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);
    ctx.globalAlpha = oldAlpha;

    ctx.font = "40px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(message, g_gameWidth/2-150, g_gameHeight/2);

    util.fillBox(ctx, g_gameWidth/2-100, g_gameHeight/2 + 100, 200, 50,"#A00");
    util.fillBox(ctx, g_gameWidth/2-95, g_gameHeight/2 + 105, 190, 40,"red");

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("NEW GAME",g_gameWidth/2-80,g_gameHeight/2 + 135);

    ctx.fillStyle = prevfillStyle;

  },

  /**
   * Figure out if a mouse was pressed inside of the
   * level "buttons", and setup the game based on the level "button" selected
   * @param {number} xPos
   * @param {number} yPos
   */
  setupSelectedLevel: function(xPos, yPos){
    var level = this._levels.find((el) => {
      var { pos } = el;
      if(pos.left <= xPos && pos.right >= xPos){
        if(pos.bottom >= yPos && pos.top <= yPos){
          return el;
        }
      }
    });

    if (level) {
      g_gameState = PLAYING;
      g_level = level.index;
      entityManager.init();
    }

  },
  /**
   * "Button" handler when game is paused or over,
   * finds out what "button", and acts accordingly
   * @param {number} xPos
   * @param {number} yPos
   */
  performAction: function(xPos,yPos) {

    var action = this._action.find((el) => {
      var { pos } = el;
      if(pos.left <= xPos && pos.right >= xPos){
        if(pos.bottom >= yPos && pos.top <= yPos){
          return el;
        }
      }
    });

    if (action) {
      if(action.what === NEW_GAME){
        this.resetGame();
      }
    }
  },

  /**
   * Runs when user requests a new game
   */
  resetGame: function() {
    g_gameState = MAIN_MENU;
    g_level = 0;
    g_lives = 20;
    g_money = 300;
    g_isUpdatePaused = false;
    entityManager.reset();
    waveManager.reset();
  },
  // This function initialises our tower types.
  generateTowerTypes: function() {
    this._towerTypes.push(new Tower({
      sprite: g_sprites.towers[0],
      shotVel: 4,
      fireRangeRadius: 100,
      rateOfFire: 1000,
      price: 100,
      damage: 1
    }));

    this._towerTypes.push(new Tower({
      sprite: g_sprites.towers[1],
      shotVel: 6,
      fireRangeRadius: 200,
      rateOfFire: 1000,
      price: 200,
      damage: 1
    }));

    this._towerTypes.push(new Tower({
      sprite: g_sprites.towers[2],
      shotVel: 4,
      fireRangeRadius: 100,
      rateOfFire: 600,
      price: 300,
      damage: 2
    }));

    this._towerTypes.push(new Tower({
      sprite: g_sprites.towers[3],
      shotVel: 10,
      fireRangeRadius: 300,
      rateOfFire: 1500,
      price: 400,
      damage: 2
    }));

    this._towerTypes.push(new Tower({
      sprite: g_sprites.towers[4],
      shotVel: 15,
      fireRangeRadius: 1000,
      rateOfFire: 5000,
      price: 500,
      damage: 4
    }));

    this._towerTypes.push(new Tower({
      sprite: g_sprites.towers[5],
      shotVel: 10,
      fireRangeRadius: 300,
      rateOfFire: 200,
      price: 600,
      damage: 2
    }));

  },


  // draws the menu
  renderMenu: function(ctx) {
    ctx.drawImage(g_images.menu, 0, 0, g_canvas.width, g_canvas.height);
    this._renderTowerIcons(ctx);
  },

  // draws the tower icons on the menu. If player can not afford the tower
  // then it will be drawn with a low opacity.
  _renderTowerIcons: function(ctx) {
    if (g_money >= this._towerTypes[0].price) {
      this._towerTypes[0].sprite.drawCentredAt(ctx, 862, 100, 0, 1);
    } else {
      this._towerTypes[0].sprite.drawCentredAt(ctx, 862, 100, 0, 0.3);
    }
    if (g_money >= this._towerTypes[1].price) {
      this._towerTypes[1].sprite.drawCentredAt(ctx, 938, 100, 0, 1);
    } else {
      this._towerTypes[1].sprite.drawCentredAt(ctx, 938, 100, 0, 0.3);
    }
    if (g_money >= this._towerTypes[2].price) {
      this._towerTypes[2].sprite.drawCentredAt(ctx, 862, 176, 0, 1);
    } else {
      this._towerTypes[2].sprite.drawCentredAt(ctx, 862, 176, 0, 0.3);
    }
    if (g_money >= this._towerTypes[3].price) {
      this._towerTypes[3].sprite.drawCentredAt(ctx, 938, 176, 0, 1);
    } else {
      this._towerTypes[3].sprite.drawCentredAt(ctx, 938, 176, 0, 0.3);
    }
    if (g_money >= this._towerTypes[4].price) {
      this._towerTypes[4].sprite.drawCentredAt(ctx, 862, 252, 0, 1);
    } else {
      this._towerTypes[4].sprite.drawCentredAt(ctx, 862, 252, 0, 0.3);
    }
    if (g_money >= this._towerTypes[5].price) {
      this._towerTypes[5].sprite.drawCentredAt(ctx, 938, 252, 0, 1);
    } else {
      this._towerTypes[5].sprite.drawCentredAt(ctx, 938, 252, 0, 0.3);
    }

  },

  // Renders the tower we have selected where the mouse is hovering.
  renderClickedTower: function(ctx) {
    if (this.clickedTower != null) {
      if (g_mouseX<g_gameWidth) {
        util.fillCircle(
          ctx,
          g_mouseX,
          g_mouseY,
          this._towerTypes[this.clickedTower].fireRangeRadius,
          0.3);
      }
      this._towerTypes[this.clickedTower].sprite.drawCentredAt(
        ctx, g_mouseX, g_mouseY, 0, 0.3);
    }
  },

  // Checks and selects the tower we clicked, is one was clicked.
  findClickedItem: function(x, y) {
    if (x > 837 && x < 887) {
      if (y > 75 && y < 125) {
        this.clickedTower = 0;
      } else if (y > 151 && y < 201) {
        this.clickedTower = 2;
      } else if (y > 227 && y < 277) {
        this.clickedTower = 4;
      }
    } else if (x > 913 && x < 963) {
      if (y > 75 && y < 125) {
        this.clickedTower = 1;
      } else if (y > 151 && y < 201) {
        this.clickedTower = 3;
      } else if (y > 227 && y < 277) {
        this.clickedTower = 5;
      }
    }
    // Don't select the tower if we can't afford it.
    if (this.clickedTower != null) {
        if (this._towerTypes[this.clickedTower].price>g_money) {
            this.clickedTower = null;
        }
    }
  },

  _setupControls: function(){
    this._levels.push(
      { index: 0, sprite: g_sprites.levels[0],
        pos: {  left: 180, right: 380, top: 250, bottom: 400 }
      }
    );

    this._levels.push(
      { index: 1, sprite: g_sprites.levels[1],
        pos: { left: 400, right: 600, top: 250, bottom: 400 }
      }
    );

    this._levels.push(
      { index: 2, sprite: g_sprites.levels[2],
        pos: { left: 620, right: 820, top: 250, bottom: 400 }
      }
    );

    this._action.push({
      what: NEW_GAME,
      pos: { left: 300, right: 500, top: 400, bottom: 450 }
    })
  },

  // called in TOWERDEFENSE to initalise.
  init: function() {
    this._setupControls();
    this.generateTowerTypes();
  },

};
