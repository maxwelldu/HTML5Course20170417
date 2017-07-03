$("#searchBut").click(function () {
   location.href = 'search.html?search_text=' + $("#search").val();
});
document.onkeydown = function (event) {
    event = event || window.event;
    if(event.keyCode === 13 ){
        location.href = 'search.html?search_text=' + $("#search").val();
    }
};

