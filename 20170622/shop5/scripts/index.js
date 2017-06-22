/**
 * Created by sks on 2017/3/21.
 */
(function () {
    var oGoodsCategory = document.getElementById("goods_category");
    var oImageListUl = document.getElementById("imagesList").getElementsByTagName("ul")[0];
    var oHotGoodsUl = document.getElementById("hot_goods_ul");
    var iPositionId = 0;

    //热门商品模板
    var sHotGoodsTemplate = '';

    /**
     * 处理商品分类数据
     */
    var doGoodsCategory = function(data){
        $.each(data.data, function(item){
            var oLi = document.createElement("li");
            var oA = document.createElement("a");
            oA.href = "list.html?cat_id=" + item.cat_id;
            oA.innerText = item.cat_name;
            oLi.appendChild(oA);
            oGoodsCategory.appendChild(oLi);
        })
    };
    /**
     * 获取商品分类信息
     */
    var getGoodsCategory = function(){
        $.jsonp(
            ucshop.getGoodsCategoryAddress(),
            {"format":"jsonp", "callback":"doGoodsCategory"},
            "doGoodsCategory",
            doGoodsCategory
        );
    };

    /**
     * 处理热门商品信息
     * @param error
     * @param d
     */
    var doHotGoods = function(error,d){
        try {
          var dataJSON = JSON.parse(d);
          $.each(dataJSON.data, function (item) {
              var sLi = $.compile(sHotGoodsTemplate, item);
              oHotGoodsUl.innerHTML += sLi;
          });
        } catch(e) {
            console.log(e.errors);
        }
    };

    /**
     * 获取热门商品
     */
    var getHotGoods = function(){
        $.loadTemplate('./template/index_hot_goods.html', function(err, data){
            if (err) {
                console.log(err);
                return;
            }
            sHotGoodsTemplate = data;

            $.get(
              ucshop.getGoodsAddress(),
              {"page":1, "pagesize":10},
              doHotGoods
            )
        });
    };
    /**
     * 处理广告位
     * @param err
     * @param d
     * @returns {boolean}
     */
    var doPosition = function(err, d) {
        try {
            var dataJson = JSON.parse(d);
            iPositionId = dataJson.data[0]['position_id'];
            if (iPositionId < 1) {
                console.log("广告位ID异常");
                return;
            }
            getBanner();
        } catch(e) {
            console.log(e.errors);
        }
    };
    /**
     * 获取广告位
     */
    var getPosition = function (){
        $.get(
          ucshop.getPositionAddress(),
            {},
            doPosition
        );
    };

    /**
     * 获取广告数据
     * @param Error error 错误
     * @param string d 返回的数据
     */
    var doBanner = function(error,d) {
        try {
            var dataJSON = JSON.parse(d);
            $.each(dataJSON.data, function (item, index) {
                if (index == 0) {
                    oImageListUl.innerHTML += '<li class="current"><a href=""><img src="images/default.jpg" alt=""></a></li>';
                } else {
                    oImageListUl.innerHTML += '<li><a href=""><img src="images/default.jpg" alt=""></a></li>';
                }
            });
            //图片预加载开始
            var imgs = oImageListUl.getElementsByTagName("img");
            $.each(dataJSON.data, function (item, index) {
                (function (index) {
                    $.preLoadImg(dataJSON.data[index].url, function (data) {
                        console.log(index);
                        imgs[index].src = data.src;
                    });
                })(index);
            });
            //图片预加载结束

            loadCarousel();
        }catch(e) {
            console.log(e.errors);
        }
    };
    /**
     * 获取首页banner
     */
    var getBanner = function(){
        if (!iPositionId) {
            return;
        }

        $.get(
          ucshop.getAdAddress(),
            {"position_id":iPositionId},
            doBanner
        );
    };

    var loadCarousel = function(){
        var imagesListLis = document.getElementById("imagesList")
            .getElementsByTagName("li");
        var circleListLis = document.getElementById("circles")
            .getElementsByTagName("li");
        var leftBtn = document.getElementById("carousel_leftBtn");
        var rightBtn = document.getElementById("carousel_rightBtn");
        var img_idx = 0; //合理值0、1、2、3、4、5、6、7
        rightBtn.onclick = function(){
            img_idx++;
            if (img_idx>7) {
                img_idx = 0;
            }
            changePic();
        };
        leftBtn.onclick = function(){
            img_idx--;
            if (img_idx<0) {
                img_idx = 7;
            }
            changePic();
        };
        for (var i = 0; i < circleListLis.length; i++) {
            (function (i) {
                circleListLis[i].onmouseover = function(){
                    img_idx = i;
                    changePic();
                };
            })(i);
        }

        function changePic() {
            for (var i = 0; i < imagesListLis.length; i++) {
                imagesListLis[i].className = "";
            }
            imagesListLis[img_idx].className = "current";
            for (var i = 0; i < circleListLis.length; i++) {
                circleListLis[i].className = "";
            }
            circleListLis[img_idx].className = "current";
        }
    };
    window.onload = function() {
        ucshop.checkLoginStatus();
        //获取分类信息
        getGoodsCategory();
        //获取热门商品
        getHotGoods();
        //获取广告位
        getPosition();
    }
})();