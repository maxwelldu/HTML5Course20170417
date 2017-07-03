/**
 * Created by Administrator on 2017/6/28 0028.
 */
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
        document.getElementById("cardlist").addEventListener("click",function (event) {
            quanxuan();
            danxuan();
            chengenum();
            del()
        });
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
    // this.roe();
}

Shopcard.prototype.init = function (data) {

    var obj = data;

    var dombox = document.createElement("div");
    dombox.className = "dombox";
    dom.appendChild(dombox);

    var domq = document.createElement("input");
    domq.type = "checkbox";
    domq.name = obj.goods_id;
    domq.className = "checkbox";
    dombox.appendChild(domq);

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

    var cardshopsjia = document.createElement("botton");
    cardshopsjia.className = "cardshopsjia";
    cardshopsjia.innerHTML = "+";
    cardshopsshuliang.appendChild(cardshopsjia);

    var cardshopszi = document.createElement("input");
    cardshopszi.className = "cardshopszi";
    cardshopszi.name = obj.goods_id;
    cardshopszi.value= obj.goods_number;
    cardshopsshuliang.appendChild(cardshopszi);

    var cardshopsjian = document.createElement("botton");
    cardshopsjian.className = "cardshopsjian";
    cardshopsjian.innerHTML = "-";
    cardshopsshuliang.appendChild(cardshopsjian);

    var cardshopsxiaoji = document.createElement("div");
    cardshopsxiaoji.className = "cardshopsxiaoji";
    cardshopsxiaoji.innerHTML = obj.goods_number * obj.goods_price;
    dombox.appendChild(cardshopsxiaoji);

    var cardshopsdel = document.createElement("div");
    cardshopsdel.className = "cardshopsdel";
    cardshopsdel.innerHTML = "删除";
    dombox.appendChild(cardshopsdel);
}

Shopcard.prototype.kaishi = function (){
    var self = this;
    one.push(self.ones);
};

Shopcard.prototype.roe = function (){
    for(var i = 0; i < one.length;i ++){
        one[i].shuliang = 0;
    }
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

function chengeone(goodid,numder) {
    for(var i = 0; i < one.length;i ++){
        if (one[i].nname=== goodid){
            one[i].shuliang = numder;
        }
    }
}

function onedel(goodid){
    // var self = this;
    for(var i = 0; i < one.length;i ++){
        if (one[i].nname=== goodid){
            one.splice(i,1);
            console.log(one);
        }
    }
}

function quanxuan() {
    var chickeds = document.getElementsByClassName("checkbox");
    if (event.target.id === "quanxuan"){
        deng = (deng === false)? true : false;
        for (var i = 0;i < chickeds.length;i ++){
            chickeds[i].checked = deng;
        }
        if (deng === true){
            leijia();
        } else if(deng === false){
            for(var i = 0; i < one.length;i ++){
                one[i].shuliang = 0;
                leijia()
            }
        }
    }
}

function danxuan() {
    if (event.target.className === "checkbox" ){
        if (event.target.checked === true){
            danxuantrue(event)
        } else if (event.target.checked === false){
            danxuanfals(event);
        }
    }
}

function danxuantrue(event) {
    var ge = event.target.parentNode.childNodes;
    for(var i = 0; i < ge.length;i ++){
        if (ge[i].className === "cardshopsshuliang"){
            chengeone(event.target.name,ge[i].childNodes[1].value)
        }
    }
    leijia()
}

function danxuanfals(event) {
    var ge = event.target.parentNode.childNodes;
    for(var i = 0; i < ge.length;i ++){
        if (ge[i].className === "cardshopsshuliang"){
            chengeone(event.target.name,0)
        }
    }
    leijia()
}

function chengenum() {
    if (event.target.className === "cardshopsjia"){
        var ge = event.target.parentNode.parentNode.childNodes;
        for(var i = 0; i < ge.length;i ++){
            if (ge[i].className === "checkbox"){
                // console.log(ge[i]);
                if (ge[i].checked === true){
                    // console.log(event);
                    chengenumtruejia(event)
                } else if (ge[i].checked === false){
                   return
                }
            }
        }
    }
    if (event.target.className === "cardshopsjian"){
        var ge = event.target.parentNode.parentNode.childNodes;
        for(var i = 0; i < ge.length;i ++){
            if (ge[i].className === "checkbox"){
                // console.log(ge[i]);
                if (ge[i].checked === true){
                    // console.log(event);
                    chengenumtruejian(event)
                } else if (ge[i].checked === false){
                    return
                }
            }
        }
    }
}

function chengenumtruejia(event) {
    var num = 0;
    var ge = event.target.parentNode.childNodes;
        num = ge[1].value;
        num ++;
    if (num >= 10){num = 10}
        ge[1].value = num;
    // console.log(ge[1].name);
    chengeone(ge[1].name,num)
    console.log(one);
    leijia()
}

function chengenumtruejian(event) {
    var num = 0;
    var ge = event.target.parentNode.childNodes;
    num = ge[1].value;
    num --;
    if (num <= 1){num = 1}
    ge[1].value = num;
    // console.log(ge[1].name);
    chengeone(ge[1].name,num)
    leijia()
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

document.getElementsByClassName("zongji")[0].onclick =function () {
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
