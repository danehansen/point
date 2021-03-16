# point ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@danehansen/point.svg) ![npm](https://img.shields.io/npm/dt/@danehansen/point.svg)

The point library contains a collection of functions for dealing with points with numerical x and y values.

## Installation

`npm install --save @danehansen/point`

## Usage

As a module:

    import * as point from '@danehansen/point';

    var p1 = {x: 50, y: 75};
    var p2 = point.add(p1, {x: 5, y: 5});
    var d = point.distance(p1, p2);

In your browser:

    <script src='danehansen-point.min.js'></script>
    <script>
      var point = window.danehansen.point;
      var p1 = {x: 50, y: 75};
      var p2 = point.add(p1, {x: 5, y: 5});
      var d = point.distance(p1, p2);
    </script>

## Methods

- **add**(pt1:Object, pt2:Object):Object  
Returns a new point equal to sum of two points.
- **angle**(point:Object):Number  
Returns the angle in radians of a point from (0,0).
- **distance**(pt1:Object, pt2:Object):Number  
  Returns the distance between pt1 and pt2.
- **interpolate**(pt1:Object, pt2:Object, f:Number):Object  
  Determines a point between two specified points.
- **intersection**(aStart:Object, aEnd:Object, bStart:Object, bEnd:Object):Object  
  Returns a point where to traveling points intersect, or null if never.
- **isEqual**(pt1:Object, pt2:Object):Boolean  
  Determines whether two points are equal.
- **normalize**(point:Object, thicknes:Number)  
  Returns a new point scaled from the line segment between (0,0) and a point to a set length.
- **polar**(len:Number, angle:Number):Object  
  Converts a pair of polar coordinates to a Cartesian point coordinate.
- **randomPointInCircle**(center:Object, radius:Number):Object  
  Returns a random point within a given circle.
- **rotate**(point:Object, angle:Number, center:Object = {x: 0, y: 0})  
  Returns a new point rotated around a center point by the specified angle.
- **round**(v:Object, increment:Number = 1):Object  
  Returns a new point with its x and y values rounded to the nearest increment.
- **toString**(point:Object):String  
  Returns a string that contains the values of the x and y coordinates.
