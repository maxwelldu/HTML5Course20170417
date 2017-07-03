
$.ajax({
    "url": 'http://lc.shudong.wang/api_goods.php',
    "type": "GET",
    "dataType": "json",
    "success": function(response){
        //处理返回的数据
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var obj = response.data[i];
            var oLi = document.createElement('li');
            var oA = document.createElement('a');
            oA.href = 'detail.html?goods_id=' + obj.goods_id;
            oLi.appendChild(oA);
            if (i % 5 === 4) {
                oLi.className += " diy";
            }
            var oImage = document.createElement('img');
            oImage.src = obj.goods_thumb;
            var oP = document.createElement('p');
            oP.innerText = obj.goods_name;
            oA.appendChild(oImage);
            oA.appendChild(oP);
            goodsUl.appendChild(oLi);
        }
    },
    "error": function(message) {
        //
        console.log(message);
    }
});

//得到所有元素，得到左按钮、右按钮、每个小圆点，每个图片所在li
var leftBtn = document.getElementById("leftBtn");
var rightBtn = document.getElementById("rightBtn");
var circlesLis = document.getElementById("circles").getElementsByTagName("li");
var imagesList = document.getElementById("imagesList");
var imagesListLis = document.getElementById("imagesList").getElementsByTagName("li");

//信号量
var img_idx = 0;

//右边按钮监听
// rightBtn.onclick = function(){
//     //信号量++
//     img_idx++;  //取值区间 0,1,2,3,4
//
//     if(img_idx>4){
//         img_idx=0;
//     }
//
//     //调用业务
//     chengPic();
// }
// //左边按钮监听
// leftBtn.onclick = function(){
//     //信号量--
//     img_idx--;
//
//     //判断信号量小于0时候返回最后一张
//     if(img_idx<0){
//         img_idx=4;
//     }
//
//     //调用业务
//     chengPic();
// }

//小圆点的监听，要批量添加
for(var i = 0;i<circlesLis.length;i++){
    (function(i){
        circlesLis[i].onmouseover = function(){

            //改变信号量
            img_idx = i;

            //调用业务函数
            chengPic();
        }
    })(i)
}

//具体业务函数，根据当前的信号量的值，来切换图片
function chengPic(){

    //去掉所有图片li的current类名
    for(var i = 0; i<imagesListLis.length;i++){
        imagesListLis[i].className = "";
    }

    //把当前信号量的图片li加上current类名
    imagesListLis[img_idx].className="current";



    //去掉所有小圆点li current类名
    for(var i=0;i<circlesLis.length;i++){

        circlesLis[i].className = "";

    }

    //把当前信号量的小圆点加上currnet类名
    circlesLis[img_idx].className = "current";
}
