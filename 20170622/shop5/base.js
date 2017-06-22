/**
 * Created by maxwell on 17/3/24.
 */
var EventUtil = {
//添加事件处理函数
  addHandler: function(element, type, handler){
    if(element.addEventListener){
      element.addEventListener(type, handler, false);
    }else if(element.attachEvent){
      element.attachEvent('on' + type, handler);
    }else{
      element['on' + type] = handler;
    }
  },
//删除事件处理函数
  removeHandler: function(element, type, handler){
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    }else if(element.detachEvent){
      element.detachEvent('on' + type, handler);
    }else{
      element['on' + type] = null;
    }
  }
};
