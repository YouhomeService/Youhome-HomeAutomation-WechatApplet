var requests = require('../../request/request.js');
var flag = true;
Page({
  data: {
    items: [],
    color: "window"
  },
  
  addNewScene: function () {
    wx.navigateTo({
      url: '../addNewScene/index'
    })
  },
  
  // 点击不同的view，传递不同值，跳转
  scene_detail: function (event) {
    var scene_id = event.currentTarget.dataset.id;
    var scene_url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../sceneDetail/index?id='+scene_id+"&url="+scene_url
    })
  },

  onLoad: function (options) {
  },

  onReady: function () {
    // 页面渲染完成
    requests.requestSearchRooms(getApp().data.userId, (data) => {
      // console.log(data.length)
      if (data.length == 0) {
        // 没有记录
        console.log('未添加任何房间')
      } else {
        // 先将roomName解码为中文
        for (var i = 0; i < data.length; i++)
          data[i].roomName = decodeURIComponent(data[i].roomName);
        this.setData({
          items: data
        });
      }
    });
  },
  
  onShow: function () {
    // 页面显示
    this.onReady() // 再次加载，实现返回上一页页面刷新
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh: function () {
    // 下拉刷新
    requests.requestSearchRooms(getApp().data.userId, (data) => {
      // console.log(data.length)
      if (data.length == 0) {
        console.log('未添加任何房间')
      } else {
        for (var i = 0; i < data.length; i++)
          data[i].roomName = decodeURIComponent(data[i].roomName);
        this.setData({
          items: data
        });
      }
    });
    // wx.stopPullDownRefresh()
  }
})