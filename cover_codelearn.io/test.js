function getParameterByName(n, t) {
    t || (t = window.location.href);
    n = n.replace(/[\[\]]/g, "\\$&");
    var r = new RegExp("[?&]" + n + "(=([^&#]*)|&|#|$)"),
        i = r.exec(t);
    return i ? (i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "") : null;
}
function setCookie(n, t, i) {
    var r = new Date(),
        u;
    r.setTime(r.getTime() + i * 864e5);
    u = "expires=" + r.toUTCString();
    document.cookie = n + "=" + t + ";" + u + ";path=/";
}
function getCookie(n) {
    for (var t, r = n + "=", f = decodeURIComponent(document.cookie), u = f.split(";"), i = 0; i < u.length; i++) {
        for (t = u[i]; t.charAt(0) == " "; ) t = t.substring(1);
        if (t.indexOf(r) == 0) return t.substring(r.length, t.length);
    }
    return "";
}
function addCookieShare() {
    var t = window.location.href,
        r = t.substring(t.lastIndexOf("/") + 1, t.indexOf("?")),
        n = isNaN(r) ? "" : r,
        i = getParameterByName("event"),
        u = getParameterByName("refer"),
        f;
    i != null && u != null && getCookie("event" + n) == "" && getCookie("refer" + n) == "" && ((f = getCookie("event" + n)), f != i && (setCookie("event" + n, i, { expires: 1 }), setCookie("refer" + n, u, { expires: 1 })));
}
function getReferRegister() {
    var n = window.location.href,
        t = n.substring(n.lastIndexOf("/") + 1, n.indexOf("?")),
        i = isNaN(t) ? "" : t;
    return { EventKey: getCookie("event" + i), Refer: getCookie("refer" + i) };
}
function startTimer(n, t, i, r, u) {
    if ((u && clearInterval(interval), n > 0)) {
        var f = n,
            e,
            o,
            s,
            h,
            c = !0;
        interval = setInterval(function () {
            if (((e = Math.floor(f / 86400)), (o = Math.floor((f % 86400) / 3600)), (s = Math.floor((f % 3600) / 60)), (h = Math.floor((f % 3600) % 60)), f > 0)) {
                var n = "";
                i
                    ? ((n += '<div class="down-time">'),
                      e > 0 && ((n += '<div class="inline-block">'), (n += "<span>" + e + "</span>"), (n += "<span>" + translate.instant("CONTEST_LABEL_DAYS") + "</span>"), (n += "</div>"), (n += '<label class="dot">:</label>')),
                      (n += '<div class="inline-block">'),
                      (n += "<span>" + o + "</span>"),
                      (n += "<span>" + translate.instant("CONTEST_LABEL_HOURS") + "</span>"),
                      (n += "</div>"),
                      (n += '<label class="dot">:</label>'),
                      (n += '<div class="inline-block">'),
                      (n += "<span>" + s + "</span>"),
                      (n += "<span>" + translate.instant("CONTEST_LABEL_MINUTES") + "</span>"),
                      (n += "</div>"),
                      (n += '<label class="dot">:</label>'),
                      (n += '<div class="inline-block">'),
                      (n += "<span>" + h + "</span>"),
                      (n += "<span>" + translate.instant("CONTEST_LABEL_SECONDS") + "</span>"),
                      (n += "</div>"),
                      (n += "</div>"))
                    : ((n += "<span class='time_span'>"),
                      e > 0 && (n += "<span class='time_day'>" + e + "</span>" + translate.instant("SYSTEM_TIME_DAY_CHAR") + " "),
                      (n += "<span class='time_hours'>" + o + "</span>"),
                      (n += translate.instant("SYSTEM_TIME_HOUR_CHAR")),
                      (n += " <span class='time_minutes'>" + s + "</span>"),
                      (n += translate.instant("SYSTEM_TIME_MINUTES_CHAR")),
                      (n += " <span class='time_seconds'>" + h + "</span>"),
                      (n += translate.instant("SYSTEM_TIME_SECONDS_CHAR")));
                t.empty().append(n);
            }
            --f;
            f <= 0 && c && (r(), (c = !1));
        }, 1e3);
    }
}
function highlight(n, t) {
    $(n).each(function () {
        var n = $(this)
            .text()
            .toLowerCase()
            .indexOf("" + t.toLowerCase() + "");
        if (n > -1) {
            var i = $(this).text(),
                r = n + t.length - 1,
                u = i.slice(0, n),
                f = i.slice(n, r + 1),
                e = i.slice(r + 1);
            $(this).addClass("highlight").text(f);
            $(this).before("<span>" + u + "</span>");
            $(this).after("<span>" + e + "</span>");
        }
    });
}
function getKey(n) {
    try {
        isNetscape = document.layers;
        eventChooser = isNetscape ? n.which : n.keyCode;
        eventChooser == 116 && n.ctrlKey && localStorage.removeItem(PKLService.ArrConfig.strLangStorage);
        n.ctrlKey && eventChooser == 82 && localStorage.removeItem(PKLService.ArrConfig.strLangStorage);
    } catch (t) {
        console.error("Error linux browse is not support event key code");
    }
}
function checkVerScrollBarDisplay(n) {
    var t, r, i;
    if (((n = n || 0), (t = $("#layout-footer")), t.length)) {
        if (((r = t.css("position") == "absolute"), (i = $(window).height() < document.body.scrollHeight), r || !i)) {
            var u = t.parent(),
                f = t[0].getBoundingClientRect(),
                e = $(u).prev(),
                o = e[0].getBoundingClientRect();
            i = f.top < o.bottom + n;
        }
        $(document.body).toggleClass("has-ver-scroll", i);
    }
}
function removeHasVerScrollBodyClass() {
    $(document.body).toggleClass("has-ver-scroll", !1);
}
function extendTinymce(n) {
    n.getStyledContent = function (n) {
        n = n || this.editors[0];
        var t = n.iframeElement.contentWindow.document.body,
            i = ["webkitUserModify", "blockSize", "height", "webkitLogicalHeight", "webkitLogicalWidth"];
        return (
            $(t)
                .find("*")
                .each(function () {
                    this.tagName === "IMG" && ((this.style.maxWidth = "100%"), this.removeAttribute("height"));
                    HTMLElement.prototype.embedComputedStyle.bind(this)(i, function (n) {
                        return n == "width" ? "auto" : undefined;
                    });
                }),
            $(t).html()
        );
    };
}
function isStringNullOrEmpty(n) {
    switch (n) {
        case "":
        case "":
        case null:
        case undefined:
        case typeof this == "undefined":
            return !0;
        default:
            return !1;
    }
}
function setCurrentmenu() {
    var t = location.pathname,
        i = "/" + t.split("/")[1],
        n;
    $(".menu-main-menu li").each(function () {
        $(this).removeClass("current");
        i == $(this).find("a").attr("href").toLowerCase() && $(this).addClass("current");
    });
    n = window.location.href.toLocaleLowerCase();
    n.toLocaleLowerCase().indexOf("aboutus") > -1 && ($("#img-about").addClass("hide"), $("#img-about-select").removeClass("hide"));
    n.toLocaleLowerCase().indexOf("help") > -1 && ($("#img-help").addClass("hide"), $("#img-help-select").removeClass("hide"));
}
function formatShortDate(n) {
    var t = { vn: "vi-VN", en: "en-US" }[LANG_CURRENT];
    return t === undefined && (t = "en-US"), new Intl.DateTimeFormat(t, { year: "numeric", month: "short", day: "2-digit" }).format(n);
}
function formatShortDateTime(n, t) {
    var i = { vn: "vi-VN", en: "en-US" }[LANG_CURRENT];
    return i === undefined && (i = "en-US"), new Intl.DateTimeFormat(i, { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: !!t }).format(n);
}
function execFunction(n, t, i) {
    t = t || 0;
    var r,
        u = setTimeout(function () {
            r = i(n);
        }, t);
    return {
        cancel: function () {
            clearTimeout(u);
            r && typeof r.abort == "function" && r.abort();
        },
    };
}
function changeToSlug(n) {
    var t;
    return (
        (t = n.toLowerCase()),
        (t = t.split("c++").join("cpp")),
        (t = t.split("c#").join("csharp")),
        (t = t.replace(/Ã¡|Ã |áº£|áº¡|Ã£|Äƒ|áº¯|áº±|áº³|áºµ|áº·|Ã¢|áº¥|áº§|áº©|áº«|áº­/gi, "a")),
        (t = t.replace(/Ã©|Ã¨|áº»|áº½|áº¹|Ãª|áº¿|á»|á»ƒ|á»…|á»‡/gi, "e")),
        (t = t.replace(/i|Ã­|Ã¬|á»‰|Ä©|á»‹/gi, "i")),
        (t = t.replace(/Ã³|Ã²|á»|Ãµ|á»|Ã´|á»‘|á»“|á»•|á»—|á»™|Æ¡|á»›|á»|á»Ÿ|á»¡|á»£/gi, "o")),
        (t = t.replace(/Ãº|Ã¹|á»§|Å©|á»¥|Æ°|á»©|á»«|á»­|á»¯|á»±/gi, "u")),
        (t = t.replace(/Ã½|á»³|á»·|á»¹|á»µ/gi, "y")),
        (t = t.replace(/Ä‘/gi, "d")),
        (t = t.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, "")),
        (t = t.replace(/\s*-+\s*/g, " ")),
        (t = t.replace(/\s+/gi, " - ")),
        (t = t.replace(/\s/g, "")),
        (t = "@" + t + "@"),
        t.replace(/\@\-|\-\@|\@/gi, "")
    );
}
function __handleSuccessAlerting(n) {
    var t = n && (!n.Errors || n.Errors.length == 0);
    return t && (NOFICATION_GLOBAL ? NOFICATION_GLOBAL.update({ message: translate.instant(n.Message) }) : (NOFICATION_GLOBAL = $.notify(translate.instant(n.Message)))), t;
}
function AdaptiveIframe() {
    $("iframe").each(function () {
        let n = $(this).parent().innerWidth();
        $(".blog-content")[0] && (n = $(".blog-content").innerWidth());
        let t = !$(this).attr("width") ? $(this).width() : $(this).attr("width"),
            i = !$(this).attr("height") ? $(this).height() : $(this).attr("height"),
            r = t / i,
            u = n,
            f = n / r;
        $(this).attr("width", u);
        $(this).attr("height", f);
    });
}
function convertUTCTimes(n) {
    n.find("[data-utc]").each(function () {
        var t = $(this).data("utc"),
            n = $(this).data("DateTimePicker");
        n && n.date(new Date(t));
    });
}
function formatShortDateStringBySiteLang(n) {
    var t = LANG_CURRENT == "en" ? "en-US" : "vi-VN";
    return n.toLocaleDateString(t, { day: "2-digit", year: "numeric", month: "2-digit" });
}
function convertUTCTextTimes(n) {
    n.find("[data-utc-text]").each(function () {
        var n = $(this).data("utc-text");
        $(this).html(formatShortDateStringBySiteLang(new Date(n)));
    });
}
var objStatus, statusAndNameBatch, NOFICATION_GLOBAL, select2Language, getAllProperties, __picker, createDummyContainer;
!(function (n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof exports ? n(require("jquery")) : n(jQuery);
})(function (n) {
    function i(i, r, u) {
        r = { content: { message: "object" == typeof r ? r.message : r, title: r.title ? r.title : "", icon: r.icon ? r.icon : "", url: r.url ? r.url : "#", target: r.target ? r.target : "-" } };
        u = n.extend(!0, {}, r, u);
        this.settings = n.extend(!0, {}, t, u);
        this._defaults = t;
        "-" == this.settings.content.target && (this.settings.content.target = this.settings.url_target);
        this.animations = { start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart", end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend" };
        "number" == typeof this.settings.offset && (this.settings.offset = { x: this.settings.offset, y: this.settings.offset });
        this.init();
    }
    var t = {
        element: "body",
        position: null,
        type: "info",
        allow_dismiss: !0,
        newest_on_top: !1,
        showProgressbar: !1,
        placement: { from: "top", align: "right" },
        offset: 20,
        spacing: 10,
        z_index: 9999,
        delay: 2e3,
        timer: 1e3,
        url_target: "_blank",
        mouse_over: null,
        animate: { enter: "animated fadeInDown", exit: "animated fadeOutUp" },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: "class",
        template:
            '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="glyphicon glyphicon-remove" style="font-size:18px;"></i></button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>',
    };
    String.format = function () {
        for (var t = arguments[0], n = 1; n < arguments.length; n++) t = t.replace(RegExp("\\{" + (n - 1) + "\\}", "gm"), arguments[n]);
        return t;
    };
    n.extend(i.prototype, {
        init: function () {
            var n = this;
            this.buildNotify();
            this.settings.content.icon && this.setIcon();
            "#" != this.settings.content.url && this.styleURL();
            this.placement();
            this.bind();
            this.notify = {
                $ele: this.$ele,
                update: function (t, i) {
                    var r = {},
                        t,
                        u,
                        f,
                        e;
                    for (t in ("string" == typeof t ? (r[t] = i) : (r = t), r))
                        switch (t) {
                            case "type":
                                this.$ele.removeClass("alert-" + n.settings.type);
                                this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + n.settings.type);
                                n.settings.type = r[t];
                                this.$ele
                                    .addClass("alert-" + r[t])
                                    .find('[data-notify="progressbar"] > .progress-bar')
                                    .addClass("progress-bar-" + r[t]);
                                break;
                            case "icon":
                                u = this.$ele.find('[data-notify="icon"]');
                                "class" == n.settings.icon_type.toLowerCase() ? u.removeClass(n.settings.content.icon).addClass(r[t]) : (u.is("img") || u.find("img"), u.attr("src", r[t]));
                                break;
                            case "progress":
                                f = n.settings.delay - n.settings.delay * (r[t] / 100);
                                this.$ele.data("notify-delay", f);
                                this.$ele
                                    .find('[data-notify="progressbar"] > div')
                                    .attr("aria-valuenow", r[t])
                                    .css("width", r[t] + "%");
                                break;
                            case "url":
                                this.$ele.find('[data-notify="url"]').attr("href", r[t]);
                                break;
                            case "target":
                                this.$ele.find('[data-notify="url"]').attr("target", r[t]);
                                break;
                            default:
                                this.$ele.find('[data-notify="' + t + '"]').html(r[t]);
                        }
                    e = this.$ele.outerHeight() + parseInt(n.settings.spacing) + parseInt(n.settings.offset.y);
                    n.reposition(e);
                },
                close: function () {
                    n.close();
                },
            };
        },
        buildNotify: function () {
            var t = this.settings.content;
            this.$ele = n(String.format(this.settings.template, this.settings.type, t.title, t.message, t.url, t.target));
            this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align);
            this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none");
            ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove();
        },
        setIcon: function () {
            "class" == this.settings.icon_type.toLowerCase()
                ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon)
                : this.$ele.find('[data-notify="icon"]').is("img")
                ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon)
                : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />');
        },
        styleURL: function () {
            this.$ele
                .find('[data-notify="url"]')
                .css({
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                    height: "100%",
                    left: "0px",
                    position: "absolute",
                    top: "0px",
                    width: "100%",
                    zIndex: this.settings.z_index + 1,
                });
            this.$ele.find('[data-notify="dismiss"]').css({ position: "absolute", right: "10px", top: "5px", zIndex: this.settings.z_index + 2 });
        },
        placement: function () {
            var t = this,
                i = this.settings.offset.y,
                r = {
                    display: "inline-block",
                    margin: "0px auto",
                    position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                    transition: "all .5s ease-in-out",
                    zIndex: this.settings.z_index,
                },
                u = !1,
                f = this.settings;
            switch (
                (n('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
                    return (i = Math.max(i, parseInt(n(this).css(f.placement.from)) + parseInt(n(this).outerHeight()) + parseInt(f.spacing)));
                }),
                1 == this.settings.newest_on_top && (i = this.settings.offset.y),
                (r[this.settings.placement.from] = i + "px"),
                this.settings.placement.align)
            ) {
                case "left":
                case "right":
                    r[this.settings.placement.align] = this.settings.offset.x + "px";
                    break;
                case "center":
                    r.left = 0;
                    r.right = 0;
            }
            this.$ele.css(r).addClass(this.settings.animate.enter);
            n.each(Array("webkit", "moz", "o", "ms", ""), function (n, i) {
                t.$ele[0].style[i + "AnimationIterationCount"] = 1;
            });
            n(this.settings.element).append(this.$ele);
            1 == this.settings.newest_on_top && ((i = parseInt(i) + parseInt(this.settings.spacing) + this.$ele.outerHeight()), this.reposition(i));
            n.isFunction(t.settings.onShow) && t.settings.onShow.call(this.$ele);
            this.$ele
                .one(this.animations.start, function () {
                    u = !0;
                })
                .one(this.animations.end, function () {
                    n.isFunction(t.settings.onShown) && t.settings.onShown.call(this);
                });
            setTimeout(function () {
                u || (n.isFunction(t.settings.onShown) && t.settings.onShown.call(this));
            }, 600);
        },
        bind: function () {
            var t = this,
                i;
            (this.$ele.find('[data-notify="dismiss"]').on("click", function () {
                t.close();
            }),
            this.$ele
                .mouseover(function () {
                    n(this).data("data-hover", "true");
                })
                .mouseout(function () {
                    n(this).data("data-hover", "false");
                }),
            this.$ele.data("data-hover", "false"),
            0 < this.settings.delay) &&
                (t.$ele.data("notify-delay", t.settings.delay),
                (i = setInterval(function () {
                    var n = parseInt(t.$ele.data("notify-delay")) - t.settings.timer,
                        r;
                    (("false" === t.$ele.data("data-hover") && "pause" == t.settings.mouse_over) || "pause" != t.settings.mouse_over) &&
                        ((r = ((t.settings.delay - n) / t.settings.delay) * 100),
                        t.$ele.data("notify-delay", n),
                        t.$ele
                            .find('[data-notify="progressbar"] > div')
                            .attr("aria-valuenow", r)
                            .css("width", r + "%"));
                    n <= -t.settings.timer && (clearInterval(i), t.close());
                }, t.settings.timer)));
        },
        close: function () {
            var t = this,
                r = parseInt(this.$ele.css(this.settings.placement.from)),
                i = !1;
            this.$ele.data("closing", "true").addClass(this.settings.animate.exit);
            t.reposition(r);
            n.isFunction(t.settings.onClose) && t.settings.onClose.call(this.$ele);
            this.$ele
                .one(this.animations.start, function () {
                    i = !0;
                })
                .one(this.animations.end, function () {
                    n(this).remove();
                    n.isFunction(t.settings.onClosed) && t.settings.onClosed.call(this);
                });
            setTimeout(function () {
                i || (t.$ele.remove(), t.settings.onClosed && t.settings.onClosed(t.$ele));
            }, 600);
        },
        reposition: function (t) {
            var i = this,
                r = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                u = this.$ele.nextAll(r);
            1 == this.settings.newest_on_top && (u = this.$ele.prevAll(r));
            u.each(function () {
                n(this).css(i.settings.placement.from, t);
                t = parseInt(t) + parseInt(i.settings.spacing) + n(this).outerHeight();
            });
        },
    });
    n.notify = function (n, t) {
        return new i(this, n, t).notify;
    };
    n.notifyDefaults = function (i) {
        return (t = n.extend(!0, {}, t, i));
    };
    n.notifyClose = function (t) {
        void 0 === t || "all" == t
            ? n("[data-notify]").find('[data-notify="dismiss"]').trigger("click")
            : n('[data-notify-position="' + t + '"]')
                  .find('[data-notify="dismiss"]')
                  .trigger("click");
    };
}),
    (function () {
        function n(n) {
            return "background:" + n + "; color:white; padding: 5px; font-size: 40px; border-radius: 10px; margin: 1px;";
        }
        console.log("%cF%cP%cT%cCODELEARN.IO", n("#084aa0"), n("#f36f21"), n("#49b644"), n("#ff6d3a"));
        addCookieShare();
    })();
