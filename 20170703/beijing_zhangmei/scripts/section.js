/**
 * Created by 张美 on 2017/7/3.
 */
//轮播
var $carousel = $(".carousel");
var $m_unit = $(".m_unit");
var $imageLis = $(".m_unit li");
var $cilclesLis = $(".circles ol li");
$(".m_unit ul").append($imageLis.eq(0).clone());
var idx = 0;
var timer = setInterval(rightBtnHandler, 2000);
$carousel.mouseenter(function(){
    clearInterval(timer);
});
$carousel.mouseleave(function(){
    timer = setInterval(rightBtnHandler, 2000);
});
$(".rightBtn").click(rightBtnHandler);
function rightBtnHandler(){
    if($m_unit.is(":animated")) return;
    idx++;
    $m_unit.animate({"left" : -1903 * idx},300,function(){
        if(idx > 3){
            idx = 0;
            $m_unit.css("left",0);
        }
    });
    changeCircle();
}
$(".leftBtn").click(function(){
    if($m_unit.is(":animated")) return;
    idx--;
    if(idx < 0){
        idx = 3;
        $m_unit.css("left",-4 * 1903);
    }
    $m_unit.animate({"left" : -1903 * idx},300);
    changeCircle();
});
$cilclesLis.click(function(){
    idx = $(this).index();
    $m_unit.animate({"left" : -1903 * idx},300);
    changeCircle();
});
function changeCircle(){
    var n = idx <= 3 ? idx : 0;
    $cilclesLis.eq(n).addClass("cur").siblings().removeClass("cur");
}
