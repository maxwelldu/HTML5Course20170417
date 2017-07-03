function itemGet () {
	this.inti=function () {
		$.get("http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,function (response) {
			for (var i = 0; i < response.data.length; i++) {
				var li=document.createElement("li");
				$(li).html('<img src="'+response.data[i].goods_thumb+'" /><a class="item-name" href="detail.html?goods_id='+response.data[i].goods_id+'">'+response.data[i].goods_name+'</a><span class="item-num">'+response.data[i].goods_number+'</span><span class="item-price">'+response.data[i].goods_price+'</span><span class="all-price">'+response.data[i].goods_number*response.data[i].goods_price+'</span>')
				$(".item-container").append(li);
				$(".item-container li img").css({"width":"100px","height":"100px","margin-right":"50px"});
			};
		},"json")
	}
	this.inti();
}
function addressGet () {
	$.get("http://h6.duchengjiu.top/shop/api_useraddress.php?status=add?token="+localStorage.token,function (response) {
		var address=document.createElement("li");
		console.log(response);
		if(response.data){
			address.innerHTML="<span>"+response.data.consignee+"<span>";
			$(".address-container").append(address)	
		}
			
	})
}
//用于获取地址的函数
window.onload=function () {
	event=event||window.event;
	var p = $(".area-select>p").get();
	new itemGet();
	new addressGet();
	sessionStorage.setItem("city","空");
	sessionStorage.setItem("province","空");
	sessionStorage.setItem("country","空");
	sessionStorage.setItem("district","空");
	$("#cancel").click(function (event) {
		$("dialog").removeAttr("open");
	})
	$("#getter").blur(function(event) {
		if(!this.value)$(this).siblings('span').text("收件人不能为空")
		else{$(this).siblings('span').text(null)}
	});
	$("#address-name").blur(function(event) {
		if(!this.value)$(this).siblings('span').text("地址不能为空")
		else{$(this).siblings('span').text(null)}
	});
	$("#tel-number").blur(function(event) {
		if(!this.value)$(this).siblings('span').text("手机号不能为空")
		else if(!this.value.match(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,2-3,5-9]))\d{8}$/))$(this).siblings('span').text("手机号码格式不正确")
		else{$(this).siblings('span').text(null)}
	});
	$(".address button").click(function () {
		$("dialog").attr("open","true");
	});
	$(".area-box").click(function (event) {
		event.preventDefault();		
		var number=$(this).index()-1;
		var target=event.target||event.srcElement;
		var text=target.innerText;
		if(target.tagName=="A"){
			$(".area-container-column").eq(number).text(text);
			console.log(this.className.search(/country|province|city|district/));
			if($(".area-select>p").text()==="--请选择--")$(".area-select>p").text("");
			sessionStorage.setItem(this.className.match(/country|province|city|district/),text);
			p[0].innerText=sessionStorage.country+"/"+sessionStorage.province+"/"+sessionStorage.city+"/"+sessionStorage.district;
			if($(".area-container-column").eq(number+1)){$(".area-container-column").eq(number+1).addClass('show')};
		}		
	})
	$(".area-container-column").click(function (event) {
		event.preventDefault();
		var number = $(this).index();
		$(".area-container-column").removeClass('current');
		$(this).addClass("current")
		$(".area-box").removeClass("current");
		$(".area-box").eq(number).addClass("current")
	})
	$("dialog .add-address-ui>button").click(
		function () {
			$("dialog").removeAttr("open");
			$.post("http://h6.duchengjiu.top/shop/api_useraddress.php?status=add",{"token":localStorage.token,"address_name":$("#address-name").val(),"consignee":$("#getter").val(),"country":sessionStorage.country,"province":sessionStorage.province,"city":sessionStorage.city,"district":sessionStorage.district,"zip_code":$("#address-code").val(),"mobile":$("#tel-number").val(),"email":$("#email").val(),"sign_building":$("#address-detail").val()},function (response,message)
			{
				console.log(response);
				console.log(message)
			});
			// sessionStorage.addressDetail=$("#address-detail").val();
			// sessionStorage.telNumber=$("#tel-number").val();
			// sessionStorage.addressCode=$("#address-code").val();
			// sessionStorage.email=$("#email").val();
		})
}