$.getUrl = function(string){
    var search = window.location.search.substr(1);
    var reg =  new RegExp('(&|^)+' +string + '=([^&]*)(&|$)');
    var strings = search.match(reg);
    if(strings === null){
      return null;
    }
    return cat_id = strings[2];
};

