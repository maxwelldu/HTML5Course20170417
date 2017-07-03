 $(function(){
        $.ajax({
            "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem('token'),
            "type": "GET",
            "dataType": "json",
            "success": function(response) {
                console.log(response);
                if (response.data.length > 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        var obj = response.data[i];
                        obj.subtotal = parseInt(obj.goods_price)*parseInt(obj.goods_number);
                        var tr = '<ul data-id="'+obj.goods_id+'">\
                  <li class="txtl" style="width: 100px;">\
                    <input type="checkbox" class="chkbox" id="chec" checked="true">\
                  </li>\
                  <li class="txt2"><img src="'+obj.goods_thumb+'" />'+obj.goods_name+'</li>\
                  <li class="txt3"><span class="operate minus" id="minus-'+obj.goods_id+'">-</span><input type="text" value="'+obj.goods_number+'" class="goods_number" /> <span class="plus"'+obj.goods_id+'>+</span></li>\
                  <li class="txt4">'+obj.goods_price+'</li>\
                  <li class="txt5" id="subtotal'+obj.goods_id+'">'+obj.subtotal+'</li>\
                  <li class="txt6" id="date">删除</li>\
                </ul>';
                        $('#shoppingcarList').append($(tr));
                    }
                    $('ul').click(function (event) {
                        console.log(event);
                        event  = event || window.event;
                        var target = event.target || event.srcElement;
                        if (target.innerText == "+"){
                            var oNumber = $(target).prev();
                            var number = oNumber.val();
                            if(++number>10){
                                number=10;
                            }
                            oNumber.val(number);
                            var price = parseInt($(event.target).parent().next().text());
                            console.log(price);
                            var oSubtotal = $(event.target).parent().next().next();
                            console.log(oSubtotal);
                            var subtotal = price * number;
                            oSubtotal.text(subtotal);
                            showSum();
                            var goods_id = $(event.target).parent().attr('data-id');
                            // shop.api.updateCart(goods_id,number,function (response) {
                            //     console.log(response);
                            // });
                            return;
                        }
                        if (target.innerText == "-"){
                            var oNumber = $(target).next();
                            var number = oNumber.val();
                            if(--number<0){
                                number=0;
                            }
                            oNumber.val(number);
                            var price = parseInt($(event.target).parent().next().text());
                            console.log(price);
                            var oSubtotal = $(event.target).parent().next().next();
                            console.log(oSubtotal);
                            var subtotal = price * number;
                            oSubtotal.text(subtotal);
                            showSum();
                            var goods_id = $(event.target).parent().attr('data-id');
                            // shop.api.updateCart(goods_id,number,function (response) {
                            //     console.log(response);
                            // });
                            return;
                        }
                        if(target.innerText === "删除"){
                            var us = $(event.target)[0].parentNode;
                            console.log(us);
                            $("#shoppingcarList")[0].removeChild(us);
                            $.ajax({
                                "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                                "type":"POST",
                                "data":{
                                    "goods_id":goods_id,
                                    "number":0
                                },
                                "dataType":"json",
                                "success":function (response) {
                                    console.log(response);
                                }
                            })
                        }
                        if(event.target.type === 'checkbox'){
                            showSum();
                            checkSelectAll();
                        }
                    })
                    showSum();
                }
            }
        });
    });
$('date').click(function (event) {
    event=event||window.event


})
function showSum() {
    var trs = $('#shoppingcarList ul:gt(0)');
    var sum = 0;
    for (var i = 0; i < trs.length; i++) {
        var ul = trs[i];
        //判断一下当前行的选中框是否选中，如果选中则计算到总价中;
        if ($(ul).children("li:first").children("input:checkbox").is(':checked')) {
            sum += parseInt($(ul).children('li:eq(4)').text());
        }
    }
    $('#payMoneyTxt').text(sum);
}
 console.log($('ul'));
 function checkSelectAll() {
     var good_count = $('input:checkbox').filter('[class="checkbox"]').length;
     if($('input:checkbox').filter('[class"chkbox"]').filter(":chcked").length!==good_count){
         $('#selectAll').prop('checked',false);
     }else{
         $('#selectAll').prop('checked',true);
     }
 }
 // function deleteGoods(obj) {
 //     updateCart(obj,0);
 //     var tr = obj.parentNode.parentNode;
 //     tr.parentNode.removeChild(tr);
 // }
 // function minusGoods(obj) {
 //     updateCart(obj,'-1');
 // }
 // function plusGoods(obj) {
 //     updateCart(obj,'+1');
 // }
// function setGoods(obj) {
//     var num = paresInt($(obj).val());
//     if (num<1 || isNaN(num)) $(obj).val(1);
//     if (num>10) $(obj).val(10);
//     updateCart(obj,$(obj).val());
// }
// function stepSetGoods(obj,event) {
//     event.preventDefault();
//     if (event.keyCode === 40){
//         minusGoods(obj);
//     }else if(event.keyCode === 38){
//         plusGoods(obj);
//     }
// }
// function updateCart(obj,num) {
//     var tr = obj.parentNode;
//     var goods_id = tr.getElementsByClassName('goods_id')[0].value;
//     var goods_number = tr.getElementsByClassName('goods_number')[0];
//     var goods_number_value = parseInt(goods_number.value);
//     var goods_price = tr.getElementsByClassName('gooods_price')[0];
//     var goods_proce_value = parseInt(goods_price.innerText);
//     var goods_subtotal = tr.getElementsByClassName('subtotal')[0];
//     if (num === '-1' && goods_number_value <= 1) {
//         return;
//     }
//     if (num === '+1' && goods_number_value >= 10) {
//         return;
//     }
//
//     if (num === '-1') {
//         goods_number_value--;
//     } else if(num === '+1') {
//         goods_number_value++;
//     } else if(num > 0) {
//         goods_number_value = num;
//     } else {
//         goods_number_value = 0;
//     }
//     goods_number.value = goods_number_value;
//
//     var subtotal = goods_number_value * goods_price_value;
//     goods_subtotal.innerText = subtotal;
//     updateCartInfo(goods_id, goods_number_value, function(){
//     });
//     showSum();
// }
$('#checkouBtn').click(function () {
    location.href='address.html';
})