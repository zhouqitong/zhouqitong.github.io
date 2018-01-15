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
$(function () {
	
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

