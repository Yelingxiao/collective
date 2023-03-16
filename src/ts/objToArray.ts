/**
 * @file objToArray
 *
 * 将对象按照要求转为数组
 * 注意console示例运行结果
 */
 type Obj = Record<string, string>;
 interface FormatItem {
   key: string;
   op: string;
   value: string;
 }
 
 function objToArray(object: Record<string, Obj>): FormatItem[] {
  const arr: FormatItem[] = []
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];
      const op: string = Object.keys(object[key])[0]
      arr.push({
        key,
        op,
        value: element[op]
      })
    }
  }
  return arr
}

console.log(
  objToArray({
    key1: {
      op1: "value1",
    },
    key2: {
      op2: "value2",
    },
  })
);
// result示例
// [
//     {key: 'key1', op: 'op1', value: 'value1'},
//     {key: 'key2', op: 'op2', value: 'value2'}
// ]

export default {};