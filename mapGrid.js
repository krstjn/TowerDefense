// ======
// MAPGRID
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Array with multiple mapGrids, one for each lvl.
var g_mapGrids = [generateMapGrid1(), generateMapGrid2(), generateMapGrid3()];

function generateMapGrid1(){
  var g = [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,
           1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,
           1,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,0,0,1,1,
           1,1,0,0,0,1,1,0,0,1,1,1,1,1,1,0,0,0,1,1,
           1,1,0,0,1,1,1,0,0,1,1,0,0,0,1,1,0,0,1,1,
           1,1,0,0,1,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,
           1,1,0,0,1,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,
           1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,
           1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,
           1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
           1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
           1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]
    return g;
}

function generateMapGrid2(){
  var g = [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,
           1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,
           1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
           1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
           1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,
           1,1,0,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0,1,1,
           1,1,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0,0,1,1,
           1,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,0,0,1,1,
           1,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,0,0,1,1,
           1,1,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0,0,1,1,
           1,1,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0,0,1,1,
           1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,
           1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,
           1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]
    return g;
}

function generateMapGrid3(){
  var g = [1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
           1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,
           1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
           1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
           1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,
           1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,
           1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,
           1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,
           1,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
           1,1,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,
           1,1,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,
           1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,
           1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,
           1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,]
    return g;
}
