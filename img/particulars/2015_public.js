$(document).ready(function(){
	getCart();	
	 //公告
    picFunc(".notice_scroll");
	 //左侧广告飘浮
    ltScorll();
	
/**
*图片预加载
*Last Modfy:2015.10.12 author:wxl
*/
if( $(".lazy-loading").size()>0)
{
    $(".lazy-loading").lazyload({
        placeholder : "/themes/ugo/images/2015/2015_public/grey.png",
        effect      : "fadeIn",
        failurelimit : 10 
    });    
}

//左侧广告飘浮
function ltScorll() {
    $(window).scroll(function() {
        if ($(document).scrollTop() > 615) {
            $(".layer_lt").css({
                "top": $(document).scrollTop() + 30
            })

        } else {
            $(".layer_lt").css({
                "top": 615
            })
        }
        var iHeight = $(document).height() - $(window).height();
        if (iHeight - $(document).scrollTop() <= 206) {

            $(".layer_lt").css({
                "top": $(document).scrollTop() - 123
            })
        }
    });
}


/**
*标题定位
*/
(function(){
    var $target = $(".navul li>a");
    var loc = location.href;

    $target.each(function(i,d){
        if(  loc.indexOf( $(d).attr("href") )>=0 && i>0 )
        {
            $target.removeClass("hover");
            $(d).addClass("hover");
        }
    })


    var videoArray = ["http://www.17ugo.com/rexiao.html","http://www.17ugo.com/video_v2_list_cur.php"];
    $.each(videoArray,function(i,n){
        if(  loc.indexOf(n)>=0 )
        {

            $target.each(function(i,d){
                if( $(d).attr("href")== "http://www.17ugo.com/video_shopping.html" )
                {
                    $target.removeClass("hover")
                    $(d).addClass("hover")
                }
            })
        }
    })

})();


var $BACK_TOP = $(".fly-return"); 	  //返回顶部按钮
/**
 * [返回顶部按钮点击事件绑定]
 * @param  {[type]} )  [description]
 */
$BACK_TOP.click(function () {
    $(window).scrollTop(0)
});
/**
*右侧悬浮条 个人登陆窗口关闭按钮
*/
$('.closex').click(function () {

    $(this).parent().parent().parent().removeClass('hover');

});



/**
*鼠标划过“手机优购物”出现手机二维码
*/
$('.yg-phone').hover(function(){
	$('.down_app').show();
	$('.phone_in').find('a').addClass('active');
	},function(){
	$('.down_app').hide();
	$('.phone_in').find('a').removeClass('active');
		})
/**
*鼠标划过"我的购物车"出现下拉订单
*/
$('.mycart').hover(function () {
    $('.cart-info').show();
    $('.cart-bag').addClass('active');
}, function () {
    $('.cart-info').hide();
    $('.cart-bag').removeClass('active');
});
/**
*鼠标划过"所有商品分类"出现下拉菜单
*/
$("#all_fl").hover(function () {
    if ($(this).find('.qb_fl').is(":hidden")) {
        $(this).find('.sysp').find('p').addClass('p_hover');
        $(this).find('.qb_fl').show();
    }
}, function () {
    if ($(this).find('.qb_fl').is(":visible")) {
        $(this).find('.qb_fl').hide();
        $(this).find('.sysp').find('p').removeClass('p_hover');
    }
});
/**
 *底部友情链接点击出现更多
 */
$('.r_button').toggle(function () {
    $('.dlphh').addClass('active');
    $(this).html('▲');
}, function () {
    $('.dlphh').removeClass('active');
    $(this).html('▼');
});

/**
*鼠标划过右侧悬浮条
*/	

$(".bar-top li").hover(
  function () {
    $(this).addClass("hover");
  },
  function () {
    $(this).removeClass("hover");
	
  }
);
$('.ser-c').hover(function(){
	$(this).find('.a-ser-c').css('background-position','-46px -138px')
	/**
*右侧悬浮条增加在线客服分流，鼠标滑过咨询时，箭头颜色改变
*Last Modfy:2015.12.8 author:wxl
*/

$('.a-zx').hover(function(){
	$(this).parents().find('.a-ser-c').css('background-position','0 -521px')
	},function(){
		$(this).parents().find('.a-ser-c').css('background-position','-46px -138px');
		})
},function(){
	$(this).find('.a-ser-c').css('background-position','0 -138px');
	})

$('.bar-top-top li').hover(function () {
        $(this).addClass('hover')
    }
    , function () {
        $(this).removeClass('hover')
    }
);

$('.bar-bot li').hover(function () {
        $(this).addClass('hover')
    },
    function () {
        $(this).removeClass('hover')
    }
);


$('.pipg').find('li').hover(function () {
    $(this).addClass('hover');
}, function () {
    $(this).removeClass('hover');
});
});

