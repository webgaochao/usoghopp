(function(){
    var clientInfo = {
        _mHost : 'http://m.ugoshop.com' , 
        init : function () {
            if (this.isMobile() == 1) {
                this.dispatchToM();
            }
        } ,
        
        detectOs : function () {
            var sUserAgent = navigator.userAgent;
            var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
            var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
            if (isMac) return "Mac";
            if (navigator.userAgent.match('Android')) {
                return 'Android';
            }
            if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                return 'IOS'
            }
            return "other";
        } ,
        
        isMobile : function () {
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
        } ,
        
        getExplore : function () {
            
        } ,
        
        //跳转到M域名
        dispatchToM : function () {
            var path = location.pathname.substr(1);
            var pageType = this.getPageType(path);
            var redirect = '';
            switch (pageType) {
                case 'index' : redirect='/';
                    break;
                case 'item' : 
                    var match = path.match(/goods-(\d+)\.html/);
                    if (!!match[1]) {
                        redirect = '/goods-'+match[1];
                    }
                    break;
                case 'topic' :
                    var match = path.match('/^activitie-(\d+).*$/');
                    if (!!match[1]) {
                        redirect = '/activity-activity－'+match[1];
                    }
                    break;
                case 'search' :
                    redirect = '/search/';
                    break;
                default : 
                    redirect = '/';
            }
//            console.log(this._mHost+redirect);
            location.href = this._mHost+redirect;
        } , 
        
        getPageType : function (a) {
            var router = {
                'index': [/^(index\.(html|php))?$/],
                'item':  [/^goods\-(\d+)\.html$/],
                'topic': [/^activitie-(\d+).*$/],
                'search': [/search\.php/],
                'category': [/ch\d+(\-.*)?/] //列表页面
            };
            // console.log(a.pathname);
            for (var i in router) {
                if (!router[i].length) {
                    continue;
                }
                for (var j in router[i]) {
                    var item = router[i][j];
                    if (item.test(a)) {
                        return i;
                    }
                }
            }
            return null;
        }
    }
    clientInfo.init();
})();

