/*
问题:虽然当前的请求路径相同,但是不同的运行环境下,基础路径不相同
	如果当前运行环境是小程序,那么基础路径就应该是服务器的地址
	如果当前运行环境是h5,那么基础路径就应该是代理的标识字符串
	
需求:根据不同的运行环境,实现对基础路径的不同赋值
拆解:
	1.如何知道当前的运行环境?
		根据API:uni.getSystemInfoSync()返回的对象中的platform属性,可以区分当前的运行环境
			devtools->代表当前处于小程序运行环境
			ios->代表当前处于苹果浏览器
*/
// console.log('info',uni.getSystemInfoSync())

let baseUrl;
// const {platform} = uni.getSystemInfoSync();

// if(platform==="devtools"){
// 	// 能进入当前判断,说明当前运行环境为小程序
// 	baseUrl="http://localhost:3000"
// }else if(platform==="ios"){
// 	// 能进入当前判断,说明当前运行环境为ios浏览器
// 	baseUrl="/api"
// }

// #ifdef H5
	baseUrl="/api"
// #endif

// #ifdef MP-WEIXIN
	baseUrl="http://localhost:3000"
// #endif
export default function(url,data={},method="GET"){
	return new Promise((resolve,reject)=>{
		uni.request({
			// url:"http://localhost:3000/getIndexData",
			// url:"/api/getIndexData",
			url:baseUrl + url,
			data,
			method,
			header:{
				token:uni.getStorageSync('token')
			},
			success:(res)=>{
				resolve(res.data)
			}
		})
	})
}