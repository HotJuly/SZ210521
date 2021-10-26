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
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		}	
		,
		onLoad() {
			
		}
		,
		methods:{}
		}
	
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
			
		
	
</style>
