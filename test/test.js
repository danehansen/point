import { expect } from 'chai'
import * as math from '@danehansen/math'
import Point from '../src/Point'

function equals(p1, p2) {
  expect(p1.x).to.equal(p2.x)
  expect(p1.y).to.equal(p2.y)
}

const TOLERANCE = 0.001
function roughlyEquals(p1, p2) {
  equals(Point.round(p1, TOLERANCE), Point.round(p2, TOLERANCE))
}

describe('constructor', function() {
  it('initiates x and y as 0 with no arguments', function() {
    const p = new Point()
    equals(p, {x: 0, y: 0})
  })

  it('initiates x and y as arguments', function() {
    equals(new Point(3, 5), { x: 3, y: 5 })
  })
})

describe('add', function() {
  it('adds another point onto self', function() {
    let a = new Point()
    let b = new Point(3, 5)
    a.add(b)
    equals(a, b)

    a = new Point(-4, -3)
    b = new Point(1, 1)
    a.add(b)
    equals(a, {x: -3, y: -2})
  })
})

describe('angle', function() {
  it('finds angle of a point reletive to 0, 0', function() {
    expect(new Point(0, 1).angle()).to.equal(Math.PI * 0.5)
    expect(new Point(1, 0).angle()).to.equal(0)
    expect(new Point(-1, 0).angle()).to.equal(Math.PI)
    expect(new Point(0, -1).angle()).to.equal(Math.PI * -0.5)
  })
})

describe('clone', function() {
  it('makes copy of self', function() {
    const a = new Point(Math.random(), Math.random())
    equals(a.clone(), a)
    expect(a.clone()).to.not.equal(a)
  })
})

describe('copyFrom', function() {
  it('sets x and y to another points values', function() {
    const a = new Point(Math.random(), Math.random())
    const b = new Point(Math.random(), Math.random())
    a.copyFrom(b)
    equals(a, b)
    expect(a).to.not.equal(b)
  })
})

describe('equals', function() {
  it('finds when x and y are equal to another point', function() {
    const a = new Point(Math.random(), Math.random())
    const b = a.clone()
    equals(a, b)
    expect(a).to.not.equal(b)
    expect(a.equals(b)).to.equal(true)
  })

  it('finds when x and y are not equal to another point', function() {
    const a = new Point(Math.random(), Math.random())
    const b = new Point(Math.random(), Math.random())
    expect(a).to.not.deep.equal(b)
    expect(a).to.not.equal(b)
    expect(a.equals(b)).to.equal(false)
  })
})

describe('length', function() {
  it('finds distance to 0, 0', function() {
    expect(new Point(0, 5).length).to.equal(5)
    expect(new Point(0, -5).length).to.equal(5)
    expect(new Point(5, 0).length).to.equal(5)
    expect(new Point(-5, 0).length).to.equal(5)
  })
})

describe('normalize', function() {
  it('scales length to equal a thickness', function() {
    let a = new Point(0, 2)
    a.normalize(3)
    equals(a, {x: 0, y: 3})
    expect(a.x).to.equal(0)
    expect(a.y).to.equal(3)

    a = new Point(0, -2)
    a.normalize(4)
    expect(a.x).to.equal(0)
    expect(a.y).to.equal(-4)

    a = new Point(-2, 0)
    a.normalize(5)
    expect(a.x).to.equal(-5)
    expect(a.y).to.equal(0)

    a = new Point(2, 0)
    a.normalize(6)
    expect(a.x).to.equal(6)
    expect(a.y).to.equal(0)
  })
})

describe('offset', function() {
  it('adds values onto self', function() {
    let a = new Point()
    a.offset(3, 5)
    expect(a.x).to.equal(3)
    expect(a.y).to.equal(5)

    a = new Point(-4, -3)
    a.offset(1, 1)
    expect(a.x).to.equal(-3)
    expect(a.y).to.equal(-2)
  })
})

