'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ref = typeof __BROWSER__ === 'undefined' ? require('@danehansen/math') : ((window || {}).danehansen || {}).math || {},
    _round = _ref.round;

var Point = function () {
  _createClass(Point, null, [{
    key: 'distance',
    value: function distance(a, b) {
      return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
  }, {
    key: 'interpolate',
    value: function interpolate(start, end, amount) {
      return new Point(start.x + (end.x - start.x) * amount, start.y + (end.y - start.y) * amount);
    }
  }, {
    key: 'intersection',
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
    key: 'polar',
    value: function polar(len, angle) {
      return new Point(Math.cos(angle) * len, Math.sin(angle) * len);
    }
  }, {
    key: 'randomPointInCircle',
    value: function randomPointInCircle(center, radius) {
      var random = {};
      do {
        random.x = Math.random() * radius * 2 + center.x - radius;
        random.y = Math.random() * radius * 2 + center.y - radius;
      } while (Point.distance(random, center) > radius);
      return random;
    }
  }, {
    key: 'round',
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

    _initialiseProps.call(this);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: 'length',
    get: function get() {
      return Point.distance(this, { x: 0, y: 0 });
    }
  }]);

  return Point;
}();

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.add = function (point) {
    _this.offset(point.x, point.y);
  };

  this.angle = function () {
    return Math.atan2(_this.y, _this.x);
  };

  this.clone = function () {
    return new Point(_this.x, _this.y);
  };

  this.copyFrom = function (point) {
    _this.setTo(point.x, point.y);
  };

  this.equals = function (point) {
    return _this.x === point.x && _this.y === point.y;
  };

  this.normalize = function (thickness) {
    var ratio = thickness / _this.length;
    _this.x *= ratio;
    _this.y *= ratio;
  };

  this.offset = function (x, y) {
    _this.x += x;
    _this.y += y;
  };

  this.setTo = function (x, y) {
    _this.x = x;
    _this.y = y;
  };

  this.subtract = function (point) {
    _this.x -= point.x;
    _this.y -= point.y;
  };

  this.toString = function () {
    return '{x: ' + _this.x + ', y: ' + _this.y + '}';
  };
};

exports.default = Point;
