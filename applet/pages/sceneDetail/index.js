// 获取应用实例
var app = getApp()
var requests = require('../../request/request.js');

// 这里应该根据传送进来的不同场景id，读取对应的设备
var arr_name = ["多功能网关", "空调伴侣", "墙壁开关", "人体传感器"]
var arr_state = ["正在工作", "已关闭", "设备离线"]
var arr_icon = ["../../images/work.png", "../../images/rest.png"]

Page({
  data: {
    items: [
      /*
      {
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
    }
    */
    ],
    state: [],
    scene_id: '',
    scene_url: '',
    humidity_id: '',
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

    requests.requestSearchDevices(id, (data) => {
      if (data.length == 0) {
        // 没有记录
        console.log('未添加任何设备')
      } else {
        var new_data = [];
        // 将deviceName解码为中文
        for (var i = 0; i < data.length; i++) {
          data[i].deviceName = decodeURIComponent(data[i].deviceName);
          if (data[i].entityId == "sensor.humidity_158d000222c6da") {
            this.setData({
              humidity_id: data[i].deviceId
            });
          } else {
            new_data.push(data[i]);
          }
        }
        this.setData({
          items: new_data
        });
        // 查找每个设备对应的当前状态
        for (var j = 0; j < new_data.length; j++) {
          requests.requestSearchDeviceState(new_data[j].deviceId, (data) => {
            if (data.length == 0) {
              // console.log('未添加该设备')
              var temp = this.data.state;
              temp.push({ deviceState: "设备离线", icon: "../../images/rest.png"});
              this.setData({
                state: temp
              });
              // console.log(this.data.state)
            } else {
              var temp = this.data.state;
              temp.push({ deviceState: "已连接", icon: "../../images/work.png" });
              this.setData({
                state: temp
              });
            }
          })
        }
      }
    });
  },

  addNewEq: function () {
    wx.navigateTo({
      url: '../addNewEq/index?id=' + this.data.scene_id
    })
  },

  // 点击设备，进入相应界面
  gotoDevice: function (event) {
    var name = event.currentTarget.dataset.name;
    var id = event.currentTarget.dataset.id;
    switch (name) {
      case "多功能网关":
        wx.navigateTo({
          url: '../gateway/index?id=' + id
        })
        break;
      case "温湿度传感器":
        wx.navigateTo({
          url: '../temperature_sensor/index?id=' + id + '&otherId=' + this.data.humidity_id
        })
        break;
      case "人体传感器":
        wx.navigateTo({
          url: '../gateway/index?id=' + id
        })
        break;
      case "无线开关":
        wx.navigateTo({
          url: '../gateway/index?id=' + id
        })
        break;
      case "智能插座":
        wx.navigateTo({
          url: '../smart_socket/index?id=' + id
        })
        break;
      default :
        return;
    }
  },
});
