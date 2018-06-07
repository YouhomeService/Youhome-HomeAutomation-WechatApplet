var requests = require('../../request/request.js');

Page({
  data: {
    in_use: '当前未使用',
    deviceId: '',
    state: "开启",
    day_consume: 0.00,
    month_consume: 0.00,
    current_w: 0.00,
    item: [{
      text: "开关",
      img: "background-image: url('../../images/open.png'); background-size: contain"
    },{
      text: "定时",
      img: "background-image: url('../../images/dingshi.png'); background-size: contain"
    },{
      text: "倒计时",
      img: "background-image: url('../../images/daojishi.png'); background-size: contain"
    }]
  },

  changeState: function (event) {
    var name = event.currentTarget.dataset.name;
    if (name == '开关') {
      if (this.data.state == '关闭') {
        requests.changeDeviceState(this.data.deviceId, 'turn_on');
        requests.requestSearchDeviceState(this.data.deviceId, (data) => {
          if (data.length == 0) {
            wx.showModal({
              title: '设备未连接，不可用'
            })
          } else {
            console.log('当前状态：' + data.state)
            if (data.state == 'on') {
              this.setData({
                state: '开启'
              })
            } else if (data.state == 'off') {
              this.setData({
                state: '关闭'
              })
            }
          }
        })
      } else {
        requests.changeDeviceState(this.data.deviceId, 'turn_off');
        requests.requestSearchDeviceState(this.data.deviceId, (data) => {
          if (data.length == 0) {
            wx.showModal({
              title: '设备未连接，不可用'
            })
          } else {
            console.log('当前状态：' + data.state)
            if (data.state == 'on') {
              this.setData({
                state: '开启'
              })
            } else if (data.state == 'off') {
              this.setData({
                state: '关闭'
              })
            }
          }
        })
      }
    }
  },

  onLoad: function (options) {
    // 页面初始化options为页面跳转所带来的参数
    var id = options.id;
    this.setData({
      deviceId: id
    })

    requests.requestSearchDeviceState(id, (data) => {
      if (data.length == 0) {
        wx.showModal({
          title: '请求不到数据'
        })
      } else {
        var temp = '开启'
        var temp_2 = '当前未使用'
        if (data.state == 'on') {
          temp = '开启'
        } else {
          temp = '关闭'
        }
        if (data.attributes.in_use == '1') {
          temp_2 = '正在使用'
        } else {
          temp_2 = '当前未使用'
        }
        this.setData({
          state: temp,
          in_use: temp_2,
          month_consume: data.attributes.power_consumed,
          current_w: data.attributes.load_power
        })
      }
    })
  }
})