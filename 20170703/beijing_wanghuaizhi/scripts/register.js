var check=0;
$("#registe").click(function () {
	var username= $("input[name='username']").val();
	var password= $("input[name='password']").val();
	var rePassword= $("input[name='re-password']").val();
	var timer;
	var regName= /[^a-zA-Z0-9_]/g
	if(check==1){
		alert("您的操作过于频繁，请稍后");
		return};
	$(".reg-column div i").text(null);
	if(username.length>=4&&username.length<=20&&!username.match(regName)&&password===rePassword&&password.length>=6&&password.length<=20){
		$(".reg-column i").text(null);
		$.ajax({
			"url":"http://h6.duchengjiu.top/shop/api_user.php",
			"type":"post",
			"data":{
				"status":"register",
				"username":username,
				"password":password
			},
			"dataType":"json",
			success:function(response){
			
			},
			error:function(message){
				console.log(message)
			}
		})}		
		else if (username.length<3||username.match(regName)||username.length>20) {			
			$(".reg-column>div").eq(0).find("i").text("用户名必须由3～20位的字母数字下划线组成,且不能包含特殊字符");		
		}
		else if(password!==rePassword){
			$(".reg-column>div").eq(1).find("i").text("重复密码与之前不一致!");
		}
		else if(password.length<6||password.length>20)
		{
			$(".reg-column>div").eq(1).find("i").text("密码必须为3～20位");
		}
		check=1;
		timer=setTimeout(function(){check=0}, 3000);
});
$(".reg-column input").blur(function(){
		var username=$(".reg-column div input:eq(0)").val();
		$.ajax({
			"url":"http://h6.duchengjiu.top/shop/api_user.php",
			"type":"post",
			"data":{
				"status":"check",
				"username":username
			},
			"dataType":"json",
			success:function(response){
				$(".reg-column>div").eq(0).find("i").text(null);
				$(".reg-column input:eq(0)").css("backgroundColor","white")
				console.log(response)
				if (response.code===2001) {$(".reg-column>div").eq(0).find("i").text("用户名已存在")
					$(".reg-column input:eq(0)").css("backgroundColor","yellow");
				}
			}
		})
	});