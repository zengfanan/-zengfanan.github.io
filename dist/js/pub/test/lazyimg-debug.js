/* 
 new lazyimg({ 
 target : $(".iconlist,.imglist,.imgtextlist"), 
 type : "scroll" 
 });
 */
define("dist/js/pub/test/lazyimg-debug", [], function(a, b, c) {
    function d() {
        return window.innerHeight || document.documentElement.clientHeight;
    }
    function e() {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }
    var f = function(a) {
        a = $.extend({}, {
            target: "",
            type: ""
        }, a), this._timer = null, this.init(a);
    }, g = 0, h = [];
    f.prototype = {
        init: function(a) {
            var b = a.target.find("img"), c = this;
            "scroll" === a.type ? (h = b, c.loadByScroll(), $(window).unbind("scroll.lazyImg resize.lazyImg").bind("scroll.lazyImg resize.lazyImg", function() {
                c._timer = setTimeout(function() {
                    c.loadByScroll();
                }, 200);
            })) : c.load(b);
        },
        load: function(a) {
            for (var b, c = 0, d = a.length; d > c; c++) b = $(a[c]), b.attr("data-src") && b.attr("src", b.attr("data-src")).removeAttr("data-src");
        },
        loadByScroll: function() {
            for (var a, b = this, c = 0, f = h.length; f > c; c++) a = $(h[c]), d() + e() >= a.offset().top && (a.attr("data-src") && (g++, 
            a.attr("src", a.attr("data-src")).removeAttr("data-src")), g == h.length && (clearTimeout(b._timer), 
            $(window).unbind("scroll.lazyImg resize.lazyImg")));
        }
    }, c.exports = f;
});
