/**
 * Created by 张美 on 2017/7/2.
 */
$('li').mouseenter(function(){
    $(this).children('.broadside-one-user').slideDown();
})
$('li').mouseleave(function(){
    $(this).children('.broadside-one-user').slideUp();
})


// $('.broadside-one').mouseout(function(){
//     $('div[class="broadside-one-user"]').hide();
// })
//
// $('.broadside-two').mouseover(function(){
//     $('div[class="broadside-cart"]').show();
// })
// $('.broadside-two').mouseout(function(){
//     $('div[class="broadside-cart"]').hide();
// })