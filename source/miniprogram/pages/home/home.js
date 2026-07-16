const TOOL_SLOTS = [
  { left: 0, top: 0 },
  { left: 355, top: 0 },
  { left: 0, top: 334 },
  { left: 355, top: 334 }
]

Page({
  data: {
    statusBarHeight: 0,
    navHeight: 0,
    draggingIndex: -1,
    tools: [
      { title: "航空公司", desc: "代码与电话查询", iconClass: "icon-plane-takeoff", url: "/pages/airline-info/airline-info", left: 0, top: 0 },
      { title: "机场信息", desc: "代码与客服查询", iconClass: "icon-plane", url: "/pages/airport-info/airport-info", left: 355, top: 0 },
      { title: "城市时间", desc: "常用城市时间查询", iconClass: "icon-clock", url: "/pages/city-time/city-time", left: 0, top: 334 },
      { title: "汇率换算", desc: "常用币种汇率计算", iconClass: "icon-currency", url: "/pages/currency/currency", left: 355, top: 334 }
    ],
    touch: null
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    const menuButton = wx.getMenuButtonBoundingClientRect()
    const statusBarHeight = systemInfo.statusBarHeight || 0
    const navHeight = menuButton.bottom + menuButton.top - statusBarHeight
    const savedTools = wx.getStorageSync("airkits-home-tool-positions")
    const tools = this.restorePositions(savedTools)
    this.setData({ statusBarHeight, navHeight, tools })
  },

  restorePositions(savedTools) {
    if (!Array.isArray(savedTools) || savedTools.length !== this.data.tools.length ||
      savedTools.some((position) => !TOOL_SLOTS.some((slot) => slot.left === position.left && slot.top === position.top))) {
      return this.data.tools
    }
    return this.data.tools.map((tool, index) => ({
      ...tool,
      left: Number.isFinite(savedTools[index].left) ? savedTools[index].left : tool.left,
      top: Number.isFinite(savedTools[index].top) ? savedTools[index].top : tool.top
    }))
  },

  onTouchStart(event) {
    const index = Number(event.currentTarget.dataset.index)
    const touch = event.touches[0]
    this.pendingTouch = { index, startX: touch.pageX, startY: touch.pageY }
    clearTimeout(this.longPressTimer)
    this.longPressTimer = setTimeout(() => {
      if (!this.pendingTouch) return
      this.setData({ draggingIndex: index })
      this.data.touch = {
        index,
        startX: touch.pageX,
        startY: touch.pageY,
        left: this.data.tools[index].left,
        top: this.data.tools[index].top,
        moved: false
      }
    }, 350)
  },

  onTouchMove(event) {
    const touchState = this.data.touch
    const touch = event.touches[0]
    if (!touchState) {
      const pendingTouch = this.pendingTouch
      if (pendingTouch && (Math.abs(touch.pageX - pendingTouch.startX) > 10 || Math.abs(touch.pageY - pendingTouch.startY) > 10)) {
        clearTimeout(this.longPressTimer)
        this.pendingTouch = null
      }
      return
    }
    const scale = 750 / wx.getSystemInfoSync().windowWidth
    const deltaX = (touch.pageX - touchState.startX) * scale
    const deltaY = (touch.pageY - touchState.startY) * scale
    const left = Math.max(0, Math.min(355, touchState.left + deltaX))
    const top = Math.max(0, Math.min(334, touchState.top + deltaY))
    touchState.moved = touchState.moved || Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3
    this.setData({ [`tools[${touchState.index}].left`]: left, [`tools[${touchState.index}].top`]: top })
  },

  onTouchEnd() {
    clearTimeout(this.longPressTimer)
    this.pendingTouch = null
    const touchState = this.data.touch
    if (!touchState) return
    if (touchState.moved) {
      const draggedTool = this.data.tools[touchState.index]
      const targetSlot = TOOL_SLOTS.reduce((closest, slot) => {
        const distance = Math.hypot(draggedTool.left - slot.left, draggedTool.top - slot.top)
        return distance < closest.distance ? { slot, distance } : closest
      }, { slot: TOOL_SLOTS[0], distance: Infinity }).slot
      const targetIndex = this.data.tools.findIndex((tool) => tool.left === targetSlot.left && tool.top === targetSlot.top)
      const nextTools = this.data.tools.map((tool, index) => {
        if (index === touchState.index) {
          return { ...tool, left: targetSlot.left, top: targetSlot.top }
        }
        if (index === targetIndex) {
          return { ...tool, left: touchState.left, top: touchState.top }
        }
        return tool
      })
      this.suppressTap = true
      this.setData({ tools: nextTools })
      wx.setStorageSync("airkits-home-tool-positions", nextTools.map(({ left, top }) => ({ left, top })))
    }
    this.data.touch = null
    this.setData({ draggingIndex: -1 })
  },

  onTouchCancel() {
    clearTimeout(this.longPressTimer)
    this.pendingTouch = null
    this.data.touch = null
    this.setData({ draggingIndex: -1 })
  },

  navigate(event) {
    if (this.suppressTap) {
      this.suppressTap = false
      return
    }
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  },

  openAbout() {
    wx.navigateTo({ url: "/pages/about/about" })
  }
})
