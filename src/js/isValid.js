/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (s % 2) return false
  const tasks = []
  const map = {
    "(": ")",
    "[": "]",
    "{": "}"
  }
  for (const x of s) {
    if (x in map) {
      tasks.push(x)
      continue
    }
    if (x !== map[tasks.pop()]) return false
  }
  console.log('', !tasks.length)
  return !tasks.length
};

isValid('}{')
isValid('([{}])')