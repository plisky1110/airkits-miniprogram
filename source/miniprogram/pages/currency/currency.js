const { currencies } = require("../../data/static-data")

function convert(amount, from, to) {
  const amountValue = Number(amount || 0)
  const cny = amountValue * from.sampleRateToCny
  return cny / to.sampleRateToCny
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    amount: "1000",
    fromIndex: 0,
    toIndex: 1,
    currencies,
    fromCurrency: currencies[0],
    toCurrency: currencies[1],
    result: "137.46",
    commonRates: [],
    keypad: ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"]
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    const menuButton = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const navHeight = menuButton.bottom + menuButton.top - statusBarHeight
    this.setData({ statusBarHeight, navHeight })
    this.calculate()
  },

  onAmountInput(event) {
    this.setData({ amount: event.detail.value }, this.calculate)
  },

  onResultInput(event) {
    const result = event.detail.value
    const resultValue = Number(result || 0)
    const from = currencies[this.data.fromIndex]
    const to = currencies[this.data.toIndex]
    const amount = resultValue * to.sampleRateToCny / from.sampleRateToCny

    this.setData({
      result,
      amount: Number.isFinite(amount) ? amount.toFixed(2) : "0.00"
    })
  },

  onResultBlur() {
    const resultValue = Number(this.data.result || 0)
    this.setData({
      result: Number.isFinite(resultValue) ? resultValue.toFixed(2) : "0.00"
    })
  },

  onFromChange(event) {
    this.setData({ fromIndex: Number(event.detail.value) }, this.calculate)
  },

  onToChange(event) {
    this.setData({ toIndex: Number(event.detail.value) }, this.calculate)
  },

  swap() {
    this.setData({
      fromIndex: this.data.toIndex,
      toIndex: this.data.fromIndex
    }, this.calculate)
  },

  tapKey(event) {
    const key = event.currentTarget.dataset.key
    let amount = this.data.amount || ""
    if (key === "⌫") {
      amount = amount.slice(0, -1) || "0"
    } else if (key === "." && amount.includes(".")) {
      return
    } else {
      amount = amount === "0" && key !== "." ? key : amount + key
    }
    this.setData({ amount }, this.calculate)
  },

  calculate() {
    const from = currencies[this.data.fromIndex]
    const to = currencies[this.data.toIndex]
    const result = formatMoney(convert(this.data.amount, from, to))
    const commonRates = currencies
      .filter((item) => item.code !== from.code)
      .slice(0, 4)
      .map((item) => ({
        ...item,
        converted: `${item.symbol}${formatMoney(convert(this.data.amount, from, item))}`
      }))

    this.setData({
      fromCurrency: from,
      toCurrency: to,
      result,
      commonRates
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
