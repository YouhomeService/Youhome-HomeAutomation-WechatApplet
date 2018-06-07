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
    wx.startRecord({
      success: function (res) {
        console.log('录音成功' + JSON.stringify(res));
        const { tempFilePath } = res;
        wx.uploadFile({
          url: "https://123.207.55.27/v1/Voice/wxupload",
          filePath: tempFilePath,
          name: 'viceo',
          success: function (res) {
            console.log(res);
          }})
      }}
    )
    setTimeout(function () {
      //结束录音  
      wx.stopRecord()
    }, 60000)
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
    wx.stopRecord()
  }
}) 