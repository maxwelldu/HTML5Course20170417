		$(function() {
			$('input[name="username"]').blur(function(){
			
			//检测用户是否注册
			shop.api.checkUsernameUnique($(this).val(), function(response) {
				console.log(response);
					 if(response.code === 2001 ) {
								$('p>b').show();
								$('p:eq(0)>span').hide();
								$('p:eq(0)>em').hide();
								return;
							}else{
								$('p>b').hide();
							}
						});
			//检测用户名不能为空或大于3小于10
				if($(this).val() == '' || $(this).val().length < 3 || $(this).val().length > 10) {
					$('p:eq(0)>span').hide();
					$('p:eq(0)>i').show();
					$(this).css('border','1px solid red');
						return;
				
				}else{
					$('p:eq(0)>em').show();
					$('p:eq(0)>i').hide();
					$('p:eq(0)>span').show();
					$(this).css('border','none');
				}
			});
			//检测密码不能为空
			$('input:eq(1)').blur(function() {
				if(!/[a-z0-9A-Z]{6,20}$/.test($(this).val())){
					$('p:eq(1)>i').show();
					$('p:eq(1)>span').hide();
					$(this).css('border','1px solid red')
						return;
					
				}else {
					$('p:eq(1)>i').hide();
					$('p:eq(1)>span').show();
					$('p:eq(1)>em').show();
					$(this).css('border','none')
				}
			});


			$('input:eq(2)').blur(function() {
				console.log($(this).val());
				console.log($('input:eq(1)').val());
				if( $(this).val() != $('input:eq(1)').val()) {
					$('p:eq(2)>i').show();
					$('p:eq(2)>span').hide();
					$('p:eq(2)>em').hide();
					$(this).css('border','1px solid red')
					return;
				}else {
					$('p:eq(2)>i').hide();
					$('p:eq(2)>span').show();
					$('p:eq(2)>em').show();
					$(this).css('border','none');
						}
					})					
		

		//点击注册按钮
		//
		$('#register').click(function() {
			//获得用户名和密码
		var username = $('input[name = "username"]').val();
		var password = $('input[name = "password"]').val();
		if( password != $('input:eq(2)').val()) {
				
					return;
		}
	shop.api.register(username, password, function(response){
              console.log(response);
              if(response.code === 0 ) {
							alert('注册成功');
							 location.assign('index.html');
						} 
          });
		})
	})