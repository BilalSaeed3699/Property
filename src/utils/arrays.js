function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

const customSortFunction = (arr2) => {
  let arr = array_move(arr2, arr2.indexOf("Construction Cost Breakdown"), 0);

  arr = array_move(arr, arr.indexOf("Site Potential"), 0);

  arr = array_move(arr, arr.indexOf("Sales Cost Breakdown"), 2);

  arr = array_move(arr, arr.indexOf("Land Analysis"), 3);

  arr = array_move(arr, arr.indexOf("Financing"), 4);

  arr = array_move(arr, arr.indexOf("Proforma Breakdown"), 5);
  return arr;
};

export default customSortFunction;
