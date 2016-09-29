//========== 配送区域 begin ============
var regionFun = {
    province_tag: $("#stock_province_item a"),
    city_tag: $("#stock_city_item a"),
    area_tag: $("#stock_area_item a"),
    ctrl_li: $(".mt li"),
    hide_interval : null,
    _clearRegionMouseout :function ()
    {
      $(".store-select").die("mouseout")  
    }  ,
    _setLayerShow : function (num)
    {
        $(".mt li").eq(num).addClass("curr").siblings().removeClass("curr");
        $(".tab-content").hide().eq( num ).show();
    },
    _join_regsion : function (region,$obj, selected)
    {
        var tag = [];
        var tag3 =[];
        var tag4 =[];
        var tag5 =[];

        $.each(region,function(i,n){

            var nm = n.region_name.length;
            var klass =  (nm == 2 || nm == 3) ? "":(   nm == 4 ) ? "col4" : "col3";
            var item = "<li class='"+klass+"'><a data-value='"+n.region_id +"' href='#none' parent_id='"+n.parent_id+"'  class='"+( selected == n.region_id? "curr": "" ) +"'>"+n.region_name+"</a></li>";
            switch( nm )
            {
                case 3:
                    tag3.push( item );
                    break;
                case 4:
                    tag4.push( item );
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                    tag5.push( item );
                    break;
                default:
                    tag.push( item );
                    break;
            }
        })

        $obj.html (    "<ul>"+ tag.concat(tag3,tag4,tag5).join("") +"</ul>" );
    },
    //调取地区码，拼合收获地址
    _getSelectedArea : function (num)
    {
        var txt = "";
        var region_id = "";
        var regionArr = []; //地区
        //num  1 单品页 0 购物车
        if( num )
        {
            $(".tab-content .curr").each(function(){
                txt+= $(this).text().slice(0,4);
            })
        }
        else{
            txt = $(".tab-content .curr").eq(0).text()
        }

        $(".tab-content .curr").each(function(){
            regionArr.push( $(this).attr("data-value") );
        });
        $(".store-select .text").html( txt )
    },
    ajaxStock:function( reginIDS){
        var goods        = {};
        var goods_id = document.getElementById("goods_id").value;
        var number   = $("#goodsNumber #goodsNumberInput").val();
        var curSizeId = '';
        $.each($("#size span"),function(){
            if($(this).hasClass('select')){  
                curSizeId = $(this).attr('id');
            }
        });
        
        $.ajax({
            type: "GET",
            url: '/flow/inventory/goodsInv',
            async:false,
            data: {'goods_id': goods_id,'goods_number':number, 'region': reginIDS.join(),'_':new Date().getTime()},
            success: function(msg){
                if(msg.code == 0){
                    var dataObj = msg.data.detail;
                    var i = 0,s = 0; //是否有货标识
                    $.each(dataObj, function (n, value) {
                        //是否选择规格
                        if(curSizeId != ''){
                            if(value.status == 1){
                                if("s_"+n == curSizeId){
                                   // $("#s_"+n).addClass('select');
                                    i++;s++;
                                    curSizeId = "s_"+n;
                                }
                                $("#s_"+n).removeClass('nogoods');
                            }else{
                                $("#s_"+n).addClass('nogoods');
                            }
                        }else{
                          if(value.status == 1){
                            if(i == 0){
                                if($("#s_"+n).attr('alt') == '共同'){
                                    $("#s_"+n).addClass('select');
                                    curSizeId = "s_"+n;
                                }
                               // $("#s_"+n).addClass('select');
                                i++;
                               // curSizeId = "s_"+n;
                            }
                            $("#s_"+n).removeClass('nogoods');
                            s++;
                          }else{
                            $("#s_"+n).addClass('nogoods');
                          }
                        }
                    });

                    if(i > 0){
                        $(".xdljfa span").css('display','block');
                    }
                    if(s == 0){
                        $("#c_"+goods_id).addClass('nogoods');
                        $(".sh-shopping-cart").addClass('disabled');
                        $(".xdljfa span").css('display','block').html('<strong>无货</strong>，此商品暂时售完</em>');
                        $(".sh-shopping-cart").text('已抢光').unbind('onclick');
                        $(".sale-out").addClass('out');
                        $(".similar-header").css('display','block').html($(".similar-footer").html());
                        setTimeout(function () { 
                            $("#simi4").show();
                        }, 500);
                    }else{
                        if($("#c_"+goods_id).attr('alt') && $("#c_"+goods_id).attr('alt') != '共同' && $.trim($(".size dt").text()) != '颜色'){
                            $("#ext_color").html("颜色：" + $("#c_"+goods_id).attr('alt'));
                        }

                        if(curSizeId != ''){
                            var  curObj = $("#"+curSizeId);
                            if(curObj.attr('alt') != '共同'){
                                var tipStr = $(".size dt").text();
                                tipStr = tipStr ? $.trim(tipStr) : '尺码';
                                var sizemsg = $("#first_cat").val()=='服饰' ? tipStr : '规格';
                                $("#ext_size").html(sizemsg + "：" + $("#"+curSizeId).attr('alt'));
                            }
                            $("#"+curSizeId).removeClass('nogoods');
                        }
                        $(".sh-shopping-cart").removeClass('disabled').html("<i></i>加入购物车");
                        $(".sale-out").removeClass("out");
                        $(".xdljfa span").css('display','block').html('<em>有货</em>');
                        $("#c_"+goods_id).removeClass('nogoods');
                    }
                }else{
                    if(msg.msg == "商品已下架"){
                        $(".sh-shopping-cart").text('敬请期待');
                        $(".sale-out").addClass('nosale');
                        $(".similar-header").css('display','block').html($(".similar-footer").html());
                        setTimeout(function () { 
                            $("#simi4").show();
                        }, 500);
                    }
                    $(".sh-shopping-cart").addClass('disabled');
                    $("#color span,#size span").removeClass('select');
                    $("#c_" + goods_id).addClass('nogoods').addClass('select');
                    $(".xdljfa span").css('display','block').html('<em>'+msg.msg+'</em>');
                }

            },
            dataType:'json'
        });
    },
    init: function(){
       
        $(".store-select").mouseover(function(){
             clearInterval( regionFun.hide_interval )
            $(this).find(".content").show();
        })

        $(".store-select").live("mouseout",function(){
            var $T = $(this).find(".content");
           regionFun.hide_interval  = setTimeout(function(){  $T.hide(); },1000)
        })

        $(".store-select .cls").click(function(){
            $(this).parent().hide();
        })

        regionFun.ctrl_li.click(function(){
            regionFun._setLayerShow( $(this).index() )
        })
        $("#stock_province_item a").live("click",function(){
            regionFun._clearRegionMouseout()
            $("#stock_province_item a").removeClass("curr")
            $(this).addClass("curr")
            $(".mt li").eq(0).find("em").html( $(this).text() )
            $(".mt li").eq(1).show().find("em").html( "请选择" ); 
            $(".mt li").eq(2).hide().find("em").html( "请选择" ); 
            regionFun._setLayerShow( 1 )
            regionFun._join_regsion(   region[ $(this).attr("data-value")].children ,$("#stock_city_item") )
        })

        $("#stock_city_item a").live("click",function(){
            regionFun._clearRegionMouseout()
            $("#stock_city_item a").removeClass("curr");
            $(this).addClass("curr");
            $(".mt li").eq(1).find("em").html( $(this).text() );
            $(".mt li").eq(2).show().find("em").html( "请选择" ); 
            regionFun._setLayerShow( 2 );
            regionFun._join_regsion(   region[ $(this).attr("parent_id")].children[$(this).attr("data-value")].children ,$("#stock_area_item") )

        });

        $("#stock_area_item a").live("click",function(){
            regionFun._clearRegionMouseout()
            $("#stock_area_item a").removeClass("curr")
            $(this).addClass("curr")
            $(".mt li").eq(2).find("em").html( $(this).text() )
            regionFun._getSelectedArea(1);
            var regionArr = [];
            $(".tab-content .curr").each(function(){
                regionArr.push( $(this).attr("data-value") );
            });
            regionFun.ajaxStock( regionArr ); // 选择县 调取库存
            setCookie('user_area',regionArr);
            $(".store-select .content").hide() ;
        });
        // regionFun._join_regsion( region,$("#stock_province_item") ) //初始化 省
        //  ajax... begin
        $.ajax({
            type: "POST",
            url: '/flow/region/currentarea',
            success: function(msg){
                if( msg.code == 0 )
                {
                    var msgData =  msg.data;
                    var id_prov = msgData.province_id;
                    var id_city = msgData.city_id;
                    var id_county = msgData.county_id;
                    var regionArr = [id_prov,id_city,id_county]
                    $(".store-select .text").html( msgData.province + msgData.city.slice(0,4) + msgData.county.slice(0,4)   );
                    $(".content .mt").children().show().eq(2).addClass("curr").siblings().removeClass("curr");
                    $(".content .tab-content").hide().eq(2).show();
                    $(".mt li").eq(0).find("em").html( msgData.province );
                    $(".mt li").eq(1).find("em").html( msgData.city.slice(0,4) );
                    $(".mt li").eq(2).find("em").html( msgData.county.slice(0,4) );
                    regionFun._join_regsion(   region , $("#stock_province_item")  , id_prov )  ;
                    regionFun._join_regsion(   region[ id_prov ].children , $("#stock_city_item") , id_city ) ;
                    regionFun._join_regsion(   region[ id_prov ].children[ id_city ].children , $("#stock_area_item") , id_county) ;
                    regionFun.ajaxStock( regionArr ); //初始化查库存
                }
                else{
                    alert( msg.msg )
                }
            },
            dataType:'json'
        });

        //  ajax...  end
    }
};
//默认地区初始化
regionFun.init();
// goods_color_style_new
$("#size").on('click','span',function(){
    if($(this).hasClass("err-info") == true || $(this).hasClass("nogoods") == true){
        return false;
    }
    
    $(this).addClass("select").siblings().removeClass("select");
    var regionArr = [];
    $(".tab-content .curr").each(function(){
        regionArr.push( $(this).attr("data-value") );
    });
    $(".size").removeClass('err');
    $("#size .err-info").hide();
    //查库存
    regionFun.ajaxStock( regionArr);
});

