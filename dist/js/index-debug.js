define("dist/js/index-debug", [ "./pub/util-debug", "./pub/favorites-debug", "./pub/sethome-debug", "./pub/tab-debug" ], function(require, exports, module) {
    var fc = require("./pub/util-debug"), fv = require("./pub/favorites-debug"), sethome = require("./pub/sethome-debug"), tab = require("./pub/tab-debug");
    $("#kingone").css({
        color: fc.randomColor()
    });
    window.setInterval(function() {
        $("#kingone").css({
            color: fc.randomColor()
        });
    }, 1500);
    $("#test01").click(function() {
        var sitename = "Add  baidu Fav";
        fv(sitename, "http://www.baidu.com");
    });
    $("#sethome").click(function() {
        sethome(this, window.location);
    });
    new tab({
        tab: $(".tb-hd li"),
        defaultIndex: 0,
        tabCurrentClass: "cur",
        only: true,
        content: $(".tb-bd"),
        afterShow: function(index) {
            if (index == 0) {
                return;
            }
            alert(index);
        }
    });
    new tab({
        tab: $(".tb-hd2 li"),
        defaultIndex: 0,
        tabCurrentClass: "cur",
        only: true,
        content: $(".tb-bd2"),
        trigger: "mouseover"
    });
});

define("dist/js/pub/util-debug", [], function(require, exports, module) {
    var util = {};
    var colorRange = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" ];
    util.randomColor = function() {
        return "#" + colorRange[Math.floor(Math.random() * 16)] + colorRange[Math.floor(Math.random() * 16)] + colorRange[Math.floor(Math.random() * 16)] + colorRange[Math.floor(Math.random() * 16)] + colorRange[Math.floor(Math.random() * 16)] + colorRange[Math.floor(Math.random() * 16)];
    };
    module.exports = util;
});

define("dist/js/pub/favorites-debug", [], function(require, exports, module) {
    function setfav(tit, url) {
        var title = tit || document.title, url = url || document.location.href;
        try {
            window.sidebar ? window.sidebar.addPanel(title, url, "") : window.external.AddFavorite(url, title);
        } catch (e) {
            alert("您的浏览器不支持该功能,请使用Ctrl+D收藏本页");
        }
    }
    module.exports = setfav;
});

define("dist/js/pub/sethome-debug", [], function(require, exports, module) {
    function SetHome(obj, url) {
        try {
            obj.style.behavior = "url(#default#homepage)";
            obj.setHomePage(url);
        } catch (e) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) {
                    alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
                }
            } else {
                alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
            }
        }
    }
    module.exports = SetHome;
});

/*
 new tab({ 
 tab : $(".cn_ranktab li"), 
 defaultIndex : 0, 
 tabCurrentClass : "cur", 
 only : true, 
 content : $(".cn_rankcon"), 
 trigger : "mouseover" 
 }); 
*/
define("dist/js/pub/tab-debug", [], function(a, b, c) {
    function d(a) {
        var b = {
            tab: $(),
            defaultIndex: 0,
            tabCurrentClass: "",
            only: !0,
            content: $(),
            trigger: "click",
            beforeSwitch: e,
            afterSwitch: e,
            beforeShow: e,
            afterShow: e
        };
        this.options = a = $.extend(b, a), this.init();
    }
    var e = function() {};
    d.prototype = {
        init: function() {
            var a = this, b = this.options;
            this.switchTab(b.defaultIndex), this.showContent(b.defaultIndex), b.tab.bind(b.trigger, function() {
                var c = b.tab.index($(this)), d = $(this).hasClass("cur");
                return a.switchTab(c, d), a.showContent(c, d), !1;
            });
        },
        switchTab: function(a, b) {
            var c = this.options;
            0 > a || (c.beforeSwitch.call(this, a, b), c.only ? (c.tab.removeClass(c.tabCurrentClass), 
            c.tab.eq(a).addClass(c.tabCurrentClass)) : b ? c.tab.eq(a).removeClass(c.tabCurrentClass) : c.tab.eq(a).addClass(c.tabCurrentClass), 
            c.afterSwitch.call(this, a, b));
        },
        showContent: function(a, b) {
            var c = this.options;
            0 > a || (c.beforeShow.call(this, a, b), c.only ? (c.content.hide(), c.content.eq(a).show()) : b ? c.content.eq(a).hide() : c.content.eq(a).show(), 
            c.afterShow.call(this, a, b));
        }
    }, c.exports = d;
});