describe('rotate', function() {
  it('rotates point around center', function() {
    const diff = math.random(5, 10)
    const origin = new Point(math.random(-diff, diff, true), math.random(-diff, diff, true))
    const point = new Point(origin.x + diff, origin.y)

    point.rotate(Math.PI * 0.5, origin)
    roughlyEquals(point, { x: origin.x, y: origin.y + diff })

    point.rotate(Math.PI * 0.5, origin)
    roughlyEquals(point, { x: origin.x - diff, y: origin.y })

    point.rotate(Math.PI * 0.5, origin)
    roughlyEquals(point, { x: origin.x, y: origin.y - diff })

    point.rotate(Math.PI * 0.5, origin)
    roughlyEquals(point, { x: origin.x + diff, y: origin.y })
  })

  it('rotates point around origin by default', function() {
    const diff = math.random(5, 10)
    const point = new Point(diff, 0)

    point.rotate(Math.PI * -0.5)
    roughlyEquals(point, { x: 0, y: -diff })

    point.rotate(Math.PI * -0.5)
    roughlyEquals(point, { x: -diff, y: 0 })

    point.rotate(Math.PI * -0.5)
    roughlyEquals(point, { x: 0, y: diff })

    point.rotate(Math.PI * -0.5)
    roughlyEquals(point, { x: diff, y: 0 })
  })
})

describe('setTo', function() {
  it('sets x and y to values', function() {
    const a = new Point(Math.random(), Math.random())
    const x = Math.random()
    const y = Math.random()
    a.setTo(x, y)

    expect(a.x).to.equal(x)
    expect(a.y).to.equal(y)
  })
})

describe('subtract', function() {
  it('subtracts another point from self', function() {
    let a = new Point()
    let b = new Point(3, 5)
    a.subtract(b)
    equals(a, {x: -3, y: -5})

    a = new Point(-4, -3)
    b = new Point(1, 1)
    a.subtract(b)
    equals(a, {x: -5, y: -4})
  })
})

describe('toString', function() {
  it('converts point into readable string', function() {
    const x = Math.random() * 2 - 1
    const y = Math.random() * 2 - 1
    const regex = new RegExp(`{\\s*x:\\s*${x}\\s*,\\s*y\\s*:\\s*${y}\\s*}`)
    expect(regex.test(new Point(x, y).toString())).to.equal(true)
  })
})

describe('static distance', function() {
  it('finds distance between 2 points', function() {
    expect(Point.distance({x: 0, y: 0}, {x: 0, y: 2})).to.equal(2)
    expect(Point.distance({x: 2, y: 0}, {x: 0, y: 0})).to.equal(2)
  })
})

describe('static interpolate', function() {
  it('finds interpolations between beginning and end points', function() {
    const p = Point.interpolate({x: 0, y: 0}, {x: 0, y: 10}, 0.25)
    equals(p, {x: 0, y: 2.5})
  })
})

describe('static intersection', function() {
  it('finds the point where two lines intersect', function() {
    const startA = new Point(1, 1)
    const endA = new Point(3, 3)
    const startB = new Point(1, 3)
    const endB = new Point(3, 1)
    const p = Point.intersection(startA, endA, startB, endB)
    equals(p, {x: 2, y: 2})
  })

  it('finds no intersection between two parallel lines', function() {
    const startA = new Point(1, 1)
    const endA = new Point(1, -1)
    const startB = new Point(-1, 1)
    const endB = new Point(-1, -1)
    expect(Point.intersection(startA, endA, startB, endB)).to.equal(null)
  })
})

describe('static polar', function() {
  it('creates new angle from length and angle', function() {
    const length = 1
    let angle = 0
    roughlyEquals(Point.polar(length, angle), { x: 1, y: 0 })

    angle = Math.PI * 0.5
    roughlyEquals(Point.polar(length, angle), { x: 0, y: 1 })

    angle = Math.PI
    roughlyEquals(Point.polar(length, angle), { x: -1, y: 0 })

    angle = Math.PI * 1.5
    roughlyEquals(Point.polar(length, angle), { x: 0, y: -1 })

    angle = Math.PI * 2
    roughlyEquals(Point.polar(length, angle), { x: 1, y: 0 })
  })
})

describe('static round', function() {
  it('makes a new point with values rounded to nearest increment', function() {
    const a = new Point(2.000001, 3.0000001)
    const b = Point.round(a, TOLERANCE)
    equals(b, {x: 2, y: 3})
  })

  it('makes a new point with values rounded to 1 by default', function() {
    const a = new Point(math.random(-100, 100), math.random(-100, 100))
    const b = Point.round(a)
    equals(b, {x: Math.round(a.x), y: Math.round(a.y)})
  })
})

describe('static randomPointInCircle', function() {
  it('makes a random point inside circle', function() {
    const center = new Point(math.random(-10, 10), math.random(-10, 10))
    const radius = math.random(10)
    const random = Point.randomPointInCircle(center, radius)
    expect(Point.distance(center, random)).to.be.below(radius)
  })
})
