TAFFY.extend("group", function () {
    var db, tmp, i, j, result = [], args = [], groups = [], params = arguments;
    this.context({
        results: this.getDBI().query(this.context())
    });
    db = TAFFY(this.context().results);
    $.each(params, function () {
        args.push(this.column);
    });
    tmp = db().select.apply(db(), args);
    for (i = 0; i < tmp.length; i++) {
        if (params.length == 1) {
            if (params[0].func)
                tmp[i] = params[0].func.apply(tmp[i]);
        } else {
            for (j = 0; j < params.length; j++) {
                if (params[j].func)
                    tmp[i][j] = params[j].func.apply(tmp[i][j]);
            }
        }
        var exists = false;
        for (j = 0; j < groups.length; j++) {
            if ((exists = Util.equals(tmp[i], groups[j])))
                break;
        }
        if (!exists)
            groups.push(tmp[i]);

    }
    result.count = 0;
    result.groups = [];
    for (i = 0; i < groups.length; i++) {
        var obj = {}, filter = {}, group;
        group = groups[i];
        if (params.length == 1) {
            filter[params[0].column] = new Object();
            filter[params[0].column][params[0].type] = group;
        } else {
            for (j = 0; j < params.length; j++) {
                filter[params[j].column] = new Object();
                filter[params[j].column][params[j].type] = group[j];
            }
        }
        obj.group = group;
        obj.result = db(filter).get();
        obj.count = obj.result.length;
        result.push(obj);
        result.count += obj.count;
        result.groups.push(obj.group);
    }
    return result;
});
TAFFY.extend("search", function () {
    var result = [], params = arguments;
    this.context({
        results: this.getDBI().query(this.context())
    });
    tmp = this.context().results;
    if (params.length === 1 && Object.prototype.toString.call(params[0]) === '[object Array]') {
        $.each(tmp, function () {
            var options = '', match = true;
            $.each(this.options, function () {
                options = options + '|' + this.option.toLowerCase();
            });
            var question = this.question.toLowerCase();
            for (x in params[0]) {
                var k = params[0][x].toLowerCase();
                if (question.indexOf(k) === -1 && options.indexOf(k) === -1) {
                    match = false;
                    break;
                }
            }
            if (match) {
                result.push(this);
            }
        })
    } else {
        $.each(tmp, function () {
            var options = '', match = false;
            $.each(this.options, function () {
                options = options + '|' + this.option.toLowerCase();
            });
            var question = this.question.toLowerCase();
            for (x in params) {
                var k = params[x].toLowerCase();
                if (question.indexOf(k) !== -1 || options.indexOf(k) !== -1) {
                    match = true;
                    break;
                }
            }
            if (match) {
                result.push(this);
            }
        })
    }
    return result;
});
Util = (function () {
    check = function (obj) {
        if (obj === undefined)
            return false;
        if (isEmpty(obj.class))
            return false;
        if (isEmpty(obj.question))
            return false;
        if (isEmpty(obj.type))
            return false;
        var options = obj.options;
        if (options === undefined || Object.prototype.toString.call(options) !== '[object Array]')
            return false;
        var answer = 0;
        for (var x in options) {
            if (isEmpty(options[x].option))
                return false;
            if (options[x].answer === true)
                answer++;
        }
        var type = obj.type.toLowerCase();
        return (type === "single" && answer === 1 || type === "multi" && answer >= 1);
    };
    isEmpty = function (str) {
        return str === undefined || str === "";
    };
    contains = function (arr, obj) {
        for (var x in arr) {
            if(obj.class === arr[x].class && obj.sn === arr[x].sn)
                return true;
        }
        return false;
    };
    return {
        add: function (arr,obj) {
            if (Object.prototype.toString.call(arr) === '[object Array]') {
                if (check(obj) && !contains(arr, obj))
                    arr.push(obj);
            }
        },
        shuffle: function(array){
            var counter = array.length;
            while (counter > 0) {
                var index = Math.floor(Math.random() * counter);
                counter--;
                var temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },
        getDefaultSettings: function () {
            return {
                random: false,
                memorize: false,
                browse: true,
                title: true,
                single: true,
                multi: true,
                class: true,
                position: 0
            }
        },
        equals:function (arr1,arr2){
	        if(typeof(arr1) != typeof(arr2))
                return false;
            if(arr1 == undefined)
                return true;
            if(arr1.length != arr2.length)
                return false;
            if(arr1.length == undefined)
                return arr1 === arr2;
            if(typeof(arr1) == 'string'){
                arr1 = arr1.split("");
                arr2 = arr2.split("");
            }
            for(i=0; i<arr1.length; i++){
                if(arr1[i] != arr2[i])
                    return false;
            }
            return true;
        },
        check: function (span) {
            var obj = $(span).prev();
            if (!obj.prop('disabled')) {
                var type = obj.attr('type');
                if (type === 'checkbox') {
                    obj.prop('checked', !obj.prop('checked')).trigger('change');
                } else if(type === 'radio') {
                    obj.prop('checked', true);
                }
            }
        },
        rndCheck: function () {
            if ($('#random').prop('checked')) {
                $('#memorize').prop('checked', false);
                $('#memorize').prop('disabled',true);
            } else {
                $('#memorize').prop('disabled', false);
            }
        }
    };
})();
