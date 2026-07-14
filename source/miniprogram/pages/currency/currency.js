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

function formatInputMoney(value) {
  const text = String(value == null ? "" : value)
  if (!text || text === ".") return "0.00"
  const numberValue = Number(text)
  if (!Number.isFinite(numberValue)) return "0.00"
  return numberValue.toFixed(2)
}

Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    amount: "1000.00",
    amountDisplay: "1000.00",
    fromIndex: 0,
    toIndex: 1,
    currencies,
    fromCurrency: currencies[0],
    toCurrency: currencies[1],
    result: "137.46",
    resultDisplay: "137.46",
    commonRates: [],
    keypadExpanded: false,
    activeField: "amount",
    replaceOnNextKey: false,
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
    const amount = event.detail.value
    this.setData({ amount, amountDisplay: formatInputMoney(amount) }, this.calculate)
  },

  onAmountBlur() {
    const amountValue = Number(this.data.amount || 0)
    this.setData({
      amount: Number.isFinite(amountValue) ? amountValue.toFixed(2) : "0.00",
      amountDisplay: Number.isFinite(amountValue) ? amountValue.toFixed(2) : "0.00"
    }, this.calculate)
  },

  onResultInput(event) {
    const result = event.detail.value
    const resultValue = Number(result || 0)
    const from = currencies[this.data.fromIndex]
    const to = currencies[this.data.toIndex]
    const amount = resultValue * to.sampleRateToCny / from.sampleRateToCny

    this.setData({
      result,
      resultDisplay: formatInputMoney(result),
      amount: Number.isFinite(amount) ? amount.toFixed(2) : "0.00"
    })
  },

  onResultBlur() {
    const resultValue = Number(this.data.result || 0)
    this.setData({
      result: Number.isFinite(resultValue) ? resultValue.toFixed(2) : "0.00",
      resultDisplay: Number.isFinite(resultValue) ? resultValue.toFixed(2) : "0.00"
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
    const field = this.data.activeField
    let value = this.data[field] || ""
    const shouldReplace = this.data.replaceOnNextKey && key !== "⌫"

    if (shouldReplace) {
      value = key === "." ? "0." : key
    } else if (key === "⌫") {
      if (value === "0" || value === "0.00") {
        value = "0.00"
      } else {
        value = value.slice(0, -1) || "0.00"
      }
    } else if (key === "." && value.includes(".")) {
      return
    } else if (value.includes(".") && value.split(".")[1].length >= 2) {
      return
    } else {
      value = value === "0" && key !== "." ? key : value + key
    }

    if (field === "result") {
      const resultValue = Number(value || 0)
      const from = currencies[this.data.fromIndex]
      const to = currencies[this.data.toIndex]
      const amount = resultValue * to.sampleRateToCny / from.sampleRateToCny
      this.setData({
        result: value,
        resultDisplay: formatInputMoney(value),
        amount: Number.isFinite(amount) ? amount.toFixed(2) : "0.00",
        amountDisplay: Number.isFinite(amount) ? amount.toFixed(2) : "0.00",
        replaceOnNextKey: value === "0.00"
      })
      return
    }

    this.setData({
      amount: value,
      amountDisplay: formatInputMoney(value),
      replaceOnNextKey: value === "0.00"
    }, this.calculate)
  },

  toggleKeypad() {
    this.setData({ keypadExpanded: !this.data.keypadExpanded })
  },

  showKeypad() {
    this.setData({ keypadExpanded: true, activeField: "amount", replaceOnNextKey: true })
  },

  selectAmount() {
    this.setData({ keypadExpanded: true, activeField: "amount", replaceOnNextKey: true })
  },

  selectResult() {
    this.setData({ keypadExpanded: true, activeField: "result", replaceOnNextKey: true })
  },

  hideKeypad() {
    if (this.data.keypadExpanded) {
      this.setData({ keypadExpanded: false })
    }
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
      resultDisplay: result,
      amountDisplay: formatInputMoney(this.data.amount),
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
