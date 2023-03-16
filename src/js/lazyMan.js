/**
 * 实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。
 */
class LazyMan {
  constructor(name) {
    this.tasks = []
    const task = () => {
      console.log('Hi! This is ' + name)
      this.next()
    }
    this.tasks.push(task)
    setTimeout(()=> {
      this.next()
    }, 0)
  }
  next() {
    const task = this.tasks.shift()
    task && task()
  }
  eat(str) {
    const task = () => {
      console.log('Eat ' + str)
      this.next()
    }
    this.tasks.push(task)
  }
  sleep(time) {
    this.sleepWrap(time, false)
    return this
  }
  sleepFirst(time) {
    this.sleepWrap(time, true)
    return this
  }
  sleepWrap(time, isFirst) {
    const task = () => {
      setTimeout(() => {
        console.log('Wake up after ' + time)
        this.next()
      }, time * 1000)
    }
    if (isFirst) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }
}

function lazyMan(name) {
  return new LazyMan(name)
}

// lazyMan("Hank").sleep(1).eat("dinner")
// lazyMan("Hank").sleepFirst(5).eat("supper")

/**
 * (a == 1 && a == 2 && a == 3) 为true
 */
const a = (function(){
  let i = 1
  return {
    valueOf: () => {
      return i++
    }
  }
}())

console.log(a == 1 && a == 2 && a == 3)