var app = getApp()
var requests = require('../../request/request.js');

var arr_state = ["无日志", "12:27点击", "设备已离线"]
var arr_name = ["米家人体传感器", "米家无线开关", "米家温湿度传感器"]
var eq_state = ["", "", "", "设备已离线", "设备已离线"]

Page({
  data: {
    deviceId: '',
    navbar: ['网关', '智能', '设备'],
    currentTab: 0,
    lightcolor: '#ffffff',
    state_text: '开灯',
    flag: 0,
    items: [{
      id: "1",
      src: "../../images/equipment/body_sensor.jpg",
      text: arr_name[0],
      state: arr_state[0]
    }, {
      id: "2",
      src: "../../images/equipment/Aqara_wall_switch.jpg",
      text: arr_name[1],
      state: arr_state[1]
    }, {
      id: "3",
      src: "../../images/equipment/temperature_sensor.jpg",
      text: arr_name[2],
      state: arr_state[2]
    }],

    eq_items: [{
      id: "1",
      src: "../../images/equipment/gateway.jpg",
      text: "多功能网关",
      state: eq_state[0]
    }, {
      id: "2",
      src: "../../images/equipment/smart_socket.jpg",
      text: "米家智能插座",
      state: eq_state[1]
    }, {
      id: "3",
      src: "../../images/equipment/wireless_switch.jpg",
      text: "米家无线开关",
      state: eq_state[2]
    }, {
      id: "4",
      src: "../../images/equipment/temperature_sensor.jpg",
      text: "米家温湿度传感器",
      state: eq_state[3]
    }, {
      id: "5",
      src: "../../images/equipment/body_sensor.jpg",
      text: "米家人体传感器",
      state: eq_state[4]
    }],
  },
  
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  changeColor: function(e) {
    var it = this.data.flag;
    if (it == 0) {
      this.setData({
        state_text: '关灯',
        flag: 1
      });
    }
    this.setData({
      lightcolor: e.currentTarget.dataset.colorid,
    })
  },
  changeState: function (e) {
    var it = this.data.flag;
    if (it == 0) {
      requests.changeDeviceState(this.data.deviceId, 'turn_on');
      requests.requestSearchDeviceState(this.data.deviceId, (data) => {
        if (data.length == 0) {
          wx.showModal({
            title: '网关未连接，不可用'
          })
        } else {
          console.log('当前状态：'+data.state)
          if (data.state == 'on') {
            this.setData({
              state_text: '关灯',
              flag: 1
            })
          } else if (data.state == 'off') {
            this.setData({
              state_text: '开灯',
              flag: 0,
              lightcolor: '#ffffff'
            })
          }
        }
      })
      /*
      this.setData({
        state_text: '关灯',
        flag: 1
      });
      */
    } else {
      requests.changeDeviceState(this.data.deviceId, 'turn_off');
      requests.requestSearchDeviceState(this.data.deviceId, (data) => {
        if (data.length == 0) {
          wx.showModal({
            title: '网关未连接，不可用'
          })
        } else {
          console.log('当前状态：'+data.state)
          if (data.state == 'on') {
            this.setData({
              state_text: '关灯',
              flag: 1
            })
          } else if (data.state == 'off') {
            this.setData({
              state_text: '开灯',
              flag: 0,
              lightcolor: '#ffffff'
            })
          }
        }
      })
      /*
      this.setData({
        state_text: '开灯',
        flag: 0,
        lightcolor: '#ffffff'
      });
      */
    }
  },
  add_equitment: function () {
    wx.navigateTo({
      url: '../addNewEq/index'
    })
  },
  //暂时用来调试页面
  go_temp: function () {
    wx.navigateTo({
      url: '../smart_socket/index'
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    this.setData({
      deviceId: id
    })
    // console.log(this.data.deviceId);
    requests.requestSearchDeviceState(id, (data) => {
      if (data.length == 0) {
        wx.showModal({
          title: '网关未连接，不可用'
        })
      } else {
        console.log('当前状态：'+data.state)
        if (data.state == 'on') {
          this.setData({
            state_text: '关灯',
            flag: 1
          })
        } else if (data.state == 'off') {
          this.setData({
            state_text: '开灯',
            flag: 0,
            lightcolor: '#ffffff'
          })
        }
      }
    })
  }
})

