/* 
 new marquee({ 
 target: '#j-slide-list', 
 hovertarget: "#j-slide-list",//鼠标hover停止切换的对象 
 items: '#j-slide-list li', //滚动的详细列表 
 prevbtn: "#j-btn-left",//前一个 
 nextbtn: "#j-btn-right",//后一个 
 gotobtn: "", //target btn
 loop: true, 
 delay: 3000,//切换间隔时间 
 speed: 600,//切换速度 
 visiblenum: 10, //可见个数
 scrollnum: 10, //滚动个数
 currentclass: "cur", 
 autoplay: false,//是否自动播放 
 
 afterSlide: function () {},//每滚动一个完的回调函数 
 beforeSlide: function () {},//每滚动一个之前的回调函数 
 mode: 1,//1表示水平方向滚动 0表示垂直方向滚动 
 direction: 1 
 }); 
*/
define("dist/js/pub/test/marquee-debug", [], function(a, b, c) {
    function d(a) {
        var b = 0, c = 0, d = 0;
        return a.wheelDelta && (b = a.wheelDelta / 120), a.detail && (b = -a.detail / 3), 
        d = b, void 0 !== a.axis && a.axis === a.HORIZONTAL_AXIS && (d = 0, c = -1 * b), 
        void 0 !== a.wheelDeltaY && (d = a.wheelDeltaY / 120), void 0 !== a.wheelDeltaX && (c = -1 * a.wheelDeltaX / 120), 
        {
            delta: b,
            deltaX: c,
            deltaY: d
        };
    }
    function e(a) {
        var b = {
            scrolltarget: "",
            hovertarget: "",
            target: "",
            items: "",
            gotobtn: "",
            prevbtn: "",
            prevbtndisabled: "",
            nextbtn: "",
            nextbtndisabled: "",
            delay: 3e3,
            speed: 600,
            visiblenum: 1,
            scrollnum: 1,
            autoplay: !0,
            currentclass: "",
            fade: 0,
            loop: 1,
            afterSlide: function() {},
            beforeSlide: function() {},
            beforePrev: function() {},
            afterPrev: function() {},
            beforeNext: function() {},
            afterNext: function() {},
            mode: 0,
            direction: 0
        };
        if (a = this.options = $.extend(b, a), this.scrolltarget = $(a.scrolltarget), this.hovertarget = $(a.hovertarget), 
        this.target = $(a.target), this.prevbtn = $(a.prevbtn), this.nextbtn = $(a.nextbtn), 
        this.gotobtn = $(a.gotobtn), this.items = $(a.items), this.items.each(function(a) {
            $(this).attr("data-index", a);
        }), 1 == a.loop) this.items.length - a.visiblenum < 2 * a.scrollnum && (this.target.append($(a.items).clone()), 
        this.items = $(a.items)); else {
            if ("" == a.prevbtndisabled ? this.prevbtn.css("visibility", "hidden") : this.prevbtn.addClass(a.prevbtndisabled), 
            this.items.length <= a.visiblenum) return "" == a.nextbtndisabled ? this.nextbtn.css("visibility", "hidden") : this.nextbtn.addClass(a.nextbtndisabled), 
            void 0;
            "" == a.nextbtndisabled ? this.nextbtn.css("visibility", "visible") : this.nextbtn.removeClass(a.nextbtndisabled);
        }
        this.gotobtn.each(function(a) {
            "undefined" == typeof $(this).attr("data-index") && $(this).attr("data-index", a);
        }), this.current = this.items.eq(0), this.bind(), this.start();
    }
    e.prototype = {
        bind: function() {
            var a = (this.options, this);
            this.prevbtn.bind("click", function() {
                return a.prev(), !1;
            }), this.nextbtn.bind("click", function() {
                return a.next(), !1;
            }), this.gotobtn.bind("click", function() {
                var b = $(this).attr("data-index"), c = a.current.attr("data-index");
                return 0 > c && (c = 0), a.goto(b, c), !1;
            }), this.scrolltarget.bind("mousewheel DOMMouseScroll", function(b) {
                if (a.animate) return !1;
                var c = d(b);
                return c.delta > 0 ? a.prev() : a.next(), b.preventDefault(), b.stopPropagation(), 
                !1;
            }), this.hovertarget.bind("mouseover mouseout", function(b) {
                "mouseover" == b.type ? (a.hoverstatus = !0, setTimeout(function() {
                    a.checkHover();
                }, 300)) : "mouseout" == b.type && (a.hoverstatus = !1, setTimeout(function() {
                    a.checkHover();
                }, 300));
            });
        },
        next: function() {
            return this.animate ? !1 : (this.scroll(0), void 0);
        },
        prev: function() {
            return this.animate ? !1 : (this.scroll(1), void 0);
        },
        "goto": function(a, b) {
            return this.animate ? !1 : (a > b ? this.scroll(0, a - b) : b > a && this.scroll(1, b - a), 
            void 0);
        },
        scroll: function(a, b) {
            var c, d, e, f, g = this, h = this.options, i = {}, b = "number" == typeof b ? b : h.scrollnum;
            a = "number" == typeof a ? a : h.direction, g.items = $(h.items), this.animate = !0, 
            this.stop(), this.target.stop(), 0 == a ? (c = g.items.slice(0, b), 0 == h.mode ? (d = c.outerHeight(!0), 
            e = "margin-top", i = {
                "margin-top": -d * b
            }) : (d = c.outerWidth(!0), e = "margin-left", i = {
                "margin-left": -d * b
            }), g.current = g.items.eq(b), f = g.current.attr("data-index"), g.gotobtn.eq(f).addClass(h.currentclass).siblings().removeClass(h.currentclass), 
            h.beforeNext.call(g), h.beforeSlide.call(g), 0 == h.loop && (g.items.eq(0).attr("data-index") == g.items.length - h.visiblenum - 1 ? "" == h.nextbtndisabled ? g.nextbtn.css("visibility", "hidden") : g.nextbtn.addClass(h.nextbtndisabled) : "" == h.nextbtndisabled ? g.nextbtn.css("visibility", "visible") : g.nextbtn.removeClass(h.nextbtndisabled), 
            "" == h.prevbtndisabled ? this.prevbtn.css("visibility", "visible") : this.prevbtn.removeClass(h.prevbtndisabled)), 
            g.target.animate(i, h.speed, function() {
                g.target.css(e, 0), g.target.append(c), g.items = $(h.items), setTimeout(function() {
                    h.afterNext.call(g), h.afterSlide.call(g);
                }, 0), g.animate = !1, setTimeout(function() {
                    g.start();
                }, 0);
            })) : (c = g.items.slice(-b), 0 == h.mode ? (d = c.outerHeight(!0), e = "margin-top", 
            i = {
                "margin-top": 0
            }) : (d = c.outerWidth(!0), e = "margin-left", i = {
                "margin-left": 0
            }), g.current = g.items.eq(g.items.length - b), f = g.current.attr("data-index"), 
            g.gotobtn.eq(f).addClass(h.currentclass).siblings().removeClass(h.currentclass), 
            g.target.prepend(c), g.items = $(h.items), setTimeout(function() {
                h.beforePrev.call(g), h.beforeSlide.call(g);
            }, 0), 0 == h.loop && (0 == this.items.eq(0).attr("data-index") ? "" == h.prevbtndisabled ? this.prevbtn.css("visibility", "hidden") : this.prevbtn.addClass(h.prevbtndisabled) : "" == h.prevbtndisabled ? this.prevbtn.css("visibility", "visible") : this.prevbtn.removeClass(h.prevbtndisabled), 
            "" == h.nextbtndisabled ? g.nextbtn.css("visibility", "visible") : g.nextbtn.removeClass(h.nextbtndisabled)), 
            g.target.css(e, -d * b).animate(i, h.speed, function() {
                h.afterPrev.call(g), h.afterSlide.call(g), g.animate = !1, setTimeout(function() {
                    g.start();
                }, h.delay);
            }));
        },
        stop: function() {
            clearInterval(this.timer);
        },
        start: function() {
            var a = this.options, b = this;
            a.autoplay && (this.stop(), this.timer = setInterval(function() {
                b.scroll();
            }, a.delay + a.speed));
        },
        checkHover: function() {
            this.hoverstatus ? this.stop() : this.start();
        }
    }, c.exports = e;
});