$(function () {
    var n = (window.devicePixelRatio || 1) > 1;
    $(".has-sprites-bg").each(function () {
        var t = $(this).data(n ? "hires-bg" : "bg");
        !t || $(this).css({ "background-image": "url(" + t + ")" });
    });
});
var cvUrl = "/profile/",
    countryFlagBaseUrl = "/Themes/TheCodeCampPro/Resources/Images/flags/",
    interval,
    levelKeyMap = { easy: "SYSTEM_STATUS_EASY", medium: "SYSTEM_STATUS_MEDIUM", hard: "SYSTEM_STATUS_HARD" };
objStatus = { ToStartRegister: "CONTEST_TO_START_REGISTER", ToEndRegister: "CONTEST_TO_END_REGISTER", ToStartContest: "CONTEST_TO_START_CONTEST", ToEndContest: "CONTEST_TO_END_CONTEST", Finish: "SYSTEM_STATUS_FINISH" };
statusAndNameBatch = function (n) {
    var t = { Status: "", Text: "--", Time: 0 },
        i = n.CurrentTime,
        u = n.RegisterStartSeconds,
        r = n.RegisterSeconds,
        f = n.StartDateSeconds,
        e = n.EndTimeCodeSeconds;
    return n.IsApplyRegisterStart && i < u
        ? ((t.Status = "status_wait"), (t.Text = translate.instant(objStatus.ToStartRegister)), (t.Time = u - i), t)
        : (r > i && r > u && n.IsApplyRegisterStart && u <= i) || (r > i && !n.IsApplyRegisterStart)
        ? ((t.Status = "status_register"), (t.Text = translate.instant(objStatus.ToEndRegister)), (t.Time = r - i), t)
        : r <= i && i < f
        ? ((t.Status = "status_upcoming"), (t.Text = translate.instant(objStatus.ToStartContest)), (t.Time = f - i), t)
        : f <= i && i < e
        ? ((t.Status = "status_running"), (t.Text = translate.instant(objStatus.ToEndContest)), (t.Time = e - i), t)
        : i >= e
        ? ((t.Status = "status_finish"), (t.Text = translate.instant(objStatus.Finish)), t)
        : t;
};
$.notifyDefaults !== null &&
    $.notifyDefaults != undefined &&
    $.notifyDefaults({
        allow_dismiss: !0,
        placement: { from: "top", align: "right" },
        animate: { enter: "animated fadeInRightBig", exit: "animated fadeOutRightBig" },
        onClosed: function () {
            NOFICATION_GLOBAL = null;
        },
    });
