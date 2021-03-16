import { round as mathRound } from '@danehansen/math'

export function add(a, b) {
  return {x: a.x + b.x, y: a.y + b.y};
}

export function angle(point) {
  return Math.atan2(point.y, point.x);
}

export function distance(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function interpolate(start, end, amount) {
  return {x: start.x + (end.x - start.x) * amount, y: start.y + (end.y - start.y) * amount};
}

export function intersection(startA, endA, startB, endB) {
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
  return {x: (f * d - a * g) / e, y:(f * b - c * g) / e};
}

export function length(point) {
  return distance(point, { x: 0, y: 0 });
}

export function normalize(point, thickness) {
  const l = length(point);
  const ratio = thickness / l;
  return {x: point.x * ratio, y: point.y * ratio};
}

export function polar(len, angle) {
  return {x: Math.cos(angle) * len, y: Math.sin(angle) * len};
}

export function randomPointInCircle(center, radius) {
  const random = {}
  do {
    random.x = Math.random() * radius * 2 + center.x - radius;
    random.y = Math.random() * radius * 2 + center.y - radius;
  }
  while(distance(random, center) > radius)
  return random;
}

export function rotate(point, angle, center = {x: 0, y: 0}) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  let { x, y } = point;
  const centerX = center.x;
  const centerY = center.y;
  x -= centerX;
  y -= centerY;
  return {x: x * cos - y * sin + centerX, y: x * sin + y * cos + centerY};
}

export function round(point, increment = 1) {
  return {x: mathRound(point.x, increment), y: mathRound(point.y, increment)};
}

export function toString(point) {
  return `{x: ${point.x}, y: ${point.y}}`
}
