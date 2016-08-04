Questions = (function () {
    var all = TAFFY();
    var questions = [];
    return {
        set: function (arr) {
            all = TAFFY();
            all.insert(arr);
        },
        get: function () {
            if (arguments.length > 0) {
                questions = all(arguments).get();
            }
            return questions;
        },
        getByClass: function(classes){
            return all({ class: [classes.join(",")]});
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