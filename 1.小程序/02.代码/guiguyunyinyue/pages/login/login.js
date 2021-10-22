// pages/login/login.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "17688197777",
    password: ""
  },

  // 用于监视用户点击登录按钮,实现登录功能
  async handleLogin() {
    // console.log('handleLogin')
    /*
      1.收集数据
      2.处理数据
      3.进行表单验证
        前端表单验证
        后端表单验证
      4.发送登录请求 
        请求状态码
          400 ->  手机号错误
          501 ->  帐号不存在
          502 ->  密码错误
          200 ->  登陆成功
      5.成功做什么
      6.失败做什么
    
    */

    // 1.收集数据
    let { phone, password } = this.data;

    // 2.处理数据
    phone = phone.trim();
    password = password.trim();

    if (!phone) {
      wx.showToast({
        title: "手机号不能为空"
      })
      return;
    }
    if (!password) {
      wx.showToast({
        title: "密码不能为空",
        icon: "none"
      })
      return;
    }

    const result = await req("/login/cellphone", { phone, password });
    const code = result.code;

    // if(code===200){
    //   wx.showToast({
    //     title: '登陆成功,即将跳转',
    //     icon:"none"
    //   })
    // } else if (code === 400) {
    //   wx.showToast({
    //     title: '手机号码格式错误,请检查',
    //     icon: "none"
    //   })
    // } else if (code === 501) {
    //   wx.showToast({
    //     title: '抱歉,该账号不存在',
    //     icon: "none"
    //   })
    // } else if (code === 502) {
    //   wx.showToast({
    //     title: '密码错误,请检查',
    //     icon: "none"
    //   })
    // }
    // console.log('code',code)

    // 策略模式
    const codeFn = {
      200() {
        wx.showToast({
          title: '登陆成功,即将跳转',
          icon: "none"
        });

        wx.setStorage({
          key:"userInfo",
          data: JSON.stringify(result.profile)
        })

        wx.switchTab({
          url:"/pages/personal/personal"
        })
      },
      400() {
        wx.showToast({
          title: '手机号码格式错误,请检查',
          icon: "none"
        })
      },
      501() {
        wx.showToast({
          title: '抱歉,该账号不存在',
          icon: "none"
        })
      },
      502() {
        wx.showToast({
          title: '密码错误,请检查',
          icon: "none"
        })
      }
    }

    codeFn[code] && codeFn[code]();
  },

  handlePhone(event) {
    // console.log('handlePhone',event)
    this.setData({
      phone: event.detail.value
    })
  },

  handlePassWord(event) {
    // console.log('handlePhone',event)
    this.setData({
      password: event.detail.value
    })
  },

  // 用于监视用户修改phone和password的内容,并自动修改data中对应的数据
  handleChange(event) {
    /*
      向事件回调函数内部传参
        通过事件对象event,配合组件身上的自定义属性,向回调函数中传参
        告知当前回调函数,是哪个组件触发的该事件
     */
    // console.log('handleChange', event.target.dataset.type)
    const type = event.target.dataset.type;
    this.setData({
      [type]: event.detail.value
    })

    // return function () {
    //   console.log('handleChange', event)
    // }
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