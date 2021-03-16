import * as point from "../src/point";
import * as math from "@danehansen/math";
import { expect } from "chai";
import fs from "fs";
import path from "path";

function equals(p1, p2) {
  expect(p1.x).to.equal(p2.x);
  expect(p1.y).to.equal(p2.y);
}

const TOLERANCE = 0.001;
function roughlyEquals(p1, p2) {
  equals(point.round(p1, TOLERANCE), point.round(p2, TOLERANCE));
}

describe("point", function() {
  describe("danehansen-point.min.js", function() {
    it("is minified", function() {
      const min = fs.readFileSync(
        path.join(__dirname, "../danehansen-point.min.js"),
        "utf8"
      );
      expect(min.match(/\n/g)).to.be.null;
    });
  });

  describe("add", function() {
    it("returns new point of two added together", function() {
      let a = {x: 0, y: 0};
      let b = {x: 3, y: 5};
      let c = point.add(a, b);
      equals(b, c);

      a = {x: -4,y:  -3};
      b = {x: 1, y: 1};
      c = point.add(a, b);
      equals(c, { x: -3, y: -2 });
    });
  });

  describe("angle", function() {
    it("finds angle of a point reletive to 0, 0", function() {
      expect(point.angle({x:0, y:1})).to.equal(Math.PI * 0.5);
      expect(point.angle({x:1, y:0})).to.equal(0);
      expect(point.angle({x:-1, y:0})).to.equal(Math.PI);
      expect(point.angle({x:0, y:-1})).to.equal(Math.PI * -0.5);
    });
  });

  describe("distance", function() {
    it("finds distance between 2 points", function() {
      const pointA = {
        x: math.random(-100, 100),
        y: math.random(-100, 100)
      };
      const dist = math.random(1, 10);
      const angle = math.random(Math.PI * 2);
      const pointB = {
        x: pointA.x + Math.cos(angle) * dist,
        y: pointA.y + Math.sin(angle) * dist
      };
      const precision = 10000;
      expect(math.round(point.distance(pointA, pointB), precision)).to.equal(
        math.round(dist, precision)
      );
    });
  });

  describe("interpolate", function() {
    it("finds interpolations between beginning and end points", function() {
      const p = point.interpolate({ x: 0, y: 0 }, { x: 0, y: 10 }, 0.25);
      equals(p, { x: 0, y: 2.5 });
    });
  });

  describe("intersection", function() {
    it("finds the point where two lines intersect", function() {
      const startA = {x:1,y:1};
      const endA = {x:3,y:3};
      const startB = {x:1,y:3};
      const endB = {x:3,y:1};
      const p = point.intersection(startA, endA, startB, endB);
      equals(p, { x: 2, y: 2 });
    });

    it("finds no intersection between two parallel lines", function() {
      const startA = {x:1,y:1};
      const endA = {x:1,y:-1};
      const startB = {x:-1,y:1};
      const endB = {x:-1,y:-1}
      expect(point.intersection(startA, endA, startB, endB)).to.equal(null);
    });
  });

  describe("length", function() {
    it("finds the point where two lines intersect", function() {
    });
  });

  describe("normalize", function() {
    it("scales length to equal a thickness", function() {
      let a = {x:0,y:2};
      let b = point.normalize(a, 3);
      equals(b, { x: 0, y: 3 });

      a = {x:0,y:-2};
      b = point.normalize(a, 4);
      equals(b, { x: 0, y: -4 });

      a = {x:-2,y:0};
      b = point.normalize(a, 5);
      equals(b, { x: -5, y: 0 });

      a = {x:2,y:0};
      b = point.normalize(a, 6);
      equals(b, { x: 6, y: 0 });
    });
  });

  describe("polar", function() {
    it("creates new angle from length and angle", function() {
      const length = 1;
      let angle = 0;
      roughlyEquals(point.polar(length, angle), { x: 1, y: 0 });

      angle = Math.PI * 0.5;
      roughlyEquals(point.polar(length, angle), { x: 0, y: 1 });

      angle = Math.PI;
      roughlyEquals(point.polar(length, angle), { x: -1, y: 0 });

      angle = Math.PI * 1.5;
      roughlyEquals(point.polar(length, angle), { x: 0, y: -1 });

      angle = Math.PI * 2;
      roughlyEquals(point.polar(length, angle), { x: 1, y: 0 });
    });
  });

  describe("randompointInCircle", function() {
    it("makes a random point inside circle", function() {
      const center = {x: math.random(-10, 10), y: math.random(-10, 10)};
      const radius = math.random(10);
      const random = point.randomPointInCircle(center, radius);
      expect(point.distance(center, random)).to.be.below(radius);
    });
  });

  describe("rotate", function() {
    it("rotates point around center", function() {
      const diff = math.random(5, 10);
      const origin = {
        x: math.random(-diff, diff, true),
        y: math.random(-diff, diff, true)
      };
      const a = {x: origin.x + diff, y: origin.y};

      let b = point.rotate(a, Math.PI * 0.5, origin);
      roughlyEquals(b, { x: origin.x, y: origin.y + diff });

      b = point.rotate(a, Math.PI * 1, origin);
      roughlyEquals(b, { x: origin.x - diff, y: origin.y });

      b = point.rotate(a, Math.PI * 1.5, origin);
      roughlyEquals(b, { x: origin.x, y: origin.y - diff });

      b = point.rotate(a, Math.PI * 2, origin);
      roughlyEquals(b, { x: origin.x + diff, y: origin.y });
    });

    it("returns a point rotated around an origin by default", function() {
      const diff = math.random(5, 10);
      const a = {x: diff, y: 0};

      let b = point.rotate(a, Math.PI * -0.5);
      roughlyEquals(b, { x: 0, y: -diff });

      b = point.rotate(a, Math.PI * -1);
      roughlyEquals(b, { x: -diff, y: 0 });

      b = point.rotate(a, Math.PI * -1.5);
      roughlyEquals(b, { x: 0, y: diff });

      b = point.rotate(a, Math.PI * -2);
      roughlyEquals(b, { x: diff, y: 0 });
    });
  });

  describe("round", function() {
    it("returns a new point with values rounded to nearest increment", function() {
      const b = point.round({x:2.000001, y:3.0000001}, TOLERANCE);
      equals(b, { x: 2, y: 3 });
    });

    it("returns a new point with values rounded to 1 by default", function() {
      const a = {x: math.random(-100, 100), y: math.random(-100, 100)};
      const b = point.round(a);
      equals(b, { x: Math.round(a.x), y: Math.round(a.y) });
    });
  });

  describe("toString", function() {
    it("converts point into readable string", function() {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const regex = new RegExp(`{\\s*x:\\s*${x}\\s*,\\s*y\\s*:\\s*${y}\\s*}`);
      expect(regex.test(point.toString({x,y}))).to.equal(true);
    });
  });
});
