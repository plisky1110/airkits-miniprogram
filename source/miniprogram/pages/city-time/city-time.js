const { aviationCities } = require("../../data/static-data")

function pad(value) {
  return String(value).padStart(2, "0")
}

function zonedParts(date, timezone) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  })
  const parts = formatter.formatToParts(date).reduce((result, part) => {
    if (part.type !== "literal") result[part.type] = part.value
    return result
  }, {})

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second)
  }
}

function getOffsetMinutes(date, timezone) {
  const parts = zonedParts(date, timezone)
  const zonedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  )
  return Math.round((zonedAsUtc - date.getTime()) / 60000)
}

function formatOffset(minutes) {
  const sign = minutes < 0 ? "-" : "+"
  const absolute = Math.abs(minutes)
  return `UTC${sign}${pad(Math.floor(absolute / 60))}:${pad(absolute % 60)}`
}

function formatDifference(minutes) {
  if (minutes === 0) return "与本地同一时区"
  const sign = minutes > 0 ? "+" : "-"
  const absolute = Math.abs(minutes)
  const hours = Math.floor(absolute / 60)
  const remainder = absolute % 60
  return `比本地${sign}${hours}h${remainder ? `${remainder}m` : ""}`
}

function formatCityTime(city) {
  const now = new Date()
  const parts = zonedParts(now, city.timezone)
  const offsetMinutes = getOffsetMinutes(now, city.timezone)
  const localOffsetMinutes = -now.getTimezoneOffset()

  return {
    ...city,
    timeText: `${pad(parts.hour)}:${pad(parts.minute)}:${pad(parts.second)}`,
    dateText: `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`,
    utcOffset: formatOffset(offsetMinutes),
    diffText: formatDifference(offsetMinutes - localOffsetMinutes),
    codeText: city.airportCodes.join(" / ")
  }
}

function matches(city, keyword) {
  if (!keyword) return true
  const value = keyword.trim().toLowerCase()
  return [
    city.cityCn,
    city.cityEn,
    city.countryCn,
    city.region,
    city.timezone,
    city.utcOffset,
    ...(city.airportCodes || [])
  ].some((field) => String(field || "").toLowerCase().includes(value))
}

Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    keyword: "",
    activeRegion: "全部",
    regions: [
      { name: "全部", active: true },
      { name: "亚洲", active: false },
      { name: "欧洲", active: false },
      { name: "美洲", active: false },
      { name: "中东", active: false },
      { name: "非洲", active: false },
      { name: "大洋洲", active: false }
    ],
    cities: []
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    const menuButton = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const navHeight = menuButton.bottom + menuButton.top - statusBarHeight
    this.setData({ statusBarHeight, navHeight })
    this.refresh()
    this.timer = setInterval(() => this.refresh(), 1000)
  },

  onUnload() {
    if (this.timer) clearInterval(this.timer)
  },

  onInput(event) {
    this.setData({ keyword: event.detail.value }, this.refresh)
  },

  clearKeyword() {
    this.setData({ keyword: "" }, this.refresh)
  },

  selectRegion(event) {
    const activeRegion = event.currentTarget.dataset.region
    this.setData({
      activeRegion,
      regions: this.data.regions.map((item) => ({
        ...item,
        active: item.name === activeRegion
      }))
    }, this.refresh)
  },

  refresh() {
    const { activeRegion, keyword } = this.data
    const cities = aviationCities
      .map(formatCityTime)
      .filter((city) => activeRegion === "全部" || city.region === activeRegion)
      .filter((city) => matches(city, keyword))
    this.setData({ cities })
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