/**
*通用选项卡
*/
function nTabs(tabObj, obj) {
    var tabList = document.getElementById(tabObj).getElementsByTagName("dd");
    for (i = 0; i < tabList.length; i++) {
		var oTit=document.getElementById(tabObj + "_Title" + i);
		var $oTit=$(oTit);
		var oCon=document.getElementById(tabObj + "_Content" + i);
		var $oCon=$(oCon);
        if (tabList[i].id == obj.id) {
			$oTit.addClass('active');
            $oCon.show();
        } else {
            $oTit.removeClass('active');
			$oCon.hide();
        }

    }

}

//垂直滚动
function picFunc(obj) {
    var scrollTimer;
    $(obj).hover(function() {
        clearInterval(scrollTimer);
    }, function() {
        scrollTimer = setInterval(function() {
            scrollNews($(obj));
        }, 3000);
    }).trigger("mouseout");

    function scrollNews(obj) {
        var $self = obj.find("ul:first");
        var lineHeight = $self.find("li:first").height();
        $self.animate({
            "margin-top": -lineHeight + "px"
        }, 600, function() {
            $self.css({
                "margin-top": "0px"
            }).find("li:first").appendTo($self);
        })
    }
}
			
/**
*可自动循环的选项卡通用 自动auto：1，不自动 auto：0
*/
function tab(tab_t, tab_t_tag, tab_c, tag_c_tag, evt, auto) {
    var tab_t = $("#" + tab_t);
    var tab_t_li = tab_t.find(tab_t_tag);
    var tab_c_li = $('#' + tab_c + ">" + tag_c_tag);
    var tab_c = $("#" + tab_c);
    var len = tab_t_li.length;
    var i = 0;
    var timer = null;
    var num = 0;
    var iSpeed = 300;

    tab_t_li[evt](function () {
        stopScrolling();
        i = tab_t_li.index($(this));
        tab_t_li.eq(i).addClass("active").siblings().removeClass("active");
        tab_c_li.eq(i).show().siblings().hide();


    })
    if (auto == 1) {
        autoplay();

    }
    function autoplay() {
        timer = setInterval(function () {
            i++;
            if (i >= len) i = 0;
            tab_t_li.eq(i).addClass("active").siblings().removeClass("active");
            tab_c_li.eq(i).show().siblings().hide();
        }, 3000);
    }

    function stopScrolling() {
        clearInterval(timer);
    }

}
		
		
/**
*获取购物车数据
*/
function getCart(flag) {

    $.ajax({
        url: "/flow/cart/ajaxcart",
        type: "POST",
        dataType: "json",
        error: function () {

        },
        success: function (data, status) {//如果调用php成功

            if ($("#cart_num_2").size() > 0) {
                $("#cart_num_2").html(data.count);
            }
            if ($("#cart_num_1").size() > 0) {
                $("#cart_num_1").html(data.count);
            }
            if ($("#cartlist").size() > 0) {
                $("#cartlist").html(data.html);
            }

        }
    });

}

		
/**
*热搜词
*/
if ($("#key_words_inp").size() > 0) {

    $.ajax({

        url: "/search_index.php",
        type: "GET",
        dataType: "text",
        error: function (msg) {
            //console.log(msg);
            //alert('取块原有数据失败');
            console.log('search_index.php:取块原有数据失败');
        },
        success: function (data) {//如果调用php成功
            eval("data = " + data + ";");

            keywords_links = "";
            for (var i = 0; i < data.keywords.length; i++) {
                var geli = i == 0 ? "" : "|";
                keywords_links += geli + '<a target="_blank" href="/search.php?keywords=' + data.keywords[i] + '"' + '>' + data.keywords[i] + '</a>';
                $("#key_searchd").val(data.keywords[0]);
            }
            divhtml = $("#search_index").html() + keywords_links;

            $("#search_index").html(divhtml);
            var pinpai = document.getElementById("key_words_inp").value;
            if (pinpai != '') {
                document.getElementById("sch_in").value = pinpai;
            } else {
                $("#sch_in").val(data.recommend);
            }
        }
    });
}

/**
*搜索联想部分 
*Last Modfy:2015.10.22 author:wxl
*/

