// --> Replace all placeholders within the document.
function replacePlaceholders(){
    $('.placeholder').each(function(){replace(this)});
}

// --> (Internal) replace a placeholder with its value.
function replace(object){
    var placeholderObject = $(object);
    var name = placeholderObject.data("name");
    var output = "";
    var medObject = window[name];

    if (medObject === undefined){
        output = "<mark>undefined</mark>";
    } else if (medObject.length !== 3){
        output = "<mark>wrong placeholder</mark>";
    } else {
        var _medName = medObject[0];
        var _medRegs = medObject[1];
        var _medLink = medObject[2];

        output = "<ul class=\"medication\"><li><a href=\"https://www.farmacotherapeutischkompas.nl/bladeren/preparaatteksten/" + _medLink + "\">" + _medName + "</a></li>";
        _medRegs.forEach(_reg => output = output + "<li>&reg; "+ _reg+"</li>");
        output = output + "</ul>";
    }

    placeholderObject.replaceWith(output);
}

// Declaration of medication objects:
// (0) - Name - String
// (1) - Registered names - Array
// (2) - Hyperlink - String

var tramadol = ["tramadol", [], "t/tramadol"];
var morfine = ["morfine", ["Oramorph", "Sendelor"], "m/morfine"]