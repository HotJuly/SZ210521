import Vue from 'vue';
const state = {
	cartList: [
		{
			"count":9,
			"promId": 0,
			"showPoints": false,
			"itemTagList": [{
				"itemId": 1535004,
				"tagId": 128111157,
				"freshmanExclusive": false,
				"name": "暖冬特惠",
				"subType": 204,
				"forbidJump": false,
				"type": 2
			}],
			"rank": 1,
			"id": 1535004,
			"sellVolume": 4001,
			"primaryPicUrl": "https://yanxuan-item.nosdn.127.net/f79906f1b1fe86420ea40473de66ec0e.png",
			"soldOut": false,
			"sortFlag": 0,
			"commentCount": 0,
			"onSaleTime": 1538101761748,
			"picMode": 1,
			"commentWithPicCount": 0,
			"underShelf": false,
			"status": 2,
			"couponConflict": true,
			"forbiddenBuy": false,
			"promotionDesc": "暖冬特惠",
			"limitedFlag": 204,
			"pieceNum": 0,
			"itemSizeTableDetailFlag": false,
			"forbidExclusiveCal": false,
			"rewardShareFlag": false,
			"updateTime": 1575893634989,
			"showCommentEntrance": true,
			"pieceUnitDesc": "件",
			"specialPromTag": "",
			"counterPrice": 299,
			"categoryL2Id": 0,
			"retailPrice": 209,
			"primarySkuPreSellPrice": 0,
			"preLimitFlag": 0,
			"itemPromValid": true,
			"promTag": "暖冬特惠",
			"source": 0,
			"points": 0,
			"primarySkuPreSellStatus": 0,
			"extraServiceFlag": 0,
			"flashPageLink": "",
			"autoOnsaleTimeLeft": 0,
			"innerData": {},
			"saleCenterSkuId": 0,
			"pointsStatus": 0,
			"extraPrice": "",
			"colorNum": 0,
			"showTime": 0,
			"autoOnsaleTime": 0,
			"preemptionStatus": 1,
			"isPreemption": 0,
			"zcSearchFlag": false,
			"name": "男式色拉姆内衣套装2.0",
			"appExclusiveFlag": false,
			"itemType": 1,
			"listPicUrl": "https://yanxuan-item.nosdn.127.net/c2eeb1b872af1b8efc179a7515aacdaa.png",
			"pointsPrice": 0,
			"simpleDesc": "色拉姆发热面料，加厚升级",
			"seoTitle": "",
			"newItemFlag": false,
			"buttonType": 0,
			"primarySkuId": 1636062,
			"displaySkuId": 1636056,
			"productPlace": "",
			"itemSizeTableFlag": false
		},
		{
			"count":3,
			"promId": 0,
			"showPoints": false,
			"itemTagList": [{
				"itemId": 1536001,
				"tagId": 128111157,
				"freshmanExclusive": false,
				"name": "暖冬特惠",
				"subType": 204,
				"forbidJump": false,
				"type": 2
			}],
			"rank": 1,
			"id": 1536001,
			"sellVolume": 3634,
			"primaryPicUrl": "https://yanxuan-item.nosdn.127.net/32b8b2d07b1c4327593a4a70993eeac2.png",
			"soldOut": false,
			"sortFlag": 0,
			"commentCount": 0,
			"onSaleTime": 1538101896296,
			"picMode": 1,
			"commentWithPicCount": 0,
			"underShelf": false,
			"status": 2,
			"couponConflict": true,
			"forbiddenBuy": false,
			"promotionDesc": "暖冬特惠",
			"limitedFlag": 204,
			"pieceNum": 0,
			"itemSizeTableDetailFlag": false,
			"forbidExclusiveCal": false,
			"rewardShareFlag": false,
			"updateTime": 1575894115275,
			"showCommentEntrance": true,
			"pieceUnitDesc": "件",
			"specialPromTag": "",
			"counterPrice": 299,
			"categoryL2Id": 0,
			"retailPrice": 209,
			"primarySkuPreSellPrice": 0,
			"preLimitFlag": 0,
			"itemPromValid": true,
			"promTag": "暖冬特惠",
			"source": 0,
			"points": 0,
			"primarySkuPreSellStatus": 0,
			"extraServiceFlag": 0,
			"flashPageLink": "",
			"autoOnsaleTimeLeft": 0,
			"innerData": {},
			"saleCenterSkuId": 0,
			"pointsStatus": 0,
			"extraPrice": "",
			"colorNum": 0,
			"showTime": 0,
			"autoOnsaleTime": 0,
			"preemptionStatus": 1,
			"isPreemption": 0,
			"zcSearchFlag": false,
			"name": "女式色拉姆内衣套装2.0",
			"appExclusiveFlag": false,
			"itemType": 1,
			"listPicUrl": "https://yanxuan-item.nosdn.127.net/02b61fb5700aed6761b7524d98ed0837.png",
			"pointsPrice": 0,
			"simpleDesc": "色拉姆发热面料，加厚升级",
			"seoTitle": "",
			"newItemFlag": false,
			"buttonType": 0,
			"primarySkuId": 1634105,
			"displaySkuId": 1634104,
			"productPlace": "",
			"itemSizeTableFlag": false
		}
	]
}

const mutations = {
	ADDSHOPITEMMUTATION(state,good){
		/*
			需求:当用户点击详情页面的加入购物车功能时,需要想购物车中实现对应效果
				如果该商品在购物车数组中已经存在,该商品数量+1
				如果该商品在购物车数组中不存在,需要将该商品推入数组中,数量为1
		*/
	   const shopItem = state.cartList.find((shopItem)=>{
		   return shopItem.id===good.id
	   })
	   
	   if(shopItem){
		   shopItem.count+=1
			console.log('+1',shopItem)
	   }else{
		   state.cartList.push(good);
		   // good.count=1;
		   Vue.set(good,'count',1)
			console.log('=1',good)
	   }
	}
}

const actions = {}

const getters = {

}

export default {
	state,
	mutations,
	actions,
	getters
}
