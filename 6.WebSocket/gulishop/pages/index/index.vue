<template>
	<view class="container">
		<view class="status_bar"></view>
		<!--头部-->
		<view class="head flex-row" :style="{'padding-right': posRight}">
			<view class="title">消息</view>
		</view>
		<!--容器-->
		<scroll-view scroll-y class="list">
			<view class="space"></view>
			<uni-swipe-action>
				<uni-swipe-action-item>
					<view class="item flex-row">
						<view class="cover flex-row flex-column">
							<image src="/static/images/wyz.png" class="icon"></image>
						</view>
						<view class="title">
							<view class="main flex-row">
								<!--判断是群聊还是单聊-->
								<text class="text">泉州吴彦祖</text>
								<text class="time">08:30</text>
							</view>
							<view class="sub text-ellipsis">静哥真是一个大帅比,头发又多,说话又好听</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</scroll-view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'

let dayTime=new Date(new Date(new Date().toLocaleDateString()).getTime());
export default{
	components: { uniIcons,uniSwipeAction,uniSwipeActionItem },
	data(){
		return {
			posRight: '15px'
		}
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
