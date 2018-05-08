// 获取应用实例
var app = getApp()

// 这里应该根据传送进来的不同场景id，读取对应的设备
var arr_name = ["多功能网关", "空调伴侣", "墙壁开关", "人体传感器"]
var arr_state = ["正在工作", "已关闭", "设备离线"]
var arr_icon = ["../../images/work.png", "../../images/rest.png"]

Page({
  data: {
    items: [{
      id: "1",
      src: "../../images/equipment/gateway.jpg",
      text: arr_name[0],
      state: arr_state[0],
      icon: arr_icon[0]
    }, {
      id: "2",
      src: "../../images/equipment/air_condition.jpg",
      text: arr_name[1],
      state: arr_state[1],
      icon: arr_icon[1]
    }, {
      id: "3",
      src: "../../images/equipment/Aqara_wall_switch.jpg",
      text: arr_name[2],
      state: arr_state[2],
      icon: arr_icon[1]
    }, {
      id: "4",
      src: "../../images/equipment/body_sensor.jpg",
      text: arr_name[3],
      state: arr_state[1],
      icon: arr_icon[1]
    }],
    scene_id: '',
    scene_url: '',
    color: "window"
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var url = options.url;
    this.setData({
      scene_id: id,
      scene_url: url
    })
  },

  addNewEq: function () {
    wx.navigateTo({
      url: '../addNewEq/index'
    })
  }
})