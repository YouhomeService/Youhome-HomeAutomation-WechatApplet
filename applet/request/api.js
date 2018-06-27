
const API_BASE = "https://youhome.xyz";

module.exports = {
  /**
   * GET
   */

  // 获取用户信息
  // case ： https://youhome.xyz/v1/users?userId=1533
  API_USER_SEARCH: API_BASE + "/v1/users?userId=",

  // 获取用户所创建的房间
  API_ROOM_SEARCH: API_BASE + "/v1/rooms?userId=",

  // 获取房间里的设备
  API_DEVICE_SEARCH: API_BASE + "/v1/devices?roomId=",

  // 获取设备的名字
  API_DEVICE_NAME_SEARCH: API_BASE + "/v1/devices/devicename?deviceId=",

  // 获取设备的状态
  API_DEVICE_STATE_SEARCH: API_BASE + "/v1/devices/states?deviceId=",

  // 获取目前我们所拥有的设备
  API_DEVICE_ALL: API_BASE + "/v1/devices/available",

  // 获取设备的历史记录
  API_SEARCH_HISTORY: API_BASE + "/v1/devices/history?deviceId=",

  /**
   * POST
   */

  //用户登录
  API_USER_LOGIN: API_BASE + "/v1/users",

  // 更改用户信息
  API_UPDATE_USER: API_BASE + "/v1/users/userName",

  // 创建房间
  API_CREATE_ROOM: API_BASE + "/v1/rooms",

  // 删除房间
  API_DELETE_ROOM: API_BASE + "/v1/rooms/delete",

  // 添加设备
  API_ADD_DEVICE: API_BASE + "/v1/devices",

  // 删除设备
  API_DELETE_DEVICE: API_BASE + "/v1/devices/delete",

  // 改变设备的状态
  API_DEVICE_STATE_CHANGE: API_BASE + "/v1/devices/states",

}
