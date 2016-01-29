import range from 'lodash.range';

export const [count, width, height] = [12, 70, 75];
// indexed by visual position
export const layout = range(count).map(n => {
  const row = Math.floor(n / 3);
  const col = n % 3;
  return [width * col, height * row];
});
