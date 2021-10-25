import req from '../../utils/req.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于展示页面的轮播图数据
    banners:[],

    // 用于展示页面的推荐歌曲区域数据
    recommendlist:[],

    // 用于展示排行榜区域数据
    topList:[]
  },
  
  // 用于监视用户点击每日推荐按钮,跳转到每日推荐页面
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    /*
      1.在哪发
        mounted,created
        选择使用onLoad发送请求

      2.怎么发
        语法:wx.request(Object object)

        小程序中无法使用axios
        注意:小程序中window不是全局对象,值为undefined
            小程序中的全局对象是wx

      3.往哪发
        看接口文档
          请求三要素:
            1.请求地址
            2.请求参数
            3.请求方式
    
     */

    // console.log('window', window)
    // console.log('wx', wx)

    // console.log(1)
    // wx.request({
    //   url:"http://localhost:3000/banner",
    //   data:{
    //     type:2
    //   },
    //   success:(res)=>{
    //     // console.log(res)
    //     // 获取到响应体数据:res.data
    //     this.setData({
    //       banners:res.data.banners
    //     })
    //   }
    // })
    // console.log(111,req("/banner", {type:2}));

    // const result = await req("/banner", { type: 2 });
    // // console.log(result)
    // this.setData({
    //   banners: result.banners
    // })

    req("/banner", { type: 2 })
      .then((result) => {
        this.setData({
          banners: result.banners
        })
    })

    req("/personalized")
      .then((result2)=>{
      this.setData({
        recommendList: result2.result
      })
    })
    // wx.request({
    //   url: "http://localhost:3000/personalized",
    //   success: (res) => {
    //     console.log(res)
    //     // 获取到响应体数据:res.data
    //     // this.setData({
    //     //   banners: res.data.banners
    //     // })
    //   }
    // })
    // console.log(2)

    const arr = [1,4,8,16,22];
    const topList = [];
    let index = 0;

    // while (index<arr.length) {
    //   const result3 = await req("/top/list", { idx: arr[index++] });
    //   const obj = {
    //     name: result3.playlist.name,
    //     id: result3.playlist.id,
    //     list: result3.playlist.tracks.slice(0, 3).map(function (item) {
    //       return item.al
    //     })
    //   }
    //   topList.push(obj);
    //   this.setData({
    //     topList
    //   })
    // }


    while (index < arr.length) {
      req("/top/list", { idx: arr[index++] })
        .then((result3) => {
          const obj = {
            name: result3.playlist.name,
            id: result3.playlist.id,
            list: result3.playlist.tracks.slice(0, 3).map(function (item) {
              return item.al
            })
          }
          topList.push(obj);
          this.setData({
            topList
          })
      })
    }
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