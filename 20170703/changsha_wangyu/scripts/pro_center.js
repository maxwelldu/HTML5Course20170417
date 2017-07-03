//更新购物车的方法
function updateCartInfo(goods_id, goods_number, callback) {
  shop.api.updateCart(goods_id, goods_number, function(response) {
    console.log(response);
    //加入购物车了之后把商品ID和对应的数量存储到本地
    shop.base.business.saveGoodsInfoOfCart(goods_id, goods_number);
    callback(response);
  });
}
var goods_id = $.getQueryString('goods_id');
//console.log(goods_id)
$(function() {
	shop.api.fetchGoodsDetail(goods_id, function(response) {
		console.log(response);
		var obj = response.data[0];
		$('.left-img').append('<img src="' + obj.goods_thumb + '"/>')
		$('.big-pic').append('<img  src="' + obj.goods_thumb + '"/>')
		$('.star_number').append('<img src="images/goodsInfo_12.png"/>'+ obj.star_number);
		$('.good-name').append(obj.goods_name);
		$('.info-item').append('价格：<span>￥' + obj.price +'元</span>')
	    
	    //加入购物车
	    $('.btn')[0].onclick = function() {
//	    	验证用户是否登陆
           if ( !localStorage.token ) {
           	  location.href = 'login.html#callbackurl='+ location.href;
           	  return;
           }
           //获取当前商品已经购买的数量
           var goods_number = localStorage.getItem('cart' + goods_id);
           goods_number = goods_number ? parseInt(goods_number)+1 : 1;
	       updateCartInfo(goods_id, goods_number, function(response){
	          location.href = 'cart.html';
	       });
	    }
	});
});


//放大镜
$('.left-img').mouseover(function() {
	$('.zoom').show();
	$('.big-pic').show();
});
$('.left-img').mouseout(function() {
	$('.zoom').hide();
	$('.big-pic').hide();
});
var rate =340/170;
var leftImg = document.getElementById('leftImg');
var zoom = document.getElementById('zoom');
var bigImg = document.getElementById('bigPic').getElementsByTagName('img');
leftImg.onmousemove=function(event){
            event = event || window.event;   
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            // 周转一下，得到x ， y
            var x = event.clientX - (getAllLeft( leftImg ) - scrollLeft)-85;
            var y = event.clientY - (getAllTop( leftImg ) - scrollTop)-85;
            if (x < 0) x = 0;
            if (y < 0) y = 0;
            if (x > leftImg.clientWidth-zoom.offsetWidth) {
            	x = leftImg.clientWidth-zoom.offsetWidth;
            }
            if (y > leftImg.clientHeight-zoom.offsetHeight) {
            	y = leftImg.clientHeight-zoom.offsetHeight;
            }
            zoom.style.top = y +"px";
            zoom.style.left = x +"px";
            
            bigImg[0].style.top = -y*rate+"px";
            bigImg[0].style.left = -x*rate+"px"
       }

        function getAllTop(obj){
            var allTop = obj.offsetTop;
            var currentObj = obj;
            while(currentObj =currentObj.offsetParent){
                allTop+=currentObj.offsetTop;
            }
            return allTop;
        }
        function getAllLeft(obj){
            var allLeft = obj.offsetLeft;
            var currentObj = obj;
            while(currentObj =currentObj.offsetParent){
                allLeft+=currentObj.offsetLeft;
            }
            return allLeft;
        }


