// pages/index/index.js
// 注册页面,可以调用多次,因为可以注册多个页面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"我是初始化的数据",
    userInfo:{}
  },

  // 最新版获取用户信息
  getUserProfile(){
    // console.log('getUserProfile')
    wx.getUserProfile({
      desc: "用于测试用户授权",
      success: (detail) => {
        // console.log('success', detail)
        this.setData({
          userInfo:detail.userInfo
        })
      }
    })
  },

  //用户获取用户信息
  getUserInfo(res){
    // console.log('getUserInfo', res)
    if(res.detail.rawData){
      // 能进入这里说明用户允许获取授权
      this.setData({
        userInfo:res.detail.userInfo
      })
    }
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
    console.log('---------onLoad---------')
    // wx.getUserInfo({
    //   success:(detail)=>{
    //     // console.log('success', detail)
    //     this.setData({
    //       userInfo:detail.userInfo
    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('---------onReady---------')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('---------onShow---------')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('---------onHide---------')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('---------onUnload---------')
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