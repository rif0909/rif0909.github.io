Util = (function(){
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
        for (x in options) {
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
        for (x in arr) {
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
                index = Math.floor(Math.random() * counter);
                counter--;
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },
        status: function () {
            return {
                enough: false,
                answered: false,
                correct: false
            }
        }
    };
})();
