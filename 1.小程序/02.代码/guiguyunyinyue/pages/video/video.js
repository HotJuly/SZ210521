// pages/video/video.js
import req from '../../utils/req.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于展示当前导航栏内容
    navList:[],

    // 用于控制导航栏的下划线显示
    navId:null,

    // 用于展示页面上的视频列表
    videoList:[]
  },

  // 用于请求对应的视频列表数据
  async getVideoList(){
    const result2 = await req('/video/group', { id: this.data.navId });
    this.setData({
      videoList: result2.datas.map((item) => {
        return item.data;
      })
    })
  },

  // 用于监视用户点击导航栏操作,并实现下划线的切换效果
  changeNavId(event){
    // console.log('changeNavId',event)
    /*
      event.currentTarget可以获取到绑定事件的事件源对象
      event.target可以获取到当前事件流程中最内层的子元素
     */

    this.setData({
      navId: event.currentTarget.dataset.id
      // navId: event.target.dataset.id
    })

    this.getVideoList();
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
    const result = await req('/video/group/list');
    this.setData({
      navList:result.data.slice(0,13),
      navId: result.data[0].id
    })

    this.getVideoList();
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