export default class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {}

  depend() {
    if (window.target) this.addSub(window.target)
  }
  notify() {
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i ++) 
  }
}