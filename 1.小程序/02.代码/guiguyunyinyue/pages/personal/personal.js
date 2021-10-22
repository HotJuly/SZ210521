// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于控制元素上下移动
    moveDistance:0,

    // 用于控制元素回弹的过渡效果
    moveTransition:""
  },

  // 监视用户手指按下事件
  handleTouchStart(event) {
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
  onShow: function () {

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