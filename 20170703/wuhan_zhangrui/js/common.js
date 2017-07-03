$.getQueryString = function(name) {
  var search = location.search.substr(1);
  var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
  var r = search.match(reg);
  if (r === null) return null;
  return decodeURI(r[2]);
};


window.shop = {
  config: {
    API_PREFIX: "http://h6.duchengjiu.top/shop/",
    PAGESIZE: 10,
    USER_TOKEN: 'token',
    CART_PREFIX: 'cart_',//在本地存储商品ID和对应数量的时候使用
  },
  base: {
    storage: {
      "setItem": function(k, v) {
        return localStorage.setItem(k, v);
      },
      "getItem": function(k) {
        return localStorage.getItem(k);
      }
    },
    business: {
      "getToken": function() {
        return shop.base.storage.getItem(shop.config.USER_TOKEN);
      },
      "saveGoodsInfoOfCart": function(goods_id, number) {
        return shop.base.storage.setItem(shop.config.CART_PREFIX + goods_id, number);
      }
    }
  },
  api: {
    //获取商品分类
    fetchGoodsCategory: function(callback){
      $.get(shop.config.API_PREFIX + 'api_cat.php', callback, 'json');
    },
     //获取商品列表
    fetchGoodsListByCatId: function(cat_id, callback){
      $.get(shop.config.API_PREFIX + 'api_goods.php', "cat_id="+cat_id, callback, 'json');
    },
     //获取商品详情
    fetchGoodsDetail: function(goods_id, callback) {
      $.get(shop.config.API_PREFIX + 'api_goods.php', "goods_id="+goods_id, callback, 'json');
    },
     //获取热门商品
    fetchHotGoods: function(page, pagesize, callback){
      $.get(shop.config.API_PREFIX + 'api_goods.php?page='+page+'&pagesize='+pagesize, callback, 'json');
    },
     //获取搜索商品
    searchGoods: function(opts){
      var data = {};
      data.search_text = opts.search_text;
      data.page = opts.page || 1;
      data.pagesize = opts.pagesize || shop.config.PAGESIZE;
      var callback = opts.callback;

      $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
    },
     //验证用户名
    checkUsernameUnique: function(username, callback) {
      var data = {
        "status": "check",
        "username": username
      };
      $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
    },
     //获取注册接口
    register: function(username, password, callback){
      var data = {
        "status": "register",
        "username": username,
        "password": password
      };
      $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
    },
     //获取登录接口
    login: function(username, password, callback){
      var data = {
        "status": "login",
        "username": username,
        "password": password
      };
      $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
    },
    //更新购物车
    updateCart: function(goods_id, number, callback) {
      var data = {
        "goods_id": goods_id,
        "number": number
      }
      $.post(shop.config.API_PREFIX + 'api_cart.php?token='+shop.base.business.getToken(), data, callback, 'json');
    },
    //获取购物车
    fetchCart: function(callback){
      $.get(shop.config.API_PREFIX + 'api_cart.php', "token="+shop.base.business.getToken(), callback, 'json');
    },
  //获取用户地址
  
   fetchUserAddress: function(callback) {
      $.get(shop.config.API_PREFIX + 'api_useraddress.php', "token="+shop.base.business.getToken(), callback, 'json');
    },
  
    //添加用户地址
     addUserAddress: function(data, callback){
      $.post(shop.config.API_PREFIX + 'api_useraddress.php?token='+shop.base.business.getToken() + '&status=add', data, callback, 'json');
    },
    //删除用户地址
    delteUserAddress: function(){ },
    //编辑用户地址
    editUserAddress: function(){ },
    //获取订单
    fetchOrder: function(callback){//获取当前用户的订单列表
      $.get(shop.config.API_PREFIX + 'api_order.php', "token="+shop.base.business.getToken(), callback, 'json');
    },
    //添加订单
    addOrder: function(address_id, total_prices, callback){
      var data = {
        "address_id": address_id,
        "total_prices": total_prices
      };
      $.post(shop.config.API_PREFIX + 'api_order.php?token='+shop.base.business.getToken()+'&status=add', data, callback, 'json');
    },
    //撤销订单
    cancelOrder: function(){ }
  }
};


// 导航栏
//var goodsUl = document.getElementById('goods-ul');

shop.api.fetchGoodsCategory(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
      $("#nav-ul").append('<li><a href="list.html?cat_id=' + obj.cat_id +'">' + obj.cat_name + '</a></li>');
        
   // 滑入变色

      $("#nav-ul>li").mouseover(function() {
        $(this).css('background','red');
           
           });
      $("#nav-ul>li").mouseout(function() {
        $(this).css('background','');
         
       });
    };
})
   
     
   

// 搜索框
// var searchBtn = document.getElementById('search-btn');
var searchBtn = $('#search-btn');
if(searchBtn.length === 1) {
  searchBtn.click(function() {
  location.href = 'search.html?search_text=' + $('#search-text').val();
  });
}

function updateCartInfo(goods_id, goods_number, callback) {
  shop.api.updateCart(goods_id, goods_number, function(response) {
    console.log(response);
    shop.base.business.saveGoodsInfoOfCart(goods_id, goods_number);
    callback(response);
  })
}

    $('.shopp').click(function() {
      console.log(localStorage.getItem('username'));
        if(localStorage.getItem('username') == null) {
          location.href = 'login.html';
          console.log('点击');
          return;
        }else {
          location.href='shopping.html'
        }
    });

      

// 登录退出
  if (localStorage.getItem('token')) {
     $('.header').html(localStorage.getItem('username'));
   }
   $('.out>a').click(function() {
    localStorage.clear();
   });


//    function showShop(page) {
//   shop.api.fetchHotGoods(page, 20, function(response) {
//     for (var i = 0; i < response.page.page_count.length; i++) {
//       console.log(response.page.page_count.length)
//       $('#btn-middles').append($('<em>'+(j+1)+'</em>'))
//     }
//   });
// };
// var page = 1;
// $('#leftbtn').click(function() {
//   pagg--;
//   if(page <= 1) page = 1;
//   $('#goods') 
// })


   