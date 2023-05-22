// 设计一个函数，可以限制请求的并发，同时请求结束之后，调用callback函数
// sendRequest(requestList:,limits,callback):void
function sendRequest(requestList, limits, callback) {
  // 浅拷贝一份数据
  const promises = requestList.slice()
  // 最小并发数
  const currentNum = Math.min(limits, requestList.length)
  // 当前并发数
  let currentCount = 0
  // 初始执行任务
  const runTaskInit = () => {
    while(currentCount < currentNum) {
      runTask()
    }
  }
  // 取出任务并且执行任务
  const runTask = () => {
    currentCount++
    const task = promises.shift()
    task && running(task)
  }
  // 任务执行ing
  const running = async(task) => {
    try {
      const res = await task()
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      currentCount--
      picker()
    }

  }
  // 捞起下一个任务
  const picker = () => {
    if (currentCount < currentNum && promises.length > 0) {
      runTask()
    } else if (!currentCount) {
      callback && callback('end')
    }
  }
  // 入口执行
  runTaskInit()
}

sendRequest(
  [
    () => request('1', 4),

    () => request('2', 2),

    () => request('3', 1),

    () => request('4', 3)
  ],
  3, //并发数
  res => {
    console.log(res)
  }
)

// 其中request 可以是：
function request(url, time = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('请求结束：' + url)

      if (Math.random() > 0.5) {
        resolve('成功：' + url)
      } else {
        reject('错误：'+ url)
      }
    }, time * 1e3)
  })
}
