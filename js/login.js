$(function () {
	//框内内容
	//得焦事件
	var _this = 0 ;
	
	$('.land_con_l .yhm_text').focus(function () {
		_this = $(this).parent().parent().index() ;
		console.log(_this)
		$(this).css('border' , '1px solid green') ;
		
		if (_this == 0) {
			$('.text1').attr('placeholder' , '')
			$('.text1').parent().find('#tips11').remove() ;
			$('.text1').parent().find('#tips1').remove() ;
			$('.text1').parent().find('#tips2').remove() ;
			return false ;
		}
		if (_this == 1) {
			$('.text2').parent().find('#tips111').remove() ;
			$('.text2').parent().find('#tips3').remove() ;
			return false ;
		}
	})
	$('.land_con_l .yhm_text1').focus(function () {
		$(this).css('border' , '1px solid green') ;
		$(this).parent().find('#tips4').remove() ;
		$(this).parent().find('#tips5').remove() ;
	})
	
	//失焦事件
	
	$('.land_con_l .yhm_text').blur(function () {
		_this = $(this).parent().parent().index() ;
		
		$(this).css('border' , '1px solid #a2a2a2') ;
		//console.log(_this)
		if (_this == 0 && $('.text1').val() == '') {
			$('.text1').attr('placeholder' , '请输入您注册的手机号/邮箱/昵称')
			$('.text1').parent().find('#tips1').remove() ;
			$('.text1').after('<div class="tips" id="tips1">请输入您注册的手机号/邮箱/昵称</div>');
		}
		else if (_this == 0 && $('.text1').val() != '') {
			var _pass = getCookie('user') ;
			var _pass1 = $('.text1').val() ;
			console.log(_pass) ;
			console.log(_pass1) ;
			if (_pass != _pass1) {
				$('.text1').parent().find('#tips1').remove() ;
				$('.text1').after('<div class="tips" id="tips11">您输入的用户名不存在，请核对后重新输入！</div>');
			}else {
				$('.text1').parent().find('#tips1').remove() ;
				$('.text1').parent().find('#tips11').remove() ;
				$('#acnum').addClass('dui') ;
			}
		}
	})
	$('.land_con_l .yhm_text1').blur(function () {
		$(this).css('border' , '1px solid #a2a2a2') ;
	})
	
	//对比cookie，并记录cookie
	
	var time = 0 ;
	var s = setCookieDate(1)//cookie过期时间
	
	$('.btn-img').click(function () {
		time ++ ;
		//console.log(time)
		var _user1 = getCookie('user') ;
		var _user = $('.text1').val() ;
		
		var _pass1 = getCookie('pass') ;
		var _pass = $('.text2').val() ;
		
		if ($('.text1').val() == '' && time == 1) {
			$('.text1').after('<div class="tips" id="tips2">请输入用户名。</div>');
			$('.text1').css('border' , '1px solid red')
		}
		if ($('.text2').val() == '' && time == 1) {
			$('.text2').after('<div class="tips" id="tips3">请输入密码。</div>');
			$('.text2').css('border' , '1px solid red')
		}
		if ($('.text3').val() == '' && time == 1) {
			$('.text3').after('<div class="tips1" id="tips4">请输入验证码。</div>');
			$('.text3').css('border' , '1px solid red')
		}
		if (time >= 3) {
			$('#xianshi').css('display' , 'block') ;
			$('.btn-img').css('margin-top' , '7px') ;
			var _yzm = $('.yzm').val() ;
			var _yzm1 = $('.yhm_text1').val() ;
			
			if (_user1 == _user && _pass1 == _pass && _yzm == _yzm1) {
				window.location.href = '../index.html' ;
			}else {
				$('.text3').after('<div class="tips1" id="tips5">输入验证码/密码有误！</div>');
			}
		}
		if (_user1 == _user && _pass1 == _pass) {
			setCookie("a" , true , s , '/' ) ;
			window.location.href = '../index.html' ;
		}else if (_user1 == _user && _pass1 != _pass) {
			$('.text2').after('<div class="tips" id="tips111">您输入的密码错误，请核对后重新输入！</div>');
		}
	})
	
	//四位随机数 /验证码/
	function Yzm (oText) {
		var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' ;
		var str1 = '' ;
		
		for ( var i = 0; i < 4; i ++ ) {
			var j = Math.floor( Math.random() * 35 ) ;
			str1 += str.charAt( j ) ;
		}
		oText.val(str1) ;
	}
	Yzm($('.yzm')) ;
	
	$('.code_refresh').click(function () {
		Yzm($('.yzm')) ;
	})
})
