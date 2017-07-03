/**
 * Created by Administrator on 2017/6/23.
 */

  var imgListUl=$("#imgList ul:eq(0)");
  var options = {
    url : 'http://h6.duchengjiu.top/shop/api_goods.php?page='+1+'&pagesize='+20,
    type : 'GET',
    dataType : 'json',
    success : function(response){
      createStyle(response,page);
      createPage(response);
    }
  };
  $.ajax(options);

  //输入框随鼠标下滑
$(window).scroll(function(){
    var top = document.body.scrollTop || document.documentElement.scrollTop;
    if(top > 60){
      $('#header-bottom-content')[0].className='header-bottom-content fix';
    }else if(top < 60){
      $('#header-bottom-content')[0].className='header-bottom header-bottom-content';
    }
});









