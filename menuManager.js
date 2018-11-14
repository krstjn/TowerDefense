// ============
// MENU MANAGER
// ============


"use strict"

var menuManager = {

  // towerTypes stores each of the different towers as tower objects.
  // clickedTower knows if and then what tower on the menu we clicked last.
  _towerTypes: [],
  clickedTower: null,

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
  },

  // called in TOWERDEFENSE to initalise.
  init: function() {
    this.generateTowerTypes();
  },

};
