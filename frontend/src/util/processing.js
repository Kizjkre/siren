import * as d3 from 'd3';

// REF: https://stackoverflow.com/a/27865285
const decimals = a => {
  let e = 1, p = 0;
  while (Math.round(a * e) / e !== a) { e *= 10; p++; }
  return p;
};

const _add = (a, b) => {
  const d = Math.max(decimals(a), decimals(b));
  return (a * 10 ** d + b * 10 ** d) / (10 ** d);
};

export const add = (...nums) => nums.reduce((acc, v) => _add(acc, v));

// REF: https://stackoverflow.com/a/41888395
// REF: https://sites.math.rutgers.edu/~greenfie/gs2004/euclid.html
const gcd = (a, b) => {
  if (a < b) {
    a = a ^ b;
    b = b ^ a;
    a = a ^ b;
  }
  const r = a % b;
  return r ? gcd(b, r) : b;
};

const lcm2 = (a, b) => a * b / gcd(a, b);

export const lcm = arr => arr.reduce(lcm2);

// ****************************************************************************************************************** //

export const chunkify = (data, size) => {
  if (size < 1) {
    return data;
  }

  const temp = [];
  data.forEach(d => {
    for (let i = 0; i < d.length - size; i += size) {
      temp.push(d.substr(i, size));
    }
  });
  return temp;
};

export const isNumerical = data => data.every(d => typeof d === 'number' || d === null);

export const removeOutliers = data => {
  const first = d3.quantile(data, 0.25);
  const third = d3.quantile(data, 0.75);
  return data.filter(d => !(d < first -  1.5 * (third - first) || d > third + 1.5 * (third - first)));
};

export const isOutlier = (datum, q1, q3) => !(datum < q1 -  1.5 * (q3 - q1) || datum > q3 + 1.5 * (q3 - q1));

export const numerizeToNumber = data => data.map(d => {
  let sum = 0;
  for (let i = 0; i < d.length; i++) {
    sum += d.charCodeAt(i);
  }
  return sum / d.length;
});

export const numerizeToArray = data => data.map(d => {
  const values = [];
  for (let i = 0; i < d.length; i++) {
    values.push(d.charCodeAt(i));
  }
  return values;
});