$(function () {
    try {
        $.fn.select2.defaults.set("theme", "bootstrap");
    } catch (n) {}
});
document.onkeydown = getKey;
$.datepicker.setDefaults({ dateFormat: "yy-mm-dd", changeMonth: !0, changeYear: !0, yearRange: new Date().getFullYear() - 110 + ":" + (new Date().getFullYear() + 50) });
var SystemConstant = { Method: { GET: 1, POST: 2 } },
    translate = (function () {
        var n = [],
            i = [],
            u = function (t) {
                var u, i, r;
                return t == null || n == null
                    ? "OBJECT_IS_NULL"
                    : ((u = n.filter(function (n) {
                          return n.Key == t;
                      })),
                      u.length > 0
                          ? ((i = u[0].Message),
                            (r = arguments),
                            r.length > 1 &&
                                (i = i.replace(/\{(\d+)\}/g, function (n, t) {
                                    var i = parseInt(t);
                                    return !isNaN(i) && r.length > i + 1 ? r[i + 1] : n;
                                })),
                            i)
                          : t);
            },
            r = function () {
                jQuery.validator &&
                    jQuery.extend(jQuery.validator.messages, {
                        required: translate.instant("SYSTEM_VALIDATOR_FIELD_REQUIRED"),
                        email: translate.instant("SYSTEM_VALIDATOR_INVALID_EMAIL"),
                        url: translate.instant("SYSTEM_VALIDATOR_INVALID_URL"),
                        date: translate.instant("SYSTEM_VALIDATOR_INVALID_DATE"),
                        number: translate.instant("SYSTEM_VALIDATOR_INVALID_NUMBER"),
                        digits: translate.instant("SYSTEM_VALIDATOR_ONY_DIGITS"),
                    });
                translate.config.IsHasInit = !0;
                f();
            },
            t = function () {
                $.get(PKLService.ArrConfig.url + "/api/language/GetAllMessages?version=" + Math.random().toString(36).substring(2), function (t) {
                    n = t.Data;
                    var i = { strVersion: PKLService.ArrConfig.strVersion, strLangCode: PKLService.ArrConfig.strLangCode, ArrLang: n };
                    localStorage.setItem(PKLService.ArrConfig.strLangStorage, JSON.stringify(i));
                    r();
                });
            },
            f = function () {
                for (var n = 0; n < i.length; n++) i[n]();
            };
        return {
            status: function (n) {
                n = n.replaceAll(" ", "_");
                var t = "SYSTEM_STATUS_" + n.toUpperCase();
                return translate.instant(t);
            },
            config: { IsHasInit: !1 },
            reload: function () {
                t();
            },
            onLoad: function (n) {
                translate.config.IsHasInit == !0 ? n() : i.push(n);
            },
            init: function () {
                var u = localStorage.getItem(PKLService.ArrConfig.strLangStorage),
                    i;
                u == null ? t() : ((i = JSON.parse(u)), i.strVersion == PKLService.ArrConfig.strVersion && i.strLangCode == PKLService.ArrConfig.strLangCode ? ((n = i.ArrLang), n != null ? r() : t()) : t());
            },
            instant: function (n) {
                return n === undefined ? "" : u.apply(this, arguments);
            },
            tranText: function (n, t) {
                var u = n,
                    i,
                    r;
                return (
                    (n = this.instant(n)),
                    (i = this),
                    n == u &&
                        ((r = new RegExp(
                            t
                                .map(function (n) {
                                    return n.escapeRegExp();
                                })
                                .join("|"),
                            "g"
                        )),
                        (n = n.replace(r, function (n) {
                            return i.instant(n);
                        }))),
                    n
                );
            },
        };
    })(),
    PKLService = (function () {
        var r = { strApiURL: "", strVersion: "", strLangCode: "", strLangStorage: "StorageLangData", ajaxTimeOut: 3e4, IsHasLogin: !1, url: "" },
            n = function () {
                var t = document.createElement("div"),
                    n;
                return (
                    (t.className = "el-loading-mask"),
                    (n = translate.instant("SYSTEM_STATUS_LOADING")),
                    n == "SYSTEM_STATUS_LOADING" && (n = translate.instant("SYSTEM_STATUS_LOADING")),
                    (t.innerHTML =
                        '<div class="el-loading-spinner" style="top: 50%"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none"></circle></svg><p class="el-loading-text" style="display: block">' +
                        n +
                        "</p></div></div>"),
                    t
                );
            },
            t = function (n) {
                var t = [];
                return (
                    $.each(n, function (n, i) {
                        t.push({ key: n, value: i });
                    }),
                    t
                );
            },
            i = function (n, t) {
                if (n.statusText == "timeout")
                    NOFICATION_GLOBAL
                        ? NOFICATION_GLOBAL.update({ type: "codecamp-danger", message: translate.instant("SYSTEM_MESSEGER_REQUEST_TIME_OUT") })
                        : (NOFICATION_GLOBAL = $.notify(translate.instant("SYSTEM_MESSEGER_REQUEST_TIME_OUT"), { type: "codecamp-danger" }));
                else var i = "<p style='color:red;'>Error In: " + t.url + "</p>" + n.responseText;
            };
        return {
            ArrConfig: {},
            withTimeBeforeShowingLoadingIndicator: function (n) {
                return (this.ArrConfig.milliSecondsBeforeShowingLoadingIndicator = n), this;
            },
            swithObject: function (n) {
                return t(n);
            },
            createLoading: function () {
                return n();
            },
            getURLParameters: function (n) {
                var u = window.document.URL.toString(),
                    r;
                if (u.indexOf("?") > 0) {
                    for (var o = u.split("?"), i = o[1].split("&"), f = new Array(i.length), e = new Array(i.length), t = 0, t = 0; t < i.length; t++) (r = i[t].split("=")), (f[t] = r[0]), (e[t] = r[1] != "" ? unescape(r[1]) : "No Value");
                    for (t = 0; t < i.length; t++) if (f[t] == n) return e[t];
                    return null;
                }
            },
            init: function (n) {
                PKLService.ArrConfig = $.extend(r, n);
                PKLService.ArrConfig.strApiURL = PKLService.url();
                PKLService.ArrConfig.strLangCode == "jp"
                    ? ($.datetimepicker != undefined && $.datetimepicker.setLocale("ja"), $.datepicker.regional.ja)
                    : ($.datetimepicker != undefined && $.datetimepicker.setLocale("en-us"), $.datepicker.regional["en-us"]);
                PKLService.ArrConfig.IsHasLogin == !0;
                PKLService.loading.init();
                translate.init();
            },
            url: function () {
                return PKLService.ArrConfig.url + "/";
            },
            newid: function () {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (n) {
                    var t = (Math.random() * 16) | 0,
                        i = n == "x" ? t : (t & 3) | 8;
                    return i.toString(16);
                });
            },
            get: function (r) {
                var h = {
                        url: "",
                        api: null,
                        data: null,
                        timeout: PKLService.ArrConfig.ajaxTimeOut,
                        parameter: null,
                        isShowLoading: !0,
                        cache: !1,
                        dataType: "json",
                        reqeustid: "",
                        loading: null,
                        milliSecondsBeforeShowingLoadingIndicator: 200,
                        OnError: function () {},
                        OnSuccess: function () {},
                    },
                    u,
                    o,
                    f,
                    e,
                    s;
                if (((r = $.extend(h, r)), (r.reqeustid = PKLService.newid()), (u = ""), r.api == null)) u = PKLService.ArrConfig.strApiURL + r.url;
                else {
                    if (r.data == null || r.data == undefined || r.data == "") throw new "Service parameters not passed! Please input parameters for data"();
                    for (u = PKLService.ArrConfig.strApiURL + r.api + "?", o = t(r.data), f = "", e = 0; e < o.length; e++) (f = f + o[e].key + "=" + encodeURI(o[e].value)), e < o.length - 1 && (f = f + "&");
                    u = u + f;
                }
                return (
                    (r.url = u),
                    $.ajax({
                        type: "GET",
                        cache: r.cache,
                        url: u,
                        timeout: r.timeout,
                        beforeSend: function () {
                            r.isShowLoading == !0 &&
                                (s = setTimeout(function () {
                                    r.loading == null
                                        ? PKLService.loading.addRequest()
                                        : $(r.loading).width() > 0 && $(r.loading).height() > 0
                                        ? ($(r.loading).prepend(n()),
                                          PKLService.loading.addEffect(r.reqeustid, $(r.loading)),
                                          $(r.loading).find(".el-loading-mask").addClass("el-loading-in-content").attr("control-effect-index", r.reqeustid),
                                          $(r.loading)
                                              .find(".el-loading-mask")
                                              .css({ width: $(r.loading).width() + "px", height: $(r.loading).height() + "px", top: "auto", left: "auto", right: "auto", bottom: "auto" }))
                                        : (PKLService.loading.addRequest(), (r.loading = null));
                                }, r.milliSecondsBeforeShowingLoadingIndicator));
                        },
                        contentType: "application/x-www-form-urlencoded",
                        dataType: r.dataType,
                        success: function (n) {
                            if (
                                (clearTimeout(s),
                                r.isShowLoading == !0 && (r.loading == null ? PKLService.loading.removeRequest() : ($(r.loading).find(".el-loading-mask").remove(), PKLService.loading.removeEffect(r.reqeustid))),
                                n.Errors != null && n.Errors.length > 0)
                            ) {
                                var t = "";
                                n.Errors.forEach(function (n) {
                                    t += translate.instant(n.Message) + ". ";
                                });
                                t = t.removeDot();
                                NOFICATION_GLOBAL ? NOFICATION_GLOBAL.update({ type: "codecamp-danger", delay: 5e3, message: t }) : (NOFICATION_GLOBAL = $.notify(t, { type: "codecamp-danger", delay: 5e3 }));
                                typeof r.OnError == "function" && r.OnError.call(this, n, r.parameter);
                            } else r.OnSuccess.call(this, n, r.parameter);
                        },
                        error: function (n) {
                            clearTimeout(s);
                            r.isShowLoading == !0 && (r.loading == null ? PKLService.loading.removeRequest() : ($(r.loading).find(".el-loading-mask").remove(), PKLService.loading.removeEffect(r.reqeustid)));
                            n.Code == undefined
                                ? i(n, r)
                                : n.Code != 200 &&
                                  (NOFICATION_GLOBAL
                                      ? NOFICATION_GLOBAL.update({ type: "codecamp-danger", delay: 5e3, message: translate.instant(n.Message) })
                                      : (NOFICATION_GLOBAL = $.notify(translate.instant(n.Message), { type: "codecamp-danger", delay: 5e3 })));
                            r.OnError.call(this, n, r.parameter);
                        },
                    })
                );
            },
            post: function (t) {
                var s = {
                        url: "",
                        parameter: null,
                        data: {},
                        cache: !1,
                        api: null,
                        isShowLoading: !0,
                        loading: null,
                        reqeustid: "",
                        contentType: "application/x-www-form-urlencoded",
                        processData: !0,
                        timeout: PKLService.ArrConfig.ajaxTimeOut,
                        milliSecondsBeforeShowingLoadingIndicator: 200,
                        reCaptchaSiteKey: null,
                        reCaptchaAction: "homepage",
                        OnSuccess: function () {},
                        OnError: function () {},
                        OnTimedOut: function () {},
                    },
                    r,
                    u,
                    f,
                    e,
                    o;
                return (
                    (t = $.extend(s, t)),
                    (t.reqeustid = PKLService.newid()),
                    (r = ""),
                    (r = t.api == null ? PKLService.ArrConfig.strApiURL + t.url : PKLService.ArrConfig.strApiURL + t.api),
                    (r += "?rk=" + PKLService.newid()),
                    (u = $("input[name=__RequestVerificationToken]").val()),
                    u != undefined && (t.data.__RequestVerificationToken = u),
                    (t.url = r),
                    (e = function () {
                        return (
                            t.isShowLoading == !0 &&
                                (f = setTimeout(function () {
                                    t.loading == null
                                        ? PKLService.loading.addRequest()
                                        : $(t.loading).width() > 0 && $(t.loading).height() > 0
                                        ? ($(t.loading).prepend(n()),
                                          PKLService.loading.addEffect(t.reqeustid, $(t.loading)),
                                          $(t.loading).find(".el-loading-mask").addClass("el-loading-in-content").attr("control-effect-index", t.reqeustid),
                                          $(t.loading)
                                              .find(".el-loading-mask")
                                              .css({ width: $(t.loading).width() + "px", height: $(t.loading).height() + "px", top: "auto", left: "auto", right: "auto", bottom: "auto" }))
                                        : ((t.loading = null), PKLService.loading.addRequest());
                                }, t.milliSecondsBeforeShowingLoadingIndicator)),
                            !0
                        );
                    }),
                    (o = function (n) {
                        var i, r, u;
                        clearTimeout(f);
                        t.isShowLoading == !0 && (t.loading == null ? PKLService.loading.removeRequest() : ($(t.loading).find(".el-loading-mask").remove(), PKLService.loading.removeEffect(t.reqeustid)));
                        n.Errors != null && n.Errors.length > 0
                            ? ((i = ""),
                              n.Errors.forEach(function (n) {
                                  i += translate.instant(n.Message) + ". ";
                              }),
                              (i = i.removeDot()),
                              (r = /(SERVER_MSG_\d+)/g),
                              r.test(i) &&
                                  ((u = i.match(r)),
                                  u.forEach(function (n) {
                                      i = i.replace(n, translate.instant(n));
                                  })),
                              NOFICATION_GLOBAL ? NOFICATION_GLOBAL.update({ type: "codecamp-danger", delay: 5e3, message: i }) : (NOFICATION_GLOBAL = $.notify(i, { type: "codecamp-danger", delay: 5e3 })),
                              typeof t.OnError == "function" && t.OnError.call(this, n, t.parameter))
                            : t.OnSuccess.call(this, n, t.parameter);
                    }),
                    $.ajax({
                        type: "POST",
                        url: r,
                        timeout: t.timeout,
                        data: t.data,
                        processData: t.processData,
                        cache: t.cache,
                        beforeSend: function (n, i) {
                            if (t.reCaptchaSiteKey) {
                                var r = this.data;
                                return (
                                    grecaptcha.ready(function () {
                                        grecaptcha.execute(t.reCaptchaSiteKey, { action: t.reCaptchaAction }).then(function (n) {
                                            typeof r == "string" ? (r += "&RecaptchaResponse=" + n) : (r.RecaptchaResponse = n);
                                            i = $.extend({}, i);
                                            i.beforeSend = e;
                                            i.data = r;
                                            $.ajax(i);
                                        });
                                    }),
                                    !1
                                );
                            }
                            return e(n);
                        },
                        contentType: t.contentType,
                        dataType: "json",
                        success: o,
                        error: function (n) {
                            var e = function (n) {
                                    clearTimeout(f);
                                    t.isShowLoading == !0 && (t.loading == null ? PKLService.loading.removeRequest() : ($(t.loading).find(".el-loading-mask").remove(), PKLService.loading.removeEffect(t.reqeustid)));
                                    n.Code == undefined
                                        ? i(n, t)
                                        : n.Code != 200 &&
                                          (NOFICATION_GLOBAL
                                              ? NOFICATION_GLOBAL.update({ type: "codecamp-danger", delay: 5e3, message: translate.instant(n.Message) })
                                              : (NOFICATION_GLOBAL = $.notify(translate.instant(n.Message), { type: "codecamp-danger", delay: 5e3 })));
                                    t.OnError.call(this, n, t.parameter);
                                },
                                u,
                                r;
                            if (n.status == 524 && ((u = t.OnTimedOut), u && ((r = u(n)), r.fail && r.done))) {
                                r.fail(function (n) {
                                    e(n);
                                }).done(function (n) {
                                    o(n);
                                });
                                return;
                            }
                            e(n);
                        },
                    })
                );
            },
            loading: (function () {
                var t = { intTotalRequest: 0, isloading: !1, panel: "#dvAjaxLaoding" };
                return (
                    (ArrEffect = []),
                    {
                        ArrLoading: {},
                        init: function () {
                            PKLService.loading.ArrLoading = t;
                        },
                        findRequest: function (n) {
                            for (var i = null, t = 0; t < ArrEffect.length; t++) ArrEffect[t].request == n && (i = ArrEffect[t]);
                            return i;
                        },
                        addEffect: function (n, t) {
                            ArrEffect.push({ request: n, scope: t });
                        },
                        removeEffect: function (n) {
                            for (var t = 0; t < ArrEffect.length; t++) ArrEffect[t].request == n && ArrEffect.remove(t);
                        },
                        addRequest: function () {
                            this.ArrLoading.intTotalRequest = this.ArrLoading.intTotalRequest + 1;
                            $(t.panel).length < 1 && ($("body").append('<div id="' + t.panel.replaceAll("#", "") + '"></div>'), $(t.panel).append(n()), $(t.panel).find(".el-loading-mask").addClass("el-loading-full-screen"));
                            PKLService.loading.ArrLoading.isloading = !0;
                        },
                        removeRequest: function () {
                            PKLService.loading.ArrLoading.intTotalRequest = PKLService.loading.ArrLoading.intTotalRequest - 1;
                            PKLService.loading.ArrLoading.intTotalRequest < 0 && (PKLService.loading.ArrLoading.intTotalRequest = 0);
                            PKLService.loading.ArrLoading.intTotalRequest == 0 && (jQuery(t.panel).remove(), (PKLService.loading.ArrLoading.isloading = !1));
                        },
                    }
                );
            })(),
        };
    })(),
    modal = (function () {
        var n = { strEffectClass: "md-effect-8", strConfirmPanel: "pnModalConfigm" },
            t = function (n) {
                function u() {
                    var r = "modal ";
                    n.effect == 1 && (r = r + "fade ");
                    n.scroll == !0 && (r = r + "modal-scroll ");
                    strHTML = '<div class="TMSModal modal-size-' + n.size + " " + r + '"  aria-hidden="true" id="pnModalsPopup_' + t + '" tabindex="' + t + '"';
                    n.size == 1 ? (strHTML = strHTML + 'role="basic"') : n.size == 2 || n.size == 3 ? (strHTML = strHTML + 'role="dialog"') : n.size > 3 && (strHTML = strHTML + 'data-width="' + n.size + '"');
                    strHTML = strHTML + ">";
                    strHTML = strHTML + '<a data-target="#pnModalsPopup_' + +t + '" id="pnModalsPopupShowButton_' + t + '" data-toggle="modal" style="display:none">show model</a>';
                    strHTML =
                        strHTML +
                        '<div style="background-color: white;-webkit-box-shadow: -1px 2px 16px 2px rgba(0,0,0,0.75);-moz-box-shadow: -1px 2px 16px 2px rgba(0,0,0,0.75);box-shadow: -1px 2px 16px 2px rgba(0,0,0,0.75);" class="modal-dialog ' +
                        n.dialogClass +
                        '">';
                    strHTML =
                        n.showHeader == !0
                            ? strHTML + '<div class="modal-header" style="' + n.css.header + '"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button><h4 class="modal-title">Modal Title</h4></div>'
                            : strHTML + '<div class="modal-header header-close-right" style="' + n.css.header + '"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button></div>';
                    strHTML = strHTML + '<div class="modal-body" style="' + n.css.body + '"></div>';
                    n.showFootder == !0 &&
                        ((strHTML = strHTML + '<div class="modal-footer" style="' + n.css.footder + '">'),
                        (strHTML = n.htmlFotder == "" ? strHTML + '<button type="button" class="btn default " data-dismiss="modal">' + translate.instant("SYSTEM_CONFIRM_CONFIRM_CLOSE") + "</button></div>" : strHTML + n.htmlFotder),
                        (strHTML = strHTML + "</div>"));
                    strHTML = strHTML + "</div></div>";
                    $("body").append(strHTML);
                    $("#pnModalsPopup_" + t)
                        .find(".modal-title")
                        .html(n.title);
                    n.url == ""
                        ? ($("#pnModalsPopup_" + t)
                              .find(".modal-body")
                              .html(n.content),
                          i())
                        : $.get(n.url, function (n) {
                              $("#pnModalsPopup_" + t)
                                  .find(".modal-body")
                                  .html(n);
                              i();
                          });
                }
                function i() {
                    $(document)
                        .off("hidden.bs.modal")
                        .on("hidden.bs.modal", "#pnModalsPopup_" + t, function () {
                            modal.removePopup();
                            n.OnClose.call(this);
                        });
                    $("#pnModalsPopupShowButton_" + t).click();
                    $("#pnModalsPopup_" + t)
                        .find('[data-toggle="tooltip"]')
                        .tooltip({ placement: "top" });
                    n.OnInit.call(this, "#pnModalsPopup_" + t);
                }
                var r = {
                        content: "",
                        url: "",
                        title: "Codelearn",
                        size: 1,
                        effect: 1,
                        scroll: !1,
                        htmlFotder: "",
                        showHeader: !0,
                        showFootder: !0,
                        OnClose: function () {},
                        dialogClass: "",
                        css: { header: "", body: "", footder: "" },
                        OnInit: function () {},
                    },
                    t;
                n = $.extend(r, n);
                t = modal.countPopup() + 1;
                u();
            },
            i = function (n) {
                var i = {
                        title: translate.instant("SYSTEM_CONFIRM_CONFIRM_CANCEL_TITLE"),
                        content: "",
                        strOKButton: translate.instant("SYSTEM_CONFIRM_CONFIRM_OK"),
                        strCancelButton: translate.instant("SYSTEM_CONFIRM_CONFIRM_CANCEL"),
                        mode: 1,
                    },
                    t;
                n = $.extend(i, n);
                t = "";
                t =
                    n.OnSuccess == undefined
                        ? '<button type="button" style="min-width: 88px;" action="close" class="btn btn-primary btn-sm btn-confirm-cancel">' + n.strOKButton + "</button>"
                        : '<button type="button" action="close" style="min-width: 88px;" class="btn btn-default btn-sm btn-confirm-cancel" data-dismiss="modal">' +
                          n.strCancelButton +
                          '</button><button type="button" action="confirm" style="min-width: 88px;" class="btn btn-primary btn-sm btn--confirm" >' +
                          n.strOKButton +
                          "</button></div>";
                modal.popup({
                    content: n.content,
                    htmlFotder: t,
                    dialogClass: "modal-confirm",
                    title: n.title,
                    OnInit: function (t) {
                        $(t)
                            .find(".btn-confirm-cancel")
                            .click(function () {
                                modal.removePopup();
                                n.OnCancel && n.OnCancel.call(this);
                            });
                        $(t)
                            .find(".btn--confirm")
                            .click(function () {
                                $(t).find(".btn-confirm-cancel").click();
                                $(this).attr("action") == "confirm" && n.OnSuccess.call(this);
                            });
                    },
                });
            };
        return {
            changeConfig: function (t) {
                n = $.extend(n, t);
            },
            countPopup: function () {
                return $(".TMSModal").length;
            },
            removePopup: function (n) {
                n == undefined ? ($("#pnModalsPopup_" + modal.countPopup() + ",.modal-backdrop").remove(), $("body").css("overflow", "auto")) : ($("#pnModalsPopup_" + n + ",.modal-backdrop").remove(), $("body").css("overflow", "auto"));
            },
            popup: function (n) {
                t(n);
            },
            confirm: function (n) {
                i(n);
            },
            removeConfirm: function () {
                $("#" + n.strConfirmPanel + ",.modal-backdrop").remove();
                $("body").css("overflow", "auto");
            },
        };
    })();
