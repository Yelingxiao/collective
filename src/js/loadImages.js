// 现有6个url，已经存储在数组urls中，实现一个加载函数 loadImages(urls)。
// 要求：
// 并发请求所有url，尽可能快地完成所有请求。
// 按照请求顺序打印已加载的图片。
// 如果前面的图片未加载，则等待前面的所有图片都加载完成后再一起打印。
// 打印时，如果还有在等待的图片，则一起打印。
// 举个例子： 假设同时请求 1、2、3、4、5、6 共计6个url。
// 第1个url请求返回，打印 1；
// 第2个url请求返回，打印 2；
// 第5个url请求返回，不打印，因为3和4没有返回；
// 第3个url请求返回，打印 3；
// 第4个url请求返回，打印 4，继续打印 5；
// 第6个url请求返回，打印 6；
const urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg', 
  'https://www.kkkk1000.com/images/getImgData/gray.gif', 
  'https://www.kkkk1000.com/images/getImgData/Particle.gif', 
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png', 
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg'
];
function loadImages(urls = []){
  const images = []
  const current = 0
  const cacheNum = []
  for (let i = 0; i < urls.length; i++) {  
    images[i] = new Image()  
    images[i].onload = function() {
      if (current === i) {
        console.log('i', i + 1)
        current++
        for (let num of cacheNum) {
          if (current === num) {
            console.log('num', num + 1)
            current++
          }
        }
      } else {
        cacheNum.push(i)
      }
    }
    images[i].src = urls[i]
  }
}

loadImages(urls)