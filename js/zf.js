$(function () {
	//倒计时
	//console.log(typeof(maTime))
	//console.log(maTime)
	var str = '' ;
	var t = 7200 ;
	var timer = null;
	
	timer = setInterval ( function (){
		
		t -- ;
		
		if ( t >= 0 ) {
			
			var iiH = Math.floor(t / 3600 )
			var iiM = Math.floor( t % 3600 / 60 ) 
			var iiS = t % 60

			var Dat = [
				iiH < 10 ? 0 : Math.floor( iiH / 10 ) ,iiH % 10 ,
				iiM < 10 ? 0 : Math.floor( iiM / 10 ) ,iiM % 10 ,
				iiS < 10 ? 0 : Math.floor( iiS / 10 ) ,iiS % 10 
			]

			str = iiH + ":" + iiM + ":" + iiS ;
			//console.log(str)
			$('.djs').html('距结束' + str) ;
		}else {
			clearInterval( timer );
			$('.djs').html('你超时了！') ;
		}
	} , 1000 )
	
	
	//单击
	$('.pay-check li input[value="1"]').click(function () {
		$('.has-select').css('background-position' , '-286px -128px')
	})
	
	$('.pay-check li input[value="2"]').click(function () {
		$('.has-select').css('background-position' , '-20px -200px')
	})
	
	$('.pay-check li input[value="3"]').click(function () {
		$('.has-select').css('background-position' , '-20px -130px')
	})
	
	$('.pay-check li input[value="4"]').click(function () {
		$('.has-select').css('background-position' , '-282px -195px')
	})
	
	$('.pay-check li input[value="5"]').click(function () {
		$('.has-select').css('background-position' , '-21px -273px')
	})
	
	$('.pay-ljzf').click(function () {
		$('.Tianc').show() ;
		var timer = null ;
		var t = 6 ;
		
		clearInterval(timer) ;
		
		timer = setInterval(function () {
			t -- ;
			$('.Ti').text(t) ;
			if ( t == 0 ) {
				window.location.href = '../index.html' ;
			}
		} , 1000)
		
		var keys=document.cookie;
		//console.log(keys);
		var cook = keys.split("; ") ;
		//console.log(cook);
		for(var i = 0; i < cook.length; i ++) {
			var daid = cook[i].split("=") ;
			deleteCookie(daid[0])
		}
		$('.cart_con .cart_form ').remove() ;
	})
	
	var dataid = getCookie('dataid') ;
	
	$('.pay-price span em').text(getCookie('B' + dataid)) ;
})
