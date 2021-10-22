// 该文件需要向外暴露一个函数,该函数可以发送请求

/*
  封装代码的核心思想
    保留重复出现的部分,提取每次不同的内容

    封装函数
      1.保留重复出现的代码
      2.将每次不同的内容,提取成形参
      3.谁调用谁传入

    封装组件
      1.保留重复出现的内容
      2.将每次不同的内容,提取成prop数据
      3.谁使用谁传入
 */

import config from './config.js';

export default function (url, data={}, method="GET") {
  // let result;
  return new Promise((resolve,reject) => {
    // 发送请求,是同步发送,异步接收
    wx.request({
      url: config.mpHost + url,
      data,
      method,
      success: (res) => {
        // console.log(res)
        // result = res;
        resolve(res.data)
      }
    })
  })
  // return result;
}