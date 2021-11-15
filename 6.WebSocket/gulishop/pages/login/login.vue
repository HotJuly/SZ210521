<template>
	<view class="container">
		<view class="status_bar"></view>
		<view class="head flex-row">
			<view class="title">登录</view>
		</view>
		<view style="height: 100upx;"></view>
		<input class="input" v-model="form.phone" type="text" placeholder="手机号" />
		<input class="input" v-model="form.password" type="password" placeholder="登录密码,初始密码为123456" />
		<view class="login" :class="{able: isOk}" @tap="login">登录</view>
	</view>
</template>

<script>
import {mapMutations} from 'vuex';
export default{
	data(){
		return {
			form: {
				phone: '17688197770',
				password: '123456'
			}
		}
	},
	computed: {
		isOk(){
			return this.form.phone && this.form.password
		}
	},
	onShow(){
		uni.clearStorage();
	},
	methods: {
		async login(){
			// 数据校验
			const {phone,password} = this.form;
			if(!phone)return;
			if(!password)return;
			
			// 执行登录
			uni.showLoading({
				title:"登录中,请稍等"
			})
			
			const userInfo =await this.$API.reqLogin(phone,password);
			
			uni.hideLoading();
			
			uni.setStorage({
				key:"userInfo",
				data:userInfo
			})
			uni.setStorage({
				key:"token",
				data:userInfo.token
			})
			
			uni.reLaunch({
				url:"/pages/index/index"
			})
		},
		...mapMutations(["SETUSERINFOMUTATION"])
	}
}
</script>

<style lang="stylus" scoped>
.tip{
	width: 100%;
	text-align: center;
	padding: 0 30upx;
	position: absolute;
	bottom: 30upx;
	
	.item{
		color: #777;
		font-size: 24upx;
		margin-top: 10upx;
		
		.link{
			color: blue;
			font-size: 24upx;
		}
	}
}
.input{
	height: 80upx;
	padding: 0 20upx;
	margin: 60upx 100upx 0;
	border: 2upx solid #999;
}
.login{
	color: #fff;
	opacity: 0.6;
	margin: 100upx;
	padding: 20upx 0;
	text-align: center;
	border-radius: 10upx;
	background-color: #4CD964;
	
	&.able{
		opacity: 1;
		background-color: #4CD964;
	}
}
</style>
