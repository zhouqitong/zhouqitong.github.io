function meteorMove(id, x, y, duration, top, right, left) {
	var len = arguments.length;
	move(id)
	 .x(x)
	 .y(y)
	 .duration(duration)
	 .end(function () {
		 $(id).css("top", top);
		 if (len === 7) {
			 $(id).css("left", left);
		 } else {
			 $(id).css("right", right);
		 }
		 $(id).css("transform", 'none');
		 console.log(id, x, y, duration, top, right);
	 });
	
	
}
function animationGroup() {
	meteorMove('#meteor0', -450, 700, 5000, -100, 200);
	meteorMove('#meteor1', -450, 700, 5000, -100, 100);
	meteorMove('#meteor2', -450, 700, 5000, -100, -110);
	meteorMove('#meteor3', -450, 700, 5000, -100, -1, 100);
	meteorMove('#meteor4', -450, 700, 5000, -100, -1, 400);
	meteorMove('#meteor5', -450, 700, 5000, -100, 50);
	
}

function setFullpage(paddingtop) {
	$('#fullpage').fullpage({
		//设置背景颜色
//			sectionsColor: ['#0096fb', '#f00', '0096fb'],
		// slide 左右箭头
		controlArrows     : true,
		// 每一页的内容是否垂直居中
		verticalCentered  : false,
		//不要和id和name相同
		anchors           : ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage'],
//			menu              : '#myMenu',
		// css3比jquery 要流畅性能好
		css3              : true,
		navigation        : true,
//			navigationColor:'#f00',
		navigationTooltips: ['首页', '产品介绍', '主播计划', '王者招募', '关于我们'],
//			loopBottom: true,
//			loopTop: true,
		paddingTop:paddingtop,
		// 平滑循环
		continuousVertical: true,
		navigationColor   : '#333',
//			fixedElements     : "#myMenu",
	});
}
window.onload = function () {
	
	var result1 = window.matchMedia('(min-width:1680px)');
	var result2 = window.matchMedia('(min-width:1440px)');
	var result3 = window.matchMedia('(min-width:1280px)');
	var paddingtop ;
	// 当前是1440时,
	console.log(result1.matches); // false
	console.log(result2.matches);// true
	console.log(result3.matches);// true
	
	if (result1.matches) {
		console.log(">=1680 大型设备 大台式电脑");
		paddingtop = 80;
	
	} else if (result2.matches) {
		console.log(">=1440 中型设备 台式电脑");
		paddingtop = 60;
	}  else {
		console.log(">=1280 ");
		paddingtop = 53;
	}
	console.log($("#myMenu li"));
	
	$("#myMenu").find("li").on("click",function () {
		console.log("000000");
		$(this).addClass("active").siblings().removeClass("active");
	});
	
	setFullpage(paddingtop);
	
	setInterval(animationGroup, 10);
};