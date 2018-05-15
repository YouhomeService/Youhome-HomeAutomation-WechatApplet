const recorderManager = wx.getRecorderManager()
recorderManager.onStart(() => {
  //开始录制的回调方法
})
//录音停止函数
recorderManager.onStop((res) => {
  const { tempFilePath } = res;
  //上传录制的音频
  console.log(res);
  /*wx.uploadFile({
    url: app.d.hostUrl + '/Api/Index/wxupload', //仅为示例，非真实的接口地址
    filePath: tempFilePath,
    name: 'viceo',
    success: function (res) {
      console.log(res);
    }
  })*/
})

Page({
  data: {
    button_text: '请点按后开始说话',
    isChecked: false,
    flag: 0
  },
  //按下按钮--录音
  startHandel: function () {
    console.log("开始")
    this.setData({
      isChecked: true,
      button_text: '正在聆听...',
      flag: 1
    });
    recorderManager.start({
      duration: 10000
    })
  },
  //松开按钮
  endHandle: function () {
    console.log("结束")
    this.setData({
      isChecked: false,
      button_text: '请点按后开始说话',
      flag: 0
    });
    //触发录音停止
    recorderManager.stop()
  }
})  