Page({
  data: {
    catList: []
  },
  onLoad: function() {
    let that = this
    wx.request({
      url: 'http://h6.duchengjiu.top/shop/api_cat.php',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          catList: res.data.data
        })
      }
    })
  }
})
