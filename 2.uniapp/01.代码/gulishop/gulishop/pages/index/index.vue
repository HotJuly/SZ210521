<template>
	<view class="indexContainer">
		<!-- 
			uniapp中,同时兼容小程序和html的标签,并且可以实现互相转换
			uniapp编译成小程序的时候,如果遇到小程序没有的标签,会自动转为view标签
					编译成h5页面的时候,如果遇到浏览器不认识的标签,uniapp有做好兼容处理
			推荐使用小程序的标签
		 -->
		<view class="header">
			<image class="logo" src="../../static/images/logo.png" mode=""></image>
			<view class="searchContainer">
				<view class="iconfont icon-sousuo"></view>
				<input class="searchInput" type="text" value="" placeholder-class="placeholder" placeholder="搜索商品"/>
			</view>
			<button class="username">七月</button>
		</view>
	<!--	<div>123456
			<i>123</i>
		</div> -->
		
		<scroll-view 
		scroll-x="true" 
		enable-flex="true" 
		class="navScroll" 
		v-if="indexData.kingKongModule">
			<view 
			class="navItem"
			:class="navIndex===-1?'active':''"
			@click="changeNavIndex(-1)"
			>
				推荐
			</view>
			<view 
			class="navItem"
			:class="navIndex===index?'active':''"
			v-for="(item,index) in indexData.kingKongModule.kingKongList"
			:key="item.L1Id"
			@click="changeNavIndex(index)"
			>
				{{item.text}}
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="contentScroll">
			<Recommend v-if="navIndex===-1"></Recommend>
			<CateList :navIndex="navIndex" v-else></CateList>
		</scroll-view>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import req from '../../utils/req.js';
	import Recommend from '../../components/Recommend/Recommend.vue';
	import CateList from '../../components/CateList/CateList.vue';
	export default {
		data() {
			return {
				// indexData:{}
				navIndex:-1
			}
		},
		// uniapp兼容小程序的生命周期和Vue的生命周期
		// onLoad() {
		// 	console.log('onLoad')
		// },
		// mounted(){
		// 	console.log('mounted')
		// },
		async created(){
			// uni.request({
			// 	// url:"http://localhost:3000/getIndexData",
			// 	url:"/api/getIndexData",
			// 	success:(res)=>{
			// 		// console.log('success',res.data)
			// 		// this.setData({
						
			// 		// })
			// 		this.indexData=res.data
			// 	}
			// })
			// let result = await req("/getIndexData");
			// this.indexData=result;
			this.$store.dispatch('getIndexData');
		},
		methods:{
			changeNavIndex(index){
				this.navIndex = index;
			}
		},
		computed: {
			// indexData(){
			// 	return this.$store.state.home.indexData;
			// },
			...mapState({
				indexData:state=>state.home.indexData
			})
		},
		components:{
			Recommend,
			CateList
		}
		}
		// mutations:{
		// 	A(){
		// 		// 这是A程序写的mutation
		// 	},
		// 	// ...1000行代码
		// 	A(){
		// 		// 这是B程序猿写的mutation
		// 	}
		// }
	
</script>
<!-- tab向后缩进
		shift+tab 向前缩进
 -->
<style lang="stylus">
	.indexContainer
		.header
			display flex
			align-items  center
			padding-top 20upx
			.logo
				width 118upx
				height 40upx
				margin 0 20upx
				flex-shrink  0
			
			.searchContainer
				position relative
				background  #ccc
				height 60upx
				border-radius  10upx
				padding-left 60upx
				flex-grow 1
				.iconfont
					position absolute
					top 50%
					left 20upx
					transform translateY(-50%)
				.searchInput
					height 100%
				.placeholder
					text-align center
					font-size 24upx
					text-indent -60upx
			
			.username
				width 140upx
				height 60upx
				color red
				line-height  60upx
				text-align  center
				font-size 24upx
				margin 0 20upx
				flex-shrink  0
		.navScroll
			// display flex
			white-space nowrap
			.navItem
				display inline-block
				font-size 28upx
				width 140upx
				height 80upx
				text-align center
				line-height 80upx
				&.active
					border-bottom 4upx solid red
		.contentScroll
		// 小程序 height=屏幕百分百高度 - header高度 - nav高度
		//  h5 height=屏幕百分百高度 - header高度 - nav高度 - 导航栏高度 - tabBar高度
			height calc(100vh - 80upx - 84upx - var(--window-top) - var(--window-bottom))
			// /* #ifdef H5 */
			// height calc(100vh - 80upx - 84upx - 88upx - 100upx)
			// /* #endif */
			// /* #ifdef MP-WEIXIN */
			// height calc(100vh - 80upx - 84upx)
			// /* #endif */
		
	
</style>
