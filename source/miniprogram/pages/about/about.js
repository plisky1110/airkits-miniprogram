Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    const menuButton = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const navHeight = menuButton.bottom + menuButton.top - statusBarHeight
    this.setData({ statusBarHeight, navHeight })
  },

  goHome() {
    wx.reLaunch({ url: "/pages/home/home" })
  }
})
