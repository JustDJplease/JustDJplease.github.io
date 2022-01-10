// --> Replace all placeholders within the document.
function replaceParameters(){
    $('.param').each(function(){replaceParameter(this)});
}

// --> (Internal) replace a placeholder with its value.
function replaceParameter(object){
    console.log(object);
    var placeholderObject = $(object);
    var name = placeholderObject.data("name");
    var output = "";
    var paramObject = window[name];

    if (paramObject === undefined){
        output = "<mark>undefined</mark>";
    } else if (paramObject.length < 5 || paramObject.length > 6){
        output = "<mark>wrong placeholder</mark>";
    } else {
        var _paramName = paramObject[0];
        var _paramAbbr = paramObject[1];
        var _paramExpl = paramObject[2];
        var _paramForm = paramObject[3];
        var _paramNorm = paramObject[4];

        var _paramHasExpl = true;
        if (_paramExpl === "") {_paramHasExpl = false;}

        var _paramHasForm = true;
        if (_paramForm === "") {_paramHasForm = false;}

        var _paramHasNorm = true;
        if (_paramNorm === "") {_paramHasNorm = false;}

        var _paramHasSysAndDias = false;
        if (paramObject.length === 6){
            var _paramNormSys = _paramNorm;
            var _paramNormDias = paramObject[5];
            _paramHasSysAndDias = true;
        }

        output += "<div class=\"var-param\" data-id=\"" + name + "\">";
        output += "<div class=\"var-header\">";
        output += "<div class=\"left\">" + _paramName + "</div>";
        output += "<div class=\"right\">" + _paramAbbr + "</div>";
        output += "</div>";
        if(_paramHasExpl){
            output += "<div class=\"var-content " + name + "\">";
            output += "<div class=\"var-content-header\">Toelichting</div>"
            output += "<div>" + _paramExpl + "</div>";
            output += "</div>";
        }
        if(_paramHasForm){
            output += "<div class=\"var-content " + name + "\">";
            output += "<div class=\"var-content-header\">Berekenen</div>"
            output += "<div>" + _paramForm + "</div>";
            output += "</div>";
        }
        if(_paramHasNorm){
            if(_paramHasSysAndDias){
                output += "<div class=\"var-content " + name + "\">";
                output += "<div class=\"var-content-header\">Normaalwaarde</div>"
                output += "<div>Systolisch: " + _paramNormSys + "</div>";
                output += "<div>Diastolisch: " + _paramNormDias + "</div>";
                output += "</div>";
            }else{
                output += "<div class=\"var-content " + name + "\">";
                output += "<div class=\"var-content-header\">Normaalwaarde</div>"
                output += "<div>" + _paramNorm + "</div>";
                output += "</div>";
            }
        }
        output += "</div>";
    }
    placeholderObject.replaceWith(output);
}

// Declaration of parameter objects:
// (0) - Name - String
// (1) - Abbreviation - String
// (2) - Explanation - String
// (3) - Formula - String
// (4) - Normal Range - String

var sao2 = ["Arterial Oxygen Saturation", "SaO<sub>2</sub>", "", "", "95 - 100 %"];
var svo2 = ["Mixed Venous Saturation", "SvO<sub>2</sub>", "", "", "60 - 80 %"];
var scvo2 = ["Central Venous Oxygen Saturation", "ScvO<sub>2</sub>", "", "", "60 - 70 %"];
var bp = ["Arterial Blood Pressure", "BP of RR", "De intra-operatieve BP mag maximaal 20% onder de oorspronkelijke BP van de patiënt zitten.", "", "90 - 140 mmHg", "60 - 90 mmHg"];
var map = ["Mean Arterial Pressure", "MAP", "", "SBP + (2 x DBP)/3", "70 - 105 mmHg"];
var cvd = ["Central Venous Pressure", "CVD", "", "", "2 - 6 mmHg"];
var rap = ["Right Atrial Pressure", "RAP", "", "", "2 - 6 mmHg"];
var rvp = ["Right Ventricular Pressure", "RVP", "", "", "15 - 25 mmHg", "0 - 8 mmHg"];
var pap = ["Pulmonary Artery Pressure", "PAP", "", "", "2 - 6 mmHg", "8 - 15 mmHg"];
var mpap = ["Mean Pulmonary Artery Pressure", "MPAP", "", "PASP + (2 x PADP)/3", "10 - 20 mmHg"];
var paop = ["Pulmonary Artery Occlusion Pressure", "PAOP", "", "", "6 - 12 mmHg"];
var lap = ["Left Atrial Pressure", "LAP", "", "", "6 - 12 mmHg"];
var co = ["Cardiac Output", "CO", "","HR x SV/1000", "4.0 - 8.0 L/min"];
var ci = ["Cardiac Index", "CI", "BSA = Body Surface Area", "CO/BSA", "2.5 - 4.0 L/min/m<sup>2</sup>"];
var sv = ["Stroke Volume", "SV", "", "CO/HR x 1000", "60 - 100 mL/beat"];
var svi = ["Stroke Volume Index", "SVI", "", "CI/HR x 1000", "33 - 47 mL/m<sup>2</sup>/beat"];
var svv = ["Stroke Volume Variation", "SVV", "", "(SVmax - SVmin)/SVmean x 100", "10 - 15 %"];
var svr = ["Systemic Vascular Resistance", "SVR", "", "80 x (MAP - CVD)/CO", "800 - 1200 dynes-sec/cm<sup>–5</sup>"];
var svri = ["Systemic Vascular Resistance Index", "SVRI", "", "80 x (MAP - CVD)/CI", "1970 - 2390 dynes-sec/cm<sup>–5</sup>/m<sup>2</sup>"];
var pvr = ["Pulmonary Vascular Resistance", "PVR", "", "80 x (MPAP - PAOP)/CO", "<250 dynes-sec/cm<sup>–5</sup>"];
var pvri = ["Pulmonary Vascular Resistance Index", "PVRI", "", "80 x (MPAP - PAOP)/CI", "255 - 285 dynes-sec/cm<sup>–5</sup>/m<sup>2</sup>"];
var cpp = ["Coronary Artery Perfusion Pressure", "CPP", "", "Diastolic BP-PAOP", "60 - 80 mmHg"];