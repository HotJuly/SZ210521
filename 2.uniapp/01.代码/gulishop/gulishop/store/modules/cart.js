import Vue from 'vue';
const state = {
	cartList: [
		{
			"selected":false,
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
			"selected":true,
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
			// console.log('+1',shopItem)
	   }else{
		   state.cartList.push(good);
		   // good.count=1;
		   Vue.set(good,'count',1);
		   Vue.set(good,'selected',true);
			// console.log('=1',good)
	   }
	},
	CHANGECOUNTMUTATION(state,{type,index}){
		/*
			需求:当用户点击+/-号时,修改对应商品的数量
				如果用户点击-号,如果该商品数量为1,那么直接删除该商品
		*/
		// console.log('CHANGECOUNTMUTATION',type,index)
		const cartList = state.cartList;
		if(type){
			cartList[index].count+=1;
		}else{
			if(cartList[index].count<=1){
				cartList.splice(index,1);
			}else{
				cartList[index].count-=1;
			}
		}
	},
	CHANGESELECTEDMUTATION(state,{selected,index}){
		// console.log('CHANGESELECTEDMUTATION',selected,index)
		state.cartList[index].selected=selected;
	},
	CHANGEALLSELECTEDMUTATION(state,selected){
		// console.log('CHANGEALLSELECTEDMUTATION')
		/*
			将购物车中所有的商品选中状态都更新为与全选按钮相同
		*/
	   const result = state.cartList.forEach((shopItem)=>{
		   shopItem.selected = selected;
		   // return 123;
	   })
	   // console.log('result',result)
	}
}

const actions = {}

const getters = {
	isSelectedAll(state){
		/*
			如果购物车中所有的商品都是选中状态,那么全选按钮也为选中状态
			如果购物车中有一个以上的商品是未选中状态,那么全选按钮也为未选中状态
			
			如果购物车中没有商品,那么全选按钮就为未选中状态
			返回值:布尔值
		*/
	   return state.cartList.length&&state.cartList.every((shopItem)=>{
		return shopItem.selected
	   })
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
