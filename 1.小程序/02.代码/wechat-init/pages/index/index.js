// pages/index/index.js
// 注册页面,可以调用多次,因为可以注册多个页面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"我是初始化的数据"
  },
  changeMsg(){
    // console.log('changeMsg')
    this.setData({
      msg:"我是修改之后的数据"
    })
  },

  handleClick() {
    // console.log('handleClick')
    wx.redirectTo({
      url:"../log/log"
    })
    // wx.navigateTo({
    //   url: "../log/log"
    // })
  },

  handleParent() {
    // console.log('handleParent')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('msg',this.data.msg)
    // // this.data.msg="我是修改之后的数据"
    // this.setData({
    //   msg: "我是修改之后的数据"
    // })
    // this.setData({
    //   msg: "我是修改之后的数据1"
    // })
    // this.setData({
    //   msg: "我是修改之后的数据2"
    // })
    // this.setData({
    //   msg: "我是修改之后的数据3"
    // })
    // console.log('msg1', this.data.msg)
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