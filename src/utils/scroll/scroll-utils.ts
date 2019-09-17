export const math = {
  limitBetween: (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max),
  map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
  // linear interpolation
  lerp: (a, b, n) => (1 - n) * a + n * b,
  // Random float
  getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2),
}
