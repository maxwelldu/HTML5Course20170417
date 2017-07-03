var goods_id = $.getUrl('goods_id');
var options = {
  url : 'http://h6.duchengjiu.top/shop/api_goods.php?goods_id='+goods_id,
  type : 'GET',
  dataType : 'json',
  success : function(response){
    for(var i = 0; i <　response.data.length;i++)
        var obj = response.data[i];
    var goods = document.getElementById('goods');

    var oImg = document.createElement('img');
    oImg.src = obj.goods_thumb;

    var oDiv = document.createElement('div');
    oDiv.className = 'goods-right';
    var oH2 = document.createElement('h2');
    oH2.style.fontSize = '14px';
    oH2.innerText = obj.goods_name;
    var oP = document.createElement('p');
    oP.style.fontSize = '14px';
    oP.innerText = obj.goods_desc;

    var divPrice = document.createElement('div');
    divPrice.className = 'goods-price';
    var priceInner = '<span class="price">价格 <em> ￥ 999</em></span><br></span><span>折扣价<em> ￥'+obj.price+'</em> <a href="#">降价通知</a> </span>';
    divPrice.innerHTML = priceInner;

    var oUl = document.createElement('ul');
    oUl.className='goods-right-ul';
    oUl.innerHTML='<li><em>活动</em><span>新人专享</span><a href="#">进口爆款至一折</a></li>';
    oUl.innerHTML+='<li><em>运费</em><span>至</span></li>';
    oUl.innerHTML+='<li class="goods-count"><em>数量</em><a href="javascript:;" id="sub">-</a><input type="text" value="1" id="goods_count"><a href="javascript:;" id="sum">+</a></li>';
    oUl.innerHTML+='<li class="goods-buy"><span id="purchase" class="goods-buy-span">立即购买</span><span id="addCart" class="goods-buy-cart">加入购物车</span></li>';

    goods.appendChild(oImg);
    oDiv.appendChild(oH2);
    oDiv.appendChild(oP);
    goods.appendChild(oDiv);
    oDiv.appendChild(divPrice);
    oDiv.appendChild(oUl);





    //商品数量添加
    var aSub = $('#sub');
    var aSum = $('#sum');
    var purchase = $('#purchase');
    var joinCart = $('#addCart');
    var count = parseInt($('#goods_count').val());
    aSub.click(function(){
      count--;
      if(count <=1){
        count = 1;
      }
      $('#goods_count').val(count);
    });

    aSum.click(function(){
      count++;
      $('#goods_count').val(count);
    });


    joinCart.click(function(){
      //判断是否登录
      if(!localStorage.token){
        window.open('goods_login.html');
        return;
      }
      var cartGoodsId='cart-'+goods_id;
      console.log(Boolean(localStorage[cartGoodsId]));
      count = localStorage[cartGoodsId] ? parseInt(localStorage[cartGoodsId])+count : count;
      console.log(count);
      var url = 'http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token;
      var data = {
        goods_id: goods_id,
        number : count
      };
      console.log(data);
      $.ajax({
          url: url,
          type:'post',
          dataType: 'json',
          data: data,
          success:function(resp){
            console.log(resp);
            if(resp.code === 0){
                localStorage.setItem('cart-'+goods_id,count);
                location.href = 'goods_cart.html';
            }else{
              alert('添加购物车失败！！');
            }
          }
      })
    });
  },
  error : function(response){
    console.log(response);
  }
};
$.ajax(options);