//********************* 配送区域 end *********************
/*推荐*/
$(document).ready(function(){
    var goods_id = $("#goods_id").val();
    $.ajax({
        url: '/flow/goods/GoodsColl',
        type: 'GET',
        data:'goods_id='+goods_id,
        async:false,
        dataType: 'json',
        success: function(data){
                if(data){
                    $("#concerns").addClass('already');
                    $("#concernsinfo").text('已关注');
                    $("#concerns").mouseover(function(){
                        $("#concerns-tip").fadeIn();
                    });
                    $("#concernsinfo").mouseout(function(){
                       $("#concerns-tip").fadeOut(); 
                    });   
                } 
        }
    });

    $.ajax({
        url: '/flow/goods/UserInfos',
        type: 'POST',
        dataType: 'json',
        success: function(data){
            if(data && data.code != 0){
                $(".right-user-name").html('<i>'+data.user_name+'</i>，你好！');
                $(".slide-pic img").attr('src',data.photo);
                $(".slide-login-btn").hide();
                $(".slide-userinfo").show();
            }else{
                $(".slide-login-btn").show();
                $(".slide-userinfo").hide();
            }
        }
    });

});
/*修改分享效果*/
$(document).ready(function(){
	    $('#bdshare').mouseover(function(){
							$('#bdshare_l').css('height','0');
							$('#bdshare_l').css('width','0');
							$('#bdshare_l').html('');
							})
                        

	})

