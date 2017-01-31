"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ref = typeof require !== "undefined" ? require('@danehansen/math') : window.danehansen.math,
    _round = _ref.round;

var Point = function () {
  _createClass(Point, null, [{
    key: "distance",
    value: function distance(a, b) {
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
  }, {
    key: "interpolate",
    value: function interpolate(start, end, amount) {
      return new Point(start.x + (end.x - start.x) * amount, start.y + (end.y - start.y) * amount);
    }
  }, {
    key: "intersection",
    value: function intersection(startA, endA, startB, endB) {
      var x1 = startA.x;
      var y1 = startA.y;
      var x2 = endA.x;
      var y2 = endA.y;
      var x3 = startB.x;
      var y3 = startB.y;
      var x4 = endB.x;
      var y4 = endB.y;
      var a = x1 - x2;
      var b = y3 - y4;
      var c = y1 - y2;
      var d = x3 - x4;
      var e = a * b - c * d;
      if (e === 0) {
        return null;
      }
      var f = x1 * y2 - y1 * x2;
      var g = x3 * y4 - y3 * x4;
      return new Point((f * d - a * g) / e, (f * b - c * g) / e);
    }
  }, {
    key: "polar",
    value: function polar(len, angle) {
      return new Point(Math.cos(angle) * len, Math.sin(angle) * len);
    }
  }, {
    key: "randomPointInCircle",
    value: function randomPointInCircle(center, radius) {
      var random = {};
      do {
        random.x = Math.random() * radius * 2 + center.x - radius;
        random.y = Math.random() * radius * 2 + center.y - radius;
      } while (Point.distance(random, center) > radius);
      return random;
    }
  }, {
    key: "round",
    value: function round(point, increment) {
      return {
        x: _round(point.x, increment),
        y: _round(point.y, increment)
      };
    }
  }]);

  function Point() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: "add",
    value: function add(point) {
      this.offset(point.x, point.y);
    }
  }, {
    key: "angle",
    value: function angle() {
      return Math.atan2(this.y, this.x);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Point(this.x, this.y);
    }
  }, {
    key: "copyFrom",
    value: function copyFrom(point) {
      this.setTo(point.x, point.y);
    }
  }, {
    key: "equals",
    value: function equals(point) {
      return this.x === point.x && this.y === point.y;
    }
  }, {
    key: "length",
    value: function length() {
      return Point.distance(this, new Point());
    }
  }, {
    key: "normalize",
    value: function normalize(thickness) {
      var ratio = thickness / this.length();
      this.x *= ratio;
      this.y *= ratio;
    }
  }, {
    key: "offset",
    value: function offset(x, y) {
      this.x += x;
      this.y += y;
    }
  }, {
    key: "setTo",
    value: function setTo(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "subtract",
    value: function subtract(point) {
      this.x -= point.x;
      this.y -= point.y;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "{x: " + this.x + ", y: " + this.y + "}";
    }
  }]);

  return Point;
}();

exports.default = Point;
