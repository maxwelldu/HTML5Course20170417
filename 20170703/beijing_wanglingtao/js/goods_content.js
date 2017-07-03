/**
 * Created by Administrator on 2017/6/23.
 */
var cat_id = $.getUrl('cat_id');
var imgListUl = $('#imgList>ul:eq(0)');
var options = {
  url : 'http://h6.duchengjiu.top/shop/api_goods.php?cat_id='+cat_id,
  type : 'GET',
  dataType : 'json',
  success : function(resp){
    createStyle(resp);
    // console.log(resp);
  }
};
$.ajax(options);