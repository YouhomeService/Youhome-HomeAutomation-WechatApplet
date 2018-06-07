var requests = require('../../request/request.js');

Page({
  data: {
    list: [], //请求到的数据
    searchKey: null //搜索关键字
  },

  //搜索输入框输入取值
  searchInputEvent: function (e) {
    this.setData({ searchKey: e.detail.value });
  },

  //搜索按钮点击事件
  searchClickEvent: function (e) {
    if (!this.data.searchKey) {
      return;
    }
    requestData.call(this);
  },
});

/**
 * 请求用户信息
 */
function requestData() {
  var _this = this;
  var q = this.data.searchKey;

  requests.requestSearchUser(q, (data) => {
    // console.log(data.length)
    if (data.length == 0) {
      // 没有记录
      console.log('查无此人')
    } else {
      console.log('查有此人')
    }
  });

  requests.requestSearchRooms(q, (data) => {
    // console.log(data.length)
    if (data.length == 0) {
      // 没有记录
      console.log('未添加任何房间')
    } else {
      console.log('已添加房间')
    }
  });

  requests.requestSearchDevices(1, (data) => {
    // console.log(data.length)
    if (data.length == 0) {
      // 没有记录
      console.log('未添加任何设备')
    } else {
      console.log('已添加设备')
    }
  });

  requests.requestSearchDeviceName(1, (data) => {
    // console.log(data.length)
    if (data.length == 0) {
      // 没有记录
      console.log('未添加该设备')
    } else {
      console.log('设备名称')
    }
  });

  requests.requestSearchDeviceState(1, (data) => {
    // console.log(data.length)
    if (data.length == 0) {
      // 没有记录 
      console.log('未添加该设备')
    } else {
      console.log('设备状态')
    }
  });
  
  //requests.requestSearchAllDevice('');
  //requests.addDevice('light.gateway_light_7811dce1bbf3', '多功能网关', '22');
  //requests.deleteDevice("29");
  //requests.changeDeviceState('33', 'turn_off');
  // requests.updateUserInfo("1533", "王小明");
  // console.log(decodeURIComponent('%E7%8E%8B%E5%B0%8F%E6%98%8E'));
  // requests.createRoom("1533", "bedroom");
  requests.deleteRoom("29");
  requests.deleteRoom("30");
}

