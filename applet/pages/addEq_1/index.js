var requests = require('../../request/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    this.setData({
      scene_id: id
    })

    requests.requestSearchAllDevice('', (data) => {
      if (data.length == 0) {
        wx.showModal({
          title: '未找到可添加的智能设备',
          // content: '',
        })
      } else {
        wx.showModal({
          title: '已找到可添加的设备，请点击确认',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../addEq_4/index?id=' + id
              })
            } else {
              console.log('用户点击取消')
            }
          }
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