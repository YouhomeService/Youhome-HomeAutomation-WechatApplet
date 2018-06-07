//app.js

var requests = require('request/request.js');

App({
  data: {
    userId: ""
  },

  onLaunch: function () {
    this.globalData.login_code = wx.getStorageSync('login_code');
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

<<<<<<< HEAD
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        requests.userLogin(res.code, (data) => {
          if (data.length == 0) { 
            console.log('登录失败')
          } else {
            console.log("登录成功，用户ID为：" + data.userId)
            // 赋予userId正确的值
            this.data.userId = data.userId
          }
        });
=======
    wx.checkSession({
      success: () => {

      },
      fail: () => {
        wx.login({
          success: res => {
            if (res.code) {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              /*
              wx.request({
                url: '', //后台的登录url，等后台做好了填上
                data: {
                  code: res.code
                },
                success: res => {
                  //将openId存在数据缓存中用于后续操作
                  wx.setStorage({
                    key: 'login_code',
                    data: 
                  });
                }
              })*/
            } else {
              // 登陆失败
            }
          }
        })
>>>>>>> 5c6310be265baa88a118c8486c626873277faffc
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo

                  

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            },
            fail: () => {
              
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
