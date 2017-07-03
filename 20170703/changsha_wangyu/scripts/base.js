//用户登录信息接入
if (localStorage.getItem('token')) {
	    $('.usrImg').attr("src", "images/header_d_head.png")
        $('.usrName').text(localStorage.getItem('username'));
        $("#inxusr").show(); 
        $(".login-btn, .register-btn").hide();
}
//退出登录
$(".exit").click(function(){
         localStorage.removeItem("username");
         localStorage.removeItem("password");
         localStorage.removeItem("token"); 
         $("#inxusr").hide();
         $(".login-btn, .register-btn").show();
})
//搜索功能
var str = 1;
var oSearch = $('.search-input');
$('.search-icon').click(function() {
	if ($("#glb_keyword").val() == 0 ) {
		if (str === 1) {
			oSearch.animate({
		       "left": 10
		    },500);
		   str = 2 ; 
		   return;
		}
		if ( str === 2) {
			oSearch.animate({
		       "left": 266
		    },500);
		    str = 1;
		}
	} else {		
		if (/^\s+$/g.test($("#glb_keyword").val())) {
			alert("请输入内容");
		} else {
			location.href = 'search.html?search_text=' + $("#glb_keyword").val();
		}
	}
});	
var searchText = $.getQueryString('search_text');
var oSearchText = document.getElementById("glb_keyword");
oSearchText.value = searchText;
searchGoods();

function searchGoods () {
	$.ajax({
    "url": 'http://lc.shudong.wang/api_goods.php?search_text=' + searchText,
    'type': 'GET',
    'dataType': 'json',
    'success': function(response) {
      console.log(response);
      var content = "";
      for (var i = 0; i < response.data.length; i++) {
        var obj = response.data[i];
        content += `
            <div class= "sea-list">
              <div class="like"></div>
              <div class="goods-img">
                 <a href="">
                    <img class="img-1" src="${obj.goods_thumb}"/>
                    <img class="img-2" src = "images/icon_car_black.png" />
	             </a>
	          </div>
	          <div class="sea-shop">
	             <span>￥${obj.price}
	                 <a href="cart.html">
	                    <img src = "images/icon_car.png"
	                 </a>
	             </span>
	             <a href="pro_center.html?goods_id=${obj.goods_id}" class="con">
	                ${obj.goods_name}
	             </a>
	          </div>
	        </div>`;
      }
	$('.section-list').html(content);
    }
  });
}



		

	
	


//获取商品列表
$.ajax({
	"url": 'http://lc.shudong.wang/api_cat.php',
	"type": "get",
	"dataType": "json",
	"success": function(response) {
		for (var i = 0; i < response.data.length; i++) {
			var obj = response.data[i];
		    $(".list").append(
		    	'<li><a href="pro_list.html?cat_id='
		    	+ obj.cat_id
		    	+ '"><img src="./images/index/index_img'
		    	+ i +'.png"/><p>' 
		    	+obj.cat_name
		    	+ '</p></a></li>') ;      
        }
	},
	"error": function(message) {
		console.log(message);
	}
});
