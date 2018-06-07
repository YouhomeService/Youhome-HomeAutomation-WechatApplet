var api = require('./api.js');
var utils = require('../utils/util.js');

/**
 * 网路请求 : GET
 */
function request(url, data, successCb, errorCb, completeCb) {
  wx.request({
    url: url + data,
    method: 'GET',
    success: function (res) {
      console.log(res.data)
      utils.isFunction(successCb) && successCb(res.data);
    },
    fail: function (err) {
      console.log(err)
      utils.isFunction(errorCb) && errorCb();
    },
    // complete 调用接口结束之后的回调，无论成功或者失败该接口都会被调用
    complete: function () {
      utils.isFunction(completeCb) && completeCb();
    }
  });
}

/**
 * 根据用户ID，获取该用户信息
 */
function requestSearchUser(data, successCb, errorCb, completeCb) {
  request(api.API_USER_SEARCH, data, successCb, errorCb, completeCb);
}

/**
 * 根据用户ID，获取该用户当前所拥有的房间信息
 */
function requestSearchRooms(data, successCb, errorCb, completeCb) {
  request(api.API_ROOM_SEARCH, data, successCb, errorCb, completeCb);
}

/**
 * 根据房间ID，获取该房间当前所拥有的设备信息
 */
function requestSearchDevices(data, successCb, errorCb, completeCb) {
  request(api.API_DEVICE_SEARCH, data, successCb, errorCb, completeCb);
}

/**
 * 根据设备ID，获取该设备的名字
 */
function requestSearchDeviceName(data, successCb, errorCb, completeCb) {
  request(api.API_DEVICE_NAME_SEARCH, data, successCb, errorCb, completeCb);
}

/**
 * 根据设备ID，获取该设备当前的状态
 */
function requestSearchDeviceState(data, successCb, errorCb, completeCb) {
  request(api.API_DEVICE_STATE_SEARCH, data, successCb, errorCb, completeCb);
}

/**
 * 获取目前我们所拥有的设备
 */
function requestSearchAllDevice(data, successCb, errorCb, completeCb) {
  request(api.API_DEVICE_ALL, data, successCb, errorCb, completeCb);
}

/**
 * 网路请求 : POST
 */

/**
 * 用户登录
 */
function userLogin(code, successCb, errorCb, completeCb) {
  wx.request({
    url: api.API_USER_LOGIN,
    method: 'POST',
    header: {
      "content-type": 'application/json'
    },
    data: {
      code: code
    },
    success: function (res) {
      console.log('login success: ' + res.data)
      utils.isFunction(successCb) && successCb(res.data);
    },
    fail: function (err) {
      console.log('login fail: ' + err)
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      console.log('login complete')
      utils.isFunction(completeCb) && completeCb();
    }
  });
}

/**
 * 输入用户ID与新名称，更改该用户信息
 */
function updateUserInfo(userId, userName, successCb, errorCb, completeCb) {
  wx.request({
    url: api.API_UPDATE_USER,
    method: 'POST',
    header: {
      "content-type": 'application/json'
    },
    data: {
      userId: userId,
      // 采用encodeURIComponent对中文房间名称进行编码
      userName: encodeURIComponent(userName)
    },
    success: function (res) {
      console.log('submit success: ' + res.data)
      utils.isFunction(successCb) && successCb(res.data);
    },
    fail: function (err) {
      console.log('submit fail: ' + err)
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      console.log('submit complete')
      utils.isFunction(completeCb) && completeCb();
    }
  });
}

/**
 * 输入用户ID、房间名称、图片url，创建新房间
 */
function createRoom(userId, roomName, url, successCb, errorCb, completeCb) {
  wx.request({
    url: api.API_CREATE_ROOM,
    method: 'POST',
    header: {
      "content-type": 'application/json'
    },
    data: {
      userId: userId,
      // 采用encodeURIComponent对中文房间名称进行编码
      roomName: encodeURIComponent(roomName),
      url: url
    },
    success: function (res) {
      console.log('submit success: ' + res.data)
      utils.isFunction(successCb) && successCb(res.data);
    },
    fail: function (err) {
      console.log('submit fail: ' + err)
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      console.log('submit complete')
      utils.isFunction(completeCb) && completeCb();
    }
  });
}

/**
 * 输入房间ID，删除该房间
 */
function deleteRoom(roomId, successCb, errorCb, completeCb) {
  wx.request({
    url: api.API_DELETE_ROOM,
    method: 'POST',
    header: {
      "content-type": 'application/json'
    },
    data: {
      roomId: roomId
    },
    success: function (res) {
      console.log('submit success: ' + res.data)
      utils.isFunction(successCb) && successCb(res.data);
    },
    fail: function (err) {
      console.log('submit fail: ' + err)
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      console.log('submit complete')
      utils.isFunction(completeCb) && completeCb();
    }
  });
}

/**
 * 输入房间ID，设备实体ID，设备名字，图片url，添加该设备，返回设备ID
 */
function addDevice(entityId, deviceName, roomId, url, successCb, errorCb, completeCb) {
  wx.request({
    url: api.API_ADD_DEVICE,
    method: 'POST',
    header: {
      "content-type": 'application/json'
    },
    data: {
      entityId: entityId,
      deviceName: encodeURIComponent(deviceName),
      roomId: roomId,
      url: url
    },
    success: function (res) {
      console.log('submit success: ' + res.data)
      utils.isFunction(successCb) && successCb(res.data);
    },
    fail: function (err) {
      console.log('submit fail: ' + err)
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      console.log('submit complete')
      utils.isFunction(completeCb) && completeCb();
    }
  });
}

/**
 * 输入设备ID，删除该设备
 */
function deleteDevice(deviceId, successCb, errorCb, completeCb) {
  wx.request({
    url: api.API_DELETE_DEVICE,
    method: 'POST',
    header: {
      "content-type": 'application/json'
    },
    data: {
      deviceId: deviceId
    },
    success: function (res) {
      console.log('submit success: ' + res.data)
      utils.isFunction(successCb) && successCb(res.data);
    },
    fail: function (err) {
      console.log('submit fail: ' + err)
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      console.log('submit complete')
      utils.isFunction(completeCb) && completeCb();
    }
  });
}

/**
 * 输入设备ID，operation，改变设备开关状态（现在只⽀持“turn_on”和"turn_off"）
 */
function changeDeviceState(deviceId, operation, successCb, errorCb, completeCb) {
  wx.request({
    url: api.API_DEVICE_STATE_CHANGE,
    method: 'POST',
    header: {
      "content-type": 'application/json'
    },
    data: {
      deviceId: deviceId,
      operation: operation
    },
    success: function (res) {
      console.log('submit success: ' + res.data.length)
      utils.isFunction(successCb) && successCb(res.data);
      // 不成功就一直回调
      if (res.data.length == 0) {
        changeDeviceState(deviceId, operation)
      }
    },
    fail: function (err) {
      console.log('submit fail: ' + err)
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      console.log('submit complete')
      utils.isFunction(completeCb) && completeCb();
    }
  });
}

module.exports = {
  requestSearchUser: requestSearchUser,
  requestSearchRooms: requestSearchRooms,
  requestSearchDevices: requestSearchDevices,
  requestSearchDeviceName: requestSearchDeviceName,
  requestSearchDeviceState: requestSearchDeviceState,
  userLogin: userLogin,
  updateUserInfo: updateUserInfo,
  createRoom: createRoom,
  deleteRoom: deleteRoom,
  requestSearchAllDevice: requestSearchAllDevice,
  addDevice: addDevice,
  deleteDevice: deleteDevice,
  changeDeviceState: changeDeviceState
}