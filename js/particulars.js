$(function () {
	//获取cookie
	var omg = null ;
	var omg1 = null ;
	var omg2 = null ;
	var omg3 = null ;
	var omg4 = null ;
	var omg5 = null ;
	var omg6 = null ;
	var omg7 = null ;
	var omg8 = null ;
	var omg9 = null ;
	var omg10 = null ;
	var omg11 = null ;
	var omg12 = null ;
	var omg13 = null ;
	var omg14 = null ;
	var omg15 = null ;
	var Id = getCookie('id') ;

	//分页
	$.ajax({
		type:"get",
		url:"../js/json/list.json",
		async:true,
		success:function (data) {
			var mag = data.data ;
			var str = '' ;
			//alert(1)	
			for ( var i in mag ) {
				if ( i == Id ) {
					omg = mag[i].img2 ;
					omg1 = mag[i].img2 ;
					omg2 = mag[i].img3 ;
					omg3 = mag[i].img4 ;
					omg4 = mag[i].img5 ;
					omg5 = mag[i].img6 ;
					omg6 = mag[i].img7 ;
					omg7 = mag[i].img8 ;
					omg8 = mag[i].img9 ;
					omg9 = mag[i].img10 ;
					omg10 = mag[i].img11 ;
					omg11 = mag[i].img12 ;
					omg12 = mag[i].img13 ;
					omg13 = mag[i].img14 ;
					omg14 = mag[i].img15 ;
					omg15 = mag[i].img16 ;
					str += '<div class="sh-crumbs">当前位置：<a href="" title="首页">首页</a><code>&gt;</code><a href="" title="'+mag[i].name1+'">'+mag[i].name1+'</a><code>&gt;</code><a href="" title="'+mag[i].name2+'">'+mag[i].name2+'</a><code>&gt;</code><a href="" title="'+mag[i].name3+'">'+mag[i].name3+'</a><code>&gt;</code><a href="" title="'+mag[i].name+'">'+mag[i].name+'</a></div>' ;
					str += '<div class="sh_xqing W">' ;
					str += '<div class="sh_left">' ;
					str += '<div id="preview" class="preview"><span class="jqzoom"><img alt="" id="addCartImg" src="../img/particulars/'+mag[i].img2+'"></span><i class="lens"><a href="../img/particulars/'+mag[i].img2+'" target="_top"></a></i><div class="sale-out"></div><div class="zjnew t"></div></div>' ;
					str += '<div class="jqzoom-scroll clearfix"><a class="prev"></a><a class="next"></a>' ;
					str += '<div class="items"><ul>' ;
					str += '<li class="a_b active"><img alt="'+mag[i].name+'" title="'+mag[i].name+'" src="../img/particulars/'+mag[i].img2+'"></li><li class="a_c"><img alt="'+mag[i].name+'" title="'+mag[i].name+'" src="../img/particulars/'+mag[i].img3+'"></li><li class="a_d"><img alt="'+mag[i].name+'" title="'+mag[i].name+'" src="../img/particulars/'+mag[i].img4+'"></li><li class="a_e"><img alt="'+mag[i].name+'" title="'+mag[i].name+'" src="../img/particulars/'+mag[i].img5+'"></li><li class="a_f"><img alt="'+mag[i].name+'" title="'+mag[i].name+'" src="../img/particulars/'+mag[i].img2+'"></li><li class="a_g"><img alt="'+mag[i].name+'" title="'+mag[i].name+'" src="../img/particulars/'+mag[i].img2+'"></li>' ;
					str += '</ul></div></div>' ;
					str += '<div class="sh-goods-share clearfix"><div class="no">商品货号：'+mag[i].hhao+'</div><div class="baidu-share"><div id="bdshare" class="share bdshare_t"><span class="bds_more"><i></i>分享</span></div><div class="concerns"><span class="concerns-text" id="concerns"><i></i><span id="concernsinfo">关注</span></span></div></div></div>' ;
					str += '</div>' ;
					str += '<div class="sh_right">' ;
					str += '<div class="brand clearfix"><span class="country-brand"><a target="_blank" alt="'+mag[i].name4+'" title="'+mag[i].name4+'" href="">'+mag[i].name4+'</a></span></div>' ;
					str += '<h1 class="title">'+mag[i].name+'</h1>' ;
					str += '<div class="description">'+mag[i].mss+'</div>' ;
					str += '<div class="price-box"><ul class="a-good-infos"><li class="mb"><span class="label price-label">价格</span><span class="price" alt="'+mag[i].price+'" id="rel_price"><i>￥</i>'+mag[i].price+'</span><span class="original"><i>￥</i>'+mag[i].Yuanj+'</span></li><li><span class="label">优惠</span><div><p><span class="tag">'+mag[i].bao+'</span><span>订单金额满'+mag[i].prace+'元包邮</span></p></div></li></ul></div>' ;
					str += '<div class="choice-buy">' ;
					str += '<dl class="sendto clearfix"><dt>送至</dt><dd class="clearfix"><div class="xdljfa"></div></dd></dl>' ;
					str += '<dl class="color clearfix"><dt>颜色</dt><dd id="color"><a href="javascript: ;" target="_self"><span id="c_74378" alt="'+mag[i].name5+'" class="select"><i></i><img alt="'+mag[i].name5+'" title="'+mag[i].name5+'" src="../img/particulars/'+mag[i].img17+'"></span></a><a href="javascript: ;" target="_self"><span id="c_74379" alt="'+mag[i].name6+'"><i></i><img alt="'+mag[i].name6+'" title="'+mag[i].name6+'" src="../img/particulars/'+mag[i].img18+'"></span></a></dd></dl>' ;
					str += '<dl class="size clearfix"><dt>尺码</dt><dd id="size"><span id="s_545572100" pid="545572100" alt="L" class=""><i></i>L</span><span id="s_545572100" pid="545572100" alt="XL" class=""><i></i>XL</span><span class="size" id="show-size-table"><i></i>尺码表</span></dd></dl>' ;
					str += '<dl class="number clearfix"><dt>数量</dt><dd id="goodsNumber"><div class="box"><a href="javascript:;" id="lessBtn" dataid="'+mag[i].id+'" class="a2">-</a><input class="l" id="goodsNumberInput" type="text" value="1"><a href="javascript:;" id="addBtn" dataid="'+mag[i].id+'" class="a3">+</a></div></dd></dl>' ;
					str += '</div>' ;
					str += '<div class="add-cart"><button type="button" dataid="'+mag[i].id+'" class="sh-shopping-cart"><i></i>加入购物车</button></div>' ;
					str += '</div></div>' ;
					str += '<div class="sh_fdjing" style="display: none;"><img src="../img/particulars/'+mag[i].img2+'"/></div>' ;
				}
			}
			$('.benget').append(str) ;		
		}
	});

	//点击事件
	
	$('.benget').on('click' , '#size #s_545572100' , function () {
		$(this).addClass('select').siblings().removeClass('select') ;
	})
	
	$('.benget').on('click' , '.color #color #c_74378' , function () {
		$(this).addClass('select').parent().siblings('a').find('#c_74379').removeClass('select') ;
		$('#addCartImg').attr('src' , '../img/particulars/'+omg+'') ;
		$('.a_b img').attr('src' , '../img/particulars/'+omg1+'') ;
		$('.a_c img').attr('src' , '../img/particulars/'+omg2+'') ;
		$('.a_d img').attr('src' , '../img/particulars/'+omg3+'') ;
		$('.a_e img').attr('src' , '../img/particulars/'+omg4+'') ;
		$('.a_f img').attr('src' , '../img/particulars/'+omg5+'') ;
		$('.a_g img').attr('src' , '../img/particulars/'+omg6+'') ;
		$('.sh_fdjing img').attr('src' , '../img/particulars/'+omg7+'') ;
	})
	$('.benget').on('click' , '.color #color #c_74379' , function () {
		$(this).addClass('select').parent().siblings('a').find('#c_74378').removeClass('select') ;
		$('#addCartImg').attr('src' , '../img/particulars/'+omg8+'') ;
		$('.a_b img').attr('src' , '../img/particulars/'+omg9+'') ;
		$('.a_c img').attr('src' , '../img/particulars/'+omg10+'') ;
		$('.a_d img').attr('src' , '../img/particulars/'+omg11+'') ;
		$('.a_e img').attr('src' , '../img/particulars/'+omg12+'') ;
		$('.a_f img').attr('src' , '../img/particulars/'+omg13+'') ;
		$('.a_g img').attr('src' , '../img/particulars/'+omg14+'') ;
		$('.sh_fdjing img').attr('src' , '../img/particulars/'+omg15+'') ;
	})
	
	//放大镜
	$('.benget').on('mouseover' , ' .preview' , function () {
		$('.sale-out').show() ;
		$('.sh_fdjing').show() ;
	} )
	$('.benget').on('mouseout' , ' .preview' , function () {
		$('.sale-out').hide() ;
		$('.sh_fdjing').hide() ;
	} )

	$('.benget').on('mousemove' , '.preview' , function (evt) {
		var e = evt || window.event ;

		//console.log(e.pageX) ;
		//console.log(e.pageY) ;
		//console.log($('#box').offset().left) ;
		//console.log($('#box').offset().top) ;
		//console.log($('.preview').offset().left) ;
		//console.log($('.preview').offset().top) ;
		//console.log($('.sale-out').width()) ;
		
		var Left = e.pageX - $('.preview').offset().left - $('.sale-out').width() / 2 ;

		var Top = e.pageY - $('.preview').offset().top - $('.sale-out').height() / 2 ; 

		//console.log(Left) ;
		//console.log(Top) ;

		if ( Left < 0 ) {
			Left = 0 ;
		} else if ( Left > $('.preview').width() - $('.sale-out').width() ) {
			Left = $('.preview').width() - $('.sale-out').width() ;
		}

		if ( Top < 0 ) {
			Top = 0 ;
		} else if ( Top > $('.preview').height() - $('.sale-out').height() ) {
			Top = $('.preview').height() - $('.sale-out').height() ;
		}

		$('.sale-out').css('left' , Left + 'px') ;
		$('.sale-out').css('top' , Top + 'px') ;

		var oImgX = Left / ( $('.preview').width() - $('.sale-out').width() ) ;
		var oImgY = Top / ( $('.preview').height() - $('.sale-out').height() ) ;

		$('.sh_fdjing img').css( { 'left' : -oImgX * ( $(".sh_fdjing img").width() - $(".sh_fdjing").width() ) + 'px' } ) ;
		$('.sh_fdjing img').css( { 'top' : -oImgY * ( $(".sh_fdjing img").height() - $(".sh_fdjing").height() ) + 'px' } ) ;

	})
	//左右运动
	var _index = 0 ;
	
	function Move () {
		if ( _index >= $('.items ul li').size() - 5 ) {
			_index = $('.items ul li').size() - 5 ;
		}
		if ( _index <= 0 ) {
			_index = 0 ;
		}
		$('.jqzoom-scroll .items ul').stop(true).animate({'margin-left' : _index * -70 + 'px'} , 500) ;
		$('.items ul li').eq(_index).addClass('active').siblings().removeClass('active') ;
	}
	$('.benget').on('click' , '.jqzoom-scroll .next' , function () {
		_index ++ ;
		//alert(1)
		Move() ;
	})
	$('.benget').on('click' , '.jqzoom-scroll .prev' , function () {
		_index -- ;
		//alert(2)
		Move() ;
	})
	
	//点击换图
	$('.benget').on('click' , '.items ul li' , function () {
		$(this).addClass('active').siblings('li').removeClass('active') ;
		var oImg = $(this).find('img').attr('src') ;
		//console.log(oImg)
		$('.jqzoom img').attr('src' , oImg) ;
		$('.sh_fdjing img').attr('src' , oImg) ;
	})
	
	//商品加减
	
	$('.benget').on('click' , '#goodsNumber .box .a3' , function () {
		var t = $(this).parent().find('input[id="goodsNumberInput"]') ;
		var data_id = $(this).attr('dataid') ;
		//console.log(data_id) ;
		t.val(parseInt(t.val()) + 1);
		if(isNaN(t.val())) {
			t.val(1);
		}
		//subtotal(t , data_id)
	})
	$('.benget').on('click' , '#goodsNumber .box .a2' , function () {
		var t = $(this).parent().find('input[id="goodsNumberInput"]') ;
		var data_id = $(this).attr('dataid') ;
		//console.log(data_id) ;
		t.val(parseInt(t.val()) - 1);
		if(isNaN(t.val()) || parseInt(t.val()) <= 0) {
			t.val(1);
		}
		if(t.val(parseInt(t.val())) != t.val()) {
			t.val(parseInt(t.val()));
		}
		//subtotal(t , data_id)
	})
	
	//导入
	$('.xq').load('xqa.html')
	$('.daohh').load('xqaa.html')
	//移入事件/邮件地址
	
	$('body').on('click' , '.tab-select a' , function () {
		//alert(1)
		$(this).addClass('active').siblings().removeClass('active') ;
	})
	
	var tpyd = 0 ;
	var tpyd1 = 0 ;
	$(window).scroll(function() {
		if ( $(document).scrollTop() >= 964 ) {
			var gsu = $('#goodsNumberInput').val() ;
			//console.log(gsu)
			$('#ext_num').text('数量：'+gsu+'') ;
			
			var jqian = $('#rel_price').attr('alt') ;
			//console.log(jqian) ;
			
			$('.span_1').text(jqian * gsu) ;
			$('.daohh').show() ;
		}else {
			$('.daohh').hide() ;
		}
		
		//console.log($('.sh-shopping-cart').offset().top - $(document).scrollTop())
	})
    var s = setCookieDate(1)//cookie过期时间
	var jianshu = 0 ;
	//点击飞入购物车
	$('.benget').on('click' , '.sh-shopping-cart' , function () {
		
		var ppt = $(window).width() - $('.sh-shopping-cart').offset().left ;
		var ppt1 = $('.sh-shopping-cart').offset().top - $(document).scrollTop() ;
		tpyd = ppt - $('.sh-shopping-cart').width() -40 ;
		tpyd1 = $(window).height() / 2 - ppt1 - 40 ;
		//console.log(tpyd)
		//console.log(tpyd1)
			
		var sbl = 1 ;
		var wcnm = $('#goodsNumberInput').val() ; 
		//alert(wcnm)
		jianshu += sbl * wcnm ; 
		//alert(jianshu)
		$('#cart_num_1').text( jianshu ) ;
		$('#cart_num_2').text( jianshu ) ;
		$('#color img').parent('.select').find('img').clone().prependTo('.sh-shopping-cart') ;
		$('.sh-shopping-cart img').css({'position':'absolute','width':'40px','height':'40px','border-radius':'5px','right':'0','top':'0','z-index':'888'}) ;
		$('.sh-shopping-cart img').animate({'right':-tpyd + 'px' ,'top':tpyd1 + 'px','width':'20px','height':'20px','opacity':'0'} , 800 , function () {
			$('.sh-shopping-cart img').css('display' , 'none') ;
		})
		
		//小购物车
		
		var dataid = $(this).attr('dataid') ; //0
		//console.log(dataid)
		var Jag1 = $('.price').attr('alt') ; //
		//console.log(Jag1)
		var Gsu1 = jianshu ;
		//console.log(Gsu1)
		
		if ( getCookie(dataid) ) {
			setCookie(dataid , dataid , s , '/') ;
			
			var oldJag1 = getCookie('J'+dataid) ;
			//console.log(oldJag1);
			var nuwJag1 = Number(oldJag1) + Number(Jag1) ;
			//console.log(nuwJag1);
			setCookie('J'+dataid , nuwJag1 , s , '/') ;
			
			var oldGsu1 = getCookie('G'+dataid) ;
			//console.log(oldGsu1);
			var nuwGsu1 = Number(Gsu1) ;
			//console.log(nuwGsu1);
			setCookie('G'+dataid , nuwGsu1 , s , '/') ;
		}else {
			setCookie(dataid , dataid , s , '/') ;
			setCookie('J'+dataid , Jag1 , s , '/') ;
			setCookie('G'+dataid , Gsu1 , s , '/') ;
		}
		
		Gsuu1 = 0 ;
		Jagg1 = 0 ;
		
		Xgwc() ;
	})
	
	$('.daohh ').on('click' , '.sh-shopping-cartt' , function () {
		
		var ppt = $(window).width() - $('.sh-shopping-cartt').offset().left ;
		var ppt1 = $('.sh-shopping-cartt').offset().top - $(document).scrollTop() ;
		tpyd = ppt - $('.sh-shopping-cartt').width() -40 ;
		tpyd1 = $(window).height() / 2 - ppt1 - 40 ;
		//console.log(tpyd)
		//console.log(tpyd1)
		
		var sbl = 1 ;
		var wcnm = $('#goodsNumberInput').val() ;
		//alert(wcnm)
		jianshu += sbl * wcnm ;
		//alert(jianshu)
		$('#cart_num_1').text( jianshu ) ;
		$('#cart_num_2').text( jianshu ) ;
		$('#color img').parent('.select').find('img').clone().prependTo('.sh-shopping-cartt') ;
		$('.sh-shopping-cartt img').css({'position':'absolute','width':'40px','height':'40px','border-radius':'5px','right':'0','top':'0','z-index':'888'}) ;
		$('.sh-shopping-cartt img').animate({'right':-tpyd + 'px' ,'top':tpyd1 + 'px','width':'20px','height':'20px','opacity':'0'} , 800 , function () {
			$('.sh-shopping-cartt img').css('display' , 'none') ;
		})
		
		
		//小购物车
		
		var dataid = $(this).attr('dataid') ;
		//console.log(dataid)
		var Jag1 = $('.price').attr('alt') ;
		//console.log(Jag1)
		var Gsu1 = jianshu ;
		//console.log(Gsu1)
		
		if ( getCookie(dataid) ) {
			setCookie(dataid , dataid , s , '/') ;
			
			var oldJag1 = getCookie('J'+dataid) ;
			//console.log(oldJag1);
			var nuwJag1 = Number(oldJag1) + Number(Jag1) ;
			//console.log(nuwJag1);
			setCookie('J'+dataid , nuwJag1 , s , '/') ;
			
			var oldGsu1 = getCookie('G'+dataid) ;
			//console.log(oldGsu1);
			var nuwGsu1 = Number(Gsu1) ;
			//console.log(nuwGsu1);
			setCookie('G'+dataid , nuwGsu1 , s , '/') ;
		}else {
			setCookie(dataid , dataid , s , '/') ;
			setCookie('J'+dataid , Jag1 , s , '/') ;
			setCookie('G'+dataid , Gsu1 , s , '/') ;
		}

		Gsuu1 = 0 ;
		Jagg1 = 0 ;

		Xgwc() ;
	})
	//点击记录li ID的值
	
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
	
	//小购物车
	
	var Gsuu1 = 0 ;
	//alert(Gsuu1)
	var Jagg1 = 0 ;
	
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
			url:"../js/json/list.json",
			async:true,
			success:function (data) {
				var dataid = getCookie('dataid') ;
				var mag = data.data ;
				//console.log(mag);
				var str = '' ;
				Jag = mag[dataid].price ;
				//console.log(Jag);
				
				for ( var i = 0; i < arr.length; i ++ ) {
					//alert(arr)
					for ( var j = 0; j < mag.length; j ++ ) {
						if ( arr[i] == mag[j].id ) {
							var data_id = mag[j].id ;
							//console.log(data_id);
							//console.log(arr[i]);
							var Gsuu = getCookie('G'+data_id) ;
							//console.log(Gsuu);
							var Jagg = getCookie('J'+data_id) ;
							console.log(Jagg);
							
							Jag = mag[data_id].price ;
							//console.log(Jag);
							Gsuu = getCookie('J' + data_id) / Jag ;
							//console.log(Gsuu)
							
							Gsuu1 += Number(Gsuu);
							//console.log(Gsuu1)
							Jagg1 += Number(Jagg);
							console.log(Jagg1)
							
							if ( Gsuu1 > 0 ) {
								$('#cartlist .none_cart').remove() ;
								$('#cartlist .priczj').remove() ;
								$('#cartlist .carlist').remove() ;
		
								$('#cartlist').append('<div class="carlist"><ul class="cartul"></ul></div>')
								$('#cartlist').append('<div class="priczj"><span class="canum">'+Gsuu1+'</span>件商品 <span class="cartotal">¥<em>'+ Jagg1 +'</em></span><a href="shopping.html" class="gosum">去购物车结算</a></div>')
								$('#cart_num_1').text( Gsuu1 ) ;
								$('#cart_num_2').text( Gsuu1 ) ;
							}
							
							str += '<li>' ;
							str += '<a href="" class="clearfix">' ;
							str += '<div class="cartimg l">' ;
							str += '<img alt="" src="'+mag[j].img+'" width="50" height="50">' ;
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
	
	$('.slide-hui1 a').click(function() {
		var dataid = getCookie('dataid') ;
		//alert(Jagg1)
		setCookie('Z' + dataid , Jagg1 , s , '/') ;
		setCookie('M' + dataid , Gsuu1 , s , '/') ;
	})
	$('.mycart').on('click' , '.gosum' , function() {
		var dataid = getCookie('dataid') ;
		//alert(Jagg1)
		setCookie('Z' + dataid , Jagg1 , s , '/') ;
		setCookie('M' + dataid , Gsuu1 , s , '/') ;
	})
})






