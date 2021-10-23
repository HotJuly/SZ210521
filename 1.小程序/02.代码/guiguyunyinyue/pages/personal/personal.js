// pages/personal/personal.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于控制元素上下移动
    moveDistance:0,

    // 用于控制元素回弹的过渡效果
    moveTransition:"",

    // 用来收集用户的个人数据
    userInfo:{},

    // 用来显示最近播放记录列表
    playList:[]
  },

  // 用于监视用户点击游客按钮,跳转到登录页面
  toLogin(){
    // console.log('toLogin')
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 监视用户手指按下事件
  handleTouchStart(event) {
    /*
      touches数组用来存储当前手机屏幕上所有的手指相关信息
      changedTouches数组用来存储当前手机屏幕上正在变化的所有的手指相关信息
     */
    // console.log('handleTouchStart', event)
    this.startY = event.touches[0].clientY;
    this.setData({
      moveTransition: ""
    })
  },

  // 监视用户手指滑动事件,实现元素拖拽效果
  handleTouchMove(event){
    // console.log('handleTouchMove', event)
    const moveY = event.touches[0].clientY;
    const moveDistance = moveY - this.startY;
    // console.log('moveDistance', moveDistance)
    if (moveDistance<0||moveDistance>80)return;
    this.setData({
      moveDistance
    })
  },

  // 监视用户手指抬起事件
  handleTouchEnd(event) {
    this.setData({
      moveDistance:0,
      moveTransition:"transform 400ms"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:async function () {
    // 从Storage中读取用户的个人数据
    const userInfoStr = wx.getStorageSync("userInfo");
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr);
      // console.log('userInfo', userInfo)
      this.setData({
        userInfo
      })

      const result = await req('/user/record',{uid:userInfo.userId,type:1});

      this.setData({
        playList:result.weekData.map((item)=>{
          return item.song.al.picUrl;
        })
      })

      console.log('result', result)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})