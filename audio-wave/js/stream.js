/**
 * 1.模拟ChatGPT 获取流式的数据，逐渐读取，直到响应体结束
 */

async function getResponse(url) {
  // 这个网络请求，当响应头到达浏览器客户端开始, 慢慢一点点收到
  // 响应体
  const resp = await fetch(url, {
    method:"POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      content : "扮演一个说书人，讲个鬼故事吧!!", 
    }),
  });

  const reader = resp.body.getReader();
  const textDecoder = new TextDecoder();
  while (true)  {
    // 得到的是一个类型化数组(数据的文本编码)
    const { done, value } = await reader.read()
    if (done) {
      break
    }
    const str = textDecoder.decode(value)
    console.log(String.fromCharCode(str))
  }
}
