/**
 * Created by Administrator on 2017/6/23.
 */
// var  goodsCategory = document.getElementById('goods-category').getElementsByTagName('ul')[0];
// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange= function(){
//   if(xhr.readyState == 4){
//     var jsonData = JSON.parse(xhr.responseText);
//     for(var i = 0; i < jsonData.data.length; i++){
//       var oLi = document.createElement('li');
//       var oA  =document.createElement('a');
//       oA.innerText= jsonData.data[i].cat_name;
//       oA.href="content.html?cat_id=" + jsonData.data[i].cat_id;
//       oLi.appendChild(oA);
//       goodsCategory.appendChild(oLi);
//     }
//   }
// };
// xhr.open('Get','http://lc.shudong.wang/api_cat.php');
// xhr.send();
  var goodsCategory = $('#goods-category >ul:eq(0)');
  $.ajax({
    url : 'http://h6.duchengjiu.top/shop/api_cat.php',
    type : 'GET',
    dataType : 'json',
    success : function(resp){
      goodsCategory = goodsCategory[0];
      for(var i = 0; i < resp.data.length; i++){
        var oLi = document.createElement('li');
        var oA  =document.createElement('a');
        oA.innerText= resp.data[i].cat_name;
        oA.href="content.html?cat_id=" + resp.data[i].cat_id;
        oLi.appendChild(oA);
        goodsCategory.appendChild(oLi);
      }
    }
  });


