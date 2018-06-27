var requests = require('../../request/request.js');
var app = getApp()
Page({
  data: {
    s_num: 0,
    e_num: 0,
    info1: [{
      icon: '../../images/my-family.png',
      text: '关于优家'
    }, {
      icon: '../../images/my-equipment.png',
      text: '用户指南'
    }, {
      icon: '../../images/my-userlist.png',
      text: '使用记录'
    }],
    info2: [{
      icon: '../../images/my-help.png',
      text: '帮助与反馈'
    }, {
      icon: '../../images/my-setting.png',
      text: '设置'
    }]
  },

  onLoad: function () {
    requests.requestSearchRooms(getApp().data.userId, (data) => {
      this.setData({
        s_num: data.length
      });
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
        requests.requestSearchDevices(data[i].roomId, (res) => {
          sum = sum + res.length
          // console.log('a'+sum)
          // 温湿度传感器 实际上绑定了2个设备数据 但只能算作一个设备
          for (var j = 0; j < res.length; j++) {
            if (res[j].entityId == 'sensor.temperature_158d000222c6da') {
              sum = sum - 1;
            }
          }
          // console.log('b'+sum)
          this.setData({
            e_num: sum
          });
        })
      }
    });
  },

  onPullDownRefresh: function () {
    this.onLoad()
  },

  ClickEvent: function (event) {
    var name = event.currentTarget.dataset.name;
    if (name == '关于优家') {
      wx.navigateTo({
        url: '../about/index'
      })
    } else if (name == '用户指南') {
      wx.navigateTo({
        url: '../guide/index'
      })
    }
  },
})