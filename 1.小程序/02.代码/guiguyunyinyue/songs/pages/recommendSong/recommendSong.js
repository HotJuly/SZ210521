// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js'
import req from '../../../utils/req.js'
import hasPermission from '../../../utils/hasPermission.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    month:"--",
    day:"--",
    recommendList:[],
    currentIndex:null
  },

  // 用于监视用户点击推荐列表中的歌曲,自动跳转到song页面
  toSong(event){
    // console.log('toSong')
    // 自定义属性传入什么数据,返回的也是什么数据,不会做数据类型转换
    const { songid , index } = event.currentTarget.dataset;
    // console.log('song', song)

    this.setData({
      currentIndex: index
    })

    // 可以通过query实现路由传参
    // 注意:小程序只支持query传参,不支持params
    // 小程序的跳转链接长度具有限制,此处数据过大无法传递
    wx.navigateTo({
      // url: "/pages/song/song?song=" + JSON.stringify(song)
      url: "/songs/pages/song/song?songId=" + songid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    if (!hasPermission())return;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    // console.log('month', month)
    this.setData({
      day,
      month
    })

    const result = await req('/recommend/songs');
    this.setData({
      recommendList:result.recommend
    })

    this.token = PubSub.subscribe("switchType",(msg,type)=>{
      // console.log('switchType', msg, type)
      // 找到对应歌曲的id
      let {currentIndex,recommendList} = this.data;
      if (type === "next") {
        if (currentIndex===recommendList.length-1){
          currentIndex=0;
        } else {
          currentIndex++;
        }
      } else {
        if (currentIndex === 0) {
          currentIndex = recommendList.length - 1;
        } else {
          currentIndex--;
        }
      }
      this.setData({
        currentIndex
      })
      const id = recommendList[currentIndex].id;
      PubSub.publish('sendId',id)
      // console.log('id',id)
    })
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
    PubSub.unsubscribe(this.token)
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