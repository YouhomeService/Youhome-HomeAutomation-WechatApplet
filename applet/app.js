//app.js

var requests = require('request/request.js');

App({
  data: {
    userId: ""
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

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
      }
    })
=======
    this.data.userId = wx.getStorageSync('userId') || '';

    // 检查登录状态
    wx.checkSession({
      success: () => {

      },
      fail: () => {
        wx.removeStorageSync('userId');
        wx.login({
          success: res => {
            if (res.code) {
              requests.userLogin(res.code, (data) => {
                if (data.length == 0) {
                  console.log('登录失败')
                } else {
                  console.log("登录成功，用户ID为：" + data.userId)
                  // 赋予userId正确的值
                  this.data.userId = data.userId
                  wx.setStorage({
                    key: 'userId',
                    data: data.userId
                  });
                }
              });
            } else {
              // 登陆失败
            }
          }
        })
      }
    });

>>>>>>> 0c2fd231046165c4e9e40c4a1f3e6a63cae6c126
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
<<<<<<< HEAD
=======
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo;
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
>>>>>>> 0c2fd231046165c4e9e40c4a1f3e6a63cae6c126
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})