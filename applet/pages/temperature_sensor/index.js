var requests = require('../../request/request.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    temperature_id: '',
    humidity_id: '',
    state: "舒适",
    temper: 26.8,
    wet: 66.7
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id_1 = options.id;
    var id_2 = options.otherId;
    this.setData({
      temperature_id: id_1,
      humidity_id: id_2
    })

    requests.requestSearchDeviceState(id_1, (data) => {
      if (data.length == 0) {
        wx.showModal({
          title: '请求不到数据'
        })
      } else {
        this.setData({
          temper: data.state
        })
      }
    })

    requests.requestSearchDeviceState(id_2, (data) => {
      if (data.length == 0) {
        wx.showModal({
          title: '请求不到数据'
        })
      } else {
        this.setData({
          wet: data.state
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})