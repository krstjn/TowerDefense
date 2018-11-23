// =====
// Path
// =====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Array with multiple paths, one for each lvl.
var g_paths = [generatePath1(), generatePath2(), generatePath3()];


// Constructor
function Node(x,y) {
  this.cx = x;
  this.cy = y;
}

// Path for level 1
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

// Path for level 2
function generatePath2() {
  var p = [];
  p.push(new Node(360, 0));
  p.push(new Node(360, 480));
  p.push(new Node(120, 480));
  p.push(new Node(120, 120));
  p.push(new Node(680, 120));
  p.push(new Node(680, 240));
  p.push(new Node(480, 240));
  p.push(new Node(480, 400));
  p.push(new Node(680, 400));
  p.push(new Node(680, 520));
  p.push(new Node(600, 520));
  return p;
}

// Path for level 3
function generatePath3() {
  var p = [];
  p.push(new Node(120, 0));
  p.push(new Node(120, 480));
  p.push(new Node(240, 480));
  p.push(new Node(240, 120));
  p.push(new Node(360, 120));
  p.push(new Node(360, 340));
  p.push(new Node(740, 340));
  return p;
}
