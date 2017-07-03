//开发一个选择框小组件
/*
 function SelectComponent(width, height, content, value, className, selectedClassName) {
 this.selected = false;//是否选中
 this.width = width;
 this.height = height;
 this.content = content;
 this.value = value;
 this.className = className;
 this.selectedClassName = selectedClassName;
 this.dom = null;
 this.init();
 this.bindEvent();
 }
 SelectComponent.prototype.init = function() {
 this.dom = document.createElement('div');
 this.dom.style.width = this.width + 'px';
 this.dom.style.height = this.height + 'px';
 this.dom.innerText = this.content;
 this.dom.className = this.className;
 document.body.appendChild(this.dom);
 }
 SelectComponent.prototype.bindEvent = function() {
 var self = this;
 this.dom.addEventListener('click', function(){
 self.dom.classList.add(self.selectedClassName);
 });
 };
 new SelectComponent(100, 30, '货到付款', '1', 'normal', 'selected');
 new SelectComponent(100, 30, '货到付款', '1', 'normal', 'selected');
 new SelectComponent(100, 30, '货到付款', '1', 'normal', 'selected');
 new SelectComponent(100, 30, '货到付款', '1', 'normal', 'selected');
 */

//得到总价，显示在当前页面
var total = $.getQueryString('total');
$('#total').text('总计：'+total);
var address_id = 0;
//给地址栏加上一个点击事件
$('#address').click(function(event){
    console.log(event.target);
    if (event.target) {
        address_id = event.target.getAttribute('data-id');
    }
});

$(function(){

    //点击下订单
    //提交一个ajax请求，真实的下一个订单
    //下完订单之后跳转到订单列表页面
    $('#order').click(function(){
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
    $("#addUserAddress").click(function(){
        $(".layer").show();
    });
    $(".layer h2 span").click(function(){
        $(".layer").hide();
    });

    $('#add').click(function(){
        var data = $("form").serialize();
        console.log(data);
        shop.api.addUserAddress(data, function(response){
            console.log(response);
            if (response.code === 0) {
                $('.layer').hide();
                fetchUserAddress();
            }
        });
    });

    fetchUserAddress();
    function fetchUserAddress() {
        shop.api.fetchUserAddress(function(response) {
            var html = "";
            for (var i = 0; i < response.data.length; i++) {
                var obj = response.data[i];
                html += '<div class="address-item" data-id="'+obj.address_id+'">'+ obj.address_name +' ' + obj.city + ' ' + obj.province + ' ' + obj.district + ' ' + obj.address +' ' + obj.mobile + ' </div>';
            }
            $('#address').html(html);
        });
    }
});