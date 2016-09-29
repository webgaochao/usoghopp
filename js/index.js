$(function () {
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
				//$('.lenov-words li:first').after('<li class="history-tit">'+ str +'</li>') ;
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
		url:"js/json/indexNav.json",
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
	
	$('.nav_right').hover(function () {
		$('.nav_in').show() ;
		$('.nav_right .nav_span a').css('background' , 'url(img/index/searchbar.jpg) no-repeat 0px -133px')
	} , function () {
		$('.nav_in').hide() ;
		$('.nav_right .nav_span a').css('background' , 'url(img/index/searchbar.jpg) no-repeat 0px -65px')
	})
	
	//轮播图导入
	$.ajax({
		type:"get",
		url:"js/json/indexbanner.json",
		async:true,
		success:function (data) {
			var mag = data.data ;
			//console.log(mag) ;
			var str = '' ;
			var str1 = '' ;
			
			for ( var i in mag ) {
				str += '<a href=""><img alt="'+mag[i].name+'" title="'+mag[i].name+'" src="'+mag[i].img+'"/></a>'
				//console.log(mag.length)
				if ( i < mag.length - 1 ) {
					if ( i == 0 ) {
						str1 += '<a class="b a" href="javascript: ;"></a>'
					}else {
						str1 += '<a class="b" href="javascript: ;"></a>'
					}
				}				
			}
			
			$('.banner_center').append(str) ;
			$('.banner_bottom').append(str1) ;
			
			//精品轮播
			var mag1 = data.data1 ;
			var mag2 = data.data2 ;
			//console.log(mag1) ;
			var str2 = '' ;
			var str3 = '' ;
			
			for (var j in mag1) {
				if ( j == 0 ) {
					str2 += '<a href="" style="display: block;"><img alt="" title="" src="'+mag1[j].img+'"/></a>'
				}else {
					str2 += '<a href=""><img alt="" title="" src="'+mag1[j].img+'"/></a>'
				}
			}
			for (var m in mag2) {
				if ( m == 0 ) {
					str3 += '<a href=""><span class="span_lu" style="display: block;"></span><img alt="" title="" src="'+mag2[m].img+'"/></a>'
				}else {
					str3 += '<a href=""><span class="span_lu"></span><img alt="" title="" src="'+mag2[m].img+'"/></a>'
				}
			}
			
			$('.Boutique_top').append(str2)
			$('.Boutique_bottom').append(str3)
		}
	});
	
	//精品轮播
	
	var _timer = null ;
	var _index = 0 ;
	
	function Mover () {	
		
		$('.Boutique_top a').eq(_index).stop(true).fadeIn(500).siblings('a').fadeOut(500) ;
		$('.Boutique_bottom a').eq(_index).find('.span_lu').show() ;
		$('.Boutique_bottom a').eq(_index).siblings().find('.span_lu').hide() ;
	}
	function TT () {
		_index ++ ;
		
		//console.log($('.Boutique_top img').size()) ;
		if (_index >= $('.Boutique_top a').size()) {
			_index = 0 ;
		}
		//console.log(_index)
		Mover() ;
	}

	_timer = setInterval( TT , 2000 ) ;
	
	//精品轮播点击
	
	$('.Boutique_left').on('click' , '.Boutique_l' , function () {
		_index -- ;
		if (_index < 0) {
			_index = $('.Boutique_top img').size() - 1 ;
		}
		Mover() ;
	})
	$('.Boutique_left').on('click' , '.Boutique_r' , function () {
		_index ++ ;
		if (_index > $('.Boutique_top img').size() - 1) {
			_index = 0 ;
		}
		Mover() ;
	})
	
	//精品轮播移入
	
	$('.Boutique_left').hover(function () {
		clearInterval(_timer) ;
	} , function () {
		_timer = setInterval( TT , 2000 ) ;
	})
	
	$('.Boutique_bottom').on('mouseover' , 'a' , function () {
		$(this).find('.span_lu').show() ;
		_index = $(this).index() ;
		Mover() ;
	})
	$('.Boutique_bottom').on('mouseout' , 'a' , function () {
		$(this).find('.span_lu').hide() ;
	})
	
	
	//轮播图运动
	var timer = null ;
	var index = 0 ;
	
	function Move () {
		if (index >= $('.banner_center img').size()) {
			index = 1 ;
			$('.banner_center').css('margin-left' , '0px') ;
		}
		if ( index == -1 ) {
			index = $('.banner_center img').size() - 2 ;
			$('.banner_center').css('margin-left' , '-5760px') ;
		}
		$('.banner_center').stop(true).animate({'margin-left' : -1920 * index +'px'} , 2000) ;
		if (index == $('.banner_center img').size()-1) {
			$('.banner_bottom a').eq(0).addClass('a').siblings().removeClass('a');
		}
		$('.banner_bottom a').eq(index).addClass('a').siblings().removeClass('a');
	}
	function Panduan () {
		index ++ ;
		Move() ;
	}

	timer = setInterval( Panduan , 3500 ) ;

	//轮播图鼠标移入

	$('.banner_l').hover(function () {
		clearInterval(timer) ;
		$('.banner_right').css('display' , 'block') ;
		$('.banner_left').css('display' , 'block') ;
	} , function () {
		timer = setInterval( Panduan , 3500 ) ;
		$('.banner_right').css('display' , 'none') ;
		$('.banner_left').css('display' , 'none') ;
	})
	
	$('.banner_right').hover(function () {
		$('.banner_right').addClass('right') ;
	} , function () {
		$('.banner_right').removeClass('right') ;
	})
	$('.banner_left').hover(function () {
		$('.banner_left').addClass('left') ;
	} , function () {
		$('.banner_left').removeClass('left') ;
	})
	
	//轮播图鼠标点击
	
	$('.banner_right').click(function () {
		index ++ ;
		Move() ;
	})
	$('.banner_left').click(function () {
		index -- ;
		Move() ;
	})
	
	$('.banner_bottom').on('click' , 'a' , function () {
		index = $(this).index() ;
		Move() ;
	})
	
	//左侧广告
    $(window).scroll(function() { 
        if ($(document).scrollTop() > 615) {
            $(".layer_lt").css({"top": $(document).scrollTop() + 30 + "px"})
        } else {
            $(".layer_lt").css({"top": "615px"})
        }
        
        var iHeight = $(document).height() - $(window).height();
        
        if (iHeight - $(document).scrollTop() <= 200) {
            $(".layer_lt").css({ "top": $(document).scrollTop() - 123 + "px"})
        }
        document.title = $(document).scrollTop() + ':' + $(document).height() + ':' + $(window).height() ;
        /*
        $(window).height()代表了当前可见区域的大小，而$(document).height()则代表了整个文档的高度，可视具体情况使用.
 		注意当浏览器窗口大小改变时(如最大化或拉大窗口后) $(window).height() 随之改变，但是$(document).height()是不变的。
 
		$(document).scrollTop() 获取垂直滚动的距离  即当前滚动的地方的窗口顶端到整个页面顶端的距离
		$(document).scrollLeft() 这是获取水平滚动条的距离

		要获取顶端 只需要获取到scrollTop()==0的时候  就是顶端了

		要获取底端 只要获取scrollTop()>=$(document).height()-$(window).height()  就可以知道已经滚动到底端了

		$(document).height()  //是获取整个页面的高度
		$(window).height()  //是获取当前 也就是你浏览器所能看到的页面的那部分的高度  这个大小在你缩放浏览器窗口大小时 会改变 与document是不一样的  根据英文应该也能理解吧

		自己做个实验就知道了 
		$(document).scroll(function(){
   			$("#lb").text($(document).scrollTop());
		})
		<span id="lb" style="top:100px;left:100px;position:fixed;"></span><!--一个固定的span标记 滚动时方便查看-->
        */
    });
    
    //品类精选促销
    $.ajax({
		type:"get",
		url:"js/json/indexpljs.json",
		async:true,
		success:function (data) {
			var magg = data.data ;
			var magg1 = data.data1 ;
			var magg2 = data.data2 ;
			var strr = '' ;
			var strr1 = '' ;
			var strr2 = '' ;
			var arr = [] ;
			
			for ( var i in magg ) {
				if ( i % 2 != 0 ) {
					strr += '<a href="" id="" target="_top" style="margin-right:0;">' ;
					strr += '<img class="lazy-loading" src="'+magg[i].img+'" title="'+magg[i].name+'" alt="'+magg[i].name+'">' ;
					strr += '</a>'
				}else {
					strr += '<a href="" id="" target="_top">' ;
					strr += '<img class="lazy-loading" src="'+magg[i].img+'" title="'+magg[i].name+'" alt="'+magg[i].name+'">' ;
					strr += '</a>'
				}
			}
			$('.home_four').append(strr) ;
			
			for ( var j in magg1 ) {
				arr.push(magg1[j].im) ;
				if ( ( j + 1 ) % 3 == 0 ) {
					strr1 += "<li style='margin-right: 0;'>"
					strr1 += "<div class='three_box'>"
					strr1 += "<a href='' alt='"+magg1[j].name+"' title='"+magg1[j].name+"' target='_top' >"
					strr1 += "<div class='three_img_box'><i class='i_tv_icon'></i><img class='lazy-loading' src='"+magg1[j].img+"' data-original='"+magg1[j].img+"' alt='"+magg1[j].name+"' title='"+magg1[j].name+"' style='display: block;'><em class='img_box_tit'>"+magg1[j].sming+"</em></div>"
					strr1 += "<p class='three_box_tit c_clearfix'><em class='img_tit'>"+magg1[j].name+"</em></p>"
					strr1 += "<p class='three_subtit'></p>"
					strr1 += "<div class='three_yen'><span class='l three_price'><i>¥</i>"+magg1[j].price+"</span><span class='l sale_price'><p class='i_pos_abs'><em class='i_tag i_zj'>"+magg1[j].bao1+"</em><em class='i_tag i_by'>"+magg1[j].bao+"</em></p><em class='line_price'><i>¥</i>"+magg1[j].Yuanj+"</em></span><span class='r purchased'><i>"+magg1[j].Rensu+"人</i>已购买</span></div>"
					strr1 += "</a>"
					strr1 += "</div>"
					strr1 += "<div class='tax_box_bt'>"
					strr1 += "<span class='l country-name'>"+magg1[j].fhdi+"</span>"
					strr1 += "<span class='r time_rt time_rest' data-desc='距结束仅剩' data-attr='"+magg1[j].im+"'></span>"
					strr1 += "</div>"
					strr1 += "</li>"
				}else {
					strr1 += "<li>"
					strr1 += "<div class='three_box'>"
					strr1 += "<a href='' alt='"+magg1[j].name+"' title='"+magg1[j].name+"' target='_top' >"
					strr1 += "<div class='three_img_box'><i class='i_tv_icon'></i><img class='lazy-loading' src='"+magg1[j].img+"' data-original='"+magg1[j].img+"' alt='"+magg1[j].name+"' title='"+magg1[j].name+"' style='display: block;'><em class='img_box_tit'>"+magg1[j].sming+"</em></div>"
					strr1 += "<p class='three_box_tit c_clearfix'><em class='img_tit'>"+magg1[j].name+"</em></p>"
					strr1 += "<p class='three_subtit'>"+magg1[j].mss+"</p>"
					strr1 += "<div class='three_yen'><span class='l three_price'><i>¥</i>"+magg1[j].price+"</span><span class='l sale_price'><p class='i_pos_abs'><em class='i_tag i_zj'>"+magg1[j].bao1+"</em><em class='i_tag i_by'>"+magg1[j].bao+"</em></p><em class='line_price'><i>¥</i>"+magg1[j].Yuanj+"</em></span><span class='r purchased'><i>"+magg1[j].Rensu+"人</i>已购买</span></div>"
					strr1 += "</a>"
					strr1 += "</div>"
					strr1 += "<div class='tax_box_bt'>"
					strr1 += "<span class='l country-name'>"+magg1[j].fhdi+"</span>"
					strr1 += "<span class='r time_rt time_rest' data-desc='距结束仅剩' data-attr='"+magg1[j].im+"'></span>"
					strr1 += "</div>"
					strr1 += "</li>"
				}
			}
			Time(arr)
			$('.index_json ul').append(strr1) ;
			Panddd() ;
			
			for (var m in magg2) {
				strr2 += "<li><a href='' target='_blank' id='"+magg2[m].id+"'><i>"+magg2[m].i+"</i><img alt='"+magg2[m].name+"' title='"+magg2[m].name+"' src='"+magg2[m].img+"' width='80' height='80'></a></li>"
			}
			$('.foreshow_list ul').append(strr2) ;
		}
	});
	
	function Panddd () {
		for ( var i = 0 ; i < $('.index_json ul li').size() ; i ++) {
			//console.log($('.index_json ul li')) ;
			//console.log(i) ;
			//console.log($('.index_json ul li').eq(i).find('.img_box_tit').text()) ;
			if ($('.index_json ul li').eq(i).find('.img_box_tit').text() == '') {
				$('.index_json ul li').eq(i).find('.img_box_tit').remove() ;
			}
			if ($('.index_json ul li').eq(i).find('.i_by').text() == '') {
				$('.index_json ul li').eq(i).find('.i_by').remove() ;
			}
			if ($('.index_json ul li').eq(i).find('.i_zj').text() == '') {
				$('.index_json ul li').eq(i).find('.i_zj').remove() ;
			}
			if ($('.index_json ul li').eq(i).find('.time_rest').attr('data-attr') == '') {
				$('.index_json ul li').eq(i).find('.time_rest').remove() ;
			}
			if ($('.index_json ul li').eq(i).find('.country-name').text() == '澳大利亚保税区直发' || $('.index_json ul li').eq(i).find('.country-name').text() == '澳大利亚海外直邮') {
				$('.index_json ul li').eq(i).find('.country-name').prepend('<img src="img/index/601.png" />')
			}
			if ($('.index_json ul li').eq(i).find('.country-name').text() == '法国品牌，国内发货') {
				$('.index_json ul li').eq(i).find('.country-name').prepend('<img src="img/index/305.png" />')
			}
			if ($('.index_json ul li').eq(i).find('.country-name').text() == '韩国海外直邮') {
				$('.index_json ul li').eq(i).find('.country-name').prepend('<img src="img/index/133.png" />')
			}
			if ($('.index_json ul li').eq(i).find('.country-name').text() == '海外保税区直发') {
				$('.index_json ul li').eq(i).find('.country-name').prepend('<img src="img/index/0.png" />')
			}
			if ($('.index_json ul li').eq(i).find('.country-name').text() == '美国保税区直发') {
				$('.index_json ul li').eq(i).find('.country-name').prepend('<img src="img/index/502.png" />')
			}
	
		}

	}
	
	
	
	//24小时直播
	var num1 = 0 ;
	$('.f_prev').click(function () {
		num1 -- ;
		Esmove() ;
	})
	$('.f_next').click(function () {
		num1 ++ ;
		Esmove() ;
	})
	
	function Esmove () {
		if (num1 <= 0) {
			num1 =0 ;
		}
		if (num1 >= 7) {
			num1 = 7 ;
		}
		$('.foreshow_list ul').stop(true).animate({'margin-left' : num1 * -270 + 'px'} , 1000)
	}
	
	
	//倒计时

	function myTime (maTime , i) {
		var iNew = new Date(maTime);
		//console.log(typeof(maTime))
		//console.log(maTime)
		var iNow = null;
		var str = '' ;
		var t = 0;
		var timer = null;
		
		timer = setInterval ( function (){
			
			iNow = new Date();

			t = Math.floor( ( iNew - iNow ) / 1000 );

				if ( t >= 0 ) {
					
					var iiH = Math.floor(t / 3600 )
					var iiM = Math.floor( t % 86400 % 3600 / 60 ) 
					var iiS = t % 60

					var Dat = [
						iiH < 10 ? 0 : Math.floor( iiH / 10 ) ,iiH % 10 ,
						iiM < 10 ? 0 : Math.floor( iiM / 10 ) ,iiM % 10 ,
						iiS < 10 ? 0 : Math.floor( iiS / 10 ) ,iiS % 10 
					]

					str = iiH + ":" + iiM + ":" + iiS ;
					//console.log(str)
					$('.time_rest').eq(i).html('距结束' + str) ;
				}else {
					clearInterval( timer );	
				}
		} , 1000 )
	}
	

    function Time (mate) {
 			//console.log(mate) ;
 			var arr2 = [] ;
 			for ( var i = 0 ; i < mate.length ; i ++ ) {
 				if (mate[i] != "") {
 					arr2.push(mate[i]) ;
 				}
 			}
 			//console.log(arr2)
 			for (var i = 0 ; i < arr2.length ; i ++ ) {
 				myTime(arr2[i] , i) ;
 				//console.log(arr2[i])
 				//console.log(i)
 				//$('.time_rest').eq(i).html('距结束仅剩' + str) ;
 			}
    }
    
    //自动登录
    var s = setCookieDate(1)//cookie过期时间
    var Id = getCookie('id')
    
    if(getCookie("a")=="true"){
		$(".top_li1").html('欢迎您' + getCookie("user")) ;
		$('.top_li1').append("<a class='ale' style='margin-left:8px;display:inline-block;' href='javascript:;'>退出</a><span> | </span>")
		$('.top_li2 a').text('我的账户') ;
		$('.top_li5').hide() ;
		
		$('.slide-login-btn').html(getCookie("user") + '您好') ;
	}
	$(".ale").click(function(){
		setCookie("a" , false , s , '/' ) ;
		//alert(1)
		//deleteCookie("user") ;
		//deleteCookie("pass") ;
		$(".top_li1").html('<a href="html/register.html">注册</a><span> | </span>') ;
		$('.top_li2 a').text('登录') ;
		$('.top_li5').show() ;
		
		$('.slide-login-btn').html('你好！请<a href="html/login.html">登录</a>|<a href="html/register.html">注册</a>') ;
	})
	
	
	function Xgwc () {
		
		$('#cartlist .priczj').remove() ;
		$('#cartlist .carlist').remove() ;
		
		var cookies = document.cookie ;
		var cook = cookies.split("; ") ;
		var arr = [] ;
		
		for(var i = 0; i < cook.length; i ++) {
			var daid = cook[i].split("=") ;
			var nameid = Number(daid[0]) ;
			
			if(!isNaN(nameid)){
				arr.push(nameid)
			}
		}
		//console.log(arr)
		
		var Jag = 0;
		
		$.ajax({
			type:"get",
			url:"js/json/list.json",
			async:true,
			success:function (data) {
				var dataid = getCookie('dataid') ;
				var mag = data.data ;
				//console.log(mag);
				var str = '' ;
			/*	Jag = mag[dataid].price ;
				console.log(Jag);*/
				
				var Gsuu1 = 0 ;
				//alert(Gsuu1)
				var Jagg1 = 0 ;
				
				for ( var i = 0; i < arr.length; i ++ ) {
					//alert(arr[i])
					for ( var j = 0; j < mag.length; j ++ ) {
						if ( arr[i] == mag[j].id ) {
							var data_id = mag[j].id ;
							//console.log(data_id);
							var Gsuu = getCookie('G'+data_id) ;
							var Jagg = getCookie('J'+data_id) ;
							
							Jag = mag[data_id].price ;
							Gsuu = getCookie('J' + data_id) / Jag ;
							//console.log(Gsuu)
							
							Gsuu1 += Number(Gsuu);
							//alert(Gsuu1)
							Jagg1 += Number(Jagg);
							
							if ( Gsuu1 > 0 ) {
								$('#cartlist .none_cart').remove() ;
								$('#cartlist .priczj').remove() ;
								$('#cartlist .carlist').remove() ;
								
								$('#cartlist').append('<div class="carlist"><ul class="cartul"></ul></div>')
								$('#cartlist').append('<div class="priczj"><span class="canum">'+Gsuu1+'</span>件商品 <span class="cartotal">¥<em>'+ Jagg1 +'</em></span><a href="html/shopping.html" class="gosum">去购物车结算</a></div>')
								$('#cart_num_1').text( Gsuu1 ) ;
								$('#cart_num_2').text( Gsuu1 ) ;
							}
							
							str += '<li>' ;
							str += '<a href="" class="clearfix">' ;
							str += '<div class="cartimg l">' ;
							str += '<img alt="" src="img/particulars/'+mag[j].img3+'" width="50" height="50">' ;
							str += '</div><div class="cartlink">'+mag[j].name+'</div>' ;
							str += '<div class="pricemx"><span>¥'+mag[j].price+'</span> x '+Gsuu+'</div>' ;
							str += '</a>' ;
							str += '</li>' ;
						}
					}		
				}
				$('.carlist .cartul').append(str) ;
			}
		});
	}
	
	Xgwc() ;
	
})




