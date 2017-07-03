$(function(){
// 把总计存起来 给另一个页面调用

    // $('#checkout').click(function(){
    //     location.assign('checkout.html?total='+  $('#payMoneyTxt').text());
    // });
   $.ajax({
     "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem('token'),
       "type": "GET",
       "dataType": "json",
       "success": function (response) {
           console.log(response);


           if(response.data.length > 0) {
               for (var i = 0; i < response.data.length; i++) {
                   var obj = response.data[i];
                   obj.subtotal = parseInt(obj.goods_number) * parseInt(obj.goods_price);
                   var goods = $('<div class="goods"></div>');
                   var goodsBox = $('<div class="goods-box"></div>');
                   var goodsLists = $('<div class="goods-lists"></div>');
                   var goodsOp = $('<div class="goods-op"></div>');

                    $('#Shop').append($(goods));
                    goods.append($(goodsBox));
                   goodsBox.append($('<input type="checkbox" class="chkbox">'));
                   goodsBox.append($('<input type="hidden" class="goods_id" value="'+obj.goods_id+'"/>'));
                   goodsBox.append($('<img src="'+ obj.goods_thumb +'"/>'));
                   goodsBox.append($('<p></p>').text(obj.goods_name));
                    goods.append($('<div class="goods-one"></div>').text(obj.goods_price));
                    goods.append(goodsLists);
                    goodsLists.append($('<span class="left-button" id="left-button" onclick="minusGoods(this)"></span>').text("-"));
                    goodsLists.append($('<input class="center-text" id="center-text" onblur="setGoods(this)" onkeydown="stepSetGoods(this, event)"/>').val(obj.goods_number));
                   goodsLists.append($('<span class="right-button" id="right-button" onclick="plusGoods(this)"></span>').text("+"));
                   goods.append($('<div class="goods-sum">'+obj.subtotal+'</div>'));
                   goods.append($(goodsOp));
                   goodsOp.append($('<span onclick="deleteGoods(this)"></span>').text("删除"));

               }
               var shopSetBox = $('<div class="shop-set-box"></div>');
               $('#shopSet').append(shopSetBox);
               shopSetBox.append($('<span id="Delete"></span>').text("选择删除"));
               var shopSetBoxRi = $('<div class="shop-set-box-ri"></div>');
               shopSetBox.append(shopSetBoxRi);
               shopSetBoxRi.append($('<p class="shop-set-box-ri-1"></p>').html("已选商品" + '<em id="Amount">1</em> ').append($('<h6>总价（不含运费）：<em id="Money"></em></h6>')));
               shopSetBoxRi.append($('<a  id="SetMet">去结算</a>'));
               // var leftButton = document.getElementById('left-button');
               // leftButton.onclick = function () {
               //     minusGoods(this)
               // };
               // var rightButton = document.getElementById('right-button');
               // rightButton.onclick = function () {
               //     plusGoods(this)
               // };
               // var centerText = document.getElementById('center-text');
               // centerText.onclick = function () {
               //     setGoods(this);
               // };
               // centerText.onkeydown = function () {
               //   stepSetGoods(this);
               // }

           }
           $('#SetMet').click(function () {
               console.log(1);
               location.assign('settle.html?total='+  $('#Money').text())
           });
           showSum();
           $('#Delete').click(function () {
               // var goods = document.getElementsByClassName('goods');
               // var Shop = document.getElementById('Shop');
               console.log(1);
               $('.alerts').show();

               // $('#selectAll').
               $('.yesf').click(function () {
                   $('.alerts').hide();
                   var inputs = $('.goods input:checked');
                   console.log(inputs);
                   // if(inputs.is(':checked')){
                   for(var i = 0; i < inputs.length; i++){

                       // var goodsE = goods[i];
                       var goods_id = document.getElementsByClassName('goods_id')[0].value;
                       var goodsL = inputs[i].parentNode.parentNode;
                       // console.log($(goodsE).children('div:first').children('input'));
                       // if($(goodsE).children('div:first').children('input').is(':checked')){
                       goodsL.parentNode.removeChild(goodsL);
                       // $('#Shop').children(goodsL).remove();
                       updateCartInfo(goods_id, 0, function () {

                       });
                       // }
                   }
                   // }
               });
               $('.nof').click(function () {
                   $('.alerts').hide();
                   return;
               });
               $('.nosf').click(function () {
                   $('.alerts').hide();
                   return;
               })
           });
       }
    })
});

