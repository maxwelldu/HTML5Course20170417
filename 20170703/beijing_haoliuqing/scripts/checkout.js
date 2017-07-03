/**
 * Created by Administrator on 2017/6/30.
 */
var total = $.getQueryString('total');
console.log(total);
// console.log(ds1);
$(".total-price p span").text("￥" + total + "元");
for(var i = 0; i < ds1.length; i ++){
    $("#province").append("<option value='" + ds1[i].name + "'>" + ds1[i].name + "</option>");
}
$("#province").change(function(){
    $("#city").attr("disabled",false);
    var province_name = $("#province option:selected").val();
    console.log(province_name);
    for(var i=0;i< ds1.length;i++) {
        if (ds1[i].name === province_name) {
            // console.log(ds1[i].children);
            var city = ds1[i].children;
            $("#city").children(":not(:first)").remove();
            for(var j = 0; j < city.length; j++){
                $("#city").append("<option value='"+city[j].name+"'>" + city[j].name + "</option>");
            }
        }
    }
});
$("#city").change(function(){
    $("#district").attr("disabled",false);
    var city_name=$("#city option:selected").val();
    console.log(city_name);
    for(var i=0;i< ds1.length;i++) {
       for(var j = 0; j < ds1[i].children.length; j++){
           // console.log(ds1[0].children[0].children);
           if(ds1[i].children[j].name === city_name){
               console.log(ds1[i].children[j].children);
               $("#district").children(":not(:first)").remove();
               var area = ds1[i].children[j].children;
               for(var k = 0; k < area.length; k++){
                   $("#district").append("<option value='"+area[k].name+"'>" + area[k].name + "</option>");
               }
           }
       }
    }
});

var address_id = 0;
//给地址栏加上一个点击事件
$('.select-address').click(function(event){
    console.log(event.target);
    if (event.target) {
        address_id = event.target.getAttribute('data-id');
    }
});
$(function(){

    //点击下订单
    //提交一个ajax请求，真实的下一个订单
    //下完订单之后跳转到订单列表页面
    $(".total-price p button").click(function(){
        if (address_id === 0) {
            alert('请选择地址后再下订单');
            return;
        }
        shop.api.addOrder(address_id, total, function(response){
            console.log(response);
            location.assign('order.html');
        });
    });

    //点击新增按钮显示新增表单
    $("#abolish").click(function(){
        $(".address").hide();
    });
    $(".add-address").click(function(){
        $(".address").show();
    });

    $('#add').click(function(){
        var data = $("form").serialize();
       alert(data);
        shop.api.addUserAddress(data, function(response){
            console.log(response);
            if (response.code === 0) {
                $('.address').hide();
           fetchUserAddress();
            }
        });
    });

    fetchUserAddress();
    function fetchUserAddress() {
        shop.api.fetchUserAddress(function(response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i];
                $(".select-address").append("<li class='new-address'data-id='" + obj.address_id + "'>"+obj.address_name + obj.province+obj.city+ obj.district+obj.address+obj.mobile+"</li>");
            }
        });
    }
});