export default function(){
  const cookie = wx.getStorageSync('cookie');
  if (!cookie) {
    wx.showModal({
      title: "请先登录",
      content: "该功能需要登录之后才能使用",
      confirmText: "去登录",
      cancelText: "回到首页",
      success: ({ confirm }) => {
        // 无论点击确定还是取消按钮都会触发成功回调函数
        // console.log('success', data)
        if (confirm) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      },
      fail: () => {
        console.log('fail')
      }
    })
    return false;
  }
  return true;
}