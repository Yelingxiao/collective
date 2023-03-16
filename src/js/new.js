function myNew(Cons, ...arg) {
  const obj = new Object()
  obj.__proto__ = Cons.prototype
  let res = Cons.call(this, arg)
  return typeof res === 'object' ? res : obj
}
