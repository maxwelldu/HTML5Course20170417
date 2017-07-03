var shopLists = document.getElementById("shopLists")
var shopHots = document.getElementById("shopHots")
$.ajax({
    "url": 'http://h6.duchengjiu.top/shop/api_cat.php',
    "type": "GET",
    "dataType": "json",
    "success" : function (response) {
        console.log(response);
        for (var i = 0; i <response.data.length; i++){
            var shopList = document.createElement('li');
            shopList.className = 'navlists';
            var shopListA = document.createElement('a');
            shopListA.href = "shoplist.html?cat_id=" + response.data[i].cat_id;
            shopListA.innerText = response.data[i].cat_name;
            shopLists.appendChild(shopList);
            shopList.appendChild(shopListA);
        }
    }
});
var shopList = document.createElement('li');
shopList.className = 'navlists';
var shopListA = document.createElement('a');
shopListA.href = "index.html";
shopListA.innerText = "首页";
shopLists.appendChild(shopList);
shopList.appendChild(shopListA);