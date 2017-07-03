$(function () {
    var total = 0;
    function addReceiving() {
        $.ajax({
            "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.getItem("token"),
            "type":"POST",
            "dataType":"json",
            "success":function (response) {
                console.log(response);
                var html = "";
                $("#Receiving div").remove();
                for(var i = 0; i < response.data.length; i++) {
                    var obj = response.data[i];
                    html += "<div class='address-item' data-id='"+obj.address_id+"'>　收件人:" + obj.consignee +  obj.province
                        + obj.city +
                        + obj.district +
                        "　详细收货地址:" + obj.address  +
                        "　手机号码:" + obj.mobile + "<button class='delress-item'></button></div>"
                }
                $("#Receiving").append(html);
                $(".delress-item").click(function (){
                    console.log(123);
                    var addid = $(this.parentNode).data("id");
                    console.log(addid);
                    var self = this;
                    $.ajax({
                        "url":"http://h6.duchengjiu.top/shop/api_useraddress.php?status=delete&address_id="+addid,
                        "type":"POST",
                        "dataType":"json",
                        "success":function (response) {
                            console.log(response);
                            $(self.parentNode).remove();
                        }
                    });
                })
            }
        })
    }
    addReceiving();
    function Button(width,height,content,This,ID) {
		this.width = width;
		this.height = height;
		this.content = content;
		this.id = ID || "";
		this.dom = null;
		this.This = This;
		this.init();
    }
    Button.prototype.init = function () {
		this.dom = document.createElement("button");
		this.dom.style.height = this.height+"px";
		this.dom.style.width = this.width+"px";
		this.dom.innerText = this.content;
		this.dom.style.lineHeight = this.height+"px";
		this.dom.className = "Button";
		this.dom.id = this.id;
		this.This.appendChild(this.dom);
    };
    new Button(150,50,"货到付款",$("#payment")[0],"COD");
    new Button(150,50,"在线支付",$("#payment")[0],"OnlinePay");
    new Button(150,30,"添加收货地址",$("#Receiving")[0],"addNewReceiving");
    new Button(100,30,"提交订单",$("#submit")[0],"submitBut");
    new Button(100,30,"保存新的地址",$("#addReceiving")[0],"submitBtn");
    $("#addNewReceiving").click(function () {
		$("#shadeTwo").show();
    });
	$("#Del").click(function () {
		$("#shadeTwo").hide();
    });
	$("#submitBtn").click(function () {
                var consignee = $("#consignee");
                if (consignee.val() == "") {
                    consignee.next().text("收货人不能为空!");
                    return;
                } else {
                    consignee.next().text("");
                }
                var address = $("#address");
                if (address.val() == "") {
                    address.next().text("详细收货地址不能为空!");
                    return;
                } else {
                    address.next().text("");
                }
                var tel = $("#tel");
                if (tel.val() == "") {
                    tel.next().text("电话不能为空!");
                    return;
                } else if (/[\d]{7}/.test(tel.val())) {
                    tel.next().text("");
                } else {
                    tel.next().text("请输入七位电话号码");
                    return;
                }
                    var mobile = $("#mobile");
                    if (mobile.val() == "") {
                        mobile.next().text("手机号不能为空!");
                        return;
                    } else if (/1[3,5,9,7]\d{9}/.test(mobile.val())) {
                        mobile.next().text("");
                    } else {
                        moblie.next().text("请输入十一位手机号码");
                        return;
                    }
            var data = $("form").serialize();
            console.log(data);
            $.ajax({
                "url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token=" + localStorage.getItem("token") + "&status=add&",
                "type": "POST",
                "dataType": "json",
                "data": data,
                "success": function (response) {
                    console.log(response);
                    addReceiving();
                }
            });
            $(this).parent().parent().hide();
        });
        $("#addReceiving").click(function (event) {
            evevt = event || window.event;
            var target = event.target || event.srcElement;
            if (target.id == 'consignee') {
                var consignee = $(evevt.target);
                consignee.blur(function () {
                    if (consignee.val() == "") {
                        consignee.next().text("收货人不能为空!");
                        return;
                    } else {
                        consignee.next().text("");
                    }
                })
            }
            if (target.id == "address") {
                var address = $(evevt.target);
                address.blur(function () {
                    if (address.val() == "") {
                        address.next().text("详细收货地址不能为空!");
                        return;
                    } else {
                        address.next().text("");
                    }
                })
            }
            if (target.id == 'tel') {
                var tel = $(evevt.target);
                tel.blur(function () {
                    if (tel.val() == "") {
                        tel.next().text("电话不能为空!");
                        return;
                    } else if (/[\d]{7}/.test(tel.val())) {
                        tel.next().text("");
                    } else {
                        tel.next().text("请输入七位电话号码");
                        return;
                    }
                })
            }
            if (target.id == "mobile") {
                var mobile = $(evevt.target);
                mobile.blur(function () {
                    if (mobile.val() == "") {
                        mobile.next().text("手机号不能为空!");
                        return;
                    } else if (/1[3,5,9,7]\d{9}/.test(mobile.val())) {
                        mobile.next().text("");
                    } else {
                        mobile.next().text("请输入十一位手机号码");
                        return;
                    }
                })
            }
        });
        var site = 0;
        $("#Receiving").click(function (e) {
            e = event || window.event;
            var target = e.target || e.srcElement;
            if(target.className == "address-item" ){
                $(event.target).addClass("address-item-yes").siblings().removeClass("address-item-yes");
                $(".delress-item").removeClass("okress-item");
                $(event.target).find("button.delress-item").addClass("okress-item");
                site = $(event.target).data("id");
                console.log(site);
            }
        });
        $(".Button").click(function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            if(target.id == "COD"){
                $(event.target).addClass("pay").siblings().removeClass("pay");
            }
            if(target.id == "OnlinePay"){
                $(event.target).addClass("pay").siblings().removeClass("pay");
            }
        });
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_cart.php",
        "type":"GET",
        "dataType":"json",
        "data":{
            "token":localStorage.token
        },
        "success":function (response) {
            console.log(response);
            for(var i = 0; i < response.data.length; i++) {
                var obj = response.data[i];
                $("#InvenTable").append("<tr class='tr-goods tr-goods" + obj.goods_id + "'>" +
                    " <td class='commodity'><a href='details.html?goods_id=" + obj.goods_id + "' >" +
                    "<img src='" + obj.goods_thumb + "' alt=''><h1>" + obj.goods_name + "</h1></a></td> " +
                    "<td class='commodity-num'>"+obj.goods_number +
                    "</td><td class='univalence'>" + obj.goods_price + "元</td> " +
                    "<td class='subtotal'>" + (obj.goods_number * obj.goods_price) + "元</td></tr>");
            }
            for(var k = 0; k < $(".subtotal").length; k++) {
                total += parseInt($(".subtotal")[k].innerText);
            }
            $("#submit").append("<b>总价:" + total + "元</b>");
        }
    });
    $("#submitBut").click(function () {
        if(site == 0){

            alert("请先选择地址");
            return;
        }else{
            console.log(site);
            console.log(total);
            $.ajax({
                "url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.getItem('token')+"&status=add",
                "type":"POST",
                "dataType":"json",
                "data":{
                    "address_id": site,
                    "total_prices": total
                },
                "success":function (response) {
                    console.log(response);
                    // location.href = "OMS.html";
                }
            })
        }
    })
});
