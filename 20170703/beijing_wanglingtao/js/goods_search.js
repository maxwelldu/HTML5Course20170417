/**
 * Created by Administrator on 2017/6/23.
 */
var oSearch = $('#search');
var oSearchBtn = $('#searchBtn');
var searchText;
oSearchBtn.click(function(){
  searchText = oSearch.val();
  location.href = 'goods_search.html?search_text='+searchText;
  return;
});

var search = $.getUrl('search_text');
var imgListUl = $('#imgList>ul:eq(0)');
var pageSize=20;
var options = {
  url : 'http://h6.duchengjiu.top/shop/api_goods.php?search_text='+search+'&pagesize='+pageSize,
  type : 'GET',
  dataType : 'json',
  success : function(response){
    imgListUl = imgListUl[0];
    for(var i = 0; i < response.data.length;i++){
      var oLi = document.createElement('li');
      imgListUl.appendChild(oLi);
      var oA = document.createElement('a');
      oA.href= "goods_desc.html?goods_id="+response.data[i].goods_id;
      var oImg = document.createElement('img');
      var oP = document.createElement('p');
      oP.innerText = response.data[i].goods_name;
      oImg.src = response.data[i].goods_thumb;
      oA.appendChild(oImg);
      oA.appendChild(oP);
      var oDiv = document.createElement('div');
      oDiv.innerText = response.data[i].goods_desc;
      oDiv.className = 'cover';
      oLi.appendChild(oA);
      oA.appendChild(oDiv);
    }
  },
  error :　function(response){
    console.log(response);
  }
};
$.ajax(options);

