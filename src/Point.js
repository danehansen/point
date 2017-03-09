const { round } = typeof __BROWSER__ === 'undefined' ? require('@danehansen/math') : (((window || {}).danehansen || {}).math || {})

export default class Point {
  static distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
  }

  static interpolate(start, end, amount) {
    return new Point(start.x + (end.x - start.x) * amount, start.y + (end.y - start.y) * amount)
  }

  static intersection(startA, endA, startB, endB) {
    const x1 = startA.x
    const y1 = startA.y
    const x2 = endA.x
    const y2 = endA.y
    const x3 = startB.x
    const y3 = startB.y
    const x4 = endB.x
    const y4 = endB.y
    const a = x1 - x2
    const b = y3 - y4
    const c = y1 - y2
    const d = x3 - x4
    const e = a * b - c * d
    if (e === 0) {
      return null
    }
    const f = x1 * y2 - y1 * x2
    const g = x3 * y4 - y3 * x4
    return new Point((f * d - a * g) / e, (f * b - c * g) / e)
  }

  static polar(len, angle) {
    return new Point(Math.cos(angle) * len, Math.sin(angle) * len)
  }

  static randomPointInCircle(center, radius) {
    const random = {}
    do {
      random.x = Math.random() * radius * 2 + center.x - radius
      random.y = Math.random() * radius * 2 + center.y - radius
    }
    while(Point.distance(random, center) > radius)
    return random
  }

  static round(point, increment) {
    return {
      x: round(point.x, increment),
      y: round(point.y, increment),
    }
  }

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  add = (point) => {
    this.offset(point.x, point.y)
  }

  angle = () => {
    return Math.atan2(this.y, this.x)
  }

  clone = () => {
    return new Point(this.x, this.y)
  }

  copyFrom = (point) => {
    this.setTo(point.x, point.y)
  }

  equals = (point) => {
    return this.x === point.x && this.y === point.y
  }

  get length() {
    return Point.distance(this, { x: 0, y: 0 })
  }

  normalize = (thickness) => {
    const ratio = thickness / this.length
    this.x *= ratio
    this.y *= ratio
  }

  offset = (x, y) => {
    this.x += x
    this.y += y
  }

  setTo = (x, y) => {
    this.x = x
    this.y = y
  }

  subtract = (point) => {
    this.x -= point.x
    this.y -= point.y
  }

  toString = () => {
    return `{x: ${this.x}, y: ${this.y}}`
  }
}
