$.getQueryString = function(name) {
    var search = location.search.substr(1);
    var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
    var r = search.match(reg);
    if (r === null) return null;
    return decodeURI(r[2]);
};
function Onelist() {
var navList = document.getElementById('nav-list');
$.ajax({
    "url": "http://h6.duchengjiu.top/shop/api_cat.php",
    'type': 'GET',
    'dataType': 'json',
    'success': function(response){
        // 处理返回的数据
        // console.log(response);
        for(var i = 0; i < response.data.length; i++){
            var obj = response.data[i];
            var oLi = document.createElement('li');
            var oA = document.createElement('a');
            oA.innerText = obj.cat_name;
            oA.href = 'list.html?cat_id=' + obj.cat_id;
            navList.appendChild(oLi);
            oLi.appendChild(oA);
            // Shop.reload();
        }
    },
    "error": function(message) {
        //
        console.log(message);
    }

});
}
//点击搜索跳转到搜索页，将关键字带过去

var searchBtn = document.getElementById("searchBtn");
if(searchBtn) {
    searchBtn.addEventListener('click', function () {
        console.log('click');
        //获得关键字
        var searchText = document.getElementById('searchTextLink').value;
    console.log(searchText);

    location.href = 'search.html?search_text=' + searchText;
    });
}

var searchText = al.getQueryString('search_text');
var oSearchText = document.getElementById('searchTextLink');
// oSearchText.value = searchText;
if(oSearchText){
    document.body.onkeydown = function (event) {
        // console.log('onkeydown');
        event = event || window.event;
        if(event.keyCode ===13 ){
            var searchText = document.getElementById('searchTextLink').value;
            location.href = 'search.html?search_text=' + searchText;

        }
    }
}

// 登录后字体统一变化

if(localStorage.getItem('token')){
    $('#nav-main-enter').text(localStorage.getItem('username'));
    $('#nav-main-register').html($('<span>退出</span>')).click(function () {
        $('#nav-main-register').html($(' <a href="http://localhost:63342/%E7%AC%AC%E4%BA%8C%E5%A4%A9/register.html?_ijt=75gk4a4omna1cb8jfk4p53ql06" class="nav-main-register" >免费注册</a>'));
        $('#nav-main-enter').text("登录");
        localStorage.clear();
    });
    
}

//更新购物车的方法

function updateCartInfo(goods_id, goods_number, callback) {
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
        "type": "POST",
        "data": {
            "goods_id": goods_id,
            "number": goods_number
        },
        "dataType": "json",
        "success": function (response) {
            localStorage.setItem('cart'+goods_id, goods_number);
            callback(response);
        }
    });
}


window.shop = {
    config: {
        API_PREFIX: "http://h6.duchengjiu.top/shop/",
        PAGESIZE: 10,
        USER_TOKEN: 'token',
        CART_PREFIX: 'CART_'
    },
    base: {
      storage: {
          "setItem": function (k, v) {
              return localStorage.setItem(k, v);
          },
          "getItem": function (k) {
              return localStorage.getItem(k);
          }
      },
        business: {
          "getToken": function () {
              return shop.base.storage.getItem(shop.config.USER_TOKEN);
          },
            "saveGoodsInfoOfCart": function (goods_id, number) {
                return shop.base.storage.setItem(shop.config.CART_PREFIX + goods_id, number);
            }
        }
    },
    api: {
        fetchUserAddress: function (callback) {
            $.get(shop.config.API_PREFIX + 'api_useraddress.php', "token="+shop.base.business.getToken(), callback, 'json');
        },
        addUserAddress: function (data, callback) {
            $.post(shop.config.API_PREFIX + 'api_useraddress.php?token='+shop.base.business.getToken() + '&status=add', data, callback, 'json');
        }
        ,deleteUserAddress: function (obj,callback) {
            $.post(shop.config.API_PREFIX + 'api_useraddress.php?status=delete&address_id='+obj.id+'&token='+shop.base.business.getToken(),'',callback);
        }
        ,addOrder: function (address_id, total_price, callback) {
            var data={
                "address_id": address_id,
                "total_price": total_price
            };
            $.post(shop.config.API_PREFIX + 'api_order.php?token='+shop.base.business.getToken() + '&status=add', data, callback,'json');
        }
    }
};