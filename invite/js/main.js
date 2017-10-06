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
				$(ele).html(countdown + "s重新发送");
				countdown--;
			}
		}
	});
	

	
	$("#pickRightNow").click(function () {
		if(checkInput()){
			// 网络请求
			alert("网络请求");
		}
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
			return false;
		}
		return true;
	}
});