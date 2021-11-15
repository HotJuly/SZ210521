<template>
	<view class="container">
		<view class="status_bar"></view>
		<!--头部-->
		<view class="head flex-row" @tap="closeSwipe" :style="{'padding-right': posRight}">
			<view class="title">消息</view>
			<view @tap="toPage('/pages/message/group/create')">创建群聊</view>
		</view>
		<!--容器-->
		<scroll-view scroll-y class="list">
			<view class="space" @tap="closeSwipe"></view>
			<uni-swipe-action ref="swipe">
				<uni-swipe-action-item v-for="item in messageList" :key="item.chatToken">
					<view class="item flex-row" @tap="toDetail(item)">
						<view class="cover flex-row flex-column">
							<image v-if="item.chatType == 'group' && item.groupFace" :src="item.groupFace" class="icon"></image>
							<image v-else-if="item.chatType == 'single' && item.userFace" :src="item.userFace" class="icon"></image>
							<image v-else src="../../static/img/face.png" class="icon"></image>
							<view v-if="item.unReadNumebr" class="tag empty flex-row flex-column">{{item.unReadNumebr}}</view>
						</view>
						<view class="title">
							<view class="main flex-row">
								<!--判断是群聊还是单聊-->
								<text class="text">{{ item.chatName}}</text>
								<text class="time">{{ item.lastModify | timeFilter }}</text>
							</view>
							<view class="sub text-ellipsis">{{ item.lastText }}</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</scroll-view>
	</view>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import moment from 'moment';
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'

let dayTime=new Date(new Date(new Date().toLocaleDateString()).getTime());
export default{
	components: { uniIcons,uniSwipeAction,uniSwipeActionItem },
	data(){
		return {
			posRight: '15px',
			userId: uni.getStorageSync('userId') || '',
			messageList:[],
			userInfo:{},
			messageMapObj:{}
		}
	},
	onShow(){
	},
	async onLoad(){
		// #ifdef MP-WEIXIN
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
		this.posRight = (menuButtonInfo.width + 20) + 'px'
		// #endif
		
		this.userInfo = uni.getStorageSync("userInfo");
		
		let messageList = await this.$API.reqMessageList();
		
		let messageMapObj={};
		messageList.forEach((item,index)=>{
			if(item.chatType === "single"){
				item.userFace = this.filterFace(item.userFace)
				item.chatName = this.filterName(item.chatName)
			}
			this.$set(item,"unReadNumebr",0);
			
			messageMapObj[item.chatToken]=index;
		})
		
		this.messageMapObj = messageMapObj;
		
		this.messageList = messageList;
		
		this.mapWebSocket();
	},
	methods: {
		// 关闭滑块
		closeSwipe(){
			this.$refs.swipe.closeOther()
		},
		// 详情
		toDetail(item){
			uni.setStorageSync('chatInfo', item);
			uni.navigateTo({
				url:"/pages/groupChat/groupChat?chatToken="+item.chatToken
			})
			item.unReadNumebr = 0;
			this.SETCURRENTTOKENMUTATION(item.chatToken);
		}

		
		
		,
		filterName(chatName){
			return chatName.replace(this.userInfo.nickName,"").replace("<->","");
		},
		
		filterFace(userFace){
			return userFace.replace(this.userInfo.avatarUrl,"").replace("<->","")
		},
		mapWebSocket(){
			
				uni.connectSocket({
					url:"ws://localhost:3000",
					protocols:['echo-protocol'],
					header:{
						token:uni.getStorageSync("token")
					}
				});
				
				uni.onSocketOpen(function(){
					console.log('open success')
				})
				
				uni.onSocketError(function(){
					console.log('error success')
				})
				
				uni.onSocketClose(function(){
					console.log('close success')
				})
				
				uni.onSocketMessage(({data:info})=>{
					info = JSON.parse(info)
					if(this.currentToken === info.chatToken){
						this.$bus.$emit('sendMsg',info.data)
					}else{
						this.ADDNEWMESSAGEMUTATION(info)
						const index = this.messageMapObj[info.chatToken];
						const message = this.messageList[index];
						message.lastModify = info.data.sendTime;
						message.userId = info.data.userId;
						message.lastText = info.data.msg;
						message.unReadNumebr += 1;
					}
				})
		},
		...mapMutations(["ADDNEWMESSAGEMUTATION","SETCURRENTTOKENMUTATION","CLEARCURRENTTOKENMUTATION"])
	},
	filters:{
		timeFilter(date){
			if(date-dayTime>0){
				return moment(date).format("hh:mm")
			}else{
				return moment(date).format("YY/MM/DD")
			}
		}
	},
	computed:{
		...mapState(["currentToken"])
	}
}
</script>

<style lang="scss" scoped>
.list{
	height: calc(100vh - 100upx - var(--status-bar-height));
	
	.item{
		width: 100vw;
		height: 160upx;
		padding: 30upx;
		box-sizing: border-box;
		align-items: flex-start;
		
		.cover{
			width: 100upx;
			height: 100upx;
			border-radius: 10upx;
			box-sizing: border-box;
			border: 2upx solid #f9f9f9;
			position: relative;
			
			.icon{
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
			
			.tag{
				color: #fff;
				width: 30upx;
				height: 30upx;
				font-size: 20upx;
				border-radius: 50%;
				background-color: red;
				position: absolute;
				top: -12upx;
				right: -12upx;
				z-index: 9;
				
				&.empty{
					width: 20upx;
					height: 20upx;
					background-color: #F72727;
					top: -6upx;
					right: -6upx;
				}
			}
		}
		
		.title{
			height: 100%;
			box-sizing: border-box;
			width: calc(100vw - 130upx - 60upx);
			position: relative;
			
			&::after{
				content: '';
				width: 100%;
				height: 2upx;
				background-color: #F6F6F6;
				position: absolute;
				left: 0;
				bottom: -30upx;
			}
			
			.main{
				height: 40upx;
				margin: 6upx 0 12upx;
				
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
			
			.sub{
				color: #999;
				font-size: 24upx;
			}
		}
	}
}
</style>
