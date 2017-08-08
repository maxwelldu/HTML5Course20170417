//index.js
//获取应用实例
const API_URL = "https://api.douban.com/v2/movie/top250"
Page({
  data:{
    title:"加载中....",
    movies:[]
  },
  onLoad:function(){
    let that = this;
    wx.showToast({
      title:"加载中",
      icon:"loading",
      duration:10000
    });

    wx.request({
      url:API_URL,
      data:{},
      header:{
        "Content-Type":"json"
      },
      success:function(res){
        console.log(res);
        wx.hideToast();
        let data = res.data;
        that.setData({
          title:data.title,
          movies:data.subjects
        })
      }
    })
  }
})
