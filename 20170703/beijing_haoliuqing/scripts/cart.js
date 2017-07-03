$(function() {
    //立即结算按钮
  $("#submit-order").click(function() {
    location.assign('checkout.html?total='+$(".money-num").text());
  });
  $('#checkout').click(function(){
    location.assign('checkout.html?total='+  $('#payMoneyTxt').text());
  });
    shop.api.fetchCart(function(response){
      console.log(response);
      if (response.data.length > 0) {
        var obj = response.data;
        for(var i = 0; i < obj.length; i++){
          obj.subtotal = parseInt(obj[i].goods_price) * parseInt(obj[i].goods_number);
          $(".cart table").append('<tr class="goo">'
            +'<td height="135px"><input type="checkbox" class="chkbox"><input type="hidden" class="goods_id" value="${obj.goods_id}"></td>'
            +'<td style="text-align: left"><img src="' + obj[i].goods_thumb + '"><span>'+obj[i].goods_name +'</span></td>'
            +'<td class="good-price">' + obj[i].goods_price +'</td>'
            +'<td><button onclick="minusGoods(this)">-</button>'
            + '<input class="goods_number" type="text" value="'+obj[i].goods_number+'">'
            + '<button onclick="plusGoods(this)">+</button></td>'
            +'<td  class="subtotal">'+  obj.subtotal +'</td>'
            +'<td><span  onclick="deleteGoods(this)">'+'删除' +'</span></td>'
            + '</tr>');
        }
        showSum();
      }
  }); //ajax方法结束
});
function showSum() {
    var trs = $('table tr:gt(0)');
    //找到每行中的小计，累加起来就是总和
    var sum = 0;
    for (var i = 0; i < trs.length; i++) {
        var tr = trs[i];
        //判断一下当前行的选中框是否选中，如果选中则计算到总价中
        console.log($(tr).children("td:first"));
        console.log($(tr).children("td:first").children('input'));
        if ($(tr).children("td:first").children("input").is(':checked')) {
            sum += parseInt($(tr).children('td:eq(4)').text());
        }
    }
    $('.money-num').text(sum);
}

$('table').click(function(event){
    console.log(event.target);
    console.log($(event.target));
    //当点击的是加号，臣妾更新一下购物的数量
    // if (event.target.innerText === '+') {
    if (event.target.className === "operate plus") {
        console.log('++');
        //修改数量
        var oNumber = $(event.target).prev();
        var number = oNumber.val();
        oNumber.val(++number);
        //小计调整
        var price = parseInt($(event.target).parent().next().text());
        console.log(price);
        var oSubtotal = $(event.target).parent().next().next();
        var subtotal = price * number;
        oSubtotal.text(subtotal);
        //总价
        showSum();
        //ajax
        var goods_id = $(event.target).parent().parent().attr('data-id');
        shop.api.updateCart(goods_id, number, function(response){
            console.log(response);
        });
        return;
    }
    if (event.target.id === 'selectAll') {
        //全选的事情
        var selected = event.target.checked;
        console.log(selected);
        var checkboxs = document.getElementsByClassName('chkbox');
        console.log(checkboxs);
        for (var i = 0; i < checkboxs.length; i ++) {
            checkboxs[i].checked = selected;
        }
        showSum();
        return;
    }
    if (event.target.type === 'checkbox') {
        showSum();
        checkSelectAll();
    }
});
//全部选中
function selectAll(obj) {
    // $('input[class="chkbox"]').prop('checked', obj.checked);
    console.log(obj);
    showSum();
};

//检查全选的状态,不等于购物车里面的数量的时候就是 false
function checkSelectAll() {
    var goods_count = $('input:checkbox').filter('[class="chkbox"]').length;
    if ($('input:checkbox').filter('[class="chkbox"]').filter(":checked").length !== goods_count) {
        $('#selectAll').prop('checked', false);
    } else {
        $('#selectAll').prop('checked', true);
    }
}

//从购物车中删除某件商品
function deleteGoods(obj) {
    updateCart(obj, 0);
    //删除DOM元素
    var tr = obj.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
}
//减某件商品
function minusGoods(obj) {
    updateCart(obj, '-1');
}
//加某件商品
function plusGoods(obj) {
    updateCart(obj, '+1');
}
//设置某件商品
function setGoods(obj) {
    var num = parseInt($(obj).val());
    if (num < 1 || isNaN(num)) $(obj).val(1);
    if (num > 10) $(obj).val(10);
    updateCart(obj, $(obj).val());
}
function stepSetGoods(obj, event) {
    event.preventDefault();
    //如果是上则加，下则减
    if (event.keyCode === 40) {
        minusGoods(obj);
    } else if(event.keyCode === 38) {
        plusGoods(obj);
    }
}
function updateCart(obj, num) {

    var tr = obj.parentNode.parentNode;
    var goods_id = tr.getElementsByClassName('goods_id')[0].value;//商品ID的隐藏元素, 把商品ID给元素的属性赋值也可以
    var goods_number = tr.getElementsByClassName('goods_number')[0];//商品数量的元素
    var goods_number_value = parseInt(goods_number.value);//商品数量的值
    var goods_price = tr.getElementsByClassName('good-price')[0];//商品单价的元素
    var goods_price_value = parseInt(goods_price.innerText);//商品单价的值
    var goods_subtotal = tr.getElementsByClassName('subtotal')[0];

    //获得商品编号 和 数量
    if (num === '-1' && goods_number_value <= 1) {
        //当前商品数量为1, 并且是减，不允许再减
        return;
    }
    if (num === '+1' && goods_number_value >= 10) {
        //当前商品数量为10, 并且是加操作，不允许再加
        return;
    }
    if (num === '-1') {//-1
        goods_number_value--;
    } else if(num === '+1') {//+1
        goods_number_value++;
    } else if(num > 0) {//设置固定的数
        goods_number_value = num;
    } else {//删除
        goods_number_value = 0;
    }
    goods_number.value = goods_number_value;
    //小计的费用
    var subtotal = goods_number_value * goods_price_value;
    goods_subtotal.innerText = subtotal;
    //请求ajax
    updateCartInfo(goods_id, goods_number_value, function(){
    });
    //显示总价
    showSum();
}



















