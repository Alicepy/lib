!function(a, b) {
    b["true"] = a,
        textAngularSetup = angular.module("textAngularSetup", []),
        textAngularSetup.value("taOptions", {
            toolbar: [["h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "quote"], ["bold", "italics", "underline", "ul", "ol", "redo", "undo", "clear"], ["justifyLeft", "justifyCenter", "justifyRight"], ["html", "insertImage", "insertLink", "insertVideo"]],
            classes: {
                focussed: "focussed",
                toolbar: "btn-toolbar",
                toolbarGroup: "btn-group",
                toolbarButton: "btn btn-default",
                toolbarButtonActive: "active",
                disabled: "disabled",
                textEditor: "form-control",
                htmlEditor: "form-control"
            },
            setup: {
                textEditorSetup: function() {},
                htmlEditorSetup: function() {}
            },
            defaultFileDropHandler: function(a, b) {
                var c = new FileReader;
                return "image" === a.type.substring(0, 5) ? (c.onload = function() {
                    "" !== c.result && b("insertImage", c.result, !0)
                },
                    c.readAsDataURL(a), !0) : !1
            }
        }),
        textAngularSetup.value("taSelectableElements", ["a", "img"]),
        textAngularSetup.value("taCustomRenderers", [{
            selector: "img",
            customAttribute: "ta-insert-video",
            renderLogic: function(a) {
                var b = angular.element("<iframe></iframe>"),
                    c = a.prop("attributes");
                angular.forEach(c,
                    function(a) {
                        b.attr(a.name, a.value)
                    }),
                    b.attr("src", b.attr("ta-insert-video")),
                    a.replaceWith(b)
            }
        }]),
        textAngularSetup.constant("taTranslations", {
            toggleHTML: "Toggle HTML",
            insertImage: "Please enter a image URL to insert",
            insertLink: "Please enter a URL to insert",
            insertVideo: "Please enter a youtube URL to embed"
        }),
        textAngularSetup.run(["taRegisterTool", "$window", "taTranslations", "taSelection",
            function(a, b, c, d) {
                a("html", {
                    buttontext: c.toggleHTML,
                    action: function() {
                        this.$editor().switchView()
                    },
                    activeState: function() {
                        return this.$editor().showHtml
                    }
                });
                var e = function(a) {
                        return function() {
                            return this.$editor().queryFormatBlockState(a)
                        }
                    },
                    f = function() {
                        return this.$editor().wrapSelection("formatBlock", "<" + this.name.toUpperCase() + ">")
                    };
                angular.forEach(["h1", "h2", "h3", "h4", "h5", "h6"],
                    function(b) {
                        a(b.toLowerCase(), {
                            buttontext: b.toUpperCase(),
                            action: f,
                            activeState: e(b.toLowerCase())
                        })
                    }),
                    a("p", {
                        buttontext: "P",
                        action: function() {
                            return this.$editor().wrapSelection("formatBlock", "<P>")
                        },
                        activeState: function() {
                            return this.$editor().queryFormatBlockState("p")
                        }
                    }),
                    a("pre", {
                        buttontext: "pre",
                        action: function() {
                            return this.$editor().wrapSelection("formatBlock", "<PRE>")
                        },
                        activeState: function() {
                            return this.$editor().queryFormatBlockState("pre")
                        }
                    }),
                    a("ul", {
                        iconclass: "fa fa-list-ul",
                        action: function() {
                            return this.$editor().wrapSelection("insertUnorderedList", null)
                        },
                        activeState: function() {
                            return document.queryCommandState("insertUnorderedList")
                        }
                    }),
                    a("ol", {
                        iconclass: "fa fa-list-ol",
                        action: function() {
                            return this.$editor().wrapSelection("insertOrderedList", null)
                        },
                        activeState: function() {
                            return document.queryCommandState("insertOrderedList")
                        }
                    }),
                    a("quote", {
                        iconclass: "fa fa-quote-right",
                        action: function() {
                            return this.$editor().wrapSelection("formatBlock", "<BLOCKQUOTE>")
                        },
                        activeState: function() {
                            return this.$editor().queryFormatBlockState("blockquote")
                        }
                    }),
                    a("undo", {
                        iconclass: "fa fa-undo",
                        action: function() {
                            return this.$editor().wrapSelection("undo", null)
                        }
                    }),
                    a("redo", {
                        iconclass: "fa fa-repeat",
                        action: function() {
                            return this.$editor().wrapSelection("redo", null)
                        }
                    }),
                    a("bold", {
                        iconclass: "fa fa-bold",
                        action: function() {
                            return this.$editor().wrapSelection("bold", null)
                        },
                        activeState: function() {
                            return document.queryCommandState("bold")
                        },
                        commandKeyCode: 98
                    }),
                    a("justifyLeft", {
                        iconclass: "fa fa-align-left",
                        action: function() {
                            return this.$editor().wrapSelection("justifyLeft", null)
                        },
                        activeState: function(a) {
                            var b = !1;
                            return a && (b = "left" === a.css("text-align") || "left" === a.attr("align") || "right" !== a.css("text-align") && "center" !== a.css("text-align") && !document.queryCommandState("justifyRight") && !document.queryCommandState("justifyCenter")),
                                b = b || document.queryCommandState("justifyLeft")
                        }
                    }),
                    a("justifyRight", {
                        iconclass: "fa fa-align-right",
                        action: function() {
                            return this.$editor().wrapSelection("justifyRight", null)
                        },
                        activeState: function(a) {
                            var b = !1;
                            return a && (b = "right" === a.css("text-align")),
                                b = b || document.queryCommandState("justifyRight")
                        }
                    }),
                    a("justifyCenter", {
                        iconclass: "fa fa-align-center",
                        action: function() {
                            return this.$editor().wrapSelection("justifyCenter", null)
                        },
                        activeState: function(a) {
                            var b = !1;
                            return a && (b = "center" === a.css("text-align")),
                                b = b || document.queryCommandState("justifyCenter")
                        }
                    }),
                    a("italics", {
                        iconclass: "fa fa-italic",
                        action: function() {
                            return this.$editor().wrapSelection("italic", null)
                        },
                        activeState: function() {
                            return document.queryCommandState("italic")
                        },
                        commandKeyCode: 105
                    }),
                    a("underline", {
                        iconclass: "fa fa-underline",
                        action: function() {
                            return this.$editor().wrapSelection("underline", null)
                        },
                        activeState: function() {
                            return document.queryCommandState("underline")
                        },
                        commandKeyCode: 117
                    }),
                    a("clear", {
                        iconclass: "fa fa-ban",
                        action: function(a, b) {
                            this.$editor().wrapSelection("removeFormat", null);
                            var c = angular.element(d.getSelectionElement()),
                                e = function(a) {
                                    a = angular.element(a);
                                    var b = a;
                                    angular.forEach(a.children(),
                                        function(a) {
                                            var c = angular.element("<p></p>");
                                            c.html(angular.element(a).html()),
                                                b.after(c),
                                                b = c
                                        }),
                                        a.remove()
                                };
                            angular.forEach(c.find("ul"), e),
                                angular.forEach(c.find("ol"), e);
                            var f = this.$editor(),
                                g = function(a) {
                                    a = angular.element(a),
                                        a[0] !== f.displayElements.text[0] && a.removeAttr("class"),
                                        angular.forEach(a.children(), g)
                                };
                            angular.forEach(c, g),
                                "li" !== c[0].tagName.toLowerCase() && "ol" !== c[0].tagName.toLowerCase() && "ul" !== c[0].tagName.toLowerCase() && this.$editor().wrapSelection("formatBlock", "<p>"),
                                b()
                        }
                    });
                var g = function(a, b, c) {
                    var d = function() {
                        c.updateTaBindtaTextElement(),
                            c.hidePopover()
                    };
                    a.preventDefault(),
                        c.displayElements.popover.css("width", "375px");
                    var e = c.displayElements.popoverContainer;
                    e.empty();
                    var f = angular.element('<div class="btn-group" style="padding-right: 6px;">'),
                        g = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');
                    g.on("click",
                        function(a) {
                            a.preventDefault(),
                                b.css({
                                    width: "100%",
                                    height: ""
                                }),
                                d()
                        });
                    var h = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');
                    h.on("click",
                        function(a) {
                            a.preventDefault(),
                                b.css({
                                    width: "50%",
                                    height: ""
                                }),
                                d()
                        });
                    var i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');
                    i.on("click",
                        function(a) {
                            a.preventDefault(),
                                b.css({
                                    width: "25%",
                                    height: ""
                                }),
                                d()
                        });
                    var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');
                    j.on("click",
                        function(a) {
                            a.preventDefault(),
                                b.css({
                                    width: "",
                                    height: ""
                                }),
                                d()
                        }),
                        f.append(g),
                        f.append(h),
                        f.append(i),
                        f.append(j),
                        e.append(f),
                        f = angular.element('<div class="btn-group" style="padding-right: 6px;">');
                    var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');
                    k.on("click",
                        function(a) {
                            a.preventDefault(),
                                b.css("float", "left"),
                                d()
                        });
                    var l = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');
                    l.on("click",
                        function(a) {
                            a.preventDefault(),
                                b.css("float", "right"),
                                d()
                        });
                    var m = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');
                    m.on("click",
                        function(a) {
                            a.preventDefault(),
                                b.css("float", ""),
                                d()
                        }),
                        f.append(k),
                        f.append(m),
                        f.append(l),
                        e.append(f),
                        f = angular.element('<div class="btn-group">');
                    var n = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');
                    n.on("click",
                        function(a) {
                            a.preventDefault(),
                                b.remove(),
                                d()
                        }),
                        f.append(n),
                        e.append(f),
                        c.showPopover(b),
                        c.showResizeOverlay(b)
                };
                a("insertImage", {
                    iconclass: "fa fa-picture-o",
                    action: function() {
                        var a;
                        return a = b.prompt(c.insertImage, "http://"),
                                a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("insertImage", a, !0) : void 0
                    },
                    onElementSelect: {
                        element: "img",
                        action: g
                    }
                }),
                    a("insertVideo", {
                        iconclass: "fa fa-youtube-play",
                        action: function() {
                            var a;
                            if (a = b.prompt(c.insertVideo, "http://"), a && "" !== a && "http://" !== a) {
                                var d = a.match(/(\?|&)v=[^&]*/);
                                if (d.length > 0) {
                                    var e = "http://www.youtube.com/embed/" + d[0].substring(3),
                                        f = '<img class="ta-insert-video" ta-insert-video="' + e + '" contenteditable="false" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/>';
                                    return this.$editor().wrapSelection("insertHTML", f, !0)
                                }
                            }
                        },
                        onElementSelect: {
                            element: "img",
                            onlyWithAttrs: ["ta-insert-video"],
                            action: g
                        }
                    }),
                    a("insertLink", {
                        iconclass: "fa fa-link",
                        action: function() {
                            var a;
                            return a = b.prompt(c.insertLink, "http://"),
                                    a && "" !== a && "http://" !== a ? this.$editor().wrapSelection("createLink", a, !0) : void 0
                        },
                        activeState: function(a) {
                            return a ? "A" === a[0].tagName: !1
                        },
                        onElementSelect: {
                            element: "a",
                            action: function(a, d, e) {
                                a.preventDefault(),
                                    e.displayElements.popover.css("width", "305px");
                                var f = e.displayElements.popoverContainer;
                                f.empty(),
                                    f.css("line-height", "28px");
                                var g = angular.element('<a href="' + d.attr("href") + '" target="_blank">' + d.attr("href") + "</a>");
                                g.css({
                                    display: "inline-block",
                                    "max-width": "200px",
                                    overflow: "hidden",
                                    "text-overflow": "ellipsis",
                                    "white-space": "nowrap",
                                    "vertical-align": "middle"
                                }),
                                    f.append(g);
                                var h = angular.element('<div class="btn-group pull-right">'),
                                    i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-edit icon-edit"></i></button>');
                                i.on("click",
                                    function(a) {
                                        a.preventDefault();
                                        var f = b.prompt(c.insertLink, d.attr("href"));
                                        f && "" !== f && "http://" !== f && (d.attr("href", f), e.updateTaBindtaTextElement()),
                                            e.hidePopover()
                                    }),
                                    h.append(i);
                                var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-unlink icon-unlink"></i></button>');
                                j.on("click",
                                    function(a) {
                                        a.preventDefault(),
                                            d.replaceWith(d.contents()),
                                            e.updateTaBindtaTextElement(),
                                            e.hidePopover()
                                    }),
                                    h.append(j),
                                    f.append(h),
                                    e.showPopover(d)
                            }
                        }
                    })
            }]),
        function() {
            "Use Strict";
            function a(a) {
                try {
                    return 0 !== angular.element(a).length
                } catch(b) {
                    return ! 1
                }
            }
            function b(a, c) {
                var d = [],
                    e = a.children();
                return e.length && angular.forEach(e,
                    function(a) {
                        d = d.concat(b(angular.element(a), c))
                    }),
                    void 0 !== a.attr(c) && d.push(a),
                    d
            }
            function c(b, c) {
                if (!b || "" === b || m.hasOwnProperty(b)) throw "textAngular Error: A unique name is required for a Tool Definition";
                if (c.display && ("" === c.display || !a(c.display)) || !c.display && !c.buttontext && !c.iconclass) throw 'textAngular Error: Tool Definition for "' + b + '" does not have a valid display/iconclass/buttontext value';
                m[b] = c
            }
            var d = !1;
            /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && (document.addEventListener("click",
                function() {
                    var a = window.event.target;
                    if (d && null !== a) {
                        for (var b = !1,
                                 c = a; null !== c && "html" !== c.tagName.toLowerCase() && !b;) b = "true" === c.contentEditable,
                            c = c.parentNode;
                        b || (document.getElementById("textAngular-editableFix-010203040506070809").setSelectionRange(0, 0), a.focus())
                    }
                    d = !1
                },
                !1), angular.element(document.body).append('<input id="textAngular-editableFix-010203040506070809" style="width:1px;height:1px;border:none;margin:0;padding:0;position:absolute; top: -10000; left: -10000;" unselectable="on" tabIndex="-1">'));
            var e = function() {
                var a, b = -1,
                    c = window.navigator.userAgent,
                    d = c.indexOf("MSIE "),
                    e = c.indexOf("Trident/");
                if (d > 0) b = parseInt(c.substring(d + 5, c.indexOf(".", d)), 10);
                else if (e > 0) {
                    var f = c.indexOf("rv:");
                    b = parseInt(c.substring(f + 3, c.indexOf(".", f)), 10)
                }
                return b > -1 ? b: a
            } ();
            "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
                return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            });
            var f, g, h;
            if (e > 8 || void 0 === e) {
                var j = function() {
                    var a = document.createElement("style");
                    return /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && a.appendChild(document.createTextNode("")),
                        document.head.insertBefore(a, document.head.firstChild),
                        a.sheet
                } ();
                f = function() {
                    var a = document.createElement("style");
                    return /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent) && a.appendChild(document.createTextNode("")),
                        document.head.appendChild(a),
                        a.sheet
                } (),
                    g = function(a, b) {
                        _addCSSRule(f, a, b)
                    },
                    _addCSSRule = function(a, b, c) {
                        var d;
                        return a.rules ? d = Math.max(a.rules.length - 1, 0) : a.cssRules && (d = Math.max(a.cssRules.length - 1, 0)),
                            a.insertRule ? a.insertRule(b + "{" + c + "}", d) : a.addRule(b, c, d),
                            d
                    },
                    h = function(a) {
                        _removeCSSRule(f, a)
                    },
                    _removeCSSRule = function(a, b) {
                        a.removeRule ? a.removeRule(b) : a.deleteRule(b)
                    },
                    _addCSSRule(j, ".ta-scroll-window.form-control", "height: 300px; overflow: auto; font-family: inherit; font-size: 100%; position: relative; padding: 0;"),
                    _addCSSRule(j, ".ta-root.focussed .ta-scroll-window.form-control", "border-color: #66afe9; outline: 0; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);"),
                    _addCSSRule(j, ".ta-editor.ta-html", "min-height: 300px; height: auto; overflow: auto; font-family: inherit; font-size: 100%;"),
                    _addCSSRule(j, ".ta-scroll-window .ta-bind", "height: auto; min-height: 300px; padding: 6px 12px;"),
                    _addCSSRule(j, ".ta-root .ta-resizer-handle-overlay", "z-index: 100; position: absolute; display: none;"),
                    _addCSSRule(j, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-info", "position: absolute; bottom: 16px; right: 16px; border: 1px solid black; background-color: #FFF; padding: 0 4px; opacity: 0.7;"),
                    _addCSSRule(j, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-background", "position: absolute; bottom: 5px; right: 5px; left: 5px; top: 5px; border: 1px solid black; background-color: rgba(0, 0, 0, 0.2);"),
                    _addCSSRule(j, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner", "width: 10px; height: 10px; position: absolute;"),
                    _addCSSRule(j, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tl", "top: 0; left: 0; border-left: 1px solid black; border-top: 1px solid black;"),
                    _addCSSRule(j, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-tr", "top: 0; right: 0; border-right: 1px solid black; border-top: 1px solid black;"),
                    _addCSSRule(j, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-bl", "bottom: 0; left: 0; border-left: 1px solid black; border-bottom: 1px solid black;"),
                    _addCSSRule(j, ".ta-root .ta-resizer-handle-overlay > .ta-resizer-handle-corner-br", "bottom: 0; right: 0; border: 1px solid black; cursor: se-resize; background-color: white;")
            }
            var k = !1,
                l = angular.module("textAngular", ["ngSanitize", "textAngularSetup"]),
                m = {};
            l.constant("taRegisterTool", c),
                l.value("taTools", m),
                l.config([function() {
                    angular.forEach(m,
                        function(a, b) {
                            delete m[b]
                        })
                }]),
                l.directive("textAngular", ["$compile", "$timeout", "taOptions", "taSanitize", "taSelection", "taExecCommand", "textAngularManager", "$window", "$document", "$animate", "$log",
                    function(a, b, c, d, e, f, g, h, i, j, k) {
                        return {
                            require: "?ngModel",
                            scope: {},
                            restrict: "EA",
                            link: function(d, l, m, n) {
                                var o, p, q, r, s, t, u, v, w, x = Math.floor(1e16 * Math.random()),
                                    y = m.name ? m.name: "textAngularEditor" + x,
                                    z = function(a, c, d) {
                                        b(function() {
                                                var b = function() {
                                                    a.off(c, b),
                                                        d()
                                                };
                                                a.on(c, b)
                                            },
                                            100)
                                    };
                                w = f(m.taDefaultWrap),
                                    angular.extend(d, angular.copy(c), {
                                        wrapSelection: function(a, b, c) {
                                            w(a, !1, b),
                                                c && d["reApplyOnSelectorHandlerstaTextElement" + x](),
                                                d.displayElements.text[0].focus()
                                        },
                                        showHtml: !1
                                    }),
                                    m.taFocussedClass && (d.classes.focussed = m.taFocussedClass),
                                    m.taTextEditorClass && (d.classes.textEditor = m.taTextEditorClass),
                                    m.taHtmlEditorClass && (d.classes.htmlEditor = m.taHtmlEditorClass),
                                    m.taTextEditorSetup && (d.setup.textEditorSetup = d.$parent.$eval(m.taTextEditorSetup)),
                                    m.taHtmlEditorSetup && (d.setup.htmlEditorSetup = d.$parent.$eval(m.taHtmlEditorSetup)),
                                    d.fileDropHandler = m.taFileDrop ? d.$parent.$eval(m.taFileDrop) : d.defaultFileDropHandler,
                                    u = l[0].innerHTML,
                                    l[0].innerHTML = "",
                                    d.displayElements = {
                                        forminput: angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),
                                        html: angular.element("<textarea></textarea>"),
                                        text: angular.element("<div></div>"),
                                        scrollWindow: angular.element("<div class='ta-scroll-window'></div>"),
                                        popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"><div class="arrow"></div></div>'),
                                        popoverContainer: angular.element('<div class="popover-content"></div>'),
                                        resize: {
                                            overlay: angular.element('<div class="ta-resizer-handle-overlay"></div>'),
                                            background: angular.element('<div class="ta-resizer-handle-background"></div>'),
                                            anchors: [angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],
                                            info: angular.element('<div class="ta-resizer-handle-info"></div>')
                                        }
                                    },
                                    d.displayElements.popover.append(d.displayElements.popoverContainer),
                                    d.displayElements.scrollWindow.append(d.displayElements.popover),
                                    d.displayElements.popover.on("mousedown",
                                        function(a, b) {
                                            return b && angular.extend(a, b),
                                                a.preventDefault(),
                                                !1
                                        }),
                                    d.showPopover = function(a) {
                                        d.reflowPopover(a),
                                            d.displayElements.popover.css("display", "block"),
                                            j.addClass(d.displayElements.popover, "in"),
                                            z(l, "click keyup",
                                                function() {
                                                    d.hidePopover()
                                                })
                                    },
                                    d.reflowPopover = function(a) {
                                        d.displayElements.text[0].offsetHeight - 51 > a[0].offsetTop ? (d.displayElements.popover.css("top", a[0].offsetTop + a[0].offsetHeight + "px"), d.displayElements.popover.removeClass("top").addClass("bottom")) : (d.displayElements.popover.css("top", a[0].offsetTop - 54 + "px"), d.displayElements.popover.removeClass("bottom").addClass("top")),
                                            d.displayElements.popover.css("left", Math.max(0, Math.min(d.displayElements.text[0].offsetWidth - 305, a[0].offsetLeft + a[0].offsetWidth / 2 - 152.5)) + "px")
                                    },
                                    d.hidePopover = function() {
                                        j.removeClass(d.displayElements.popover, "in",
                                            function() {
                                                d.displayElements.popover.css("display", ""),
                                                    d.displayElements.popoverContainer.attr("style", ""),
                                                    d.displayElements.popoverContainer.attr("class", "popover-content")
                                            })
                                    },
                                    d.displayElements.resize.overlay.append(d.displayElements.resize.background),
                                    angular.forEach(d.displayElements.resize.anchors,
                                        function(a) {
                                            d.displayElements.resize.overlay.append(a)
                                        }),
                                    d.displayElements.resize.overlay.append(d.displayElements.resize.info),
                                    d.displayElements.scrollWindow.append(d.displayElements.resize.overlay),
                                    d.reflowResizeOverlay = function(a) {
                                        a = angular.element(a)[0],
                                            d.displayElements.resize.overlay.css({
                                                display: "block",
                                                left: a.offsetLeft - 5 + "px",
                                                top: a.offsetTop - 5 + "px",
                                                width: a.offsetWidth + 10 + "px",
                                                height: a.offsetHeight + 10 + "px"
                                            }),
                                            d.displayElements.resize.info.text(a.offsetWidth + " x " + a.offsetHeight)
                                    },
                                    d.showResizeOverlay = function(a) {
                                        var b = function(b) {
                                            var c = {
                                                width: parseInt(a.attr("width")),
                                                height: parseInt(a.attr("height")),
                                                x: b.clientX,
                                                y: b.clientY
                                            };
                                            void 0 === c.width && (c.width = a[0].offsetWidth),
                                                void 0 === c.height && (c.height = a[0].offsetHeight),
                                                d.hidePopover();
                                            var e = c.height / c.width,
                                                f = function(b) {
                                                    var f = {
                                                            x: Math.max(0, c.width + (b.clientX - c.x)),
                                                            y: Math.max(0, c.height + (b.clientY - c.y))
                                                        },
                                                        g = function(a, b) {
                                                            a = angular.element(a),
                                                                "img" === a[0].tagName.toLowerCase() && (b.height && (a.attr("height", b.height), delete b.height), b.width && (a.attr("width", b.width), delete b.width)),
                                                                a.css(b)
                                                        };
                                                    if (b.shiftKey) {
                                                        var h = f.y / f.x;
                                                        g(a, {
                                                            width: e > h ? f.x: f.y / e,
                                                            height: e > h ? f.x * e: f.y
                                                        })
                                                    } else g(a, {
                                                        width: f.x,
                                                        height: f.y
                                                    });
                                                    d.reflowResizeOverlay(a)
                                                };
                                            i.find("body").on("mousemove", f),
                                                z(d.displayElements.resize.overlay, "mouseup",
                                                    function() {
                                                        i.find("body").off("mousemove", f),
                                                            d.showPopover(a)
                                                    }),
                                                b.stopPropagation(),
                                                b.preventDefault()
                                        };
                                        d.displayElements.resize.anchors[3].on("mousedown", b),
                                            d.reflowResizeOverlay(a),
                                            z(l, "click",
                                                function() {
                                                    d.hideResizeOverlay()
                                                })
                                    },
                                    d.hideResizeOverlay = function() {
                                        d.displayElements.resize.overlay.css("display", "")
                                    },
                                    d.setup.htmlEditorSetup(d.displayElements.html),
                                    d.setup.textEditorSetup(d.displayElements.text),
                                    d.displayElements.html.attr({
                                        id: "taHtmlElement" + x,
                                        "ng-show": "showHtml",
                                        "ta-bind": "ta-bind",
                                        "ng-model": "html"
                                    }),
                                    d.displayElements.text.attr({
                                        id: "taTextElement" + x,
                                        contentEditable: "true",
                                        "ta-bind": "ta-bind",
                                        "ng-model": "html"
                                    }),
                                    d.displayElements.scrollWindow.attr({
                                        "ng-hide": "showHtml"
                                    }),
                                    m.taDefaultWrap && d.displayElements.text.attr("ta-default-wrap", m.taDefaultWrap),
                                    d.displayElements.scrollWindow.append(d.displayElements.text),
                                    l.append(d.displayElements.scrollWindow),
                                    l.append(d.displayElements.html),
                                    d.displayElements.forminput.attr("name", y),
                                    l.append(d.displayElements.forminput),
                                    m.tabindex && (l.removeAttr("tabindex"), d.displayElements.text.attr("tabindex", m.tabindex), d.displayElements.html.attr("tabindex", m.tabindex)),
                                    m.placeholder && (d.displayElements.text.attr("placeholder", m.placeholder), d.displayElements.html.attr("placeholder", m.placeholder)),
                                    m.taDisabled && (d.displayElements.text.attr("ta-readonly", "disabled"), d.displayElements.html.attr("ta-readonly", "disabled"), d.disabled = d.$parent.$eval(m.taDisabled), d.$parent.$watch(m.taDisabled,
                                    function(a) {
                                        d.disabled = a,
                                            d.disabled ? l.addClass(d.classes.disabled) : l.removeClass(d.classes.disabled)
                                    })),
                                    a(d.displayElements.scrollWindow)(d),
                                    a(d.displayElements.html)(d),
                                    d.updateTaBindtaTextElement = d["updateTaBindtaTextElement" + x],
                                    d.updateTaBindtaHtmlElement = d["updateTaBindtaHtmlElement" + x],
                                    l.addClass("ta-root"),
                                    d.displayElements.scrollWindow.addClass("ta-text ta-editor " + d.classes.textEditor),
                                    d.displayElements.html.addClass("ta-html ta-editor " + d.classes.htmlEditor),
                                    d._actionRunning = !1;
                                var A = !1;
                                if (d.startAction = function() {
                                    return d._actionRunning = !0,
                                            h.rangy && h.rangy.saveSelection ? (A = h.rangy.saveSelection(),
                                        function() {
                                            A && h.rangy.restoreSelection(A)
                                        }) : void 0
                                },
                                    d.endAction = function() {
                                        d._actionRunning = !1,
                                            A && h.rangy.removeMarkers(A),
                                            A = !1,
                                            d.updateSelectedStyles(),
                                            d.showHtml || d["updateTaBindtaTextElement" + x]()
                                    },
                                    s = function() {
                                        l.addClass(d.classes.focussed),
                                            v.focus()
                                    },
                                    d.displayElements.html.on("focus", s), d.displayElements.text.on("focus", s), t = function(a) {
                                    return d._actionRunning || i[0].activeElement === d.displayElements.html[0] || i[0].activeElement === d.displayElements.text[0] || (l.removeClass(d.classes.focussed), v.unfocus(), b(function() {
                                            l.triggerHandler("blur")
                                        },
                                        0)),
                                        a.preventDefault(),
                                        !1
                                },
                                    d.displayElements.html.on("blur", t), d.displayElements.text.on("blur", t), d.queryFormatBlockState = function(a) {
                                    return a.toLowerCase() === i[0].queryCommandValue("formatBlock").toLowerCase()
                                },
                                    d.switchView = function() {
                                        d.showHtml = !d.showHtml,
                                            d.showHtml ? b(function() {
                                                    return d.displayElements.html[0].focus()
                                                },
                                                100) : b(function() {
                                                    return d.displayElements.text[0].focus()
                                                },
                                                100)
                                    },
                                    m.ngModel) {
                                    var B = !0;
                                    n.$render = function() {
                                        if (B) {
                                            B = !1;
                                            var a = d.$parent.$eval(m.ngModel);
                                            void 0 !== a && null !== a || !u || "" === u || n.$setViewValue(u)
                                        }
                                        d.displayElements.forminput.val(n.$viewValue),
                                            d._elementSelectTriggered || i[0].activeElement === d.displayElements.html[0] || i[0].activeElement === d.displayElements.text[0] || (d.html = n.$viewValue || "")
                                    }
                                } else d.displayElements.forminput.val(u),
                                    d.html = u;
                                if (d.$watch("html",
                                    function(a, b) {
                                        a !== b && (m.ngModel && n.$viewValue !== a && n.$setViewValue(a), d.displayElements.forminput.val(a))
                                    }), m.taTargetToolbars) v = g.registerEditor(y, d, m.taTargetToolbars.split(","));
                                else {
                                    var C = angular.element('<div text-angular-toolbar name="textAngularToolbar' + x + '">');
                                    m.taToolbar && C.attr("ta-toolbar", m.taToolbar),
                                        m.taToolbarClass && C.attr("ta-toolbar-class", m.taToolbarClass),
                                        m.taToolbarGroupClass && C.attr("ta-toolbar-group-class", m.taToolbarGroupClass),
                                        m.taToolbarButtonClass && C.attr("ta-toolbar-button-class", m.taToolbarButtonClass),
                                        m.taToolbarActiveButtonClass && C.attr("ta-toolbar-active-button-class", m.taToolbarActiveButtonClass),
                                        m.taFocussedClass && C.attr("ta-focussed-class", m.taFocussedClass),
                                        l.prepend(C),
                                        a(C)(d.$parent),
                                        v = g.registerEditor(y, d, ["textAngularToolbar" + x])
                                }
                                d.$on("$destroy",
                                    function() {
                                        g.unregisterEditor(y)
                                    }),
                                    d.$on("ta-element-select",
                                        function(a, b) {
                                            v.triggerElementSelect(a, b)
                                        }),
                                    d.$on("ta-drop-event",
                                        function(a, b, c, e) {
                                            d.displayElements.text[0].focus(),
                                                e && e.files && e.files.length > 0 && (angular.forEach(e.files,
                                                function(a) {
                                                    try {
                                                        return d.fileDropHandler(a, d.wrapSelection) || d.fileDropHandler !== d.defaultFileDropHandler && d.defaultFileDropHandler(a, d.wrapSelection)
                                                    } catch(b) {
                                                        k.error(b)
                                                    }
                                                }), c.preventDefault(), c.stopPropagation())
                                        }),
                                    d._bUpdateSelectedStyles = !1,
                                    d.updateSelectedStyles = function() {
                                        var a;
                                        void 0 !== (a = e.getSelectionElement()) && a.parentNode !== d.displayElements.text[0] ? v.updateSelectedStyles(angular.element(a)) : v.updateSelectedStyles(),
                                            d._bUpdateSelectedStyles && b(d.updateSelectedStyles, 200)
                                    },
                                    o = function() {
                                        d._bUpdateSelectedStyles || (d._bUpdateSelectedStyles = !0, d.$apply(function() {
                                            d.updateSelectedStyles()
                                        }))
                                    },
                                    d.displayElements.html.on("keydown", o),
                                    d.displayElements.text.on("keydown", o),
                                    p = function() {
                                        d._bUpdateSelectedStyles = !1
                                    },
                                    d.displayElements.html.on("keyup", p),
                                    d.displayElements.text.on("keyup", p),
                                    q = function(a, b) {
                                        b && angular.extend(a, b),
                                            d.$apply(function() {
                                                return v.sendKeyCommand(a) ? (d._bUpdateSelectedStyles || d.updateSelectedStyles(), a.preventDefault(), !1) : void 0
                                            })
                                    },
                                    d.displayElements.html.on("keypress", q),
                                    d.displayElements.text.on("keypress", q),
                                    r = function() {
                                        d._bUpdateSelectedStyles = !1,
                                            d.$apply(function() {
                                                d.updateSelectedStyles()
                                            })
                                    },
                                    d.displayElements.html.on("mouseup", r),
                                    d.displayElements.text.on("mouseup", r)
                            }
                        }
                    }]).factory("taBrowserTag", [function() {
                    return function(a) {
                        return a ? "" === a ? void 0 === e ? "div": 8 >= e ? "P": "p": 8 >= e ? a.toUpperCase() : a: 8 >= e ? "P": "p"
                    }
                }]).factory("taExecCommand", ["taSelection", "taBrowserTag", "$document",
                    function(a, b, c) {
                        var d = /(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)/gi,
                            e = /(ul|li|ol)/gi,
                            f = function(b, c) {
                                var d, e = b.find("li");
                                for (i = e.length - 1; i >= 0; i--) d = angular.element("<" + c + ">" + e[i].innerHTML + "</" + c + ">"),
                                    b.after(d);
                                b.remove(),
                                    a.setSelectionToElementEnd(d[0])
                            },
                            g = function(b, c) {
                                var d = angular.element("<" + c + ">" + b[0].innerHTML + "</" + c + ">");
                                b.after(d),
                                    b.remove(),
                                    a.setSelectionToElementEnd(d.find("li")[0])
                            },
                            h = function(c, d, e) {
                                var f = "";
                                for (i = c.length - 1; i >= 0; i--) f += "<" + b("li") + ">" + c[i].innerHTML + "</" + b("li") + ">";
                                var g = angular.element("<" + e + ">" + f + "</" + e + ">");
                                d.after(g),
                                    d.remove(),
                                    a.setSelectionToElementEnd(g.find("li")[0])
                            };
                        return function(i) {
                            return i = b(i),
                                function(j, k, l) {
                                    var m, n, o, p, q, r = angular.element("<" + i + ">"),
                                        s = a.getSelectionElement(),
                                        t = angular.element(s);
                                    if (void 0 !== s) {
                                        var u = s.tagName.toLowerCase();
                                        if ("insertorderedlist" === j.toLowerCase() || "insertunorderedlist" === j.toLowerCase()) {
                                            var v = b("insertorderedlist" === j.toLowerCase() ? "ol": "ul");
                                            if (u === v) return f(t, i);
                                            if ("li" === u && t.parent()[0].tagName.toLowerCase() === v && 1 === t.parent().children().length) return f(t.parent(), i);
                                            if ("li" === u && t.parent()[0].tagName.toLowerCase() !== v && 1 === t.parent().children().length) return g(t.parent(), v);
                                            if (u.match(d) && !t.hasClass("ta-bind")) return "ol" === u || "ul" === u ? g(t, v) : s.innerHTML.match(d) ? h(t.children(), t, v) : h(angular.element("<div>" + s.innerHTML + "</div>"), t, v);
                                            if (u.match(d)) {
                                                if (p = a.getOnlySelectedElements(), 1 === p.length && ("ol" === p[0].tagName.toLowerCase() || "ul" === p[0].tagName.toLowerCase())) return p[0].tagName.toLowerCase() === v ? f(angular.element(p[0]), i) : g(angular.element(p[0]), v);
                                                o = "";
                                                var w = [];
                                                for (m = 0; m < p.length; m++) if (3 !== p[m].nodeType) {
                                                    var x = angular.element(p[m]);
                                                    o += "<" + b("li") + ">" + x[0].innerHTML + "</" + b("li") + ">",
                                                        w.unshift(x)
                                                }
                                                return n = angular.element("<" + v + ">" + o + "</" + v + ">"),
                                                    w.pop().replaceWith(n),
                                                    angular.forEach(w,
                                                        function(a) {
                                                            a.remove()
                                                        }),
                                                    void a.setSelectionToElementEnd(n[0])
                                            }
                                        } else if ("formatblock" === j.toLowerCase() && "blockquote" === l.toLowerCase().replace(/[<>]/gi, "")) {
                                            for (n = "li" === u ? t.parent() : t; ! n[0].tagName.match(d);) n = n.parent(),
                                                u = n[0].tagName.toLowerCase();
                                            if (u === l.toLowerCase().replace(/[<>]/gi, "")) {
                                                p = n.children();
                                                var y = !1;
                                                for (m = 0; m < p.length; m++) y = y || p[m].tagName.match(d);
                                                y ? (n.after(p), q = n.next(), n.remove(), n = q) : (r.append(n[0].childNodes), n.after(r), n.remove(), n = r)
                                            } else if (n.parent()[0].tagName.toLowerCase() !== l.toLowerCase().replace(/[<>]/gi, "") || n.parent().hasClass("ta-bind")) if (u.match(e)) n.wrap(l);
                                            else {
                                                if (p = a.getOnlySelectedElements(), 0 === p.length && (p = [n[0]]), o = "", 1 === p.length && 3 === p[0].nodeType) {
                                                    for (var z = p[0].parentNode; ! z.tagName.match(d);) z = z.parentNode;
                                                    p = [z]
                                                }
                                                for (m = 0; m < p.length; m++) o += p[m].outerHTML;
                                                n = angular.element(l),
                                                    n[0].innerHTML = o,
                                                    p[0].parentNode.insertBefore(n[0], p[0]),
                                                    angular.forEach(p,
                                                        function(a) {
                                                            a.parentNode.removeChild(a)
                                                        })
                                            } else {
                                                var A = n.parent(),
                                                    B = A.contents();
                                                for (m = 0; m < B.length; m++) A.parent().hasClass("ta-bind") && 3 === B[m].nodeType && (r = angular.element("<" + i + ">"), r[0].innerHTML = B[m].outerHTML, B[m] = r[0]),
                                                    A.parent()[0].insertBefore(B[m], A[0]);
                                                A.remove()
                                            }
                                            return void a.setSelectionToElementEnd(n[0])
                                        }
                                    }
                                    try {
                                        c[0].execCommand(j, k, l)
                                    } catch(C) {}
                                }
                        }
                    }]).directive("taBind", ["taSanitize", "$timeout", "$window", "$document", "taFixChrome", "taBrowserTag", "taSelection", "taSelectableElements", "taApplyCustomRenderers",
                    function(a, b, c, f, i, j, l, m, n) {
                        return {
                            require: "ngModel",
                            scope: {},
                            link: function(j, o, p, q) {
                                var r, s, t = void 0 !== o.attr("contenteditable") && o.attr("contenteditable"),
                                    u = t || "textarea" === o[0].tagName.toLowerCase() || "input" === o[0].tagName.toLowerCase(),
                                    v = !1,
                                    w = !1;
                                void 0 === p.taDefaultWrap && (p.taDefaultWrap = "p"),
                                        "" === p.taDefaultWrap ? (r = "", s = void 0 === e ? "<div><br></div>": e >= 11 ? "<p><br></p>": 8 >= e ? "<P>&nbsp;</P>": "<p>&nbsp;</p>") : (r = void 0 === e || e >= 11 ? "<" + p.taDefaultWrap + "><br></" + p.taDefaultWrap + ">": 8 >= e ? "<" + p.taDefaultWrap.toUpperCase() + "></" + p.taDefaultWrap.toUpperCase() + ">": "<" + p.taDefaultWrap + "></" + p.taDefaultWrap + ">", s = void 0 === e || e >= 11 ? "<" + p.taDefaultWrap + "><br></" + p.taDefaultWrap + ">": 8 >= e ? "<" + p.taDefaultWrap.toUpperCase() + ">&nbsp;</" + p.taDefaultWrap.toUpperCase() + ">": "<" + p.taDefaultWrap + ">&nbsp;</" + p.taDefaultWrap + ">"),
                                    o.addClass("ta-bind");
                                var x = function() {
                                    if (t) return o[0].innerHTML;
                                    if (u) return o.val();
                                    throw "textAngular Error: attempting to update non-editable taBind"
                                };
                                if (j.$parent["updateTaBind" + (p.id || "")] = function() {
                                    v || q.$setViewValue(x())
                                },
                                    u) if (t) {
                                    if (o.on("cut",
                                        function(a) {
                                            v ? a.preventDefault() : b(function() {
                                                    q.$setViewValue(x())
                                                },
                                                0)
                                        }), o.on("paste",
                                        function(a, b) {
                                            b && angular.extend(a, b);
                                            var d;
                                            if (a.clipboardData || a.originalEvent && a.originalEvent.clipboardData ? d = (a.originalEvent || a).clipboardData.getData("text/plain") : c.clipboardData && (d = c.clipboardData.getData("Text")), !d && !v) return ! 0;
                                            if (a.preventDefault(), !v) {
                                                var e = angular.element("<div></div>");
                                                if (e[0].innerHTML = d, d = e.text(), f[0].selection) {
                                                    var g = f[0].selection.createRange();
                                                    g.pasteHTML(d)
                                                } else f[0].execCommand("insertText", !1, d);
                                                q.$setViewValue(x())
                                            }
                                        }), o.on("keyup",
                                        function(a, b) {
                                            if (b && angular.extend(a, b), !v) {
                                                if ("" !== r && 13 === a.keyCode && !a.shiftKey) {
                                                    var c = l.getSelectionElement();
                                                    if (c.tagName.toLowerCase() !== p.taDefaultWrap && "li" !== c.tagName.toLowerCase() && ("" === c.innerHTML.trim() || "<br>" === c.innerHTML.trim())) {
                                                        var d = angular.element(r);
                                                        angular.element(c).replaceWith(d),
                                                            l.setSelectionToElementStart(d[0])
                                                    }
                                                }
                                                var e = x();
                                                "" !== r && "" === e.trim() && (o[0].innerHTML = r, l.setSelectionToElementStart(o.children()[0])),
                                                    q.$setViewValue(e)
                                            }
                                        }), o.on("blur",
                                        function() {
                                            w = !1;
                                            var a = x();
                                            v || q.$setViewValue(a === s ? "": x()),
                                                q.$render()
                                        }), p.placeholder && (e > 8 || void 0 === e)) {
                                        var y;
                                        if (!p.id) throw "textAngular Error: An unique ID is required for placeholders to work";
                                        y = g("#" + p.id + ".placeholder-text:before", 'content: "' + p.placeholder + '"'),
                                            j.$on("$destroy",
                                                function() {
                                                    h(y)
                                                })
                                    }
                                    o.on("focus",
                                        function() {
                                            w = !0,
                                                q.$render()
                                        })
                                } else o.on("paste cut",
                                    function() {
                                        v || b(function() {
                                                q.$setViewValue(x())
                                            },
                                            0)
                                    }),
                                    o.on("change blur",
                                        function() {
                                            v || q.$setViewValue(x())
                                        });
                                var z = function(b) {
                                    return q.$oldViewValue = a(i(b), q.$oldViewValue)
                                };
                                q.$parsers.push(z),
                                    q.$formatters.push(z);
                                var A = function(a) {
                                        return j.$emit("ta-element-select", this),
                                            a.preventDefault(),
                                            !1
                                    },
                                    B = function(a, c) {
                                        if (c && angular.extend(a, c), !k && !v) {
                                            k = !0;
                                            var d;
                                            d = a.originalEvent ? a.originalEvent.dataTransfer: a.dataTransfer,
                                                j.$emit("ta-drop-event", this, a, d),
                                                b(function() {
                                                        k = !1
                                                    },
                                                    100)
                                        }
                                    };
                                j.$parent["reApplyOnSelectorHandlers" + (p.id || "")] = function() {
                                    v || angular.forEach(m,
                                        function(a) {
                                            o.find(a).off("click", A).on("click", A)
                                        })
                                },
                                    q.$render = function() {
                                        var a = q.$viewValue || "";
                                        f[0].activeElement !== o[0] ? t ? (p.placeholder ? "" === a ? (w ? o.removeClass("placeholder-text") : o.addClass("placeholder-text"), o[0].innerHTML = r) : (o.removeClass("placeholder-text"), o[0].innerHTML = a) : o[0].innerHTML = "" === a ? r: a, v ? o.off("drop", B) : (angular.forEach(m,
                                            function(a) {
                                                o.find(a).on("click", A)
                                            }), o.on("drop", B))) : "textarea" !== o[0].tagName.toLowerCase() && "input" !== o[0].tagName.toLowerCase() ? o[0].innerHTML = n(a) : o.val(a) : t && o.removeClass("placeholder-text")
                                    },
                                    p.taReadonly && (v = j.$parent.$eval(p.taReadonly), v ? (o.addClass("ta-readonly"), ("textarea" === o[0].tagName.toLowerCase() || "input" === o[0].tagName.toLowerCase()) && o.attr("disabled", "disabled"), void 0 !== o.attr("contenteditable") && o.attr("contenteditable") && o.removeAttr("contenteditable")) : (o.removeClass("ta-readonly"), "textarea" === o[0].tagName.toLowerCase() || "input" === o[0].tagName.toLowerCase() ? o.removeAttr("disabled") : t && o.attr("contenteditable", "true")), j.$parent.$watch(p.taReadonly,
                                    function(a, b) {
                                        b !== a && (a ? (o.addClass("ta-readonly"), ("textarea" === o[0].tagName.toLowerCase() || "input" === o[0].tagName.toLowerCase()) && o.attr("disabled", "disabled"), void 0 !== o.attr("contenteditable") && o.attr("contenteditable") && o.removeAttr("contenteditable"), angular.forEach(m,
                                            function(a) {
                                                o.find(a).on("click", A)
                                            }), o.off("drop", B)) : (o.removeClass("ta-readonly"), "textarea" === o[0].tagName.toLowerCase() || "input" === o[0].tagName.toLowerCase() ? o.removeAttr("disabled") : t && o.attr("contenteditable", "true"), angular.forEach(m,
                                            function(a) {
                                                o.find(a).off("click", A)
                                            }), o.on("drop", B)), v = a)
                                    })),
                                    t && !v && (angular.forEach(m,
                                    function(a) {
                                        o.find(a).on("click", A)
                                    }), o.on("drop", B), o.on("blur",
                                    function() { /AppleWebKit\/([\d.] + )/ .exec(navigator.userAgent) && (d = !0)
                                    }))
                            }
                        }
                    }]).factory("taApplyCustomRenderers", ["taCustomRenderers",
                    function(a) {
                        return function(c) {
                            var d = angular.element("<div></div>");
                            return d[0].innerHTML = c,
                                angular.forEach(a,
                                    function(a) {
                                        var c = [];
                                        a.selector && "" !== a.selector ? c = d.find(a.selector) : a.customAttribute && "" !== a.customAttribute && (c = b(d, a.customAttribute)),
                                            angular.forEach(c,
                                                function(b) {
                                                    b = angular.element(b),
                                                            a.selector && "" !== a.selector && a.customAttribute && "" !== a.customAttribute ? void 0 !== b.attr(a.customAttribute) && a.renderLogic(b) : a.renderLogic(b)
                                                })
                                    }),
                                d[0].innerHTML
                        }
                    }]).directive("taMaxText",
                    function() {
                        return {
                            restrict: "A",
                            require: "ngModel",
                            link: function(a, b, c, d) {
                                function e(a) {
                                    var b = angular.element("<div/>");
                                    b.html(a);
                                    var c = b.text().length;
                                    return f >= c ? (d.$setValidity("taMaxText", !0), a) : void d.$setValidity("taMaxText", !1)
                                }
                                var f = parseInt(a.$eval(c.taMaxText));
                                if (isNaN(f)) throw "Max text must be an integer";
                                c.$observe("taMaxText",
                                    function(a) {
                                        if (f = parseInt(a), isNaN(f)) throw "Max text must be an integer";
                                        d.$dirty && d.$setViewValue(d.$viewValue)
                                    }),
                                    d.$parsers.unshift(e)
                            }
                        }
                    }).factory("taFixChrome",
                    function() {
                        var a = function(a) {
                            for (var b = angular.element("<div>" + a + "</div>"), c = angular.element(b).find("span"), d = 0; d < c.length; d++) {
                                var e = angular.element(c[d]);
                                e.attr("style") && e.attr("style").match(/line-height: 1.428571429;|color: inherit; line-height: 1.1;/i) && (e.attr("style", e.attr("style").replace(/( |)font-family: inherit;|( |)line-height: 1.428571429;|( |)line-height:1.1;|( |)color: inherit;/gi, "")), e.attr("style") && "" !== e.attr("style") || (e.next().length > 0 && "BR" === e.next()[0].tagName && e.next().remove(), e.replaceWith(e[0].innerHTML)))
                            }
                            var f = b[0].innerHTML.replace(/style="[^"]*?(line-height: 1.428571429;|color: inherit; line-height: 1.1;)[^"]*"/gi, "");
                            return f !== b[0].innerHTML && (b[0].innerHTML = f),
                                b[0].innerHTML
                        };
                        return a
                    }).factory("taSanitize", ["$sanitize",
                        function(a) {
                            return function(c, d) {
                                var e = angular.element("<div>" + c + "</div>");
                                angular.forEach(b(e, "align"),
                                    function(a) {
                                        a.css("text-align", a.attr("align")),
                                            a.removeAttr("align")
                                    }),
                                    c = e[0].innerHTML;
                                var f;
                                try {
                                    f = a(c)
                                } catch(g) {
                                    f = d || ""
                                }
                                return f
                            }
                        }]).directive("textAngularToolbar", ["$compile", "textAngularManager", "taOptions", "taTools", "taToolExecuteAction", "$window",
                        function(a, b, c, d, e, f) {
                            return {
                                scope: {
                                    name: "@"
                                },
                                restrict: "EA",
                                link: function(g, h, i) {
                                    if (!g.name || "" === g.name) throw "textAngular Error: A toolbar requires a name";
                                    angular.extend(g, angular.copy(c)),
                                        i.taToolbar && (g.toolbar = g.$parent.$eval(i.taToolbar)),
                                        i.taToolbarClass && (g.classes.toolbar = i.taToolbarClass),
                                        i.taToolbarGroupClass && (g.classes.toolbarGroup = i.taToolbarGroupClass),
                                        i.taToolbarButtonClass && (g.classes.toolbarButton = i.taToolbarButtonClass),
                                        i.taToolbarActiveButtonClass && (g.classes.toolbarButtonActive = i.taToolbarActiveButtonClass),
                                        i.taFocussedClass && (g.classes.focussed = i.taFocussedClass),
                                        g.disabled = !0,
                                        g.focussed = !1,
                                        g._$element = h,
                                        h[0].innerHTML = "",
                                        h.addClass("ta-toolbar " + g.classes.toolbar),
                                        g.$watch("focussed",
                                            function() {
                                                g.focussed ? h.addClass(g.classes.focussed) : h.removeClass(g.classes.focussed)
                                            });
                                    var j = function(b, c) {
                                        var d;
                                        if (d = angular.element(b && b.display ? b.display: "<button type='button'>"), d.addClass(g.classes.toolbarButton), d.attr("name", c.name), d.attr("unselectable", "on"), d.attr("ng-disabled", "isDisabled()"), d.attr("tabindex", "-1"), d.attr("ng-click", "executeAction()"), d.attr("ng-class", "displayActiveToolClass(active)"), d.on("mousedown",
                                            function(a, b) {
                                                return b && angular.extend(a, b),
                                                    a.preventDefault(),
                                                    !1
                                            }), b && !b.display && !c._display && (d[0].innerHTML = "", b.buttontext && (d[0].innerHTML = b.buttontext), b.iconclass)) {
                                            var e = angular.element("<i>"),
                                                f = d[0].innerHTML;
                                            e.addClass(b.iconclass),
                                                d[0].innerHTML = "",
                                                d.append(e),
                                                f && "" !== f && d.append("&nbsp;" + f)
                                        }
                                        return c._lastToolDefinition = angular.copy(b),
                                            a(d)(c)
                                    };
                                    g.tools = {},
                                        g._parent = {
                                            disabled: !0,
                                            showHtml: !1,
                                            queryFormatBlockState: function() {
                                                return ! 1
                                            }
                                        };
                                    var k = {
                                        $window: f,
                                        $editor: function() {
                                            return g._parent
                                        },
                                        isDisabled: function() {
                                            return this.$eval("disabled") || this.$eval("disabled()") || "html" !== this.name && this.$editor().showHtml || this.$parent.disabled || this.$editor().disabled
                                        },
                                        displayActiveToolClass: function(a) {
                                            return a ? g.classes.toolbarButtonActive: ""
                                        },
                                        executeAction: e
                                    };
                                    angular.forEach(g.toolbar,
                                        function(a) {
                                            var b = angular.element("<div>");
                                            b.addClass(g.classes.toolbarGroup),
                                                angular.forEach(a,
                                                    function(a) {
                                                        g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
                                                            name: a
                                                        }),
                                                            g.tools[a].$element = j(d[a], g.tools[a]),
                                                            b.append(g.tools[a].$element)
                                                    }),
                                                h.append(b)
                                        }),
                                        g.updateToolDisplay = function(a, b, c) {
                                            var d = g.tools[a];
                                            if (d) {
                                                if (d._lastToolDefinition && !c && (b = angular.extend({},
                                                    d._lastToolDefinition, b)), null === b.buttontext && null === b.iconclass && null === b.display) throw 'textAngular Error: Tool Definition for updating "' + a + '" does not have a valid display/iconclass/buttontext value';
                                                null === b.buttontext && delete b.buttontext,
                                                    null === b.iconclass && delete b.iconclass,
                                                    null === b.display && delete b.display;
                                                var e = j(b, d);
                                                d.$element.replaceWith(e),
                                                    d.$element = e
                                            }
                                        },
                                        g.addTool = function(a, b, c, e) {
                                            g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
                                                name: a
                                            }),
                                                g.tools[a].$element = j(d[a], g.tools[a]);
                                            var f;
                                            void 0 === c && (c = g.toolbar.length - 1),
                                                f = angular.element(h.children()[c]),
                                                    void 0 === e ? (f.append(g.tools[a].$element), g.toolbar[c][g.toolbar[c].length - 1] = a) : (f.children().eq(e).after(g.tools[a].$element), g.toolbar[c][e] = a)
                                        },
                                        b.registerToolbar(g),
                                        g.$on("$destroy",
                                            function() {
                                                b.unregisterToolbar(g.name)
                                            })
                                }
                            }
                        }]).service("taToolExecuteAction", ["$q",
                        function(a) {
                            return function(b) {
                                void 0 !== b && (this.$editor = function() {
                                    return b
                                });
                                var c = a.defer(),
                                    d = c.promise,
                                    e = this.$editor();
                                d["finally"](function() {
                                    e.endAction.call(e)
                                });
                                var f;
                                try {
                                    f = this.action(c, e.startAction())
                                } catch(g) {} (f || void 0 === f) && c.resolve()
                            }
                        }]).service("textAngularManager", ["taToolExecuteAction", "taTools", "taRegisterTool",
                        function(a, b, c) {
                            var d = {},
                                e = {};
                            return {
                                registerEditor: function(c, f, g) {
                                    if (!c || "" === c) throw "textAngular Error: An editor requires a name";
                                    if (!f) throw "textAngular Error: An editor requires a scope";
                                    if (e[c]) throw 'textAngular Error: An Editor with name "' + c + '" already exists';
                                    var h = [];
                                    return angular.forEach(g,
                                        function(a) {
                                            d[a] && h.push(d[a])
                                        }),
                                        e[c] = {
                                            scope: f,
                                            toolbars: g,
                                            _registerToolbar: function(a) {
                                                this.toolbars.indexOf(a.name) >= 0 && h.push(a)
                                            },
                                            editorFunctions: {
                                                disable: function() {
                                                    angular.forEach(h,
                                                        function(a) {
                                                            a.disabled = !0
                                                        })
                                                },
                                                enable: function() {
                                                    angular.forEach(h,
                                                        function(a) {
                                                            a.disabled = !1
                                                        })
                                                },
                                                focus: function() {
                                                    angular.forEach(h,
                                                        function(a) {
                                                            a._parent = f,
                                                                a.disabled = !1,
                                                                a.focussed = !0
                                                        })
                                                },
                                                unfocus: function() {
                                                    angular.forEach(h,
                                                        function(a) {
                                                            a.disabled = !0,
                                                                a.focussed = !1
                                                        })
                                                },
                                                updateSelectedStyles: function(a) {
                                                    angular.forEach(h,
                                                        function(b) {
                                                            angular.forEach(b.tools,
                                                                function(b) {
                                                                    b.activeState && (b.active = b.activeState(a))
                                                                })
                                                        })
                                                },
                                                sendKeyCommand: function(c) {
                                                    var d = !1;
                                                    return (c.ctrlKey || c.metaKey) && angular.forEach(b,
                                                        function(b, e) {
                                                            if (b.commandKeyCode && b.commandKeyCode === c.which) for (var g = 0; g < h.length; g++) if (void 0 !== h[g].tools[e]) {
                                                                a.call(h[g].tools[e], f),
                                                                    d = !0;
                                                                break
                                                            }
                                                        }),
                                                        d
                                                },
                                                triggerElementSelect: function(a, c) {
                                                    var d = function(a, b) {
                                                            for (var c = !0,
                                                                     d = 0; d < b.length; d++) c = c && a.attr(b[d]);
                                                            return c
                                                        },
                                                        e = [],
                                                        g = {},
                                                        i = !1;
                                                    c = angular.element(c);
                                                    var j = !1;
                                                    if (angular.forEach(b,
                                                        function(a, b) {
                                                            a.onElementSelect && a.onElementSelect.element && a.onElementSelect.element.toLowerCase() === c[0].tagName.toLowerCase() && (!a.onElementSelect.filter || a.onElementSelect.filter(c)) && (j = j || angular.isArray(a.onElementSelect.onlyWithAttrs) && d(c, a.onElementSelect.onlyWithAttrs), (!a.onElementSelect.onlyWithAttrs || d(c, a.onElementSelect.onlyWithAttrs)) && (g[b] = a))
                                                        }), j ? (angular.forEach(g,
                                                        function(a, b) {
                                                            a.onElementSelect.onlyWithAttrs && d(c, a.onElementSelect.onlyWithAttrs) && e.push({
                                                                name: b,
                                                                tool: a
                                                            })
                                                        }), e.sort(function(a, b) {
                                                        return b.tool.onElementSelect.onlyWithAttrs.length - a.tool.onElementSelect.onlyWithAttrs.length
                                                    })) : angular.forEach(g,
                                                        function(a, b) {
                                                            e.push({
                                                                name: b,
                                                                tool: a
                                                            })
                                                        }), e.length > 0) for (var k = e[0].tool, l = e[0].name, m = 0; m < h.length; m++) if (void 0 !== h[m].tools[l]) {
                                                        k.onElementSelect.action.call(h[m].tools[l], a, c, f),
                                                            i = !0;
                                                        break
                                                    }
                                                    return i
                                                }
                                            }
                                        },
                                        e[c].editorFunctions
                                },
                                retrieveEditor: function(a) {
                                    return e[a]
                                },
                                unregisterEditor: function(a) {
                                    delete e[a]
                                },
                                registerToolbar: function(a) {
                                    if (!a) throw "textAngular Error: A toolbar requires a scope";
                                    if (!a.name || "" === a.name) throw "textAngular Error: A toolbar requires a name";
                                    if (d[a.name]) throw 'textAngular Error: A toolbar with name "' + a.name + '" already exists';
                                    d[a.name] = a,
                                        angular.forEach(e,
                                            function(b) {
                                                b._registerToolbar(a)
                                            })
                                },
                                retrieveToolbar: function(a) {
                                    return d[a]
                                },
                                retrieveToolbarsViaEditor: function(a) {
                                    var b = [],
                                        c = this;
                                    return angular.forEach(this.retrieveEditor(a).toolbars,
                                        function(a) {
                                            b.push(c.retrieveToolbar(a))
                                        }),
                                        b
                                },
                                unregisterToolbar: function(a) {
                                    delete d[a]
                                },
                                updateToolsDisplay: function(a) {
                                    var b = this;
                                    angular.forEach(a,
                                        function(a, c) {
                                            b.updateToolDisplay(c, a)
                                        })
                                },
                                resetToolsDisplay: function() {
                                    var a = this;
                                    angular.forEach(b,
                                        function(b, c) {
                                            a.resetToolDisplay(c)
                                        })
                                },
                                updateToolDisplay: function(a, b) {
                                    var c = this;
                                    angular.forEach(d,
                                        function(d, e) {
                                            c.updateToolbarToolDisplay(e, a, b)
                                        })
                                },
                                resetToolDisplay: function(a) {
                                    var b = this;
                                    angular.forEach(d,
                                        function(c, d) {
                                            b.resetToolbarToolDisplay(d, a)
                                        })
                                },
                                updateToolbarToolDisplay: function(a, b, c) {
                                    if (!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
                                    d[a].updateToolDisplay(b, c)
                                },
                                resetToolbarToolDisplay: function(a, c) {
                                    if (!d[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
                                    d[a].updateToolDisplay(c, b[c], !0)
                                },
                                removeTool: function(a) {
                                    delete b[a],
                                        angular.forEach(d,
                                            function(b) {
                                                delete b.tools[a];
                                                for (var c = 0; c < b.toolbar.length; c++) {
                                                    for (var d, e = 0; e < b.toolbar[c].length; e++) {
                                                        if (b.toolbar[c][e] === a) {
                                                            d = {
                                                                group: c,
                                                                index: e
                                                            };
                                                            break
                                                        }
                                                        if (void 0 !== d) break
                                                    }
                                                    void 0 !== d && (b.toolbar[d.group].slice(d.index, 1), b._$element.children().eq(d.group).children().eq(d.index).remove())
                                                }
                                            })
                                },
                                addTool: function(a, b, e, f) {
                                    c(a, b),
                                        angular.forEach(d,
                                            function(c) {
                                                c.addTool(a, b, e, f)
                                            })
                                },
                                addToolToToolbar: function(a, b, e, f, g) {
                                    c(a, b),
                                        d[e].addTool(a, b, f, g)
                                },
                                refreshEditor: function(a) {
                                    if (!e[a]) throw 'textAngular Error: No Editor with name "' + a + '" exists';
                                    e[a].scope.updateTaBindtaTextElement(),
                                        e[a].scope.$$phase || e[a].scope.$digest()
                                }
                            }
                        }]).service("taSelection", ["$window", "$document",
                        function(a, b) {
                            _document = b[0];
                            var c = function(a) {
                                    if (a.hasChildNodes()) return a.firstChild;
                                    for (; a && !a.nextSibling;) a = a.parentNode;
                                    return a ? a.nextSibling: null
                                },
                                d = function(a) {
                                    var b = a.startContainer,
                                        d = a.endContainer;
                                    if (b === d) return [b];
                                    for (var e = []; b && b !== d;) b = c(b),
                                        b.parentNode === a.commonAncestorContainer && e.push(b);
                                    for (b = a.startContainer; b && b !== a.commonAncestorContainer;) b.parentNode === a.commonAncestorContainer && e.unshift(b),
                                        b = b.parentNode;
                                    return e
                                };
                            return {
                                getOnlySelectedElements: function() {
                                    if (window.getSelection) {
                                        var b = a.getSelection();
                                        if (!b.isCollapsed) return d(b.getRangeAt(0))
                                    }
                                    return []
                                },
                                getSelectionElement: function() {
                                    var b, c, d;
                                    return _document.selection && _document.selection.createRange ? (b = _document.selection.createRange(), b.parentElement()) : a.getSelection && (c = a.getSelection(), c.getRangeAt ? c.rangeCount > 0 && (b = c.getRangeAt(0)) : (b = _document.createRange(), b.setStart(c.anchorNode, c.anchorOffset), b.setEnd(c.focusNode, c.focusOffset), b.collapsed !== c.isCollapsed && (b.setStart(c.focusNode, c.focusOffset), b.setEnd(c.anchorNode, c.anchorOffset))), b) ? (d = b.commonAncestorContainer, 3 === d.nodeType ? d.parentNode: d) : void 0
                                },
                                setSelectionToElementStart: function(b) {
                                    if (_document.createRange && a.getSelection) {
                                        var c = _document.createRange();
                                        c.selectNodeContents(b),
                                            c.setStart(b, 0),
                                            c.setEnd(b, 0);
                                        var d = a.getSelection();
                                        d.removeAllRanges(),
                                            d.addRange(c)
                                    } else if (_document.selection && _document.body.createTextRange) {
                                        var e = _document.body.createTextRange();
                                        e.moveToElementText(b),
                                            e.collapse(!0),
                                            e.moveEnd("character", 0),
                                            e.moveStart("character", 0),
                                            e.select()
                                    }
                                },
                                setSelectionToElementEnd: function(b) {
                                    if (_document.createRange && a.getSelection) {
                                        var c = _document.createRange();
                                        c.selectNodeContents(b),
                                            c.collapse(!1);
                                        var d = a.getSelection();
                                        d.removeAllRanges(),
                                            d.addRange(c)
                                    } else if (_document.selection && _document.body.createTextRange) {
                                        var e = _document.body.createTextRange();
                                        e.moveToElementText(b),
                                            e.collapse(!1),
                                            e.select()
                                    }
                                }
                            }
                        }])
        } ()
} ({},
    function() {
        return this
    } ());