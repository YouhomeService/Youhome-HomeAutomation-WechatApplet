var flag = true;
Page({
  data: {
    items: [{
      url: 'https://s7.postimg.cc/yhiy9om2z/image.jpg',
      text: '—— 卧 室 ——',
      // id: 数据库里每个场景的标识id
      id: '01'
    }, {
      url: 'https://s7.postimg.cc/9zqulloln/image.jpg',
      text: '—— 客 厅 ——',
      id: '02'
    }, {
        url: 'https://s7.postimg.cc/xdytxcbm3/image.jpg',
      text: '—— 厨 房 ——',
      id: '03'
    }],
    // text:"这是一个页面"
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
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})