$.fn.loadJS = function (n) {
    for (var t, f, e, r = document.getElementsByTagName("script"), u = !0, i = 0; i < r.length; i++) (t = r[i].getAttribute("src")), t != null && t !== undefined && t.indexOf(n) >= 0 && (u = !1);
    f = PKLService.url() + n;
    u == !0 && ((e = $("<script type='text/javascript' src='" + f + "'>")), $("head").append(e));
};
$.fn.extend({
    downtime: function (n) {
        var t = function (n, t) {
            for (var u = Math.ceil(t / 1e3), r = -1, i = 0; i < n.length; i++) u == n[i] && (r = n[i]);
            return r;
        };
        return this.each(function () {
            var u = { seconds: 5e3, scope: null, expired: translate.instant("PAGES_BATCH_ACTIONS_EXPIRED"), timeNow: new Date(), label: "", timeCallBack: [], data: {}, callback: function () {}, timeOut: function () {} },
                i,
                r;
            n = $.extend(u, n);
            n.scope = $(this);
            i = new Date(n.timeNow).addSeconds(n.seconds);
            i = i.getTime();
            r = setInterval(function () {
                var l = new Date().getTime(),
                    f = i - l,
                    e = Math.floor(f / 864e5),
                    s = Math.floor((f % 864e5) / 36e5),
                    h = Math.floor((f % 36e5) / 6e4),
                    c = Math.floor((f % 6e4) / 1e3),
                    u = "",
                    o;
                n.customTime
                    ? ((u += '<div class="down-time">'),
                      e > 0 && ((u += '<div class="inline-block">'), (u += "<span>" + e + "</span>"), (u += "<span>" + translate.instant("CONTEST_LABEL_DAYS") + "</span>"), (u += "</div>"), (u += '<label class="dot">:</label>')),
                      (u += '<div class="inline-block">'),
                      (u += "<span>" + s + "</span>"),
                      (u += "<span>" + translate.instant("CONTEST_LABEL_HOURS") + "</span>"),
                      (u += "</div>"),
                      (u += '<label class="dot">:</label>'),
                      (u += '<div class="inline-block">'),
                      (u += "<span>" + h + "</span>"),
                      (u += "<span>" + translate.instant("CONTEST_LABEL_MINUTES") + "</span>"),
                      (u += "</div>"),
                      (u += '<label class="dot">:</label>'),
                      (u += '<div class="inline-block">'),
                      (u += "<span>" + c + "</span>"),
                      (u += "<span>" + translate.instant("CONTEST_LABEL_SECONDS") + "</span>"),
                      (u += "</div>"),
                      (u += "</div>"))
                    : (n.label.length > 0 && (u = "<span class='time_label'>" + n.label + "</span>"),
                      (u += "<span class='time_span'>"),
                      e > 0 && (u += "<span class='time_day'>" + e + "</span>" + translate.instant("SYSTEM_TIME_DAY_CHAR") + " "),
                      (u += "<span class='time_hours'>" + s + "</span>"),
                      (u += translate.instant("SYSTEM_TIME_HOUR_CHAR")),
                      (u += " <span class='time_minutes'>" + h + "</span>"),
                      (u += translate.instant("SYSTEM_TIME_MINUTES_CHAR")),
                      (u += " <span class='time_seconds'>" + c + "</span>"),
                      (u += translate.instant("SYSTEM_TIME_SECONDS_CHAR")));
                n.scope.html(u);
                n.timeCallBack.length > 0 && ((o = t(n.timeCallBack, f)), o > -1 && n.callback.call(this, o, n.scope));
                f < 0 && (clearInterval(r), n.scope.html(n.expired), n.timeOut.call(this, n.data, n.scope));
                n.callback.call();
            }, 1e3);
        });
    },
    uptime: function (n) {
        return this.each(function () {
            var r = { startAt: "", scope: null, expired: translate.instant("PAGES_BATCH_ACTIONS_EXPIRED"), timeNow: new Date(), label: "", timeCallBack: [], data: {}, callback: function () {}, timeOut: function () {} },
                t,
                i;
            n = $.extend(r, n);
            n.scope = $(this);
            t = new Date(n.startAt);
            t = t.getTime();
            i = setInterval(function () {
                var e = new Date().getTime(),
                    u = Math.abs(e - t),
                    f = Math.floor(u / 864e5),
                    o = Math.floor((u % 864e5) / 36e5),
                    s = Math.floor((u % 36e5) / 6e4),
                    h = Math.floor((u % 6e4) / 1e3),
                    r = "";
                n.label.length > 0 && (r = "<span class='time_label'>" + n.label + "</span>");
                r = r + "<span class='time_span'>";
                f > 0 && (r = r + "<span class='time_day'>" + f + "</span>" + translate.instant("SYSTEM_TIME_DAY_CHAR") + " ");
                r =
                    r +
                    "<span class='time_hours'>" +
                    o +
                    "</span>" +
                    translate.instant("SYSTEM_TIME_HOUR_CHAR") +
                    " <span class='time_minutes'>" +
                    s +
                    "</span>" +
                    translate.instant("SYSTEM_TIME_MINUTES_CHAR") +
                    " <span class='time_seconds'>" +
                    h +
                    "</span>" +
                    translate.instant("SYSTEM_TIME_SECONDS_CHAR") +
                    " </span>";
                n.scope.html(r);
                n.timeOut.call(this, i);
            }, 1e3);
        });
    },
    DefaultButton: function (n) {
        return this.each(function () {
            $(this).keydown(function (t) {
                return t.keyCode == 13 ? ($("#" + n).click(), t.preventDefault(), !1) : t.keyCode != 13;
            });
        });
    },
    HandleChecked: function () {
        var n = { strAllControl: ".CLSCheckAll", strItemControl: ".CLSItem", OnChangeSelect: function () {} };
        return (
            (options = $.extend(n, options)),
            this.each(function () {
                var n = $(this).find("input" + options.strItemControl),
                    t = function () {
                        for (var t = 0, i = 0; i < n.length; i++) n[i].checked == !0 && (t = t + 1);
                        return t;
                    };
                $(this)
                    .find("input" + options.strAllControl)
                    .bind("change", function () {
                        for (var i = 0; i < n.length; i++) (n[i].checked = this.checked), $(n[i]).change();
                        options.OnChangeSelect.call(this, t());
                    });
                n.bind("change", function () {
                    options.OnChangeSelect.call(this, t());
                });
            })
        );
    },
    paging: function (n) {
        var o = { url: "", data: {}, source: [], OnRender: function () {}, config: {}, label: {}, pageSize: 10, currPage: 0, pageMargin: 2, strCSS: "", loading: null, fullLoading: !1, urlRender: !1 },
            r,
            u,
            t;
        n = $.extend(o, n);
        r = { totalRecode: "Meta.Total", metaCurrPage: "Meta.Page", apiCurrPage: "Page", apiPageSize: "PageSize", changePageSize: !1, urlInit: !1, urlInitPara: "IsInitPaging" };
        u = { totalRecode: !1 };
        n.config = $.extend(r, n.config);
        n.label = $.extend(u, n.label);
        t = { intTotalPage: 0, intCurrPage: 1, intPageSize: 10, intTotalRecode: 10, scope: null, urlRender: !1, intRowFrom: 0, intRowTo: 0, showGoPage: !1, countRequest: 0 };
        t.intPageSize = n.pageSize;
        n.currPage > 0 && (t.intCurrPage = n.currPage);
        var f = function (n, t) {
                return t[t.length - 1] == n ? !0 : !1;
            },
            s = function () {
                var o = window.document.URL.toString().split("?"),
                    i = o[0] + "?",
                    e,
                    u,
                    r;
                if (o.length > 1)
                    for (e = o[1].split("&"), u = 0; u < e.length; u++)
                        (r = e[u].split("=")),
                            r.length > 0 && r[0].toString().toLowerCase() != n.config.apiCurrPage.toLowerCase() && r[0].toString().toLowerCase() != n.config.apiPageSize.toLowerCase() && (i = r.length > 1 ? i + r[0] + "=" + r[1] : i + r[0]),
                            u < e.length - 1 && f("&", i) == !1 && (i = i + "&");
                f("&", i) == !1 && (i = i + "&");
                i = i + n.config.apiCurrPage + "=" + t.intCurrPage + "&" + n.config.apiPageSize + "=" + t.intPageSize;
            },
            i = function () {
                var u, i, f, o, h, c, l, r;
                if (n.url.length > 0) {
                    for (u = PKLService.swithObject(n.data), i = n.url, i.indexOf("?") < 0 && (i += "?"), r = 0; r < u.length; r++) (i = i + u[r].key + "=" + encodeURI(u[r].value)), r < u.length - 1 && (i = i + "&");
                    i = i + "&" + n.config.apiCurrPage + "=" + t.intCurrPage + "&" + n.config.apiPageSize + "=" + t.intPageSize;
                    n.config.urlInit == !0 && ((i = t.countRequest == 0 ? i + "&" + n.config.urlInitPara + "=true" : i + "&" + n.config.urlInitPara + "=false"), (t.countRequest = t.countRequest + 1));
                    f = t.scope;
                    o = !0;
                    n.fullLoading == null ? (o = !1) : n.fullLoading == !0 ? (f = null) : n.loading != null && (f = n.loading);
                    PKLService.get({
                        cache: n.cache,
                        url: i,
                        loading: f,
                        isShowLoading: o,
                        OnSuccess: function (i) {
                            n.urlRender == !0 && s();
                            try {
                                t.intTotalRecode = parseInt(eval("i." + n.config.totalRecode));
                            } catch (u) {
                                t.intTotalRecode = 0;
                            }
                            if (n.config.urlInit == !0) {
                                var r = parseInt(eval("i." + n.config.metaCurrPage));
                                r != undefined && (t.intCurrPage = parseInt(r));
                            }
                            t.intTotalPage = Math.ceil(t.intTotalRecode / t.intPageSize);
                            t.intRowFrom = (t.intCurrPage - 1) * t.intPageSize + 1;
                            t.intRowTo = t.intCurrPage * t.intPageSize;
                            n.OnRender.call(this, i.Data, t.scope.find(".data-gridview-paging"), {
                                currPage: t.intCurrPage,
                                pageSize: t.intPageSize,
                                totalRecode: t.intTotalPage,
                                intRowFrom: t.intRowFrom,
                                intRowTo: t.intRowTo,
                                totalRecord: t.intTotalRecode,
                            });
                            t.intTotalRecode > 0 && (t.intTotalPage > 1 || n.config.changePageSize == !0) ? e() : t.scope.find(".pagination").html("");
                        },
                    });
                } else {
                    for (
                        t.intTotalRecode = n.source.length,
                            t.intTotalPage = Math.ceil(t.intTotalRecode / t.intPageSize),
                            h = (t.intCurrPage - 1) * t.intPageSize + 1,
                            c = t.intCurrPage * t.intPageSize,
                            t.intRowFrom = h,
                            t.intRowTo = c,
                            l = [],
                            r = h;
                        r <= c;
                        r++
                    )
                        r <= n.source.length && l.push(n.source[r - 1]);
                    n.OnRender.call(this, l, t.scope.find(".data-gridview-paging"), { currPage: t.intCurrPage, pageSize: t.intPageSize, totalRecode: t.intTotalPage });
                    t.intTotalRecode > 0 && (t.intTotalPage > 1 || n.config.changePageSize == !0) ? e() : t.scope.find(".pagination").html("");
                }
            },
            e = function () {
                var r = "",
                    o = !0,
                    u,
                    e,
                    f;
                for (
                    t.intCurrPage == 1 && (o = !1),
                        r = r + '<li class="' + $.fn.isVal(o, !0, "page-item", "disabled") + '"><a class="page-link"  data="--"><i class="cl-icon-angle-double-left"></i></a></li></a></li>',
                        r = r + '<li class="' + $.fn.isVal(o, !0, "page-item", "disabled") + '"><a class="page-link"  data="-"><i class="cl-icon-angle-left"></i></a></li>',
                        u = t.intCurrPage - n.pageMargin;
                    u < t.intCurrPage;
                    u++
                )
                    u != t.intCurrPage && u > 0 && (r = r + '<li class="page-item"><a class="page-link number" data="' + u + '">' + u + "</a></li>");
                for (r = r + '<li class="active"><a class="page-link number" data="' + t.intCurrPage + '">' + t.intCurrPage + "</a></li>", u = t.intCurrPage; u <= t.intCurrPage + n.pageMargin; u++)
                    u != t.intCurrPage && u <= t.intTotalPage && (r = r + '<li class="page-item"><a class="page-link number" data="' + u + '">' + u + "</a></li>");
                e = !1;
                t.intCurrPage + 1 <= t.intTotalPage && (e = !0);
                r = r + '<li class="' + $.fn.isVal(e, !0, "page-item", "disabled") + '"><a class="page-link" data="+"><i class="cl-icon-angle-right"></i></a></li>';
                r = r + '<li class="' + $.fn.isVal(e, !0, "page-item", "disabled") + '"><a class="page-link" data="++"><i class="cl-icon-angle-double-right"></i></a></li>';
                n.showGoPage == !0 &&
                    t.intTotalPage >= n.pageMargin * 2 + 1 &&
                    ((r = r + '<li class="page-input"><span style="width:52px;"><input type="number" value="' + t.intCurrPage + '"></span></li>'), (r = r + '<li class="page-item"><a class="page-link" data="GO">GO</a></li>'));
                n.config.changePageSize == !0 &&
                    (r =
                        r +
                        '<li class="page-input"><span><select class="form-control"><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option></select></span></li>');
                n.label.totalRecode == !0 && (r = r + "<li class='page-label'><b>[" + t.intTotalRecode + "]</b></li>");
                t.scope.find(".pagination").html(r);
                n.config.changePageSize == !0 &&
                    ((f = t.scope.find(".pagination").find("select")[0]),
                    $(f).val(t.intPageSize),
                    $(f).val() == null && ($(f).append("<option value='" + t.intPageSize + "'>" + t.intPageSize + "</option>"), $(f).val(t.intPageSize)),
                    t.scope
                        .find(".pagination")
                        .find("select")
                        .bind("change", function () {
                            n.pageSize = $(this).getNumber();
                            t.intPageSize = n.pageSize;
                            t.intCurrPage = 1;
                            i();
                        }));
                t.scope
                    .find(".pagination")
                    .find("li a.number")
                    .click(function (n, r) {
                        if (r) {
                            console.info("Action:", r.action);
                            t.intCurrPage = r.currentPage;
                            i();
                            return;
                        }
                    });
                t.scope
                    .find(".pagination")
                    .find("li.page-item a")
                    .click(function () {
                        var n = $(this).attr("data"),
                            u,
                            r;
                        n == "GO"
                            ? ((u = t.scope.find(".pagination").find("input")[0]), (r = $(u).getNumber()), r >= 1 && r <= t.intTotalPage ? ((t.intCurrPage = r), i()) : $(u).focus())
                            : (n == "+"
                                  ? ((t.intCurrPage = t.intCurrPage + 1), t.intCurrPage > t.intTotalPage && (t.intCurrPage = 1))
                                  : n == "++"
                                  ? (t.intCurrPage = t.intTotalPage)
                                  : n == "-"
                                  ? ((t.intCurrPage = t.intCurrPage - 1), t.intCurrPage < 1 && (t.intCurrPage = t.intTotalPage))
                                  : (t.intCurrPage = n == "--" ? 1 : n.getNumber()),
                              i());
                    });
            };
        return this.each(function () {
            if (((t.scope = $(this)), $(this).html('<div class="data-gridview-paging"></div><div class="col-md-12 text-center paging-common"><ul class="pagination" style="' + n.strCSS + '"></ul></div>'), n.urlRender == !0)) {
                var r = PKLService.getURLParameters(n.config.apiCurrPage),
                    u = PKLService.getURLParameters(n.config.apiPageSize);
                r != null && (t.intCurrPage = parseInt(r));
                u != null && (t.intPageSize = parseInt(u));
            }
            i();
        });
    },
    translate: function () {
        for (var r, t, u, f, e, i = $(this).find("translate:not([label-init='true'])"), n = 0; n < i.length; n++)
            (r = $(i[n]).text()), $(i[n]).html(translate.instant(r)).attr("label-init", "true"), $(i[n]).html(translate.instant(r)).attr("translate-code", r);
        for (t = $(this).find("[translate]"), n = 0; n < t.length; n++)
            (u = $(t[n]).attr("translate")), $(t[n]).attr("label-init") == undefined && u != undefined && ((f = $(t[n]).attr(u)), (e = translate.instant(f)), $(t[n]).attr(u, e), $(t[n]).attr("label-init", "true").attr("translate-code", f));
    },
    getNumber: function () {
        var n = $(this).val(),
            t;
        return n == "" && (n = $(this).html()), n == undefined && (n = "0"), (n = n.replaceAll(",", "")), (t = parseFloat(n)), isNaN(t) ? 0 : t;
    },
    getDateString: function () {
        if ($(this).isDate() == !1) return null;
        var n = new Date($(this).val());
        return n.getDate() < 10 ? "0" + n.getDate() + " " + n.getMonthName() + " " + n.getFullYear() : n.getDate() + " " + n.getMonthName() + " " + n.getFullYear();
    },
    isNumber: function () {
        var n = $(this).val();
        return (n = n.Replace(",", "")), (n = n.trim()), n.length == 0 ? !1 : !isNaN(n);
    },
    isDate: function () {
        var n = $(this).val(),
            t = n;
        return !!(function (n) {
            return n !== "Invalid Date" && !isNaN(n);
        })(new Date(t));
    },
    isEmail: function () {
        var t = $(this).val(),
            n;
        return t.length < 3 ? !1 : ((n = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/), n.test(this.toString()));
    },
    autoReSize: function () {
        return this.each(function () {
            $(this).attr("disabled", "").css({ width: "100%" });
            this.scrollHeight > 0
                ? $(this).css({ height: this.scrollHeight + 5 + "px", border: "none", "background-color": "transparent", resize: "none" })
                : ($(this).hide(),
                  setTimeout(
                      function (n) {
                          $(n).show();
                          $(n).css({ height: n.scrollHeight + "px", border: "none", "background-color": "transparent", resize: "none" });
                      },
                      500,
                      this
                  ));
        });
    },
});
String.prototype.replaceAll = function (n, t) {
    var i = this;
    return i.replace(new RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), t);
};
Number.prototype.between = function (n, t) {
    var i = Math.min.apply(Math, [n, t]),
        r = Math.max.apply(Math, [n, t]);
    return this >= i && this <= r;
};
Date.prototype.addSeconds = function (n) {
    return this.setSeconds(this.getSeconds() + n), this;
};
Date.prototype.addMinutes = function (n) {
    return this.setMinutes(this.getMinutes() + n), this;
};
Date.prototype.addDays = function (n) {
    var t = new Date(this.valueOf());
    return t.setDate(t.getDate() + n), t;
};
Date.prototype.getDateString = function () {
    return this.getDate() < 10 ? "0" + this.getDate() + " " + this.getMonthName() + " " + this.getFullYear() : this.getDate() + " " + this.getMonthName() + " " + this.getFullYear();
};
String.prototype.getJSONDate = function () {
    var n = this.toString(),
        t = new Date(parseInt(n.replace("/Date(", "")));
    return console.log(), t.getDateString();
};
Date.prototype.getMonthName = function () {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][this.getMonth()];
};
Date.prototype.getDayName = function () {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDay()];
};
String.prototype.getLocalDate = function () {
    var t = { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZoneName: "short" },
        i = moment(this, "YYYY-MM-DD HH:mm:ss [GMT]ZZ").locale(LANG_CURRENT == "jp" ? "ja" : LANG_CURRENT),
        n = new Date(i),
        r = LANG_CURRENT == "vn" ? "vi-VN" : LANG_CURRENT == "jp" ? "ja-JP" : "en-US";
    return n.getHours() >= 0 ? n.toLocaleTimeString(r, t) : PKLService.ArrConfig.strLangCode == "en" ? n.toLocaleDateString("en-US", t) : n.toLocaleDateString("ja", t);
};
String.prototype.getLocalDateShort = function () {
    var t = { year: "numeric", month: "2-digit", day: "numeric", timeZoneName: "short" },
        i = moment(this, "YYYY-MM-DD HH:mm:ss [GMT]ZZ").locale(LANG_CURRENT == "jp" ? "ja" : LANG_CURRENT),
        n = new Date(i),
        r = LANG_CURRENT == "vn" ? "vi-VN" : LANG_CURRENT == "jp" ? "ja-JP" : "en-US";
    return n.getHours() >= 0 ? n.toLocaleTimeString(r, t) : PKLService.ArrConfig.strLangCode == "en" ? n.toLocaleDateString("en-US", t) : n.toLocaleDateString("ja", t);
};
String.prototype.isEmail = function () {
    var t = this,
        n;
    return t.length < 3 ? !1 : ((n = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/), n.test(this.toString()));
};
String.prototype.getNumber = function () {
    var n = this,
        t;
    return n == "" && (n = $(this).html()), n == undefined && (n = "0"), (n = n.replaceAll(",", "")), (t = parseFloat(n)), isNaN(t) ? 0 : t;
};
$.fn.isVal = function (n, t, i, r) {
    return n == t ? i : r == undefined ? n : r;
};
String.prototype.getDate = function () {
    var n = this.toString(),
        t = moment(n);
    return new Date(t);
};
String.prototype.render = function () {
    function t(n, t) {
        for (var i = t.split("."); i.length && (n = n[i.shift()]); );
        return n;
    }
    var n = (arguments && arguments[0]) || window;
    return this.replace(/{{.*?}}/g, function (i) {
        try {
            var r = i.replace(/{|}/gi, "");
            return /(.*?)/.test(r) && ((r = r.replace(/\((.*?)\)/, '(getValue(otherData, "$1"))')), (r = r.trim())), t(n, r) || eval(r) || i;
        } catch (u) {
            console.error(new Error("Sai cÃº phÃ¡p: " + u.message));
        }
    });
};
Array.prototype.remove = function (n, t) {
    var i = this.slice((t || n) + 1 || this.length);
    return (this.length = n < 0 ? this.length + n : n), this.push.apply(this, i);
};
String.prototype.removeDot = function () {
    var n = this,
        t;
    return n ? (((t = n.lastIndexOf(".")), t) ? n.slice(0, t) : n) : n;
};
String.prototype.translate = function () {
    var n = this,
        t = /(SERVER_MSG_\d+)/g,
        i;
    return (
        t.test(n) &&
            ((i = n.match(t)),
            i.forEach(function (t) {
                n = n.replace(t, translate.instant(t));
            })),
        n
    );
};
String.prototype.toHHMMSS = function () {
    var r = parseInt(this, 10),
        n = Math.floor(r / 3600),
        t = Math.floor((r - n * 3600) / 60),
        i = r - n * 3600 - t * 60;
    return n < 10 && (n = "0" + n), t < 10 && (t = "0" + t), i < 10 && (i = "0" + i), n + ":" + t + ":" + i;
};
window.addEventListener("resize", function () {
    for (var r, t, i = $("body .el-loading-in-content"), n = 0; n < i.length; n++)
        (r = $(i[n]).attr("control-effect-index")), r != undefined && ((t = PKLService.loading.findRequest(r)), t != null && $(i[n]).css({ width: $(t.scope).width() + "px", height: $(t.scope).height() + "px" }));
    checkVerScrollBarDisplay();
});
window.addEventListener("load", function () {
    checkVerScrollBarDisplay();
});
String.prototype.trimEnd ||
    (String.prototype.trimEnd = function () {
        return this.replace(/\s+$/, "");
    });
