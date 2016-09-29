(function ($, win, doc) {
    $(function () {
        /**--
         * 以下为方法（对象/插件）定义区域，用于给页面定义各种功能实现（方法实现）
         --**/
        /* ------------------------------------------------------ */
        /**
         * [评论模块功能]
         * @return 一个对象，包含了评论模块需要的方法
         * {
         *      adornInput [
         *          @params:
         *              [fn]:   @type：      [function]
         *                      @return：    [void]
         *                      @remark：    [这是一个回调函数，作用是点击单选/多选元素时需要触发的方法]
         *          @return [void]
         *          @remark [这个方法用于美化单选/多选元素，并在点击他们时执行一个方法，比如请求列表，传入的“@params”是一个函数，需要在调用方法时传入]
         *      ]
         *      lensImg [
         *          @params： [void]
         *          @return： [void]
         *          @remark： [这个方法用于评论中有晒图的情况下点击小图出大图及收回大图]
         *      ]
         * }
         */
        var commentPlugins = (function () {
            var _adorn = {
                    '__elemsInput': $('#comments').find('input'),
                    '__elemsInputArr': [],
                    '__eachInput': function () {
                        var that = this;
                        that.__elemsInput.each(function () {
                            if ($.inArray($(this), that.__elemsInputArr) == -1) {
                                that.__elemsInputArr.push($(this));
                            }
                        });
                        return this.__elemsInputArr;
                    },
                    '__init': function (fn) {
                        var input = $(this),
                            label = $('label[for=' + input.attr('id') + ']'),
                            type = input.attr('type');
                        input.add(label).wrapAll('<div class="custom-' + type + '"></div>');
                        input.on('updateState', function () {
                            input.is(':checked') ? label.addClass('checked') : label.removeClass('checked');
                        })
                        input.trigger('updateState');
                        input.on('click', function () {
                            $('input[name=' + $(this).attr('name') + ']').trigger('updateState');
                            if (typeof fn == 'function') {
                                fn.call(this);
                            }
                        });
                    }
                },
                _lensImg = {
                    '__elemsLi': $('.comment-list .descrption li'),
                    '__init': function () {
                        var that = this;
                       $('.comment-list .descrption li').live('click', function () {
                            var li = $(this), // 点击的元素
                                ul = li.parent(), // ul元素
                                root = ul.parent(), // 评论容器
                                bigImgBox = ul.parent().children('.bigImg'), // 展示大图box
                                img = li.find('img').attr('data-src'); // 大图地址
                            if (li.hasClass('active')) {
                                li.removeClass('active');
                                if (bigImgBox && bigImgBox.length > 0) {
                                    bigImgBox.remove();
                                }
                            } else {
                                li.addClass('active').siblings().removeClass('active');
                                if (bigImgBox && bigImgBox.length > 0) {
                                    bigImgBox.remove();
                                }
                                var bigImgObj = $('<div class="bigImg"><img src="' + img + '" /></div>')
                                ul.after(bigImgObj);
                                var iHeight = bigImgBox.find('img').height();
                                var iWidht = bigImgBox.find('img').width();
                                if (iWidht > 406) {
                                    iHeight = iHeight * 406 / iWidht;
                                    bigImgBox.find('img').css('width', '406px');
                                    bigImgBox.find('img').css('height', iHeight + 'px');
                                }
                            }
                            root.delegate('.bigImg', 'click', function () {
                                $(this).remove();
                                li.removeClass('active');
                            });
                        })
                    }
                };
            return {
                adornInput: function () {
                    var obj = _adorn.__eachInput();
                    var fn = [].shift.call(arguments); // 获取回调函数
                    for (var i = 0; i < obj.length; i++) {
                        _adorn.__init.call(obj[i], fn);
                    }
                },
                lensImg: function () {
                    _lensImg.__init();
                }
            }
        })();
        /**
         * [页面提示功能]
         * @return 一个对象，包含鼠标经过提示操作，点击提示操作，及点击请求后提示操作
         * {
         *      hoverShow [
         *          @params:
         *              [oTarget]:   @type：      [object]
         *                           @remark：    [jquery对象，代表源元素]
         *              [target]:    @type：      [object]
         *                           @remark：    [jquery对象，代表目标元素]
         *          @return: [void]
         *          @remark: [这是鼠标经过时出现提示的方法，目前只支持简单的经过出现移开消失，不支持回调及delay显示消失]
         *      ]
         *      clickShow [
         *          @params:
         *              [oTarget]:   @type：         [object]
         *                           @remark：       [jquery对象，代表源元素]
         *              [target]:    @type：         [object]
         *                           @remark：       [jquery对象，代表目标元素]
         *              [fixed]:     @type：         [boolean]
         *                           @remark：       [这是一个修饰参数，为true则提示元素进行固定定位，为false，则按照相应css设置的定位]
         *                  [mask]:      @type：         [boolean]
         *                           @remark：       [这是一个修饰参数，为true则在提示元素时显示整个页面的遮罩，点击遮罩或提示元素内的关闭按钮进行关闭，常用于居中弹层]
         *              [fn]:        @type：         [function]
         *                           @return：       [void]
         *                           @remark：       [默认false，这是一个回调函数，如果确实是一个函数，则先执行它，待该函数返回true（不管什么必须返回true/false）时才进行提示操作]
         *              [timeout]:   @type：         [number（int）]
         *                           @remark：       [默认false，这是一个整数值，当有并且为整数时，将启用delay显示timeout一段时间后消失提示]
         *          @return: [void]
         *          @remark: [这是鼠标点击时出现提示的方法，支持显示前调用回调函数及delay显示消失]
         *      ]
         * }
         * @remark 只有点击操作才有可能出现遮罩mask元素和回调函数及daley显示法
         * */
        var tipPlugins = (function () {
            var _hoverShow = {
                    '__init': function (oTarget, target) {
                        oTarget = typeof oTarget == 'obj' ? oTarget : $(oTarget);
                        target = typeof target == 'obj' ? target : $(target);
                        oTarget.hover(function () {
                            target.fadeIn();
                        }, function () {
                            target.fadeOut();
                        })
                    }
                },
                _clickShow = {
                    '__mask': function (target, mask) {
                        if (mask) {
                            var $mask = $('#mask');
                            $mask.css({
                                height: $(doc).height()
                            }).fadeIn().click(function () {
                                $mask.fadeOut();
                                target.fadeOut();
                            })
                            if (target.find('.close') && target.find('.close').length > 0) {
                                target.find('.close').click(function () {
                                    $mask.fadeOut();
                                    target.fadeOut();
                                })
                            }
                        }
                    },
                    '__position': function (target, fixed) {
                        if (fixed) {
                            target.css({
                                left: ($('body').width() - target.width()) / 2 - 20 + 'px',
                                top: ($(win).height() - target.height()) / 2 + $(win).scrollTop() + 'px'
                            });
                        }
                    },
                    '__init': function (oTarget, target, fixed, mask, fn, timeout) {
                        var that = this;
                        target = typeof target == 'obj' ? target : $(target);
                        oTarget = typeof oTarget == 'obj' ? oTarget : $(oTarget);
                        oTarget.on('click', function () {
                            if (typeof fn == 'function') {
                                if (fn.call(oTarget)) {
                                    that.__mask(target, mask);
                                    that.__position(target, fixed);
                                    if (typeof timeout == 'number') {
                                        target.fadeIn().delay(timeout).fadeOut();
                                    } else {
                                        target.fadeIn();
                                    }
                                }
                            } else {
                                that.__mask(target, mask);
                                that.__position(target, fixed);
                                if (typeof timeout == 'number') {
                                    target.fadeIn().delay(timeout).fadeOut();
                                } else {
                                    target.fadeIn();
                                }
                            }
                        })
                    }
                }
            return {
                'hoverShow': function (oTarget, target) {
                    _hoverShow.__init(oTarget, target);
                },
                'clickShow': function (oTarget, target, fixed, mask, fn, timeout) {
                    _clickShow.__init(oTarget, target, fixed, mask, fn, timeout);
                }
            }
        })();
        /**
         * [gallery/放大镜]
         * @return 一个匿名函数
         *      @type：  [function]
         *      @remark：[执行放大镜及左右切换点击图片等事件]
         * @remark 这个方法封装了大图放大镜、左右切换图片、点击变换图片等操作
         * */
        var galleryPlugins = (function () {
            var _elem = $('.jqzoom-scroll'),
                _jqzoom = $('.jqzoom'),
                _gallery = {
                    '__prev': _elem.find('.prev'),
                    '__next': _elem.find('.next'),
                    '__tempLength': 0, //临时变量,当前移动的长度
                    '__viewNum': 5, //设置每次显示图片的个数量
                    '__moveNum': 1, //每次移动的数量
                    '__moveTime': 300, //移动速度,毫秒
                    '__scrollDiv': _elem.find('.items ul'), //进行移动动画的容器
                    '__scrollItems': _elem.find('.items ul li'), //移动容器里的集合
                    '__picItems': _elem.find('.items ul li img'), // 里面的图片
                    //计算每次移动的长度
                    '__moveLength': function () {
                        return (this.__scrollItems.eq(0).width() + 12) * this.__moveNum;
                    },
                    //计算总长度,总个数*单个长度
                    __countLength: function () {
                        return (this.__scrollItems.length - this.__viewNum) * (this.__scrollItems.eq(0).width() + 12);
                    },
                    // 运行
                    '__init': function () {
                        var that = this;
                        _jqzoom.jqueryzoom({
                            'xzoom': 350,
                            'yzoom': 350,
                            'offset': 10,
                            'position': 'right'
                        });
                        // 点击图片
                        $(that.__scrollItems).click(function () {
                            $('.sh-goods-gallery #preview .jqzoom img').attr('src', $(this).find('img').attr('src'));
                            $('.sh-goods-gallery #preview .jqzoom img').attr('jqimg', $(this).find('img').attr('bimg'));
                            $('.lens a').attr('href', $(this).find('img').attr('bimg'));
                            $(this).addClass('active').siblings().removeClass('active');
                        })
                        //下一张
                        $(that.__next).on('click', function () {
                            if (that.__tempLength < that.__countLength()) {
                                if ((that.__countLength() - that.__tempLength) > that.__moveLength()) {
                                    $(that.__scrollDiv).animate({
                                        left: '-=' + that.__moveLength() + 'px'
                                    }, that.__moveTime);
                                    that.__tempLength += that.__moveLength();
                                } else {
                                    $(that.__scrollDiv).animate({
                                        left: '-=' + (that.__countLength() - that.__tempLength) + 'px'
                                    }, that.__moveTime);
                                    that.__tempLength += (that.__countLength() - that.__tempLength);
                                }
                                if (that.__tempLength > 0) {
                                    $(that.__prev).removeClass('disabled')
                                }
                                if (that.__tempLength >= that.__countLength()) {
                                    $(that.__next).addClass('disabled')
                                }
                            }
                        });
                        //上一张
                        $(that.__prev).on('click', function () {
                            if (that.__tempLength > 0) {
                                if (that.__tempLength > that.__moveLength()) {
                                    $(that.__scrollDiv).animate({
                                        left: '+=' + that.__moveLength() + 'px'
                                    }, that.__moveTime);
                                    that.__tempLength -= that.__moveLength();
                                } else {
                                    $(that.__scrollDiv).animate({
                                        left: '+=' + that.__tempLength + 'px'
                                    }, that.__moveTime);
                                    that.__tempLength = 0;
                                }
                            }
                            if (that.__tempLength <= 0) {
                                $(that.__prev).addClass('disabled')
                            }
                            if (that.__tempLength < that.__countLength()) {
                                $(that.__next).removeClass('disabled')
                            }
                        });
                    }
                };
            return function () {
                _gallery.__init();
            }
        })();
        /**
         * [折叠事件]
         * @return 一个匿名函数
         *      @type：  [function]
         *      @params：[
         *          arguments: @type：[类数组]
         *                     @remark：[目标事件源]
         *      ]
         *      @remark：[执行放大镜及左右切换点击图片等事件]
         * @remark 这个方法封装了大图放大镜、左右切换图片、点击变换图片等操作
         * */
        var togglePlugins = (function () {
            var _toggle = function (elems) {
                $(doc).on('click', elems, function () {
                    if ($(this).parent().hasClass('hide')) {
                        $(this).parent().removeClass('hide').addClass('show');
                        $(this).children('span').text('收起').addClass('show').next("i").addClass('show').removeClass('hide')
                    } else {
                        $(this).parent().removeClass('show').addClass('hide');
                        $(this).children('span').text('查看更多').removeClass('show').next('i').removeClass('show').addClass('hide')
                    }
                })
            };
            return function () {
                var args = Array.prototype.join.call(arguments, ',');
                _toggle(args);
            }
        })();
        /**
         * [滚动事件]
         * @return 一个匿名函数
         *      @type：  [function]
         *      @remark：[始终进行计算]
         * @remark 这个方法当滚动事件触发时计算相应元素距离顶部的位置进行定位
         * */
        var scrollPlugs = (function () {
            var _elem = $('.sh-goods-details .tab'), // 对象元素
                _win = $(win), // 窗口对象
                _sc = $(doc), // 文档对象
                _parentHeight = $('.sh-goods-details').offset().top,
                _scroll = {
                    '__curScrollTop': _sc.scrollTop(), // 当前滚动条的位置
                    '__calcParentHeight': function () {
                        if (_sc.scrollTop() >= _parentHeight) {
                            _elem.addClass('fixed-bar');

                            var number = $("#goodsNumber #goodsNumberInput").val();
                            $("#ext_num").html("数量：" + number);
                            $("#ext_price").html("<i>￥</i>" + number*$("#rel_price").attr('alt'));
                            $('#details').css('margin-top','43px');
                            $(".sh-goods-details .ext").show();
                        } else {
                            _elem.removeClass('fixed-bar');
                            $('#details').css('margin-top','0');
                            $(".sh-goods-details .ext").hide();
                        }
                        if (_sc.scrollTop() >= $('#details').offset().top - 50) {
                            $("[data-scorll=details]").addClass('active').siblings().removeClass('active');
                        }
                        if (_sc.scrollTop() >= $('#comments').offset().top - 50) {
                            $("[data-scorll=comments]").addClass('active').siblings().removeClass('active');
                        }
                        if (_sc.scrollTop() >= $('#services').offset().top - 50) {
                            $("[data-scorll=services]").addClass('active').siblings().removeClass('active');
                        }
                    },
                    '__init': function () {
                        var that = this;
                        $('.tab-select a').on('click', function () {
                            $(this).addClass('active').siblings().removeClass('active');
                        });
                        _win.scroll(function () {
                            that.__calcParentHeight()
                        });
                    }
                };
            return function () {
                _scroll.__init();
            }
        })();
        /**
         * [商品数量]
         * @return 一个匿名函数
         *      @type：  [function]
         *      @remark：[--]
         * @remark 这个方法封装了数量选择的输入，加/减按钮事件验证等
         * */
        var goodsNumberPlugs = (function () {
            var _goodsNumber = {
                '__addBtn': $('#goodsNumber #addBtn'),
                '__lessBtn': $('#goodsNumber #lessBtn'),
                '__goodsNumberInput': $('#goodsNumber #goodsNumberInput'),
                '__goodsNumberDiv': $('#goodsNumber'),
                '__re': /^[1-9]*[1-9][0-9]*$/, // 正整数
                '__init': function () {
                    var that = this,
                        hideErr = hideErrPlugs,
                        showErr = showErrPlugs;
                    that.__goodsNumberInput.val(1);
                    that.__lessBtn.addClass('limit');
                    hideErr(that.__goodsNumberDiv, 'errNum');
                    that.__goodsNumberInput.on('keyup', function () {
                        var re = that.__re;
                        hideErr(that.__goodsNumberDiv, 'errNum');
                        if (parseInt($(this).val()) <= 0) {
                            $(this).val(1);
                            showErr(that.__goodsNumberDiv, '最少购买1件', 'errNum', false, true);
                        }
                        if (!(re.test($(this).val()))) {
                            showErr(that.__goodsNumberDiv, '数量必须是整数', 'errNum', false, true);
                            $(this).val(1)
                        } else if (parseInt($(this).val()) > 6) {
                            $(this).val(6);
                            showErr(that.__goodsNumberDiv, '限购6件', 'errNum', false, true);
                        }
                        if (parseInt($(this).val()) >= 6) {
                            that.__addBtn.addClass('limit');
                        } else {
                            that.__addBtn.removeClass('limit');
                        }
                        if (parseInt($(this).val()) > 1) {
                            that.__lessBtn.removeClass('limit');
                        } else {
                            that.__lessBtn.addClass('limit');
                        }
                        //购买数量变化时判断库存
                        var regionArr = [];
                        $(".tab-content .curr").each(function(){
                            regionArr.push( $(this).attr("data-value") );
                        });
                        //查库存
                        regionFun.ajaxStock( regionArr);

                    });
                    that.__addBtn.on('click', function () {
                        var goodsNumber = parseInt($('#goodsNumber #goodsNumberInput').val()); // 获取文本框中的商品数量
                        hideErr(that.__goodsNumberDiv, 'errNum');
                        if (goodsNumber <= 5) {

                            if (goodsNumber == 1) {
                                that.__lessBtn.removeClass('limit');
                            }
                            goodsNumber = goodsNumber + 1;
                            that.__goodsNumberInput.val(goodsNumber);
                        } else {
                            if (goodsNumber == 6) {
                                $(this).addClass('limit');
                            }
                            showErr(that.__goodsNumberDiv, '限购6件', 'errNum', false, true);
                        }

                        //购买数量变化时判断库存
                        var regionArr = [];
                        $(".tab-content .curr").each(function(){
                            regionArr.push( $(this).attr("data-value") );
                        });
                        if($("#addBtn").hasClass('limit') == true){
                            return false;
                        }
                        //查库存
                        regionFun.ajaxStock( regionArr);
                    });
                    that.__lessBtn.on('click', function () {
                        var goodsNumber = parseInt($('#goodsNumber #goodsNumberInput').val());
                        hideErr(that.__goodsNumberDiv, 'errNum');
                        if (goodsNumber >= 2) {
                            if (goodsNumber == 2) {
                                $(this).addClass('limit');
                            }
                            if (goodsNumber == 6) {
                                that.__addBtn.removeClass('limit');
                            }
                            goodsNumber = goodsNumber - 1;
                            that.__goodsNumberInput.val(goodsNumber);
                        } else {
                            showErr(that.__goodsNumberDiv, '最少购买1件', 'errNum', false, true);
                        }
                        //购买数量变化时判断库存
                        var regionArr = [];
                        $(".tab-content .curr").each(function(){
                            regionArr.push( $(this).attr("data-value") );
                        });
                        //查库存
                        regionFun.ajaxStock( regionArr);
                    });
                }
            }
            return function () {
                _goodsNumber.__init();
            }
        })();
        /**
         * [显示错误提示]
         * @return 一个匿名函数
         *      @type：  [function]
         *      @params：[
         *                  [targetElem]:   @type       [object]
         *                                  @remark     [一个jQuery元素在那个元素的最后加入错误元素]
         *                  [msg]:          @type       [string]
         *                                  @remark     [错误信息]
         *                  [msgId]:        @type       [string]
         *                                  @remark     [错误元素的ID]
         *                  [rootErrShow]:  @type       [boolean]
         *                                  @remark     [是否在错误元素的根元素标识'err'的class]
         *                  [timeout]:      @type       [boolean]
         *                                  @remark     [是否启用daley模式显示1500毫秒后消失]
         *      ]
         *      @remark：[注意参数]
         * @remark 这个方法封装了错误提示显示操作
         * */
        var showErrPlugs = (function () {
            var __init = function (targetElem, msg, msgId, rootErrShow, timeout) {
                var msgBoxId = $("#" + msgId);
                if (msgBoxId.length == 0) {
                    var msgObj = $('<span class="err-info" id="' + msgId + '"><i></i>' + msg + '</span>');
                    if (typeof timeout == 'boolean' && timeout) {
                        targetElem.append(msgObj);
                        if (rootErrShow) {
                            var root = targetElem.parent();
                            root.addClass('err');
                        }
                        msgObj.hide();
                        msgObj.fadeIn().delay(1500).fadeOut();
                    } else {
                        targetElem.append(msgObj);
                        if (rootErrShow) {
                            var root = targetElem.parent();
                            root.addClass('err');
                        }
                        msgObj.hide();
                        msgObj.fadeIn();
                    }
                }
            }
            return function (targetElem, msg, msgId, rootErrShow, timeout) {
                __init(targetElem, msg, msgId, rootErrShow, timeout);
            }
        })();
        /**
         * [隐藏错误提示]
         * @return 一个匿名函数
         *      @type：  [function]
         *      @params：[
         *                  [targetElem]:   @type       [object]
         *                                  @remark     [一个jQuery元素在那个元素的最后加入错误元素]
         *                  [msgId]:        @type       [string]
         *                                  @remark     [错误元素的ID]
         *      ]
         *      @remark：[注意参数]
         * @remark 这个方法封装了错误提示隐藏操作
         * */
        var hideErrPlugs = (function () {
            var __init = function (targetElem, msgId) {
                var root = targetElem.parent();
                targetElem.children('#' + msgId).remove();
                if (root.hasClass('err')) {
                    root.removeClass('err');
                }
            }
            return function (targetElem, msgId) {
                __init(targetElem, msgId);
            }
        })();
        /**
         * [添加购物车]
         * @return 一个匿名函数
         *      @type：  [function]
         *      @params：[
         *                  [beforeFun]:    @type       [function]
         *                                  @remark     [一个函数，用于在动画（加入购物车操作）执行前运行的函数，一般用于验证]
         *                  [ajaxSome]:     @type       [function]
         *                                  @remark     [一个函数，用于在动画（加入购物车操作）执行前验证运行后运行的函数，一般用于发送Ajax请求]
         *                  [successFun]:   @type       [function]
         *                                  @remark     [一个函数，用于在动画（加入购物车操作）执行后运行的函数，一般用于更新购物车中商品的数量]
         *      ]
         *      @remark：[注意参数是两个回调函数]
         * @remark 这个方法封装了添加购物车操作
         * */
        var addCartPlugs = (function(){
            var _addCart = {
                '__addCartBtn':'[data-name="addCartTrigger"]',
                '__addCartBtnObj': $('[data-name="addCartTrigger"]'),
                '__cartRight': $('#_AD_right_shoppingcart'),//右侧购物车图标
                '__cartNum': $('#_AD_right_shoppingcart').find('.cart-num'),//购物车中的数量
                '__addCartBtnStatus': $('[data-name="addCartTrigger"]').attr('data-trigger-status'),
                '__addCartBefore': function (beforeFun) { // 动画完成执行执行前的函数，主要作用是验证
                    if (typeof beforeFun == 'function') {
                        if (beforeFun()) { // 将里面的this或$(this)指向触发扩展的对象
                            return true;
                        } else {
                            return false;
                        }
                    }
                    return true;
                },
                '__ajaxSome': function (ajaxFun) { // 动画完成执行执行前的函数，主要作用是验证
                    if($(".sh-shopping-cart").hasClass('disabled') == true || $(".sale-out").hasClass('out') == true){
                        return false;
                    }
                    if (typeof ajaxFun == 'function') {
                        if (ajaxFun()) { // 将里面的this或$(this)指向触发扩展的对象
                            return true;
                        } else {
                            return false;
                        }
                    }
                    return true;
                },
                '__addCartSuccess': function (successFun) { // 动画完成执行callBack函数
                    if (typeof successFun == 'function') {
                        successFun();
                    }
                },
                '__createImg': function () {
                    var addCartBtnOffset = $(this).offset(),
                        addCartBtnOffsetTop = addCartBtnOffset.top + 52,
                        addCartBtnOffsetLeft = addCartBtnOffset.left + 200;
                    var thumSrc = $('<img class="fly-img" src="' + $("li.active").find("img").attr('src') + '">').css({
                        'top': addCartBtnOffsetTop - 60,
                        'left': addCartBtnOffsetLeft
                    }).hide()
                    $(doc.body).append(thumSrc);
                    return thumSrc;
                },
                '__init':function(beforeFun,ajaxSome,successFun){
                    var that = this;
                    if (that.__addCartBtnStatus == 'open') {
                        $(doc).on('click',that.__addCartBtn,function(){
                            if (that.__addCartBefore(beforeFun)) {
                                if(that.__ajaxSome(ajaxSome)){
                                    var scrollFunc = function (e) { // 这里为了防止加入购物车动画开始时，滚动鼠标而做的限制
                                        e = e || window.event;
                                        if (e && e.preventDefault) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        } else {
                                            e.returnvalue = false;
                                            return false;
                                        }
                                    };
                                    $(doc.body).bind('mousewheel', function (e) {
                                        if (scrollFunc) {
                                            scrollFunc(e);
                                        }
                                    });
                                    $(doc.body).bind('DOMMouseScroll', function (e) {
                                        if (scrollFunc) {
                                            scrollFunc(e);
                                        }
                                    });
                                    var thumSrc = that.__createImg.call(this).show();
                                    thumSrc.animate({
                                        'top': that.__cartRight.offset().top - 20,
                                        'left': that.__cartRight.offset().left + 8,
                                        'width': 20,
                                        'height': 20,
                                        'opacity': .5
                                    }, 'slow').animate({
                                        'top': that.__cartRight.offset().top + 20,
                                        'left': that.__cartRight.offset().left + 16,
                                        'z-index': 1,
                                        'width': 5,
                                        'height': 5,
                                        'opacity': 0
                                    }, 'slow', function () {
                                        thumSrc.remove();
                                        scrollFunc = null;
                                        that.__addCartSuccess(successFun);
                                    });
                                }
                            }
                        })
                    }
                }
            }
            return function(beforeFun,ajaxSome,successFun){
                _addCart.__init(beforeFun,ajaxSome,successFun);
            }
        })();
        /* ------------------------------------------------------ */
        /**--
         * 以下为方法调用区，及页面运行时需要调用的方法
         --**/
        /* ------------------------------------------------------ */
        /* 商品评论 Start */
        var comments = commentPlugins,
            /**
             * [商品评论触发函数]
             * @remark [当点击评论时，请求评论列表及载入评论模板在这里操作]
             * */
            commentsFun = function(){
                // ...TODO Ajax 请求一下列表，并载入模板
                // ...TODO 以下是测试用语句而已
                var id = $(this).attr('id');
                var goods_id = $("#goods_id").val();
                var grades = ''; //评论等级
                var ifpic = false; //是否有晒图
                               
                switch(id){
                    case 'all':
                        //alert('请求“全部评论”列表……，载入模板');
                        grades = 'all';
                        break;
                    case 'good':
                        //alert('请求“好评”列表……，载入模板');
                        grades = 'good';
                        break;
                    case 'general':
                        grades = 'general';
                        break;
                    case 'bad':
                        grades = 'bad';
                        break;
                    case 'is-show-pic':
                        //alert('请求“有晒图”列表……，载入模板');
                        grades = $('input[name="comment"]:checked').val();
                        break;
                };

                if($("#is-show-pic").attr('checked') == 'checked'){
                    ifpic = true;
                }
                //alert('goods_id='+goods_id+'&grade='+grades+'&ifpic='+ifpic);
                $.ajax({
                    url: '/flow/goods/GoodsComment',
                    type: 'POST',
                    data:'goods_id='+goods_id+'&grade='+grades+'&ifpic='+ifpic,
                    dataType: 'json',
                    success: function(data){
                        $("#goods_comment").html(data.list);
                        $("#flcomments").html("("+data.count.all+")");
                        $("#allifno").html("全部评论("+data.count.all+")");
                        $("#goodifno").html("好评("+data.count.good+")");
                        $("#genifno").html("中评("+data.count.general+")");
                        $("#badifno").html("差评("+data.count.bad+")");
                        $(".comment-page").html(data.pages);
                    }
                });             
            };
        comments.adornInput(commentsFun)
        comments.lensImg();
        /* 商品评论 End */
        /* ------------------------------------------------------ */
        /* tip提示 Start */
        var tip = tipPlugins,
            /**
             * [商品评论触发函数]
             * @return [boolean]
             * @remark [必须有返回值，且返回值必须是boolean，当点击评论时，请求评论列表及载入评论模板在这里操作]
             * */
            concernsFun = function(){
                // ...TODO Ajax 请求一下进行关注
                // ...TODO 以下是测试用语句而已
                if(!$(this).hasClass('already')){
                    alert('Ajax正在请求后台进行关注');
                    $(this).children('span').text('已关注');
                    $(this).addClass('already');
                    return true;
                }else{
                    return false;
                }
            };
        tip.hoverShow('#taxation', '#taxation-tip')
        tip.clickShow('#show-size-table', '#size-box', true, true, false, false);
        //tip.clickShow('#concerns', '#concerns-tip', false, false, concernsFun, 1500);
        /* tip提示 End */
        /* ------------------------------------------------------ */
        /* gallery Start */
        var gallery = galleryPlugins;
        gallery();
        /* gallery End */
        /* ------------------------------------------------------ */
        /* toggle Start */
        var toggle = togglePlugins;
        toggle('#more_brand', '#more_tag', '#more_guide');
        /* toggle End */
        /* ------------------------------------------------------ */
        /* scroll Start */
        var scroll = scrollPlugs;
        scroll();
        /* scroll End */
        /* ------------------------------------------------------ */
        /* 商品数量 Start */
        var goodsNumber = goodsNumberPlugs;
        goodsNumber();
        /* 商品数量 End */
        /* ------------------------------------------------------ */
        /* 添加购物车 Start */
        var addCart = addCartPlugs,
            /**
             * [添加购物车前运行的函数]
             * @return [boolean]
             * @remark [必须有返回值，且返回值必须是boolean，进行验证]
             * */
            addCartBeforeFun = function(){
                // ...TODO 验证一下所选项是否符合要求
                // ...TODO 以下是测试用语句而已
                //alert('这里验证一下所选项是否符合要求');
                var goods_id = parseInt($("#goods_id").val());
                var goodsNumber = parseInt($('#goodsNumberInput').val());

                //验证是否选中尺码
                var curSizeId = '';
                $.each($("#size span"),function(){
                    if($(this).hasClass('select')){  
                        curSizeId = $(this).attr('id');
                    }
                });

                if($(".sh-shopping-cart").hasClass('disabled') == true || $(".sale-out").hasClass('out') == true){
                    return false;
                }
   
                //尺码
                if(curSizeId == ''){
                    $(".size").addClass('err');
                    $("#size span.err-info").remove();
                    var tipStr = $(".size dt").text();
                    tipStr = tipStr ? $.trim(tipStr) : '尺码';
                    $("#size").append('<span class="err-info"><i></i>请选择商品'+tipStr+'！</span>');
                    $(document.documentElement).animate({scrollTop: 300}, 1000); 
                    return false;
                }

                if(goods_id && goodsNumber){
                    return true;
                }else{
                    return false;
                }
            },
            /**
             * [添加购物车运行中的函数（Ajax）]
             * @return [boolean]
             * @remark [必须有返回值，且返回值必须是boolean，用于发送Ajax]
             * */
            addCartAjaxSomeFun = function(){
                // ...TODO 发送加入购物车Ajax
                // ...TODO 以下是测试用语句而已
                //alert('这里发送加入购物车Ajax');
                var goods_id = parseInt($("#goods_id").val());
                var goods_number = parseInt($('#goodsNumberInput').val());
                var product_id = '';
                $("#size span").each(function(){
                            if($(this).hasClass('select') == true){
                                product_id = $(this).attr('pid');
                            }
                });
                var goods = {'quick':1,'goods_id':goods_id,'product_id':product_id,'number':goods_number};
                goods = JSON.stringify(goods);
                var flg = false;
                $.ajax({
                    url: '/flow/cart/addProduct',
                    type: 'POST',
                    data:'goods='+goods+'&is_fast_buy=0',
                    dataType: 'json',
                    async:false,
                    success: function(data){
                       if(data.code == 0){
                            flg = true;
                       }else{                           
                            return false;
                       }
                    }
                });
                return flg;
            },
            /**
             * [添加购物车一切操作完成后运行的函数]
             * @return [void]
             * @remark [更新下购物车数量]
             * */
            addCartSuccessFun = function(){
                // ...TODO 更新下购物车数量
                // ...TODO 以下是测试用语句而已
                //alert('这里更新下购物车数量');
                var rightCartNum = parseInt($('.cart-num').text()),
                    rightCart = $('.cart-num'),
                    topCartNum = parseInt($('.cartnum').text()),
                    topCart = $('.cartnum'),
                    goodsNumber = parseInt($('#goodsNumberInput').val());
                rightCart.text(rightCartNum + goodsNumber);
                topCart.text(topCartNum + goodsNumber);
            };
        addCart(addCartBeforeFun,addCartAjaxSomeFun,addCartSuccessFun);
        /* 添加购物车 End */
        /* ------------------------------------------------------ */
    })
})(jQuery, window, document)
