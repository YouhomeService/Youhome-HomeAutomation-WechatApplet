// 获取微信录音管理器
const recordManager = wx.getRecorderManager();
// 后台接口地址 
const WX_API = "https://youhome.xyz:3005/smart_order";
// 函数方法引用
var requests = require('../../request/request.js');

// 当前页面对象
let MyPage;

// 录音结束时触发 
recordManager.onStop((result) => {
  console.log("录音结束");
  // 获取录音路径
  let { tempFilePath } = result;
  console.log(tempFilePath)
  // 发送录音文件到后台
  wx.uploadFile({
    url: WX_API,
    method: "post",
    filePath: tempFilePath,
    name: "wx_record",
    success(ret) {
      console.log("录音发送到后台成功");
      console.log(ret)
      // 成功返回讯飞语音识别结果  
      // 结果格式可以参考xJson文件内的文件 
      let serviceData = JSON.parse(ret.data);

      // 将文本打印到页面上 
      MyPage.setData({ yourMsg: serviceData.text });

      // 控制网关
<<<<<<< HEAD
      if (serviceData.text.search(/开网关的灯/) != -1 || serviceData.text.search(/开网关/) != -1) {
        for (var i = 0; i < MyPage.data.devices_name.length; i++) {
          var flag = MyPage.data;
          if (MyPage.data.devices_name[i] == '多功能网关') {
              requests.requestSearchDeviceState(MyPage.data.devices_id[i], (temp) => {
                if (temp.length == 0) {
                  console.log("情况1：此时网关并没有连接")
                  MyPage.setData({ revices: "网关未连接，不可用" });
                } else if (temp.state == 'on') {
                  console.log("情况2：此时网关的灯已打开")
                  MyPage.setData({ revices: "网关的灯已打开" });
                } else if (temp.state == 'off') {
                  console.log("情况3：此时网关的灯呈关闭状态")
                  for (var k = 0; k < 10; k++) {
                    requests.changeDeviceState(flag.devices_id[i], 'turn_on');
                  }
                  MyPage.setData({ revices: "网关的灯已打开" });
                }
              })
            break;
          }
        }
      } else if ((serviceData.text.search(/关网关的灯/) != -1) || (serviceData.text.search(/关闭网关的灯/) != -1)) {
        for (var i = 0; i < MyPage.data.devices_name.length; i++) {
          var flag = MyPage.data;
          if (MyPage.data.devices_name[i] == '多功能网关') {
              requests.requestSearchDeviceState(MyPage.data.devices_id[i], (temp) => {
                if (temp.length == 0) {
                  console.log("情况1：此时网关并没有连接")
                  MyPage.setData({ revices: "网关未连接，不可用" });
                } else if (temp.state == 'off') {
                  console.log("情况2：此时网关的灯已关闭")
                  MyPage.setData({ revices: "网关的灯已关闭" });
                } else if (temp.state == 'on') {
                  console.log("情况3：此时网关的灯呈打开状态")
                  for (var k = 0; k < 10; k++) {
                    requests.changeDeviceState(flag.devices_id[i], 'turn_off');
                  }
                  MyPage.setData({ revices: "网关的灯已关闭" });
                }
              })
            break;
          }
        }
      } else if ((serviceData.text.search(/关网关/) != -1) || (serviceData.text.search(/关闭网关/) != -1)) {
        for (var i = 0; i < MyPage.data.devices_name.length; i++) {
          var flag = MyPage.data;
          if (MyPage.data.devices_name[i] == '多功能网关') {
            requests.requestSearchDeviceState(MyPage.data.devices_id[i], (temp) => {
              if (temp.length == 0) {
                console.log("情况1：此时网关并没有连接")
                MyPage.setData({ revices: "网关未连接，不可用" });
              } else if (temp.state == 'off') {
                console.log("情况2：此时网关的灯已关闭")
                MyPage.setData({ revices: "网关的灯已关闭" });
              } else if (temp.state == 'on') {
                console.log("情况3：此时网关的灯呈打开状态")
                for (var k = 0; k < 10; k++) {
                  requests.changeDeviceState(flag.devices_id[i], 'turn_off');
                }
=======
      if (serviceData.text.search(/开网关的灯/) != -1) {
        for (var i = 0; i < MyPage.data.devices_name.length; i++) {
          if (MyPage.data.devices_name[i] == '多功能网关') {
            requests.changeDeviceState(MyPage.data.devices_id[i], 'turn_on');
            var temp = MyPage.data;
            requests.requestSearchDeviceState(MyPage.data.devices_id[i], (temp) => {
              if (temp.length == 0) {
                MyPage.setData({ revices: "网关未连接，不可用" });
              } else {
                MyPage.setData({ revices: "网关的灯已打开" });
              }
            })
            break;
          }
        }
      } else if ((serviceData.text.search(/关网关的灯/) != -1)||(serviceData.text.search(/关闭网关的灯/) != -1)) {
        for (var i = 0; i < MyPage.data.devices_name.length; i++) {
          if (MyPage.data.devices_name[i] == '多功能网关') {
            requests.changeDeviceState(MyPage.data.devices_id[i], 'turn_off');
            var temp = MyPage.data;
            requests.requestSearchDeviceState(MyPage.data.devices_id[i], (temp) => {
              if (temp.length == 0) {
                MyPage.setData({ revices: "网关未连接，不可用" });
              } else {
>>>>>>> 0c2fd231046165c4e9e40c4a1f3e6a63cae6c126
                MyPage.setData({ revices: "网关的灯已关闭" });
              }
            })
            break;
          }
        }
<<<<<<< HEAD
      }  else {

        // 一些错误处理 
        if (!serviceData.answer || !serviceData.answer.text) {
          sayWords("对不起 我没有听懂");
          return;
        }

        // 将文本打印到页面上 
        let returnMsg = serviceData.answer.text;
        MyPage.setData({ revices: returnMsg });

        // 根据讯飞返回的服务类型  采取措施
        switch (serviceData.service) {
          case "weather":
            // 集成天气
            // 调用语音播放
            sayWords(returnMsg);
            console.log("天气" + returnMsg);
            break;
          case "baike":
            // 集成百科
            // 调用语音播放
            sayWords(returnMsg);
            console.log("百科" + returnMsg);
            break;
          case "radio":
            // 集成电台 调用 微信小程序内的组件进行播放
            var resultArr = serviceData.data.result;
            var tmpUrl = resultArr[0].url;
            console.log("电台 " + tmpUrl);
            MyPage.audioCtx.setSrc(tmpUrl);
            MyPage.audioCtx.play();
            break;
          case "joke":
            // 集成笑话
            var resultArr = serviceData.data.result;
            var joke1 = resultArr[0].content;
            console.log("笑话" + joke1);
            sayWords(joke1);
            break;
          default:
            break;
        }
      }
=======
      } else if ((serviceData.text.search(/关网关/) != -1)||(serviceData.text.search(/关闭网关/) != -1)) {
        for (var i = 0; i < MyPage.data.devices_name.length; i++) {
          if (MyPage.data.devices_name[i] == '多功能网关') {
            requests.changeDeviceState(MyPage.data.devices_id[i], 'turn_off');
            break;
          }
        }
        MyPage.setData({ revices: "网关已关闭" });
      } else if (serviceData.text.search(/开网关/) != -1) {
        for (var i = 0; i < MyPage.data.devices_name.length; i++) {
          if (MyPage.data.devices_name[i] == '多功能网关') {
            requests.changeDeviceState(MyPage.data.devices_id[i], 'turn_on');
            break;
          }
        }
        MyPage.setData({ revices: "网关已打开" });
      } else {

      // 一些错误处理 
      if (!serviceData.answer || !serviceData.answer.text) {
        sayWords("对不起 我没有听懂");
        return;
      }

      // 将文本打印到页面上 
      let returnMsg = serviceData.answer.text;
      MyPage.setData({ revices: returnMsg });

      // 根据讯飞返回的服务类型  采取措施
      switch (serviceData.service) {
        case "weather":
          // 集成天气
          // 调用语音播放
          sayWords(returnMsg);
          console.log("天气" + returnMsg);
          break;
        case "baike":
          // 集成百科
          // 调用语音播放
          sayWords(returnMsg);
          console.log("百科" + returnMsg);
          break;
        case "radio":
          // 集成电台 调用 微信小程序内的组件进行播放
          var resultArr = serviceData.data.result;
          var tmpUrl = resultArr[0].url;
          console.log("电台 " + tmpUrl);
          MyPage.audioCtx.setSrc(tmpUrl);
          MyPage.audioCtx.play();
          break;
        case "joke":
          // 集成笑话
          var resultArr = serviceData.data.result;
          var joke1 = resultArr[0].content;
          console.log("笑话" + joke1);
          sayWords(joke1);
          break;
        default:
          break;
      }
    }
>>>>>>> 0c2fd231046165c4e9e40c4a1f3e6a63cae6c126
    },
    fail(err) {
      console.log("录音发送到后台失败");
      console.log(err);
    }
  })
});

// 把文字变成语音念出来
function sayWords(msg) {
  msg = msg.replace(/"/g, '');
  // 图简单，直接粗暴地调百度的语音播放接口，该接口直接传文本即可
  // 正确的用法也需要调用讯飞或者百度的语音接口，需要注册传入appid的种。。
  var xfurl = `http://tts.baidu.com/text2audio?idx=1&tex='${msg}'&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=3&per=2&vol=9&pit=5`;
  MyPage.audioCtx.setSrc(xfurl);
  MyPage.audioCtx.play();
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    button_text: '请点按后开始说话',
    isChecked: false,
    yourMsg: "",
    revices: "",
    room_num: "",
    devices_id: [],
    devices_name: [],
    devices_entityId: []
  },
  sayStartHandel() {
    // 暂停正在播放的所有语音 
    this.audioCtx.pause();
    // 改变按钮内文字
    this.setData({
      isChecked: true,
      button_text: '正在聆听...'
    });
    // 开始录音
    recordManager.start({
    });
  },
  sayStopHandel() {
    // 改变按钮内文字
    this.setData({
      isChecked: false,
      button_text: '请点按后开始说话'
    });
    //  结束录音
    recordManager.stop({});
  },

  /**
   * 数据加载
   */
  onLoad: function () {
    // 根据userId，查找对应的rooms
    requests.requestSearchRooms(getApp().data.userId, (data) => {
      this.setData({
        room_num: data.length
      });
      var temp_1 = [];
      var temp_2 = [];
      var temp_3 = [];
      for (var i = 0; i < data.length; i++) {
        // 根据roomId，查找对应的devices
        requests.requestSearchDevices(data[i].roomId, (res) => {
          // 其中的温湿度传感器 实际上绑定了2个设备数据 但只能算作一个设备
          for (var j = 0; j < res.length; j++) {
            temp_1.push(res[j].deviceId);
            temp_2.push(decodeURIComponent(res[j].deviceName));
            temp_3.push(res[j].entityId);
          }
          // console.log("All Devices: " + temp);
          this.setData({
            devices_id: temp_1,
            devices_name: temp_2,
            devices_entityId: temp_3
          });
          // 显示在工作区
          console.log("All Devices Id: " + this.data.devices_id);
          console.log("All Devices Name: " + this.data.devices_name);
          console.log("All Devices entityId: " + this.data.devices_entityId);
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    MyPage = getCurrentPages()[0];
    this.audioCtx = wx.createAudioContext('myAudio');
  },

  onPullDownRefresh: function () {
    this.onLoad();
  }
<<<<<<< HEAD
})
=======
})
>>>>>>> 0c2fd231046165c4e9e40c4a1f3e6a63cae6c126
