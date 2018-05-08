Page({
  data: {
    button_text: '请点按后开始说话',
    isChecked: false,
    flag: 0
  },
  serviceSelection: function () {
    var it = this.data.flag;
    if (it == 0) {
      this.setData({
        isChecked: true,
        button_text: '正在聆听...',
        flag: 1
      });
    } else {
      this.setData({
        isChecked: false,
        button_text: '请点按后开始说话',
        flag: 0
      });
    }
  }
})  