Node.prototype.isVisuallyEmpty = function () {
    var n = ["IMG", "HR"],
        t = $(this).text().trim() == "";
    return this.tagName
        ? !n.includes(this.tagName) &&
              !new RegExp(
                  n
                      .map(function (n) {
                          return "<" + n;
                      })
                      .join("|"),
                  "i"
              ).test($(this).html()) &&
              t
        : t;
};
$.fn.trimmedHtml = function () {
    return (
        this.contents()
            .toArray()
            .reverse()
            .every(function (n) {
                var i = n.isVisuallyEmpty(),
                    t;
                return i ? $(n).remove() : ((t = $(n).html()), t && $(n).html(t.replace(/((&nbsp;\s*)|\s)+$/, ""))), i;
            }),
        this.html().trimEnd()
    );
};
String.prototype.trimEndHTML = function () {
    return $("<div>").html(this).trimmedHtml();
};
String.prototype.escapeHtml = function () {
    return this.replace(/[<]/g, "&lg;").replace(/[>]/g, "&gt;");
};
String.prototype.ellipsize = function (n) {
    return this.length <= n ? this : this.substr(0, n) + "...";
};
select2Language = {
    errorLoading: function () {
        return translate.instant("SELECT2_MESSAGE_ERROR_LOADING");
    },
    inputTooLong: function (n) {
        var t = n.input.length - n.maximum;
        return translate.instant("SELECT2_MESSAGE_INPUT_TOO_LONG", t, t != 1 ? "s" : "");
    },
    inputTooShort: function (n) {
        var t = n.minimum - n.input.length;
        return translate.instant("SELECT2_MESSAGE_INPUT_TOO_SHORT", t);
    },
    loadingMore: function () {
        return translate.instant("SELECT2_MESSAGE_LOADING_MORE");
    },
    maximumSelected: function (n) {
        return translate.instant("SELECT2_MESSAGE_MAXIMUM_SELECTED", n.maximum, n.maximum != 1 ? "s" : "");
    },
    noResults: function () {
        return translate.instant("SELECT2_MESSAGE_NO_RESULTS");
    },
    searching: function () {
        return translate.instant("SELECT2_MESSAGE_SEARCHING");
    },
    removeAllItems: function () {
        return translate.instant("SELECT2_MESSAGE_REMOVE_ALL_ITEMS");
    },
};
getAllProperties = function (n) {
    var t = [];
    do t = t.concat(Object.getOwnPropertyNames(n));
    while ((n = Object.getPrototypeOf(n)));
    return t;
};
HTMLElement.prototype.extractComputedStyle = function (n, t) {
    var c = this.tagName,
        i = document.createElement("iframe"),
        h;
    i.style.cssText = "display: none !important";
    document.body.appendChild(i);
    var f = i.contentWindow,
        e = f.document,
        o = e.createElement(c);
    e.body.appendChild(o);
    var r = f.getComputedStyle(o),
        s = getComputedStyle(this),
        u = Object.keys(r);
    return (
        u.length === 0 && (u = getAllProperties(r)),
        (h = u.filter(function (t) {
            return !/\d+/.test(t) && r[t] != s[t] && !n.includes(t);
        })),
        document.body.removeChild(i),
        h
            .map(function (n) {
                var i = n.replace(/[a-z][A-Z]/g, function (n) {
                        return n[0] + "-" + n[1].toLowerCase();
                    }),
                    r;
                return i.startsWith("webkit") && (i = "-" + i), (r = t ? t(i) : undefined), i + ": " + (r === undefined ? s[n] : r);
            })
            .join(";")
    );
};
HTMLElement.prototype.getHTMLWithCurrentStyle = function () {
    var n = this.tagName,
        t = this.extractComputedStyle(),
        i = this.outerHTML;
    return i.replace(new RegExp("^<" + n, "i"), "$& style='" + t + "'");
};
HTMLElement.prototype.genInnerHTMLWithCurrentStyle = function (n) {
    n = n || "div";
    var u = this.tagName,
        t = HTMLElement.prototype.extractComputedStyle.bind(this),
        i = t(),
        r = this.innerHTML;
    return "<" + n + " style='" + i + "'>" + r + "</" + n + ">";
};
HTMLElement.prototype.embedComputedStyle = function (n, t) {
    var i = HTMLElement.prototype.extractComputedStyle.bind(this),
        r = i(n, t);
    this.setAttribute("style", r);
};
String.prototype.unescapeHtml = function () {
    return this.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};
