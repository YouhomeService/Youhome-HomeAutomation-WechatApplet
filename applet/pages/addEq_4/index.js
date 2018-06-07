/**
 * 有个麻烦就是 温度和湿度要合并为一个设备 所以代码有点乱
 */

var requests = require('../../request/request.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scene_id: '',
    sevice_entityId: '',
    checked_index: '',
    items: [],
    chin_items: []
  },

  radioChange: function (e) {
    switch (e.detail.value) {
      case '温湿度传感器':
        this.setData({
          sevice_entityId: 'sensor.temperature_158d000222c6da'
        })
        break;
      case '人体传感器':
        this.setData({
          sevice_entityId: 'binary_sensor.motion_sensor_158d0002480a33'
        })
        break;
      case '多功能网关':
        this.setData({
          sevice_entityId: 'light.gateway_light_7811dce1bbf3'
        })
        break;
      case '无线开关':
        this.setData({
          sevice_entityId: 'binary_sensor.switch_158d0002519297'
        })
        break;
      case '智能插座':
        this.setData({
          sevice_entityId: 'switch.plug_158d000247e3d5'
        })
        break;
      default:
        break;
    }

  },

  addSevice: function () {
    if (this.data.sevice_entityId == '') {
      wx.showModal({
        title: '请选择要连接的智能设备'
      })
    } else {
      requests.addDevice(this.data.sevice_entityId, get_chinName(this.data.sevice_entityId), this.data.scene_id, get_url(this.data.sevice_entityId), (data) => {
        if (data.length == 0) {
          wx.showModal({
            title: '连接失败'
          })
        } else {
          wx.showToast({
            title: '连接成功',
            icon: 'success',
            duration: 1000
          })
        }
      })
      if (this.data.sevice_entityId == 'sensor.temperature_158d000222c6da') {
        requests.addDevice('sensor.humidity_158d000222c6da', get_chinName(this.data.sevice_entityId), this.data.scene_id, get_url(this.data.sevice_entityId), (data) => {
          if (data.length == 0) {
            wx.showModal({
              title: '连接失败'
            })
          } else {
            wx.showToast({
              title: '连接成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    }
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    this.setData({
      scene_id: id
    })

    requests.requestSearchAllDevice('', (data) => {
      if (data.length == 0) {
        wx.showModal({
          title: '未找到可添加的智能设备'
        })
      } else {
        this.setData({
          items: data
        })
        var temp = []
        for (var i = 0; i < data.length; i++) {
          if (get_chinName(data[i]) != 'no') {
            temp.push(get_chinName(data[i]))
          }
        }
        this.setData({
          chin_items: temp
        })
        console.log(this.data.chin_items)
      }
    })
  }
})

function get_chinName(entityId) {
  switch (entityId) {
    /*
    case 'sensor.yr_symbol':
      return "天气";
      break;
    case 'sensor.illumination_7811dce1bbf3':
      return "气压 日落日出";
      break;
    */
    case 'sensor.temperature_158d000222c6da':
      return "温湿度传感器";
      break;
    /*
    case 'sensor.humidity_158d000222c6da':
      return "温湿度传感器";
      break;
    */
    case 'switch.plug_158d000247e3d5':
      return "智能插座";
      break;
    case 'light.gateway_light_7811dce1bbf3':
      return "多功能网关";
      break;
    case 'binary_sensor.motion_sensor_158d0002480a33':
      return "人体传感器";
      break;
    case 'binary_sensor.switch_158d0002519297':
      return "无线开关";
      break;
    default:
      return "no";
      break;
  }
}

function get_url(entityId) {
  switch (entityId) {
    /*
    case 'sensor.yr_symbol':
      return "../../images/equipment/body_sensor.jpg";
      break;
    case 'sensor.illumination_7811dce1bbf3':
      return "../../images/equipment/lamp.png";
      break;
    */
    case 'sensor.temperature_158d000222c6da':
      return "../../images/equipment/temperature_sensor.jpg";
      break;
    /*
    case 'sensor.humidity_158d000222c6da':
      return "../../images/equipment/temperature_sensor.jpg";
      break;
    */
    case 'switch.plug_158d000247e3d5':
      return "../../images/equipment/smart_socket.jpg";
      break;
    case 'light.gateway_light_7811dce1bbf3':
      return "../../images/equipment/gateway.jpg";
      break;
    case 'binary_sensor.motion_sensor_158d0002480a33':
      return "../../images/equipment/body_sensor.jpg";
      break;
    case 'binary_sensor.switch_158d0002519297':
      return "../../images/equipment/wireless_switch.jpg";
      break;
    default:
      break;
  }
}