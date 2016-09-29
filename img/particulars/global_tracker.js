/**
 * 17ugo统计
 * @desc 请勿直接做投放使用
 */

/**
 * 统计方法
 * @param document dom
 * @param [k:v] options
 * @returns null
 */
var UgoTracker = {
    debug: false,
    init: function () {
        this.track(window, 'pv'); //记录当前页面
        this.initItems();
    },
    /**
     * 初始化所有a ,area标签的点击事件
     * @returns {undefined}
     */
    initItems: function () {
        $(document).ready(function () {
            var eventType = UgoTracker.helper.isMobile() ? 'mousedown' : 'click';
            if (UgoTracker.debug == true) {
                $('a,area').each(function () {
                    var href = $(this).attr('href');
                    $(this).attr('href', 'javascript:void(0)').attr('link', href);
                });
            }
            $('body').delegate('a,area', eventType, function (e) {
                var href = $(this).attr('href') || $(this).attr('link');
                if (!href || href.indexOf('javascript:') === 0 || href.indexOf('#') === 0) {
                    return;
                }
                // 捕捉页面坐标，x，y，scrollTop
                var pagex = e.pageX;                               // X坐标
                var pagey = e.pageY;                               // Y坐标
                var scrolltop = $(document).scrollTop(); // 滚动条位置
                // 父节点ID，当前节点ID
                var parents_id = null;                                // 拥有检测ID的父节点ID
                var current_id = $(this).attr("id") ? $(this).attr("id") : "";   // 当前节点ID
                $(this).parents().each(function (i, d) {
                    if ($(d).attr("id") != undefined)
                    {
                        if ($(d).attr("id").indexOf("__AD_") >= 0)
                        {
                            parents_id = $(d).attr("id");
                        }
                    }
                })
                var clickInfo = {
                    "pagex": pagex,
                    "pagey": pagey,
                    "scrolltop": scrolltop,
                    "parents_id": parents_id,
                    "merchantId": current_id
                }
                UgoTracker.track(this, 'click', clickInfo);
            });
        });
    },
    /**
     * 跟踪基础方法
     * @param dom dom
     * @param click,pv actionType
     * @param {type} options
     * @returns {undefined}
     */
    track: function (dom, actionType, options) {
        // alert( actionType )
        var data = [];
        //所有统计数据按照{key:val}返回堆放到data的一个结点
        data[0] = this.getUser();
        if (dom !== window) { //pv事件不记录
            data[1] = this.getClient();
        }
        data[2] = this.getPage(dom);
        data[3] = {
            'actionType': actionType //其他手动获取的都放在这里
        }
        if (typeof (options) == 'object') {
            data[4] = options;
        }
        var url = location.protocol + '//bitracker.huimai365.com//index.php?bd={';
        for (var i in data) {
            if (!data[i] || typeof (data) != 'object') {
                continue;
            }
            for (var j in data[i]) {
                var item = data[i][j];
                if (!item)
                    continue;
                url += j + '=' + encodeURIComponent(item) + '|';
            }
        }
        url = url.substr(0, url.length - 1) + '}';
        var img = new Image;
        img.src = url;
    },
    
    /**
     * 从cookie中读取用户信息
     * @returns {uvid,username,user_id}
     */
    getUser: function () {
        if (!this.user) {
            this.user = {
                guid:UgoTracker.helper.getGuid(),
                sessionId: UgoTracker.helper.getCookie('ECS_ID'),
                userId: UgoTracker.helper.getCookie('ECS[user_id]'),
                u_ip: UgoTracker.helper.getCookie('real_ipd'),
                sessionActionNumber:UgoTracker.helper.getSessActionNumber()
            };
        }
        return this.user;
    },
    /**
     * 客户端信息
     * @returns {x,y,area_id}
     */
    getClient: function () {
        this.x, this.y, this.area_id;
        return {
            x: this.x,
            y: this.y,
            area_id: this.area_id
        }
    },
    /**
     * 获取页面信息
     * @param dom object
     * @return {refPage , refPageType , currentPage , currentPageType , forwardPage , forwardPageType}
     */
    getPage: function (dom) {
        var refPage = document.referrer;                                                           // 上一个页面
        var currentPage = dom == window ? location.href : $(dom).attr("href");// 当前页面地址

        var rtn = {
            referPage: refPage,
            referPageType: UgoTracker.helper.getPageType(refPage),
            currentPage: currentPage,
            currentPageType: UgoTracker.helper.getPageType(currentPage)
        }
        // 判断页面初始化，初始化时直接返回
        if (dom == window)
        {
            return rtn;
        }
        if ($(dom)[0].tagName.toUpperCase() == 'A' || $(dom)[0].tagName.toUpperCase() == 'AREA') {
            rtn.arrivalPage = $(dom).attr('href');
            rtn.arrivalPageType = UgoTracker.helper.getPageType(rtn.forwardPage);
        }
        return rtn;
    },
    //助手
    helper: {
        getBiCookieName: function (cookiename) {
            return 'BI_' + cookiename.toUpperCase();
        },
        setCookie: function (cookiename, cookievalue, expire) {
            var date = new Date();
            date.setTime(date.getTime() + expire * 1000);
            document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
        },
        getCookie: function (cookiename) {
            var i = document.cookie;
            var h = i.split("; ");
            for (var j = 0; j < h.length; j++) {
                var g = h[j].split("=");
                if (g[0] == cookiename) {
                    return g[1];
                }
            }
            return null;
        },
        isMobile: function () {
            var e = navigator.userAgent.toLowerCase();
            if (e.match(/ipad/i) == "ipad")
                return true;
            if (e.match(/iphone os/i) == "iphone os")
                return true;
            if (e.match(/midp/i) == "midp")
                return true;
            if (e.match(/rv:1.2.3.4/i) == "rv:1.2.3.4")
                return true;
            if (e.match(/ucweb/i) == "ucweb")
                return true;
            if (e.match(/android/i) == "android")
                return true;
            if (e.match(/windows ce/i) == "windows ce")
                return true;
            if (e.match(/windows mobile/i) == "windows mobile")
                return true;
            return false;
        },
        getPageType: function (url) {
            var a = UgoTracker.helper.parseUrl(url);
            // console.log(a.pathname);
            for (var i in UgoTracker.helper.router) {
                for (var j in UgoTracker.helper.router[i]) {
                    var item = UgoTracker.helper.router[i][j];
                    if (item.test(a.pathname)) {
                        return i;
                    }
                }
            }
            return 'other';
        },
        parseUrl: function (url) {
            var a = document.createElement('a');
            a.href = url;
            var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            a.params = ret;
            return a;
        },
        //页面规则
        router: {
            'index': [/^(index\.(html|php))?$/],
            'item': [/^goods\-\d+\.html$/],
            'topic': [/^activitie-\d+.*$/, /^topic.*$/],
            'search': [/search\.php/],
            'category': [/ch\d+(\-.*)?/] //列表页面
        },
        getGuid: function () {
            var guid = UgoTracker.helper.getCookie('bi_guid');
            if (!guid) {
                guid = "";
                var hash = "1234567890abcdefghijklmnopqrstuvwxyz";
                hash = hash.split("");
                var i=32;
                while (i-->0) {
                    r = Math.random()
                    var r = parseInt(r * 100000 % (hash.length));
                    guid+=hash[r];
                }
                UgoTracker.helper.setCookie('bi_guid' , guid , 9999999999);
            }
            return guid;
        } , 
        getSessActionNumber : function() {
            var n = UgoTracker.helper.getCookie('bi_actnum');
            if (!n) {
                n = 1;
            }
            UgoTracker.helper.setCookie('bi_actnum' , ++n);
            return n;
        }
    }
};
UgoTracker.init();
function gotracker(object , a , b , area ,actionType , e) {
    UgoTracker.track(this , actionType , {
        "area" :  area
    });
}