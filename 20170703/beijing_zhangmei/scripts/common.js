$.getQueryString = function(name) {
    var search = location.search.substr(1);
    var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
    var r = search.match(reg);
    if (r === null) return null;
    return decodeURI(r[2]);
};
$.compile = function(templateStr, dictionObj) {
    return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
        return dictionObj[$1];
    });
};

// window.shop = {
//     config: {
//         API_PREFIX: "http://h6.duchengjiu.top/shop/",
//         PAGESIZE: 10,
//         USER_TOKEN: 'token',
//         CART_PREFIX: 'cart_',//在本地存储商品ID和对应数量的时候使用
//     },
//     base: {
//         storage: {
//             "setItem": function(k, v) {
//                 return localStorage.setItem(k, v);
//             },
//             "getItem": function(k) {
//                 return localStorage.getItem(k);
//             }
//         },
//         business: {
//             "getToken": function() {
//                 return shop.base.storage.getItem(shop.config.USER_TOKEN);
//             },
//             "saveGoodsInfoOfCart": function(goods_id, number) {
//                 return shop.base.storage.setItem(shop.config.CART_PREFIX + goods_id, number);
//             }
//         }
//     },
//     api: {
//         fetchGoodsCategory: function(callback){
//             $.get(shop.config.API_PREFIX + 'api_cat.php', callback, 'json');
//         },
//         fetchGoodsListByCatId: function(cat_id, callback){
//             $.get(shop.config.API_PREFIX + 'api_goods.php', "cat_id="+cat_id, callback, 'json');
//         },
//         fetchGoodsDetail: function(goods_id, callback) {
//             $.get(shop.config.API_PREFIX + 'api_goods.php', "goods_id="+goods_id, callback, 'json');
//         },
//         fetchHotGoods: function(callback){
//             $.get(shop.config.API_PREFIX + 'api_goods.php', callback, 'json');
//         },
//         searchGoods: function(opts){
//             var data = {};
//             data.search_text = opts.search_text;
//             data.page = opts.page || 1;
//             data.pagesize = opts.pagesize || shop.config.PAGESIZE;
//             var callback = opts.callback;
//
//             $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
//         },
//         checkUsernameUnique: function(username, callback) {
//             var data = {
//                 "status": "check",
//                 "username": username
//             };
//             $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
//         },
//         register: function(username, password, callback){
//             var data = {
//                 "status": "register",
//                 "username": username,
//                 "password": password
//             };
//             $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
//         },
//         login: function(username, password, callback){
//             var data = {
//                 "status": "login",
//                 "username": username,
//                 "password": password
//             };
//             $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
//         },
//         updateCart: function(goods_id, number, callback) {
//             var data = {
//                 "goods_id": goods_id,
//                 "number": number
//             };
//             $.post(shop.config.API_PREFIX + 'api_cart.php?token='+shop.base.business.getToken(), data, callback, 'json');
//         },
//         fetchCart: function(callback){
//             $.get(shop.config.API_PREFIX + 'api_cart.php', "token="+shop.base.business.getToken(), callback, 'json');
//         },
//         fetchUserAddress: function(callback) {
//             $.get(shop.config.API_PREFIX + 'api_useraddress.php', "token="+shop.base.business.getToken(), callback, 'json');
//         },
//         addUserAddress: function(data, callback){
//             $.post(shop.config.API_PREFIX + 'api_useraddress.php?token='+shop.base.business.getToken() + '&status=add', data, callback, 'json');
//         },
//         delteUserAddress: function(){
//
//         },
//         editUserAddress: function(){ },//:TODO
//         fetchOrder: function(){
//
//         },
//         addOrder: function(){
//
//         },
//         cancelOrder: function(){
//
//         }
//     }
// };

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
        fetchGoodsCategory: function(callback){
            $.get(shop.config.API_PREFIX + 'api_cat.php', callback, 'json');
        },
        fetchGoodsListByCatId: function(cat_id, page, pagesize, callback){
            var data = {
                "cat_id": cat_id,
                "page": page,
                "pagesize": pagesize
            };
            $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
        },
        fetchGoodsDetail: function(goods_id, callback) {
            $.get(shop.config.API_PREFIX + 'api_goods.php', "goods_id="+goods_id, callback, 'json');
        },
        fetchHotGoods: function(page, pagesize, callback){
            $.get(shop.config.API_PREFIX + 'api_goods.php?page='+page+'&pagesize='+pagesize, callback, 'json');
        },
        searchGoods: function(opts){
            var data = {};
            data.search_text = opts.search_text;
            data.page = opts.page || 1;
            data.pagesize = opts.pagesize || shop.config.PAGESIZE;
            var callback = opts.callback;

            $.get(shop.config.API_PREFIX + 'api_goods.php', data, callback, 'json');
        },
        checkUsernameUnique: function(username, callback) {
            var data = {
                "status": "check",
                "username": username
            };
            $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
        },
        register: function(username, password, callback){
            var data = {
                "status": "register",
                "username": username,
                "password": password
            };
            $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
        },
        login: function(username, password, callback){
            var data = {
                "status": "login",
                "username": username,
                "password": password
            };
            $.post(shop.config.API_PREFIX + 'api_user.php', data, callback, 'json');
        },
        updateCart: function(goods_id, number, callback) {
            var data = {
                "goods_id": goods_id,
                "number": number
            };
            $.post(shop.config.API_PREFIX + 'api_cart.php?token='+shop.base.business.getToken(), data, callback, 'json');
        },
        fetchCart: function(callback){
            $.get(shop.config.API_PREFIX + 'api_cart.php', "token="+shop.base.business.getToken(), callback, 'json');
        },
        fetchUserAddress: function(callback) {
            $.get(shop.config.API_PREFIX + 'api_useraddress.php', "token="+shop.base.business.getToken(), callback, 'json');
        },
        addUserAddress: function(data, callback){
            $.post(shop.config.API_PREFIX + 'api_useraddress.php?token='+shop.base.business.getToken() + '&status=add', data, callback, 'json');
        },
        delteUserAddress: function(){

        },
        editUserAddress: function(){ },//:TODO
        fetchOrder: function(callback){//获取当前用户的订单列表
            $.get(shop.config.API_PREFIX + 'api_order.php', "token="+shop.base.business.getToken(), callback, 'json');
        },
        addOrder: function(address_id, total_prices, callback){
            var data = {
                "address_id": address_id,
                "total_prices": total_prices
            };
            $.post(shop.config.API_PREFIX + 'api_order.php?token='+shop.base.business.getToken()+'&status=add', data, callback, 'json');
        },
        cancelOrder: function(){

        }
    }
};


