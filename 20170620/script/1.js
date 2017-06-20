(function(){
  window.ucai = window.ucai || {};

  var name = 'maxwell';
  function getAge() {
    return 18;
  }
  // window.getAge = getAge;

  //命名空间
  window.ucai.getAge = getAge;

})();
