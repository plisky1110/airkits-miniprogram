const { airports } = require("../../data/static-data")

function matches(item, keyword) {
  if (!keyword) return true
  const value = keyword.trim().toLowerCase()
  return [
    item.nameCn,
    item.nameEn,
    item.city,
    item.province,
    item.district,
    item.iataCode,
    item.icaoCode,
    item.phone,
    item.category,
    ...(item.keywords || [])
  ].some((field) => String(field || "").toLowerCase().includes(value))
}

Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    keyword: "",
    activeCategory: "全部",
    categories: [
      { name: "全部", active: true },
      { name: "大型枢纽", active: false },
      { name: "省会机场", active: false },
      { name: "支线机场", active: false }
    ],
    airports,
    filteredAirports: airports
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    const menuButton = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const navHeight = menuButton.bottom + menuButton.top - statusBarHeight
    this.setData({ statusBarHeight, navHeight })
  },

  onInput(event) {
    this.setData({ keyword: event.detail.value }, this.filter)
  },

  clearKeyword() {
    this.setData({ keyword: "" }, this.filter)
  },

  selectCategory(event) {
    const activeCategory = event.currentTarget.dataset.category
    this.setData({
      activeCategory,
      categories: this.data.categories.map((item) => ({
        ...item,
        active: item.name === activeCategory
      }))
    }, this.filter)
  },

  filter() {
    const { keyword, activeCategory } = this.data
    const filteredAirports = airports.filter((item) => {
      const categoryMatched = activeCategory === "全部" || item.category === activeCategory
      return categoryMatched && matches(item, keyword)
    })
    this.setData({ filteredAirports })
  },

  callPhone(event) {
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.phone
    })
  },

  goHome() {
    wx.reLaunch({
      url: "/pages/home/home"
    })
  },

  openAbout() {
    wx.navigateTo({ url: "/pages/about/about" })
  }
})
