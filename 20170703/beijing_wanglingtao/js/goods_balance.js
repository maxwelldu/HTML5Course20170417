/**
 * Created by Administrator on 2017/6/30.
 */
$(function(){
    var addAddressDom = document.getElementsByClassName('addAddress')[0];
    $('#addReceiver').click(function(){
        addAddressDom.style.display = 'block';
    });
    $('#addressClose').click(function(){
        addAddressDom.style.display = 'none';
    });

    //提交收货地址
    var submitBtn = $('#submit');

    checkLegal();
    function checkLegal(){
        $('#receiver').focus(function(){
            $('#receiverLabel').text('收件人必填');
        });
        $('#receiver').blur(function(){
            if($('#receiver').val() === ''){
                $('#receiverLabel').text('用户名没填');
                $('#receiverLabel').css('color','#E45050');
                return;
            }else{
                $('#receiverLabel').text('');
            }

        });
        $('#detailAddress').focus(function(){
            $('#receiverLabel').text('详细地址必填');
        });
        $('#detailAddress').blur(function(){
            console.log($('#receiver').val());
            if($('#detailAddress').val() === ''){
                $('#detailAddressLabel').text('详细地址没有填写');
                $('#detailAddressLabel').css('color','#E45050');
                return;
            }else{
                $('#receiverLabel').text('');
            }
        });
        $('#detailAddress').focus(function(){
            $('#receiverLabel').text('详细地址必填');
        });
        $('#detailAddress').blur(function(){
            console.log($('#receiver').val());
            if($('#detailAddress').val() === ''){
                $('#detailAddressLabel').text('详细地址没有填写');
                $('#detailAddressLabel').css('color','#E45050');
                return;
            }else{
                $('#receiverLabel').text('');
            }
        });
        $('#mobilePhone').focus(function(){
            $('#mobilePhoneLabel').text('手机号必填');
        });
        $('#mobilePhone').blur(function(){
            console.log($('#receiver').val());
            if($('#mobilePhone').val() === ''){
                $('#mobilePhoneLabel').text('手机号没有填写');
                $('#mobilePhoneLabel').css('color','#E45050');
                return;
            }else{
                $('#receiverLabel').text('');
            }
        });
    }
    submitBtn.click(function(){
        var province = $('#province option:selected').text();
        var city = $('#city option:selected').text();
        var area = $('#area option:selected').text();
        var receiver = $('#receiver').val();
        var detailAddress = $('#detailAddress').val();
        var mobilePhone = $('#mobilePhone').val();
        var telephone = $('#telephone').val();
        var zipCode = $('#email').val();
        if($('#detailAddress').val() === ''){
            $('#detailAddressLabel').text('详细地址没有填写');
            $('#detailAddressLabel').css('color','#E45050');
            return;
        }else{
            $('#receiverLabel').text('');
        }
        $('#receiver').blur(function(){
            console.log($('#receiver').val());
            if($('#receiver').val() === ''){
                $('#receiverLabel').text('用户名没填');
                $('#receiverLabel').css('color','#E45050');
                return;
            }else{
                $('#receiverLabel').text('');
            }

        });
        if($('#mobilePhone').val() === ''){
            $('#mobilePhoneLabel').text('手机号没有填写');
            $('#mobilePhoneLabel').css('color','#E45050');
            return;
        }else{
            $('#receiverLabel').text('');
        }
        var data = {
            province: province,
            city: city,
            district: area,
            consignee: receiver,
            address: detailAddress,
            mobile: mobilePhone,
            zip_code: zipCode
        };
        var receiverInfo = 'province='+province+'&city='+city+'&district='+area+'&consignee='+receiver+'&address_name='+detailAddress+'&mobile='+mobilePhone+'&zip_code='+zipCode;
        $.post('http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token='+localStorage.token,receiverInfo,function(resp){
            if(resp.code ===0){
                $('.addAddress').css('display','none');
                $('form')[0].reset();
                addAddress();
            }

        })

    });


    addAddress();
//获取地址信息，生成html
    function addAddress(){
        $.get('http://h6.duchengjiu.top/shop/api_useraddress.php?token='+localStorage.token,'',function(resp){
            var receiveBottom = $('.receiver-bottom');
            var html ='';
            for(var i = 0; i < resp.data.length;i++){
                var obj = resp.data[i];
                html += '<div class="receiverInfo userAddress" data-address_id="'+obj.address_id+'">' +
                    '<span class="receiver-name">'+obj.consignee+'</span><em>'+obj.consignee+'</em><span class="receiver-address">'+obj.province+obj.city+obj.district+obj.address_name+'</span><span>'+obj.mobile+'</span><a href="#" data-address_id="'+obj.address_id+'" class="deleteAddress" >删除</a></div>';
            }
            receiveBottom.html(html);
            var total = $.getUrl('total');

            $('#totalPay').text(total);
            //设置默认地址
            var deAddressId = $('.userAddress').eq(0).data('address_id');
            var lastAddress =$('.userAddress .receiver-address').eq(0).text();
            $('#lastAddress').text(lastAddress);
            $('.userAddress .receiver-name').eq(0).addClass('receiver-bottom changeAddress');
            $('.userAddress .receiver-name').click(function(){
               $('.userAddress .receiver-name').removeClass('receiver-bottom changeAddress');
                $('.userAddress').val('');
               $(this).addClass('receiver-bottom changeAddress');
                deAddressId = $(this).parent().data('address_id');
            });
            //设置默认付款方式


            //删除地址信息
            $('.deleteAddress').click(function(){
                receiveBottom[0].removeChild(this.parentNode);
                var addressId = $(this).data('address_id');
                $.post('http://h6.duchengjiu.top/shop/api_useraddress.php?status=delete&address_id='+deAddressId,{token:localStorage.token},function(resp){
                    console.log(resp);
                })
            });

            //提交订单
            $(function(){
                var address_id = deAddressId;
                var total = $.getUrl('total');
                $('#submitBtn').click(function(){
                    if(address_id === undefined){
                        alert('请填写地址信息');
                    }
                    $.post('http://h6.duchengjiu.top/shop/api_order.php?status=add&token='+localStorage.token,{total_price:total,address_id:address_id},function(resp){
                        console.log(resp);
                    })
                });
            });
        });
    }


    function DiyDom(width, height, text, title){
        this.width = width;
        this.height = height;
        this.dom = null;
        this.innerText = text;
        this.title = title;
        this.init();
    }

    DiyDom.prototype.init = function(){
        this.dom = document.createElement('div');
        this.dom.style.display = 'inline-block';
        this.dom.style.width = this.width +'px';
        this.dom.style.height = this.height + 'px';
        this.dom.innerText = this.innerText;
        this.dom.title = this.title;
    };

    var dom1 = new DiyDom(104, 30, '货到付款', 'defaultPay');
    var dom2 = new DiyDom(104, 30, '在线支付');
    $('.payType-bottom>div')[0].appendChild(dom1.dom);
    $('.payType-bottom>div')[0].appendChild(dom2.dom);
    dom1.dom.className = 'receiverInfo  changColor';
    $('.payType-bottom .receiverInfo div').click(function(){
       for(var i = 0;i < $('.payType-bottom .receiverInfo div').length;i++){
           $('.payType-bottom .receiverInfo div')[i].className='';
       }
        this.className='receiverInfo  changColor';
    });
});


//获取订单商品
$(function(){
    $.get('http://h6.duchengjiu.top/shop/api_cart.php',{token:localStorage.token},function(resp){
        var html = '';
        for(var i = 0;i < resp.data.length; i++){
            var obj = resp.data[i];
            html += '<tr>' +
                '<td>' +
                '<img src="'+obj.goods_thumb+'" alt="">' +
                '<div><p class="goods_name">'+obj.goods_name+'<p class="cancelGoods">支持7天无理由退货</p></div>' +
                '</td>';
            html += '<td>￥'+obj.goods_price+'</td>';
            html += '<td>x'+obj.goods_number+'</td>';
            html += '<td>有货</td></tr>';
        }

        $('table').append(html);
    })
});





