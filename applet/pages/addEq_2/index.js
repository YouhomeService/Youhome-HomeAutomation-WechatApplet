//获取应用实例
var app = getApp()
var arr_name = ["多功能网关", "空调伴侣", "墙壁开关", "人体传感器", "门窗传感器", "天然气报警器", "智能插座", "烟雾报警器", "温湿度传感器", "无线开关", "小爱音箱mini", "LED智能台灯", "净水器", "电饭煲", "净水器厨下版", "LED灯泡", "扫地机器人", "米家小相机"]
var arr_link = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

Page({
  data: {
    items: [{
      id: "1",
      src: "../../images/equipment/gateway.jpg",
      text: arr_name[0]
    }, {
      id: "2",
      src: "../../images/equipment/air_condition.jpg",
      text: arr_name[1]
    }, {
      id: "3",
      src: "../../images/equipment/Aqara_wall_switch.jpg",
      text: arr_name[2]
    }, {
      id: "4",
      src: "../../images/equipment/body_sensor.jpg",
      text: arr_name[3]
    }, {
      id: "5",
      src: "../../images/equipment/door_sensor.jpg",
      text: arr_name[4]
    }, {
      id: "6",
      src: "../../images/equipment/gas_alarm.jpg",
      text: arr_name[5]
    }, {
      id: "7",
      src: "../../images/equipment/smart_socket.jpg",
      text: arr_name[6]
    }, {
      id: "8",
      src: "../../images/equipment/smoke_alarm.jpg",
      text: arr_name[7]
    }, {
      id: "9",
      src: "../../images/equipment/temperature_sensor.jpg",
      text: arr_name[8]
    }, {
      id: "10",
      src: "../../images/equipment/wireless_switch.jpg",
      text: arr_name[9]
    }, {
      id: "11",
      src: "../../images/equipment/xiaoai.png",
      text: arr_name[10]
    }, {
      id: "12",
      src: "../../images/equipment/table_lamp.jpg",
      text: arr_name[11]
    }, {
      id: "13",
      src: "../../images/equipment/water_purifier.jpg",
      text: arr_name[12]
    }, {
      id: "14",
      src: "../../images/equipment/cooker.jpg",
      text: arr_name[13]
    }, {
      id: "15",
      src: "../../images/equipment/water_purifier_2.jpg",
      text: arr_name[14]
    }, {
      id: "16",
      src: "../../images/equipment/lamp.png",
      text: arr_name[15]
    }, {
      id: "17",
      src: "../../images/equipment/robot.jpg",
      text: arr_name[16]
    }, {
      id: "18",
      src: "../../images/equipment/camera.png",
      text: arr_name[17]
    }]
  },
})