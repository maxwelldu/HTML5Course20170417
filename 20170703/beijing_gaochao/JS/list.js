
// var navList = document.getElementById('nav-list');
// $.ajax({
//     "url": "http://lc.shudong.wang/api_cat.php",
//     'type': 'GET',
//     'dataType': 'json',
//     'success': function(response){
//         // 处理返回的数据
//         console.log(response);
//         for(var i = 0; i < response.data.length; i++){
//             var obj = response.data[i];
//             var oLi = document.createElement('li');
//             var oA = document.createElement('a');
//             oA.innerText = obj.cat_name;
//             oA.href = 'list.html?cat_id=' + obj.cat_id;
//             navList.appendChild(oLi);
//             oLi.appendChild(oA);
//         }
//     },
//     "error": function(message) {
//         //
//         console.log(message);
//     }
// });



var cat_id = al.getQueryString('cat_id');
var Shop = document.getElementById('shop');

var pagesize = 20;
var ButtonNext = document.getElementById('ButtonNext');
var page = 1;
ButtonNext.addEventListener('click', function () {
    page++;
    //
    ButtonCenter.style.marginLeft = -page * 52 + 'px';

    Shop.innerHTML = null;
    ButtonCenter.innerHTML = null;

    Cut(page);
});
var ButtonPrev = document.getElementById('ButtonPrev');
ButtonPrev.addEventListener('click', function () {
   page--;
   if(page <= 1) page=1;
    Shop.innerHTML = null;
    ButtonCenter.innerHTML = null;
    ButtonCenter.style.marginLeft = -page * 52 + 'px';

    Cut(page);
});
var ButtonCenter =document.getElementById('ButtonCenter');
ButtonCenter.addEventListener('click', function (event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if(target.nodeName === 'SPAN'){

         page = target.innerText ;
        Shop.innerHTML = null;
        ButtonCenter.innerHTML = null;
        ButtonCenter.style.marginLeft = -page * 52 + 'px';
        Cut(page);
    }

});
Cut(page);
function Cut(page) {
$.ajax({
    'url': 'http://h6.duchengjiu.top/shop/api_goods.php?cat_id=' + cat_id +'&page='+page+'&pagesize='+pagesize,
    'type': 'GET',
    'dataType':'json',
    'success': function (response) {
        console.log(response);

        for(var j = 1; j < response.page.page_count; j++){
            var ButtonCenter = document.getElementById('ButtonCenter');

            var span = document.createElement('span');
            span.innerText = j;
            // if(ButtonCenter.style.marginLeft >= -45 * 52 + 'px'){
            //     ButtonCenter.style.marginLeft = -45 * 52 + 'px';
            // }
            ButtonCenter.appendChild(span);

        }
        for(var i = 0; i < response.data.length;i++){
            var obj = response.data[i];
            console.log(obj);
            // console.log(obj);
            var oDiv = document.createElement('div');
            Shop.appendChild(oDiv);
            var oLink = document.createElement('a');
            oLink.href = 'shopList.html?goods_id=' + obj.goods_id;
            oDiv.appendChild(oLink);
            var oImg = document.createElement('img');
            oImg.src = obj.goods_thumb;
            oLink.appendChild(oImg);
            var oP = document.createElement('p');
            oP.innerText = obj.goods_desc;
            oLink.appendChild(oP);
            var oA = document.createElement('em');
            oA.innerText = obj.goods_name;
            oLink.appendChild(oA);
            var oSpan = document.createElement('span');
            oSpan.innerText = '售价：'+obj.price;
            oLink.appendChild(oSpan);
        }
    }
});
}
Onelist();