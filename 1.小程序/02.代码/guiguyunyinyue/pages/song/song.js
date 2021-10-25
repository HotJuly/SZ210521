// pages/song/song.js
import PubSub from 'pubsub-js'
import req from '../../utils/req.js'
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于存储当前页面对应歌曲的详细信息
    songObj:{},

    // 用于控制当前页面的C3状态,并且记录当前页面播放状态
    isPlay:false,

    // 用于存储当前页面对应歌曲的音频链接
    musicUrl:null,

    // 用于存储当前页面歌曲id
    songId:null
  },

  // 用于请求歌曲的音频链接
  async getMusicUrl(){
    const result1 = await req('/song/url', { id: this.data.songId });
    this.setData({
      musicUrl: result1.data[0].url
    })
  },

  // 用于请求歌曲的详细信息
  async getMusicDetail(){
    const result = await req('/song/detail', { ids: this.data.songId });
    this.setData({
      songObj: result.songs[0]
    })

    // 动态设置当前页面导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.songObj.name
    })
  },

  // 用于监视用户点击上一首/下一首按钮,自动切换对应歌曲
  switchType(event){
    const { id } = event.currentTarget
    // console.log('switchType')
    // 订阅消息switchType
    PubSub.subscribe('sendId',async (msg,id)=>{
      // console.log('sendId', msg, id)
      this.setData({
        songId:id
      })

      await this.getMusicDetail();
      await this.getMusicUrl();

      this.backgroundAudioManager.src = this.data.musicUrl;
      this.backgroundAudioManager.title = this.data.songObj.name;

      this.setData({
        isPlay:true
      })

    })

    PubSub.publish('switchType', id)
  },

  // 用于监视用户点击播放按钮操作,实现对页面的播放状态的控制
  handlePlay(){
    /*
      如果当前背景音频处于播放状态,那么就要暂停音频
      如果当前背景音频处于暂停状态,那么就要播放音频
     */

    // const backgroundAudioManager = wx.getBackgroundAudioManager();
    if(this.data.isPlay){
      this.backgroundAudioManager.pause();


      // 1.缓存当前正在播放的歌曲的状态
      appInstance.globalData.playState = false;

      // 此处不需要缓存歌曲的id,因为能进入到这里,说明已经经过了播放歌曲的逻辑

    } else {
      this.backgroundAudioManager.src = this.data.musicUrl;
      this.backgroundAudioManager.title = this.data.songObj.name;

      // 1.缓存当前正在播放的歌曲的状态
      appInstance.globalData.playState = true;

      // 2.缓存当前正在播放的歌曲的id
      appInstance.globalData.audioId = this.data.songObj.id;
    }

    this.setData({
      isPlay:!this.data.isPlay
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    /*
      小程序接收路由传参的数据,需要通过onLoad的形参options获取,options是一个query对象
     */

    // console.log('options', options)
    const { songId } = options;
    // console.log('songId', songId)
    // console.log('song', JSON.parse(song))
    this.setData({
      songId
    })

    // const result = await req('/song/detail',{ids:songId});
    // this.setData({
    //   songObj:result.songs[0]
    // })

    // // 动态设置当前页面导航栏标题
    // wx.setNavigationBarTitle({
    //   title: this.data.songObj.name
    // })

    this.getMusicDetail();

    // const result1 = await req('/song/url', { id: songId });
    // this.setData({
    //   musicUrl: result1.data[0].url
    // })

    this.getMusicUrl();

    // 以下代码用于测试小程序全局对象传参
    // console.log('appInstance1', appInstance.a.msg)
    // appInstance.globalData.msg = "我是全局修改之后的数据"
    // console.log('appInstance2', appInstance.globalData.msg)

    this.backgroundAudioManager = wx.getBackgroundAudioManager();

    // 用于获取当前背景音频的歌曲信息和播放状态
    const {audioId,playState} = appInstance.globalData;
    // console.log(songId,audioId, playState)
    if (audioId === songId*1 && playState){
      this.setData({
        isPlay:true
      })
    }

    // console.log('PubSub', PubSub)
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