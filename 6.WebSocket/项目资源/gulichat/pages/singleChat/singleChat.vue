<template>
	<view class="container">
		<!--内容-->
		<view class="scroll" :style="{height: scrollHeight}">
			<scroll-view :scroll-into-view="scrollViewId" scroll-y style="height: 100%;">
				<view class="item-space"></view>
				<!-- <view class="time">晚上 10:04</view> -->
				<view v-for="(item, index) in list" :key="index">
					<!--撤销-->
					<view v-if="item.msgType == 'cancel'" class="cancel">
						<text v-if="item.source == fromUserId" class="text">你撤回了一条消息</text>
						<text v-else class="text">成员 {{ item.source }} 撤回了一条消息</text>
					</view>
					<view v-else class="item flex-row" :class="[item.source == fromUserId ? 'right' : 'left']">
						<!--处理头像-->
						<view v-if="item.source == fromUserId">
							<image v-if="fromUserFace" :src="fromUserFace" class="face"></image>
							<image v-else src="../../../static/img/face.png" class="face"></image>
						</view>
						<view v-else>
							<image v-if="item.toUserFace || item.userFace" :src="item.toUserFace || item.userFace" class="face"></image>
							<image v-else src="../../../static/img/face.png" class="face"></image>
						</view>
						<!--文本-->
						<view v-if="item.msgType == 'text'" @longpress="longPress(item)" class="content flex-row">{{ item.content }}</view>
						<!--图片-->
						<image v-if="item.msgType == 'image'" @longpress="longPress(item)" :src="item.content" mode="widthFix" style="width: 320upx;"></image>
						<!--地图-->
						<view v-if="item.msgType == 'map'" class="content map" @tap="openLocation(item.content)">
							<view class="title">{{ item.content.address }}</view>
							<map class="box"
								:latitude="item.content.latitude" 
								:longitude="item.content.longitude"
								:markers="[{latitude: item.content.latitude, longitude: item.content.longitude, iconPath: '../../../static/img/marker.png'}]" 
								@tap="openLocation(item.content)"
							></map>
						</view>
						<!--语音-->
						<view v-if="item.msgType == 'voice'" @tap="playVoice(item)" class="content">
							<image v-show="voicePlayingId != item.id" src="../../../static/img/audio.png" class="voice-icon"></image>
							<image v-show="voicePlayingId == item.id" src="../../../static/img/audio-play.gif" class="voice-icon"></image>
						</view>
					</view>
				</view>
				<view id="bottom"></view>
			</scroll-view>
		</view>
		<!--输入-->
		<view class="oper flex-row" @tap.prevent.stop="">
			<!--语音切换-->
			<image v-if="isEdit" @tap="toggleEdit(false)" src="../../../static/img/voice-circle.png" class="icon"></image>
			<image v-else @tap="toggleEdit(true)" src="../../../static/img/keyboard.png" class="icon"></image>
			<!--语音切换-->
			<input v-if="isEdit" @focus="inputFocus" :focus="isFocus" :cursor-spacing="8" :adjust-position="false" type="text" v-model="content" class="input" placeholder="请输入内容"/>
			<view v-else @touchstart="startVoice" @touchend="endVoice" class="input" style="text-align: center;">按住开吼</view>
			<!--表情-->
			<image @tap="togglePicker(200, 'emoji')" src="../../../static/img/emoji.png" class="icon"></image>
			<!--发送-->
			<view @touchend.prevent="send" v-show="content" class="btn">发送</view>
			<!--附件-->
			<image @tap="togglePicker(86, 'file')" v-show="!content" src="../../../static/img/add.png" class="icon"></image>
		</view>
		<!--表情-->
		<view v-show="showEmoji" class="emoji" @tap.prevent.stop="">
			<view class="list">
				<view class="item" @tap="content += item" v-for="(item, index) in emojis" :key="index">{{ item }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			emojis: [],
			isEdit: true,
			isFocus: false,
			scrollHeight: 'auto',		// 内容区域高度
			statusBarHeight: 0,		// 状态栏高度
			scrollViewId: '',		// 滚动到最底部
			voicePlayingId: '',		// 正在播放的消息ID
			content: '',
			list: [],
			socketOpen: false,
			socketMsgQueue: [],
			fromUserId: uni.getStorageSync('userId'),
			fromUserFace: uni.getStorageSync('userFace'),
			toUserId: '',
			toUserName: '',
		}
	},
	onLoad(option){
		// 初始化内容高度
		this.setScrollHeight()
		
		// 初始化状态栏高度
		uni.getSystemInfo({
			success: res=>{
				this.statusBarHeight = res.statusBarHeight
			}
		})
		
		// 设置标题
		uni.setNavigationBarTitle({ title: option.toUserName })
		
		// 获取参数
		this.toUserId = option.toUserId
		this.toUserName = option.toUserName
		
		
	},
	onHide(){
	},
	methods: {
		// 初始化滚动
		initScrollBar(){
			setTimeout(()=>{
				this.scrollViewId = ''
				setTimeout(()=>{
					this.scrollViewId = 'bottom'
					setTimeout(()=>{this.scrollViewId = ''}, 100)
				}, 100)
			}, 100)
		},
		// 监听输入聚焦
		inputFocus(e){
			this.setScrollHeight(e.detail.height)
			this.initScrollBar()
			
			uni.onKeyboardHeightChange(res=>{
				this.setScrollHeight(res.height)
				this.initScrollBar()
			})
		},
		// 设置scroll的高度
		setScrollHeight(descHeight=0){
			// #ifdef MP-WEIXIN
			this.scrollHeight = `calc(100vh - 110rpx - ${descHeight}px)`
			// #endif
			// #ifdef APP-PLUS
			this.scrollHeight = `calc(100vh - 110upx - ${descHeight}px)`
			// #endif
			// #ifdef H5
			this.scrollHeight = `calc(100vh - 110upx - 88rpx - ${descHeight}px)`
			// #endif
		},

		// 发送消息
		send(){
			this.pushMessage(this.content, 'text', ()=>{
				this.content = ''
			})
		},
		// 推送消息
		pushMessage(content, type='text', cb=()=>{}){
			// 组合消息体：需要保存在本地数据库的数据
			let msgData = {
				fromUserId: this.fromUserId,
				userFace: uni.getStorageSync('userFace'),
				toUserId: this.toUserId,
				type,
				content
			}
			
			// 本地保存
			uni.request({
				method: 'POST',
				url: this.$api.addSingleMsg,
				data: msgData,
				header: this.$util.getHeader(),
				success: res=>{
					if(res.data.code){
						return this.$util.toast(res.data.code)
					}
					let msgId = res.data.data
					
					// 判断是否为非文本
					if(!['text', 'map'].includes(type)){
						msgData.content = this.$api.staticPath + msgData.content
					}
					
					// 发送单聊消息
					this.$xbcim.sendSingle({
						content: msgData.content,
						msgType: type,
						source: this.fromUserId,
						target: this.toUserId,
						extra: {
							id: msgId,
							userFace: uni.getStorageSync('userFace')
						}
					})
					
					// 加入信息
					this.list.push({
						source: this.fromUserId,
						target: this.toUserId,
						content: msgData.content,
						userFace: uni.getStorageSync('userFace'),
						type: 'single',
						msgType: type
					})
					
					// 初始化滚动条
					this.initScrollBar()
					cb ? cb() : this.togglePicker(0, 'file')
				}
			})
		},
		// 获取记录
		getList(){
			uni.request({
				url: this.$api.getSingleRecord,
				data: {
					fromUserId: this.fromUserId,
					toUserId: this.toUserId
				},
				header: this.$util.getHeader(),
				success: res=>{
					this.list = res.data.data.map(item=>{
						if(['voice', 'image'].includes(item.type)){
							item.content = this.$api.staticPath+item.content
						}
						if(item.toUserFace){
							item.toUserFace = this.$api.staticPath+item.toUserFace
						}
						
						// 为了和socket的字段一致，此处做一个转换；
						// 数据表字段可以直接设置为source、target和msgType
						item.source = item.fromUserId
						item.target = item.toUserId
						item.msgType = item.type
						return item
					})
					
					this.scrollViewId = ''
					setTimeout(()=>{
						this.scrollViewId = 'bottom'
						setTimeout(()=>{this.scrollViewId = ''}, 100)
					}, 100)
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.container{
	height: 100vh;
	overflow: hidden;
}

/* #ifdef H5 */
.container{
	height: calc(100vh - 88upx);
}
/* #endif */

.status_bar,
.container,
.header,
.emoji,
.file{
	background-color: #F3F3F3;
}
.header{
	border-bottom: 2upx solid #EEE;
	
	.center{
		font-weight: bold;
	}
}
.map{
	width: 60%;
	height: 300upx;
	background-color: #FFF !important;
	
	&::before{
		border-right: 30upx solid #FFF !important;
	}
	
	.title{
		height: 80upx;
		font-size: 28upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.box{
		width: 100%;
		height: 170upx;
		margin-top: 10upx;
	}
}
.emoji{
	height: 400upx;
	padding: 0 0 20upx 20upx;
	position: relative;
	
	.list{
		width: 100%;
		height: 400upx;
		padding: 20upx 0;
		overflow-y: auto;
		
		.item{
			float: left;
			display: block;
			height: 60upx;
			line-height: 60upx;
			width: calc(100% / 12);
			margin-right: 20upx;
		}
	}
}
.file{
	padding: 30upx 20upx;
	
	.list{
		overflow: hidden;
		padding-left: 10upx;
		justify-content: flex-start;
	}
	
	.item{
		float: left;
		width: 110upx;
		height: 110upx;
		border-radius: 10upx;
		margin-right: 40upx;
		background-color: #FFF;
		
		.icon{
			width: 50upx;
		}
		
		.text{
			font-size: 24upx;
			margin-top: 4upx;
		}
	}
}
.oper{
	height: 110upx;
	padding: 0 20upx;
	box-sizing: border-box;
	border-top: 2upx solid #EEE;
	border-bottom: 2upx solid #EEE;
	
	.input{
		height: 68upx;
		line-height: 68upx;
		padding: 0 20upx;
		font-size: 28upx;
		border-radius: 10upx;
		background-color: #fff;
		width: calc(100% - 120upx - 20upx - 40upx - 60upx);
	}
	.icon{
		width: 60upx;
		height: 60upx;
	}
	.btn{
		color: #fff;
		width: 90upx;
		height: 52upx;
		font-size: 24upx;
		line-height: 52upx;
		text-align: center;
		border-radius: 10upx;
		background-color: #2BA245;
	}
}
.scroll{
	overflow-y: auto;
	transition: all 0.1s ease;
	height: calc(100vh - 88upx - 110upx - var(--status-bar-height));
	
	/* #ifdef MP-WEIXIN */
	height: calc(100vh - 88upx - var(--status-bar-height));
	/* #endif */
	/* #ifdef H5 */
	height: calc(100vh - 88upx - 110upx - var(--status-bar-height));
	/* #endif */
	
	.item-space{
		height: 30upx;
	}
	
	.time{
		color: #666;
		font-size: 24upx;
		text-align: center;
		margin-bottom: 20upx;
	}
	
	.cancel{
		width: 100%;
		height: 40upx;
		text-align: center;
		margin-bottom: 30upx;
		
		.text{
			color: #999;
			font-size: 24upx;
		}
	}
	
	.item{
		margin: 0 30upx 30upx;
		align-items: flex-start;
		justify-content: flex-start;
		
		.face{
			width: 80upx;
			height: 80upx;
			border-radius: 10upx;
		}
		
		.content{
			color: #000;
			font-size: 32upx;
			min-height: 80upx;
			border-radius: 10upx;
			padding: 20upx 24upx;
			background-color: #fff;
			word-break: break-all;
			word-wrap: break-word;
			max-width: calc(100% - 100upx - 120upx);
			position: relative;
			
			&::before{
				content: '';
				width: 0;
				height: 0;
				border-right: 30upx solid #FFF;
				border-top: 20upx solid transparent;
				border-bottom: 20upx solid transparent;
				position: absolute;
				top: 24upx;
			}
			
			.voice-icon{
				width: 32upx;
				height: 40upx;
				margin-right: 180upx;
				margin-bottom: -8upx;
			}
		}
		
		&.left{
			.face{
				margin-right: 30upx;
			}
			.content::before{
				left: -20upx;
			}
		}
		
		&.right{
			flex-direction: row-reverse;
			.face{
				margin-left: 30upx;
			}
			.content{
				background-color: #A0EA6F;
				
				&::before{
					right: -20upx;
					transform: rotate(180deg);
					border-right: 30upx solid #A0EA6F;
				}
				
				.voice-icon{
					margin-right: 0;
					margin-left: 180upx;
					transform: rotate(180deg);
				}
			}
		}
	}
	
	#bottom{
		height: 0;
	}
}
</style>
