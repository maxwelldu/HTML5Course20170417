var itemHead=document.getElementsByClassName("item-head")[0];
var itemShow=document.getElementsByClassName("item")[0].getElementsByTagName("li");
new tool.ajax({
	"url":cat,
	"type": "GET",
    "dataType": "json",
    "success": function(response){
       	addTag(itemHead,"a","cat_name",response.data,"item-head-name");
        var kind=document.getElementsByClassName("item-head-name");		
			for (var n = 0; n < kind.length; n++) {
			kind[n].idx=n;
			kind[n].href="list.html?cat_id="+response.data[n].cat_id;
			}			
        },
    "error": function(message) {
      //
      console.log(message);
    }
});
var cat_id=tool.getQueryString("cat_id");
new tool.ajax({
  "url":goods+"?cat_id"+cat_id,
  "dataType":"json",
  "success":function(response){
    console.log(response);
    var container=document.getElementsByTagName("ul")[0];
    var item=document.getElementsByClassName("item")[0];
    if (response.data.length<=10){
       for (var i = 0; i < response.data.length; i++)
        {container.innerHTML+="<li><img/><p><a href='detail.html?goods_id="+response.data[i].goods_id+"'></a><i><i></p></li>"}}
    var img=container.getElementsByTagName("img")
    var itemName=container.getElementsByTagName("a");
    var itemDetail=container.getElementsByTagName("i");
    addImg(img,"goods_thumb",response.data);
    addText(itemName,"goods_name",response.data);
    addText(itemDetail,"goods_desc",response.data)}
});
var btn=document.getElementsByTagName("button")[0];
var search=document.getElementsByName("search")[0];
btn.onclick=function ()
{ tool.ajax(
  {
    "url":goods+"?search_text="+search.value,
    "type":"GET",
    "dataType":"json",
    "success":function(response){
      console.log(response.data);
      location.href="search.html?search_text="+search.value
    },
    "error":function (message){console.log(message)}
  }
)};