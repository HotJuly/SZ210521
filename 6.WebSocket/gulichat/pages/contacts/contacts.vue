<template>
	<view class="container">
		<view class="status_bar"></view>
		<!--头部-->
		<view class="head flex-row" :style="{'padding-right': posRight}">
			<view class="title">通讯录</view>
			<view @tap="showAdd">添加</view>
		</view>
		<!--容器-->
		<scroll-view scroll-y class="list">
			<view class="space"></view>
			<view v-for="(item, index) in list" :key="index" class="item flex-row" @tap="toDetail(item)">
				<view class="cover flex-row">
					<image :src="item.avatarUrl" class="icon"></image>
					<view class="tag empty flex-row flex-column"></view>
				</view>
				<view class="title flex-row">{{ item.nickName }}</view>
			</view>
			
			<!--添加好友-->
			<uni-popup ref="addFriend">
				<view class="add-friend">
					<view class="title">添加好友</view>
					<input class="input" v-model="phone" type="text" placeholder="请输入手机号" />
					<view class="btn" :class="{disabled: !phone}">添加</view>
					<view class="close" @tap="closeAdd">
						<uni-icons type="closeempty" size="26" color="#999"></uni-icons>
					</view>
				</view>
			</uni-popup>
		</scroll-view>
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default{
	components: { uniIcons,uniPopup },
	data(){
		return {
			posRight: '15px',
			list: [],
			phone: ''
		}
	},
	onLoad(){
		// #ifdef MP-WEIXIN
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		this.posRight = (menuButtonInfo.width + 20) + 'px'
		// #endif
		this.getFriendList()
	},
	methods: {
		async getFriendList(){
			const list = await this.$API.reqFriendList();
			this.list = list;
		},
		showAdd(){
			// console.log('showAdd')
			this.$refs.addFriend.open();
		},
		closeAdd(){
			this.$refs.addFriend.close();
		},
		async toDetail(item){
			const chatInfo = await this.$API.createChat({
				my:this.userInfo,
				friend:item
			});
			uni.setStorageSync('chatInfo', chatInfo);
			this.SETCURRENTTOKENMUTATION(chatInfo.chatToken);
			uni.navigateTo({
				url:"/pages/groupChat/groupChat?chatToken="+chatInfo.chatToken
			})
		},
		...mapMutations(["SETCURRENTTOKENMUTATION"])
	},
	computed:{
		...mapState(["userInfo"])
	}
}
</script>

<style lang="scss" scoped>
.add-friend{
	width: 600upx;
	height: 460upx;
	padding: 0 40upx;
	border-radius: 10upx;
	background-color: #FFF;
	position: relative;
	
	.close{
		position: absolute;
		right: 20upx;
		top: 20upx;
	}
	
	.title{
		height: 120upx;
		font-size: 32upx;
		text-align: center;
		line-height: 120upx;
	}
	
	.input{
		height: 80upx;
		padding: 0 30upx;
		border-radius: 10upx;
		margin: 40upx 0 80upx;
		border: 2upx solid #ddd;
	}
	
	.btn{
		color: #FFF;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		border-radius: 10upx;
		background-color: #2CA246;
		
		&.disabled,
		&:active{
			opacity: 0.8;
		}
	}
}
.list{
	height: calc(100vh - 100upx - var(--status-bar-height));
	
	.item{
		width: 100vw;
		padding: 20upx 30upx 0;
		box-sizing: border-box;
		
		.cover{
			width: 80upx;
			height: 80upx;
			border-radius: 10upx;
			box-sizing: border-box;
			border: 2upx solid #f9f9f9;
			position: relative;
			
			.icon{
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}
		
		.title{
			height: 100%;
			box-sizing: border-box;
			width: calc(100vw - 110upx - 60upx);
			position: relative;
			
			&::after{
				content: '';
				width: 100%;
				height: 2upx;
				background-color: #F6F6F6;
				position: absolute;
				left: 0;
				bottom: -34upx;
			}
			
			.main{
				margin: 6upx 0;
				
				.text{
					color: #333;
					font-size: 32upx;
					font-weight: 600;
				}
				
				.time{
					color: #666;
					font-size: 24upx;
				}
			}
		}
	}
}
</style>