var commodity = document.getElementById('nav-ul');
var goodsUl = document.getElementById('menu-ul');
    $.ajax({
        'url': "http://h6.duchengjiu.top/shop/api_cat.php",
        'type': "GET",
        'dataType': "json",
        'success': function(response) {
            for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i];
                var oLi = document.createElement('li');
                var oLiA = document.createElement('a');
                oLiA.href = 'list.html?cat_id=' + obj.cat_id;
                oLiA.innerText = obj.cat_name;
                oLi.appendChild(oLiA);
                commodity.appendChild(oLi);
            }
        },
        "error": function(message) {
            console.log(message);
        }
    });

//搜索
// var searchBtn = $('#search-btn');
// if (searchBtn.length === 1) {
//     searchBtn.click(function() {
//         location.href = 'search.html?search_text' + $('#search-text').val();
//     });
// }
var searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function () {
        console.log('click');
        var searchText = document.getElementById('search-text').value;
        console.log(searchText);
        location.href = "search.html?search_text=" + searchText;
    });
}

//登录判断
if (localStorage.getItem('token')) {
    $('.user').html("您好" + localStorage.getItem('username'));
    $('div[class="quit"]').show();
}
$('#quit').click(function () {
    console.log('click');
        localStorage.clear();
        location.href = "index.html";
});

//更新购物车方法
function updateCartInfo(goods_id, goods_number, callback) {
    $.ajax({
        'url':'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
        'type': 'POST',
        'data': {
            'goods_id': goods_id,
            'number': goods_number
        },
        'dataType': 'json',
        'success': function (response) {
            console.log(response);
            localStorage.setItem('cart' + goods_id, goods_number);
            callback(response);
        }
    });
}

