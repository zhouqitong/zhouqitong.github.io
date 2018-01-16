var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var ios_address ="https://itunes.apple.com/cn/app/fen-bi-wang/id852188634";
var android_address ="http://sj.qq.com/myapp/detail.htm?apkName=com.fenbi.android.gaozhong";
var download_address = ios_address;


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
	meteorMove('#meteor0', -350, 500, 5000, -100, 200);
	meteorMove('#meteor1', -350, 500, 5000, -100, 100);
	meteorMove('#meteor2', -350, 500, 5000, -100, -110);
	meteorMove('#meteor3', -350, 500, 5000, -100, -1, 100);
	meteorMove('#meteor4', -350, 500, 5000, -100, -1, 400);
	meteorMove('#meteor5', -350, 500, 5000, -100, 50);
}

function setFullpage(paddingtop) {
	$('#fullpage').fullpage({
		//设置背景颜色
		// 	sectionsColor: ['#000', '#FFDA90', '#E75054','#954B68','#58C3A0'],
		// slide 左右箭头
		controlArrows     : true,
		// 每一页的内容是否垂直居中
		verticalCentered  : false,
		//不要和id和name相同
		anchors           : ['home', 'product', 'plan', 'recruit', 'us'],
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
		// continuousVertical: true,
		navigationColor   : '#333',
		// onLeave:function (anchorLink,index) {
		//
		// 	$("#myMenu li").eq(index-1).addClass("active").siblings().removeClass("active");
		// }
//			fixedElements     : "#myMenu",
	});
}
window.onload = function () {
	$(".ios").click(function(){
		window.open(ios_address);
	});
	$(".android").click(function () {
		window.open(android_address);
	});
	
	
	var result1 = window.matchMedia('(min-width:1680px)');
	var result2 = window.matchMedia('(min-width:1440px)');
	var result3 = window.matchMedia('(min-width:1280px)');
	var paddingtop ;
	// 当前是1440时,
	console.log(result1.matches); // false
	console.log(result2.matches);// true
	console.log(result3.matches);// true
	var menuHeight = $("#myMenu").height();
	var width = $(window).width();
	var height = $(window).height();
	console.log("width:"+width);
	console.log("height:"+height);  // 826 也是fullpage 每屏的高度
	console.log("menuHeight:"+menuHeight);
	 var oneBgHeight = height- menuHeight;
	// $(".one").height();
	console.log("one height-->"+oneBgHeight);
	console.log("one height-->"+$("#section1").height());
	
	if (result1.matches) {
		console.log(">=1680 大型设备 大台式电脑");
		paddingtop = 80;
	} else if (result2.matches) {
		console.log(">=1440 中型设备 台式电脑");
		paddingtop = 60;
	}  else if(result3.matches){
		console.log(">=1280 ");
		paddingtop = 53;
	}else{
		paddingtop = 40;
	}
	$("#myMenu li").on("click",function () {
		$(this).addClass("active").siblings().removeClass("active");
	});
	setFullpage(paddingtop);
	
	setInterval(animationGroup, 10);
};