let arr = [1,2,[3,4,[5,6],7],8]
// 数组扁平化
function flatten(arr) {
  const flattenArr = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      flattenArr.push(...flatten(item))
    } else {
      flattenArr.push(item)
    }
  }
  return flattenArr
}

console.log(flatten(arr))