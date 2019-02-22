angular.module("myDirective", []).directive("customOnChange", function () { return { restrict: "A", link: function (a, b, c) { a = a.$eval(c.customOnChange); b.bind("change", a) } } }).directive("setting", function () { return function (a, b, c) { a.$eval(c.setting) } }).directive("checkPrevious", function () { return { restrict: "A", link: function (a, b, c) { b.bind("click", function () { Util.check(b) }) } } }); Questions = function () { var b = TAFFY(), f = [], e = [], d = [], g = [], c = []; return { init: function (a) { b = TAFFY(a); e = []; g = []; b().group({ column: "class", type: "is" }).forEach(function (a, b) { e.push({ name: a.group, count: a.count }) }) }, get: function () { return 0 < arguments.length ? b(arguments).get() : f }, set: function (a) { f = a }, getClasses: function () { return e }, setErrors: function (a) { d = a }, addErrors: function (a) { d.push(a) }, getErrors: function () { return d }, clearErrors: function () { d = [] }, search: function (a, c, d) { if (3 <= arguments.length) { if (d) return b(a).search(c); var e = b(a); return e.search.apply(e, c) } return g }, setSearched: function (a) { g = a }, setFlag: function (a) { -1 == c.indexOf(a) && c.push(a); return c.length }, unsetFlag: function () { if (0 < arguments.length) { var a = c.indexOf(arguments[0]); -1 != a && c.splice(a, 1) } else c = []; return c.length }, hasFlag: function (a) { return -1 != c.indexOf(a) }, getFlags: function () { return c }, getFlagQuestions: function () { return b({ __id: c }).get() } } }(); Question = function (b, f) { this["class"] = b["class"]; this.sn = b.sn; this.type = b.type; this.question = b.question; this.options = []; for (var e in b.options) { var d = $.extend({}, b.options[e]); d.selected = !1; this.options.push(d) } f && Util.shuffle(this.options); this.remark = b.remark; this.enough = this.correct = this.answered = !1; this.__id = b.__id; this.flag = Questions.hasFlag(b.__id) }; TAFFY.extend("group", function () { var b, a, c = [], d = [], f = [], e = arguments; this.context({ results: this.getDBI().query(this.context()) }); var k = TAFFY(this.context().results); $.each(e, function () { d.push(this.column) }); var g = k().select.apply(k(), d); for (b = 0; b < g.length; b++) { if (1 == e.length) e[0].func && (g[b] = e[0].func.apply(g[b])); else for (a = 0; a < e.length; a++) e[a].func && (g[b][a] = e[a].func.apply(g[b][a])); var h = !1; for (a = 0; a < f.length && !(h = Util.equals(g[b], f[a])) ; a++); h || f.push(g[b]) } c.count = 0; c.groups = []; for (b = 0; b < f.length; b++) { g = {}; h = {}; var l = f[b]; if (1 == e.length) h[e[0].column] = {}, h[e[0].column][e[0].type] = l; else for (a = 0; a < e.length; a++) h[e[a].column] = {}, h[e[a].column][e[a].type] = l[a]; g.group = l; g.result = k(h).get(); g.count = g.result.length; c.push(g); c.count += g.count; c.groups.push(g.group) } return c }); TAFFY.extend("search", function () { var b = [], a = arguments; this.context({ results: this.getDBI().query(this.context()) }); tmp = this.context().results; 1 === a.length && "[object Array]" === Object.prototype.toString.call(a[0]) ? $.each(tmp, function () { var c = "", d = !0; $.each(this.options, function () { c = c + "|" + this.option.toLowerCase() }); var f = this.question.toLowerCase(); for (x in a[0]) { var e = a[0][x].toLowerCase(); if (-1 === f.indexOf(e) && -1 === c.indexOf(e)) { d = !1; break } } d && b.push(this) }) : $.each(tmp, function () { var c = "", d = !1; $.each(this.options, function () { c = c + "|" + this.option.toLowerCase() }); var f = this.question.toLowerCase(); for (x in a) { var e = a[x].toLowerCase(); if (-1 !== f.indexOf(e) || -1 !== c.indexOf(e)) { d = !0; break } } d && b.push(this) }); return b }); Util = function () { check = function (b) { if (void 0 === b || isEmpty(b["class"]) || isEmpty(b.question) || isEmpty(b.type)) return !1; var a = b.options; if (void 0 === a || "[object Array]" !== Object.prototype.toString.call(a)) return !1; var c = 0, d; for (d in a) { if (isEmpty(a[d].option)) return !1; !0 === a[d].answer && c++ } b = b.type.toLowerCase(); return "single" === b && 1 === c || "multi" === b && 1 <= c }; isEmpty = function (b) { return void 0 === b || "" === b }; contains = function (b, a) { for (var c in b) if (a["class"] === b[c]["class"] && a.sn === b[c].sn) return !0; return !1 }; return { add: function (b, a) { "[object Array]" === Object.prototype.toString.call(b) && check(a) && !contains(b, a) && b.push(a) }, shuffle: function (b) { for (var a = b.length; 0 < a;) { var c = Math.floor(Math.random() * a); a--; var d = b[a]; b[a] = b[c]; b[c] = d } return b }, getDefaultSettings: function () { return { random: !1, shuffle: !0, memorize: !1, browse: !0, title: !0, single: !0, multi: !0, "class": !0, position: 0, correctCount: 0, incorrectCount: 0, keyword: [], keywordRuleAnd: !0, flags: [] } }, equals: function (b, a) { if (typeof b != typeof a) return !1; if (void 0 == b) return !0; if (b.length != a.length) return !1; if (void 0 == b.length) return b === a; "string" == typeof b && (b = b.split(""), a = a.split("")); for (i = 0; i < b.length; i++) if (b[i] != a[i]) return !1; return !0 }, check: function (b) { b = $(b).prev(); if (!b.prop("disabled")) { var a = b.attr("type"); "checkbox" === a ? b.prop("checked", !b.prop("checked")).trigger("change") : "radio" === a && b.prop("checked", !0) } }, rndCheck: function () { $("#random").prop("checked") ? ($("#memorize").prop("checked", !1), $("#memorize").prop("disabled", !0)) : $("#memorize").prop("disabled", !1) }, saveQuestions: function (b) { var a = $("#dl"), c = "", d = new Date; b.forEach(function (a) { c += '{"class":"' + a["class"] + '","sn":"' + a.sn + '","type":"' + a.type + '","question":"' + a.question + '","options":['; a.options.forEach(function (a) { c += '{"option":"' + a.option + '","answer":' + a.answer + "}," }); c = c.slice(0, -1) + '],"remark":"' + a.remark + '"}\r\n' }); a.attr("href", "data:text/plain;charset=utf-8," + encodeURIComponent(c)); a.attr("download", d.getFullYear() + ("0" + (d.getMonth() + 1)).slice(-2) + ("0" + d.getDate()).slice(-2) + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2) + ".txt"); a[0].click() }, parseFile: function (b, a, c) { var d = []; for (json in c) { try { var f = c[json]; f.indexOf(";;") === f.length - 2 && (f = f.substring(0, f.length - 2)); var e = angular.fromJson(f); e.type = e.type.toLowerCase(); e.__id = json } catch (k) { } this.add(d, e) } 0 !== d.length ? (localStorage.setItem("storedQuestions", angular.toJson(d)), Questions.init(d), a = localStorage.getItem("quiz.settings") || a.get("quiz.settings"), void 0 === a ? a = this.getDefaultSettings() : (a = angular.fromJson(a), a = { random: a.random, shuffle: a.shuffle, memorize: a.memorize, browse: a.browse, title: a.title }, a = $.extend(this.getDefaultSettings(), a)), localStorage.removeItem("errorQuestions"), Questions.clearErrors(), b.hasFlags = Questions.unsetFlag(), b.hasErrors = !1, b.index = -1, localStorage.setItem("quiz.settings", angular.toJson(a)), b.initQuestions(), b.tab = "quiz", b.file = "", $("#close").click()) : alert("\u9078\u64c7\u7684\u6a94\u6848\u5167\u7121\u7b26\u5408\u7684\u984c\u76ee!") } } }();