__picker = $.fn.datepicker;
$.fn.datepicker = function (n) {
    if (n === "isValid") {
        var i = __picker.apply(this, ["getDate"]),
            r = __picker.apply(this, ["option", "dateFormat"]) || "mm/dd/yy",
            u = $.datepicker.formatDate(r, i),
            f = this.val(),
            t = u === f;
        return this.toggleClass("valid", t).toggleClass("error", !t), t;
    }
    return __picker.apply(this, arguments);
};
createDummyContainer = function (n) {
    var t = document.createElement("div");
    return (
        (t.style.cssText = n),
        (t.style.boxSizing = "border-box"),
        (t.style.display = "inline-block"),
        (t.style.visibility = "hidden"),
        (t.style.maxHeight = ""),
        (t.style.maxWidth = ""),
        (t.style.width = "auto"),
        (t.style.height = "auto"),
        document.body.appendChild(t),
        t
    );
};
HTMLElement.prototype.getComputedCssText = function () {
    var r = getComputedStyle(this),
        t = r.cssText,
        n,
        i;
    if (!t) {
        t = "";
        for (n in r)
            typeof n != "string" ||
                /^\d+$/.test(n) ||
                ((i = r[n]),
                typeof i == "string" &&
                    i &&
                    (t +=
                        n.replace(/[A-Z]/g, function (n) {
                            return "-" + n.toLowerCase();
                        }) +
                        ":" +
                        i +
                        ";"));
    }
    return t;
};
String.prototype.getHeight = function (n, t) {
    var i = createDummyContainer(t),
        r;
    return (i.style.width = n + "px"), (i.innerHTML = this), (r = i.offsetHeight), document.body.removeChild(i), r;
};
String.prototype.getSingleLineRect = function (n) {
    var t = createDummyContainer(n),
        i,
        r;
    return (t.style.whiteSpace = "nowrap"), (t.innerHTML = this), (i = t.offsetWidth), (r = t.offsetHeight), document.body.removeChild(t), { width: i, height: r };
};
String.prototype.getSingleLineWidth = function (n) {
    return this.getSingleLineRect(n).width;
};
String.prototype.getSingleLineHeight = function (n) {
    return this.getSingleLineRect(n).height;
};
String.prototype.getStringFitInRect = function (n, t, i) {
    var f;
    if ((n instanceof HTMLElement && ((n.width = n.offsetWidth), (n.height = n.offsetHeight), (t = n.getComputedCssText())), (f = this.getHeight(n.width, t)), f <= n.height)) return this;
    for (var r = this, u = Math.ceil(r.length / 2), o = u, e = 1, s = !1; f != n.height || Math.abs(u) != 1; ) {
        if (((u = e * Math.ceil(Math.abs(u) / 2)), u == 0 && (u = e), (o += u), (r = this.substring(0, Math.min(o, this.length))), s && e == -1)) break;
        s = f < n.height && Math.abs(u) == 1;
        f = r.getHeight(n.width, t);
        e = f > n.height ? -1 : 1;
    }
    return i && (r = r.length <= 3 ? i : r.substring(0, r.length - 3) + i), r;
};
HTMLElement.prototype.ellipsize = function (n, t) {
    var u = this,
        r = "",
        i,
        f;
    arguments.length == 1 && (isNaN(n) ? n && n.width && n.height && !isNaN(n.width) && !isNaN(n.height) && ((u = n), (r = this.getComputedCssText())) : ((t = n), (n = this.offsetWidth)));
    i = this.innerHTML;
    i || (i = this.title);
    n && t && ((r = this.getComputedCssText()), (f = i.getSingleLineHeight(r)), (u = { width: n, height: f * t }));
    this.innerHTML = i.getStringFitInRect(u, r, "...");
};
Array.prototype.includes ||
    Object.defineProperty(Array.prototype, "includes", {
        enumerable: !1,
        value: function (n) {
            var t = this.filter(function (t) {
                return t == n;
            });
            return t.length > 0;
        },
    });
