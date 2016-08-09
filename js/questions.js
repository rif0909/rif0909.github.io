Questions = (function () {
    var all = TAFFY();
    var questions = [];
    var groups = [];
    return {
        set: function (arr) {
            all = TAFFY();
            all.insert(arr);
            groups = [];
            all().group({ column: 'class', type: 'is' }).forEach(function(item,idx){
                groups.push({'name':item.group,'count':item.count});
            });
        },
        get: function () {
            if (arguments.length > 0) {
                questions = all(arguments).get();
            }
            return questions;
        },
        getClasses: function(){
            return groups;
        },
        getByClass: function(classes){
            return all({class: classes}).get();
        },
        getTaffy:function(){
            return all;
        }
    }
})();
Question = function (json) {
    this.class = json.class;
    this.sn = json.sn;
    this.type = json.type;
    this.question = json.question;
    this.options = json.options;
    this.remark = json.remark;
    this.answered = false;
    this.correct = false;
    this.enough = false;
}