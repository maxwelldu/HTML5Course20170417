var total = $.getQueryString('total');
$('#total').text('总计：'+total);
var address_id = 0;
$('#address').click(function(event) {
	console.log(event.target);
	if(event.target) {
		address_id = event.target.getAttribute('data-id');
	}
})


	$(function() {
		$('#order').click(function() {
			if(address_id === 0) {
				alert('请选择订单');
				return;
			}
			location.assign('order.html?total='+  $('#payMoneyTxt').text());
			shop.api.addOrder(address_id, total, function(response) {
				console.log(response);
				location.assign('order.html');
			});
		});
		$('#addUserAddress').click(function() {
			$('.layer').show();
			$('.information').show();
		})
		$('.newly>span').click(function() {
			$('.layer').hide();
		
		});
	  	$('#add').click(function(){
	        var data = $("form").serialize();
	        console.log(data);
	        shop.api.addUserAddress(data, function(response){
	          console.log(response);
	          if(response.code === 0 ) {
	          	$('.layer').hide();
	          	fetchUserAddress();
	          }
	        });
	     });
	  	fetchUserAddress();
	    function fetchUserAddress() {
	        shop.api.fetchUserAddress(function(response) {
	          var html = "";
	          for (var i = 0; i < response.data.length; i++) {
	            var obj = response.data[i];
	            html += '<div class="address-item" data-id="'+obj.address_id+'">'+ obj.address_name +'<br/> ' + obj.city + '&nbsp&nbsp&nbsp&nbsp' + obj.province + '&nbsp&nbsp&nbsp&nbsp ' + obj.district + ' <br/>' + obj.address +' <br/>' + obj.mobile + ' <span class="out">删除</span></div>';
	          }
	          $('#address').html(html);
	        });
	      }
	      
	})
	$('.out').click(function() {
		$('.address-item').parent().remove('.address-item');
	}) 