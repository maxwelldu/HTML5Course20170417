









$('#Add').click(function () {
    $('#Adds').show()
});
$('#DeleteBtn').click(function () {
    $('#Adds').hide()
});
$('#DeleteBtnO').click(function () {
    $('#Adds').hide()
});
var address_id = 0;
$('#head-text-link-add').click(function (event) {
    if(event.target){
        console.log(event.target);
        address_id = event.target.getAttribute('id');
        console.log(address_id)
    }
});

$(function () {
    move();
    $('#Submit').click(function () {
        event = event || window.event;
        if(event.preventDefault){
            // 阻止默认事件高级浏览器
            event.preventDefault();
        }else{
            // 阻止低级IE浏览器
            event.returnValue = false;
        }
        if(address_id === 0){
            alert('请选择地址在下订单');
            return;
        }
        shop.api.addOrder(address_id, total, function (response) {
            console.log(response);
        })
    });
function move() {
    //
    // if($('#address_name').val() !== ""){
    //     $('#address_name').css({"border-color":"blue"});
    //
    // } else if($('#address').val() !== ""){
    //     $('#address').css({"border-color":"blue"});
    //
    // }else if($('#Ity').val() !== ""){
    //     $('#Ity').css({"border-color":"blue"});
    //
    //
    //
    // }
    $('#modile').blur(function () {
        // var modile = new RegExp(//)
        var modile = document.getElementById('modile');
        if(/^1[3-8]\d{9}$/.test(modile.value)){
                $('#modile').css({"border-color":"blue"});

            }else{
            $('#modile').css({"border-color":"red"});
        }
    });
    $('#address_name').blur(function () {
        if($('#address_name').val() !== ""){
            $('#address_name').css({"border-color":"blue"});

        }
    });
    $('#address').blur(function () {
        if($('#address').val() !== ""){
            $('#address').css({"border-color":"blue"});

        }
    });
    $('#Ity').blur(function () {
        if($('#Ity').val() !== ""){
            $('#Ity').css({"border-color":"blue"});

        }
    });
    $('#KeepBtn').click(function () {
        var data = $("form").serialize();
        console.log(data);
        // if($('#modile').val() !== "" && $('#address_name').val() !== "" && $('#address').val() !== "" && $('#Ity').val() !== ""){
        //
        // }else{
        //     $('#modile').css({"border-color":"red"});
        //     $('#address_name').css({"border-color":"red"});
        //     $('#address').css({"border-color":"red"});
        //     $('#Ity').css({"border-color":"red"});
        //     // alert("no");
        //     return
        // }
        if($('#modile').val() !== ""){
            $('#modile').css({"border-color":"blue"});
        }else{
            $('#modile').css({"border-color":"red"});

        }
        if($('#address_name').val() !== ""){
            $('#address_name').css({"border-color":"blue"});
        }else{
            $('#address_name').css({"border-color":"red"});

        }
        if($('#address').val() !== ""){
            $('#address_name').css({"border-color":"blue"});
        }else{
            $('#address').css({"border-color":"red"});

        }
        if($('#Ity').val() !== ""){
            $('#address_name').css({"border-color":"blue"});
        }else{
            $('#Ity').css({"border-color":"red"});
            return
        }

        shop.api.addUserAddress(data, function (response) {
            console.log(response);
            if(response.code === 0){
                $('#Adds').hide();
                fetchUserAddress();
            }
        })
    });
    fetchUserAddress();
    function fetchUserAddress() {
        shop.api.fetchUserAddress(function (response) {
            console.log(response);
            var rece = "";
            // var reces = "";
            for(var i = 0; i < response.data.length; i++){
                var obj = response.data[i];
                rece += '<div class="place" id="'+obj.address_id+'"><h1>'+obj.address_name+'&nbsp&nbsp收</h1><em>'+obj.city+'<br>'+obj.address+'<br>'+obj.mobile+'</em><span class="place-delete">删除</span><div class="place-shad"></div></div>';
                // reces += '<p>'+obj.address_name+'&nbsp&nbsp收'+obj.city+'电话'+obj.mobile+'</p>'

            }


            // $('#shop-balance-bottom-mas-up').text(reces);
            $('#head-text-link-add').html(rece);
            $('.place-delete').click(function () {
                console.log(this);
                var parent = this.parentNode;
                shop.api.deleteUserAddress(parent, function (response) {
                    console.log(response);
                    $('#head-text-link-add')[0].removeChild(parent);
                })
            });
            var place = document.getElementsByClassName('place');
            for(var i = 0; i < place.length; i++){
                // i = this.index;

                place[i].onclick = function () {
                    for (var j =0; j < place.length; j++){
                        place[j].className = 'place';
                    }
                    // console.log(this);
                    this.className = "place  place-link"
                }

            }
        })
    }

}

});