String.prototype.includes ||
    (String.prototype.includes = function (n) {
        return this.indexOf(n) >= 0;
    });
String.prototype.endsWith ||
    (String.prototype.endsWith = function (n, t) {
        return (t === undefined || t > this.length) && (t = this.length), this.substring(t - n.length, t) === n;
    });
String.prototype.startsWith ||
    (String.prototype.startsWith = function (n) {
        return this.indexOf(n) == 0;
    });
String.prototype.escapeRegExp = function () {
    return this.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};
String.prototype.IsNullOrEmpty = function () {
    var n = this;
    return isStringNullOrEmpty(n);
};
String.prototype.IsNullOrWhiteSpace = function () {
    var n = this;
    return isStringNullOrEmpty(n) || n.replace(/\s/g, "") === "";
};
String.prototype.toGMTFormat = function (n) {
    var t = this,
        i = new Date(),
        u = i.getFullYear() + "/" + (i.getMonth() + 1) + "/" + i.getDate() + " " + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds(),
        r;
    return (
        (!t || t.length <= 0) && (t = u),
        (r = (-i.getTimezoneOffset() / 60).toString()),
        (r = r.padStart(2, "0").padEnd(4, "0")),
        t.indexOf("GMT") < 0 && (t = t.concat(" GMT+" + r)),
        n === !0 ? moment.utc(t, "YYYY-MM-DD HH:mm:ss [GMT]ZZ").format("YYYY-MM-DD HH:mm:ss [GMT]ZZ") : moment(t, "YYYY-MM-DD HH:mm:ss [GMT]ZZ").format("YYYY-MM-DD HH:mm:ss [GMT]ZZ")
    );
};
var imgComment = resourcePath + "/Images/code-learn/challenges-comment.svg?v=1",
    imgUser = resourcePath + "/Images/code-learn/challenges-user.svg?v=1",
    imgTaskPoint = resourcePath + "/Images/code-learn/challenges-task-point.svg?v=1",
    imgDone = resourcePath + "/Images/code-learn/done.svg",
    imgIncomplete = resourcePath + "/Images/code-learn/incomplete.svg";
