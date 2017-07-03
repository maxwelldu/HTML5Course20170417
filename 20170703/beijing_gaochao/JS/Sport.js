function animate(elem,targetJSON,time,cellBack) {
//接收参数 对象 属性JSON 时间
//             判断是否是IE浏览器
    if(window.navigator.userAgent.indexOf["MSIE"] == -1){
        var interval = 5;
    }else{
        var interval = 50;
    }
    // 添加一个锁！ 也就是分流函数
    elem.isanimate=true;
    var count=0;
//       var一个semaphore(开始)JSON
    var semaphoreJSON = {};
//                for in 遍历 给开始JSON赋值
    for(var k in targetJSON){
//                    通过轮子来让semaphoreJSON[k]赋值
        semaphoreJSON[k]=parseFloat(fetchComStyle(elem,k))
    }
//                    var一个变量在时间内除以帧最大的次数
    var maxcount=time/interval;
//             var一个计时器


//             继续var一个存放步长的JSON
    var stepJSON={};
//             继续遍历targetJSON
    for(var k in targetJSON){
//                 去掉tangetJSON的px转化为数值进行运算
        targetJSON[k]=parseFloat(targetJSON[k]);
//                 用target(终点)JSON减去semaphorsJSON(初始)除以最大次数
        stepJSON[k]=(targetJSON[k]-semaphoreJSON[k])/maxcount;
    }
//             三个JSON（流氓）整理完毕这里可以console.log检查一下
//                        console.log(targetJSON);
//     console.log(semaphoreJSON);
//             该设置一个定时器了
    var timer=setInterval(function () {
//                    这里让信号量的那个JSON（起点）发生变化
        for(var k in semaphoreJSON){
//动起来
            semaphoreJSON[k]+=stepJSON[k];
//                     处理透明度
            if(k != "opacity"){
                elem.style[k]= semaphoreJSON[k]+"px";
            }else{
                elem.style[k]= semaphoreJSON[k];
                elem.style.filter="alpha(opacity="+(semaphoreJSON[k]*100)+")";
            }
        }

//                 计数器开始计数
        count++;

        if(count == maxcount){
//                     次数够了强行挪过去
//                     继续解决一下透明度问题
            for(var k in targetJSON){
                if(k != "opacity"){
                    elem.style[k]=targetJSON[k]+"px";
                }else{
                    elem.style[k]=targetJSON[k];
                    elem.style.filter="alpha(opacity="+(targetJSON[k]*100)+")";
                }
            }
//                     停止计时器
            clearInterval(timer);
            elem.isanimate=false;
            cellBack&&cellBack.call(elem);
        }
//

    },interval);
}




//    计算并返回运算后的样式（轮子）
function fetchComStyle(obj,property) {
    if(window.getComputedStyle){
        return window.getComputedStyle(obj)[property];
    }else{
        return obj.currentStyle[property];
    }
}



