/**
 * Created by Administrator on 2017/6/24.
 */
var totalPage;
function createStyle(resp,page) {
  var imgListUl = $('#imgList>ul:eq(0)');
  if(page != 1){
    imgListUl.innerHTML = '';
  }
  imgListUl = imgListUl[0];
  for (var i = 0; i < resp.data.length; i++) {
    totalPage = resp.page.page_count;
    var oLi = document.createElement('li');
    var oA = document.createElement('a');
    oA.href = "goods_desc.html?goods_id=" + resp.data[i].goods_id;
    var oImg = document.createElement('img');
    var oP = document.createElement('p');
    oP.innerText = resp.data[i].goods_name;
    oImg.src = resp.data[i].goods_thumb;
    oA.appendChild(oImg);
    oA.appendChild(oP);
    var oDiv = document.createElement('div');
    oDiv.innerText = resp.data[i].goods_desc;
    oDiv.className = 'cover';
    oLi.appendChild(oA);
    oA.appendChild(oDiv);
    imgListUl.appendChild(oLi);
  }
}
function createPage(resp){
  for(var i = 0; i < 10;i++) {
    var pageLi = document.createElement('li');
    if(i === 0){
      pageLi.style.background = 'darkred';
    }
    pageLi.innerText = i+1;
    olPage.insertBefore(pageLi, nextLi);
  }
  addPage();
    //获取pageLi前面所有的兄弟节点
}
function addPage(){
  var liSiblings = olPage.getElementsByTagName('li');
  for(var j = 1; j < liSiblings.length-1;j++) {
    liSiblings[j].index = j;
    liSiblings[j].addEventListener('click',function(){
      $.ajax({
        "url" : 'http://h6.duchengjiu.top/shop/api_goods.php?page='+this.innerText+'&pagesize='+pageSize,
        "dataType": "json",
        "type": "GET",
        "success": function(resp){
          imgListUl.innerHTML='';
          createStyle(resp);
        },
      });
      page = this.innerText;
      pageInner(this.index);

    },false);

  }
}

function pageInner(number){
  var liSiblings = olPage.getElementsByTagName('li');
  for(var j = 1; j < liSiblings.length-1;j++) {
    if(number <= 6 && page <= 6){
      liSiblings[j].innerText = j;
      for(var k = 1; k < liSiblings.length-1;k++) {
        liSiblings[k].style.background = '';
      }
        liSiblings[page].style.background = 'darkred';
    }
    if(page > 6 && page <= totalPage-4){
      liSiblings[j].innerText = page-(6-j);
      liSiblings[j].style.background = '';
      liSiblings[6].style.background = 'darkred';
    }else if(page > totalPage-4){
        liSiblings[j].innerText = totalPage-(10-j);
        for(var k = 1; k <= liSiblings.length-1;k++) {
          liSiblings[k].style.background = '';
        }
        liSiblings[number].style.background = 'darkred';
    }
  }
}

function check(string, value){
  var reg;
  switch(string){
    case 'username':
      reg =/[\w_]{3,20}/;
      if(reg.test(value)){
        return true;
      }else{
        return false;
      }
      break;
    case 'password':
      reg  =/[\w!@#$%^&*()_+-=;':",\.?/\\]{6,20}/;
      if(reg.test(value)){
        return true;
      }else{
        return false;
      }
      break;
    case 'rePassword':
      if(rePassword.val() === password.val()){
        return true;
      }else{
        return false;
      }
    break;
    case 'mobile':
      reg = /1[3578][\d]{9}/;
      if(reg.test(value)){
        return true;
      }else{
        return false;
      }
      break;
  }
}
function getPrice(number,price){
  return number*price;
}