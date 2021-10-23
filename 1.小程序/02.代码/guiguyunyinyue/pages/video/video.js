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

  // 用于测试练习video相关API
  testApi(){
    // console.log('testApi')
    // 1.创建videoContext对象
    const videoContext = wx.createVideoContext("3180DE6BCAB0330607DCDBD64F8D174E");

    // 2.通过videoContext对象调用pause方法,暂停视频播放
    videoContext.pause();
  },

  // 用来监视video组件是否正在播放视频
  handlePlay(event){
    // console.log('handlePlay')

    // console.log('oldVid', this.oldVid)

    // 1.当某个视频开始播放,就保存当前视频的vid
    const vid = event.currentTarget.dataset.vid;

    if (this.oldVid&&this.oldVid!==vid) {
      // 1.创建videoContext对象
      const videoContext = wx.createVideoContext(this.oldVid);

      // 2.通过videoContext对象调用pause方法,暂停视频播放
      videoContext.pause();
    }

    this.oldVid = vid;

  },

  // 用于请求对应的视频列表数据
  async getVideoList(){
    // console.log('videoList')
    this.setData({
      videoList:[]
    })

    const result2 = await req('/video/group', { id: this.data.navId });

    // console.log(2)

    this.setData({
      videoList: result2.datas.map((item) => {
        return item.data;
      })
    })
  },

  // 用于监视用户点击导航栏操作,并实现下划线的切换效果
  async changeNavId(event){
    // console.log('changeNavId',event)
    /*
      event.currentTarget可以获取到绑定事件的事件源对象
      event.target可以获取到当前事件流程中最内层的子元素
     */

    this.setData({
      navId: event.currentTarget.dataset.id
      // navId: event.target.dataset.id
    })

    wx.showLoading({
      title:"加载中..."
    });

    // console.log(1)

    await this.getVideoList();

    wx.hideLoading();

    // console.log(3)
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