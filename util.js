// ====
// util
// ====


// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var util = {


    // RANGES
    // ======

    clampRange: function (value, lowBound, highBound) {
        if (value < lowBound) {
            value = lowBound;
        } else if (value > highBound) {
            value = highBound;
        }
        return value;
    },

    wrapRange: function (value, lowBound, highBound) {
        while (value < lowBound) {
            value += (highBound - lowBound);
        }
        while (value > highBound) {
            value -= (highBound - lowBound);
        }
        return value;
    },

    isBetween: function (value, lowBound, highBound) {
        if (value < lowBound) {
            return false;
        }
        if (value > highBound) {
            return false;
        }
        return true;
    },


    // RANDOMNESS
    // ==========

    randRange: function (min, max) {
        return (min + Math.random() * (max - min));
    },


    // MISC
    // ====

    square: function (x) {
        return x * x;
    },

    getRotation: function (origX, origY, x, y) {
        var m = origY - y;
        var a = origX - x + 0.001; // 0.001 is so that we don't devide with zero
        var atan = Math.atan(m / a) - Math.PI / 2;
        if (a <= 0) {
            atan += Math.PI
        };
        return atan;
    },


    // DISTANCES
    // =========

    distSq: function (x1, y1, x2, y2) {
        return this.square(x2 - x1) + this.square(y2 - y1);
    },

    wrappedDistSq: function (x1, y1, x2, y2, xWrap, yWrap) {
        var dx = Math.abs(x2 - x1),
            dy = Math.abs(y2 - y1);
        if (dx > xWrap / 2) {
            dx = xWrap - dx;
        };
        if (dy > yWrap / 2) {
            dy = yWrap - dy;
        }
        return this.square(dx) + this.square(dy);
    },


    // CANVAS OPS
    // ==========

    // draws the background
    renderBackground: function (ctx) {
        g_sprites.levels[g_level].drawAt(ctx, 0, 0, g_gameWidth, g_gameHeight);
    },

    // Draws text at the given (x, y) with Berlin sans FB font
    renderText: function (ctx, color, size, text, x, y) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.font = "450 " + size + "px Berlin sans FB";
        ctx.fillText(text, x, y);
        ctx.restore();
    },

    // Draws text in the menu with corresponding (x, y) cooredinates,
    // text position, font, fill and stroke color
    renderText2: function (ctx, textPosition, font, color1,
        color2, text, xPosOnMenu, yPosOnMenu) {
        ctx.save();
        ctx.textAlign = textPosition;
        ctx.font = font;
        ctx.fillStyle = color1;
        ctx.fillText(text, (xPosOnMenu + g_gameWidth), yPosOnMenu);
        ctx.fillStyle = color2;
        ctx.strokeText(text, (xPosOnMenu + g_gameWidth), yPosOnMenu);
        ctx.restore();
    },

    clearCanvas: function (ctx) {
        var prevfillStyle = ctx.fillStyle;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = prevfillStyle;
    },

    strokeCircle: function (ctx, x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
    },

    fillCircle: function (ctx, x, y, r, opacity) {
        if (opacity === undefined) opacity = 1;
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    },

    fillBox: function (ctx, x, y, w, h, style, opacity = 1) {
        var oldStyle = ctx.fillStyle;
        var oldAlpha = ctx.globalAlpha;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = style;
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = oldStyle;
        ctx.globalAlpha = oldAlpha;
    }

};
