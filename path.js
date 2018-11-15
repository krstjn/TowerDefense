// ======
// Path
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Array with multiple paths, one for each lvl.
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
  p.push(new Node(120, 0));
  p.push(new Node(120, 480));
  p.push(new Node(680, 480));
  p.push(new Node(680, 120));
  p.push(new Node(320, 120));
  p.push(new Node(320, 320));
  p.push(new Node(480, 320));
  return p;
}

// Búa til path fyrir lvl 2
function generatePath2() {
  var p = [];
  p.push(new Node(150, 0));
  p.push(new Node(150, 300));
  p.push(new Node(80, 300));
  p.push(new Node(80, 450));
  p.push(new Node(400, 450));
  return p;
}
