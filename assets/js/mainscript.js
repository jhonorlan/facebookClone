$(document).ready(function() {
    let t = ["home", "watch", "marketplace", "groups", "gaming", "messages", "photo", "stories", "settings"],
        e = [],
        n = [],
        i = L("t"),
        s = !1,
        a = null,
        o = [],
        c = [],
        d = [],
        l = !1,
        r = null;

    function p(t, e, n, i, s) {
        if ("combine" != e) {
            i && (i = function(t) {
                return {
                    grayscale: "1",
                    sepia: "100%",
                    blur: "5px",
                    saturate: "2",
                    hue: "140deg",
                    invert: ".8",
                    darken: ".5",
                    contrast: "2"
                } [t]
            }(e));
            let a = {
                    grayscale: "grayscale(" + i + ")",
                    sepia: "sepia(" + i + ")",
                    blur: "blur(" + i + ")",
                    saturate: "saturate(" + i + ")",
                    hue: "hue-rotate(" + i + ")",
                    invert: "invert(" + i + ")",
                    darken: "brightness(" + i + ")",
                    contrast: "contrast(" + i + ")"
                },
                o = "";
            n ? (c.push(a[e]), d.push(e)) : (c.splice(a[e]), d.splice(e));
            for (let t = 0; t < c.length; t++) o += c[t] + " ";
            s ? t.css("filter", o) : t.style.filter = o
        }
        s ? t.hasClass("combine") ? t.removeClass("combine") : "combine" == e && t.addClass("combine") : t.classList.contains("combine") ? t.classList.remove("combine") : t.classList.add("combine")
    }

    function v(t) {
        $.ajax({
            url: "data/fetchReaction.php",
            type: "POST",
            data: {
                id: t
            },
            success: function(e) {
                $(".reactions-" + t).html(e), $(".reactions-" + t).removeClass("none")
            }
        })
    }
    $(document).on("click", ".all-contacts .right-content-content", function() {
        let t = $(this).find("div").eq(0).html(),
            e = $(this).find("img").attr("src");
        G({
            id: $(this).find("div").eq(0).data("id"),
            name: t,
            picture: e,
            color: "#0084FF"
        })
    }), $(document).on("click", ".message-inbox li", function() {
        let t = $(this).find("div").find("span").html(),
            e = $(this).find("img").attr("src"),
            n = $(this).data("id");
        $(this).parent().parent().hasClass("message-li-list") ? ($(this).parent().parent().css("display", "none"), $(".nav-right .circles .item").removeClass("active"), G({
            id: n,
            name: t,
            picture: e,
            color: "#0084FF"
        })) : H({
            id: n,
            name: t,
            picture: e,
            color: "#0084FF"
        })
    }), $(document).on("click", ".tab-close", function() {
        let t = $(this).parent().data("token"),
            e = $(this).parent().data("name");
        $(".m-" + t).remove(), n.splice(e)
    }), $(document).on("click", ".tab-minimize", function() {
        let t = $(this).parent().data("token"),
            n = $(this).parent().data("name"),
            i = $(this).parent().data("picture");
        var s;
        $(".m-" + t).hide(), e.includes(n) || (e.push(n), s = {
            name: n,
            picture: i,
            token: t
        }, $.getJSON("data/getLastMessage.php", {
            name: s.name
        }, function(t, e) {
            let n = ' \n\t\t\t\t\t\t<div class="item" data-token="' + s.token + '" data-name="' + s.name + '">\n\t\t\t\t\t \t\t<img src="' + s.picture + '">\n\t\t\t\t\t \t\t<div class="button">\n\t\t\t\t\t \t\t\t<i class="fa fa-times"></i>\n\t\t\t\t\t \t\t</div>\n\t\t\t\t\t \t\t<div class="desc">\n\t\t\t\t\t \t\t\t<div class="content">\n\t\t\t\t\t \t\t\t\t<a href="#">' + s.name + "</a>\n\t\t\t\t\t \t\t\t\t<span>" + t.message + '</span>\n\t\t\t\t\t \t\t\t\t<div class="triangle"></div>\n\t\t\t\t\t \t\t\t</div>\n\t\t\t\t\t \t\t</div>\n\t\t\t\t\t </div>\n\t\t\t\n\t\t\t\t';
            $(".float-box").prepend(n)
        }))
    }), $(document).on("click", ".float-box .item img", function() {
        let t = $(this).parent().data("token"),
            n = $(this).parent().data("name");
        $(".m-" + t).show(), $(this).parent().remove(), e.splice(n)
    }), $(document).on("click", ".float-box .item .button", function() {
        $(this).parent().remove()
    }), $(document).on("click", ".nav-right .circles .item", function() {
        let t = $(this).find("div").html().toLowerCase();
        $(".menu-menu").not($(".menu-" + t)).css("display", "none"), $(".nav-right .circles .item").not($(this)).removeClass("active"), $(".menu-" + t).is(":visible") ? ($(".menu-" + t).css("display", "none"), $(this).removeClass("active")) : ($(".menu-" + t).css("display", "block"), $(this).addClass("active")), "messenger" == t && Q()
    }), $(document).on("click", ".switch", function() {
        let t, e = $(this).find("div").attr("value"),
            n = $(this).find("div").width();
        if ("off" == e) {
            if (t = "on", $(this).find("div").css("margin-left", "+=" + n), $(this).addClass("active"), $(this).hasClass("image-filter")) {
                let t = $(this).data("value");
                p($(".appended-image-background"), t, !0, !0, !0)
            } else if ($(this).hasClass("story-image-filter")) {
                let t = $(this).data("value");
                p(a, t, !0, !0, !1)
            }
        } else if (t = "off", $(this).find("div").css("margin-left", "0px"), $(this).removeClass("active"), $(this).hasClass("image-filter")) {
            let t = $(this).data("value");
            p($(".appended-image-background"), t, !1, !0, !0)
        } else if ($(this).hasClass("story-image-filter")) {
            let t = $(this).data("value");
            p(a, t, !1, !0, !1)
        }
        $(this).find("div").attr("value", t)
    }), $(document).on("click", ".center-content", function() {
        W()
    }), $(document).on("click", ".left-content", function() {
        W()
    }), $(document).on("click", ".right-content", function() {
        W()
    }), $(document).on("keypress", ".message-textarea", function(t) {
        let e = t.keyCode,
            n = $(this).html(),
            i = $(this).parent().data("id"),
            s = $(this).parent().data("token"),
            a = $(this).parent().data("color");
        if (0 != $(this).html().length ? $(this).addClass("focus") : $(this).removeClass("focus"), 13 == e && 0 != $(this).html().length)
            if (t.shiftKey);
            else {
                let e = "no";
                t.preventDefault(), $(this).html(""), K({
                    reciever: i,
                    message: n,
                    token: s,
                    color: a,
                    isTyping: e
                }), Y({
                    reciever: i,
                    message: n,
                    token: s,
                    color: a,
                    emoji: !1
                })
            }
    }), $(document).on("focus", ".message-textarea", function() {
        R();
        let t = $(this).html(),
            e = $(this).parent().data("id"),
            n = $(this).parent().data("token"),
            i = $(this).parent().data("color");
        0 == t.length ? isTyping = "no" : isTyping = "yes", K({
            reciever: e,
            message: t,
            token: n,
            color: i,
            isTyping: isTyping
        }), X(n, i)
    }), $(document).on("blur", ".message-textarea", function() {
        let t = $(this).html(),
            e = $(this).parent().data("id"),
            n = $(this).parent().data("token");
        K({
            reciever: e,
            message: t,
            token: n,
            color: $(this).parent().data("color"),
            isTyping: "no"
        }), R(), X(n, "#E4E6EB"), $(this).removeClass("focus")
    }), $(document).on("click", ".message-container #body", function() {
        X($(this).parent().data("token"), $(this).parent().data("color"))
    }), $(document).on("click", ".user-post-container #video-content video", function() {
        let t = $(this).get(0);
        if (t.pause) return t.play(), !1;
        t.pause()
    }), $(document).on("click", ".layout .item", function() {
        let t, e, n = $(this).data("view");
        $(n).css("display", "block"), $(".view").not(n).css("display", "none"), $("html,body").animate({
                scrollTop: 0
            }, 500), "facebook" == n ? (t = "Jhon Orlan Tero | Facebook", e = "image/facebook-logo.png") : "twitter" == n ? (t = "Jhon Orlan Tero | Twitter", e = "image/twitter-logo.png") : "instagram" == n && (t = "Jhon Orlan Tero | Instagram", e = "image/Instagram.png"), M(t),
            function(t) {
                $(".rel").attr("href", t)
            }(e)
    }), $(document).on("click", ".open-profile", function() {
        $(".profile-body").css("display", "block"), $(".home-body").css("display", "none"), $(this).addClass("active"), $.getJSON("data/getSession.php", function(t, e) {
            N(t), E(t)
        }), O()
    }), $(document).on("click", ".open-home", function() {
        $(".profile-body").css("display", "none"), $(this).addClass("active"), $(".open-profile").removeClass("active"), $(".home-body").css("display", "block")
    }), $(document).on("click", ".open-messenger", function() {
        _("messages"), N("messages")
    }), $(document).on("click", ".nav-center .item", function() {
        let t = $(this).find("div").html().toLowerCase();
        "more" != t && (_(t), T($(this)), N(t), $(".nav-center .item").each(function() {
            let e = $(this).find("div").html().toLowerCase();
            t != e && function(t) {
                t.find("svg").each(function() {
                    $(this).hasClass("filled") ? $(this).remove() : $(this).show()
                })
            }($(this))
        }))
    }), $(document).on("focus", ".post-text-area", function() {
        $(".newPostTextArea-container").css("display", "flex")
    }), $(document).on("click", ".newPostTextArea-container .background", function() {
        $(".newPostTextArea-container").css("display", "none")
    }), $(document).on("click", ".newPostTextArea-container .close", function() {
        $(".newPostTextArea-container").css("display", "none")
    }), $(".theme-container .item").each(function() {
        let t = $(this).data("bg");
        $(this).css("background", t)
    }), $(document).on("click", ".main-theme-button", function() {
        $(".all-themes").is(":visible") ? $(".all-themes").slideUp() : $(".all-themes").slideDown()
    }), $(document).on("click", ".all-themes .item", function() {
        let t = $(this).data("bg");
        $(".newPostTextArea #body .main-container").hasClass("theme") ? "#FFF" == t && $(".newPostTextArea #body .main-container").removeClass("theme") : $(".newPostTextArea #body .main-container").addClass("theme"), $(".newPostTextArea #body .main-container").css("background", t), $(".text-area-background").val(t)
    }), $(document).on("click", ".setting", function() {
        $(this).parent().parent().find("div").eq(0).toggle()
    }), $(document).on("click", ".message-container #body", function() {}), $(document).on("submit", ".post-container-form", function() {
        let t = new FormData($(this)[0]);
        $.ajax({
            url: "data/insertPost.php",
            type: "POST",
            cache: !1,
            processData: !1,
            contentType: !1,
            data: t
        }).done(function(t) {
            J()
        }).fail(function() {}).always(function() {
            $(".post-main-container").css("display", "none"), $(".post-main-container input").val(""), $(".post-main-container contenteditable").html("")
        })
    }), $(document).on("input", ".main-text-area", function() {
        let t = $(this).html();
        $(".my-post-text").val(t)
    }), $(document).on("click", ".upload-images-button", function() {
        $(".text-area-images").click()
    }), $(document).on("change", ".text-area-images", function(t) {
        let e = document.querySelector(".text-area-images").files.length;
        for (let n = 0; n < e; n++) $(".post-image-preview").append("<img src='" + URL.createObjectURL(t.target.files[n]) + "' class='images-" + n + "' >");
        $(".hasimage").val("yes")
    }), $(document).on("click", ".main-like-post", function() {
        let t = $(this).parent().data("id"),
            e = $(this).find("span").html().toLowerCase(),
            n = $(this).find("span").html();
        $.ajax({
            url: "client/postManagement.php",
            type: "POST",
            data: {
                action: e,
                id: t
            },
            success: function() {
                v(t), $(".react-buttons").each(function() {
                    let e = $(this).data("id");
                    t == e && ($(this).find("div").eq(0).find("span").html(n), $(this).find("div").eq(0).find("img").attr("src", "image/reactions/svg/like.svg"))
                })
            }
        })
    }), $(document).on("click", ".reaction-container .item", function() {
        let t = $(this).parent().data("id"),
            e = $(this).find("span").html(),
            n = $(this).find("span").html().toLowerCase(),
            i = "image/reactions/svg/" + n + ".svg";
        $.ajax({
            url: "client/postManagement.php",
            type: "POST",
            data: {
                action: n,
                id: t
            },
            success: function(n) {
                "delete" == n ? (e = "Like", i = "svg/like.svg") : "update" != n && "insert" != n || $.getJSON("data/getPostInformation.php", {
                    post: t
                }, function(t, n) {
                    var s;
                    s = {
                        event: "react",
                        react: e,
                        src: i,
                        photo: t.images,
                        post_id: t.post_id,
                        to_id: t.id,
                        to_username: t.username,
                        is_shared: null
                    }, $.ajax({
                        url: "data/insertNewNotification.php",
                        type: "POST",
                        data: s,
                        success: function(t) {}
                    })
                }), v(t), "undefined" != n || "" != n ? $(".react-buttons").each(function() {
                    let n = $(this).data("id");
                    t == n && ($(this).find("div").eq(0).find("span").html(e), $(this).find("div").eq(0).find("img").attr("src", i))
                }) : console.log("Failed, Theres something wrong")
            }
        })
    }), $(document).on("mouseover", ".main-like-post", function() {
        let t = $(this).parent().data("id");
        $(".reaction-container-" + t).css("visibility", "visible")
    }), $(document).on("mouseover", ".reaction-container", function() {
        $(this).css({
            visibility: "visible",
            "transition-delay": "0.2s"
        })
    }), $(document).on("mouseout", ".reaction-container", function() {
        $(this).css({
            visibility: "hidden",
            "transition-delay": "1s"
        })
    }), $(document).on("mouseout", ".main-like-post", function() {
        let t = $(this).parent().data("id");
        $(".reaction-container-" + t).css("visibility", "hidden")
    }), $(document).on("mouseover", ".comment-reactions span", function() {
        let t = $(this).html().toLowerCase(),
            e = $(this).data("comment_id");
        "like" == t && $(".comment-reaction-container-" + e).css("visibility", "visible")
    }), $(document).on("mouseout", ".comment-reactions span", function() {
        let t = $(this).html().toLowerCase(),
            e = $(this).data("comment_id");
        "like" == t && setTimeout(function() {
            $(".comment-reaction-container-" + e).css("visibility", "hidden")
        }, 2e3)
    }), $(document).on("click", ".profile-link", function(t) {
        t.preventDefault();
        let e = $(this).attr("href");
        E(e), N(e)
    }), $(document).on("keypress", ".comment-textarea", function(t) {
        let e = t.keyCode,
            n = $(this).parent().data("id"),
            i = $(this).html();
        13 == e && "" != i && (t.shiftKey || (t.preventDefault(), function(t, e) {
            $.ajax({
                url: "client/postManagement.php",
                type: "POST",
                data: {
                    id: t,
                    comment: e
                },
                success: function(t) {}
            })
        }(n, i), $(this).html("")))
    }), $(document).on("click", ".comment-reactions span", function() {
        let t = $(this).html().toLowerCase(),
            e = $(this).data("comment_id");
        "reply" == t && $(".user-post-comment-textarea-container-" + e).css("display", "flex")
    }), $(document).on("click", ".reply-reactions span", function() {
        let t = $(this).html().toLowerCase(),
            e = $(this).parent().data("id");
        "reply" == t && $(".user-post-comment-textarea-container-" + e).css("display", "flex")
    }), $(document).on("keypress", ".comment-reply-textarea", function(t) {
        let e = t.keyCode,
            n = $(this).parent().data("id"),
            i = $(this).html(),
            s = $(this).parent().data("post_id");
        13 == e && "" != i && (t.shiftKey || (t.preventDefault(), function(t, e, n) {
            $.ajax({
                url: "client/postManagement.php",
                type: "POST",
                data: {
                    id: t,
                    reply: n,
                    post_id: e
                },
                success: function(t) {}
            })
        }(n, s, i), $(this).html("")))
    }), $(document).on("click", ".send-like", function() {
        let t = $(this).parent().data("id"),
            e = ($(this).parent().data("code"), $(this).parent().data("color"));
        ! function(t) {
            let e = t.emoji,
                n = t.reciever,
                i = t.token,
                s = t.color;
            Y({
                reciever: n,
                message: e,
                token: i,
                color: s,
                emoji: !0
            })
        }({
            reciever: t,
            token: token,
            emoji: "Like",
            color: e
        })
    }), $(document).on("click", ".post-images", function() {
        let t = $(this).data("id"),
            e = $(this).data("post");
        N("photo?id=" + t + "&index=" + $(this).data("index") + "&post=" + e), z()
    }), $(document).on("click", ".stories-theme", function() {
        let t = $(this).find("img").data("theme");
        $(".main-story-preview").css({
            "background-image": "url(" + t + ")",
            "background-repeat": "no-repeat",
            "object-fit": "fill",
            "background-size": "cover"
        })
    }), $(document).on("click", ".stories-theme-gradient", function() {
        let t = $(this).css("background");
        $(".main-story-preview").css({
            background: t
        })
    }), $(document).on("keypress", ".story-main-textbox", function(t) {
        13 == t.keyCode && $(this).val($(this).val() + "</br>"), setInterval(function() {
            let t = $(".story-main-textbox").val();
            $(".main-story-preview .main-textbox").html(t), "" == $(".main-story-preview .main-textbox").html() && $(".main-story-preview .main-textbox").html("Start Typing")
        })
    }), $(document).on("click", ".stories-picker.text", function() {
        $(".when-text-content").css("display", "block"), $(".stories-picker").hide(), $(".story-main-content .preview-container").show(), $(".footer.main").css("display", "flex")
    }), $(document).on("click", ".stories-picker.photo", function() {
        $(".upload-photo-story").click()
    }), $(document).on("change", ".append-image-story", function(t) {
        let e, n = document.querySelector(".append-image-story").files.length;
        for (let i = 0; i < n; i++) {
            let n = URL.createObjectURL(t.target.files[i]);
            (e = new Image).src = n, e.classList.add("appended-image"), e.style.cursor = "grab", e.onload = function() {
                C(this), $(".main-story-preview .appended-image").draggable({
                    containment: $(".main-container"),
                    scroll: !1
                })
            }
        }
    }), $(document).on("change", ".upload-photo-story", function(t) {
        $(".when-image-content").css("display", "block"), $(".footer.main").css("display", "flex"), $(".stories-picker").hide(), $(".story-main-content .preview-container").show();
        let e, n = document.querySelector(".upload-photo-story").files.length;
        $(".main-story-preview").html(""), $(".main-story-preview").css({
            background: "#FFF"
        });
        for (let i = 0; i < n; i++) {
            let n = URL.createObjectURL(t.target.files[i]);
            (e = new Image).src = n, e.classList.add("appended-image-background"), e.onload = function() {
                C(this);
                let t = this.height;
                $(".main-story-preview").height() == t && $(".main-story-preview .appended-image-background").css("border-radius", "10px")
            }
        }
    });
    let m = {
        data: null
    };

    function u(t) {
        switch (t) {
            case "appended-text":
                $(".when-text-content").css("display", "none"), $(".story-font-editor").css("display", "block"), $(".story-image-editor").css("display", "none"), $(".story-draw-editor").css("display", "none"), l = !1;
                break;
            case "appended-image-background":
                $(".when-text-content").css("display", "none"), $(".story-font-editor").css("display", "none"), $(".story-image-editor").css("display", "none"), $(".story-draw-editor").css("display", "none"), l = !1;
                break;
            case "appended-image":
                $(".when-text-content").css("display", "none"), $(".story-font-editor").css("display", "none"), $(".story-image-editor").css("display", "block"), $(".story-draw-editor").css("display", "none"), l = !1;
                break;
            case "draw":
                $(".when-text-content").css("display", "none"), $(".story-font-editor").css("display", "none"), $(".story-image-editor").css("display", "none"), $(".story-draw-editor").css("display", "block"), l = !0;
                break;
            case "no-target":
                $(".when-image-content").is(":visible") || $(".story-draw-editor").is(":visible") || $(".when-text-content").css("display", "block"), $(".story-font-editor").css("display", "none"), $(".story-image-editor").css("display", "none"), $(".story-draw-editor").css("display", "none"), l = !1
        }
    }

    function h() {
        s ? $(".playandpause").html('\n\t\t<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>\n\t\t') : $(".playandpause").html('\n\t\t<svg fill="white !important" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>\n\t\t')
    }

    function f() {
        $.ajax({
            url: "data/fetchallUserHasStories.php",
            type: "GET",
            success: function(t) {
                $(".fetchallUserHasStories-content").html(t), $.getJSON("data/fetchAllUsersInStories.php", function(t, e) {
                    o = t
                })
            }
        })
    }

    function g(...t) {
        let e = L("id"),
            n = L("code");
        switch (t[0]) {
            case "select":
                $.getJSON("data/getStoryInformation.php", {
                    user: t[1],
                    code: ""
                }, function(e, n) {
                    L("index");
                    N("stories?id=" + t[1] + "&code=" + e.code + "&index=" + e.storyIndex), y(t[1], e.code)
                });
                break;
            case "next":
                $.getJSON("data/getStoryInformation.php", {
                    user: e,
                    code: n
                }, function(t, n) {
                    $.getJSON("data/getStoryInformation.php", {
                        user: e,
                        code: t.next
                    }, function(t, n) {
                        let i = L("index"),
                            a = "stories?id=" + e + "&code=" + t.code + "&index=" + t.storyIndex;
                        i != t.availableStory ? (N(a), y(e, t.code)) : function(t) {
                            let e;
                            for (let n = 0; n < o.length; n++) o[n] == t && (e = o[n + 1], s = !1, g("select", e));
                            $(".user-story-list").each(function() {
                                let t = $(this).data("id");
                                t == e && ($(".user-story-list").not($(this)).removeClass("active"), $(this).addClass("active"))
                            })
                        }(e)
                    })
                });
                break;
            case "prev":
                $.getJSON("data/getStoryInformation.php", {
                    user: e,
                    code: n
                }, function(t, n) {
                    $.getJSON("data/getStoryInformation.php", {
                        user: e,
                        code: t.prev
                    }, function(t, n) {
                        N("stories?id=" + e + "&code=" + t.code + "&index=" + t.storyIndex), t.storyIndex - 1 != 0 ? y(e, t.code) : function(t) {
                            let e;
                            for (let n = 0; n < o.length; n++) o[n] == t && (e = o[n - 1], s = !1, g("select", e));
                            $(".user-story-list").each(function() {
                                let t = $(this).data("id");
                                t == e && ($(".user-story-list").not($(this)).removeClass("active"), $(this).addClass("active"))
                            })
                        }(e)
                    })
                })
        }
    }

    function y(t, e) {
        $.ajax({
            url: "data/getStoryContent.php",
            type: "GET",
            data: {
                id: t,
                code: e
            },
            success: function(t) {
                var e;
                "none" == (e = t) ? ($(".user-main-story").addClass("no-story-content"), $(".user-main-story").html("<p>Click to view Story</p>")) : ($(".user-main-story").removeClass("no-story-content"), $(".user-main-story").html(e)), b()
            }
        })
    }

    function b() {
        let t, e = L("index"),
            n = $(".story-timer-" + e),
            i = 1e4,
            a = n.parent().width(),
            o = setInterval(function() {
                (t = n.width()) == a && (s = !1, n.addClass("done"), g("next"), clearInterval(o))
            });
        s ? (s = !1, n.stop()) : (s = !0, n.animate({
            width: "100%"
        }, i))
    }

    function k() {
        l = !0;
        var t = document.getElementById("storyCanvas"),
            e = t.getContext("2d"),
            n = (document.getElementById("main-story-preview"), {
                x: 0,
                y: 0
            }),
            i = !1;
        t.addEventListener("mousemove", function(e) {
            var i = t.getBoundingClientRect(),
                s = t.width / i.width,
                a = t.height / i.height;
            n.x = (e.clientX - i.left) * s, n.y = (e.clientY - i.top) * a
        }, !1), t.addEventListener("mousedown", function(a) {
            e.beginPath(), e.moveTo(n.x, n.y), t.addEventListener("mousemove", s, !1), i = !0
        }, !1), t.addEventListener("mouseup", function() {
            t.removeEventListener("mousemove", s, !1), i = !1
        }, !1), e.lineWidth = t.dataset.size, e.lineJoin = t.dataset.cap, e.lineCap = t.dataset.cap, e.strokeStyle = t.dataset.color;
        var s = function() {
            i && l && (e.lineTo(n.x, n.y), e.stroke())
        }
    }

    function x(t) {
        $(".story-font-editor").html(' \n\t\t<div class="story-content-body">\n\t\t\t<div class="list-picker add">\n\t\t\t\t<div class="main-picker">\n\t\t\t\t\t<div class="square fontSize">\n\t\t\t\t\t\t<span>12px</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="square fontSize">\n\t\t\t\t\t\t<span>14px</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="square fontSize">\n\t\t\t\t\t\t<span>16px</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="square fontSize">\n\t\t\t\t\t\t<span>18px</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="square fontSize">\n\t\t\t\t\t\t<span contenteditable>20px</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="list-picker">\n\t\t\t\t<div class="main-picker">\n\t\t\t\t\t<div class="square">\n\t\t\t\t\t\tAa\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="main-font">\n\t\t\t\t\t\t<span>CLEAN</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="icon-down-arrow"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="picker-container">\n\t\t\t\t\t<li><span>CLEAN</span></li>\n\t\t\t\t\t<li><span>Simple</span></li>\n\t\t\t\t\t<li><span>Casual</span></li>\n\t\t\t\t\t<li><span>Fancy</span></li>\n\t\t\t\t\t<li><span><b>Headline</b></span></li>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="content-picker font-editor-container">\n\t\t\t\t<p>Color</p>\n\t\t\t\t<div class="main-picker">\n\n\t\t\t\t</div>\n\t\t\t\t<div class="footer view-more-fonts-color" value="show">\n\t\t\t\t\t<div class="icon-down-arrow"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="content-picker text-background-editor-container">\n\t\t\t\t<p>Text Background Color</p>\n\t\t\t\t<div class="main-picker">\n\n\t\t\t\t</div>\n\t\t\t\t<div class="footer view-more-background-color" value="show">\n\t\t\t\t\t<div class="icon-down-arrow"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t'), w(16, !1, "fonts"), w(16, !1, "text-background"), U("down-arrow", ""), $(document).on("click", ".list-picker .main-picker .square.fontSize", function() {
            let e = $(this).find("span").html();
            t.style.fontSize = e
        }), $(document).on("click", ".font-editor-container .story-font-colors", function() {
            let e = $(this).attr("data-value");
            t.style.color = e
        }), $(document).on("click", ".text-background-editor-container .story-text-background-colors", function() {
            let e = $(this).attr("data-value");
            t.style.background = e
        })
    }

    function w(...t) {
        let e = t[0];
        $.getJSON("assets/json/Colors255.json", function(n, i) {
            for (let i = 0; i < e; i++) "fonts" == t[2] ? (output = '<div class="item story-font-colors" style="background:' + n[i].hexString + '" data-value="' + n[i].hexString + '"></div>', t[1] && $(".font-editor-container .main-picker").html(""), $(".font-editor-container .main-picker").append(output)) : "text-background" == t[2] ? (output = '<div class="item story-text-background-colors" style="background:' + n[i].hexString + '" data-value="' + n[i].hexString + '"></div>', t[1] && $(".text-background-editor-container .main-picker").html(""), $(".text-background-editor-container .main-picker").append(output)) : "brush-color" == t[2] && (output = '<div class="item story-brush-colors" style="background:' + n[i].hexString + '" data-value="' + n[i].hexString + '"></div>', t[1] && $(".brush-editor-container .main-picker").html(""), $(".brush-editor-container .main-picker").append(output))
        })
    }

    function C(t) {
        $(".main-story-preview").append(t), $(".main-story-preview .appended-text").draggable({
            containment: $(".main-container"),
            scroll: !1
        })
    }

    function S() {
        document.body.scrollTop > 150 || document.documentElement.scrollTop > 550 ? $(".profile-menu").addClass("fixed") : $(".profile-menu").removeClass("fixed")
    }

    function T(t) {
        let e = t.find("div").html().toLowerCase();
        t.addClass("active"), $(".nav-center .item").not(t).removeClass("active"), $.ajax({
            url: "fbSVG/" + e + "-fill.php",
            type: "GET",
            success: function(e) {
                t.find("svg").hide(), t.append(e)
            }
        })
    }

    function O() {
        $(".nav-center .item").each(function() {
            $(this).hasClass("active") && ($(this).removeClass("active"), $(this).find("svg").each(function() {
                $(this).hasClass("filled") ? $(this).hide() : $(this).show()
            }))
        })
    }

    function j(t) {
        ["home", "watch", "marketplace", "groups", "gaming"].includes(t) ? $(".nav-center .item").each(function() {
            let e = $(this).find("div").html().toLowerCase();
            e == t ? T($(this)) : ("me" == e && O(), O())
        }) : O()
    }

    function _(t) {
        $(".facebook-content").not($("." + t + "-body")).css("display", "none"), $("." + t + "-body").css("display", "block"), $(".profile-body").css("display", "none");
        let e, n = function(t) {
                let e = t.substring(0, 1).toUpperCase(),
                    n = t.length,
                    i = t.substring(1, n);
                return e + i
            }(t),
            i = "#F0F2F5";
        if ("Home" == n) e = "Facebook", P(!1);
        else if ("Messages" == n) P(!0);
        else if ("Stories" == n) {
            let t = window.location.href,
                n = "/facebook-clone";
            (t = t.replace(n + "/", "")).includes("?a=create") ? P(!0) : P(!1), e = "Facebook"
        } else "Settings" == n ? (e = "Settings & Privacy", P(!1), i = "#FFF", function() {
            let t = L("tab"),
                e = window.location.href,
                n = L("ref");
            e = e.replace("/facebook-clone/", ""), (null == n || "" == n) && (n = !1);
            $.ajax({
                url: "data/getSettingsTab.php",
                type: "GET",
                data: {
                    tab: t,
                    ref: n
                },
                success: function(t) {
                    $(".main-settings-to-replace").html(t)
                }
            }), $(".settings-list").each(function() {
                let e = $(this).attr("href");
                (e = e.replace("settings?tab=", "")) == t && ($(".settings-list").not($(this)).removeClass("active"), $(this).addClass("active"))
            })
        }()) : (P(!1), e = n + " | Facebook");
        M(e), j(t), $("body").css("background", i)
    }

    function P(t) {
        $(".nav-right .circles .item").each(function() {
            $(this).hasClass("messages-button") && (t ? ($(this).hide(), $(".floating-content").hide(), function() {
                null != i && "undefined" != i || (i = $(".message-inbox li:first-child").find("div").find("span").html());
                $.getJSON("data/getUserinformation.php", {
                    user: i
                }, function(t, e) {
                    let n = t.id,
                        i = t.profile_picture;
                    B(8);
                    H({
                        id: n,
                        name: t.fullname,
                        picture: i,
                        color: "#0084FF"
                    })
                })
            }()) : ($(this).show(), $(".floating-content").show()))
        })
    }

    function F(t, e, n) {
        switch (n) {
            case "add-friend":
                $.ajax({
                    url: "client/clients.php",
                    type: "POST",
                    data: {
                        action: "send-friend-request",
                        to_id: t
                    },
                    success: function(t) {
                        e.html(t)
                    }
                });
                break;
            case "cancel-friend-request":
                $.ajax({
                    url: "client/clients.php",
                    type: "POST",
                    data: {
                        action: "cancel-friend-request",
                        to_id: t
                    },
                    success: function(t) {
                        e.html(t), console.log(t)
                    }
                });
                break;
            case "accept-friend-request":
                $.ajax({
                    url: "client/clients.php",
                    type: "POST",
                    data: {
                        action: "accept-friend-request",
                        to_id: t
                    },
                    success: function(t) {
                        e.html(t), console.log(t)
                    }
                })
        }
    }

    function I(t) {
        let e = $(".profile-body-content." + t + "-content");
        $(".profile-body-content").not(e).css("display", "none"), e.css("display", "flex"),
            function(t) {
                $(".profile-menu-button .item").each(function() {
                    let e = $(this).find("span").html().toLowerCase(),
                        n = "?tab=" + e;
                    t == e && ($(".profile-menu-button .item").not($(this)).removeClass("active"), $(this).addClass("active"), N(n))
                })
            }(t)
    }

    function E(t) {
        $.ajax({
            url: "data/getProfile.php",
            type: "GET",
            data: {
                user: t
            },
            success: function(e) {
                "me" == t && ($(".open-profile").addClass("active"), t = "me"),
                    function(t) {
                        $(".user-profile-body").html(t), $(".facebook-content").css("display", "none"), $(".profile-body").css("display", "block")
                    }(e),
                    function(t) {
                        let e = 0,
                            n = !1;

                        function i(t, e, i) {
                            $.ajax({
                                url: "data/fetchPost.php",
                                type: "POST",
                                data: {
                                    start: t,
                                    limit: e,
                                    condition: "false",
                                    people: i,
                                    post: "false"
                                },
                                success: function(t) {
                                    $(".user-profile-all-post-content").append(t);
                                    let e = ' \n\t\t\t\t\t<div class="no-content" style="margin-left:0;width:480px;padding:5px;padding-top:20px;padding-bottom:10px;">\n\t\t\t\t\t\t<center>\n         \t\t\t\t<span class="icon-undraw_hire_te5y">\'' + U("undraw_hire_te5y", "") + '\'</span>\n         \t\t\t<h2>I Think You Reached the end</h2>\n         \t\t\t<p>Find and Follow Friends to get updates to them.</p>\n         \t\t\t<div class="button"><span>Find Friends</span></div>\n         \t\t\t</center>\n\n\t\t\t\t\t</div>\n\t\t\t\t';
                                    "" == t ? ($(".user-profile-all-post-content-response").html(e), n = !0) : (q($(".user-profile-all-post-content-response"), 5), n = !1)
                                }
                            })
                        }
                        0 == n && (setTimeout(function() {
                            i(e, 5, t)
                        }, 1e3), n = !0);
                        $(window).scroll(function() {
                            $(window).scrollTop() + $(window).height() > $(".user-profile-all-post-content-response").height() && 0 == n && (n = !0, e += 5, setTimeout(function() {
                                i(e, 5, t)
                            }, 1e3))
                        })
                    }(t), O(),
                    function() {
                        let t = L("tab");
                        null != t && null != t || (t = "timeline"), I(t)
                    }(),
                    function(t) {
                        $.getJSON("data/getUserinformation.php", {
                            user: t
                        }, function(t, e) {
                            M(t.fullname)
                        })
                    }(t), r = t
            }
        })
    }

    function N(t) {
        history.pushState({}, "", t)
    }

    function L(t) {
        for (var e = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), n = 0; n < e.length; n++) {
            var i = e[n].split("=");
            if (i[0] == t) return i[1]
        }
    }

    function z() {
        let e = window.location.pathname;
        window.location;
        if ("" == (e = e.replace("/facebook-clone/", ""))) e = "home";
        else if ("index.php" == e) e = "home";
        else if ("photo" == e) {
            ! function(t) {
                let e, n = B(8),
                    i = t.post,
                    s = t.id,
                    a = t.index;
                L("id"), L("post"), L("index");
                $.getJSON("data/getPostImageInformation.php", {
                    post: i,
                    id: s,
                    index: a
                }, function(t, o) {
                    let c = parseInt(t.maxIndex),
                        d = 0,
                        l = 0;
                    d = 0 != a ? parseInt(a) - 1 : c, a != c ? l = parseInt(a) + 1 : 0 == a && (d = 0, 0 != c && (l = 1)), $.getJSON("data/getPostImageInformation.php", {
                        post: i,
                        id: s,
                        index: a
                    }, function(t, s) {
                        e = ' \n\t\t\t\t<div class="photo-post-preview-main-container">\n\t\t\t\t\t<div class="photo-post-preview-left-container">\n\t\t\t\t\t\t<div class="main-background" style="background-image: url(' + t.image + ');"></div>\n\t\t\t\t\t\t<div class="main-function">\n\t\t\t\t\t\t\t<div class="content top"></div>\n\t\t\t\t\t\t\t<div class="content left">\n\t\t\t\t\t\t\t\t<div class="button icon-chevron-right post-preview-button right" data-prev="' + d + '">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="content right">\n\t\t\t\t\t\t\t\t<div class="button icon-chevron-right post-preview-button left" data-next="' + l + '"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<img src="' + t.image + '">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="photo-post-preview-right-container photo-post-preview-' + n + ' scrollbar"></div>\n\t\t\t\t</div>\n\t\t\t\t', $.ajax({
                            url: "data/fetchPost.php",
                            type: "POST",
                            data: {
                                start: "false",
                                limit: "false",
                                condition: "post-preview",
                                people: "false",
                                post: i
                            },
                            success: function(t) {
                                $(".photo-post-preview-" + n).html(t)
                            }
                        }), $(".facebook-content.photo-body").html(e), U("chevron-right", "")
                    })
                })
            }({
                post: L("post"),
                index: L("index"),
                id: L("id")
            })
        } else if ("stories" == e) {
            let t, e = window.location.href;
            if ((e = e.replace("/facebook-clone/", "")).includes("?a=create")) t = "facebook-create-stories-content.php";
            else {
                t = "facebook-discover-stories-content.php";
                let e = L("id"),
                    n = L("code");
                f(), null != e && null != n && y(e, n)
            }
            $.ajax({
                url: "content/" + t,
                type: "GET",
                success: function(t) {
                    $(".stories-body").html(t)
                }
            }), O()
        } else t.includes(e) || (O(), $.ajax({
            url: "data/isUserExist.php",
            type: "POST",
            data: {
                user: e
            },
            success: function(t) {
                if ("true" == t) return E(e);
                _("no-content")
            }
        }));
        for (let n = 0; n < t.length; n++) t[n] == e && (_(t[n]), j(t[n]))
    }

    function M(t) {
        document.title = t
    }

    function J() {
        let t = 0,
            e = !1;

        function n(t, n) {
            $.ajax({
                url: "data/fetchPost.php",
                type: "POST",
                data: {
                    start: t,
                    limit: n,
                    condition: "false",
                    people: "false",
                    post: "false"
                },
                success: function(t) {
                    if ($(".all-user-post-content").append(t), "" == t) {
                        let t = ' \n\t                     \t<div class="no-content">\n                     \t\t\t<center>\n                     \t\t\t\t<span class="icon-undraw_hire_te5y">\'' + U("undraw_hire_te5y", "") + '\'</span>\n                     \t\t\t<h2>I Think You Reached the end</h2>\n                     \t\t\t<p>Find and Follow Friends to get updates to them.</p>\n                     \t\t\t<div class="button"><span>Find Friends</span></div>\n                     \t\t\t</center>\n                     \t\t</div>\n\t\t\t\t\t\t';
                        $(".all-user-post-content-response").html(t), e = !0
                    } else q($(".all-user-post-content-response"), 5), e = !1
                }
            })
        }
        0 == e && (n(t, 5), e = !0), $(window).scroll(function() {
            $(window).scrollTop() + $(window).height() > $(".all-user-post-content-response").height() && 0 == e && (e = !0, n(t += 5, 5))
        })
    }

    function q(t, e) {
        for (let n = 0; n < e; n++) t.append(' \n\t\t\t<div class="post-preload">\n                 <div id="header">\n            \t<div class="preload-name">\n            \t\t\t<div class="circle"></div>\n            \t\t\t<div class="info"></div>\n            \t\t</div>\n            \t</div>\n            \t<div id="body"></div>\n              </div>\n\t\t')
    }

    function A(t, e, n, i, s) {
        $.ajax({
            url: "data/timeAgo.php",
            type: "GET",
            data: {
                date: i.timestamp
            },
            success: function(a) {
                let o = ' \n\t\t\t\t\t<div class="user-post-comments-container " data-id="' + i.post_id + '">\n\t\t\t\t\t\t\t\t<div class="user-post-comments">\n\t\t\t\t\t\t\t\t\t<img src="' + n.profile_picture + '" class="circle">\n\t\t\t\t\t\t\t\t\t<div class="text">\n\t\t\t\t\t\t\t\t\t\t<a href="' + n.id + '" >' + n.fullname + "</a>\n\t\t\t\t\t\t\t\t\t\t<span>" + t + '</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="comment-reactions">\n\t\t\t\t\t\t\t\t\t<span>Like</span>\n\t\t\t\t\t\t\t\t\t<span  data-comment_id="' + s.post_comment_id + '">Reply</span>\n\t\t\t\t\t\t\t\t\t<span class="hc date_time_ago">Just Now<div class="desc"  data-timestamp="' + i.timestamp + '">' + i.date + '</div></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<div class="user-comment-reply-container"></div>\n\t\t\t\t\t\t\t\t <div class="user-post-comment-textarea-container user-post-comment-textarea-container-' + s.post_comment_id + '"  data-id="' + s.comment_id + '" data-post_id ="' + i.post_id + '" style="display:none;margin-left:12%;">\n\t\t\t\t\t\t\t\t<img src="' + e.profile_picture + '" class="circle">\n\t\t\t\t\t\t\t\t<div class="comment-reply-textarea" contenteditable placeholder="Write a reply"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t';
                $(".user-comments-section-" + i.post_id).prepend(o), $(".user-comments-section-" + i.post_id + " .user-post-comments-container").length >= 6 && $(".user-comments-section-" + i.post_id + " .user-post-comments-container").last().remove()
            }
        })
    }

    function U(t, e) {
        "fb" == e ? $.ajax({
            url: "data/fbsvg.php",
            type: "GET",
            data: {
                name: t
            },
            success: function(e) {
                "undefined" == e ? console.log("error") : $(".icon-" + t).html(e)
            }
        }) : "insvg" == e ? $.ajax({
            url: "data/insvg.php",
            type: "GET",
            data: {
                name: t
            },
            success: function(e) {
                "undefined" == e ? console.log("error") : $(".icon-" + t).html(e)
            }
        }) : "mysvg" == e ? $.ajax({
            url: "data/mysvg.php",
            type: "GET",
            data: {
                name: t
            },
            success: function(e) {
                "undefined" == e ? console.log("error") : $(".icon-" + t).html(e)
            }
        }) : $.ajax({
            url: "data/svg.php",
            type: "GET",
            data: {
                name: t
            },
            success: function(e) {
                "undefined" == e ? console.log("error") : $(".icon-" + t).html(e)
            }
        })
    }

    function B(t) {
        let e = "",
            n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        n += n.toLowerCase(), n += "1234567890";
        for (let i = 0; i < t; i++) e += n.charAt(Math.floor(Math.random() * n.length));
        return e
    }

    function R() {
        $(".message-con.right").each(function() {
            let t = $(this).find("span").length;
            $(this).find("span").first().css({
                "border-top-right-radius": "25px",
                "border-bottom-right-radius": "4px"
            }), 1 != t ? $(this).find("span").last().css({
                "border-bottom-right-radius": "25px",
                "border-top-right-radius": "4px"
            }) : $(this).find("span").last().css({
                "border-bottom-right-radius": "25px",
                "border-top-right-radius": "25px"
            }), $(this).find("span").not(":last").not(":first").css({
                "border-bottom-right-radius": "4px",
                "border-top-right-radius": "4px"
            })
        }), $(".message-con.left").each(function() {
            let t = $(this).find("span").length;
            $(this).find("span").first().css({
                "border-top-left-radius": "25px",
                "border-bottom-left-radius": "4px"
            }), 1 != t ? $(this).find("span").last().css({
                "border-bottom-left-radius": "25px",
                "border-top-left-radius": "4px"
            }) : $(this).find("span").last().css({
                "border-bottom-left-radius": "25px",
                "border-top-left-radius": "25px"
            }), $(this).find("span").not(":last").not(":first").css({
                "border-bottom-left-radius": "4px",
                "border-top-left-radius": "4px"
            })
        })
    }

    function G(t) {
        let i = B(8),
            s = ' \n\t<div class="message-container me-' + t.id + " m-" + i + '" data-token="' + i + '" data-color="' + t.color + '">\n\t  \t\t     <div class="settings-container">\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>Open in Messenger</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>View Profile</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t<hr>\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>Color</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>Emoji</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>Nicknames</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t<hr>\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>Create group</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t<hr>\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>Mute Conversation</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>Ignore messages</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>Block</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t<hr>\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>Delete Conversation</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t<li>\n\t  \t\t\t\t\t\t<div class="circle"></div>\n\t  \t\t\t\t\t\t<div class="info"><span>Something Wrong</span></div>\n\t  \t\t\t\t\t</li>\n\t  \t\t\t\t\t\n\t  \t\t\t\t</div>\n              \t\t<div id="header">\n              \t\t\t<div class="info setting">\n              \t\t\t\t<img src="' + t.picture + '" class="circle">\n              \t\t\t\t<div class="name">\n              \t\t\t\t\t<p>' + t.name + '</p>\n              \t\t\t\t\t<span>Active now</span>\n              \t\t\t\t</div>\n              \t\t\t\t<i class="fa fa-chevron-down" style="font-size: 12px;"></i>\n              \t\t\t</div>\n              \t\t\t<div class="icons" data-token="' + i + '" data-name="' + t.name + '" data-picture="' + t.picture + '">\n              \t\t\t\t<div class="icon hc tab-close"><div class="icon-ex">' + U("ex", "fb") + '</div><div class="desc">Close</div></div>\n              \t\t\t\t<div class="icon hc tab-minimize"><div class="icon-minus">' + U("minus", "fb") + '</div><div class="desc">Minimize Tab</div></div>\n              \t\t\t\t<div class="icon hc tab-call"><div class="icon-call">' + U("call", "fb") + '</div><div class="desc">Call</div></div>\n              \t\t\t\t<div class="icon hc tab-videocall"><div class="icon-videocall">' + U("videocall", "fb") + '</div><div class="desc">Video Call</div></div>\n              \t\t\t</div>\n              \t\t</div>\n              \t\t<div id="body">\n              \t\t\t<div class="chat-history chat-history-token-' + i + '" data-token="' + i + '" data-name="' + t.name + '">\n              \t\t\t\t\n              \t\t\t</div>\n              \t\t</div>\n              \t\t<div id="footer" data-token="' + i + '" data-id="' + t.id + '" data-color="' + t.color + '">\n              \t\t\t<div class="item hc"><div class="message-svg icon-pollygon">' + U("pollygon", "fb") + '</div><div class="desc">More</div></div>\n              \t\t\t<div class="item hc"><div class="message-svg icon-picture">' + U("picture", "fb") + '</div><div class="desc">Attach</div></div>\n              \t\t\t<div class="item hc"><div class="message-svg icon-sticker">' + U("sticker", "fb") + '</div><div class="desc">Choose a sticker</div></div>\n              \t\t\t<div class="item hc"><div class="message-svg icon-gif">' + U("gif", "fb") + '</div><div class="desc">Choose a gif</div></div>\n              \t\t\t<div class="message-textarea box message-' + i + '" contenteditable="plaintext-only" placeholder="Aa"></div>\n              \t\t\t<div class="item hc send-like"><div class="message-svg icon-like">' + U("like", "fb") + '</div><div class="desc">Like</div></div>\n              \t\t</div>\n              \t</div>\n\n\t\t';
        null == t.message && null == t.message || V({
            message: t.message,
            sender: t.sender,
            reciever: t.reciever,
            picture: t.picture,
            color: ""
        }), n.includes(t.name) ? $(".message-container #header .icons").each(function() {
            let n = $(this).data("name"),
                i = $(this).data("token");
            n == t.name && $(".m-" + i).is(":hidden") && ($(".m-" + i).show(), D(t.id, $(".chat-history-token-" + i)), $(".float-box .item").each(function() {
                let t = $(this).data("name"),
                    s = $(this).data("token");
                n == t && i == s && ($(this).remove(), e.splice(n))
            }))
        }) : ($(".message-big-pipe-container").prepend(s), $(".message-" + i).focus(), $(".message-" + i).blur(), $(".message-" + i).focus(), n.push(t.name), D(t.id, $(".chat-history-token-" + i)), X(i, t.color)), R()
    }

    function H(t) {
        let e = B(8),
            n = "messages?t=" + t.id,
            i = '\n\t\t\t<div class="message-container me-' + t.id + " m-" + e + '" data-token="' + e + '" data-color="' + t.color + '">\n\t \t\t\t<div id="header">\n\t \t\t\t\t<div class="info">\n\t \t\t\t\t\t<img src="' + t.picture + '" class="circle">\n\t \t\t\t\t\t<div class="name">\n\t \t\t\t\t\t\t<p>' + t.name + '</p>\n\t \t\t\t\t\t\t<span>Active on Messenger</span>\n\t \t\t\t\t\t</div>\n\t \t\t\t\t</div>\n\t \t\t\t\t<div class="icons">\n\t \t\t\t\t\t<div class="icon icon-messages-info">\n\t \t\t\t\t\t\t' + U("messages-info", "fb") + '\n\t \t\t\t\t\t</div>\n\t \t\t\t\t\t<div class="icon icon-videocall">\n\t\n\t \t\t\t\t\t\t' + U("videocall", "fb") + '\n\t \t\t\t\t\t</div>\n\t \t\t\t\t\t<div class="icon icon-call">\n\t \t\t\t\t\t\t' + U("call", "fb") + '\n\t \t\t\t\t\t</div>\n\t \t\t\t\t</div>\n\t \t\t\t</div>\n\t \t\t\t<div class="messages-body-tab">\n\t \t\t\t\t<div class="main-body">\n\t \t\t\t\t\t<div id="body" class="scrollbar">\n\t\t\t \t\t\t<div class="chat-history chat-history-token-' + e + '" data-token="' + e + '" data-name="' + t.name + '">\n </div>\n\t\t\t \t\t\t</div>\n\t\t\t \t\t\t<div id="footer" data-token="' + e + '" data-id="' + t.id + '" data-color="' + t.color + '">\n\t              \t\t\t<div class="item hc"><div class="message-svg icon-pollygon">' + U("pollygon", "fb") + '</div><div class="desc">More</div></div>\n\t              \t\t\t<div class="item hc"><div class="message-svg icon-picture">' + U("picture", "fb") + '</div><div class="desc">Attach</div></div>\n\t              \t\t\t<div class="item hc"><div class="message-svg icon-sticker">' + U("sticker", "fb") + '</div><div class="desc">Choose a sticker</div></div>\n\t              \t\t\t<div class="item hc"><div class="message-svg icon-gif">' + U("gif", "fb") + '</div><div class="desc">Choose a gif</div></div>\n\t              \t\t\t<div class="message-textarea message-' + e + '" contenteditable="plaintext-only" placeholder="Type a message"></div>\n\t              \t\t\t<div class="item hc send-like last"><div class="message-svg icon-like">' + U("like", "fb") + '</div><div class="desc">Like</div></div>\n              \t\t\t</div>\n\t \t\t\t\t</div>\n\t\t \t\t\t<div id="user-info" class="scrollbar">\n\t\t \t\t\t\t<div class="top">\n\t\t \t\t\t\t\t<div class="div">\n\t\t \t\t\t\t\t\t<img src="' + t.picture + '" class="circle">\n\t\t \t\t\t\t\t</div>\n\t\t \t\t\t\t\t<h4>' + t.name + '</h4>\n\t\t \t\t\t\t\t<p>Active now</p>\n\t\t \t\t\t\t</div>\n\t\t \t\t\t\t<div class="bot">\n\t\t \t\t\t\t\t<div class="set-li">\n\t\t \t\t\t\t\t\t<div class="main-set">\n\t\t \t\t\t\t\t\t\t<h3>MORE ACTIONS</h3>\n\t\t \t\t\t\t\t\t\t<div class="stat rotate icon-chevron-right">\n\t\t \t\t\t\t\t\t\t\t' + U("chevron-right", "") + '\n\t\t \t\t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t<div class="set" style="display: block;">\n\t\t \t\t\t\t\t\t\t<li>\n\t\t \t\t\t\t\t\t\t\t<span>Search in Conversation</span>\n\t\t \t\t\t\t\t\t\t\t<div class="stat icon-little-search">\n\t\t \t\t\t\t\t\t\t\t\t' + U("little-search", "") + '\n\t\t \t\t\t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t\t</li>\n\t\t \t\t\t\t\t\t\t<li>\n\t\t \t\t\t\t\t\t\t\t<span>Edit Nicknames</span>\n\t\t \t\t\t\t\t\t\t\t<div class="stat icon-nickname">\n\t\t \t\t\t\t\t\t\t\t\t' + U("nickname", "") + '\n\t\t \t\t\t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t\t</li>\n\t\t \t\t\t\t\t\t\t<li>\n\t\t \t\t\t\t\t\t\t\t<span>Change Theme</span>\n\t\t \t\t\t\t\t\t\t\t<div class="stat theme"></div>\n\t\t \t\t\t\t\t\t\t</li>\n\t\t \t\t\t\t\t\t\t<li>\n\t\t \t\t\t\t\t\t\t\t<span>Change Emoji</span>\n\t\t \t\t\t\t\t\t\t\t<div class="stat emojis icon-like">\n\t\t \t\t\t\t\t\n\t\t \t\t\t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t\t</li>\n\t\t \t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t</div>\n\t\t \t\t\t\t\t<div class="set-li">\n\t\t \t\t\t\t\t\t<div class="main-set">\n\t\t \t\t\t\t\t\t\t<h3>PRIVACY & SUPPORT</h3>\n\t\t \t\t\t\t\t\t\t<div class="stat icon-chevron-right">\n\t\t \t\t\t\t\t\t\t\t' + U("chevron-right", "") + '\n\t\t \t\t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t<div class="set">\n\t\t \t\t\t\t\t\t\t<li>\n\t\t \t\t\t\t\t\t\t\t<span>Notifications</span>\n\t\t \t\t\t\t\t\t\t\t<div class="stat icon-small-bell">\n\t\t \t\t\t\t\t\t\t\t\t' + U("small-bell", "") + '\n\t\t \t\t\t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t\t</li>\n\t\t \t\t\t\t\t\t\t<li>\n\t\t \t\t\t\t\t\t\t\t<span>Ignore Messages</span>\n\t\t \t\t\t\t\t\t\t\t<div class="stat icon-ignore-messages">\n\t\t \t\t\t\t\t\t\t\t\t' + U("ignore-messages", "") + '\n\t\t \t\t\t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t\t</li>\n\t\t \t\t\t\t\t\t\t<li>\n\t\t \t\t\t\t\t\t\t\t<span>Block Messages</span>\n\t\t \t\t\t\t\t\t\t\t<div class="stat icon-block-messages">\n\t\t \t\t\t\t\t\t\t\t\t' + U("block-messages", "") + '\n\t\t \t\t\t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t\t</li>\n\t\t \t\t\t\t\t\t\t<li>\n\t\t \t\t\t\t\t\t\t\t<span>Something\'s Wrong</span>\n\t\t \t\t\t\t\t\t\t\t<div class="stat icon-wrong">\n\t\t \t\t\t\t\t\t\t\t\t' + U("wrong", "") + '\n\t\t \t\t\t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t\t\t</li>\n\t\t \t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t</div>\n\t\t \t\t\t\t\t<div class="set-li">\n\t\t \t\t\t\t\t\t<div class="main-set">\n\t\t \t\t\t\t\t\t\t<h3>SHARED PHOTOS</h3>\n\t\t \t\t\t\t\t\t</div>\n\t\t \t\t\t\t\t</div>\n\t\t \t\t\t\t</div>\n\t\t \t\t\t</div>\n\t \t\t\t</div>\n\t \t\t</div>\n\t\t';
        $(".all-of-main-message-box").html(i), D(t.id, $(".chat-history-token-" + e)), X(e, t.color), R(), N(n)
    }

    function D(t, e) {
        $.ajax({
            url: "data/fetchAllMessages.php",
            type: "POST",
            data: {
                id: t
            },
            success: function(t) {
                e.html(t), R()
            }
        })
    }

    function W() {
        $(".menu-menu").css("display", "none"), $(".nav-right .circles .item").removeClass("active"), $(".message-container .settings-container").css("display", "none"), X("", "")
    }

    function V(t) {
        let e = t.sender,
            n = nt(new Date),
            i = ' \n      \t\t\t<div class="message-con left ' + t.class + '">\n      \t\t\t\t<div class="status">\n\t\t\t\t\t\t<div class="status-content">\n\t\t\t\t\t\t\t<div class="image"></div>\n\t\t\t\t\t\t</div>\n      \t\t\t\t</div>\n  \t\t\t\t\t<div class="box">\n\t\t\t\t\t\t<div class="circle-content">\n\t\t\t\t\t\t\t<img src="' + t.picture + '" class="image" />\n\t\t\t\t\t\t</div>\n  \t\t\t\t\t</div>\n  \t\t\t\t\t<span class="content left hc">\n  \t\t\t\t\t\t' + t.message + '\t\n  \t\t\t\t\t\t<div class="desc">' + n + "</div>\n  \t\t\t\t\t</span>\n  \t\t\t\t</div>\n\t\t",
            s = ' \n\t\t\t<br>\n      \t\t<span class="content left ' + t.class + '" style="background:' + t.color + '">' + t.message + "</span>\n\t\t";
        $(".me-" + e + " #body .chat-history .message-con").last().hasClass("left") ? $(".me-" + e + " #body .chat-history .message-con.left").last().append(s) : $(".me-" + e + " #body .chat-history").append(i), R(), Y(t)
    }

    function Y(t) {
        $.ajax({
            url: "client/clients.php",
            type: "POST",
            data: {
                id_reciever: t.reciever,
                message: t.message,
                token: t.token,
                color: t.color,
                action: "new_message",
                emoji: t.emoji
            },
            success: function() {
                let e = t.token,
                    n = t.message,
                    i = t.color,
                    s = t.reciever,
                    a = t.emoji;
                if ($(".chat-history-token-" + e + " .message-con").last().hasClass("right")) $.ajax({
                    url: "data/getMessageToken.php",
                    type: "GET",
                    data: {
                        reciever: s
                    },
                    success: function(t) {
                        $.ajax({
                            url: "data/getMessageInfo.php",
                            type: "GET",
                            data: {
                                reciever: s
                            },
                            success: function(o) {
                                let c = $(".chat-history-token-" + e + " .message-con").last().find("span").length;
                                var d;
                                "" != t && o != s || (t = B(20)), d = {
                                    reciever: s,
                                    message: n,
                                    token: e,
                                    color: i,
                                    index: c,
                                    messageToken: t,
                                    emoji: a
                                }, $.ajax({
                                    url: "data/insertMessage.php",
                                    type: "POST",
                                    data: {
                                        reciever: d.reciever,
                                        message: d.message,
                                        token: d.token,
                                        color: d.color,
                                        index: d.index,
                                        messageToken: d.messageToken,
                                        emoji: d.emoji
                                    },
                                    success: function() {
                                        Q()
                                    }
                                }), Q()
                            }
                        })
                    }
                });
                else if ($(".chat-history-token-" + e + " .message-con").last().hasClass("left")) {
                    B(20), $(".chat-history-token-" + e + " .message-con").last().find("span").length
                }
            }
        })
    }

    function K(t) {
        $.ajax({
            url: "client/clients.php",
            type: "POST",
            data: {
                id_reciever: t.reciever,
                message: t.message,
                token: t.token,
                color: t.color,
                action: "keypress",
                isTyping: t.isTyping
            },
            success: function() {}
        })
    }

    function X(t, e) {
        "" == t || "undefined" == t ? ($(".message-container #header .icons svg").css("fill", "#BEC2C9"), $(".message-container #header .icons path").css("fill", "#BEC2C9"), $(".message-container #footer path").css("fill", "#BEC2C9"), $(".message-container #header .icons line").css("stroke", "#BEC2C9")) : ($(".m-" + t + " #header .icons svg").css("fill", e), $(".m-" + t + " #header .icons path").css("fill", e), $(".m-" + t + " #footer  path").css("fill", e), $(".m-" + t + " #header .icons line").css("stroke", e))
    }

    function Q() {
        $.ajax({
            url: "client/clientinbox.php",
            type: "POST",
            data: {
                action: "fetchinbox"
            },
            success: function(t) {
                "yes" == t.fetch ? Z() : function(t, e, n) {
                    n && t.html("");
                    for (let n = 0; n < e; n++) t.append('\n\t\t<div class="inbox-preload">\n\t\t\t<div class="circle"></div>\n\t\t\t<div class="box"></div>\n\t\t</div>\n\t\t')
                }($(".message-inbox"), 10, !0)
            }
        })
    }

    function Z() {
        $.ajax({
            url: "data/fetchMessageInbox.php",
            type: "POST",
            success: function(t) {
                if ("" == t || null == t);
                else if ("empty" == t) {
                    tt('\n\t\t\t\t\t<center>\n\t\t\t\t\t<span class="icon-undraw_mobile_messages_u848" style="width:80%;">' + U("undraw_mobile_messages_u848", "a") + "</span>\n\t\t\t\t\t<h3>You dont have messages yet</h3>\n\t\t\t\t\t</center>\n\t\t\t\t\t")
                } else tt(t)
            }
        })
    }

    function tt(t) {
        $(".message-inbox").html(t)
    }

    function et(t, e) {
        let n = B(10),
            i = '\n\t\t\t\t<div id="notification-float-item" class="notification-count-' + n + '" data-id="' + n + '" data-countdown="0">\n\t\t\t\t\t<div id="header">\n\t\t\t\t\t\t<h4>New Notification</h4>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div id="body" >\n\t\t\t\t\t\t<div class="box">\n\t\t\t\t\t\t\t<div id="profile_pic">\n\t\t\t\t\t\t\t\t<img src="' + e.profile_picture + '">\n\t\t\t\t\t\t\t\t<span><img src="' + t.src + '"></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="info"><p><a href="">' + e.fullname + "</a> <span>" + t.message + "</span></p></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t";
        $(".notification-float-container").prepend(i), setInterval(function() {
            $("#notification-float-item").each(function() {
                let t = $(this).data("id"),
                    e = $(this).data("countdown");
                e++, $(this).data("countdown", e), 5 == e && $(".notification-count-" + t).hide("fast", function() {
                    $(this).remove()
                })
            })
        }, 2e3)
    }

    function nt(t) {
        let e = t.getHours(),
            n = t.getMinutes(),
            i = e >= 12 ? "PM" : "AM";
        return (e = (e %= 12) || 12) + ":" + (n = n < 10 ? "0" + n : n) + " " + i
    }

    function it(t) {
        $.ajax({
            url: "data/getSession.php",
            type: "GET",
            success: function(e) {
                var n = io.connect("http://localhost:" + t);
                n.on("fetchinbox", function(t) {
                    "yes" == t.fetch && Z()
                }), n.on("keypress", function(t) {
                    "yes" == t.isTyping ? $.getJSON("data/getUserinformation.php", {
                        user: t.sender
                    }, function(e, n) {
                        e.fullname;
                        let i = e.profile_picture,
                            s = (e.id, ' \n\t\t\t\t\t\t\t<div class="typing-left">\n\t\t\t\t\t\t\t\t<img src="' + i + '" class="image">\n\t\t\t\t\t\t\t\t<div class="info" style="padding-left:10px;padding-bottom:0px;padding-top:8px;padding-right:15px;">\n\t\t\t\t\t<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="height:20px;width:30px;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">\n\t\t\t\t\t<circle cx="20" cy="57.5" r="15" fill="#85a2b6">\n\t\t\t\t\t  <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>\n\t\t\t\t\t</circle> \n\t\t\t\t\t<circle cx="60" cy="57.5" r="15" fill="#85a2b6">\n\t\t\t\t\t  <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.39999999999999997s"></animate>\n\t\t\t\t\t</circle> \n\t\t\t\t\t<circle cx="100" cy="57.5" r="15" fill="#85a2b6">\n\t\t\t\t\t  <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="57.5;42.5;57.5;57.5" keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.19999999999999998s"></animate>\n\t\t\t\t\t</circle>\n\t\t\t\t\t</svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t');
                        $(".me-" + t.sender + " #body .chat-history .typing-left").length || $(".me-" + t.sender + " #body .chat-history").append(s), R()
                    }) : $(".me-" + t.sender + " #body .chat-history .typing-left").remove()
                }), n.on("new_message", function(t) {
                    if (e == t.sender || e == t.reciever) {
                        let n = t.sender,
                            i = t.reciever,
                            s = t.message;
                        e == n ? function(t) {
                            let e, n = nt(new Date),
                                i = null,
                                s = null;
                            "true" == t.emoji ? (e = t.message, color = "#0084FF", $.ajax({
                                url: "data/insertEmoji.php",
                                type: "GET",
                                data: {
                                    emoji: e,
                                    color: color
                                },
                                success: function(e) {
                                    i = ' \n\t\t      \t\t\t<div class="message-con right">\n\t\t      \t\t\t\t<div class="status">\n\t\t\t\t\t\t\t\t<div class="status-content">\n\t\t\t\t\t\t\t\t\t<div class="image"></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t      \t\t\t\t</div>\n\t\t  \t\t\t\t\t<div class="main-message-container">\n\t\t  \t\t\t\t\t\t<div class="menu">\n\t\t\t  \t\t\t\t\t\t<div class="flex">\n\t\t\t  \t\t\t\t\t\t\t<div class="item hc"><div class="icon-emoji">' + U("emoji", "svg") + '</div><div class="desc">More</div></div>\n\t\t\t\t\t\t\t\t\t\t<div class="item hc"><div class="icon-reload">' + U("reload", "svg") + '</div><div class="desc">Reply</div></div>\n\t\t\t\t\t\t\t\t\t\t<div class="item hc "><div class="icon-more-gray">' + U("more-gray", "svg") + '</div><div class="desc">React</div></div>\n\t\t\t  \t\t\t\t\t\t</div>\n\t\t  \t\t\t\t\t\t</div>\n\t\t  \t\t\t\t\t\t<span class="content right hc" style="background:transparent">\n\t\t  \t\t\t\t\t\t' + e + '\t\n\t\t  \t\t\t\t\t\t<div class="desc">' + n + "<div>\n\t\t  \t\t\t\t\t\t</span>\n\t\t  \t\t\t\t\t</div>\n\t\t  \t\t\t\t</div>\n\t\t\t\t", s = ' \n\t\t\t\t\t\n\t\t      \t\t<div class="main-message-container">\n\t\t\t\t\t<div class="menu">\n\t\t\t\t\t\t<div class="flex">\n\t\t\t\t\t\t\t<div class="item hc"><div class="icon-emoji">' + U("emoji", "mysvg") + '</div><div class="desc">More</div></div>\n\t\t\t\t\t\t<div class="item hc"><div class="icon-reload">' + U("reload", "mysvg") + '</div><div class="desc">Reply</div></div>\n\t\t\t\t\t\t<div class="item hc "><div class="icon-more-gray">' + U("more-gray", "mysvg") + '</div><div class="desc">React</div></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<span class="content right hc" style="background:transparent">\n\t\t\t\t\t' + e + '\t\t\n\t\t\t\t\t<div class="desc">' + n + "<div>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t", $(".chat-history-token-" + t.token + " .message-con").last().hasClass("right") ? $(".chat-history-token-" + t.token + " .message-con.right").last().append(s) : $(".chat-history-token-" + t.token).append(i), R()
                                }
                            })) : (i = ' \n\t      \t\t\t<div class="message-con right">\n\t      \t\t\t\t<div class="status">\n\t\t\t\t\t\t\t<div class="status-content">\n\t\t\t\t\t\t\t\t<div class="image"></div>\n\t\t\t\t\t\t\t</div>\n\t      \t\t\t\t</div>\n\t  \t\t\t\t\t<div class="main-message-container">\n\t  \t\t\t\t\t\t<div class="menu">\n\t\t  \t\t\t\t\t\t<div class="flex">\n\t\t  \t\t\t\t\t\t\t<div class="item hc"><div class="icon-emoji">' + U("emoji", "svg") + '</div><div class="desc">More</div></div>\n\t\t\t\t\t\t\t\t\t<div class="item hc"><div class="icon-reload">' + U("reload", "svg") + '</div><div class="desc">Reply</div></div>\n\t\t\t\t\t\t\t\t\t<div class="item hc "><div class="icon-more-gray">' + U("more-gray", "svg") + '</div><div class="desc">React</div></div>\n\t\t  \t\t\t\t\t\t</div>\n\t  \t\t\t\t\t\t</div>\n\t  \t\t\t\t\t\t<span class="content right hc" style="background:' + t.color + '">\n\t  \t\t\t\t\t\t' + t.message + '\t\n\t  \t\t\t\t\t\t<div class="desc">' + n + "<div>\n\t  \t\t\t\t\t\t</span>\n\t  \t\t\t\t\t</div>\n\t  \t\t\t\t</div>\n\t\t\t", s = ' \n\t      \t\t<div class="main-message-container">\n\t\t\t\t<div class="menu">\n\t\t\t\t\t<div class="flex">\n\t\t\t\t\t\t<div class="item hc"><div class="icon-emoji">' + U("emoji", "mysvg") + '</div><div class="desc">More</div></div>\n\t\t\t\t\t<div class="item hc"><div class="icon-reload">' + U("reload", "mysvg") + '</div><div class="desc">Reply</div></div>\n\t\t\t\t\t<div class="item hc "><div class="icon-more-gray">' + U("more-gray", "mysvg") + '</div><div class="desc">React</div></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<span class="content right hc" style="background:' + t.color + '">\n\t\t\t\t' + t.message + '\t\n\t\t\t\t<div class="desc">' + n + "<div>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t"), $(".chat-history-token-" + t.token + " .message-con").last().hasClass("right") ? $(".chat-history-token-" + t.token + " .message-con.right").last().append(s) : $(".chat-history-token-" + t.token).append(i), R()
                        }(t) : e == i && (0 != $(".me-" + n).length ? $.getJSON("data/getUserinformation.php", {
                            user: n
                        }, function(t, e) {
                            t.fullname;
                            let a = t.profile_picture;
                            t.id;
                            V({
                                message: s,
                                sender: n,
                                reciever: i,
                                picture: a,
                                color: ""
                            })
                        }) : $.getJSON("data/getUserinformation.php", {
                            user: n
                        }, function(t, e) {
                            let i = t.fullname,
                                a = t.profile_picture;
                            G({
                                id: t.id,
                                name: i,
                                picture: a,
                                color: "#0084FF",
                                message: s,
                                sender: n,
                                reciverColor: ""
                            })
                        })), Q()
                    }
                }), n.on("react-to-post", function(t) {
                    v(t.id)
                }), n.on("comment-to-post", function(t) {
                    v(t.id), $.getJSON("data/getPostInformation.php", {
                        post: t.id
                    }, function(n, i) {
                        $.getJSON("data/getPostCommentInformation.php", {
                            comment: t.code
                        }, function(i, s) {
                            $.getJSON("data/getUserinformation.php", {
                                user: i.id
                            }, function(s, a) {
                                $.getJSON("data/getUserinformation.php", {
                                    user: e
                                }, function(e, a) {
                                    A(t.comment, e, s, n, i)
                                })
                            })
                        })
                    })
                }), n.on("reply-to-comment", function(t) {
                    v(t.id), $.getJSON("data/getPostInformation.php", {
                        post: t.id
                    }, function(n, i) {
                        $.getJSON("data/getPostCommentInformation.php", {
                            comment: t.code
                        }, function(i, s) {
                            $.getJSON("data/getUserinformation.php", {
                                user: i.id
                            }, function(s, a) {
                                $.getJSON("data/getUserinformation.php", {
                                    user: e
                                }, function(e, a) {
                                    A(t.comment, e, s, n, i)
                                })
                            })
                        })
                    })
                }), n.on("new-notification", function(t) {
                    t.to_id == e && t.from_id != t.to_id && $.getJSON("data/getUserinformation.php", {
                        user: t.from_id
                    }, function(e, n) {
                        et(t, e)
                    })
                })
            }
        })
    }
    $(document).on("click", ".save-story", function() {
        var t;
        ! function(t) {
            new Image;
            domtoimage.toPng(t).then(function(t) {
                var e = new Image;
                e.src = t, e.onload = function() {
                    m.data = t
                }
            }).catch(function(t) {
                console.error("oops, something went wrong!", t)
            })
        }(document.getElementById("main-story-preview")), null != m.data ? (t = {
            storyData: m.data,
            privacy: "public",
            type: "story",
            with: null,
            tag: null
        }, $.ajax({
            url: "data/insertToStory.php",
            type: "POST",
            data: t,
            success: function(t) {
                "success" == t && $(".save-story span").html("Shared")
            }
        })) : setTimeout(function() {
            $(".save-story span").html("Share to Story")
        }, 1e3)
    }), $(document).on("click", ".settings-list", function(t) {
        t.preventDefault(), N($(this).attr("href")), z(), $(this).addClass("active"), $(".settings-list").not($(this)).removeClass("active")
    }), $(document).on("click", ".settings-tab-section", function(t) {
        t.preventDefault(), N($(this).attr("href"))
    }), $(document).on("click", ".list-picker .main-picker", function() {
        $(this).parent().find("div").each(function() {
            $(this).hasClass("picker-container") && $(this).toggle()
        })
    }), $(document).on("click", ".picker-container li", function() {
        let t = $(this).find("span").html();
        $(this).parent().toggle(), $(this).parent().parent().find("div.main-picker").find("div.main-font").find("span").html(t)
    }), $(document).on("click", ".list-picker.add .main-picker .square", function() {
        let t = $(this).find("span").html(),
            e = "";
        "Text" == t ? e = '\n\t\t\t\t<div class="appended-text">\n\t\t\t\t\t<div class="textarea" contenteditable placeholder="Aa">Type Something...</div>\n\t\t\t\t</div>\n\t\t\t' : "Image" == t ? $(".append-image-story").click() : "Sticker" == t || "Draw" == t && ($(".story-draw-editor").html('\n\t\t<div class="story-content-body">\n\t\t<div class="list-picker">\n\t\t\t<div class="main-picker">\n\t\t\t\t<div class="square">\n\t\t\t\t\tBrush\n\t\t\t\t</div>\n\t\t\t\t<div class="main-font">\n\t\t\t\t\t<span>Normal Brush</span>\n\t\t\t\t</div>\n\t\t\t\t<?php echo insvg("down-arrow") ?>\n\t\t\t</div>\n\t\t\t<div class="picker-container brush-style-picker" style="background: #FFF;z-index: 888">\n\t\t\t\t<li><span>Normal Brush</span></li>\n\t\t\t\t<li><span>Caligrapy 1</span></li>\n\t\t\t\t<li><span>Caligrapy 2</span></li>\n\t\t\t\t<li><span>Airbrush</span></li>\n\t\t\t\t<li><span>Oil Brush</span></li>\n\t\t\t\t<li><span>Crayon</span></li>\n\t\t\t\t<li><span>Watercolor Brush</span></li>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="list-picker">\n\t\t\t<div class="main-picker">\n\t\t\t\t<div class="square">\n\t\t\t\t\tSize\n\t\t\t\t</div>\n\t\t\t\t<div class="main-font brushes">\n\t\t\t\t\t<span><div class="brush-sizes size-1"></div></span>\n\t\t\t\t</div>\n\t\t\t\t<?php echo insvg("down-arrow") ?>\n\t\t\t</div>\n\t\t\t<div class="picker-container brushes" style="background: #FFF;z-index: 888">\n\t\t\t\t<li data-size="2"><span><div class="brush-sizes size-1"></div></span></li>\n\t\t\t\t<li data-size="4"><span><div class="brush-sizes size-2"></div></span></li>\n\t\t\t\t<li data-size="6"><span><div class="brush-sizes size-3"></div></span></li>\n\t\t\t\t<li data-size="8"><span><div class="brush-sizes size-4"></div></span></li>\n\t\t\t\t<li data-size="10"><span><div class="brush-sizes size-5"></div></span></li>\n\t\t\t</div>\n\t\t</div>\n\t\t\t<div class="list-picker">\n\t\t\t<div class="main-picker">\n\t\t\t\t<div class="square">\n\t\t\t\t\tCap\n\t\t\t\t</div>\n\t\t\t\t<div class="main-font brushes">\n\t\t\t\t\t<span>Round</span>\n\t\t\t\t</div>\n\t\t\t\t<?php echo insvg("down-arrow") ?>\n\t\t\t</div>\n\t\t\t<div class="picker-container brushesCap">\n\t\t\t\t<li data-cap="round"><span>Round</span></li>\n\t\t\t\t<li data-cap="square"><span>Square</span></li>\n\t\t\t\t<li data-cap="butt"><span>Butt</span></li>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="content-picker brush-editor-container">\n\t\t\t<p>Color</p>\n\t\t\t<div class="main-picker">\n\n\t\t\t</div>\n\t\t\t<div class="footer view-more-brush-color" value="show">\n\t\t\t\t<div class="icon-down-arrow"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t'), w(16, !1, "brush-color"), k(), U("down-arrow", ""), $(document).on("click", ".story-brush-colors", function() {
            let t = $(this).data("value");
            $("#storyCanvas").attr("data-color", t), k()
        }), $(document).on("click", ".picker-container.brushes li", function() {
            let t = $(this).attr("data-size");
            $("#storyCanvas").attr("data-size", t), k()
        }), $(document).on("click", ".picker-container.brushesCap li", function() {
            let t = $(this).attr("data-cap");
            $("#storyCanvas").attr("data-cap", t), k()
        }), $(document).on("click", ".brush-style-picker li", function() {
            let t = $(this).find("span").html();
            $("#storyCanvas").attr("data-brush", t), k()
        }), u("draw")), C(e)
    }), $(document).on("click", ".story-textarea", function() {
        "on" == $(this).find("div").attr("value") ? (newValue = "off", $(".story-main-textbox").prop("disabled", !1), $(".main-story-preview .main-textbox").show()) : (newValue = "on", $(".story-main-textbox").prop("disabled", !0), $(".main-story-preview .main-textbox").hide())
    }), $(document).on("click", ".textarea", function() {
        $(this).focus()
    }), $(document).on("click", ".view-more-brush-color", function() {
        "show" == $(this).attr("value") ? ($(this).attr("value", "hide"), w(255, !1, "brush-color")) : ($(this).attr("value", "show"), w(16, !0, "brush-color"))
    }), $(document).on("click", ".view-more-fonts-color", function() {
        "show" == $(this).attr("value") ? ($(this).attr("value", "hide"), w(255, !1, "fonts")) : ($(this).attr("value", "show"), w(16, !0, "fonts"))
    }), $(document).on("click", ".view-more-background-color", function() {
        "show" == $(this).attr("value") ? ($(this).attr("value", "hide"), w(255, !1, "text-background")) : ($(this).attr("value", "show"), w(16, !0, "text-background"))
    }), $(document).on("click", ".main-story-preview", function(t) {
        let e = t.target;
        e.classList.contains("appended-text") ? (u("appended-text"), a = e, x(e)) : e.parentNode.classList.contains("appended-text") ? (u("appended-text"), a = e, x(e)) : e.classList.contains("appended-image-background") ? (u("appended-image-background"), a = e) : e.classList.contains("appended-image") ? (u("appended-image"), a = e, function(t) {
            let e = t.width,
                n = t.height;
            $(".story-image-editor").html('\n\t<div class="story-content-body">\n\t<div class="list-picker">\n\t\t<div class="main-picker">\n\t\t\t<div class="main-font">\n\t\t\t\t<span>Filter</span>\n\t\t\t</div>\n\t\t\t<?php echo insvg("down-arrow") ?>\n\t\t</div>\n\t\t<div class="picker-container" style="z-index: 999 !important">\n\t\t\t<div class="item">\n\t\t\t\t<div class="name"><span>Combine</span></div>\n\t\t\t\t<div class="switch relative story-image-filter" data-value="combine">\n\t\t\t\t\t<div class="onOff" value="off"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="item">\n\t\t\t\t<div class="name"><span>Grayscale</span></div>\n\t\t\t\t<div class="switch relative story-image-filter" data-value="grayscale">\n\t\t\t\t\t<div class="onOff" value="off"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="item">\n\t\t\t\t<div class="name"><span>Sepia</span></div>\n\t\t\t\t<div class="switch relative story-image-filter" data-value="sepia">\n\t\t\t\t\t<div class="onOff" value="off"></div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class="item">\n\t\t\t\t<div class="name"><span>Blur</span></div>\n\t\t\t\t<div class="switch relative story-image-filter" data-value="blur">\n\t\t\t\t\t<div class="onOff" value="off"></div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class="item">\n\t\t\t\t<div class="name"><span>Saturate</span></div>\n\t\t\t\t<div class="switch relative story-image-filter" data-value="saturate">\n\t\t\t\t\t<div class="onOff" value="off"></div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class="item">\n\t\t\t\t<div class="name"><span>Hue</span></div>\n\t\t\t\t<div class="switch relative story-image-filter" data-value="hue">\n\t\t\t\t\t<div class="onOff" value="off"></div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class="item">\n\t\t\t\t<div class="name"><span>Invert</span></div>\n\t\t\t\t<div class="switch relative story-image-filter" data-value="invert">\n\t\t\t\t\t<div class="onOff" value="off"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="item">\n\t\t\t\t<div class="name"><span>Darken</span></div>\n\t\t\t\t<div class="switch relative story-image-filter" data-value="darken">\n\t\t\t\t\t<div class="onOff" value="off"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="item">\n\t\t\t\t<div class="name"><span>Contrast</span></div>\n\t\t\t\t<div class="switch relative story-image-filter" data-value="contrast">\n\t\t\t\t\t<div class="onOff" value="off"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\n\t\t</div> \n\t\t<div class="list-picker add imageConfiguaration">\n\t\t\t<span>Width & Height</span>\n\t\t\t<div class="form">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<input type="number" class="imageWidth" name="" placeholder="Width">\n\t\t\t\t</div>\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<input type="number" class="imageHeight"name="" placeholder="Height">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t'), $(".imageConfiguaration .form .imageWidth").val(e), $(".imageConfiguaration .form .imageHeight").val(n), $(document).on("input", ".imageConfiguaration .form .imageWidth", function() {
                e = $(this).val(), t.width = e, n = t.height, $(".imageConfiguaration .form .imageHeight").val(n)
            }), $(document).on("input", ".imageConfiguaration .form .imageHeight", function() {
                n = $(this).val(), t.height = n, e = t.width, $(".imageConfiguaration .form .imageWidth").val(e)
            })
        }(e)) : $(".story-draw-editor").is(":hidden") && (u("no-target"), a = null)
    }), $(document).on("click", ".sticker-tabs", function() {
        let t = $(this).data("stickername");
        cutSticker({
            src: t,
            div: document.getElementById("fetch-all-stickers-container"),
            ToElem: document.getElementById("fetch-all-stickers-container-png"),
            refresh: !0,
            count: "all"
        })
    }), $(document).on("click", ".li-see-more", function() {
        $(".li-hidden").css("display", "block"), $(this).hide()
    }), $(document).on("click", ".li-see-less", function() {
        $(".li-hidden").css("display", "none"), $(this).hide(), $(".li-see-more").show()
    }), $(document).on("click", ".set-li .main-set", function() {
        $(this).parent().find("div").eq(2).toggle(), $(this).find("div").toggleClass("rotate")
    }), $(document).on("click", ".playandpause", function() {
        h(), b()
    }), $(document).on("click", ".no-story-content", function() {
        let t = L("id"),
            e = L("code");
        if (null != t && null != e) return y(t, e), !1;
        let n = o[0];
        $(".user-story-list").each(function() {
            $(this).data("id") == n && (f(), $(".user-story-list").not($(this)).removeClass("active"), $(this).addClass("active"), g("select", n))
        })
    }), $(document).on("click", ".user-story-list", function() {
        let t = $(this).find("div.info").find("p").html();
        $(".user-story-list").not($(this)).removeClass("active"), $(this).addClass("active"), $.getJSON("data/getUserinformation.php", {
            user: t
        }, function(t, e) {
            s = !1, g("select", t.id)
        })
    }), $(document).on("click", ".next-story", function() {
        g("next")
    }), $(document).on("click", ".prev-story", function() {
        g("prev")
    }), $(document).on("click", ".story-container .item.me", function() {
        N("stories?a=create"), z()
    }), $(document).on("click", ".story-container .item", function() {
        let t = $(this).data("id"),
            e = $(this).data("code"),
            n = $(this).data("index");
        null != t && null != e && null != n ? (N("stories?id=" + t + "&code=" + e + "&index=" + n), z()) : alert("no content")
    }), $(document).on("mouseover", ".story-reaction-container", function() {
        s = !0, h(), b()
    }), $(document).on("mouseout", ".story-reaction-container", function() {
        s = !1, h(), b()
    }), window.onscroll = function() {
        S()
    }, $(".skill-con").each(function() {
        let t = $(this).find("div").find("div").attr("value");
        t += "%", $(this).find("div").find("div").css("width", t)
    }), $(document).on("click", ".profile-menu-button .item", function() {
        let t = $(this).find("span").html().toLowerCase();
        "more" != t ? I(t) : alert("more")
    }), $(document).on("click", ".profile-content-buttons .button", function() {
        let t = $(this).data("f"),
            e = $(this).parent().data("user");
        switch (t) {
            case "add-friend":
                F(e, $(this).find("p"), "add-friend"), E(e);
                break;
            case "cancel-friend-request":
                F(e, $(this).find("p"), "cancel-friend-request"), E(e);
                break;
            case "accept-friend-request":
                F(e, $(this).find("p"), "accept-friend-request"), E(e);
                break;
            case "message":
                $.getJSON("data/getUserinformation.php", {
                    user: e
                }, function(t, e) {
                    G({
                        id: t.id,
                        name: t.fullname,
                        picture: t.profile_picture,
                        color: "#FFA51B"
                    })
                })
        }
    }), $(document).on("click", ".post-preview-button", function() {
        let t, e, n = L("id"),
            i = L("post");
        N(e = "photo?id=" + n + "&index=" + (t = null != $(this).data("prev") ? $(this).data("prev") : $(this).data("next")) + "&post=" + i), z()
    }), $(document).on("click", ".float-circle", function() {
        $.ajax({
            url: "data/getAllUser.php",
            type: "GET",
            success: function(t) {
                let e = ' \n\t\t\t\t<div class="message-container newEmptyChatBox">\n\t\t\t      \t\t<div id="header">\n\t\t\t      \t\t\t<h2>New Message</h2>\n\n\t\t\t      \t\t\t<div class="search-engine-container">\n\t\t\t      \t\t\t\t<label>To: </label>\n\t\t\t      \t\t\t\t<input type="text" class="contact-search-engine">\n\t\t\t      \t\t\t</div>\n\n\t\t\t      \t\t</div>\n\t\t\t      \t\t<div id="body">\n\t\t\t      \t\t\t<div class="contact-tab">\n\t\t\t\t\t\t\t\t<div class="item"><span>Suggested</span></div>\n\t\t\t\t\t\t\t\t<div class="item active"><span>Active</span></div>\n\t\t\t      \t\t\t</div>\n\t\t\t      \t\t\t<div class="contact-list">' + t + "\n\t\t\t      \t\t\t</div>\n\t\t\t      \t\t</div>\n\t\t\t      \t</div>\n\t\t\t\t\t";
                $(".message-big-pipe-container").prepend(e)
            }
        })
    }), $(document).on("mouseover", "#notification-float-item", function() {
        $(this).data("countdown", 0)
    }), window.addEventListener("popstate", function(t) {
        z()
    }), $(document).on("keydown", function(t) {}), $.ajax({
        url: "port.txt",
        type: "GET",
        success: function(t) {
            it(t)
        }
    }), z(), S(), Q(), R(), J(), setInterval(function() {}, 6e4), setInterval(function() {
        $.ajax({
            url: "data/updateUserStatus.php",
            type: "POST",
            success: function(t) {}
        })
    }, 5e3), f()
});