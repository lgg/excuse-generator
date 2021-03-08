var Generator = {
    init: function () {

    },
    generate: function (name) {
        var t = this;
        var text = [];
        var customName = !!name;
        //Check if we have empty name
        if(!name){
            name = t.choose(Excuses.names)
        }

        //Get hello part
        text.push(
            t.insertName(t.choose(Excuses.hello), name, customName)
        );

        //Get fail
        text.push(
            t.choose(Excuses.fail)
        );

        //Get action and date
        text.push(
            t.concat(t.choose(Excuses.action), t.choose(Excuses.date))
        );

        //Get last part
        text.push(
            t.choose(Excuses.general)
        );

        //Create single string
        return t.concatAll(text);
    },
    insertName: function (str, name, customName) {
        var nameComesFirst = /^.+\[name\]/.test(str);
        name = (nameComesFirst && !customName) ? name.toLowerCase() : name;
        return str.replace('[name]', name);
    },
    concat: function (str1, str2, separator) {
        if (separator) {
            return str1 + separator + " " + str2;
        } else {
            return str1 + " " + str2;
        }
    },
    concatAll: function (arr) {
        var str = "";
        arr.forEach(function (item, i) {
            str += item + ". ";
        });
        return str;
    },
    choose: function (arr) {
        return arr[getRandom(0, arr.length - 1)];
    }
};

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
