$(function () {
	//品类精选促销
    $.ajax({
		type:"get",
		url:"../js/json/list.json",
		async:true,
		success:function (data) {
			var magg1 = data.data ;
			var strr1 = '' ;
			var arr = [] ;

			for ( var j in magg1 ) {
				arr.push(magg1[j].im) ;
				if ( ( j + 1 ) % 3 == 0 ) {
					strr1 += "<li style='margin-right: 0;' id='"+magg1[j].id+"'>"
					strr1 += "<div class='three_box'>"
					strr1 += "<a href='particulars.html' alt='"+magg1[j].name+"' title='"+magg1[j].name+"' target='_top' >"
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
					strr1 += "<li id='"+magg1[j].id+"'>"
					strr1 += "<div class='three_box'>"
					strr1 += "<a href='particulars.html' alt='"+magg1[j].name+"' title='"+magg1[j].name+"' target='_top' >"
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
    
    //点击记录li ID的值
    var s = setCookieDate(1)//cookie过期时间
    
    $('.index_json ul').on('click' , 'li' , function () {
    	var data_id = $(this).attr('id') ;
    	setCookie('dataid' , data_id , s , '/') ;
    	window.location.href = 'particulars.html' ;
    })
    
    //自动登录
    var Id = getCookie('id') ;
    
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
			url:"../js/json/list.json",
			async:true,
			success:function (data) {
				var dataid = getCookie('dataid') ;
				var mag = data.data ;
				//console.log(mag);
				var str = '' ;
				/*Jag = mag[dataid].price ;
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
	
	
})
