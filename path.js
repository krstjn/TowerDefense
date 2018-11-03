// ======
// Path
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Fylki með mörgum paths, hægt að geyma path fyrir hvert lvl
var g_paths = [generatePath1(), generatePath2()];

// Bætir punkt inn í path-ið
function insertNode (x, y) {
  this.push(new Node(x,y));
};

// Smíðir fyrir punkt í path
function Node(x,y) {
  this.cx = x;
  this.cy = y;
}

// Búa til path fyrir lvl 1
function generatePath1() {
  var p = [];
  p.push(new Node(20, 0));
  p.push(new Node(20, 50));
  p.push(new Node(200, 50));
  p.push(new Node(200, 200));
  p.push(new Node(50, 200));
  p.push(new Node(50, 500));
  p.push(new Node(500, 500));
  p.push(new Node(500, 250));
  p.push(new Node(g_canvas.widht, 250));
  return p;
}

// Búa til path fyrir lvl 2
function generatePath2() {
  var p = [];
  p.push(new Node(20, 0));
  p.push(new Node(20, 50));
  p.push(new Node(200, 50));
  p.push(new Node(200, 200));
  p.push(new Node(50, 200));
  return p;
}
