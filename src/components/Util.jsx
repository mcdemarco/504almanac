export function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

export function getHashFromOrder(order) {
	return order.slice(0,3).map( a => (a < 9) ? a + 1 : "x" ).reduce( (prev,curr) => prev.toString() + curr.toString() );
}
