$(function() {
    		$("#name").blur(function() {
    			var oName = $("#name").val();
    			var verifyN = $("#verify-name");
    			$.ajax({
    				"type": "post",
    				"url": "http://h6.duchengjiu.top/shop/api_user.php",
    				"dataType": "json",
    				"data": {
    					"status": "check",
    					"username": oName   					
    				},
    				"success": function(response) {
    					console.log(response);
    					if ( response.code === 2001 ) {
//  						console.log(response.code);
    				        verifyN.text("! 用户名已被占用，请重新命名");
    				        return false;
    			        } else if ( !/^\w{3,20}$/.test(oName) ) {
    			        	verifyN.text("! 用户名小于3位 ");
    			        	return false;
    			        } 
    			        if ( response.code === 0 && /^\w{3,20}$/.test(oName) ) {
    			        	verifyN.text("用户名可以注册");   			 
    			        }
    				},
    				async:true
    			});   			
    		});
    		//点击注册按钮
    		$(".regBtn").click(function() {
    			var oName = $("#name").val();
    			var oPwd = $("#pwd").val();
    			var oPwds = $("#pwds").val();
    			var verifyN = $("#verify-name");
    			var verifyP = $("#verify-pwd");
//  			console.log([oName, oPwd , oPwds])
    			if (!/^\w{3,20}$/.test(oName) ) {
		 			verifyN.text("用户名不规范");
		 			return false;
		 		}else if(!/^\w{6,16}$/.test(oPwd) ){
		 			verifyP.text("密码位数小于6位");
		 			return false;
		 		} else if(oPwd != oPwds){
		 			verifyP.text("密码不一样");
		 			return false;
		 		} else if (!$("#ourtreaty").is(':checked')) {
		 			alert("请勾选良仓注册协议");
		 			return false;
		 		}
		 		
    			$.ajax({
    				"type": "post",
    				"url": "http://h6.duchengjiu.top/shop/api_user.php",
    				"dataType": "json",
    				"data": {
    					"status": "register",
    					"username": oName,
    					"password": oPwd
    				},		 	
    				"success": function(response) {
    					console.log(response);	
    					 if ( response.code === 0 ) {
//  						console.log(response.code);
    				        alert("注册成功");
    				        $(".regBtn").attr("disabled", true);
    				        window.location.href="../login.html";
    			        } 
				 	},			    	    
    				"async": true
    			});
    		});
    		$("#name").focus(function() {
    			$(".regBtn").attr("disabled", false);
    		}); 		
    	});