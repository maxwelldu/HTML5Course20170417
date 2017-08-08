Page({
  data: {
    "xiaolei": "程晓磊",
    "classes": ['北京', '武汉', '西安', '长沙'],
    "goodsList": [{'goods_name':"xxx"}]
  },
  onLoad:function(){
    let that = this
    wx.request({
      url: 'http://h6.duchengjiu.top/shop/api_goods.php',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.data)
        that.setData({
          "goodsList": res.data.data
        })
      }
    })
  },
  click_zhang_mei: function() {
    this.setData({
      xiaolei: 'xiaolei Cheng'
    })
    wx.showToast({
      title: '我是你媳妇儿，我的名字叫高超',
      icon: 'success',
      duration: 5000
    })
  }
})
