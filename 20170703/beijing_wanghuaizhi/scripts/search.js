var btn=document.getElementsByTagName("button")[0];
var search=document.getElementsByName("search")[0];
var searchBox=document.getElementsByClassName("search-box")[0];
var page=document.getElementsByClassName("page")[0];
var num=null;
window.onload=function(){
	var good =tool.getQueryString("search_text");
	console.log(good);
	$.ajax(
	{
		"url":goods+"?search_text"+good,
		"type":"GET",
		"dataType":"json",
		"success":function(response){
			console.log(response.data);
			searchBox.innerHTML=null;
			for (var n = 0; n < response.data.length/5; n++) {
				page.innerHTML+="<li>"+(n+1)+"</li>";
				page.style.width=(n+1)*30+"px";
				page.onclick=function(event){
					event=event||document.event;
					num=event.target.innerHTML;
					searchBox.innerHTML=null;
					build(response);
				}
			};
			num=n;
			build(response);
		},
		"error":function (message){console.log(message)}
	}
)
}
btn.onclick=function ()
{	$.ajax(
	{
		"url":goods+"?search_text="+search.value+"&pagesize=20",
		"type":"GET",
		"dataType":"json",
		"success":function(response){
			console.log(response.data);
			searchBox.innerHTML=null;
			page.innerHTML=null;
			for (var n = 0; n < response.data.length/5; n++) {
				page.innerHTML+="<li>"+(n+1)+"</li>";
				page.style.width=(n+1)*30+"px";
				page.onclick=function(event){
					event=event||document.event;
					num=event.target.innerHTML;
					searchBox.innerHTML=null;
					build(response);
				}
			};
			for (var i = 0; i < response.data.length; i++) {
				var box =document.createElement("div");
				searchBox.appendChild(box);
				var img=document.createElement("img");
				var des=document.createElement("div");
				box.appendChild(img);
				box.appendChild(des);
				img.src=response.data[i].goods_thumb;
				des.innerHTML="<a href='detail.html?goods_id="+response.data[i].goods_id+"'>"+response.data[i].goods_name+"</a>";
			}
		},
		"error":function (message){console.log(message)}
	}
)};
function build(response){for (var i = (num-1)*5; i < num*5; i++) {
				if (!response.data[i]) {return};
				var box =document.createElement("div");
				searchBox.appendChild(box);
				var img=document.createElement("img");
				var des=document.createElement("div");
				box.appendChild(img);
				box.appendChild(des);
				img.src=response.data[i].goods_thumb;
				des.innerHTML='<a href="detail.html?goods_id='+response.data[i].goods_id+'" >'+response.data[i].goods_name+"</a>";
			}}