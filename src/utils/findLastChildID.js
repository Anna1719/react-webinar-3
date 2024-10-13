export function findLastChildID(arr, id) {
  const lastIndex = arr.findLastIndex(comment => comment?.parent?._id === id);
  var lastChildId = '';
  lastIndex === -1 ? lastChildId = id : lastChildId = findLastChildID(arr, arr[lastIndex]?._id);
  return lastChildId;
}
