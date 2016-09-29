$(function () {
	function Xgwc () {
		
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
		var Tl = true ;
		var Tll = false ;
		
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
				
				var Gsuu1 = 0 ;
				//alert(Gsuu1)
				var Jagg1 = 0 ;
				
				for ( var i = 0; i < arr.length; i ++ ) {
					//alert(arr)
					for ( var j = 0; j < mag.length; j ++ ) {
						if ( arr[i] == mag[j].id ) {
							var data_id = mag[j].id ;
							//console.log(data_id);
							//console.log(arr[i]);
							var Gsuu = getCookie('G'+data_id) ;
							var Jagg = getCookie('J'+data_id) ;
							
							Jag = mag[data_id].price ;
							Gsuu = getCookie('J' + data_id) / Jag ;
							//console.log(Gsuu)
							
							Gsuu1 += Number(Gsuu);
							//alert(Gsuu1)
							Jagg1 += Number(Jagg);
							
							if ( Gsuu1 > 0 ) {

								$('#cart_num_1').text( Gsuu1 ) ;
								$('#cart_num_2').text( Gsuu1 ) ;
							}
							
							if ( Tl ) {
								str += '<p class="shopcart_tit">我的购物车</p>' ;
								str += '<div class="cart_con">' ;
								str += '<ul class="cart_con_tit c_clearfix">' ;
								str += '<li class="tit_check"></li>' ;
								str += '<li class="tit_meg">商品信息</li>' ;
								str += '<li class="tit_price"></li>' ;
								str += '<li class="tit_quantity">数量</li>' ;
								str += '<li class="tit_sum">小计（元）</li>' ;
								str += '<li class="tit_action">操作</li>' ;
								str += '</ul>' ;
								Tl = false ;
							}
							
							str += '<div class="cart_form c_clearfix"><div class="shopping_con" data-role="product"><div class="c_meg">' ;
							str += '<dl>' ;
							str += '<dt class="dt1"><a href="javascript: ;" dataid="'+mag[j].id+'"><img src="' + mag[j].img + '"/></a></dt>' ;
							str += '<dd class="dd1"><a href="javascript: ;" dataid="'+mag[j].id+'">' + mag[j].name + '</a></dd>' ;
							str += '<a class="a2" href="javascript: ;" dataid="'+mag[j].id+'">-</a><input type="text" id="text1" value="'+Gsuu+'"><a class="a3" href="javascript: ;" dataid="'+mag[j].id+'">+</a>' ;
							str += '<a class="a1" href="javascript: ;" dataid="'+mag[j].id+'">删除</a>'
							str +='<h4>￥:<span class="span1">'+Jagg+'</span>元</h4>' ;
							str += '</dl>'
							str += '</div></div></div>' ;

						}
					}		
				}
				$('#benget .center').append(str) ;

			}
		});
	}
	
	Xgwc() ;
	
	var dataie = getCookie('dataid')
	var jian = getCookie('M' + dataie) ;
	var magg = getCookie('Z' + dataie) ;
	
	var str1 = '' ;
	(function () {
		str1 += '</div>' ;
		str1 += '<div class="cart_con c_clearfix"><div class="c_balance"><div class="c_count">' ;
		str1 += '<p class="c_clearfix"><span class="c_rt c_piece2">¥<i class="fs_14">'+magg+'</i></span><span class="c_lt">商品金额：</span><span class="c_piece c_piece1">共<i>'+jian+'</i>件商品</span></p>' ;
		str1 += '<p class="c_clearfix"><span class="c_rt">－¥<i class="fs_14">0</i></span><span class="c_lt">优惠金额：</span></p>' ;
		str1 += '<p class="c_clearfix"><span class="c_rt c_paid  c_piece2">¥<i>'+magg+'</i></span><span class="c_lt fw_b">实付金额：</span></p>' ;
		str1 += '</div></div>' ;
		
	
		str1 += '<div class="c_balance_bt"><div class="webz">' ;
		str1 += '<div class="b_check"></div>' ;
		str1 += '<div class="b_del"><i></i>删除</div>' ;
		str1 += '<a href="javascript: ;" class="balance_bt">立即结算</a>' ;
		str1 += '</div></div></div>' ;
	} )() ;
	
	$('#jsuan').append(str1)
	
	//计算
	
	var s = setCookieDate(1)//cookie过期时间
	
	$('#benget').on('click' , '.a3' , function () {
		var t = $(this).parent().find('input[id="text1"]') ;
		//console.log(t)
		var data_id = $(this).attr('dataid') ;
		//console.log(data_id) ;
		t.val(parseInt(t.val()) + 1);
		if(isNaN(t.val())) {
			t.val(1);
		}
		subtotal(t , data_id) ;
		zjG() ;
	})
	$('#benget').on('click' , '.a2' , function () {
		var t = $(this).parent().find('input[id="text1"]') ;
		console.log(t)
		var data_id = $(this).attr('dataid') ;
		console.log(data_id) ;
		t.val(parseInt(t.val()) - 1);
		if(isNaN(t.val()) || parseInt(t.val()) <= 0) {
			t.val(1);
		}
		if(t.val(parseInt(t.val())) != t.val()) {
			t.val(parseInt(t.val()));
		}
		subtotal(t , data_id) ;
		
		zjG() ;
	})
	
	function zjG () {
		
		var cookies = document.cookie ;
		var cook = cookies.split("; ") ;
		var arr = [] ;
		
		var Gsu2 = 0 ;
		var Jqian2 = 0 ;
		
		for(var i = 0; i < cook.length; i ++) {
			var daid = cook[i].split("=") ;
			var nameid = Number(daid[0]) ;
			
			if(!isNaN(nameid)){
				arr.push(nameid)
			}
		}
		
		for ( var i = 0 ; i < arr.length ; i ++ ) {
			Gsu2 += Number( getCookie('G' + arr[i]) );
			Jqian2 += Number( getCookie('J' + arr[i]) );
		}
		
		$('.c_piece1 i').text(Gsu2) ;
		$('.c_piece2 i').text(Jqian2) ;
	}
	
	zjG() ;
	
	function subtotal(sum , sum1) {
		var subtotal = 0;
		var Gsu = getCookie('J' + sum1)/getCookie('G' + sum1) ;
		console.log(Gsu)
		subtotal = Gsu * parseInt(sum.val());
		console.log(subtotal) ;
		sum.siblings('h4').find('.span1').text(subtotal);
		
		setCookie('J' + sum1 , subtotal , s , '/') ;
		setCookie('G' + sum1 , sum.val() , s , '/') ;

	}

	$('#benget').on('click' , '.a1' , function () {
		var dataid = $(this).attr('dataid') ;
		deleteCookie(dataid) ;       
		deleteCookie('G' + dataid) ;
		deleteCookie('J' + dataid) ;
		$(this).parents('dl').remove() ;
		
		zjG() ;
	})
	$('#jsuan').on('click' , '.b_del' , function () {
		var keys=document.cookie;
		//console.log(keys);
		var cook = keys.split("; ") ;
		//console.log(cook);
		for(var i = 0; i < cook.length; i ++) {
			var daid = cook[i].split("=") ;
			deleteCookie(daid[0])
		}
		$('.cart_con .cart_form ').remove() ;
		
		$('.c_piece1 i').text(0) ;
		$('.c_piece2 i').text(0) ;
	})
	
	$('#jsuan').on('click' , '.balance_bt' , function () {
		var a = $('.c_piece1 i').text() ;
		var b = $('.c_piece2 i.fs_14').text() ;
		
		setCookie('A' + dataie , a , s , '/') ;
		setCookie('B' + dataie , b , s , '/') ;
		
		window.location.href = 'zf.html' ;
	})
})
