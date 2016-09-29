$(function () {
	//导航手机优品惠移入二维码出现
	$('.top_nav_li').hover(function() {
		$('.app_erm').show() ;
		$('.top_nav_li').find('.top_nav_a').addClass('active');
	} , function () {
		$('.app_erm').hide() ;
		$('.top_nav_li').find('.top_nav_a').removeClass('active') ;
	})
	//导航手机优品惠移出二维码消失
	
	//选项切换卡    /手机注册/电视注册
	$('.regnav').on('click' , '.regnav1' , function () {
		$('.regnav1').addClass('on').find($('span')).removeClass('icon1').addClass('icon4') ;
		$('.phonereg').css('display' , 'block') ;
		$('.regnav3').removeClass('on').find($('span')).removeClass('icon6').addClass('icon3') ;
		$('.TVactive').css('display' , 'none') ;
	})
	$('.regnav').on('click' , '.regnav3' , function () {
		$('.regnav1').removeClass('on').find($('span')).removeClass('icon4').addClass('icon1') ;
		$('.phonereg').css('display' , 'none') ;
		$('.regnav3').addClass('on').find($('span')).removeClass('icon3').addClass('icon6') ;
		$('.TVactive').css('display' , 'block') ;
	})
	//选项切换卡
	
	//注册验证  /框内内容/
	//手机
	//得焦事件
	var _this = 0 ;
	
	$('.land_con .regk').focus(function () {
		_this = $(this).parent().parent().index() ;

		$(this).css('border' , '1px solid green') ;
		//console.log(_this)
		//手机号
		if (_this == 0){
			//console.log(1);
			$('.text1').siblings('#ztips').remove() ;
			$('.text1').after('<div class="ztips" id="etips">请输入常用手机号，避免忘记</div>');
     		return false;
		}
		//密码
		if (_this == 2){
			//console.log(1);
			$('.text2').siblings('#ztips').remove() ;
			$('.text2').after('<div class="ztips" id="etips">6-20位字符，可使用字母、数字或符号的组合</div>');
     		return false;
		}
		//再次密码
		if (_this == 3){
			//console.log(1);
			$('.text3').siblings('#ztips').remove() ;
			$('.text3').after('<div class="ztips" id="etips">请再次输入密码</div>');
     		return false;
		}

	})
	
	$('.land_con .regk1').focus(function () {
		_this = $(this).parent().parent().index() ;

		$(this).css('border' , '1px solid green') ;
		console.log(_this)
		//手机号
		if (_this == 0){
			//console.log(1);
			$('.text1').siblings('#ztips').remove() ;
			$('.text1').after('<div class="ztips" id="etips">请输入常用手机号，避免忘记</div>');
     		return false;
		}
		//密码
		if (_this == 3){
			//console.log(1);
			$('.text2').siblings('#ztips').remove() ;
			$('.text2').after('<div class="ztips" id="etips">6-20位字符，可使用字母、数字或符号的组合</div>');
     		return false;
		}
		//再次密码
		if (_this == 4){
			//console.log(1);
			$('.text3').siblings('#ztips').remove() ;
			$('.text3').after('<div class="ztips" id="etips">请再次输入密码</div>');
     		return false;
		}

	})
	
	$('.land_con .yhm_text1').focus(function () {
		_this = $(this).parent().parent().index() ;
		//console.log(_this)
		$(this).css('border' , '1px solid green') ;
		
		if (_this == 2) {
			$('.item-ifo').find('#zTips1').remove() ;
			$('.item-ifo').find('#zTips11').remove() ;
		}
		if (_this == 4) {
			$('.item-ifo').find('#zTips1').remove() ;
			$('.item-ifo').find('#zTips11').remove() ;
		}
	})
	//失焦事件
	$('.land_con .regk').blur(function () {
		$(this).css('border' , '1px solid #a2a2a2') ;
		//手机号
		if ($('.text1').val() == '') {
			//alert(1)
			$('.text1').siblings('#etips').remove() ;
			$('#phonea1').after('<div class="etips" id="ztips">请输入手机号</div>');
		}else {
			var str = $('.text1').val() ;
			//console.log(str) ;
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/g ;
			if (reg.test(str)) {
				//alert(1)
				$('.text1').parent().find('#etips').remove() ;
				$('.text1').parent().find('#ztips').remove() ;
				$('#phonea1').addClass('dui') ;
			}else {
				$('#phonea1').after('<div class="etips" id="ztips">手机格式不正确，请核对后再输入</div>') ;
				$('#phonea1').removeClass('dui') ;
			}
		}
		//密码
		if ($('.text2').val() == '') {
			//alert(1)
			$('.text2').parent().find('#etips').remove() ;
			$('#setpassword').after('<div class="etips" id="ztips">请输入密码</div>') ;
		}else {
			var str = $('.text2').val() ;
			//console.log(str)
			var reg = /^\w{6,20}$/g ;
			if (reg.test(str)) {
				$('.text2').parent().find('#etips').remove() ;
				$('.text2').parent().find('#ztips').remove() ;
				$('.text2').parent().find('.etips').remove() ;
				$('#setpassword').addClass('dui') ;
			}else {
				$('#setpassword').after('<div class="etips" id="ztips">只能为英文或者数字或者下划线组成的6-20个字符!</div>')
				$('#setpassword').removeClass('dui');
			}
			if (str.length < 6 || str.length > 20) {
	            $('.app2').append("<div class='etips'>密码长度应是6-20位字符，请重新输入</div>");
	            $('#setpassword').removeClass('dui');
	            $('.text2').parent().find('#etips').remove() ;
				$('.text2').parent().find('#ztips').remove() ;
			}
		}
		////再次密码
		if ($('.text3').val() == '') {
			$('.text3').parent().find('#etips').remove() ;
			$('#confirm').after('<div class="etips" id="ztips">请确认密码</div>')
		}else {
			var pass = $('.text2').val() ;
			var pass1 = $('.text3').val() ;
			//console.log(pass);
			//console.log(pass1);
			if (pass != pass1) {
				$('.text3').parent().find('#etips').remove() ;
				$('.text3').parent().find('#ztips').remove() ;
				$('#confirm').after('<div class="etips" id="ztips">两次输入密码不一致!</div>')
			}
			$('.text3').parent().find('#etips').remove() ;
			$('.text3').parent().find('#ztips').remove() ;
			$('#confirm').addClass('dui');
		}
	})
	$('.land_con .yhm_text1').blur(function () {
		$(this).css('border' , '1px solid #a2a2a2') ;
	})
	
	//注册验证 /模拟验证码
	/*
	 * 随机四位数
	window.onload = function () {
		var oBtn = document.getElementById('btn') ;
		var oText = document.getElementById('text') ;
		
		oBtn.onclick = function () {
			var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' ;
			var str1 = '' ;
			
			for ( var i = 0; i < 4; i ++ ) {
				var j = Math.floor( Math.random() * 35 ) ;
				str1 += str.charAt( j ) ;
			}
			
			oText.value = str1 ;
		}
	}
	*/

	//电视
	//失焦事件
	$('.land_con .regk1').blur(function () {
		$(this).css('border' , '1px solid #a2a2a2') ;
		//手机号
		if ($('.text7').val() == '') {
			//alert(1)
			$('.text7').siblings('#etips').remove() ;
			$('#tvphone').after('<div class="etips" id="ztips">请输入手机号</div>');
		}else {
			var str = $('.text7').val() ;
			//console.log(str) ;
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/g ;
			if (reg.test(str)) {
				//alert(1)
				$('.text7').parent().find('#etips').remove() ;
				$('.text7').parent().find('#ztips').remove() ;
				$('#tvphone').addClass('dui') ;
			}else {
				$('#tvphone').after('<div class="etips" id="ztips">手机格式不正确，请核对后再输入</div>') ;
				$('#tvphone').removeClass('dui') ;
			}
		}
		//密码
		if ($('.text9').val() == '') {
			//alert(1)
			$('.text9').parent().find('#etips').remove() ;
			$('#tvsetpw').after('<div class="etips" id="ztips">请输入密码</div>') ;
		}else {
			var str = $('.text9').val() ;
			//console.log(str)
			var reg = /^\w{6,20}$/g ;
			if (reg.test(str)) {
				$('.text9').parent().find('#etips').remove() ;
				$('.text9').parent().find('#ztips').remove() ;
				$('.text9').parent().find('.etips').remove() ;
				$('#tvsetpw').addClass('dui') ;
			}else {
				$('#tvsetpw').after('<div class="etips" id="ztips">只能为英文或者数字或者下划线组成的6-20个字符!</div>')
				$('#tvsetpw').removeClass('dui');
			}
			if (str.length < 6 || str.length > 20) {
	            $('.app9').append("<div class='etips'>密码长度应是6-20位字符，请重新输入</div>");
	            $('#tvsetpw').removeClass('dui');
	            $('.text9').parent().find('#etips').remove() ;
				$('.text9').parent().find('#ztips').remove() ;
			}
		}
		////再次密码
		if ($('.text10').val() == '') {
			$('.text10').parent().find('#etips').remove() ;
			$('#contvpaw').after('<div class="etips" id="ztips">请确认密码</div>')
		}else {
			var pass = $('.text9').val() ;
			var pass1 = $('.text10').val() ;
			//console.log(pass);
			//console.log(pass1);
			if (pass != pass1) {
				$('.text3').parent().find('#etips').remove() ;
				$('.text3').parent().find('#ztips').remove() ;
				$('#contvpaw').after('<div class="etips" id="ztips">两次输入密码不一致!</div>')
			}
			$('.text3').parent().find('#etips').remove() ;
			$('.text3').parent().find('#ztips').remove() ;
			$('#contvpaw').addClass('dui');
		}
	})
	$('.land_con .yhm_text1').blur(function () {
		$(this).css('border' , '1px solid #a2a2a2') ;
	})
	//注册验证 /模拟验证码
	//随机四位数
	
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
	
	$('.ymasage').click(function () {
		Yzm($('.ymasage')) ;
	})
	$('.code_refresh').click(function () {
		Yzm($('.yzm')) ;
	})
	
	//存入cookie
	
	
	$('#btn1').click(function () {
		var user = $('input[name="user"]').val();
		var pass = $('input[name="pass"]').val();
		var pass1 = $('input[name="pass1"]').val();
		
		var yzm =$('input[id="yaz_ma_pcheck_code"]').val();
		var dxYzm = $('input[id="verif_code"]').val();
		
		var yzm1 = $('.yzm').val();
		var dxYzm1 = $('.ymasage').val();
		
		
		/*console.log(user) ;
		console.log(pass) ;
		console.log(pass1) ;
		console.log(yzm) ;
		console.log(yzm1) ;
		console.log(dxYzm) ;
		console.log(dxYzm1) ;*/
		
		var s = setCookieDate(1)//cookie过期时间
		
		if (pass == pass1 && yzm == yzm1 && dxYzm == dxYzm1) {
			setCookie('user' , user , s , '/' ) ;
			setCookie('pass' , pass , s , '/' ) ;
			setCookie("a" , true , s , '/' ) ;
		}
	})
	
	//提交
	$('.item .registsubmit').click(function () {
		var user = $('input[name="user"]').val();
		
		var pass = $('input[name="pass"]').val();
		var pass1 = $('input[name="pass1"]').val();
		
		var yzm =$('input[id="yaz_ma_pcheck_code"]').val();
		var dxYzm = $('input[id="verif_code"]').val();
		
		var yzm1 = $('.yzm').val();
		var dxYzm1 = $('.ymasage').val();
				
		if (pass == pass1 && yzm == yzm1 && dxYzm == dxYzm1) {
			//alert(1)
			
			window.location.href = '../index.html'
		}else if (yzm != yzm1 || dxYzm != dxYzm1) {
			$('.item-ifo .ymasage').after('<div class="etips" id="zTips1">输入验证码不一致!</div>')
		}
		if (user == '' && pass == '' && pass1 == '' && yzm == '' && dxYzm == '') {
			$('#tvphone').after('<div class="etips" id="ztips">请输入手机号</div>');
			$('#phonea1').after('<div class="etips" id="ztips">请输入手机号</div>');
			$('#tvsetpw').after('<div class="etips" id="ztips">请输入密码</div>') ;
			$('#setpassword').after('<div class="etips" id="ztips">请输入密码</div>') ;
			$('#contvpaw').after('<div class="etips" id="ztips">请确认密码</div>') ;
			$('#confirm').after('<div class="etips" id="ztips">请确认密码</div>') ;
			$('.item-ifo .ymasage').after('<div class="etips" id="zTips11">请输入验证码。</div>') ;
		}
	})
		
	//侧边栏
	var $BACK_TOP = $(".fly-return"); 	  //返回顶部按钮

	$BACK_TOP.click(function () {
	    $(window).scrollTop(0)
	});
	/**
	*右侧悬浮条 个人登陆窗口关闭按钮
	*/
	$('.closex').click(function () {
	   	$('.a-user-c').css('background-position' , '0px 0px')
		$('.sidebarcom-hover').css('right' , '-325px')	
	});

	/**
	*鼠标划过右侧悬浮条
	*/
	var _index = 0;
	$('.bar-top li').hover(function () {
		_index = $(this).index() ;
		//console.log(_index)
		if (_index == 0) {
			$('.a-user-c').css('background-position' , '-46px 0px')
			$('.sidebarcom-hover').css('right' , '36px')
		}
		if (_index == 1) {
			$('.a-cart-c').css('background-position' , '-46px -46px')
			$('.slide-hui1').css('right' , '36px')
		}
		if (_index == 2) {
			$('.a-care-c').css('background-position' , '-46px -92px')
			$('.slide-hui2').css('right' , '36px')
		}
		if (_index == 3) {
			$('.a-ser-c').css('background-position' , '-46px -138px')
			$('.slide-hui3').css('right' , '36px')
		}
	} , function () {
		_index = $(this).index() ;
		//console.log(_index)
		if (_index == 0) {
			$('.a-user-c').css('background-position' , '0px 0px')
			$('.sidebarcom-hover').css('right' , '-325px')
		}
		if (_index == 1) {
			$('.a-cart-c').css('background-position' , '0px -46px')
			$('.slide-hui1').css('right' , '-90px')
		}
		if (_index == 2) {
			$('.a-care-c').css('background-position' , '0px -92px')
			$('.slide-hui2').css('right' , '-90px')
		}
		if (_index == 3) {
			$('.a-ser-c').css('background-position' , '0px -138px')
			$('.slide-hui3').css('right' , '-90px')
		}
	})
	
	$('.bar-bot li').hover(function () {
		_index = $(this).index() ;
		//console.log(_index)
		if (_index == 0) {
			$('.a-code-c').css('background-position' , '-46px -184px')
			$('.code-pic').css('right' , '36px')
		}
		if (_index == 1) {
			$('.a-ask-c').css('background-position' , '-46px -230px')
			$('.slide-hui4').css('right' , '36px')
		}
		if (_index == 2) {
			$('.a-return-c').css('background-position' , '-46px -276px')
			$('.slide-hui5').css('right' , '36px')
		}
	} , function () {
		_index = $(this).index() ;
		//console.log(_index)
		if (_index == 0) {
			$('.a-code-c').css('background-position' , '0px -184px')
			$('.code-pic').css('right' , '-135px')
		}
		if (_index == 1) {
			$('.a-ask-c').css('background-position' , '0px -230px')
			$('.slide-hui4').css('right' , '-90px')
		}
		if (_index == 2) {
			$('.a-return-c').css('background-position' , '0px -276px')
			$('.slide-hui5').css('right' , '-90px')
		}
	})
})


