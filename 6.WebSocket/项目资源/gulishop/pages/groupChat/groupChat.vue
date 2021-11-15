<template>
	<view class="container">
		<!--内容-->
		<view class="scroll" :style="{height: scrollHeight}">
			<scroll-view :scroll-into-view="scrollViewId" @touchstart="handleTouchStart" @scrolltolower="handleScrollToLower"
			 scroll-y style="height: 100%;">
				<view class="item-space"></view>
				<!-- <view class="time">晚上 10:04</view> -->
				<view v-for="(item, index) in list" :key="index">
					<view class="item flex-row" :class="[item.source == 'mine' ? 'right' : 'left']">
						<image :src="item.userFace" class="face"></image>
						<view class="username" :style="item.source != 'mine'?'left:140rpx':'right:140rpx'">{{ item.nickName }}</view>
						<view class="content flex-row">{{ item.msg }}</view>
					</view>
				</view>
				<view id="bottom"></view>
			</scroll-view>
		</view>
		<!--输入-->
		<view class="oper flex-row" @tap.prevent.stop="">
			<!--语音按钮切换-->
			<image src="../../static/images/voice-circle.png" class="icon"></image>
			<!--输入录音切换-->
			<input@focus="inputFocus" :focus="isFocus" :cursor-spacing="8" :adjust-position="false" type="text" v-model="content"
			 class="input" placeholder="请输入内容" />
			<!--表情-->
			<image src="../../static/images/emoji.png" class="icon"></image>
			<!--发送-->
			<view @touchend.prevent="send" v-show="content" class="btn">发送</view>
			<!--附件-->
			<image v-show="!content" src="../../static/images/add.png" class="icon"></image>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				emojis: [],
				isFocus: false,
				scrollHeight: 'auto', // 内容区域高度
				scrollViewId: '', // 滚动到最底部
				voicePlayingId: '', // 正在播放的消息ID
				content: '',
				list: [],
				chatToken: '',
				userToken: uni.getStorageSync('token'),
				userInfo: uni.getStorageSync('userInfo'),
				userMapObj:{}
			}
		},
		async onLoad(option) {
			this.chatToken = option.chatToken

			// 初始化内容高度
			this.setScrollHeight();

			this.$bus.$on('sendMsg', this.popMessage);
			
			
			let {
				chatName,
				chatType,
				chatUsers
			} = uni.getStorageSync('chatInfo');
			if (chatType === "single") {
				chatName = chatName.replace(this.userInfo.nickName, "").replace("<->", "");
			
			}
			uni.setNavigationBarTitle({
				title: chatName
			})
			
			chatUsers = chatUsers.filter((item) => item !== this.userInfo.userId)
			const usersInfo = await this.$API.findUsers(chatUsers.toString());
			this.userMapObj = usersInfo.reduce((pre,userInfo)=>{
				pre[userInfo.userId] = userInfo
				return pre;
			},{});
			
			let newList = this.$store.state.newMessages[this.chatToken];
			if(newList&&newList.length){
				// console.log('newList',newList)
				newList.forEach((msg)=>{
					this.popMessage(msg);
				})
				this.CLEARMESSAGEMUTATION(this.chatToken);
			}


		},
		onUnload() {
			this.$bus.$off('sendMsg', this.popMessage);
			this.CLEARCURRENTTOKENMUTATION();
		},
		onHide() {},
		async onShow() {
			// let {
			// 	chatName,
			// 	chatType,
			// 	chatUsers
			// } = uni.getStorageSync('chatInfo');
			// if (chatType === "single") {
			// 	chatName = chatName.replace(this.userInfo.nickName, "").replace("<->", "");

			// }
			// uni.setNavigationBarTitle({
			// 	title: chatName
			// })

			// chatUsers = chatUsers.filter((item) => item !== this.userInfo.userId)
			// const usersInfo = await this.$API.findUsers(chatUsers.toString());
			// this.userMapObj = usersInfo.reduce((pre,userInfo)=>{
			// 	pre[userInfo.userId] = userInfo
			// 	return pre;
			// },{});
		},
		methods: {
			// 初始化滚动
			initScrollBar() {
				if (!this.flag) {
					setTimeout(() => {
						this.scrollViewId = ''
						setTimeout(() => {
							this.scrollViewId = 'bottom'
							setTimeout(() => {
								this.scrollViewId = ''
							}, 100)
						}, 100)
					}, 100)
				}
			},
			// 监听输入聚焦
			inputFocus(e) {
				this.setScrollHeight(e.detail.height)
				this.initScrollBar()
				// this.flag=false;

				uni.onKeyboardHeightChange(res => {
					this.setScrollHeight(res.height)
					this.initScrollBar()
				})
			},
			// 设置scroll的高度
			setScrollHeight(descHeight = 0) {
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

			handleTouchStart() {
				this.flag = true;
			},

			handleScrollToLower() {
				this.flag = false;
			},

			// 发送消息
			send() {
				this.pushMessage(this.content, 'text');
				this.content = ''
			},
			// 推送消息
			async pushMessage() {
				// 组合消息体：本地数据库需要的数据
				let msgData = {
					msg: this.content,
					chatToken: this.chatToken
				}

				// 本地保存
				const result = await this.$API.sendMsg(msgData);
				if (result.code === 200) {
					this.list.push({
						source: "mine",
						userFace: this.userInfo.avatarUrl,
						nickName: this.userInfo.nickName,
						msg: msgData.msg
					})

					this.$nextTick(() => {
						this.initScrollBar()
					})
				}
			},

			popMessage(data) {
				const {
					msg,
					userId
				} = data;
				this.list.push({
					source: "friend",
					userFace:this.userMapObj[userId].avatarUrl,
					nickName:this.userMapObj[userId].nickName,
					msg
				});
				this.$nextTick(() => {
					this.initScrollBar()
				})
			},
			...mapMutations(["CLEARMESSAGEMUTATION","CLEARCURRENTTOKENMUTATION"])
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100vh;
		overflow: hidden;
	}

	/* #ifdef H5 */
	.container {
		height: calc(100vh - 88upx);
	}

	/* #endif */
	.status_bar,
	.container,
	.header,
	.emoji,
	.file {
		background-color: #F3F3F3;
	}

	.header {
		border-bottom: 2upx solid #EEE;

		.center {
			font-weight: bold;
		}
	}

	.map {
		width: 60%;
		height: 300upx;
		background-color: #FFF !important;

		&::before {
			border-right: 30upx solid #FFF !important;
		}

		.title {
			height: 80upx;
			font-size: 28upx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.box {
			width: 100%;
			height: 170upx;
			margin-top: 10upx;
		}
	}

	.emoji {
		height: 400upx;
		padding: 0 0 20upx 20upx;
		position: relative;

		.list {
			position: relative;
			width: 100%;
			height: 400upx;
			padding: 20upx 0;
			overflow-y: auto;

			.username {
				position: absolute;
				top: 0;
			}

			.item {
				float: left;
				display: block;
				height: 60upx;
				line-height: 60upx;
				width: calc(100% / 12);
				margin-right: 20upx;
			}
		}
	}

	.file {
		padding: 30upx 20upx;

		.list {
			overflow: hidden;
			padding-left: 10upx;
			justify-content: flex-start;
		}

		.item {
			float: left;
			width: 110upx;
			height: 110upx;
			border-radius: 10upx;
			margin-right: 40upx;
			background-color: #FFF;

			.icon {
				width: 50upx;
			}

			.text {
				font-size: 24upx;
				margin-top: 4upx;
			}
		}
	}

	.oper {
		height: 110upx;
		padding: 0 20upx;
		box-sizing: border-box;
		border-top: 2upx solid #EEE;
		border-bottom: 2upx solid #EEE;

		.input {
			height: 68upx;
			line-height: 68upx;
			padding: 0 20upx;
			font-size: 28upx;
			border-radius: 10upx;
			background-color: #fff;
			width: calc(100% - 120upx - 20upx - 40upx - 60upx);
		}

		.icon {
			width: 60upx;
			height: 60upx;
		}

		.btn {
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

	.scroll {
		overflow-y: auto;
		transition: all 0.1s ease;
		height: calc(100vh - 88upx - 110upx - var(--status-bar-height));

		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 88upx - var(--status-bar-height));
		/* #endif */

		.item-space {
			height: 30upx;
		}

		.time {
			color: #666;
			font-size: 24upx;
			text-align: center;
			margin-bottom: 20upx;
		}

		.cancel {
			width: 100%;
			height: 40upx;
			text-align: center;
			margin-bottom: 30upx;

			.text {
				color: #999;
				font-size: 24upx;
			}
		}

		.item {
			margin: 0 30upx 30upx;
			align-items: flex-start;
			justify-content: flex-start;
			position: relative;

			.face {
				width: 120upx;
				height: 120upx;
				border-radius: 10upx;
			}

			.username {
				position: absolute;
				top: 0rpx;
				right: 140rpx;
				font-size: 20rpx;
				color: #7F7F7F
			}

			.content {
				margin-top: 38rpx;
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

				&::before {
					content: '';
					width: 0;
					height: 0;
					border-right: 30upx solid #FFF;
					border-top: 20upx solid transparent;
					border-bottom: 20upx solid transparent;
					position: absolute;
					top: 24upx;
				}

				.voice-icon {
					width: 32upx;
					height: 40upx;
					margin-right: 180upx;
					margin-bottom: -8upx;
				}
			}

			&.left {
				.face {
					margin-right: 30upx;
				}

				.content::before {
					left: -20upx;
				}
			}

			&.right {
				flex-direction: row-reverse;

				.face {
					margin-left: 30upx;
				}

				.content {
					background-color: #A0EA6F;

					&::before {
						right: -20upx;
						transform: rotate(180deg);
						border-right: 30upx solid #A0EA6F;
					}

					.voice-icon {
						margin-right: 0;
						margin-left: 180upx;
						transform: rotate(180deg);
					}
				}
			}
		}

		#bottom {
			height: 0;
		}
	}
</style>
