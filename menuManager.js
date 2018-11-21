// ============
// MENU MANAGER
// ============


"use strict"

var menuManager = {

    // towerTypes stores each of the different towers as tower objects.
    // clickedNewTower knows if and then what tower on the menu we clicked last.
    _towerTypes: [],
    _levels: [],
    _action: [],
    clickedNewTower: null,
    clickedExistingTower: null,
    mouseOverMenuTower: null,
    mouseOverExistingTower: null,

    selectSound: new Audio("sounds/select.ogg"),
    actionSound: new Audio("sounds/action.ogg"),
    sellSound: new Audio("sounds/sell.ogg"),


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
            mapGrid.init();
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
        this.renderTowerInfo(ctx);
        this.renderTowerUpgradeInfo(ctx);
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
        ctx.globalAlpha = 0.85;
        if (this.isMouseOnNextWaveButton()) {
            ctx.globalAlpha = 1;
            if (g_wasMouseDown) ctx.globalAlpha = 0.85;
        }
        ctx.drawImage(g_images.nextWaveButton, g_gameWidth + 25, 530, 150, 50);
        ctx.restore();
    },

    mouseOverUpgradeInfo: function() {
        if (!this.clickedExistingTower) return;
        var cx = this.clickedExistingTower.cx;
        var cy = this.clickedExistingTower.cy;
        var yOffset = 20;
        if (cy > 400) yOffset = -200;
        if (g_mouseY > cy + yOffset && g_mouseY < cy + yOffset + 180) {
            if (g_mouseX > cx - 15 && g_mouseX < cx + 185) {
                return true;
            }
        }
    },

    mouseOverUpgradeButton: function() {
        if (!this.clickedExistingTower) return;
        var cx = this.clickedExistingTower.cx;
        var cy = this.clickedExistingTower.cy;
        var yOffset = 25;
        if (cy > 400) yOffset = -200;
        if (g_mouseY > cy + yOffset + 20 && g_mouseY < cy + yOffset + 60) {
            if (g_mouseX > cx + 5 && g_mouseX < cx + 105) {
                return true;
            }
        }
    },

    mouseOverSellButton: function() {
        if (!this.clickedExistingTower) return;
        var cx = this.clickedExistingTower.cx;
        var cy = this.clickedExistingTower.cy;
        var yOffset = 25;
        if (cy > 400) yOffset = -200;
        if (g_mouseY > cy + yOffset + 20 && g_mouseY < cy + yOffset + 60) {
            if (g_mouseX > cx + 110 && g_mouseX < cx + 165) {
                return true;
            }
        }
    },

    renderTowerInfo: function(ctx) {
        var tower = this._towerTypes[this.mouseOverMenuTower]
        if (!tower) {
            tower = this.mouseOverExistingTower;
        }
        // Don't draw any info if there's no tower to draw
        if (tower == null) return;
        ctx.save();
        ctx.drawImage(g_images.infobox, g_gameWidth + 15, 305, 170, 160);
        ctx.textBaseline = "top";
        ctx.textAlign = "center";
        util.renderText(ctx, "#3D2914", 20, "Tower Type:", g_gameWidth + 100, 320);
        util.renderText(ctx, "#3D2914", 18, "" + tower.type, g_gameWidth + 100, 340);
        ctx.textAlign = "start";
        util.renderText(ctx, "#3D2914", 18, "Price:", g_gameWidth + 35, 370);
        util.renderText(ctx, "#3D2914", 18, "Damage:", g_gameWidth + 35, 390);
        util.renderText(ctx, "#3D2914", 18, "Range:", g_gameWidth + 35, 410);
        util.renderText(ctx, "#3D2914", 18, "Fire rate:", g_gameWidth + 35, 430);

        ctx.textAlign = "end";
        util.renderText(ctx, "#3D2914", 18, "" + Math.round(tower.price / 50) * 50, g_gameWidth + 165, 370);
        util.renderText(ctx, "#3D2914", 18, "" + tower.damage, g_gameWidth + 165, 390);
        util.renderText(ctx, "#3D2914", 18, "" + Math.round(tower.fireRangeRadius / 10), g_gameWidth + 165, 410);
        util.renderText(ctx, "#3D2914", 18, "" + Math.round(tower.rateOfFire / 100) / 10, g_gameWidth + 165, 430);
        ctx.restore();
    },

    renderTowerUpgradeInfo: function(ctx) {
        var tower = this.clickedExistingTower;
        if (!tower) return;
        var yOffset = 25;
        var xOffset = -15
        if (tower.cy > 400) {
            yOffset = -200;
        }

        ctx.save();
        // Start by drawing the fire range radius around the tower.
        ctx.fillStyle = "green";
        util.fillCircle(ctx, tower.cx, tower.cy, tower.fireRangeRadius, 0.25);

        ctx.globalAlpha = 0.8;
        ctx.drawImage(g_images.infobox, tower.cx + xOffset, tower.cy + yOffset, 200, 180);

        if (this.mouseOverUpgradeButton() && tower.price * 2.5 <= g_money) {
            ctx.globalAlpha = 1;
        }
        ctx.drawImage(g_images.upgradeButton, tower.cx + 5, tower.cy + yOffset + 20, 100, 40);

        ctx.globalAlpha = 0.8;
        if (this.mouseOverSellButton()) {
            ctx.globalAlpha = 1;
        }
        ctx.drawImage(g_images.sellButton, tower.cx + 110, tower.cy + yOffset + 20, 55, 40);

        ctx.globalAlpha = 0.8;
        ctx.textBaseline = "top";
        ctx.textAlign = "start";
        if (this.mouseOverSellButton()) {
            util.renderText(ctx, "#3D2914", 18, "Sell price:", tower.cx + 5, tower.cy + yOffset + 65);
        } else {
            util.renderText(ctx, "#3D2914", 18, "Upg. price:", tower.cx + 5, tower.cy + yOffset + 65);
        }
        util.renderText(ctx, "#3D2914", 18, "Tower lvl:", tower.cx + 5, tower.cy + yOffset + 85);
        util.renderText(ctx, "#3D2914", 18, "Damage:", tower.cx + 5, tower.cy + yOffset + 105);
        util.renderText(ctx, "#3D2914", 18, "Range:", tower.cx + 5, tower.cy + yOffset + 125);
        util.renderText(ctx, "#3D2914", 18, "Fire rate:", tower.cx + 5, tower.cy + yOffset + 145);

        ctx.textAlign = "end";
        if (this.mouseOverSellButton()) {
            util.renderText(ctx, "#3D2914", 18, "" + Math.floor(tower.price*0.75 / 50) * 50, tower.cx + 165, tower.cy + yOffset + 65);
        } else {
            util.renderText(ctx, "#3D2914", 18, "" + Math.round(tower.price * 2.5 / 50) * 50, tower.cx + 165, tower.cy + yOffset + 65);
        }
        util.renderText(ctx, "#3D2914", 18, "" + tower.lvl + " → " + (tower.lvl+1), tower.cx + 165, tower.cy + yOffset + 85);
        util.renderText(ctx, "#3D2914", 18, "" + Math.round(tower.damage*10)/10 + " → " + Math.round(tower.damage * 1.5 *10)/10, tower.cx + 165, tower.cy + yOffset + 105);
        util.renderText(ctx, "#3D2914", 18, "" + Math.round(tower.fireRangeRadius / 10) + " → " + Math.round(tower.fireRangeRadius * 1.1 / 10), tower.cx + 165, tower.cy + yOffset + 125);
        util.renderText(ctx, "#3D2914", 18, "" + Math.round(tower.rateOfFire / 100) / 10 + " → " + Math.round(tower.rateOfFire * 0.9 / 100) / 10, tower.cx + 165, tower.cy + yOffset + 145);
        ctx.restore();
    },

    // Renders the tower we have selected where the mouse is hovering.
    renderclickedNewTower: function(ctx) {
        ctx.save();
        if (this.clickedNewTower != null) {
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
                    this._towerTypes[this.clickedNewTower].fireRangeRadius,
                    0.25);
            }
            this._towerTypes[this.clickedNewTower].sprite.drawCentredAt(
                ctx, g_mouseX, g_mouseY, 0, 0.3);
        }
        ctx.restore();
    },

    renderMoney: function(ctx) {
        ctx.save();
        ctx.textAlign = "start";
        ctx.font = "450 24px Berlin sans FB";
        ctx.fillStyle = "#FFE87C";
        ctx.fillText("$ " + g_money, g_gameWidth + 30, 493);
        ctx.fillStyle = "#3D2914";
        ctx.strokeText("$ " + g_money, g_gameWidth + 30, 493);
        ctx.restore();
    },

    renderLives: function(ctx) {
        ctx.save();
        ctx.textAlign = "end";
        ctx.font = "450 24px Berlin sans FB";
        ctx.fillStyle = "red";
        ctx.fillText("♥ " + g_lives, g_gameWidth + 170, 493);
        ctx.fillStyle = "#3D2914";
        ctx.strokeText("♥ " + g_lives, g_gameWidth + 170, 493);
        ctx.restore();
    },

    renderWaveInfo: function(ctx) {
        ctx.save();
        var text = "Wave " + (waveManager.getNextWaveID() - 1) + " of " + (g_waves.length);
        ctx.textAlign = "center";
        util.renderText(ctx, "#3D2914", 22, text, g_gameWidth + 100, 520);
        ctx.restore();
    },

    //===============
    // MENU MOUSE OPS
    //===============

    // Finds the the item that's being clicked if any.
    findClickedItem: function(x, y) {
        if (this.mouseOverUpgradeButton()) {
            if (this.clickedExistingTower.price * 2.5 <= g_money) {
                this.clickedExistingTower.upgrade();
                this.clickedExistingTower = null;
            }
            if (g_soundOn) this.actionSound.play();
            return;
        }
        if (this.mouseOverSellButton()) {
            console.log("inní sell í findClickedItem")
            this.clickedExistingTower.sell();
            this.clickedExistingTower = null;
            if (g_soundOn) this.sellSound.play();
            return;
        }
        if (this.isMouseOnNextWaveButton()) {
            entityManager.sendNextWave();
            if (g_soundOn) this.actionSound.play();
            return;
        }
        if (this.mouseOverMenuTower != null) {
            this.clickedNewTower = this.mouseOverMenuTower;
            // Don't select the tower if we can't afford it.
            if (g_soundOn) this.selectSound.play();
            if (this._towerTypes[this.clickedNewTower].price > g_money) {
                this.clickedNewTower = null;
            }
        }
        if (this.mouseOverExistingTower) {
            this.clickedExistingTower = this.mouseOverExistingTower;
            if (g_soundOn) this.selectSound.play();
        }
    },

    isMouseOverTower: function(x, y) {
        if (x > 837 && x < 887) {
            if (y > 75 && y < 125) {
                this.mouseOverMenuTower = 0;
            } else if (y > 151 && y < 201) {
                this.mouseOverMenuTower = 2;
            } else if (y > 227 && y < 277) {
                this.mouseOverMenuTower = 4;
            }
        } else if (x > 913 && x < 963) {
            if (y > 75 && y < 125) {
                this.mouseOverMenuTower = 1;
            } else if (y > 151 && y < 201) {
                this.mouseOverMenuTower = 3;
            } else if (y > 227 && y < 277) {
                this.mouseOverMenuTower = 5;
            }
        }
        if (this.mouseOverMenuTower != null) return;
        entityManager._towers.forEach(el => {
            if (Math.abs(g_mouseX - el.cx) < 20 &&
                Math.abs(g_mouseY - el.cy) < 20) {
                this.mouseOverExistingTower = el;
            }
        })
    },

    isMouseOnNextWaveButton: function() {
        var bool = true;
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
            spriteIndex: 0,
            shotVel: 15,
            fireRangeRadius: 100,
            rateOfFire: 1000,
            price: 100,
            damage: 1,
            type: NORMAL
        }));

        // Turn sem skýtur bara flying óvini
        this._towerTypes.push(new Tower({
            sprite: g_sprites.towers[1],
            spriteIndex: 1,
            shotVel: 15,
            fireRangeRadius: 200,
            rateOfFire: 1000,
            price: 200,
            damage: 1.5,
            type: FLYING
        }));
        // Sprengjuturn
        this._towerTypes.push(new Tower({
            sprite: g_sprites.towers[2],
            spriteIndex: 2,
            shotVel: 15,
            fireRangeRadius: 100,
            rateOfFire: 3000,
            price: 300,
            damage: 0.5,
            type: EXPLODE
        }));

        // Poison turn
        this._towerTypes.push(new Tower({
            sprite: g_sprites.towers[3],
            spriteIndex: 3,
            shotVel: 15,
            fireRangeRadius: 100,
            rateOfFire: 2000,
            price: 200,
            damage: 0.1,
            type: POISON
        }));

        // Slow turn
        this._towerTypes.push(new Tower({
            sprite: g_sprites.towers[4],
            spriteIndex: 4,
            shotVel: 15,
            fireRangeRadius: 100,
            rateOfFire: 1000,
            price: 200,
            damage: 0.5,
            type: SLOW
        }));

        // Stun turn
        this._towerTypes.push(new Tower({
            sprite: g_sprites.towers[5],
            spriteIndex: 5,
            shotVel: 15,
            fireRangeRadius: 100,
            rateOfFire: 1500,
            price: 200,
            damage: 0.2,
            type: STUN
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
