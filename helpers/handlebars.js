var register = function (Handlebars) {
    var helpers = {
        getface: function (faceValue) {
            var faceIcon = ["🤢","😐","🙂","😋","😍"] ;
            return faceIcon[faceValue-1];
        },
        getcheck: function (keyValue, currentKey) {
            if (keyValue==currentKey)
                return "checked";
            return "";
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null); 