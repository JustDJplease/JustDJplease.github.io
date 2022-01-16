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
            output = "<ul class=\"tbl-list\"><li><a class=\"text-red\" href=\"https://www.farmacotherapeutischkompas.nl/bladeren/preparaatteksten/" + _medLink + "\">" + _medName + "</a></li>";
        }else{
            output = "<ul class=\"tbl-list\"><li><a href=\"https://www.farmacotherapeutischkompas.nl/bladeren/preparaatteksten/" + _medLink + "\">" + _medName + "</a></li>";
        }
        if(!simple){
            _medRegs.forEach(_reg => {
                if(_reg.startsWith("_")){
                    output = output + "<li>" + _reg.substring(1); + "</li>";
                }else{
                    output = output + "<li>&reg; " + _reg+ "</li>";
                }
            });
        }
        output = output + "</ul>";
    }
    placeholderObject.replaceWith(output);
}

// --> (Internal) replace a placeholder with its value.
function inject(name, simple){
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
            output = "<ul class=\"tbl-list\"><li><a class=\"text-red\" href=\"https://www.farmacotherapeutischkompas.nl/bladeren/preparaatteksten/" + _medLink + "\">" + _medName + "</a></li>";
        }else{
            output = "<ul class=\"tbl-list\"><li><a href=\"https://www.farmacotherapeutischkompas.nl/bladeren/preparaatteksten/" + _medLink + "\">" + _medName + "</a></li>";
        }
        if(!simple){
            _medRegs.forEach(_reg => {
                if(_reg.startsWith("_")){
                    output = output + "<li>" + _reg.substring(1); + "</li>";
                }else{
                    output = output + "<li>&reg; " + _reg+ "</li>";
                }
            });
        }
        output = output + "</ul>";
    }
    return output;
}


// Declaration of medication objects:
// (0) - Name - String
// (1) - Registered names - Array
// (2) - Hyperlink - String
// (3) - isAntagonist - Boolean.

// Analgetic
var buprenorfine = ["buprenorfine", ["BuTrans (derm)", "Temgesic (tbl)"], "b/buprenorfine", false];
var fentanyl = ["fentanyl", ["Instanyl (neus)", "Abstral (tbl)", "Actiq (tbl)", "Durogesic (derm)"], "f/fentanyl__parenteraal_", false];
var fentanylDerm = ["fentanyl (derm)", ["Durogesic (derm)"], "f/fentanyl__transdermaal_", false];
var morfine = ["morfine", ["Oramorph", "Sendelor"], "m/morfine", false];
var naloxon = ["naloxon", [], "n/naloxon", true];
var oxycodon = ["oxycodon", ["OxyNorm", "OxyContin (mga)"], "o/oxycodon", false];
var sufentanil = ["sufentanil", ["Sufenta"], "s/sufentanil", false];
var tramadol = ["tramadol", [], "t/tramadol", false];

// Hypnotic
var esketamine = ["esketamine", ["Ketanest-S"], "e/esketamine__intraveneus_", false];
var etomidaat = ["etomidaat", ["Hypnomidate"], "e/etomidaat", false];
var midazolam = ["midazolam", ["Dormicum"], "m/midazolam", false];
var propofol = ["propofol", ["Diprivan"], "p/propofol", false];
var thiopental = ["thiopental", [], "t/thiopental", false];

// Vasoactive
var adrenaline = ["adrenaline", [], "a/adrenaline", false];
var desmopressine = ["desmopressine", ["_Vasopressine"], "d/desmopressine", false];
var dobutamine = ["dobutamine", [], "d/dobutamine", false];
var dopamineHoog = ["dopamine", ["_Hoge dosering"], "d/dopamine", false];
var dopamineLaag = ["dopamine", ["_Lage dosering"], "d/dopamine", false];
var efedrine = ["efedrine", [], "e/efedrine", false];
var fenylefrine = ["fenylefrine", [], "f/fenylefrine__injectie_", false];
var isoprenaline = ["isoprenaline", [], "i/isoprenaline", false];
var milrinon = ["milrinon", [], "m/milrinon", false];
var noradrenaline = ["noradrenaline", [], "n/noradrenaline", false];

// Paralytic
var rocuronium = ["rocuronium", ["Esmeron"], "r/rocuronium", false];
var cisatracurium = ["cisatracurium", ["Nimbex"], 'c/cisatracurium', false];
var succinylcholine = ["succinylcholine", ["Suxamethonium"], "s/succinylcholine", false];
var atracurium = ["atracurium", ["Tracrium"], "a/atracurium", false];
var mivacurium = ["mivacurium", ["Mivacron"], "m/mivacurium", false];

// Locals
var articaïne = ["articaïne", ["_(met adrenaline)", "Ultracain"], "a/articaine_adrenaline", false];
var bupivacaïne = ["bupivacaïne", ["Marcaine"], "b/bupivacaine", false];
var ropivacaïne = ["ropivacaïne", [], "r/ropivacaine", false];
var lidocaïne = ["lidocaïne", ["Xylocaïne"], "l/lidocaine__parenteraal_", false];
var prilocaïne = ["prilocaïne", ["Prilotekal", "Citanest"], "p/prilocaine", false];