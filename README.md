# Point ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@danehansen/point.svg) ![npm](https://img.shields.io/npm/dt/@danehansen/point.svg)

**Class** : public class [Point](https://github.com/danehansen/Point)  
**Inheritance** : [Point](https://github.com/danehansen/Point) > Object

The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis. Mostly based on the AS3 Point class, but with some added features/useless ones removed.

## Installation

`npm install --save @danehansen/point`

## Usage

As a module:

    import Point from '@danehansen/point';

    var p = new Point(50, 75);
    p.setTo(25, 75);
    var d = Point.distace(p, new Point(5, 20));

In your browser:

    <script src='danehansen-Point.min.js'></script>
    <script>
      var Point = window.danehansen.Point;
      var p = new Point(3, 4);
      p.add(new Point(5, 6));
    </script>

## Public Static Methods

- **distance**(pt1:Point, pt2:Point):Number  
  [static] Returns the distance between pt1 and pt2.
- **interpolate**(pt1:Point, pt2:Point, f:Number):Point  
  [static] Determines a point between two specified points.
- **intersection**(aStart:Point, aEnd:Point, bStart:Point, bEnd:Point):Point  
  [static] Returns a point where to traveling points intersect, or null if never.
- **polar**(len:Number, angle:Number):Point  
  [static] Converts a pair of polar coordinates to a Cartesian point coordinate.
- **randomPointInCircle**(center:Point, radius:Number):Point  
  [static] Returns a random point within a given circle.
- **round**(v:Point, increment:Number = 1):Point  
  [static] Returns a new point with its x and y values rounded to the nearest increment.

## Public Properties

- **length**() : Number  
  [read-only] Gets the length of the line segment from (0,0) to this point.
- **x** : Number  
  The horizontal coordinate of the point.
- **y** : Number  
  The vertical coordinate of the point.

## Public Methods

- **Point**(x:Number = 0, y:Number = 0)  
  Creates a new point.
- **add**(v:Point):Point  
  Adds the coordinates of another point to the coordinates of this point to create a new point.
- **angle**():Number  
  Returns the angle in radians of this point from (0,0).
- **clone**():Point  
  Creates a copy of this Point object.
- **copyFrom**(sourcePoint:Point)  
  Copies all of the point data from the source Point object into the calling Point object.
- **equals**(toCompare:Point):Boolean  
  Determines whether two points are equal.
- **normalize**(thicknes:Number)  
  Scales the line segment between (0,0) and the current point to a set length.
- **offset**(dx:Number, dy:Number)  
  Offsets the Point object by the specified amount.
- **rotate**(angle:Number, center:Point = new Point())  
  Rotates the Point object around a center point by the specified angle.
- **setTo**(xa:Number, ya:Number)  
  Sets the members of Point to the specified values
- **subtract**(v:Point):Boolean  
  Subtracts the coordinates of another point from the coordinates of this point to create a new point.
- **toString**():String  
  Returns a string that contains the values of the x and y coordinates.
