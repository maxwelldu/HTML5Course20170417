/**
 * Created by 22896 on 2017/7/1.
 */
$(function () {
    $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_order.php?token="+localStorage.getItem('token'),
        "type":"GET",
        "dataType":"json",
        "success":function (response) {
            console.log(response);
        }
    })
});
