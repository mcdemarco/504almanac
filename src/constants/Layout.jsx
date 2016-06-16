import range from 'lodash.range';

export const [count, width, height] = [12, 70, 75];
// indexed by visual position
export const layout = range(count).map(n => {
  const row = Math.floor(n / 3);
  const col = n % 3;
  return [width * col, height * row];
});
export const buttons = [
	{name: "bestOf", title: "Highly-rated worlds", icon: "fa fa-star"},
	{name: "worstOf", title: "Poorly-rated worlds", icon: "fa fa-star-o"},
	{name: "random", title: "Random worlds", icon: "fa fa-random"},
	{name: "tagged", title: "Tagged worlds", icon: "fa fa-tag"},
  {name: "unexplored", title: "Unexplored worlds", icon: "fa fa-safari"}
];
