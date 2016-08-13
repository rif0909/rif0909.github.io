Questions = (function () {
    var all = TAFFY();
    var questions = [];
    var groups = [];
    var errors = [];
    var searched = [];
    return {
        init: function (arr) {
            all = TAFFY(arr);
            groups = [];
            searched = [];
            all().group({ column: 'class', type: 'is' }).forEach(function(item,idx){
                groups.push({'name':item.group,'count':item.count});
            });
        },
        get: function () {
            if (arguments.length > 0) {
                return all(arguments).get();
            }
            return questions;
        },
        set: function(arr){
            questions = arr;
        },
        getClasses: function(){
            return groups;
        },
        setErrors: function (obj) {
            errors.push(obj);
        },
        getErrors: function () {
            return errors;
        },
        clearErrors: function(){
            errors = [];
        },
        search: function (params, keyword, and) {
            if (arguments.length >= 3) {
                if (and) {
                    return all(params).search(keyword);
                } else {
                    var obj = all(params);
                    return obj.search.apply(obj, keyword);
                }
            }
            return searched;
        },
        setSearched: function(arr){
            searched = arr;
        }
    }
})();
Question = function (json) {
    this.class = json.class;
    this.sn = json.sn;
    this.type = json.type;
    this.question = json.question;
    this.options = [];
    for (var idx in json.options) {
        var tmp = $.extend({},json.options[idx]);
        tmp.selected = false;
        this.options.push(tmp);
    }
    this.remark = json.remark;
    this.answered = false;
    this.correct = false;
    this.enough = false;
}