String.prototype.renderKeyForItem = function () {
    return Date.now();
};
$.Templates = {
    formatShortDate: function (n) {
        return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(n);
    },
    createTag: function (n) {
        var i, t;
        if (n == "") return "";
        for (i = n.split(","), txt = "", t = 0; t < i.length; t++) txt += '<span class="tag tag-default">' + i[t] + "</span>";
        return txt;
    },
    ellipsizeTaskNames: function () {},
    renderTaskSummary: function (n, t, i, r, u, f) {
        var o = t ? '<img class="img-done" src="' + imgDone + '"/>' : "",
            s = i ? '<img class="img-done" src="' + imgIncomplete + '"/>' : "",
            h = n.Name,
            c = n.UserLevel.IsAdmin ? " admin" : n.UserLevel.IsContributor ? " contributor" : "",
            e =
                '<div class="card-body text-primary">                                ' +
                o +
                s +
                '<table class="task">                                    <tr>        \t\t                        <td class="task-creator">                                            <div class="task-infor"><a class="task-name" href="' +
                r +
                n.Id +
                '" title="' +
                n.Name +
                '">' +
                h +
                '</a>                                            <span class="badge badge-secondary ' +
                n.Level.toLowerCase() +
                '">' +
                translate.status(n.Level) +
                '</span></div>                                        </td>                                    </tr>                                    <tr>        \t\t                        <td class="tag-info">                                            <p class="tag-info">' +
                this.createTag(n.Tags) +
                '</p>                                        </td>                                    </tr>\t                                <tr>\t\t                                <td class="task-creator-label' +
                c +
                '">                                            <img src="' +
                s3Storage +
                n.UserExpLevel.IconUrl +
                '" class="level-avatar"/>                                             <img src="' +
                s3Storage +
                n.CreatorAvatarUrl.replace("~", "") +
                '" class="user-avatar"/>                                        </td>\t                                </tr>                                    <tr>\t\t                                <td>                                            <a class="owner" href=' +
                cvUrl +
                n.CreatorUserId +
                ">" +
                n.AccountName +
                '</a>                                        </td>\t                                </tr>                                </table>                                <div class="container-info">                                        <table class="task-info"><tr>                                            <td>                                                <img class="img-student" src="' +
                imgUser +
                '">                                                <span class="span-user-submit">' +
                n.TotalUserCompleted +
                "/" +
                n.TotalUserSubmitted +
                '</span>                                            </td>                                            <td>                                                <img class="img-comment" src="' +
                imgComment +
                '">                                                <span class="span-comment">' +
                n.TotalComments +
                '</span>                                            </td>                                            <td>                                                <img class="img-point" src="' +
                imgTaskPoint +
                '">                                                <span class="task-point">' +
                n.Point +
                "</span>                                            </td>                                        <tr/></table>                                </div>                            </div>";
        return f && (e = f(e)), e;
    },
    renderCountDownTimeDisplay: function (n, t) {
        var i, r;
        t = t || !1;
        i = Math.floor(n / 86400);
        n -= i * 86400;
        r = Math.floor(n / 3600);
        n -= r * 3600;
        var u = Math.floor(n / 60),
            e = n - u * 60,
            o = [
                "<div class='count-down-part count-down-days' data-label='" + translate.instant("CONTEST_LABEL_DAYS") + "'>" + i + "</div>",
                "<div class='count-down-part count-down-hours' data-label='" + translate.instant("CONTEST_LABEL_HOURS") + "'>" + r + "</div>",
                "<div class='count-down-part count-down-minutes' data-label='" + translate.instant("CONTEST_LABEL_MINUTES") + "'>" + u + "</div>",
                "<div class='count-down-part count-down-seconds' data-label='" + translate.instant("CONTEST_LABEL_SECONDS") + "'>" + e + "</div>",
            ],
            f = o.join(":");
        return t ? "<div>" + f + "</div>" : f;
    },
};
HTMLImageElement.prototype.fallbackImage = function (n) {
    this.onerror = function () {
        this.src = n;
    };
};
window.getLocationBase = function () {
    return location.protocol + "//" + location.host;
};
$(function () {
    setCurrentmenu();
});
$(window).load(function () {
    var u, i;
    if ($(".site-header")[0]) {
        var t = $(".site-header"),
            n = t.parent(),
            r = 0;
        let i = t.outerHeight();
        i = !i ? "70" : i;
        n.css("height", i);
        $(window).resize(function () {
            r != $(window).width() &&
                ((r = $(window).width()),
                n.css("height", ""),
                (i = t.outerHeight()),
                (i = !i ? "70" : i),
                setTimeout(function () {
                    n.css("height", i);
                }, 300),
                n.removeClass("is-sticky"));
        });
        u = n.offset().top - $("body").offset().top;
        $(window).on("scroll", function () {
            var t = $(window).scrollTop();
            u < t ? n.not(".is-sticky").addClass("is-sticky") : n.removeClass("is-sticky");
        });
    }
    i = 0;
    $(window)
        .resize(function () {
            $(window).width() != i && (AdaptiveIframe(), (i = $(window).width()));
        })
        .resize();
});
$(function () {
    $(document).on("click", ".change-lang", function () {
        var n = location.href.replace(location.origin, "");
        window.location = window.location = $(this).attr("data-link") + (n == "/" ? "" : n);
    });
    $(document).on("click", ".header-user-profile .btn--profile", function () {
        $(this).closest(".header-user-profile").toggleClass("open");
    });
    $(document).on("click", function (n) {
        var t = $(".header-user-profile");
        t.is(n.target) || t.has(n.target).length !== 0 || $(".header-user-profile").removeClass("open");
    });
    $(document).on("click", ".btn--language, #notify", function () {
        $(".header-user-profile").removeClass("open");
    });
    $(document).on("click", ".header-user-profile a", function (n) {
        $(this).attr("href") != "#" ? $(this).closest(".header-user-profile").removeClass("open") : n.preventDefault();
    });
    $(document).on("click", ".dropdown-menu-user .group-links>a", function (n) {
        n.preventDefault();
        $(this).closest(".group-links").toggleClass("show-sub");
        $(this).closest(".group-links").find("ul").slideToggle();
    });
});
