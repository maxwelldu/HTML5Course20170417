/**
 * Created by Administrator on 2017/6/24.
 */
    var imgList = $('#imgList');
    var pageSize = 20;
    var olPage =$('#pages');
    olPage =olPage[0];
    var prevLi = document.createElement('li');
    var nextLi = document.createElement('li');
    prevLi.innerText = '上一页';
    nextLi.innerText = '下一页';
    olPage.appendChild(prevLi);
    olPage.appendChild(nextLi);
    // imgList.appendChild(olImg);
    var page=1;
    prevLi.onclick = function(){
      page--;
      if(page < 1 ){
        page = 1;
      }
      pageInner(page);
      changePage(page);
    };
    nextLi.onclick = function(){
      page++;
      if(page > totalPage ){
        page = totalPage;
        return;
      }
      pageInner(page);
      changePage(page);
    };

    function changePage(page) {
      $.ajax({
        url : 'http://h6.duchengjiu.top/shop/api_goods.php?page='+page+'&pagesize='+pageSize,
        type : 'get',
        dataType : 'json',
        success: function(resp){
          imgListUl.innerHTML='';
          createStyle(resp,page);
        }
      });
      page = this.innerText;
      pageInner(this.index);
    }








