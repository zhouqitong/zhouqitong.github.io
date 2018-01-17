var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var ios_address ="https://itunes.apple.com/cn/app/fen-bi-wang/id852188634";
var android_address ="http://sj.qq.com/myapp/detail.htm?apkName=com.fenbi.android.gaozhong";
var download_address = ios_address;
var postAddress = "http://api.woshiwangzhe.com/app/share/invite";
if(isAndroid){
	download_address= android_address;
}else{
	download_address = ios_address;
}
var browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {   //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
function is_weixn(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
	} else {
		return false;
	}
}

$(function () {
	// if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
	// 	var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
	// 	if (ua.match(/MicroMessenger/i) == "micromessenger") {
	// 		//在微信中打开
	// 		$(".yindao").show();
	//
	// 	}
	// 	if (ua.match(/WeiBo/i) == "weibo") {
	// 		//在新浪微博客户端打开
	// 		$(".yindao").show();
	//
	//
	// 	}
	// 	if (ua.match(/QQ/i) == "qq") {
	// 		//在QQ空间打开
	// 		$(".yindao").show();
	//
	// 	}
	// 	if (browser.versions.ios) {
	// 		//是否在IOS浏览器打开
	// 		$(".yindao").show();
	//
	//
	// 	}
	// 	if(browser.versions.android){
	// 		//是否在安卓浏览器打开
	// 		$(".yindao").show();
	//
	//
	// 	}
	// } else {
	// 	//否则就是PC浏览器打开
	// 	$(".yindao").hide();
	//
	// }
	if(is_weixn()){
		alert("true");
	}else{
		alert("false");
	}
	
	
	
	var mySwiper = new Swiper ('.swiper-container', {
		direction: 'horizontal',
		loop: true,

	
		on: {
			slideChangeTransitionStart: function(){
				var index = this.activeIndex;
				if(index == 4){
					index = 1;
				}
				console.log("index",index);
				$(".tab-container").children().eq(index-1).addClass("tab-item-active").siblings().removeClass("tab-item-active");
				
			},
		},
	})
	$(".tab-item").click(function(){
		$(this).addClass("tab-item-active").siblings().removeClass("tab-item-active");
		var index = $(this).data("index");
		console.log(index-1);
		mySwiper.slideTo(index);
	})
	
});

