/**
 * Created by Administrator on 2017/6/30 0030.
 */
console.log(localStorage.more);
// $.ajax({
//     "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
//     "type": "GET",
//     // "data": {
//     //     "goods_id": one[i].nname,
//     //     "number":one[i].shuliang
//     // },
//     "dataType": "json",
//     "success": function(response) {
//         console.log(response);
//     }
// });

var dom = document.getElementById('cardshop');
var deng = false;
var one = [];
var more = {};
$.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
    "type" : "GET",
    "dataType" :  "json",
    "success" : function (response) {
        var data = response.data;
        for (var i = 0;i <data.length;i ++ ){
            new Shopcard(data[i]);
        }
        var zi = document.getElementsByClassName("cardshopszi");
        for(var i = 0;i < zi.length;i ++){
            zi[i].addEventListener("blur",function () {
                var num = this.value;
                if (num >= 10) {num = 10};
                this.value = num;
                console.log([this.name,num]);
                chengeone(this.name,num);
                console.log(one);
                leijia()
            });
        }
    }
});

function Shopcard(data) {
    this.jiage =  data.goods_price;
    this.shuliang = data.goods_number;
    this.sname = data.goods_id;
    this.ones = {
        jiage : this.jiage,
        shuliang : this.shuliang,
        nname : this.sname
    };
    this.init(data);
    this.kaishi();
    leijia();
}

Shopcard.prototype.init = function (data) {

    var obj = data;

    var dombox = document.createElement("div");
    dombox.className = "dombox";
    dom.appendChild(dombox);


    var cardshopsimg = document.createElement("img");
    cardshopsimg.className = "cardshopsimg";
    cardshopsimg.src = obj.goods_thumb;
    dombox.appendChild(cardshopsimg);

    var cardshopsjiage = document.createElement("div");
    cardshopsjiage.className = "cardshopsjiage";
    cardshopsjiage.innerHTML = obj.goods_price;
    dombox.appendChild(cardshopsjiage);

    var cardshopsname = document.createElement("div");
    cardshopsname.className = "cardshopsname";
    cardshopsname.innerHTML = obj.goods_name;
    dombox.appendChild(cardshopsname);

    var cardshopsshuliang = document.createElement("div");
    cardshopsshuliang.className = "cardshopsshuliang";
    dombox.appendChild(cardshopsshuliang);

    var cardshopszi = document.createElement("span");
    cardshopszi.className = "cardshopszi";
    cardshopszi.name = obj.goods_id;
    cardshopszi.innerHTML= obj.goods_number;
    cardshopsshuliang.appendChild(cardshopszi);

    var cardshopsxiaoji = document.createElement("div");
    cardshopsxiaoji.className = "cardshopsxiaoji";
    cardshopsxiaoji.innerHTML = obj.goods_number * obj.goods_price;
    dombox.appendChild(cardshopsxiaoji);
}

Shopcard.prototype.kaishi = function (){
    var self = this;
    one.push(self.ones);
};


function leijia(){
    // var self = this;
    more.zongjia = 0;
    more.zongshu = 0;
    for (var i = 0;i < one.length;i ++){
        more.zongjia += one[i].jiage * one[i].shuliang;
        more.zongshu += parseInt(one[i].shuliang);
        this.fuzhi();
    }
}

function fuzhi(){
    document.getElementById("zongji").innerHTML = more.zongjia;
}

function del() {
    if (event.target.className === "cardshopsdel"){
        var parent = event.target.parentNode;
        var ge = event.target.parentNode.childNodes;
        for(var i = 0; i < ge.length;i ++){
            if (ge[i].className === "checkbox"){
                // console.log(parent);
                onedel(ge[i].name)
                dom.removeChild(parent)
                $.ajax({
                    "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
                    "type": "POST",
                    "data": {
                        "goods_id": ge[i].name,
                        "number":0
                    },
                    "dataType": "json",
                    "success": function(response) {
                        console.log(response);
                    }
                });
            }
        }
    }
}
var zongji = document.getElementById("zongji")
document.getElementById("zongji").onclick =function () {
    localStorage.more = JSON.stringify(more)  ;
    for (var i = 0;i < one.length; i ++){
        $.ajax({
            "url": "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
            "type": "POST",
            "data": {
                "goods_id": one[i].nname,
                "number":one[i].shuliang
            },
            "dataType": "json",
            "success": function(response) {
                console.log(response);
            }
        });
    }
    location.href = "pay.html";
}
    var  adddizhibox = document.getElementsByClassName("adddizhibox")[0];
    var  adddizhibox1 = document.getElementsByClassName("adddizhibox1")[0];
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_useraddress.php?token="+localStorage.token,
        "type": "GET",
        "dataType": "json",
        "success": function(response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i];
                adddizhibox.innerHTML +=
                    '<p class="xiaodizhi"id="'
                    + obj.address_id
                    +'">'
                    + obj.address_name
                    + ' '
                    + obj.consignee
                    + ' '
                    + obj.province
                    + obj.crty
                    + obj.district
                    + obj.address + '</p>';
            }

            var xiaodizhi = document.getElementsByClassName("xiaodizhi");
            for (var i = 0; i < xiaodizhi.length; i++) {
                xiaodizhi[i].onclick = function () {
                    this.parentNode.style.display = "none";
                    adddizhibox1.style.display = "block";
                    adddizhibox1.appendChild(this);
                }
            }
            adddizhibox.onmousemove = function () {
                console.log(111);
                this.style.height = this.childNodes.length * 40 + "px";
                adddizhibox.style.top = -parseInt(getComputedStyle(adddizhibox).height) + 50 + "px";
            };
            adddizhibox.onmouseout = function () {
                this.style.height = "48px";
                adddizhibox.style.top = -parseInt(getComputedStyle(adddizhibox).height) + 50 + "px";
            };
            adddizhibox1.onclick = function () {
                this.style.display = "none";
                for (var i = 0;i < this.childNodes.length;i++){
                    adddizhibox.appendChild(this.childNodes[i]);
                    // this.removeChild(this.childNodes[i]);
                }
                adddizhibox.style.display = "block";
            };
        }
    });
document.getElementById("zongji").onclick=function () {
    // console.log(adddizhibox1.childNodes[0].id);
    $.ajax({
        "url" : "http://h6.duchengjiu.top/shop/api_order.php?status=add&token="+localStorage.token,
        "type" : "POST",
        "datatype" : "json",
        "data" : {
            "address_id" : adddizhibox1.childNodes[0].id,
            "total_prices" : JSON.parse(localStorage.more).zongjia
        },
        "success" : function (success) {
            console.log(success);
        }
    })
};