var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var ios_address ="https://itunes.apple.com/cn/app/fen-bi-wang/id852188634";
var android_address ="http://sj.qq.com/myapp/detail.htm?apkName=com.fenbi.android.gaozhong";
var download_address = ios_address;

if(isAndroid){
	download_address= android_address;
}else{
	download_address = ios_address;
}
$(function () {
	var $phonenum = $("#phonenum");
	var $varifyCode = $("#varifyCode");
	// 获取验证码
	var send= true;
	$('#getCode').click(function(){
		if(!checkMobile($phonenum.val())){
			return;
		}
		
		var ele = $(this);
		var countdown = 60;
		if(send){
			send = false;
			setTime();
			setInterval(setTime,1000);
		}
		function setTime (){
			if (countdown === 0) {
				$(ele).html("获取验证码");
				countdown = 60;
				send = true;
			} else {
				$(ele).html(countdown + "s后重发");
				countdown--;
			}
		}
	});
	
	

	
	$("#pickRightNow").click(function () {
		if(checkInput()){
			// 网络请求
			$(".layer").show();
		}
	});
	
	$(".dialog-download").click(function () {
		$(".layer").hide();
		window.open(download_address);
	});
	function checkMobile(phonenum){
		if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(phonenum))){
			alert("请输入正确手机号码!");
			$phonenum.focus();
			return false;
		}
		return true;
	}
	function checkInput() {
		if(!checkMobile($phonenum.val())){
			return false;
		}
		if(!(/^\d{4}$/.test($varifyCode.val()))){
			alert("请输入正确的验证码!");
	        $("#varifyCode").focus();
			return false;
		}
		return true;
	}
});