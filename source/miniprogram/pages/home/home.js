Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    tools: [
      { title: "航空公司", desc: "代码与电话查询", iconClass: "icon-plane-takeoff", url: "/pages/airline-info/airline-info" },
      { title: "机场信息", desc: "代码与客服查询", iconClass: "icon-plane", url: "/pages/airport-info/airport-info" },
      { title: "城市时间", desc: "常用城市时间查询", iconClass: "icon-clock", url: "/pages/city-time/city-time" },
      { title: "汇率换算", desc: "常用币种汇率计算", iconClass: "icon-currency", url: "/pages/currency/currency" }
    ]
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    const menuButton = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const navHeight = menuButton.bottom + menuButton.top - statusBarHeight
    this.setData({ statusBarHeight, navHeight })
  },

  navigate(event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  },

  openAbout() {
    wx.navigateTo({ url: "/pages/about/about" })
  }
})
