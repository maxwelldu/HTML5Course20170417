(function(){
	//全局锁
	lock = window.lock;
	//入场动画
	window.inAnimate = [function(){},function(){},function(){},function(){},function(){},function(){}];
	window.outAnimate = [function(){},function(){},function(){},function(){},function(){},function(){}];

	inAnimate[0] = function(){
		lock = true;
	}

	//正向编程。猫腻位置不要写在css里。要用zepto的css函数来设置
	inAnimate[1] = function(){
		//进场，zepto没有delay()就要写在回调函数里面，或者setTimeout里面
		$(".no1 .page1_1").animate({"transform":"translateX(0)"},1000,function(){
			$(".no1 .page1_2").animate({"transform":"translateX(0)"},1000,function(){
				$(".no1 .jixu").show();
				lock = true;
			});
		});
	}

	outAnimate[1] = function(){
		$(".no1 img").css("transform","translateX(-500px) rotateX(180deg)");
	}


	inAnimate[2] = function(){
		console.log(1)
		lock = true;
	}

	inAnimate[3] = function(){
		lock = true;
	}

	inAnimate[4] = function(){
		lock = true;
	}

	inAnimate[5] = function(){
		lock = true;
	}
	
})();

	