/*选择城市*/
$(document).ready(function(){   

    var state=true;
    $(".everycs span a").click(function(){

      $(".bian").children("b").text($(this).text());
      
       state=false;
    });
    $(".everycs").click(function(){
      $(".bian").click(function(){
          return false;
      });
    });

});


function num_amount(){
    $.ajax({
        url: '/ajax_goods_cart.php',
        type: 'POST',
        data:'cate_id='+new Date().getTime(),
        dataType: 'text',
        error: function(){
            alert('Error loading XML document');
        },
        success: function(data){
            document.getElementById("cart_t").innerHTML = data;
            cat_numbe = parseInt($("#cat_number").html());
            numbe = parseInt($("#number").val());
            $("#cat_number").html(cat_numbe + numbe);
        }
    });
}



function getCookie(objName)
{
    //获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName) return unescape(temp[1]);
    }
}

function setCookie(objName,value)
{
    var exp = new Date();
    exp.setTime(exp.getTime() + 30*24*60*60*1000); //设置cookie的期限
    document.cookie = objName+"="+escape(value)+";path=/;expires"+"="+exp.toGMTString();//创建cookie
}
/* *
 * 添加商品到收藏夹
 */
function collect(goodsId)
{
    $.ajax({
        url: '/user.php?act=collect',
        type: 'GET',
        data:'id='+goodsId,
        async:false,
        dataType: 'json',
        success: function(data){
            if(data.message == '由于您还没有登录，因此您还不能使用该功能。'){
                location.href = '/user.php';
            }else{
                $("#concerns").addClass('already');
                $("#concernsinfo").text('已关注');
                $("#concerns-tip").fadeIn().delay(1500).fadeOut();

                $("#concerns").mouseover(function(){
                    $("#concerns-tip").fadeIn();
                });
                $("#concernsinfo").mouseout(function(){
                   $("#concerns-tip").fadeOut(); 
                });                
            }
        }
    });
}
/* *


/*登录信息结束        wh      end*/