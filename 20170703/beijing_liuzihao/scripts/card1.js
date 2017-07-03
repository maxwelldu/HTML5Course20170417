/**
 * Created by Administrator on 2017/6/28 0028.
 */
$.ajax({
    "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
    "type" : "GET",
    "dataType" :  "json",
    // "data" : {
    //     "token" : ,
    // },
    "success" : function (response) {
        console.log(response);
        for (var i =0; i < response.data.length; i ++){
            var data = response.data[i];
            var cardshops = new Cardshops(data);
            console.log(cardshops.checkbox);
            zongji()
        }
    }
})


var tus = [];

var Card =function () {
    this.dom = null;
    this.cardshopdom = null;
    this.zongji = 0;
    this.zongjidom = mull;
    this.inin();
}
Card.prototype.inin = function () {
    this.dom = $("#cardlist");
    this.cardshopdom = $("#cardshop");
    this.zhongjidom = $("#zongjia");
}


function Cardshops (data) {
    this.dom = null;
    this.dombox = null;
    this.checkbox = null;
    this.cardshopsimg = null;
    this.cardshopsjiage = null;
    this.cardshopsname = null;
    this.cardshopsshuliang = null;
    this.cardshopsxiaoji = null;
    this.cardshopsdel = null;
    this.cardshopsjia = null;
    this.cardshopsjian = null;
    this.cardshopszi = null;
    this.none = {
        "goods_id" : data.goods_id,
    }
    this.inin(data);
    this.jia(data);
    this.jian(data);
    this.shezhi(data);
    this.check(data);
}
Cardshops.prototype.inin = function (data) {
    this.dom = document.getElementById('cardshop');

    this.dombox = document.createElement("div");
    this.dombox.className = "dombox";
    this.dom.appendChild(this.dombox);

    this.checkbox = document.createElement("input");
    this.checkbox.type = "checkbox";
    this.dombox.appendChild(this.checkbox);

    this.cardshopsimg = document.createElement("img");
    this.cardshopsimg.className = "cardshopsimg";
    this.cardshopsimg.src = data.goods_thumb;
    this.dombox.appendChild(this.cardshopsimg);

    this.cardshopsjiage = document.createElement("div");
    this.cardshopsjiage.className = "cardshopsjiage";
    this.cardshopsjiage.innerHTML = data.goods_price;
    this.dombox.appendChild(this.cardshopsjiage);

    this.cardshopsname = document.createElement("div");
    this.cardshopsname.className = "cardshopsname";
    this.cardshopsname.innerHTML = data.goods_name;
    this.dombox.appendChild(this.cardshopsname);

    this.cardshopsshuliang = document.createElement("div");
    this.cardshopsshuliang.className = "cardshopsshuliang";
    this.dombox.appendChild(this.cardshopsshuliang);

    this.cardshopsjia = document.createElement("botton");
    this.cardshopsjia.className = "cardshopsjia";
    this.cardshopsjia.innerHTML = "+";
    this.cardshopsshuliang.appendChild(this.cardshopsjia);

    this.cardshopszi = document.createElement("input");
    this.cardshopszi.className = "cardshopszi";
    this.cardshopszi.value= data.goods_number;
    this.cardshopsshuliang.appendChild(this.cardshopszi);

    this.cardshopsjian = document.createElement("botton");
    this.cardshopsjian.className = "cardshopsjian";
    this.cardshopsjian.innerHTML = "-";
    this.cardshopsshuliang.appendChild(this.cardshopsjian);

    this.cardshopsxiaoji = document.createElement("div");
    this.cardshopsxiaoji.className = "cardshopsxiaoji";
    this.cardshopsxiaoji.innerHTML = data.goods_number * data.goods_price;
    this.dombox.appendChild(this.cardshopsxiaoji);

    this.cardshopsdel = document.createElement("div");
    this.cardshopsdel.className = "cardshopsdel";
    this.cardshopsdel.innerHTML = "删除";
    this.dombox.appendChild(this.cardshopsdel);
};

Cardshops.prototype.jia = function (data) {
    var  self = this;
    this.cardshopsjia.onclick = function () {
        var value = self.cardshopszi.value;
        value++;
        if (value >= 10) value = 10;
        self.cardshopszi.value = value;
        self.cardshopsxiaoji.innerHTML = self.cardshopszi.value * data.goods_price;
        zongji()
    }
};

Cardshops.prototype.jian = function (data) {
    var  self = this;
    this.cardshopsjian.onclick = function () {
        var value = self.cardshopszi.value;
        value--;
        if (value <= 0) value = 1;
        self.cardshopszi.value = value;
        self.cardshopsxiaoji.innerHTML = self.cardshopszi.value * data.goods_price;
        zongji()
    }
};

Cardshops.prototype.shezhi = function (data) {
    var  self = this;
    this.cardshopszi.onblur = function () {
        var value = self.cardshopszi.value;
        if (value > 10){
            self.cardshopszi.value = 10;
        }
        if (value < 1){
            self.cardshopszi.value = 1;
        }
        // self.cardshopsxiaoji.value = value
        self.cardshopsxiaoji.innerHTML = self.cardshopszi.value * data.goods_price;
        // zongji();
    }
};

Cardshops.prototype.check = function (data) {
    var self = this;
    this.checkbox.onclick = function () {
        if (self.checkbox.checked ){
            var shu = self.cardshopsxiaoji.innerHTML;
            tus.push(shu);
            console.log(tus);
            zongji()
        } else {
            for (var i = 0;i < tus.length;i++){
                var shu = self.cardshopsxiaoji.innerHTML;
                if (shu === tus[i]){
                    tus.splice(i,1);
                    zongji()
                }
            }
        }
    }
};

function zongji(){
    var mony = document.getElementsByClassName('cardshopsxiaoji');
   var moremony = 0;
   for (var i = 0; i < tus.length; i++){
       moremony += parseInt(tus[i]);
   }
   document.getElementById("zongji").innerText = moremony;
};
var open = false;
document.getElementById("quanxuan").onclick = function () {
    // open = (open === true)? false:true;
    (open === false)? $("input").attr("checked","true"):$("input").removeAttr("checked","true");
     open = !open;

}