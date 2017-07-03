$(function () {
    console.log(123);
    var shopping = $("#shopping");
    $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_cart.php",
        "type":"GET",
        "dataType":"json",
        "data":{
          "token":localStorage.token
        },
        "success":function (response) {
            console.log(response);
            for(var i = 0; i < response.data.length; i++){
                var obj = response.data[i];
                shopping.append("<tr class='tr-goods tr-goods"+ obj.goods_id+"'>" +
                    " <td class='choice'><input type='checkbox' checked='checked' class='choiceInput' ></td>" +
                    " <td class='commodity'><a href='details.html?goods_id=" + obj.goods_id+ "' >" +
                    "<img src='" + obj.goods_thumb + "' alt=''><h1>" + obj.goods_name + "</h1></a></td> " +
                    "<td class='commodity-num'><button class='numLeft'>-</button>" +
                    "<input type='tel' value='" +obj.goods_number+ "'  class='goodsNmu'>" +
                    "<button class='numRight'>+</button></td><td class='univalence'>" + obj.goods_price + "元</td> " +
                    "<td class='subtotal'>" +(obj.goods_number*obj.goods_price)+ "元</td> <td class='operation'>" +
                    "<button class='del'>删除</button></td><input type='hidden' value='"+ obj.goods_id +"'></tr>");
            }
            totalPrice();
            function totalPrice() {
                var sum = 0;
                var totalPrice = $(":checked").parent().nextAll(".subtotal");
                console.log(totalPrice);
                for(var i = 0; i < totalPrice.length; i++){
                    sum += parseInt (totalPrice[i].innerText);
                }
                $("#totalPrice").text("总价：￥"+sum);
            }
            WholeChoice();
            function WholeChoice() {
                var sum = 0;
                for(var i = 0; i < $(".choiceInput").length; i++) {
                    if ($(".choiceInput")[i].checked == true) {
                        sum +=1;
                    }
                    if(sum == $(".choiceInput").length){
                        $("#wholeChoice")[0].checked = true;
                    }else{
                        $("#wholeChoice")[0].checked = false;
                    }
                }
            }
            function Ajax(goodsId,number) {
                $.ajax({
                    "url":"http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.getItem("token"),
                    "type":"POST",
                    "dataType":"json",
                    "data":{
                        "goods_id":goodsId,
                        "number": number
                    }
                });
            }
            shopping[0].addEventListener("click",function (event) {
               event = event || window.event;
               var target = event.target || event.srcElement;
               if(target.id == "wholeChoice"){
                       var Checked = wholeChoice.checked;
                       console.log(Checked);
                       for(var i = 0; i < $(".choiceInput").length; i++){
                           $(".choiceInput")[i].checked = Checked;
                       }
                       totalPrice();
               }
               if(target.className == "choiceInput"){
                   WholeChoice();
                   totalPrice();
               }
               if(target.className == "numLeft"){
                   var Next =  $(event.target).next();
                   var sum =parseInt(Next.val());
                   if(sum === 1){
                       return;
                   }
                   Next.val(sum-1);
                   var univalence = $(event.target).parent().next();
                   var Node = $(event.target).parent().parent().find("input:hidden").val();
                   console.log(Node);
                   var subtotal = $(event.target).parent().next().next();
                   subtotal.text(parseInt(univalence.text())*parseInt(Next.val())+"元");
                   totalPrice();
                   Ajax(Node,parseInt(Next.val()));
               }
               if(target.className == "goodsNmu"){
                   console.log("12");
                   var obj = $(event.target);
                   obj.blur(function () {
                       var goodsNmuVal = obj.val();
                       if(/^[\d]+$/.test(goodsNmuVal)){
                           if(goodsNmuVal < 1){
                               console.log(goodsNmuVal);
                               obj.val("1");
                           }else if(goodsNmuVal > 10){
                               obj.val("10");
                           }
                       }else{
                           obj.val("1");
                       }
                       console.log("12");
                       var univalence = obj.parent().next();
                       var subtotal = obj.parent().next().next();
                       subtotal.text(parseInt(univalence.text())*parseInt(obj.val())+"元");
                       var Node = $(event.target).parent().parent().find("input:hidden").val();
                       console.log(Node);
                       totalPrice();
                       Ajax(Node,parseInt(obj.val()));
                   })
               }
                if(target.className == "numRight"){
                    var Prev =  $(event.target).prev();
                    var sum =parseInt(Prev.val());
                    if(sum === 10){
                        return;
                    }
                    Prev.val(sum+1);
                    var univalence = $(event.target).parent().next();
                    var Node = $(event.target).parent().parent().find("input:hidden").val();
                    console.log(Node);
                    var subtotal = $(event.target).parent().next().next();
                    subtotal.text(parseInt(univalence.text())*parseInt(Prev.val())+"元");
                    totalPrice();
                    Ajax(Node,parseInt(Prev.val()));
                }
                if(target.className == "del"){
                    var goodsId = $(event.target).parent().next().val();
                    console.log(goodsId);
                    Ajax(goodsId,0);
                    $(event.target).parent().parent().remove();
                }
            });
            $("#batch").click(function () {
                var checkedNum = $(".choiceInput");
                for(var i = 0; i < checkedNum.length; i++) {
                    console.log($(".choiceInput").length);
                    if (checkedNum[i].checked == true) {
                        var Node = checkedNum[i].parentNode.parentNode;
                        var NodeVal = $(Node).find("input:hidden").val();
                        console.log(NodeVal);
                        Ajax(NodeVal,0);
                        $(Node).remove();
                    }
                }
            })
        }
    })
});
