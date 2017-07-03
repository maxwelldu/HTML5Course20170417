/**
 * Created by Administrator on 2017/6/23.
 */
$.getQueryString = function(name) {
    var search = location.search.substr(1);
    var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
    var r = search.match(reg);
    if (r === null) return null;
    return decodeURI(r[2]);
};
$.compile = function(templateStr, dictionObj) {
    return templateStr.replace(/\{([a-zA-Z0-9_]+)\}/g, function(match, $1) {
        return dictionObj[$1];
    });
};
var cat_id = $.getQueryString('cat_id');

$.ajax({
    "url": "http://lc.shudong.wang/api_goods.php?cat_id=" + cat_id,
    "type": "GET",
    "dataType": "json",
    "success": function(response){
        //处理返回的数据
        console.log(response);

        if(response.data.length === 0){
            var oH1 = document.createElement('h1');
            document.body.appendChild(oH1)
            oH1.innerText = "当前类别下没有商品";
            return;
        }
        for(var i=0;i<response.data.length;i++){
            var obj = response.data[i];
            $("#hotsale-ul").append('<li><a href="list2.html?cat_id='+obj.cat_id + '"> <img src="'+ obj.goods_thumb + ' " style="width: 100%;height: 100%;"><p>'+ obj.goods_name + obj.price + "元" + '</p><span>' + obj.goods_desc + '</span></a></li>')
        }
    },
    "error": function(message) {
        //
        console.log(message);
    }
});
var rolling = document.getElementById("rolling");
var m_unit = document.getElementById("m_unit");
var uls = document.getElementById('oUl');
var ullis =uls.getElementsByTagName("li");
//按钮
var Btn1 = document.getElementById('btn1');
var Btn2 = document.getElementById('btn2');
//小圆点
var yuandian = document.getElementById("yuandian");
var ollis = yuandian.getElementsByTagName("li");
var liwidth = 1580;
var lislength = ullis.length;

//信号量
var index = 0;
var timer;

move();


function move() {
    clearInterval(timer);
    timer = setInterval(function () {
        index++;

        if(index>lislength-1){
            index=0;
        }
//            if(index<0){
//                index=lislength-1
//            }
        m_unit.style.left = -index*liwidth+"px";
        for(var j=0;j<ollis.length;j++){
            ollis[j].className="";
        }
        ollis[index].className="active";
    },1000)
}

for(var i=0;i<ollis.length;i++){
    ollis[i].ind=i;
    ollis[i].onmouseover=function () {
        clearInterval(timer);
        for(var j=0;j<ollis.length;j++){
            ollis[j].className="";
        }
        ollis[this.ind].className="active";
        m_unit.style.left = -this.ind*liwidth+"px";
    }
    ollis[i].onmouseout = function () {
        index = this.ind;
        move();
    }

}

Btn1.onclick = function () {
    index--;

    if(index<0){
        index=lislength-1;
    }
//        if(index<0){
//            index=lislength-1
//        }
    for(var j=0;j<ollis.length;j++){
        ollis[j].className="";
    }
    ollis[index].className="active";
    m_unit.style.left = -index*liwidth+"px";
}
Btn2.onclick = function () {
    index++;

    if(index>lislength-1){
        index=0;
    }
    for(var j=0;j<ollis.length;j++){
        ollis[j].className="";
    }
    ollis[index].className="active";
    m_unit.style.left = -index*liwidth+"px";
}

Btn1.onmouseover=function () {
    clearInterval(timer);
}
Btn2.onmouseover=function () {
    clearInterval(timer);
}
Btn1.onmouseout=function () {
    move();
}
Btn2.onmouseout=function () {
    move();
}
