const Koa = require('koa');
const KoaRouter = require('koa-router');

const Fly=require("flyio/src/node");
const fly=new Fly;

// 1.创建服务器应用实例对象
// const app = express()
const app = new Koa();

// 3.创建路由
// 3.1创建路由器实例对象
const router = new KoaRouter();

// 3.2声明使用中间件,告知koa注册所有的路由
/*
	中间件本质是一个函数
		该函数具有next方法,可以执行下一个中间件函数

*/
app.use(router.routes());

//3.3注册路由
/*
	express中路由回调函数接收参数:
		1.request->请求报文对象
		2.response->响应报文对象
		3.next->执行下一个中间件
		
	koa中路由回调函数接收参数:
		1.ctx->request+response->请求报文对象+响应报文对象
			返回数据的方法:ctx.body=需要返回的数据
		2.next->执行下一个中间件

*/
router.get('/test',function(ctx,next){
	console.log('/test success')
	ctx.body="/test success1"
})

// 用于返回首页推荐页面所需数据
const indexData = require('./datas/index.json');
router.get('/getIndexData',function(ctx,next){
	console.log('/getIndexData success')
	ctx.body=indexData
})

// 用于放回分类页面所需数据
const categoryDatas = require('./datas/categoryDatas.json');
router.get('/getCategoryDatas',function(ctx,next){
	// console.log('/getIndexData success')
	ctx.body=categoryDatas
})

// 用于返回首页分类页面所需数据
const indexCateList = require('./datas/indexCateList.json');
router.get('/getIndexCateList',async function(ctx,next){
	// console.log('/getIndexData success')
	// koa服务器不能使用定时器拖延返回的数据
	// koa服务器如果想要延迟数据返回,那么路由回到函数必须返回一个promise对象
	// setTimeout(()=>{
	// 	ctx.body=indexCateList
	// },2000)
	await new Promise((resolve)=>{
		setTimeout(resolve,2000)
	})
	ctx.body=indexCateList
})


// 用于放回分类页面所需数据
router.get('/getOpenId',async function(ctx,next){
	// console.log('/getOpenId success',ctx.query)
	const code = ctx.query.code;
	const appId = 'wxe5931a68ea66cece';
	const appSecret='15bd901dc19933bd216dfc4eeb123579';
	
	const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
	
	const {data} = await fly.get(url);
	// console.log('result',result)
	const openId = JSON.parse(data).openid;
	// console.log('openId',openId)
	ctx.body=openId
})



// 用于返回商品详细数据
const goods = require('./datas/goods.json');
router.get('/getGoodDetail',function(ctx,next){
	// console.log('/getGoodDetail success',ctx.query)
	// 1.获取到商品id
	const {goodId} = ctx.query;
	
	//2.通过商品Id从商品数组中找到对应商品信息
	const good = goods.find((good)=>{
		return good.id === goodId >>> 0
	})
	
	// 3.返回找到的商品
	ctx.body=good
})


//2.将服务器应用实例运行到指定端口,并进行监视
app.listen(3000,function(error){
	if(error){
		console.log('服务器运行失败:',error)
	}else{
		console.log('服务器运行成功,地址为:http://localhost:3000')
	}
})