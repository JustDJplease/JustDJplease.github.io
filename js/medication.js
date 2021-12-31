// --> Replace all placeholders within the document.
function replacePlaceholders(){
    $('.placeholder').each(function(){prepareReplace(this)});
}

// --> (Internal) subdivide simple from complex placeholders.
function prepareReplace(object){
    var placeholderObject = $(object);
    var simple = placeholderObject.hasClass("simple");
    replace(object, simple);
}

// --> (Internal) replace a placeholder with its value.
function replace(object, simple){
    var placeholderObject = $(object);
    var name = placeholderObject.data("name");
    var output = "";
    var medObject = window[name];

    if (medObject === undefined){
        output = "<mark>undefined</mark>";
    } else if (medObject.length !== 4){
        output = "<mark>wrong placeholder</mark>";
    } else {
        var _medName = medObject[0];
        var _medRegs = medObject[1];
        var _medLink = medObject[2];
        var _medAnti = medObject[3];

        if(_medAnti){
            output = "<ul class=\"medication\"><li><a class=\"lbl-warn\" href=\"https://www.farmacotherapeutischkompas.nl/bladeren/preparaatteksten/" + _medLink + "\">" + _medName + "</a></li>";
        }else{
            output = "<ul class=\"medication\"><li><a href=\"https://www.farmacotherapeutischkompas.nl/bladeren/preparaatteksten/" + _medLink + "\">" + _medName + "</a></li>";
        }
        if(!simple){
            _medRegs.forEach(_reg => {
                if(_reg.startsWith("_")){
                    output = output + "<li>"+ _reg+"</li>";
                }else{
                    output = output + "<li>&reg; "+ _reg+"</li>";
                }
            });
        }
        output = output + "</ul>";
    }
    placeholderObject.replaceWith(output);
}

// Declaration of medication objects:
// (0) - Name - String
// (1) - Registered names - Array
// (2) - Hyperlink - String
// (3) - isAntagonist - Boolean.

var tramadol = ["tramadol", [], "t/tramadol", false];
var morfine = ["morfine", ["Oramorph", "Sendelor"], "m/morfine", false];
var oxycodon = ["oxycodon", ["OxyNorm", "OxyContin (mga)"], "o/oxycodon", false];
var buprenorfine = ["buprenorfine", ["BuTrans (derm)", "Temgesic (tbl)"], "b/buprenorfine", false];
var fentanyl = ["fentanyl", ["Instanyl (neus)", "Abstral (tbl)", "Actiq (tbl)", "Durogesic (derm)"], "f/fentanyl__parenteraal_", false];
var fentanylDerm = ["fentanyl (derm)", ["Durogesic (derm)"], "f/fentanyl__transdermaal_", false];
var sufentanil = ["sufentanil", ["Sufenta"], "s/sufentanil", false];
var naloxon = ["naloxon", [], "n/naloxon", true];
var propofol = ["propofol", ["Diprivan"], "p/propofol", false];
var thiopental = ["thiopental", [], "t/thiopental", false];
var etomidaat = ["etomidaat", ["Hypnomidate"], "e/etomidaat", false];
var esketamine = ["esketamine", ["Ketanest-S"], "e/esketamine__intraveneus_", false];
var midazolam = ["midazolam", ["Dormicum"], "m/midazolam", false];
var adrenaline = ["adrenaline", [], "a/adrenaline", false];
var noradrenaline = ["noradrenaline", [], "n/noradrenaline", false];
var fenylefrine = ["fenylefrine", [], "f/fenylefrine__injectie_", false];
var efedrine = ["efedrine", [], "e/efedrine", false];
var dopamineLaag = ["dopamine", ["_Lage dosering"], "d/dopamine", false];
var dopamineHoog = ["dopamine", ["_Hoge dosering"], "d/dopamine", false];
var dobutamine = ["dobutamine", [], "d/dobutamine", false];
var milrinon = ["milrinon", [], "m/milrinon", false];
var desmopressone = ["desmopressine", ["_Vasopressine"], "d/desmopressine", false];
var isoprenaline = ["isoprenaline", [], "i/isoprenaline", false];
