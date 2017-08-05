$(function () {
    var page = 1;
    var pagesize = 10;
    Ajax(page);
    $(window).scroll(function(){
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if(scrollTop + windowHeight >= scrollHeight){
            page++;
            if(page > 10){
                page = 10;
                return;
            }
            Ajax(page);
        }
    });
    var carousel = $("#carousel");
    var carouselUl = $("#carouselUl");
    var carouselLi = $("#carousel ul li");
    var carouselContainer = $(".carouselContainer");
    var circle = $("#circle");
    var circleLi = $("#circle li");
    console.log(circleLi);
    carouselUl.append(carouselLi.eq(0).clone());
    var index = 0;
    var timer = setInterval(Left,5000);
    carousel.mouseenter(function () {
        clearInterval(timer);
    });
    carousel.mouseleave(function () {
        clearInterval(timer);
        timer = setInterval(Left,2000);
    });
    function Left() {
        index++;
        var Color = carouselContainer.css("backgroundColor");
        if(Color == "rgb(158, 211, 193)"){
            carouselContainer.css("backgroundColor","rgb(148, 213, 245)");
        }else if(Color == "rgb(148, 213, 245)"){
            carouselContainer.css("backgroundColor","rgb(158, 211, 193)");
        }
        carouselUl.animate({"left" : -750*index},300,function () {
            if(index >= 2){
                index = 0;
                carouselUl.css("left",0);
            }
            circleLiCss(index);
        });

    }
    circleLi.click(function () {
        var i = $(this).index();
        console.log(i);
        carouselUl.animate({"left" : -750*i},300);
        circleLiCss(i);
    });
    function circleLiCss(i) {
        circleLi.eq(i).addClass("circleLi").siblings().removeClass("circleLi");
    }
    var goodsHotUl = $("#goodsHotUl");
    var goodsHotUlLi = $("#goodsHotUl li");
    var leftSpan = $("#leftSpan");
    var rightSpan = $("#rightSpan");
    goodsHotUl.append(goodsHotUlLi.eq(0).clone());
    var index2 = 0;
    leftSpan.click(function () {
        index2++;
        if(index2 > 1) index2 = 0;
        goodsHotUl.animate({"left":-200*index2},200);
    });
    rightSpan.click(function () {
        index2--;
        if(index2 < 0) index2 = 1;
        goodsHotUl.animate({"left":-200*index2},200);
    });
    var timer2 = setInterval(goodsHotAnimate,3000);
    goodsHotUl.mouseenter(function () {
        clearInterval(timer2);
    });
    goodsHotUl.mouseleave(function () {
        clearInterval(timer2);
        timer2 = setInterval(goodsHotAnimate,3000);
    });
    function goodsHotAnimate() {
        index2++;
        goodsHotUl.animate({"left":-200*index2},300,function () {
            if(index2 >= 2){
                index2 = 0;
                goodsHotUl.css("left",0);
            }
        });
    }
});
