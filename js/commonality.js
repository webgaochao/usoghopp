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
	
	//首页公告
	function inDexMove () {
		$(".notice_scroll .show_notice").animate({"marginTop":"-28px"} , 800 , function () {
			$(".notice_scroll .show_notice li:first").appendTo($(".notice_scroll ul"))
			$(".notice_scroll .show_notice").css("marginTop","0")
		})
		
	}
	
	var timer = setInterval(inDexMove , 2500) ;
	
	$('#top_nav .notice_scroll').hover(function () {
		clearInterval(timer) ;
	} , function () {
		timer = setInterval(inDexMove , 2500) ;
	})	
	
	//首页搜索栏
	
	//搜索栏
	//得焦
	var num = 0 ;
	$('.search .sch_in').focus(function () {
		num ++ ;
		//console.log(num)
		$('.search .sch_in').attr('placeholder' , '') ;
		$('.search .sch_in').val('') ;
		if (num >= 2) {
			$('.lenov-words').find('.history-tit1').remove() ;
			$('.lenov-words').prepend('<li class="history-tit1">历史搜索</li>') ;
			$('.lenov-words').show() ;
		}
		
		//历史记录出现/消失
		$('.sch').hover(function () {
			$('.lenov-words li').show() ;
		} , function () {
			$('.lenov-words li').hide() ;
		})
	})
	//失焦
	$('.search .sch_in').blur(function () {
		setTimeout(function () {
			$('.lenov-words').hide() ;
		} , 500)
		
		if ($('.search .sch_in').val() == '') {
			$('.search .sch_in').attr('placeholder' , '请输入商品名称或货号') ;
		}
		//历史记录
		if ($('.search .sch_in').val() != '') {
			var str = $('.search .sch_in').val() ;
			
			if ($('.lenov-words li').size() < 1) {
				$('.lenov-words').append('<li class="history-tit">'+ str +'</li>') ;
			}else {
				$('.lenov-words li:first').after('<li class="history-tit">'+ str +'</li>') ;
			}
			//历史记录li记录五条
			if ($('.lenov-words li').size() > 6) {
				$('.lenov-words li:last').remove() ;
			}
		}
	})
	
	//历史记录点击
	$('.lenov-words').on('click' , '.history-tit' , function () {
		//alert(1)
		var text1 = $(this).text() ;
		//console.log(text1) ;
		$('.sch_in').val(text1) ;
	})
	
	//购物车
	$('.mycart').hover(function () {
		$('.cart-info').show() ;
		$('.mycart .cart-bag').addClass('active');
		$('.mycart .cart-bag a').css('color' , 'red') ;
		$('.ijt').css('background-position' , '-190px 0px')
	} , function () {
		$('.cart-info').hide() ;
		$('.mycart .cart-bag').removeClass('active');
		$('.mycart .cart-bag a').css('color' , '#222') ;
		$('.ijt').css('background-position' , '-189px -59px')
	})
	
	//二级菜单
	$.ajax({
		type:"get",
		url:"../js/json/indexNav.json",
		async:true,
		success:function (data) {
			var str = '' ;
			for ( var j = 1 ; j < 7 ; j ++) {
				var mag = data["data"+ j] ;
				//console.log(mag) ;
				//console.log(mag.length) ;
				
				str += "<ul class='dl1_ul' dataTo="+ j +">"
				
					for (var i in mag) {
						//console.log(mag[i].name) ;
						//console.log(mag[i].id) ;
						str += "<li class='dt_li1' dataid='"+mag[i].id+"'><a href='javascript: ;' dataid='"+mag[i].id+"'>"+mag[i].name+"</a></li>"
					}
					
				str += "</ul>"
			}
			$('.nav_in').append(str) ;
		}
	});
	var s = setCookieDate(1)//cookie过期时间
	
	$('.nav_right').hover(function () {
		$('.nav_in').show() ;
		$('.nav_right .nav_span a').css('background' , 'url(../img/index/searchbar.jpg) no-repeat 0px -133px')
	} , function () {
		$('.nav_in').hide() ;
		$('.nav_right .nav_span a').css('background' , 'url(../img/index/searchbar.jpg) no-repeat 0px -65px')
	})
	
})
