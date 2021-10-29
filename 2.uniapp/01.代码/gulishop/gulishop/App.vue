<script>
	import req from './utils/req.js'
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			wx.login({
				async success({code}){
					// console.log('login',code)
					const openId = await req('/getOpenId',{code});
					uni.setStorage({
						key:"token",
						data:openId
					})
				}
			})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
	@import url(/static/iconfont/iconfont.styl);
	page
		height 100%
	/*每个页面公共css */
</style>
