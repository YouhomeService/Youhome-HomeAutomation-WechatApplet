var requests = require('../../request/request.js');
Page({
  data: {
    checked_num: 0,
    searchKey: null, //输入的房间名称
    items: [{
      id: "1",
      src: "https://s7.postimg.cc/rzquyo22z/image.jpg",
      isChecked: false
    }, {
      id: "2",
      src: "https://s7.postimg.cc/xdytxcbm3/image.jpg",
      isChecked: false
    }, {
      id: "3",
      src: "https://s7.postimg.cc/brjtgf7xn/image.jpg",
      isChecked: false
    }, {
      id: "4",
      src: "https://s7.postimg.cc/9zqulloln/image.jpg",
      isChecked: false
    }, {
      id: "5",
      src: "https://s7.postimg.cc/4oby0xctn/image.jpg",
      isChecked: false
    }, {
      id: "6",
      src: "https://s7.postimg.cc/elmyu0faj/image.jpg",
      isChecked: false
    }, {
      id: "7",
      src: "https://s7.postimg.cc/lc3g3gxbf/image.jpg",
      isChecked: false
    }, {
      id: "8",
      src: "https://s7.postimg.cc/xf8rqyg2j/image.jpg",
      isChecked: false
    }, {
      id: "9",
      src: "https://s7.postimg.cc/76xn1ngkb/image.jpg",
      isChecked: false
    }, {
      id: "10",
      src: "https://s7.postimg.cc/emwwngrez/image.jpg",
      isChecked: false
    }, {
      id: "11",
      src: "https://s7.postimg.cc/uxx0jsyrv/image.jpg",
      isChecked: false
    }, {
      id: "12",
      src: "https://s7.postimg.cc/yhiy9om2z/image.jpg",
      isChecked: false
    }, {
      id: "13",
      src: "https://s7.postimg.cc/pmi3z6kfv/image.jpg",
      isChecked: false
    }, {
      id: "14",
      src: "https://s7.postimg.cc/53n7tm6d7/image.jpg",
      isChecked: false
    }, {
      id: "15",
      src: "https://s7.postimg.cc/oy99frgfv/image.jpg",
      isChecked: false
    }, {
      id: "16",
      src: "https://s7.postimg.cc/ja2yow6yj/image.jpg",
      isChecked: false
    }, {
      id: "17",
      src: "https://s7.postimg.cc/d959rts23/image.jpg",
      isChecked: false
    }, {
      id: "18",
      src: "https://s9.postimg.cc/8jzmxmvtb/dining_room.png",
      isChecked: false
    }]
  },

  // 选中的壁纸加上黑色边框，并使得上一个选中的边框消失
  check: function (event) {
    var img_id = event.currentTarget.dataset.id;
    var old_checked_num = this.data.checked_num;
    var new_items = this.data.items;
    if (old_checked_num != 0)
      new_items[old_checked_num-1].isChecked = false
    new_items[img_id-1].isChecked = true
    this.setData({
      checked_num: img_id,
      items: new_items
    });
  },

  // 输入框取值
  inputEvent: function (e) {
    this.setData({ searchKey: e.detail.value });
  },

  // 点击创建
  clickEvent: function (e) {
    if (!this.data.searchKey) {
      wx.showModal({
        title: '请输入房间名称'
        // content: '',
      })
      return;
    } else if (this.data.checked_num == 0) {
      wx.showModal({
        title: '请选择一张壁纸'
      })
      return;
    } else {
      requests.createRoom(getApp().data.userId, this.data.searchKey, this.data.items[this.data.checked_num-1].src, (data) => {
        console.log(data.length)
        if (data.length == 0) {
          wx.showModal({
            title: '创建失败'
          })
        } else {
          wx.showToast({
            title: '创建成功',
            icon: 'success',
            duration: 1000
          })
        }
      });
    }
    //
  },

})