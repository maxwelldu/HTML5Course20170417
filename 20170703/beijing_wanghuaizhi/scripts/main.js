var itemHead=document.getElementsByClassName("item-head")[0];
var itemShow=document.getElementsByClassName("item")[0].getElementsByTagName("li");
new tool.ajax({
	"url":cat,
	"type": "GET",
    "dataType": "json",
    "success": function(response){
       	addTag(itemHead,"a","cat_name",response.data,"item-head-name");
        var kind=document.getElementsByClassName("item-head-name");		
			for (var n = 0; n < kind.length; n++) {
			kind[n].idx=n;
			kind[n].href="list.html?cat_id="+response.data[n].cat_id;
			}			
        },
    "error": function(message) {
      //
      console.log(message);
    }
});
new tool.ajax({
	"url":goods,
	"type":"GET",
	"dataType":"json",
	"success":function(response){
		var res=response;
		var img=document.getElementsByClassName("item-img");
		var itemName=document.getElementsByClassName("item-name");
		var itemDetail=document.getElementsByClassName("item-detail")
		addImg(img,"goods_thumb",response.data);
		addText(itemName,"goods_name",response.data,true);
		addText(itemDetail,"goods_desc",response.data);
			$("button.cart").click(function(){
				tool.addCart(res.data[$(this).index("button.cart")].goods_id,"1")
			})
	},
	"error":function(message){
		console.log(message);
	}
});
var search =document.getElementsByName("search")[0];
var searchBtn = document.getElementById("search-btn");
searchBtn.onclick=function searchClick(){
 	tool.ajax ({
		"url":goods+"?search_text="+search.value,
		"type":"GET",
		"dataType":"json",
		"success":function(response){
			console.log(response);
			location.href="search.html?search_text="+search.value
		},
		"error":function(message){console.log(message)}
	})
 }
 window.onload=function(){
 	if (localStorage.token) {
 		$("nav .login").css("display","none");
 		tool.logined();
 		$(".login-box button:eq(1)").click(function() {
					console.log("cl")
					$(".login").css("display","block");
					localStorage.clear();
					$("#userInfo").remove();
		});
 	}
 }
$("nav>.login>button").click(function() {
	$.ajax(
	{
		"url":"http://h6.duchengjiu.top/shop/api_user.php",
		"dataType":"json",
		"data":{
			"status":"login",
			"username":$(".login input:eq(0)").val(),
			"password":$(".login input:eq(1)").val()},
		"type":"POST",
		success:function (response) {
			console.log(response)
			if (response.code===1001) {
				alert(response.message)
			}
			else if(response.code==0)
			{
				localStorage.setItem("token",response.data.token);
				localStorage.setItem("username", response.data.username);
				localStorage.setItem("avatar", response.data.avatar)
				localStorage.setItem("user_id", response.data.user_id)
				$("nav .login").css("display","none");
				tool.logined();
				$(".login-box button:eq(1)").click(function() {
					console.log("cl")
					$(".login").css("display","block");
					localStorage.clear();
					$("#userInfo").remove();
				});
			}
		}
	})
});
