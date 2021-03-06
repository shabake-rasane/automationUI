/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2013
 * bootstrap-fileinput
 * For more JQuery Plugins visit http://plugins.krajee.com
 */
(function (e) {
    var t = "{preview}\n" + '<div class="input-group {class}">\n' + "   {caption}\n" + '   <div class="input-group-btn">\n' + "       {remove}\n" + "       {upload}\n" + "       {browse}\n" + "   </div>\n" + "</div>";
    var n = "{preview}\n{remove}\n{upload}\n{browse}\n";
    var r = '<div class="file-preview {class}">\n' + '   <div class="file-preview-status text-center text-success"></div>\n' + '   <div class="close fileinput-remove text-right">&times;</div>\n' + '   <div class="file-preview-thumbnails"></div>\n' + '   <div class="clearfix"></div>' + "</div>";
    var i = '<div class="form-control file-caption {class}">\n' + '   <span class="glyphicon glyphicon-file"></span> <span class="file-caption-name"></span>\n' + "</div>";
    var s = function (t, n) {
        return t === null || t === undefined || t == [] || t === "" || n && e.trim(t) === ""
    };
    var o = function (e, t, n) {
        return s(e) || s(e[t]) ? n : e[t]
    };
    var u = function (e, t) {
        return typeof e !== "undefined" ? e.match("image.*") : t.match(/\.(gif|png|jpe?g)$/i)
    };
    var a = function (e, t) {
        return typeof e !== "undefined" ? e.match("text.*") : t.match(/\.(txt|md|csv|htm|html|php|ini)$/i)
    };
    var f = function () {
        return Math.round((new Date).getTime() + Math.random() * 100)
    };
    var l = function (r, i) {
        this.$element = e(r);
        this.showCaption = i.showCaption;
        this.showPreview = i.showPreview;
        this.showRemove = i.showRemove;
        this.showUpload = i.showUpload;
        this.captionClass = i.captionClass;
        this.previewClass = i.previewClass;
        this.mainClass = i.mainClass;
        if (s(i.mainTemplate)) {
            this.mainTemplate = this.showCaption ? t : n
        } else {
            this.mainTemplate = i.mainTemplate
        }
        this.previewTemplate = i.previewTemplate;
        this.captionTemplate = i.captionTemplate;
        this.browseLabel = i.browseLabel;
        this.browseIcon = i.browseIcon;
        this.browseClass = i.browseClass;
        this.removeLabel = i.removeLabel;
        this.removeIcon = i.removeIcon;
        this.removeClass = i.removeClass;
        this.uploadLabel = i.uploadLabel;
        this.uploadIcon = i.uploadIcon;
        this.uploadClass = i.uploadClass;
        this.uploadUrl = i.uploadUrl;
        this.msgLoading = i.msgLoading;
        this.msgProgress = i.msgProgress;
        this.msgSelected = i.msgSelected;
        this.previewFileType = i.previewFileType;
        this.wrapTextLength = i.wrapTextLength;
        this.wrapIndicator = i.wrapIndicator;
        this.isDisabled = this.$element.attr("disabled") || this.$element.attr("readonly");
        if (s(this.$element.attr("id"))) {
            this.$element.attr("id", f())
        }
        this.$container = this.createContainer();
        this.$captionContainer = o(i, "elCaptionContainer", this.$container.find(".file-caption"));
        this.$caption = o(i, "elCaptionText", this.$container.find(".file-caption-name"));
        this.$previewContainer = o(i, "elPreviewContainer", this.$container.find(".file-preview"));
        this.$preview = o(i, "elPreviewImage", this.$container.find(".file-preview-thumbnails"));
        this.$previewStatus = o(i, "elPreviewStatus", this.$container.find(".file-preview-status"));
        this.$name = this.$element.attr("name") || i.name;
        this.$hidden = this.$container.find('input[type=hidden][name="' + this.$name + '"]');
        if (this.$hidden.length === 0) {
            this.$hidden = e('<input type="hidden" />');
            this.$container.prepend(this.$hidden)
        }
        this.original = {preview: this.$preview.html(), hiddenVal: this.$hidden.val()};
        this.listen()
    };
    l.prototype = {constructor: l, listen: function () {
        var t = this;
        t.$element.on("change", e.proxy(t.change, t));
        e(t.$element[0].form).on("reset", e.proxy(t.reset, t));
        t.$container.find(".fileinput-remove").on("click", e.proxy(t.clear, t))
    }, trigger: function (e) {
        var t = this;
        t.$element.trigger("click");
        e.preventDefault()
    }, clear: function (e) {
        var t = this;
        if (e) {
            e.preventDefault()
        }
        t.$hidden.val("");
        t.$hidden.attr("name", t.name);
        t.$element.attr("name", "");
        t.$element.val("");
        if (e !== false) {
            t.$element.trigger("change");
            t.$element.trigger("fileclear")
        }
        t.$preview.html("");
        t.$caption.html("");
        t.$container.removeClass("file-input-new").addClass("file-input-new")
    }, reset: function (e) {
        var t = this;
        t.clear(false);
        t.$hidden.val(t.original.hiddenVal);
        t.$preview.html(t.original.preview);
        t.$container.find(".fileinput-filename").text("");
        t.$element.trigger("filereset")
    }, change: function (e) {
        var t = this;
        var n = t.$element, r = n.get(0).files, i = r ? r.length : 1, s = n.val().replace(/\\/g, "/").replace(/.*\//, ""), o = t.$preview, f = t.$previewContainer, l = t.$previewStatus, c = t.msgLoading, h = t.msgProgress, p = t.msgSelected, d, v = t.previewFileType, m = parseInt(t.wrapTextLength), g = t.wrapIndicator;
        if (e.target.files === undefined) {
            d = e.target && e.target.value ? [
                {name: e.target.value.replace(/^.+\\/, "")}
            ] : []
        } else {
            d = e.target.files
        }
        if (d.length === 0) {
            return
        }
        o.html("");
        var y = d.length, t = t;
        for (var b = 0; b < y; b++) {
            (function (e) {
                var t = e.name;
                var n = u(e.type, e.name);
                var r = a(e.type, e.name);
                if (o.length > 0 && (v == "any" ? n || r : v == "text" ? r : n) && typeof FileReader !== "undefined") {
                    var i = new FileReader;
                    l.html(c);
                    f.addClass("loading");
                    i.onload = function (e) {
                        var n = "";
                        if (r) {
                            var i = e.target.result;
                            if (i.length > m) {
                                g = g.replace("{title}", i);
                                i = i.substring(0, m - 1) + g
                            }
                            n = '<div class="file-preview-frame"><div class="file-preview-text" title="' + t + '">' + i + "</div></div>"
                        } else {
                            n = '<div class="file-preview-frame"><img src="' + e.target.result + '" class="file-preview-image" title="' + t + '" alt="' + t + '"></div>'
                        }
                        o.append("\n" + n);
                        if (b >= y - 1) {
                            f.removeClass("loading");
                            l.html("")
                        }
                    };
                    i.onprogress = function (t) {
                        if (t.lengthComputable) {
                            var n = parseInt(t.loaded / t.total * 100, 10);
                            var r = h.replace("{percent}", n).replace("{file}", e.name);
                            l.html(r)
                        }
                    };
                    if (r) {
                        i.readAsText(e)
                    } else {
                        i.readAsDataURL(e)
                    }
                } else {
                    o.append("\n" + '<div class="file-preview-frame"><div class="file-preview-other"><h2><i class="glyphicon glyphicon-file"></i></h2>' + t + "</div></div>")
                }
            })(d[b])
        }
        var w = i > 1 ? p.replace("{n}", i) : s;
        t.$caption.html(w);
        t.$container.removeClass("file-input-new");
        n.trigger("fileselect", [i, s])
    }, createContainer: function () {
        var t = this;
        var n = e(document.createElement("div")).attr({"class": "file-input file-input-new"}).html(t.renderMain());
        t.$element.before(n);
        n.find(".btn-file").append(t.$element);
        return n
    }, renderMain: function () {
        var e = this;
        var t = e.previewTemplate.replace("{class}", e.previewClass);
        var n = e.isDisabled ? e.captionClass + " file-caption-disabled" : e.captionClass;
        var r = e.captionTemplate.replace("{class}", n);
        return e.mainTemplate.replace("{class}", e.mainClass).replace("{preview}", t).replace("{caption}", r).replace("{upload}", e.renderUpload()).replace("{remove}", e.renderRemove()).replace("{browse}", e.renderBrowse())
    }, renderBrowse: function () {
        var e = this, t = e.browseClass + " btn-file", n = "";
        if (e.isDisabled) {
            n = " disabled "
        }
        return'<div class="' + t + '"' + n + "> " + e.browseIcon + e.browseLabel + " </div>"
    }, renderRemove: function () {
        var e = this, t = e.removeClass + " fileinput-remove fileinput-remove-button", n = "";
        if (!e.showRemove) {
            return""
        }
        if (e.isDisabled) {
            n = " disabled "
        }
        return'<button type="button" class="' + t + '"' + n + ">" + e.removeIcon + e.removeLabel + "</button>"
    }, renderUpload: function () {
        var e = this, t = "", n = "";
        if (!e.showUpload) {
            return""
        }
        if (e.isDisabled) {
            n = " disabled "
        }
        if (s(e.uploadUrl)) {
            t = '<button type="submit" class="' + e.uploadClass + '"' + n + ">" + e.uploadIcon + e.uploadLabel + "</button>"
        } else {
            t = '<a href="' + e.uploadUrl + '" class="' + e.uploadClass + '"' + n + ">" + e.uploadIcon + e.uploadLabel + "</a>"
        }
        return t
    }};
    e.fn.fileinput = function (t) {
        return this.each(function () {
            var n = e(this), r = n.data("fileinput");
            if (!r) {
                n.data("fileinput", r = new l(this, t))
            }
            if (typeof t == "string") {
                r[t]()
            }
        })
    };
    e.fn.fileinput = function (t) {
        var n = Array.apply(null, arguments);
        n.shift();
        return this.each(function () {
            var r = e(this), i = r.data("fileinput"), s = typeof t === "object" && t;
            if (!i) {
                r.data("fileinput", i = new l(this, e.extend({}, e.fn.fileinput.defaults, s, e(this).data())))
            }
            if (typeof t === "string") {
                i[t].apply(i, n)
            }
        })
    };
    e.fn.fileinput.defaults = {showCaption: true, showPreview: true, showRemove: true, showUpload: true, captionClass: "", previewClass: "", mainClass: "", mainTemplate: null, previewTemplate: r, captionTemplate: i, browseLabel: "Browse &hellip;", browseIcon: '<i class="glyphicon glyphicon-folder-open"></i> &nbsp;', browseClass: "btn btn-primary", removeLabel: "Remove", removeIcon: '<i class="glyphicon glyphicon-ban-circle"></i> ', removeClass: "btn btn-default", uploadLabel: "Upload", uploadIcon: '<i class="glyphicon glyphicon-upload"></i> ', uploadClass: "btn btn-default", uploadUrl: null, msgLoading: "Loading &hellip;", msgProgress: "Loaded {percent}% of {file}", msgSelected: "{n} files selected", previewFileType: "image", wrapTextLength: 250, wrapIndicator: ' <span class="wrap-indicator" title="{title}">[&hellip;]</span>', elCaptionContainer: null, elCaptionText: null, elPreviewContainer: null, elPreviewImage: null, elPreviewStatus: null};
    e(function () {
        var t = e("input.file[type=file]");
        if (t.length > 0) {
            t.fileinput()
        }
    })
})(window.jQuery)