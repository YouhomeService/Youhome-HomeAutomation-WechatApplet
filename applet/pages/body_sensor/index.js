var requests = require('../../request/request.js');
var utils = require('../../utils/util.js');
var a = formatTime2("2018-06-06T06:09:38.543215")
var b = formatTime2("2018-06-06T19:09:38.543215")

// pages/test4/index.js
Page({
  data: {
    last_changed: '',
    deviceId: '',
    items: [{
      time: a,
      text: "有人经过"
    }, {
      time: b,
      text: "有人经过"
    }],
    new_items: []
  },

  onLoad: function (options) {
    // 页面初始化options为页面跳转所带来的参数
    var id = options.id;
    this.setData({
      deviceId: id
    })

    /*
    requests.requestSearchDeviceState(id, (data) => {
      if (data.length == 0) {
        wx.showModal({
          title: '请求不到数据'
        })
      } else {
        var temp = []
        temp.push({
          time: formatTime2(data.last_changed),
          text: "有人经过"})
        this.setData({
          new_items: temp
        })
      }
    })
    */

    // 查询历史记录
    requests.requestSearchDeviceHistory(id, (data) => {
      if (data.length == 0) {
        wx.showModal({
          title: '请求不到数据'
        })
      } else {
        var temp = []
        for (var i = 0; i < data[0].length; i++) {
          temp.push({
            time: formatTime2(data[0][i].last_changed),
            text: "有人经过"
          })
        }
        this.setData({
          new_items: temp
        })
      }
    })
  }

})

function formatTime2(date) {
  var year = date.substring(0, 4)
  var month = date.substring(5, 7)
  var day = date.substring(8, 10)
  var hour = date.substring(11, 13)
  if (parseInteger(hour) >= 16) {
    day = (parseInteger(day) + 1).toString();
    hour = (parseInteger(hour) + 8 - 24).toString();
  } else {
    hour = (parseInteger(hour) + 8).toString();
  }
  var minute = date.substring(14, 16)
  var second = date.substring(17, 19)

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isFunction(obj) {
  return typeof obj === 'function';
}

function parseInteger(val) {
  if (isNaN(val))
    return 0;
  return parseInt(val);
}