$(function() {
    $.get(
        'js/ChinaArea.xml',
        '',
        function(res){
            xmldom = $(res);
            xmldom.find('province').each(function(index,el){
                var pro_name = $(el).attr('province');
                var pro_ID = $(el).attr('provinceID');
                $('<option value="'+pro_ID+'">'+pro_name+'</option>').appendTo('#province');

                //监视省份变化
                $('#province').change(function(){
                    var pro_id = $(this).val();

                    var pro_two = pro_id.substr(0,2);
                    var citys = xmldom.find('City');

                    $('#city').empty().append('<option value="0">-请选择-</option>');
                    citys.each(function(index,el){
                        var city_two = $(el).attr('CityID').substr(0,2);
                        if(pro_two == city_two){
                            var city_id = $(el).attr('CityID');
                            var city_name = $(el).attr('City');
                            $('<option value="'+city_id+'">'+city_name+'</option>').appendTo('#city');
                        }
                    })
                })

                //监视市发生改变
                $('#city').change(function(){
                    var city_id = $(this).val();
                    var city_four = city_id.substr(0,4);

                    var areas = xmldom.find('Piecearea');
                    $('#area').empty().append('<option value="0">-请选择-</option>');
                    areas.each(function(index,el){
                        var area_four=$(el).attr('PieceareaID').substr(0,4);
                        if(city_four == area_four){
                            var area_id = $(el).attr('PieceareaID');
                            var area_name = $(el).attr('Piecearea');
                            $('<option value="'+area_id+'">'+area_name+'</option>').appendTo('#area')
                        }
                    })
                })
            })
        }
    )




});

$.ajax({
    "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem('token'),
    "type": "GET",
    "dataType": "json",
    "success": function (response) {
        console.log(response);

        for(var i =0; i< response.data.length; i++){
            var obj = response.data[i];
            obj.subtotal = parseInt(obj.goods_number) * parseInt(obj.goods_price);
            var Shop = document.getElementById('Shop');
            var shopList = document.createElement('div');
            shopList.className = 'shop-list';
            Shop.appendChild(shopList);
            var shopListTop = document.createElement('div');
            shopListTop.className = 'shop-list-top';
            shopList.appendChild(shopListTop);
            var Ospan = document.createElement('span');
            Ospan.innerText = '发货仓：';
            var Oem = document.createElement('em');
            Oem.innerText = '本仓税费：￥0.00';
            var Ob = document.createElement('b');
            shopListTop.appendChild(Ospan);
            shopListTop.appendChild(Oem);
            shopListTop.appendChild(Ob);
            var goods = document.createElement('div');
            goods.className = 'goods';
            shopList.appendChild(goods);
            var goodsList = document.createElement('div');
            goodsList.className = 'goods-list';
            goods.appendChild(goodsList);
            var oImg = document.createElement('img');
            oImg.src = obj.goods_thumb;
            goodsList.appendChild(oImg);
            var oSpan = document.createElement('span');
            oSpan.innerText = obj.goods_name;
            goodsList.appendChild(oSpan);
            var oP = document.createElement('p');
            oP.innerText = "支持7天无理由退货";
            goodsList.appendChild(oP);
            var goodsListOne = document.createElement('span');
            var goodsListTwo = document.createElement('span');
            var goodsListThree = document.createElement('span');
            goodsListOne.className = 'goods-list-one';
            goodsListOne.innerText = obj.goods_price;
            goods.appendChild(goodsListOne);
            goodsListTwo.className = 'goods-list-two';
            goodsListTwo.innerText = obj.goods_number;
            goods.appendChild(goodsListTwo);
            goodsListThree.className = 'goods-list-three';
            goodsListThree.innerText = obj.subtotal + ".00";
            goods.appendChild(goodsListThree);
        }
     }
    });


var total = al.getQueryString('total');
console.log(total);
$('#Money').text(total);
$('#dMoney').text(total);

