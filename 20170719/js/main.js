(function(){
	//得到所有的page
	var $pages = $(".page");

	//得到窗口的高度
	var windowHeight = $(window).height();

	//所有page就位
	$pages.css("transform" , "translateY(" + windowHeight + "px)" );
	$pages.css("transform" , "translateY(" + windowHeight + "px)" );
	$pages.eq(0).css("transform" , "none" );
	$pages.eq(0).css("transform" , "none" );

	//监听就是给document对象
	$(document).on("touchstart", touchstartHandler);
	$(document).on("touchmove", touchmoveHandler);
	$(document).on("touchend", touchendHandler);

	//罗列资源列表


	//一个Ajax请求
	$.get("images/page0_1.jpg",function(data){
		alert("这一张图片加载完成")
	});


	//开始滑动的手指位置
	var startY;
	//滑动的距离
	var distanceY;

	//三个相关的page
	var idx = 0;
	var prev = NaN;
	var next = 1;

	//函数截流
	window.lock = true;

	//调用0页面的动画
	inAnimate[0]();

	// 触摸开始
	function touchstartHandler(event){
		//阻止默认事件
		event.preventDefault();

		//如果在waiging页面上进行滑动，没有效果
		if(event.target.id == "waiting"){
			return;
		}
		//函数截流
		if(!lock) return;

		//开始值 
		startY = event.touches[0].clientY;

		//去掉所有的过渡
		$pages.css("transition","none");

		//设置z-index
		$pages.eq(idx).css("z-index","888");
		!isNaN(next) && ($pages.eq(next).css("z-index","999"));
		!isNaN(prev) && ($pages.eq(prev).css("z-index","999"));
	}

	// 触摸移动
	function touchmoveHandler(event){
		//阻止默认事件
		event.preventDefault();
		//如果在waiging页面上进行滑动，没有效果
		if(event.target.id == "waiting"){
			return;
		}
		//函数截流
		if(!lock) return;
		//y是手指的位置减去误差
		distanceY = event.touches[0].clientY - startY;

		//到头了
		if(idx == 0 && distanceY > 0){
			return;
		}else if(idx == 5 && distanceY < 0){
			return;
		}


		if(distanceY < 0){
			//滑动的时候改变transform：
			$pages.eq(idx).css("transform","scale(" + (1 - Math.abs(distanceY) / windowHeight) + ")")

			!isNaN(next) && ($pages.eq(next).css("transform","scale(1) translateY(" + (windowHeight + distanceY) + "px)"));


		}else if(distanceY > 0){
			$pages.eq(idx).css("transform","scale(" + (1 - Math.abs(distanceY) / windowHeight) + ")")

			!isNaN(prev) && ($pages.eq(prev).css("transform","scale(1) translateY(" + (-windowHeight + distanceY) + "px)"));
		}
	}

	// 触摸结束
	function touchendHandler(event){
		//阻止默认事件
		event.preventDefault();
		//如果在waiging页面上进行滑动，没有效果
		if(event.target.id == "waiting"){
			return;
		}
		//函数截流
		if(!lock) return;

		//到头了
		if(idx == 0 && distanceY > 0){
			return;
		}else if(idx == 5 && distanceY < 0){
			return;
		}

		var old = idx;

		//根据distanceY来确定是否滑动成功
		if(distanceY < -windowHeight / 4){
			//向上滑动成功

			//先改变信号量
			prev = idx;
			idx = next;
			next++;
			if(next > 5){
				idx = 5;
				next = NaN;
			}

			//最终的位置
			$pages.eq(prev).animate({"transform":"scale(0)"},400);
			$pages.eq(idx).animate({"transform":"translateY(0)"},400);

		}else if(distanceY > windowHeight / 4){
			console.log("↓")

			//先改变信号量
			next = idx;
			idx = prev;
			prev--;
			if(prev < 0){
				idx = 0;
				prev = NaN;
			}

			//最终的位置
			$pages.eq(next).animate({"transform":"scale(0)"},400);
			$pages.eq(idx).animate({"transform":"translateY(0)"},400);

		}else{
			//没有滑动成功
		 	$pages.eq(idx).animate({"transform":"scale(1) translateY(0px)"});
		 	if(distanceY > 0){
	 			!isNaN(prev) && ($pages.eq(prev).animate({"transform":"scale(1) translateY(" + -windowHeight + "px)"}));
	 	 	}else{
	 			!isNaN(next) &&  ($pages.eq(next).animate({"transform":"scale(1) translateY(" + windowHeight + "px)"}));
			}
		 	 
		}


		//如果滑动成功
		if(idx != old){
			lock = false;
			//inAnimate函数里面开锁
			inAnimate[idx]();
			outAnimate[old]();
		}

		//删除distanceY
		distanceY = undefined;
	}
})();