/**
 * Created by Administrator on 2017/6/28.
 */
// $('#content-detail').click(function(event){
//     if(event.target.type === 'checkbox'){
//
//     }
// });
function plusCount(obj){
    updateCart(obj,1);

}
function minusCount(obj){
    updateCart(obj,-1);
}
function updateCart(obj,num){
    var oUl = obj.parentNode.parentNode;
    var goodsCount = oUl.getElementsByClassName('goods-number')[0];
    var goodsTotalPrice = oUl.getElementsByClassName('goods-total')[0];
    var goodsPriceVal = oUl.getElementsByClassName('goods-price')[0].innerText;
    var goodsCountVal = goodsCount.value;
    var goods_id = oUl.id.substr(6);
    goodsCountVal = parseInt(goodsCountVal)+parseInt(num);
    if(obj.nodeName === 'INPUT'){
        goodsCountVal = num;
    }
    if(goodsCountVal <=1){
        goodsCountVal=1;
    }
    goodsTotal = goodsCountVal*goodsPriceVal;
    goodsCount.value = goodsCountVal;
    localStorage.setItem('cart-'+goods_id,goodsCount.value );
    goodsTotalPrice.innerText=goodsTotal;
    goodsTotal = goodsCountVal*goodsPriceVal;
    getTotalPrice();
    $.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,{goods_id:goods_id,number:goodsCountVal},function(resp){
        console.log(resp);
    })
}
function setGoods(obj){
    var num = parseInt($(obj).val());
    // console.log(num);
    if(num < 1 || isNaN(num)) $(obj).val(1);
    if(num > 10) $(obj).val(10);
    // console.log(num);
    updateCart(obj, $(obj).val());
}
//事件委托

function selectAll(obj){
    $('.chked').prop('checked',obj.checked);
    $('.selectAll').prop('checked',obj.checked);
    getTotalPrice();
}

function checkSelect(){
    // console.log($('#content-detail>ul').length,$('.chked:checked').length);
    if($('#content-detail>ul').length === $('.chked:checked').length){
        $('.selectAll').prop('checked',true);
    }else{
        $('.selectAll').prop('checked',false);
    }
}
$(function(){
  var goodsDetail = $('#content-detail');
  var url  = 'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token;
  $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function(resp) {
          var goodsInner ='';
          if(resp.data.length !== 0){
              for (var i = 0; i < resp.data.length; i++) {
                  var obj = resp.data[i];
                  var price = parseInt(obj.goods_price*obj.goods_number);
                  getTotalPrice()
                  goodsInner += '<ul id="goods-'+obj.goods_id+'">';
                  goodsInner +='<li><input  class="chked" type="checkbox" value="1" checked></li>';
                  goodsInner +='<li class="cart-goods">' +
                      '<img src="'+obj.goods_thumb+'" alt="">' +
                      '<div class="goods-right">' +
                      '<p>'+obj.goods_name+'</p>'+
                      '</div>' +
                      '</li>';
                  goodsInner +='<li>￥<span class="goods-price">'+obj.goods_price+'</span></li>';
                  goodsInner +='<li class="cart-goods-count"><a onclick="minusCount(this)" onselectstart="return false">-</a><input class="goods-number" type="text" value="'+obj.goods_number+'" onblur="setGoods(this)"><a onclick="plusCount(this)" onselectstart="return false">+</a></li>';
                  goodsInner +='<li id="goods_price"><span class="goods-total">'+price+'</span></li>';
                  goodsInner +='<li class="delete" ><span id="deleteGoods-'+ obj.goods_id + '" onclick="deleteGoods(this)">删除</span></li>';
                  goodsInner +='</ul>';
              }

          }else{
              goodsInner='<span class="emptyCart">购物车空空如也</span>';
          }
          goodsDetail.html(goodsInner);
          getTotalPrice();
          $('#balance').prop('href','goods_balance.html?total='+$('#totalPrice').find('i').text().substr(1));
      }


  });


});
$('#content-detail').click(function(event){
    event = event || window.event;
    if(event.target.type === 'checkbox' ){
        checkSelect();
        getTotalPrice();
    }
});
function getTotalPrice(){
    var uls = $('ul[id^="goods-"]');
    var totalPriceDom = $('#totalPrice').find('i');
    var totalPrice = 0;
    for(var i = 0;i < uls.length;i++){
        var price=uls[i].getElementsByClassName('goods-total')[0].innerText;
        var ischck = uls[i].getElementsByClassName('chked')[0].checked;
        if(ischck){
            totalPrice += parseInt(price);
        }
    }
    totalPriceDom.text('￥'+totalPrice);
}
function deleteGoods(obj){
    var ul;
    if(obj.className === 'deleteAllGoods'){
        var inputs = $('.chked').filter(':checked');
        // console.log($('.chked').filter(':checked'));
        console.log(inputs);
        for(var i = 0; i < inputs.length;i++){
            ul = inputs[i].parentNode.parentNode;
            getTotalPrice();
            deleteGood(ul);
        }
    }else{
        ul = obj.parentNode.parentNode;
        deleteGood(ul);
    }
}
function deleteGood(ul){
    goods_id = ul.id.slice(6);
    $('#content-detail')[0].removeChild(ul);
    getTotalPrice();
    $.ajax({
       url:  'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
        dataType: 'json',
        type: 'post',
        data:{
           goods_id: goods_id,
           number: 0
        },
        success: function(resp){
           if(resp.code === 0){
               localStorage.removeItem('cart-'+goods_id);
               if($('#content-detail').html() === ''){
                   $('#content-detail').html('<span class="emptyCart">购物车空空如也</span>');
               }
           }
        }
    });
}