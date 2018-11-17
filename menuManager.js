// ============
// MENU MANAGER
// ============


"use strict"

var menuManager = {

    // towerTypes stores each of the different towers as tower objects.
    // clickedTower knows if and then what tower on the menu we clicked last.
    _towerTypes: [],
    clickedTower: null,
    mouseOverTower: null,


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
        ctx.fillText("TOWER DEFENSE", g_canvas.width / 2 - 200, 100);
        ctx.font = "30px Arial";
        ctx.fillText("Select a map to play", g_canvas.width / 2 - 140, 150);

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
        ctx.fillText(message, g_gameWidth / 2 - 150, g_gameHeight / 2);

        util.fillBox(ctx, g_gameWidth / 2 - 100, g_gameHeight / 2 + 100, 200, 50, "#A00");
        util.fillBox(ctx, g_gameWidth / 2 - 95, g_gameHeight / 2 + 105, 190, 40, "red");

        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("NEW GAME", g_gameWidth / 2 - 80, g_gameHeight / 2 + 135);

        ctx.fillStyle = prevfillStyle;

    },

    /**
     * Figure out if a mouse was pressed inside of the
     * level "buttons", and setup the game based on the level "button" selected
     * @param {number} xPos
     * @param {number} yPos
     */
    setupSelectedLevel: function(xPos, yPos) {
        var level = this._levels.find((el) => {
            var {
                pos
            } = el;
            if (pos.left <= xPos && pos.right >= xPos) {
                if (pos.bottom >= yPos && pos.top <= yPos) {
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
    performAction: function(xPos, yPos) {

        var action = this._action.find((el) => {
            var {
                pos
            } = el;
            if (pos.left <= xPos && pos.right >= xPos) {
                if (pos.bottom >= yPos && pos.top <= yPos) {
                    return el;
                }
            }
        });

        if (action) {
            if (action.what === NEW_GAME) {
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

    // ===============
    // MENU RENDER OPS
    // ===============

    // draws the menu
    renderMenu: function(ctx) {
        ctx.drawImage(g_images.menu, 0, 0, g_canvas.width, g_canvas.height);
        this.renderTowerIcons(ctx);
        this.renderNextWaveButton(ctx);
        this.renderLives(ctx);
        this.renderMoney(ctx);
        this.renderWaveInfo(ctx);
    },

    // draws the tower icons on the menu. If player can not afford the tower
    // then it will be drawn with a low opacity.
    renderTowerIcons: function(ctx) {
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

    renderNextWaveButton: function(ctx) {
        ctx.save();
        ctx.globalAlpha = 1;
        if (this.isMouseOnNextWaveButton()) {
            ctx.globalAlpha = 0.85;
            if (g_wasMouseDown) ctx.globalAlpha = 1;
        }
        ctx.drawImage(g_images.nextWaveButton, g_gameWidth + 25, 530, 150, 50);
        ctx.restore();
    },

    renderTowerInfo: function(ctx) {
        var tower = this._towerTypes[this.mouseOverTower];
        ctx.save();
        ctx.drawImage(g_images.infobox, g_gameWidth + 15, 305, 170, 160);
        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        util.renderText(ctx, "#3D2914", 20, "Tower Type:", g_gameWidth + 100, 320);
        util.renderText(ctx, "#3D2914", 18, "" + "töff turn", g_gameWidth + 100, 340);
        ctx.textAlign = "start";
        util.renderText(ctx, "#3D2914", 18, "Price:", g_gameWidth + 35, 370);
        util.renderText(ctx, "#3D2914", 18, "Damage:", g_gameWidth + 35, 390);
        util.renderText(ctx, "#3D2914", 18, "Range:", g_gameWidth + 35, 410);
        util.renderText(ctx, "#3D2914", 18, "Rate of fire:", g_gameWidth + 35, 430);

        ctx.textAlign = "end";
        util.renderText(ctx, "#3D2914", 18, "" + tower.price, g_gameWidth + 165, 370);
        util.renderText(ctx, "#3D2914", 18, "" + tower.damage, g_gameWidth + 165, 390);
        util.renderText(ctx, "#3D2914", 18, "" + tower.fireRangeRadius / 10, g_gameWidth + 165, 410);
        util.renderText(ctx, "#3D2914", 18, "" + tower.rateOfFire / 1000, g_gameWidth + 165, 430);
        ctx.restore();
    },

    // Renders the tower we have selected where the mouse is hovering.
    renderClickedTower: function(ctx) {
        ctx.save();
        if (this.clickedTower != null) {
            if (g_mouseX < g_gameWidth) {
                ctx.fillStyle = "red";
                // Check whether current mouse location is unocupied space.
                // and makes the circle green if so.
                var xGridNum = Math.floor(g_mouseX / 40);
                var yGridNum = Math.floor(g_mouseY / 40);
                var arrayIndex = 20 * yGridNum + xGridNum;
                if (g_mapGrids[g_level][arrayIndex]) ctx.fillStyle = "green";
                util.fillCircle(
                    ctx,
                    g_mouseX,
                    g_mouseY,
                    this._towerTypes[this.clickedTower].fireRangeRadius,
                    0.25);
            }
            this._towerTypes[this.clickedTower].sprite.drawCentredAt(
                ctx, g_mouseX, g_mouseY, 0, 0.3);
        }
        ctx.restore();
    },

    renderMoney : function(ctx) {
        ctx.save();
        ctx.textAlign="start";
        ctx.font = "450 24px Berlin sans FB";
        ctx.fillStyle = "#FFE87C";
        ctx.fillText("$ " + g_money, g_gameWidth + 30, 493);
        ctx.fillStyle = "#3D2914";
        ctx.strokeText("$ " + g_money, g_gameWidth + 30, 493);
        ctx.restore();
    },

    renderLives : function(ctx) {
        ctx.save();
        ctx.textAlign="end";
        ctx.font = "450 24px Berlin sans FB";
        ctx.fillStyle = "red";
        ctx.fillText("♥ " + g_lives, g_gameWidth + 170, 493);
        ctx.fillStyle = "#3D2914";
        ctx.strokeText("♥ " + g_lives, g_gameWidth + 170, 493);
        ctx.restore();
    },

    renderWaveInfo : function(ctx) {
        ctx.save();
        var text = "Wave " + (waveManager.getNextWaveID()-1) + " of " + waves.length;
        ctx.textAlign="center";
        util.renderText(ctx, "#3D2914", 22, text, g_gameWidth+100, 520);
        ctx.restore();
    },

    //===============
    // MENU MOUSE OPS
    //===============

    // Checks and selects the tower we clicked, is one was clicked.
    findClickedItem: function(x, y) {
        if (this.mouseOverTower != null) {
            this.clickedTower = this.mouseOverTower;
        }
        // Don't select the tower if we can't afford it.
        if (this.clickedTower != null) {
            if (this._towerTypes[this.clickedTower].price > g_money) {
                this.clickedTower = null;
            }
        }
    },

    isMouseOverMenuTower: function(x, y) {
        if (x > 837 && x < 887) {
            if (y > 75 && y < 125) {
                this.mouseOverTower = 0;
            } else if (y > 151 && y < 201) {
                this.mouseOverTower = 2;
            } else if (y > 227 && y < 277) {
                this.mouseOverTower = 4;
            }
        } else if (x > 913 && x < 963) {
            if (y > 75 && y < 125) {
                this.mouseOverTower = 1;
            } else if (y > 151 && y < 201) {
                this.mouseOverTower = 3;
            } else if (y > 227 && y < 277) {
                this.mouseOverTower = 5;
            }
        }
        if (this.mouseOverTower != null) return true;
    },

    isMouseOnNextWaveButton: function() {
        var bool = true;
        console.log(g_mouseX);
        console.log(g_mouseY);
        if (g_mouseX < g_gameWidth + 25 || g_gameWidth + 175 < g_mouseX) bool = false;
        if (g_mouseY < 530 || 580 < g_mouseY) bool = false;
        return bool;
    },

    //===============
    // MENU SETUP OPS
    //===============

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

    _setupControls: function() {
        this._levels.push({
            index: 0,
            sprite: g_sprites.levels[0],
            pos: {
                left: 180,
                right: 380,
                top: 250,
                bottom: 400
            }
        });

        this._levels.push({
            index: 1,
            sprite: g_sprites.levels[1],
            pos: {
                left: 400,
                right: 600,
                top: 250,
                bottom: 400
            }
        });

        this._levels.push({
            index: 2,
            sprite: g_sprites.levels[2],
            pos: {
                left: 620,
                right: 820,
                top: 250,
                bottom: 400
            }
        });

        this._action.push({
            what: NEW_GAME,
            pos: {
                left: 300,
                right: 500,
                top: 400,
                bottom: 450
            }
        })
    },

    // called in TOWERDEFENSE to initalise.
    init: function() {
        this._setupControls();
        this.generateTowerTypes();
    },

};
