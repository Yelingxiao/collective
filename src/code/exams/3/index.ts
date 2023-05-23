import { isEqual } from "lodash-es";

// 核心用户请求
let _requestTime = 0;
const requestProfile = (uid: string) => {
  // 这个方法的实现不能修改
  return Promise.resolve().then(() => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // 模拟 ajax 异步，1s 返回
        resolve();
      }, 1000);
    }).then(() => {
      _requestTime++;
      return {
        uid,
        nick: `nick-${uid}`,
        age: "18",
      };
    });
  });
};

let count = 0 // 当前执行任务数
const memo = new Map() // 缓存用户数据

/**
 * @param uid uid
 * @param max 最多并发请求数量
 */
const requestUserProfile = async (uid = "1", max = 2) => {
  let timer: any = null
  const loopRequestProfile = (resolve: any) => {
    timer && cancelAnimationFrame(timer)
    if (memo.has(uid)) {
      return resolve(memo.get(uid))
    }
    if (count < max) {
      count++
      requestProfile(uid).then((res) => {
        count--
        memo.set(uid, res)
        return resolve(res)
      })
    } else {
      timer = requestAnimationFrame(() => {
        loopRequestProfile(resolve)
      })
    }
  }
  return new Promise(loopRequestProfile)
};

/**
 * 以下为测试用例，无需修改
 */
export default async () => {
  try {
    const star = Date.now();
    await Promise.all([
      requestUserProfile("1"),
      requestUserProfile("2"),
      requestUserProfile("3"),
      requestUserProfile("1"),
    ]).then((result) => {
      if (Date.now() - star < 2000 || Date.now() - star >= 3000) {
        throw new Error("Wrong answer");
      }
      if (
        !isEqual(result, [
          {
            uid: "1",
            nick: "nick-1",
            age: "18",
          },
          {
            uid: "2",
            nick: "nick-2",
            age: "18",
          },
          {
            uid: "3",
            nick: "nick-3",
            age: "18",
          },
          {
            uid: "1",
            nick: "nick-1",
            age: "18",
          },
        ])
      ) {
        throw new Error("Wrong answer");
      }
    });

    return _requestTime === 3;
  } catch (err) {
    console.warn("测试运行失败");
    console.error(err);
    return false;
  }
};