$('.sch_in').focus(function () {

    if (this.value != '') {
        this.value = ''
    }
    $.ajax({
        url: "/search_reci.php" + "?history=1",
        type: "POST",
        dataType: "html",
        error: function () {
            console.log('head_user.php:取块原有数据失败');
        },
        success: function (data, status) {//如果调用php成功
            eval("data = " + data + ";");
            var html = '<li class="history-tit">历史搜索</li>';
            for (var i = 0; i < data.length; i++) {
                html += '<li class="history-li">\n\
                                        <a class="lis-a" href="/search.php?keywords=' + data[i] + '">' + data[i] + '</a>\n\
                                        <a href="javascript:;" class="del" onclick="delSearch(' + i + ')">删除</a>\n\
                                        </li>';
            }

            $('.history').html(html);
            $('.lenov-words li').hover(
                function () {
                    $(this).addClass('active')
                }, function () {
                    $(this).removeClass('active')
                })


        }
    });

    $('.history').show();
});
$('.sch_in').blur(function(){
	if(this.value==''||this.value=='请输入商品名称或货号'){this.value='请输入商品名称或货号';}
	
})
$('.sch').mouseleave(function(){ setTimeout(function(){$('.lenov-words').hide();},100)})
$('.sch_in').keyup(function () {
    $('.history').hide();

    var keywords = $("#sch_in").val();
    $.ajax({
        url: "/search_reci.php" + "?keywords=" + keywords,
        type: "POST",
        dataType: "html",
        error: function () {
            console.log('head_user.php:取块原有数据失败');
        },
        success: function (data, status) {//如果调用php成功
            eval("data = " + data + ";");
            var html = '';
            for (var i = 0; i < data.length; i++) {
                html += '<li class="lenov-li">\n\
                                            <a class="lis-b" href="/search.php?keywords=' + data[i].hotKeyWorlds + '">' + data[i].hotKeyWorlds + '</a>\n\
                                        </li>';
            }
            $('.lenov').html(html);
            $('.lenov-words li').hover(
                function () {
                    $(this).addClass('active')
                }, function () {
                    $(this).removeClass('active')
                })
        }
    });

    $('.lenov').show();
});

function delSearch(id) {

    $('.del').parent().remove();
    if ($('.history-li').length == 0) {
        $('.lenov-words').hide();
    }
    $.ajax({
        url: "/search_reci.php" + "?key=" + id + '&act=del',
        type: "POST",
        dataType: "text",
        success: function (data, status) {//如果调用php成功

        }
    });

}

/**
*登录状态
*/

$.ajax({
    url: "/head_user.php" + "?fresh=" + Math.random(),
    type: "POST",
    dataType: "html",
    error: function () {
        console.log('head_user.php:取块原有数据失败');
    },
    success: function (data, status) {//如果调用php成功

        $("#wzdh").before(data);
        $(".mei_con").trigger("hover");
    }
});

/**
*图片预加载
*Last Modfy:2015.10.12 author:wxl
*/
if( $(".lazy-loading").size()>0)
{
    $(".lazy-loading").lazyload({
        placeholder : "/themes/ugo/images/2015/2015_public/grey.png",
        effect      : "fadeIn",
        failurelimit : 10 
    });    
}

/**
 * 记录来源id
 */
(function($){
    var F = {
        getCurlParams: function () {
            var queryStr = window.location.search.substr(1);
            var $get = {};
            if ($.type(queryStr) != 'string' || queryStr.length < 1) {
                return $get;
            }
            var queryArr = queryStr.split('&');
            var queryArrLength = queryArr.length;
            if ($.type(queryArr) == 'array' || queryArrLength > 0) {
                for (var i=0; i< queryArrLength; i++) {
                    var param = queryArr[i].split('=');
                    if (param) {
                        $get[param[0]] = decodeURI(param[1]);
                    }
                }
            }
            return $get;
        },
        init:function(){
            var $get = F.getCurlParams();
            if($.type($get['refererId']) !='undefined'){
                document.cookie ="refererId=" + $get['refererId'];
            }
        }
    };
    F.init();

})(jQuery);

(function($){
    var F = {
        config:{
            "template":'vedio',
            "domId":'_current_live_goods_',
            "endTime":0,
            "startTime":0
        },
        init:function(config){
            $.extend(F.config, config);
            F.getCurrentGoods();
            window.setInterval(F.times, 1000);
        },
        getCurrentGoods:function(){
            $.get('/flow/main/currentVideoGoods',{"tpl": F.config.template}, function(res){
                if(res.code != 0){
                    alert(res.msg);
                    return false;
                }
                F.config.endTime = res.data.data.video_endtime * 1000;
                F.config.startTime = res.data.data.video_playtime * 1000;
                if(F.config.domId) {
                    $('#' + F.config.domId).html(res.data.html);
                }
            }, 'json');
        },
        times:function(){
            var endTime = new Date(F.config.endTime);
            //console.log(endTime);
            var nowTime = new Date();
            if(endTime.getTime() >= nowTime.getTime()){
                //console.log(F.config);
                return false;
            }
            F.getCurrentGoods();
        }
    };
    window.vedioShopping = F;
})(jQuery);
			
 