function showSum() {
    var goods = document.getElementsByClassName('goods');
    var sum = 0;
    var num = 0;
    for (var i = 0; i < goods.length; i++){
        var goodsS = goods[i];
        // console.log($(goodsS).children("div:first").children('input'));
        // console.log($(goodsS).children("div:eq(2)").children("input").val());
        if($(goodsS).children("div:first").children('input').is(':checked')) {
            sum += parseInt($(goodsS).children("div:eq(3)").text());
            num += parseInt($(goodsS).children("div:eq(2)").children("input").val());
        }


    }
    $('#Money').text("￥"+sum);
    $('#Amount').text(num);
}
// function Delete(obj) {
//     // updataCart(obj, 0);
//     var goods = obj.parentNode.previousSbiling.children("div");
//     if($(goodsE).children('div:first').children('input').is(':checked')){
//         Shop.removeChild(goods);
//     }
// }


$('#Shop').click(function (event) {
    // 全局委托方法
    // 全选
    if(event.target.id === 'selectAll'){
      var selected = event.target.checked;
      // console.log(selected);
      var checkboxs = document.getElementsByClassName('chkbox');
      // console.log(checkboxs);
      for(var i = 0; i < checkboxs.length; i++){
          checkboxs[i].checked = selected;
      }
      showSum();
        return;
    }

    if(event.target.type === 'checkbox'){
        showSum();
        checkSelectAll();
    }
});
function selectAll(obj) {
    // $('input[class="chkbox"]').prop('checked', obj.checked);
    // console.log(obj);
    showSum();
}
function checkSelectAll() {
    var goods_count = $('input:checkbox').filter('[class = "chkbox"]').length;
    if($('input:checkbox').filter('[class = "chkbox"]').filter(":checked").length !== goods_count) {
        $('#selectAll').prop('checked', false);
    } else {
        $('#selectAll').prop('checked', true);
    }
}
// 删除某件商品
function deleteGoods(obj) {
    $('.alert').show();
    $('.yes').click(function () {
        $('.alert').hide();
        updataCart(obj, 0);
        var goods = obj.parentNode.parentNode;
        Shop.removeChild(goods);
    });
    $('.no').click(function () {
        $('.alert').hide();
       return;
    });
    $('.nos').click(function () {
        $('.alert').hide();
        return;
    });
}
// 加某件商品
function plusGoods(obj) {
    updataCart(obj, '+1')
}
// 减某件商品
function minusGoods(obj) {
    updataCart(obj, '-1');
}
//设置某件商品
function setGoods(obj) {
    var num = parseInt($(obj).val());
    if(num < 1 || isNaN(num)) $(obj).val(1);
    if(num > 10) $(obj).val(10);
    updataCart(obj, $(obj).val());
}
//键盘事件
function stepSetGoods(obj, event) {
    var event = event || window.event;
    event.preventDefault();
    if(event.keyCode === 40){
        minusGoods(obj)
    } else if(event.keyCode === 38){
        plusGoods(obj);
    }
}
function updataCart(obj, num) {
    var Shop = obj.parentNode.parentNode;
    var goods_id = Shop.getElementsByClassName('goods_id')[0].value;
    var goods_number = Shop.getElementsByClassName('center-text')[0];
    var goods_number_value = parseInt(goods_number.value);
    var goods_price = Shop.getElementsByClassName('goods-one')[0];
    var goods_price_value = parseInt(goods_price.innerText);
    var goods_subtotal = Shop.getElementsByClassName('goods-sum')[0];
    if(num === '-1' && goods_number_value <= 1){
        return;
    }
    if(num === "+1" && goods_number_value >= 10){
        return;
    }
    if(num === '-1') {
        goods_number_value--;
    } else if(num === '+1') {
        goods_number_value++;
    } else if(num > 0) {
        goods_number_value = num;
    } else {
        goods_number_value = 0;
    }
    goods_number.value = goods_number_value;
    var subtotal = goods_number_value * goods_price_value;
    goods_subtotal.innerText = subtotal;

    updateCartInfo(goods_id, goods_number_value, function () {
        
    });
    showSum();
}

