Page({
  data: {
    scene_id: ''
  },
  
  scan: function () {
    wx.navigateTo({
      url: '../addEq_1/index?id=' + this.data.scene_id
    })
  },

  hand: function () {
    wx.navigateTo({
      url: '../addEq_2/index?id=' + this.data.scene_id
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    this.setData({
      scene_id: id
    })
  }
})