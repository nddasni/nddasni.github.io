(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['FWformImageZoom'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n</div>\n<div class=\"body zoomBody\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.imageUrl || (depth0 != null ? depth0.imageUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"imageUrl","hash":{},"data":data}) : helper)))
    + "');\" id=\"zoomBody\"></div>\n";
},"useData":true});
templates['FWformRenderTemplate'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<div class=\"smaller tac\">";
  stack1 = ((helper = (helper = helpers.nl2br || (depth0 != null ? depth0.nl2br : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"nl2br","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.nl2br) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.formSubtitle || (depth0 != null ? depth0.formSubtitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"formSubtitle","hash":{},"data":data}) : helper)));
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<div class=\"form-row"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.error : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\""
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.contentType : depth0),"==","image",{"name":"ifCond","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n    <div class=\"one"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.contentType : depth0),"==","image",{"name":"ifCond","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.label : depth0),"!=",false,{"name":"ifCond","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.labelHint : depth0),"!=",false,{"name":"ifCond","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n    <div class=\"two"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.contentType : depth0),"==","image",{"name":"ifCond","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n\n"
    + ((stack1 = (helpers["switch"] || (depth0 && depth0["switch"]) || alias2).call(alias1,(depth0 != null ? depth0.contentType : depth0),{"name":"switch","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = (helpers["switch"] || (depth0 && depth0["switch"]) || alias2).call(alias1,(depth0 != null ? depth0.inputType : depth0),{"name":"switch","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return " form-error";
},"7":function(container,depth0,helpers,partials,data) {
    return " style=\"display:block\"";
},"9":function(container,depth0,helpers,partials,data) {
    return " db tac";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data}) : helper)));
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<div class=\"smaller\">";
  stack1 = ((helper = (helper = helpers.nl2br || (depth0 != null ? depth0.nl2br : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"nl2br","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.nl2br) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>";
},"14":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.labelHint || (depth0 != null ? depth0.labelHint : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"labelHint","hash":{},"data":data}) : helper)));
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"text",{"name":"case","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"image",{"name":"case","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"link",{"name":"case","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "            <div class=\"highlight-text-wrap\">\n                <div class=\"highlight-text\">";
  stack1 = ((helper = (helper = helpers.nl2br || (depth0 != null ? depth0.nl2br : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"nl2br","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.nl2br) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n            </div>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"content","hash":{},"data":data}) : helper)));
},"20":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <img src=\""
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\" class=\"formsmanager-content-image btn-manager\" button-action=\"Anti.formsManager.zoomImage\" action-parameter=\""
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\">\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <div><a class=\"btn btn-primary\" href=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.content : depth0)) != null ? stack1.url : stack1), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.content : depth0)) != null ? stack1.text : stack1), depth0))
    + "</a></div>\n";
},"24":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"radio",{"name":"case","hash":{},"fn":container.program(25, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"checkbox",{"name":"case","hash":{},"fn":container.program(33, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"select",{"name":"case","hash":{},"fn":container.program(35, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"textarea",{"name":"case","hash":{},"fn":container.program(38, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"text",{"name":"case","hash":{},"fn":container.program(41, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"imageUpload",{"name":"case","hash":{},"fn":container.program(43, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"buttons",{"name":"case","hash":{},"fn":container.program(45, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n";
},"25":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.inputOptions : depth0),{"name":"each","hash":{},"fn":container.program(26, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"26":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "            <div><div class=\"check-wrap"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depths[1] != null ? depths[1].correctOption : depths[1]),"==",(depth0 != null ? depth0.value : depth0),{"name":"ifCond","hash":{},"fn":container.program(27, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                <input type=\"radio\" name=\""
    + alias3(container.lambda((depths[1] != null ? depths[1].name : depths[1]), depth0))
    + "\" class=\"form-input\" value=\""
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" id=\"radio"
    + alias3(((helper = (helper = helpers.rand || (depth0 != null ? depth0.rand : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"rand","hash":{},"data":data}) : helper)))
    + "\""
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depths[1] != null ? depths[1].value : depths[1]),"===",(depth0 != null ? depth0.value : depth0),{"name":"ifCond","hash":{},"fn":container.program(29, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n                <label for=\"radio"
    + alias3(((helper = (helper = helpers.rand || (depth0 != null ? depth0.rand : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"rand","hash":{},"data":data}) : helper)))
    + "\" class=\"radio\">\n                    <span class=\"faked-control\"><span class=\"cir\"></span></span>\n                    <span class=\"label-text\">"
    + alias3(((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"caption","hash":{},"data":data}) : helper)))
    + "</span>\n                </label>\n                "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depths[1] != null ? depths[1].correctOption : depths[1]),"==",(depth0 != null ? depth0.value : depth0),{"name":"ifCond","hash":{},"fn":container.program(31, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            </div></div>\n";
},"27":function(container,depth0,helpers,partials,data) {
    return " check-correct";
},"29":function(container,depth0,helpers,partials,data) {
    return " checked";
},"31":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "<div class=\"check-comment\">"
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1].correctOptionComment : depths[1]), depth0))
    + "</div>";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"check-wrap\">\n            <input type=\"checkbox\" name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" id=\"checkbox"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\""
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.value : depth0),"==",true,{"name":"ifCond","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n            <label for=\"checkbox"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"checkbox\">\n                <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n                <span class=\"label-text\">"
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.inputOptions : depth0)) != null ? stack1.label : stack1), depth0))
    + "</span>\n            </label>\n        </div>\n";
},"35":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"adropdown\" default-value=\""
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" width=\"400px\" callback-parameter=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.inputOptions : depth0),{"name":"each","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n";
},"36":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <option value=\""
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"caption","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"38":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "            <textarea class=\"form-input inp-dft w"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.inputOptions : depth0)) != null ? stack1.width : stack1), depth0))
    + "p\" rows=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.inputOptions : depth0)) != null ? stack1.rows : stack1), depth0))
    + "\" name=\""
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" placeholder=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.inputOptions : depth0)) != null ? stack1.placeHolder : stack1), depth0))
    + "\">"
    + alias2(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"value","hash":{},"data":data}) : helper)))
    + "</textarea>\n            "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.correctOptionComment : depth0),"!=","",{"name":"ifCond","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"39":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"error-msg\" style='display:block'>"
    + container.escapeExpression(((helper = (helper = helpers.correctOptionComment || (depth0 != null ? depth0.correctOptionComment : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"correctOptionComment","hash":{},"data":data}) : helper)))
    + "</span>";
},"41":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "            <input type=\"text\" class=\"form-input inp-dft w"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.inputOptions : depth0)) != null ? stack1.width : stack1), depth0))
    + "p\" name=\""
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" placeholder=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.inputOptions : depth0)) != null ? stack1.placeHolder : stack1), depth0))
    + "\" value=\""
    + alias2(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"value","hash":{},"data":data}) : helper)))
    + "\">\n            "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.correctOptionComment : depth0),"!=","",{"name":"ifCond","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"43":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n            <div class=\"progressbar-single marginbottom10px\" style=\"display:none; width: 100%;\" id=\"fileProgressbar"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n                <span>Uploading file..</span>\n                <div class=\"progress\" style=\"width:0%\" id=\"fileProgressbarValue"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">Uploading file..</div>\n            </div>\n            <div id=\"paster"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"paste-image\" data-fileurl=\"\">Click and Paste image here</div>\n            <input type=\"file\" name=\"\" id=\"uploadFile"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"inputfile\">\n\n            <label for=\"uploadFile"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-default\">\n                <svg class=\"icon\"><use xlink:href=\"#icon-upload\" /></svg>&nbsp;&nbsp;select image\n            </label>\n";
},"45":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.inputOptions : depth0),{"name":"each","hash":{},"fn":container.program(46, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"46":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <span class=\"btn "
    + alias4(((helper = (helper = helpers.style || (depth0 != null ? depth0.style : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"style","hash":{},"data":data}) : helper)))
    + " btn-manager "
    + alias4(((helper = (helper = helpers.size || (depth0 != null ? depth0.size : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"size","hash":{},"data":data}) : helper)))
    + "\" button-action=\"Anti.formsManager.processAntiPacketButtonAction\" action-parameter=\""
    + alias4(((helper = (helper = helpers.randButtonId || (depth0 != null ? depth0.randButtonId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"randButtonId","hash":{},"data":data}) : helper)))
    + "\">\n                    <svg class=\"icon\"><use xlink:href=\"#"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" /></svg>\n                    <span class=\"label\">"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</span>\n                </span>\n";
},"48":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"btn btn-side btn-cancel btn-manager\" button-action=\""
    + alias4(((helper = (helper = helpers.cancelAction || (depth0 != null ? depth0.cancelAction : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cancelAction","hash":{},"data":data}) : helper)))
    + "\" action-parameter=\""
    + alias4(((helper = (helper = helpers.cancelActionParameter || (depth0 != null ? depth0.cancelActionParameter : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cancelActionParameter","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.cancelButtonText || (depth0 != null ? depth0.cancelButtonText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cancelButtonText","hash":{},"data":data}) : helper)))
    + "</span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"hdg1 tac\">"
    + alias4(((helper = (helper = helpers.formTitle || (depth0 != null ? depth0.formTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formTitle","hash":{},"data":data}) : helper)))
    + "</div>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.formSubtitle : depth0),"!=",false,{"name":"ifCond","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.forms : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"padding10px tac\">\n    <button class=\"btn btn-primary antipacket-submit-button\">"
    + alias4(((helper = (helper = helpers.submitButtonText || (depth0 != null ? depth0.submitButtonText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"submitButtonText","hash":{},"data":data}) : helper)))
    + "</button>\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.showCancelButton : depth0),{"name":"if","hash":{},"fn":container.program(48, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>\n";
},"useData":true,"useDepths":true});
templates['browserInstructionLink'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<svg class=\"icon\" style=\"color:red\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-cross\"></use></svg>\n&nbsp;Download <a href=\"/files/kolobrowser_setup.exe\" target=\"_blank\">Chromium</a> / <a href=\"/files/kolobrowsercomodo_setup.exe\" target=\"_blank\">Komodo</a>\n";
},"useData":true});
templates['caperrorsReadDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Attention!</span>\n</div>\n<div class=\"body\">Please type without errors or your account will be banned.</div>\n\n<div class=\"foot\">\n    <button class=\"btn btn-primary btn-manager\" button-action=\"Anti.errors.markRead\">Ok</button>\n    <button class=\"btn btn-side btn-cancel\">Cancel</button>\n</div>\n";
},"useData":true});
templates['caperrorsRemoveMoneyDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Please confirm</span>\n</div>\n<div class=\"body\">Error removal costs 0.02USD from your protected balance.<br>You have: "
    + alias4(((helper = (helper = helpers.money || (depth0 != null ? depth0.money : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"money","hash":{},"data":data}) : helper)))
    + " USD.</div>\n\n<div class=\"foot\">\n    <button class=\"btn btn-primary btn-manager\" button-action=\"Anti.errors.removeErrorForMoneyConfirm\" action-parameter=\""
    + alias4(((helper = (helper = helpers.errorId || (depth0 != null ? depth0.errorId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"errorId","hash":{},"data":data}) : helper)))
    + "\">Ok</button>\n    <button class=\"btn btn-side btn-cancel\">Cancel</button>\n</div>\n";
},"useData":true});
templates['caperrorsRemoveRecpointsDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Please confirm</span>\n</div>\n<div class=\"body\">Error removal costs "
    + alias4(((helper = (helper = helpers.cost || (depth0 != null ? depth0.cost : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cost","hash":{},"data":data}) : helper)))
    + " Recaptcha Points.<br>You have: "
    + alias4(((helper = (helper = helpers.recpoints || (depth0 != null ? depth0.recpoints : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"recpoints","hash":{},"data":data}) : helper)))
    + " RP.</div>\n\n<div class=\"foot\">\n    <button class=\"btn btn-primary btn-manager\" button-action=\"Anti.errors.removeErrorForRecaptchaPointsConfirm\" action-parameter=\""
    + alias4(((helper = (helper = helpers.errorId || (depth0 != null ? depth0.errorId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"errorId","hash":{},"data":data}) : helper)))
    + "\">Ok</button>\n    <button class=\"btn btn-side btn-cancel\">Cancel</button>\n</div>\n";
},"useData":true});
templates['caplazyFirewallMessage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "Our application works incorrectly on your computer. You need to add it to white list in your firewall<br><br>\n\n<span class=\"dash-button\" button-action=\"gotoFirewallInstruction\">Step-by-step instructions</span>\n";
},"useData":true});
templates['captchaLazyRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"padding10px\" style=\"border:1px solid black\"><b>Recaptcha skipped</b></div>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<img src=\""
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"url","hash":{},"data":data}) : helper)))
    + "\" width=\"250\">";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<div class=\"dib\" style=\"margin-left: 20px\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.url : depth0),"==","recaptcha",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.url : depth0),"!=","recaptcha",{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>\n";
},"useData":true});
templates['captchaRatingsRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "&nbsp;&nbsp;<span class=\"green\">your level</span>";
},"3":function(container,depth0,helpers,partials,data) {
    return "&nbsp;&nbsp;<span class=\"grey\">next level</span>";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<b>"
    + container.escapeExpression(((helper = (helper = helpers.volume || (depth0 != null ? depth0.volume : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"volume","hash":{},"data":data}) : helper)))
    + "</b>";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.volume || (depth0 != null ? depth0.volume : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"volume","hash":{},"data":data}) : helper)));
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"grey\"> ("
    + container.escapeExpression(((helper = (helper = helpers.nextdif || (depth0 != null ? depth0.nextdif : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"nextdif","hash":{},"data":data}) : helper)))
    + " more)</span>";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<b>+ "
    + container.escapeExpression(((helper = (helper = helpers.percent || (depth0 != null ? depth0.percent : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"percent","hash":{},"data":data}) : helper)))
    + "%</b>";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "+ "
    + container.escapeExpression(((helper = (helper = helpers.percent || (depth0 != null ? depth0.percent : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"percent","hash":{},"data":data}) : helper)))
    + "%";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<tr>\n   <td>"
    + container.escapeExpression(((helper = (helper = helpers.level || (depth0 != null ? depth0.level : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"level","hash":{},"data":data}) : helper)))
    + "\n   "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.mylevel : depth0),"==",(depth0 != null ? depth0.level : depth0),{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n   "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.nextlevel : depth0),"==",(depth0 != null ? depth0.level : depth0),{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n   </td>\n   <td>"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.mylevel : depth0),"==",(depth0 != null ? depth0.level : depth0),{"name":"ifCond","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.mylevel : depth0),"!=",(depth0 != null ? depth0.level : depth0),{"name":"ifCond","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.nextlevel : depth0),"==",(depth0 != null ? depth0.level : depth0),{"name":"ifCond","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n   </td>\n   <td>"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.mylevel : depth0),"==",(depth0 != null ? depth0.level : depth0),{"name":"ifCond","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.mylevel : depth0),"!=",(depth0 != null ? depth0.level : depth0),{"name":"ifCond","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n</tr>\n";
},"useData":true});
templates['captchaStatsTablerow'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "        -\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        $"
    + alias4(((helper = (helper = helpers.refund_amount || (depth0 != null ? depth0.refund_amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"refund_amount","hash":{},"data":data}) : helper)))
    + " / "
    + alias4(((helper = (helper = helpers.refund_count || (depth0 != null ? depth0.refund_count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"refund_count","hash":{},"data":data}) : helper)))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n   <td>"
    + ((stack1 = ((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.volume || (depth0 != null ? depth0.volume : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"volume","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.earned || (depth0 != null ? depth0.earned : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"earned","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.bonus || (depth0 != null ? depth0.bonus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bonus","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.refund_count : depth0),"==",0,{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.refund_count : depth0),"!=",0,{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n</tr>\n";
},"useData":true});
templates['captchaStatsTablerowPending'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n   <td>"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.volume || (depth0 != null ? depth0.volume : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"volume","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.earned || (depth0 != null ? depth0.earned : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"earned","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.bonus || (depth0 != null ? depth0.bonus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bonus","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>\n";
},"useData":true});
templates['captchasToplistRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<b> (<span class=\"green\">you</span>)</b>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n   <td style=\"background-color: #E2E8FF\"><img src=\"https://kolostories.com/images/flags-mini/"
    + alias4(((helper = (helper = helpers.country || (depth0 != null ? depth0.country : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"country","hash":{},"data":data}) : helper)))
    + ".png\" title=\""
    + alias4(((helper = (helper = helpers.countryName || (depth0 != null ? depth0.countryName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"countryName","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.countryName || (depth0 != null ? depth0.countryName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"countryName","hash":{},"data":data}) : helper)))
    + "\" style=\"width: 30px\"></td>\n   <td>"
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.you : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.guesses || (depth0 != null ? depth0.guesses : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"guesses","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>$"
    + alias4(((helper = (helper = helpers.money || (depth0 != null ? depth0.money : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"money","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>\n    <div class=\"progressbar-single no-anim\">\n        $"
    + alias4(((helper = (helper = helpers.recaptcha || (depth0 != null ? depth0.recaptcha : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"recaptcha","hash":{},"data":data}) : helper)))
    + " / $"
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\n        <div class=\"progress\" style=\"width:"
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "%\">$"
    + alias4(((helper = (helper = helpers.recaptcha || (depth0 != null ? depth0.recaptcha : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"recaptcha","hash":{},"data":data}) : helper)))
    + " / $"
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "</div>\n    </div>\n    </td>\n</tr>\n";
},"useData":true});
templates['certScreenSlide'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"slide\">\n    <div class=\"img\"><img src=\""
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\"></div>\n    <div class=\"imgdesc\">"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});
templates['changePasswordStep1'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Step 1 of 2</span>\n</div>\n<form class=\"form form-one-two\" form-action=\"passwordResetAttempt\" id=\"passwordResetForm\" form-block-processing=\"true\">\n    <div class=\"body\">\n        <div class=\"form-msg\" id=\"recoverMessage\"></div>\n        <div class=\"form-row\">\n            <label class=\"one\">Old password:</label>\n            <span class=\"two\">\n                <input type=\"password\" id=\"oldpass\"  class=\"inp-dft db w100p\">\n                <span class=\"error-msg\"></span>\n            </span>\n        </div>\n        <div class=\"form-row\">\n            <label class=\"one\">New password:</label>\n            <span class=\"two\">\n                <input type=\"password\" id=\"password_reset\" class=\"inp-dft db w100p\" onkeyup=\"Anti.entrance.scorePassword(this.value);\">\n                <span class=\"error-msg\"></span>\n                <div class=\"inpdesc\" id=\"pass-strength\">&nbsp;&nbsp;</div>\n                <div class=\"pass-thumb bad\"><svg class=\"icon\"><use xlink:href=\"#icon-thumb\" /></svg></div>\n            </span>\n        </div>\n        <div class=\"form-row\">\n            <label class=\"one\">New password:</label>\n            <span class=\"two\">\n                <input type=\"password\" id=\"password_copy\" class=\"inp-dft db w100p\">\n                <span class=\"error-msg\"></span>\n            </span>\n        </div>\n    </div>\n    <div class=\"foot\">\n        <button class=\"btn btn-primary\" type=\"submit\">set password</button>\n        <button class=\"btn btn-side btn-cancel\">Cancel</button>\n    </div>\n</form>\n";
},"useData":true});
templates['dialogManagerMessage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span>\n</div>\n<div class=\"body "
    + alias4(((helper = (helper = helpers.align || (depth0 != null ? depth0.align : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"align","hash":{},"data":data}) : helper)))
    + "\"><div class=\"scrollable\">"
    + ((stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div></div>\n\n<div class=\"foot\">\n    <button class=\"btn btn-primary btn-manager\" button-action=\""
    + alias4(((helper = (helper = helpers.customAction || (depth0 != null ? depth0.customAction : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"customAction","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.confirmButtonText || (depth0 != null ? depth0.confirmButtonText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"confirmButtonText","hash":{},"data":data}) : helper)))
    + "</button>\n    <button class=\"btn btn-side btn-cancel\">Cancel</button>\n</div>\n";
},"useData":true});
templates['earnDiscointSetter'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"smaller desc\">\n    Set discount boost to get more priority:\n    <div>\n    <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"0\">0 %<span class=\"tooltiptext\">CTRL+0</span></button>\n    <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"10\">10 %<span class=\"tooltiptext\">CTRL+1</span></button>\n    <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"20\">20 %<span class=\"tooltiptext\">CTRL+2</span></button>\n    <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"30\">30 %<span class=\"tooltiptext\">CTRL+3</span></button>\n    <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"40\">40 %<span class=\"tooltiptext\">CTRL+4</span></button>\n    <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"50\">50 %<span class=\"tooltiptext\">CTRL+5</span></button>\n    <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setCustomDiscountDialog\" action-parameter=\"51\" id=\"customDiscountBtn\" title=\"CTRL+6\">CUSTOM</button>\n    <span id=\"customDiscountSpan\" style=\"display:none\"><input type=text style=\"width:50px\" value=\"50\" id=\"customDiscountValue\"><button class=\"btn btn-default btn-manager small\" button-action=\"workflow.setCustomDiscount\">OK</button></span>\n    </div>\n    <div class=\"grid margintop20px\">\n        <div class=\"col tac\">\n            <div class=\"desc nowrap\" id=\"imagePriorityBoostDescription\">Boosted Img.Priority:</div>\n            <div class=\"progressbar mauto0\" id=\"imagePriorityBoostLabel\" title=\"\" style=\"width:130px;\">\n                <div class=\"progress\" id=\"imagePriorityBoostProgress\" style=\"width:0%\"></div>\n            </div>\n        </div>\n        <div class=\"col tac recaptcha-rstats-widget\">\n            <div class=\"desc nowrap\" id=\"recaptchaPriorityBoostDescription\">Boosted RC.Priority:</div>\n            <div class=\"progressbar mauto0\" id=\"recaptchaPriorityBoostLabel\" title=\"\" style=\"width:130px;\">\n                <div class=\"progress\" id=\"recaptchaPriorityBoostProgress\" style=\"width:0%\"></div>\n            </div>\n        </div>\n    </div>\n    <div class=\"grid\" style=\"margin-top:-20px\">\n        <div class=\"col tac\">\n            <div class=\"desc\">Image Sys.Load:</div>\n            <div class=\"progressbar mauto0\" id=\"imageBoostSysLoadLabel\" title=\"\" style=\"width:130px;\">\n                <div class=\"progress\" id=\"imageBoostSysLoadProgress\" style=\"width:0%\"></div>\n            </div>\n        </div>\n        <div class=\"col tac recaptcha-rstats-widget\">\n            <div class=\"desc\">Recaptcha Sys.Load:</div>\n            <div class=\"progressbar mauto0\" id=\"recaptchaBoostSysLoadLabel\" title=\"\" style=\"width:130px;\">\n                <div class=\"progress\" id=\"recaptchaBoostSysLoadProgress\" style=\"width:0%\"></div>\n            </div>\n        </div>\n    </div>\n    <div class=\"grid\" style=\"margin-top:-20px\">\n        <div class=\"col tac\">\n            <div class=\"desc\">Image Avg.Bid: <span id=\"imageAverageBidLabel\">-</span></div>\n        </div>\n        <div class=\"col tac\">\n            <div class=\"desc\">Recaptcha Avg.Bid <span id=\"recaptchaAverageBidLabel\">-</span></div>\n        </div>\n    </div>\n    <div class=\"desc nowrap\" id=\"recaptchaNotCompatible\" style=\"display:none; color: #7C0112\"></div>\n    <div class=\"grid\" id=\"recaptchaWorkflowTuning\">\n        <div class=\"col\">\n            Open Recaptcha in:\n            <div class=\"desc\" id=\"openTargetNotCompatible\" style=\"display:none; color: #7C0112\">Options requires plugin 0.96 and higher</div>\n            <div class=\"nowrap\">\n            <button class=\"plugin-param-target btn btn-default btn-manager small\" button-action=\"workflow.setPluginOpenTarget\" action-parameter=\"tab\">new TAB</button>\n            <button class=\"plugin-param-target btn btn-default btn-manager small\" button-action=\"workflow.setPluginOpenTarget\" action-parameter=\"iframe\">same window</button>\n            </div>\n        </div>\n        <div class=\"col\">\n            Auto-clean cookies\n            <div class=\"nowrap\">\n            <button class=\"param-autoclean btn btn-default btn-manager small\" button-action=\"workflow.setAutocleanCookies\" action-parameter=\"true\">ON</button>\n            <button class=\"param-autoclean btn btn-default btn-manager small\" button-action=\"workflow.setAutocleanCookies\" action-parameter=\"false\">OFF</button>\n            <button class=\"btn btn-default btn-manager small\" button-action=\"processor.type9.clearCookiesNow\" id=\"cleanCookiesNow\">Clean now</button>\n            </div>\n            <span id=\"cookiesAutoCleanComment\"></span>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['earnForm0'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"captcha-solver\">\n    <div class=\"form\">\n        <div id=\"form0CaptchaData\"></div>\n        <div class=\"input-row\">\n\n            <span class=\"\">\n                <button class=\"btn btn-manager\" button-action=\"workflow.skipTask\" id=\"skipTaskButton\" action-parameter=\"SkipButton0\">Skip<span id=\"skipsLeftLabel\"></span></button>\n                <span style=\"position:absolute; margin-top:30px; margin-left:-144px\" id=\"reportButton\" style=\"display:none\"><br>\n                    <button class=\"btn btn-manager\" button-action=\"workflow.reportBadFlags\">Can't solve</button>\n                </span>\n            </span>\n            <div class=\"input-wrap\" id=\"guesstextInputWrap\">\n                <input type=\"text\" class=\"inp-dft guesstext\" id=\"guesstext\" value=\"\">\n                <div class=\"error-msg\" id=\"guesstextError\"></div>\n            </div>\n            <button class=\"btn btn-submit btn-manager\" button-action=\"processor.type0.save\">Submit</button>\n\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['earnForm0Captcha'] = template({"1":function(container,depth0,helpers,partials,data) {
    return " active";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"captcha-image\">Answer question: "
    + container.escapeExpression(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"comment","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <div class=\"captcha-image\" style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"body","hash":{},"data":data}) : helper)))
    + "')\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"comment-row\" id=\"captchaCommentLabel\">"
    + alias4(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"params-row\">\n    <div class=\"params\">\n        <div class=\"parameter"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.is_reg : depth0),"==","1",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" id=\"flagCase\">cAsE</div>\n        <div class=\"parameter"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.is_phrase : depth0),"==","1",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" id=\"flag2Words\">2 words</div>\n    </div>\n    <div class=\"params captcha-wrap\">\n        <div class=\"paused-overlay\"></div>\n        <div class=\"captcha-loader\"></div>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.body : depth0)) != null ? stack1.length : stack1),"==",0,{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.body : depth0)) != null ? stack1.length : stack1),">",0,{"name":"ifCond","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"params\">\n        <div class=\"parameter"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.is_numeric : depth0),"==","1",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" id=\"flagNumbers\">numbers</div>\n        <div class=\"parameter"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.lengthActive : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" id=\"flagLength\">\n            <span id=\"flagMinLength\">min: "
    + alias4(((helper = (helper = helpers.min_len || (depth0 != null ? depth0.min_len : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"min_len","hash":{},"data":data}) : helper)))
    + "</span><br>\n            <span id=\"flagMaxLength\">max: "
    + alias4(((helper = (helper = helpers.max_len || (depth0 != null ? depth0.max_len : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"max_len","hash":{},"data":data}) : helper)))
    + "</span>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['earnForm15'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"captcha-solver form\">\n\n    <div class=\"input-row comment-row\">Find object: "
    + alias4(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"input-row error\" id=\"errorText\" style=\"display:none\"></div>\n    <div class=\"oldsolver\" style=\"width: "
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "px; height: "
    + alias4(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data}) : helper)))
    + "px; background: url("
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + ");\">\n    "
    + ((stack1 = ((helper = (helper = helpers.nethtml || (depth0 != null ? depth0.nethtml : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nethtml","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n\n    <div class=\"mauto0 margintop10px tac\">\n        <button class=\"btn btn-submit btn-manager\" button-action=\"processor.type15.save\">Submit</button>\n    </div>\n\n</div>\n\n<div class=\"recaptcha-opts\">\n    <div class=\"opt-row\">\n        <button class=\"btn btn-manager btn-default\" button-action=\"workflow.skipTask\" id=\"skipTaskButton\" action-parameter=\"SkipButton15\">Skip task</button>\n    </div>\n</div>\n";
},"useData":true});
templates['earnFormPluginRecaptcha'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"solving-time\">\n    <div class=\"title\">Solving time:</div>\n    <div class=\"colm-solving-graphs\">\n    </div>\n    <div class=\"colm-bracket\">\n        <div class=\"bracket-top\"></div>\n        <div class=\"bracket-center\"></div>\n        <div class=\"bracket-bottom\"></div>\n    </div>\n    <div class=\"colm-avarage\">\n        <div class=\"solving-avarage\">\n            <div class=\"avg-time\">40s</div>\n            <span>Average time</span>\n        </div>\n        <div class=\"recommended-actions\" style=\"display:none\">\n            <strong>Recommended actions:</strong>\n            <ul>\n                <li style=\"display:none\" id=\"useAndroidAppHint\">\n                    Recaptchas solved 2 times faster in our Android app. Just search for \"Kolotibablo Bot\" in Play Market or use this link:<br>\n                    <a href=\"https://play.google.com/store/apps/details?id=com.kolotibablo&hl=en\" target=\"_blank\">Android App</a>\n                </li>\n                <li style=\"display:none\" id=\"signIntoGmailHint\">\n                    Sign into <a href=\"http://bropanel.com/gmail.html\" target=_blank>Gmail</a>\n                </li>\n                <li style=\"display:none\" id=\"useGmailPumpHint\">\n                    Use <span class=\"dash-button\" button-action=\"interface.waitForPauseAndGo\" action-parameter=\"tools/pump\">Gmail Pump tool</span>\n                </li>\n                <li style=\"display:none\" id=\"clearCookieHint\">\n                    Don't forget to <span class=\"dash-button\" button-action=\"processor.type9.clearCookiesDelayed\">clean cookies</span> before signing into Gmail\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n<div class=\"captcha-solver\">\n    <div class=\"hdg2 tac error\" id=\"importantHeader\" style=\"display:none\"></div>\n    <div class=\"hint tac\" id=\"infoHeader\" style=\"display:none\"></div>\n    <div class=\"long-island tac\" style=\"max-width: 100%; width: 400px; height: 600px; background-color: #CCC;  display: table; border-radius:5px\">\n\n        <br><br>\n        <b>Opening task in new tab...</b><br>\n        <span class=\"hint\">ID "
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "</span>\n\n        <br><br>\n        <!--<button class=\"btn btn-manager btn-default\" button-action=\"processor.type9.reload\">reload task</button>-->\n\n\n    </div>\n</div>\n\n<div class=\"recaptcha-opts\">\n    <div class=\"opt-row\">\n        <button class=\"btn btn-manager btn-default\" button-action=\"workflow.skipTask\" id=\"skipTaskButton\" action-parameter=\"SkipButtonRecaptcha\">Skip task</button>\n    </div>\n    <div class=\"opt-row\">\n        <button class=\"btn btn-manager btn-default\" button-action=\"workflow.refreshLastAction\" id=\"moreTimeButton\">More time</button>\n    </div>\n</div>\n\n";
},"useData":true});
templates['earnLoaderMessage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"step-loading\">\n    <div class=\"title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n    <svg class=\"loader\"><use xlink:href=\"#loader\" /></svg>\n    <div class=\"desc\">"
    + alias4(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n";
},"useData":true});
templates['earnPauseMessage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"step-loopback\">\n    <img src=\"https://w7.pngwing.com/pngs/398/348/png-transparent-parapark-cluj-titus-andronicus-the-purge-film-series-resident-evil-donation-blood-miscellaneous-hand-red.png\">\n    <div class=\"title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"desc\">"
    + alias4(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</div>\n    <button id=\"cookiesCleanButton\" style=\"display:none\" class=\"btn btn-default margintop10px btn-manager\" button-action=\"processor.type9.clearCookiesNow\">Clean cookies</button>\n    <div id=\"cookiesClearedMessage\" style=\"display:none\">Cookies cleaned</div>\n    <div id=\"restartRequestSuggestMessage\" style=\"display:none\"><button class=\"btn btn-default margintop10px btn-manager\" button-action=\"processor.captchasCommon.restartRequests\">Restart process</button></div>\n</div>\n";
},"useData":true});
templates['earnPluginDisable'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<svg class=\"icon\" style=\"color:green\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-check\"></use></svg>\n";
},"useData":true});
templates['earnPluginEnable'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<svg class=\"icon\" style=\"color:#ffa200\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-cross\"></use></svg>\n&nbsp;&nbsp;&nbsp;\n<span class=\"dash-button\" button-action=\"enablePlugin\">enable plugin</span>\n";
},"useData":true});
templates['earnPluginInstructionLink'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<svg class=\"icon\" style=\"color:red\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-cross\"></use></svg>\n&nbsp;&nbsp;&nbsp;\n<span class=\"dash-link\" data-navigate=\"info/plugin\">Install</span>\n&nbsp;&nbsp;<spam class=\"dash-button\" button-action=\"checkInstallation\">check installation</span>\n";
},"useData":true});
templates['earnRecaptchaAverageTime'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"progressbar\" title=\""
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"progress\" style=\"width:"
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "%; background: #"
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\"></div>\n</div>\n";
},"useData":true});
templates['earnStepsFormContainer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"scrollable w95p\">\n    <form class=\"card-white form form-one-two zebra\" id=\"stepFormContainer\" form-block-processing=\"true\" form-action=\"Anti.earn.processor.type5.submitWorkflowStepData\"></form>\n</div>\n";
},"useData":true});
templates['earnStepsRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "for-worker";
},"3":function(container,depth0,helpers,partials,data) {
    return "for-client";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"stepId"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"step "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.side : depth0),"==","employee",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.side : depth0),"==","client",{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    <div class=\"number\">"
    + alias4(((helper = (helper = helpers.number || (depth0 != null ? depth0.number : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"number","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"desc\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n";
},"useData":true});
templates['earnStepsWaitContainer'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"scrollable w95p\">\n    <div class=\"card-white form form-one-two zebra\">\n        <div class=\"hdg1 tac\">"
    + alias4(((helper = (helper = helpers.formTitle || (depth0 != null ? depth0.formTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formTitle","hash":{},"data":data}) : helper)))
    + "</div>\n        <div class=\"tac\">"
    + alias4(((helper = (helper = helpers.formSubtitle || (depth0 != null ? depth0.formSubtitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formSubtitle","hash":{},"data":data}) : helper)))
    + "</div>\n        <div class=\"margintop30 tac\">\n            <div class=\"progressbar-single mauto0\" style=\"width:500px\"><div class=\"progress\" style=\"width:50%\" id=\"clientWaitProgressbar\"></div></div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['emailConfirmationDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"head\">\n<div class=\"close\"></div>\n <span class=\"title\">Step 2 of 2</span>\n</div>\n<form class=\"form form-one-two\" form-action=\"Anti.account.completeConfirmation\" id=\"confirmationForm\" form-block-processing=\"true\">\n    <div class=\"body\">\n        <div class=\"form-row\">\n            <label class=\"one\">Confirmation code from your email:</label>\n            <span class=\"two\">\n                <input type=\"text\" id=\"confirmationCode\"  class=\"inp-dft db w100p\">\n                <span class=\"error-msg\"></span>\n            </span>\n        </div>\n    </div>\n    <div class=\"foot\">\n        <button class=\"btn btn-primary\" type=\"submit\">Confirm</button>\n        <button class=\"btn btn-side btn-cancel\">Cancel</button>\n    </div>\n</form>\n";
},"useData":true});
templates['entranceImageCaptcha'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"tac\">\n<img src=\"/api/getcontrolcaptcha?id="
    + container.escapeExpression(((helper = (helper = helpers.captcha_id || (depth0 != null ? depth0.captcha_id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"captcha_id","hash":{},"data":data}) : helper)))
    + "\"><br>\n<input type=\"text\" class=\"inp-dft dib\" id=\"captchaText\">\n</div>\n";
},"useData":true});
templates['errorsTablerow'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "   <img src=\""
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" style=\"max-height: 500px; max-width: 500px\">\n   <div>\n       "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.is_new : depth0),"==","1",{"name":"ifCond","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n       "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.is_new : depth0),"==","0",{"name":"ifCond","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n   </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "<span class=\"red\">new error</span>";
},"4":function(container,depth0,helpers,partials,data) {
    return "old error";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "       <div>Select <b>all</b> images matching criteria: "
    + alias4(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</div>\n       <div style=\"position: absolute; z-index: 10;width: 150px; height: 150px;\"><img src=\"/images/masks/recaptcha2.png\" style=\" width: 150px; height: 150px;\"></div>\n       <div style=\"position: relative; z-index: 5;width: 150px; height: 150px;\"><img src=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" style=\" width: 150px; height: 150px;\"></div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "       <div>Select <b>all</b> squares with: "
    + alias4(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "</div>\n       <div style=\"position: absolute; z-index: 10;width: 150px; height: 150px;\"><img src=\"/images/masks/recaptcha2.png\" style=\" width: 150px; height: 150px;\"></div>\n       <div style=\"position: relative; z-index: 5;width: 150px; height: 150px;\"><img src=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" style=\" width: 150px; height: 150px;\"></div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <audio src=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" id=\"player"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></audio>\n        <div class=\"tac\">\n            <span class=\"btn-manager\" button-action=\"audioPlay\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">play</span>\n            <span class=\"btn-manager\" button-action=\"audioPause\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">pause</span>\n            <br>\n            <progress id=\"seekbar"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" value=\"0\" max=\"1\" style=\"width:200px;\"></progress>\n        </div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "           <button class=\"btn btn-primary\">no objects found</button>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper;

  return "           <div style=\"max-width: 500px; word-break: break-all\">"
    + container.escapeExpression(((helper = (helper = helpers.guesstext || (depth0 != null ? depth0.guesstext : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"guesstext","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.correct_text : depth0),"!=","EMPTY_ANSWER",{"name":"ifCond","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.correct_text : depth0),"==","EMPTY_ANSWER",{"name":"ifCond","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"17":function(container,depth0,helpers,partials,data) {
    var helper;

  return "          <div>Correct answer: <b>"
    + container.escapeExpression(((helper = (helper = helpers.correct_text || (depth0 != null ? depth0.correct_text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"correct_text","hash":{},"data":data}) : helper)))
    + "</b></div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "          <div>Correct answer:</div><br><button class=\"btn btn-primary\">no objects found</button><br><br>\n";
},"21":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"padding10px\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"markReadDialog\">mark as read</button>\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n   <td>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.type_id : depth0),"==","0",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.type_id : depth0),"==","1",{"name":"ifCond","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.type_id : depth0),"==","3",{"name":"ifCond","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.type_id : depth0),"==","8",{"name":"ifCond","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   </td>\n   <td>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.guesstext : depth0),"==","EMPTY_ANSWER",{"name":"ifCond","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.guesstext : depth0),"!=","EMPTY_ANSWER",{"name":"ifCond","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   </td>\n   <td>"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.correct_text : depth0),"!=","",{"name":"ifCond","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   </td>\n   <td>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.is_new : depth0),"==","1",{"name":"ifCond","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   <div class=\"padding10px\">\n        <button class=\"btn btn-primary btn-manager nowrap\" button-action=\"removeForMoneyErrorDialog\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">remove 0.02 USD</button>\n    </div>\n   <div class=\"padding10px\">\n        <button class=\"btn btn-primary btn-manager nowrap\" button-action=\"removeForRecaptchaPointsErrorDialog\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">remove "
    + alias4(((helper = (helper = helpers.recCost || (depth0 != null ? depth0.recCost : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"recCost","hash":{},"data":data}) : helper)))
    + " RP</button>\n    </div>\n   </td>\n</tr>\n";
},"useData":true});
templates['errorsTablerowEmpty'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<tr><td colspan=4 align=center>Good news, you have no errors!</td></tr>\n";
},"useData":true});
templates['factoriesComingSoon'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"card-blue grid-middle\">\n    <div class=\"col-12\">\n        New tasks are not yet available for your account and they're coming soon.\n        You'll receive notifications on the start page when something new appears here.\n    </div>\n</div>\n";
},"useData":true});
templates['factoriesListRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "&nbsp;&nbsp;<span class=\"inline-new\">New</span>";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "    <div class=\"smaller\">Instant payouts: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.withhelds : depth0)) != null ? stack1.noDelayPercent : stack1), depth0))
    + "</div>\n    <div class=\"smaller\">Canceled payouts: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.withhelds : depth0)) != null ? stack1.unpaidPercent : stack1), depth0))
    + "</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"not-subscribed",{"name":"case","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"offline","online",{"name":"case","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"onApprove",{"name":"case","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"banned",{"name":"case","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"trainFailed",{"name":"case","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"factoryIsFull",{"name":"case","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"train",{"name":"case","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <button class=\"btn btn-primary btn-manager medium\" button-action=\"dialog.subscribe\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n             <svg class=\"icon\"><use xlink:href=\"#icon-plus\" /></svg>\n             <span class=\"label\">Take job</span>\n        </button>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <div class=\"hdg2\">Approved</div>\n        <button class=\"btn btn-default btn-manager medium\" button-action=\"dialog.removeFactory\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n             <svg class=\"icon\"><use xlink:href=\"#icon-cross\" /></svg>\n             <span class=\"label\">Remove</span>\n        </button>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "            Membership is being reviewed by Factory owner\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "            Banned\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "            Qualification test failed\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "            Factory is temporarily not accepting new employees\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper;

  return "         <button class=\"btn btn-default btn-manager medium\" button-action=\"dialog.startTraining\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n             <svg class=\"icon\"><use xlink:href=\"#icon-arrow\" /></svg>\n             <span class=\"label\">Continue Test</span>\n        </button>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<button class=\"btn btn-default btn-manager\" button-action=\"dialog.manageRemoteData\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n     <svg class=\"icon\"><use xlink:href=\"#icon-gear\" /></svg>\n     <span class=\"label\">Settings</span>\n</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n<td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isNew : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<div class=\"smaller\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div> <span class=\"dash-button\" button-action=\"dialog.viewDescription\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">More details</span>\n</td>\n<td>\n<div class=\"smaller\">\n    <li>Average bid 24h: $"
    + alias4(((helper = (helper = helpers.averageBid || (depth0 != null ? depth0.averageBid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"averageBid","hash":{},"data":data}) : helper)))
    + " per task\n</div>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.withhelds : depth0)) != null ? stack1.noDelayPercent : stack1),"!=","no data",{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n<td class=\"nowrap\">\n"
    + ((stack1 = (helpers["switch"] || (depth0 && depth0["switch"]) || alias2).call(alias1,(depth0 != null ? depth0.subscriptionStatus : depth0),{"name":"switch","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.remoteData : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n</tr>\n";
},"useData":true});
templates['factoriesTrainSuggestionDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Factory requirements</span>\n</div>\n<div class=\"form form-one-two\">\n    <div class=\"body\">\n        This factory requires that you first pass qualification test. Would you like to start it now?\n    </div>\n    <div class=\"foot\">\n        <button class=\"btn btn-primary btn-manager\" button-action=\"dialog.startTraining\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.factoryId || (depth0 != null ? depth0.factoryId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"factoryId","hash":{},"data":data}) : helper)))
    + "\">Yes, start training</button>\n        <button class=\"btn btn-side btn-cancel\">Cancel</button>\n    </div>\n</div>\n";
},"useData":true});
templates['factoryCategoryCard'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"badge-new\">"
    + container.escapeExpression(((helper = (helper = helpers.newCount || (depth0 != null ? depth0.newCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"newCount","hash":{},"data":data}) : helper)))
    + " new</div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col btn-manager\" button-action=\"load.factories\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <a class=\"card-white card-cat\">\n        "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.newCount : depth0),">",0,{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        <img src=\""
    + alias4(((helper = (helper = helpers.icon_url || (depth0 != null ? depth0.icon_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon_url","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\n        <div class=\"title\">\n            "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n            <div class=\"count\">"
    + alias4(((helper = (helper = helpers.factoriesCount || (depth0 != null ? depth0.factoriesCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"factoriesCount","hash":{},"data":data}) : helper)))
    + " factories</div>\n        </div>\n    </a>\n</div>\n";
},"useData":true});
templates['factoryStatsDropdown'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"caption","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"setFactoryList\" class=\"adropdown\" default-value=\"all\" width=\"350px\" callback-function=\"setFactoryId\" callback-parameter=\"factoryId\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['factoryStatsTablerow'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n   <td>"
    + ((stack1 = ((helper = (helper = helpers.datestr || (depth0 != null ? depth0.datestr : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datestr","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.money || (depth0 != null ? depth0.money : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"money","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>\n";
},"useData":true});
templates['faqRecord'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"item expandable\">\n    <div class=\"title btn-manager\" button-action=\"toggleTopicEvent\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.question || (depth0 != null ? depth0.question : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"desc\">"
    + ((stack1 = ((helper = (helper = helpers.answer || (depth0 != null ? depth0.answer : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"useData":true});
templates['financeHistoryRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.queueComment : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "\n    <div><span class=\"dash-button hint\" button-action=\"cancelTransaction\" action-parameter=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.params : depth0)) != null ? stack1.moneyOutId : stack1), depth0))
    + "\">cancel payout</span></div>\n\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <div class=\"hint\">"
    + container.escapeExpression(((helper = (helper = helpers.queueComment || (depth0 != null ? depth0.queueComment : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"queueComment","hash":{},"data":data}) : helper)))
    + "\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.status : depth0),"!=","error",{"name":"ifCond","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"hint\">#"
    + container.escapeExpression(((helper = (helper = helpers.queueCount || (depth0 != null ? depth0.queueCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"queueCount","hash":{},"data":data}) : helper)))
    + " in the queue</div>";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.errorString : depth0),"!=","",{"name":"ifCond","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"error\">"
    + container.escapeExpression(((helper = (helper = helpers.errorString || (depth0 != null ? depth0.errorString : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"errorString","hash":{},"data":data}) : helper)))
    + "</div>";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "   <div class=\"smaller\"><a href=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.link : depth0)) != null ? stack1.href : stack1), depth0))
    + "\" target=_blank>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.link : depth0)) != null ? stack1.text : stack1), depth0))
    + "</a></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n   <td>"
    + alias4(((helper = (helper = helpers.date_dateWithMinutes || (depth0 != null ? depth0.date_dateWithMinutes : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date_dateWithMinutes","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data}) : helper)))
    + "</td>\n   <td>"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.cancelable : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   </td>\n   <td>"
    + alias4(((helper = (helper = helpers.comment || (depth0 != null ? depth0.comment : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comment","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"in","error|canceled",{"name":"ifCond","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.link : depth0),"!=",false,{"name":"ifCond","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   </td>\n</tr>\n";
},"useData":true});
templates['financeHistoryRowEmpty'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<tr>\n    <td colspan=\"4\" class=\"tac\">no transactions yet</td>\n</tr>\n";
},"useData":true});
templates['financeWithdrawCSOfferRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.completed_trades : stack1)) != null ? stack1.total : stack1), depth0))
    + " trades\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                , "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.review_score : stack1)) != null ? stack1.total : stack1), depth0))
    + "% rating\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            , response time: "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.avg_answers : stack1), depth0))
    + " minutes\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <div><i>"
    + container.escapeExpression(((helper = (helper = helpers.short_description || (depth0 != null ? depth0.short_description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"short_description","hash":{},"data":data}) : helper)))
    + "</i></div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "            Buying "
    + alias1(((helper = (helper = helpers.cryptocurrency || (depth0 != null ? depth0.cryptocurrency : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"cryptocurrency","hash":{},"data":data}) : helper)))
    + " for "
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.payment_system : depth0)) != null ? stack1.name : stack1), depth0))
    + "\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "            Selling "
    + alias1(((helper = (helper = helpers.cryptocurrency || (depth0 != null ? depth0.cryptocurrency : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"cryptocurrency","hash":{},"data":data}) : helper)))
    + " for "
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.payment_system : depth0)) != null ? stack1.name : stack1), depth0))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "<tr>\n    <td>\n        <a href=\"https://cryptoswapp.com/profile/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "</a>\n        <div>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.completed_trades : stack1)) != null ? stack1.total : stack1),">",0,{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.review_score : stack1)) != null ? stack1.total : stack1),">",0,{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.avg_answers : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </td>\n    <td>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.country : depth0)) != null ? stack1.name : stack1), depth0))
    + " - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.payment_system : depth0)) != null ? stack1.name : stack1), depth0))
    + "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.short_description : depth0),"!=","",{"name":"ifCond","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n    <td>\n        <div>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.type : depth0),"==","BUY",{"name":"ifCond","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,(depth0 != null ? depth0.type : depth0),"==","SELL",{"name":"ifCond","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n        1 "
    + alias2(((helper = (helper = helpers.cryptocurrency || (depth0 != null ? depth0.cryptocurrency : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"cryptocurrency","hash":{},"data":data}) : helper)))
    + " = "
    + alias2(((helper = (helper = helpers.current_price || (depth0 != null ? depth0.current_price : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"current_price","hash":{},"data":data}) : helper)))
    + " "
    + alias2(((helper = (helper = helpers.currency || (depth0 != null ? depth0.currency : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"currency","hash":{},"data":data}) : helper)))
    + "\n        <div class=\"smaller\">min: "
    + alias2(((helper = (helper = helpers.min_limit || (depth0 != null ? depth0.min_limit : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"min_limit","hash":{},"data":data}) : helper)))
    + " "
    + alias2(((helper = (helper = helpers.currency || (depth0 != null ? depth0.currency : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"currency","hash":{},"data":data}) : helper)))
    + "</div>\n    </td>\n    <td>\n        <a class=\"btn btn-default btn-manager\" href=\"https://cryptoswapp.com/offers/"
    + alias2(((helper = (helper = helpers.friendly_id || (depth0 != null ? depth0.friendly_id : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"friendly_id","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-dollar\" /></svg><span class=\"label\">Sell</span>\n        </a>\n    </td>\n</tr>\n";
},"useData":true});
templates['financeWithdrawMethodRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "    &nbsp;&nbsp;&nbsp;<span class=\"dash-link\" data-navigate=\"finance/cryptoswapp\">What is it?</span>\n\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "instant";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.estimated_time || (depth0 != null ? depth0.estimated_time : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"estimated_time","hash":{},"data":data}) : helper)));
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <button class=\"btn btn-default small btn-manager\" button-action=\"selectMethod\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "\">select</button>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "minimum "
    + container.escapeExpression(((helper = (helper = helpers.min_amount || (depth0 != null ? depth0.min_amount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"min_amount","hash":{},"data":data}) : helper)))
    + " USD";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n   <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.name : depth0),"==","CryptoSwapp.com",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"smaller\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "&nbsp;&nbsp;&nbsp;<a href=\""
    + alias4(((helper = (helper = helpers.systemurl || (depth0 != null ? depth0.systemurl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"systemurl","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"><svg class=\"icon\"><use xlink:href=\"#icon-linkout\" /></svg></a></div>\n\n\n   </td>\n   <td>"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.estimated_time : depth0),"==","0",{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n       "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.estimated_time : depth0),"!=","0",{"name":"ifCond","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n   <td>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),">=",(depth0 != null ? depth0.min_amount : depth0),{"name":"ifCond","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "   "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),"<",(depth0 != null ? depth0.min_amount : depth0),{"name":"ifCond","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n   </td>\n</tr>\n";
},"useData":true});
templates['financeWithdrawPincodeDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">PIN confirmation</span>\n</div>\n<form class=\"form form-one-two\" form-action=\"confirmFinal\" id=\"confirmFinalForm\" form-block-processing=\"true\">\n    <div class=\"body\">\n        <div class=\"form-msg\">"
    + container.escapeExpression(((helper = (helper = helpers.confirmMessage || (depth0 != null ? depth0.confirmMessage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"confirmMessage","hash":{},"data":data}) : helper)))
    + "</div>\n        <div class=\"form-row\">\n            <label class=\"one\">Enter 4-digits pin code:</label>\n            <span class=\"two\">\n                <input type=\"text\" id=\"pincode\" class=\"inp-dft db w100p\" autocomplete=\"off\">\n                <span class=\"error-msg\"></span>\n            </span>\n        </div>\n    </div>\n    <div class=\"foot\">\n        <button class=\"btn btn-primary\" type=\"submit\">Confirm</button>\n        <button class=\"btn btn-side btn-cancel\">Cancel</button>\n    </div>\n</form>\n";
},"useData":true});
templates['financeWithdrawTermsDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Terms and conditions</span>\n</div>\n<div class=\"body\">\n    <div>Payments are non-refundable. If you send the money back to us, they will not appear in your KolotiBablo account. If you do that, your money will be lost. <br><b><span style=\"color:red\">REFUNDS DON'T WORK!</span></b></div>\n</div>\n<div class=\"foot\">\n    <button class=\"btn btn-primary btn-manager\" button-action=\"acceptWithdrawTerms\">Accept</button>\n    <button class=\"btn btn-primary btn-manager\" button-action=\"cancelDialog\">Deny</button>\n</div>\n";
},"useData":true});
templates['hpage_captchas_errors'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"errorschart\" style=\"width:100%; height: 150px; margin-top:20px; \"></div>\n\n<div id=\"errorsdesc\" class=\"infoblock\" style=\"width:800px; margin:20px auto; display: none\">\n    <div class=\"title\" style=\"color:#ffa3a3\">Your account has several errors on file!</div>\n    <div>Please type more carefully, otherwise your account will be automatically banned. </div>\n    <div>1. Your account might get banned immediately if our moderator finds a rude error among your answers.</div>\n    <div>2. Automated quality control gives every user different chances, depending on monthly typing volume.</div>\n    <div>Thus the best rule you can follow: be attentive, provide exact answers and you will never have any problems. (And we too with our clients).</div>\n</div>\n\n<div class=\"font20 error tac\" style=\"display:none; color: #760000\" id=\"nocontinue\">You cannot continue until you mark all errors as read</div>\n\n\n<table class=\"table w100p\" id=\"errorsTable\">\n    <thead>\n        <tr>\n            <th>captcha</th>\n            <th>your answer</th>\n            <th>error type</th>\n            <th></th>\n        </tr>\n    </thead>\n</table>";
},"useData":true});
templates['hpage_captchas_lazy'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"table-container section\">\n    <div class=\"tac font20\">Captchas skipped by you and guessed by others</div>\n    <div class=\"tac\" style=\"max-width: 800px; width: 80%; margin: 0 auto;\">You cannot enter captchas for serveral minutes. We don't like lazy people If you continue skipping captchas intentionally, we will stop sending you captchas.</div>\n    <div class=\"tac\" id=\"unlock_message\" style=\"max-width: 800px; width: 80%; margin: 0 auto; color: red\"></div>\n    <div id=\"capContainer\" class=\"tac padding20px\"></div>\n</div>\n";
},"useData":true});
templates['hpage_captchas_sleeping'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"tac padding40px\">\n\n    <div class=\"font20\">\n        Account switched to sleep mode\n    </div>\n    <div class=\"tac padding20px\">This means that we are not assigning any tasks to you.\n    You may try to awake your account, but if you do that too often, your account will be blocked for several hours.\n    </div>\n    <div class=\"tac padding40px\">\n        <button class=\"btn btn-primary btn-manager\" button-action=\"awake\">Awake account and continue working</button>\n    </div>\n</div>\n\n";
},"useData":true});
templates['hpage_captchas_toplist'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"hdg1 tac\">7 Days Top Workers</div>\n<div class=\"table-nav error tac\" id=\"notoplistError\" style=\"display:none\">You are not present in Top 5K List</div>\n<table class=\"table w100p\" id=\"toplistTable\">\n    <thead>\n        <tr>\n            <th width=\"10px\"></th>\n            <th width=\"33%\">position</th>\n            <th width=\"33%\">captchas</th>\n            <th width=\"33%\">money</th>\n            <th>Recaptchas/Images</th>\n        </tr>\n    </thead>\n</table>\n";
},"useData":true});
templates['hpage_earn'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<iframe src=\"\" id=\"v3check\" width=\"1\" height=\"1\" style=\"position: absolute; top: -1000px; left: -1000px;\"></iframe>\n\n<div class=\"work-wrap\">\n<div class=\"work-header\">\n    <div class=\"colw-name hidden-md\" id=\"jobNameLabel\"></div>\n    <div class=\"colw-pause state-play btn-manager\" button-action=\"interface.playOrPause\" id=\"playPauseButton\"><div class=\"pause\"></div><div class=\"play\"></div></div>\n    <div class=\"colw-rate\">\n        <div class=\"title\">Current Bid</div>\n        <div class=\"desc nowrap\" id=\"currentBidLabel\"></div>\n    </div>\n    <div class=\"colw-timer\">\n        <svg class=\"mobile-timer\" viewBox=\"0 0 24 24\">\n            <circle class=\"timer-bg\" cx=\"12\" cy=\"12\" r=\"12\"/>\n            <circle class=\"\" style=\"animation-duration: 3s\" cx=\"12\" cy=\"12\" r=\"6\" id=\"mobileTimer\"/>\n        </svg>\n        <div class=\"progressbar\"><div class=\"progress\" id=\"progessbar\" style=\"width:30%\"></div></div>\n    </div>\n    <div class=\"colw-settings btn-manager\" button-action=\"interface.toggleSettings\"><svg class=\"icon\"><use xlink:href=\"#icon-gear\" /></svg></div>\n    <div class=\"colw-close\" id=\"stopButton\"><a class=\"btn-manager\" button-action=\"interface.waitForPauseAndGo\" action-parameter=\"start\"><svg class=\"icon\"><use xlink:href=\"#icon-cross\" /></svg></a></div>\n</div>\n<div class=\"work-settings\">\n<div class=\"work-settings-common\">\n    <div class=\"opt\">\n        <div class=\"toggler\" callback-function=\"interface.toggler\" callback-parameter=\"allFooter\"></div>\n        <div class=\"label\">All Footer</div>\n    </div>\n    <div class=\"opt btn-manager\" button-action=\"interface.toggleSound\">\n        <div class=\"bell off\" id=\"soundBellLabel\"></div>\n        <div class=\"label\">Sound</div>\n    </div>\n    <div class=\"opt\">\n        <div class=\"label\">Theme</div>\n        <div class=\"theme-select\">\n            <div id=\"theme-white\" class=\"theme-white btn-manager\" button-action=\"interface.setTheme\" action-parameter=\"theme-white\"></div>\n            <div id=\"theme-gray\" class=\"theme-gray btn-manager\" button-action=\"interface.setTheme\" action-parameter=\"theme-gray\"></div>\n            <div id=\"theme-dark\" class=\"theme-dark btn-manager\" button-action=\"interface.setTheme\" action-parameter=\"theme-dark\"></div>\n        </div>\n    </div>\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"showAccBalance\">\n        <label for=\"showAccBalance\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"showAccBalance\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Account Balance</span>\n        </label>\n    </div>\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"showToplist\">\n        <label for=\"showToplist\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"showToplist\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Toplist</span>\n        </label>\n    </div>\n    <div class=\"opt opt-scale hidden-xs\">\n        <div class=\"label\" id=\"zoomLabel\">-</div>\n        <div class=\"btn-group\">\n            <div class=\"btn btn-manager\" button-action=\"interface.decreaseZoom\"><img src=\"/images/icon-zoom-out.png\"></div>\n            <div class=\"btn btn-manager\" button-action=\"interface.increaseZoom\"><img src=\"/images/icon-zoom-in.png\"></div>\n        </div>\n    </div>\n    <div class=\"work-settings-title\">Common Settings</div>\n</div>\n<div class=\"work-settings-captchas\">\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"imagePriority\">\n        <label for=\"imagePriority\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"imagePriority\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Priority</span>\n        </label>\n    </div>\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"showLoyality\">\n        <label for=\"showLoyality\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"showLoyality\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Loyality</span>\n        </label>\n    </div>\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"solvedCount\">\n        <label for=\"solvedCount\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"solvedCount\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Count</span>\n        </label>\n    </div>\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"showNextLevel\">\n        <label for=\"showNextLevel\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"showNextLevel\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Next Level</span>\n        </label>\n    </div>\n    <!--<div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"showAccuracy\">\n        <label for=\"showAccuracy\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"showAccuracy\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Accuracy</span>\n        </label>\n    </div>-->\n    <div class=\"work-settings-title\">Captchas</div>\n</div>\n\n<div class=\"work-settings-captchas\">\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"recaptchaPriority\">\n        <label for=\"recaptchaPriority\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"recaptchaPriority\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Priority</span>\n        </label>\n    </div>\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"v3score\">\n        <label for=\"v3score\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"v3score\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">v3 Score</span>\n        </label>\n    </div>\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"showRP\">\n        <label for=\"showRP\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"showRP\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Recaptcha Points</span>\n        </label>\n    </div>\n    <div style=\"padding-left:20px;\">\n        <div class=\"hint\">Open Recaptcha in:</div>\n        <button class=\"plugin-param-target btn btn-default btn-manager small\" button-action=\"workflow.setPluginOpenTarget\" action-parameter=\"tab\">new TAB</button>\n        <button class=\"plugin-param-target btn btn-default btn-manager small\" button-action=\"workflow.setPluginOpenTarget\" action-parameter=\"iframe\">same window</button>\n    </div>\n    <div style=\"padding-left:20px;\">\n        <div class=\"hint\">Cookies auto-cleaning:</div>\n        <div>\n            <button class=\"param-autoclean btn btn-default btn-manager small\" button-action=\"workflow.setAutocleanCookies\" action-parameter=\"true\">Enabled</button>\n            <button class=\"param-autoclean btn btn-default btn-manager small\" button-action=\"workflow.setAutocleanCookies\" action-parameter=\"false\">Disabled</button>\n        </div>\n    </div>\n    <div class=\"work-settings-title\">Recaptchas</div>\n</div>\n\n\n<div class=\"work-settings-captchas\">\n\n    <div class=\"opt\">\n        <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"0\">0 %</button>&nbsp;\n        <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"10\">10 %</button>&nbsp;\n        <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"20\">20 %</button>&nbsp;\n        <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"30\">30 %</button>&nbsp;\n        <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"40\">40 %</button>&nbsp;\n        <button class=\"discount-setter btn btn-default btn-manager small\" button-action=\"workflow.setDiscount\" action-parameter=\"50\">50 %</button>&nbsp;\n    </div>\n    <div class=\"opt smaller\">\n        - Affects task price but gives more tasks per minute\n    </div>\n    <div class=\"work-settings-title\">Discount</div>\n</div>\n<!--\n<div class=\"work-settings-factory\">\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"showFactoryCount\">\n        <label for=\"showFactoryCount\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"showFactoryCount\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Active Factories Count</span>\n        </label>\n    </div>\n    <div class=\"check-wrap opt\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"showFactoryTaskAndEarnings\">\n        <label for=\"showFactoryTaskAndEarnings\" class=\"checkbox btn-manager\" button-action=\"interface.checkboxToggler\" action-parameter=\"showFactoryTaskAndEarnings\">\n            <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n            <span class=\"label-text\">Tasks & Earnings 24</span>\n        </label>\n    </div>\n    <div class=\"work-settings-title\">Factories</div>\n</div>-->\n</div>\n\n\n<div class=\"user-msg\" id=\"alertMessageLabel\"></div>\n<div class=\"user-warning-msg\" id=\"notificationMessageLabel\"></div>\n<div class=\"work-area-wrap\">\n    <div class=\"step-loading\" id=\"taskLoader\">\n            <div class=\"title\" id=\"taskLoaderTitleLabel\"></div>\n            <svg class=\"loader\"><use xlink:href=\"#loader\" /></svg>\n            <div class=\"desc\" id=\"taskLoaderSubtitleLabel\"></div>\n            <div id=\"waitingTaskButtonsArea\" class=\"margintop30px\"></div>\n        </div>\n\n    <div class=\"steps-sidebar\" id=\"stepsSidebar\" style=\"display: none\">\n            <div class=\"head\">\n                <svg class=\"icon\" id=\"clientSideIcon\"><use xlink:href=\"#icon-client\"/></svg>\n                <svg class=\"icon\" id=\"employeeSideIcon\"><use xlink:href=\"#icon-worker\"/></svg>\n            </div>\n            <div class=\"steps-wrap\">\n                <div class=\"steps\" id=\"stepsContainer\"></div>\n            </div>\n        </div>\n\n\n    <div class=\"work-area\" id=\"workArea\">\n    </div>\n</div>\n\n\n<div class=\"work-footer\">\n    <!--<div class=\"item\" id=\"factoriesCountInfo\">\n        <div class=\"title\">Factories:</div>\n        <div class=\"value\" id=\"factoriesCountLabel\">-</div>\n    </div>\n    <div class=\"item\" id=\"factoriesStatsInfo\">\n        <div class=\"title\">Tasks & $$:</div>\n        <div class=\"value\" id=\"factoriesStatsLabel\">-/-</div>\n    </div>-->\n    <div class=\"item\" id=\"solvedCountInfo\">\n        <div class=\"title\">Captchas:</div>\n        <div class=\"value\" id=\"solvedCountLabel\">0</div>\n    </div>\n    <div class=\"item imagecaptcha-gauge\" id=\"loyalityInfo\">\n        <div class=\"title\" onmousedown=\"Anti.earn.createDebugTask();\">Loyality:</div>\n        <div class=\"value\"><span id=\"ratingLevelLabel\"></span> <small>+<span id=\"ratingPercentLabel\"></span>%</small></div>\n    </div>\n    <div class=\"item imagecaptcha-gauge hidden-md\" id=\"nextLevelInfo\">\n        <div class=\"title\">Next.LVL&nbsp;(+<span id=\"nextLevelPercentLabel\"></span>%):</div>\n        <div class=\"progressbar\" id=\"nextLevelLeftCountLabel\" title=\"loading\">\n            <div class=\"progress\" id=\"nextLevelLeftCountProgress\" style=\"width:1%\"></div>\n        </div>\n    </div>\n    <div class=\"item imagecaptcha-gauge\" id=\"accBalanceInfo\">\n        <div class=\"disabled-text\" id=\"imageCaptchasDisabledLabel\" style=\"display: none\">Image captchas disabled</div>\n        <div class=\"title\" id=\"accumulatingTitleLabel\"></div>\n        <div class=\"progressbar\" id=\"accumulatingBalanceLabel\" title=\"loading\" style=\"width:115px;\">\n            <div class=\"progress\" id=\"accumulatingBalanceProgress\" style=\"width:1%\"></div>\n        </div>\n    </div>\n    <div class=\"item hidden-md\" id=\"imagePriorityInfo\">\n        <div class=\"title\">Img.Priority:</div>\n        <div class=\"progressbar\" id=\"imagePriorityLabel\" title=\"calculating..\" style=\"width:90px;\">\n            <div class=\"progress\" id=\"imagePriorityProgress\" style=\"width:1%\"></div>\n        </div>\n    </div>\n    <div class=\"item hidden-md\" id=\"recaptchaPriorityInfo\">\n        <div class=\"title\">RC.Priority:</div>\n        <div class=\"progressbar\" id=\"recaptchaPriorityLabel\" title=\"calculating..\" style=\"width:90px;\">\n            <div class=\"progress\" id=\"recaptchaPriorityProgress\" style=\"width:1%\"></div>\n        </div>\n    </div>\n    <div class=\"item broulette-widget\" id=\"v3scoreInfo\">\n        <div class=\"tooltip\" style=\"display: none\" id=\"v3ToolTip\">\n            ﻿<div class=\"close btn-manager\" button-action=\"v3.hideTooltip\">\n                <img src=\"/images/tooltip-close.png\">\n            </div>\n            <div class=\"title\" id=\"v3TooltipTitle\"></div>\n\n            <div class=\"padding20px\">\n                <div class=\"check-wrap btn-manager\" button-action=\"v3.enableV3Only\">\n                    <input type=\"radio\" name=\"radio-v3-mode\" id=\"solveV3Only\">\n                    <label for=\"solveV3Only\" class=\"radio\">\n                        <span class=\"faked-control\"><span class=\"cir\"></span></span>\n                        <span class=\"label-text\">Solve v3 only</span>\n                    </label>\n                </div>\n\n                <div class=\"check-wrap btn-manager\" button-action=\"v3.enableV3AndV2\">\n                    <input type=\"radio\" name=\"radio-v3-mode\" id=\"solveV3AndV2\">\n                    <label for=\"solveV3AndV2\" class=\"radio\">\n                        <span class=\"faked-control\"><span class=\"cir\"></span></span>\n                        <span class=\"label-text\">Solve v3 and v2</span>\n                    </label>\n                </div>\n            </div>\n        </div>\n        <div class=\"title btn-manager\" button-action=\"v3.showTooltip\">V3 Score:</div>\n        <div class=\"value btn-manager\" button-action=\"v3.showTooltip\" id=\"v3scoreLabel\">-.-</div>\n    </div>\n    <div class=\"item\">\n        <div class=\"title\">Balance:</div>\n        <div class=\"value\" id=\"protectedBalanceLabel\">0</div>\n    </div>\n    <div class=\"item\" id=\"recaptchaPointsItem\">\n        <div class=\"title\" onmousedown=\"Anti.start.toggleDebug();\">RP:</div>\n        <div class=\"value\" id=\"recaptchaPointsLabel\">0</div>\n    </div>\n    <div class=\"item\" id=\"toplistInfo\">\n        <div class=\"title\">TOP Position:</div>\n        <div class=\"value\"><span id=\"topPositionLabel\"></span>/5000</div>\n    </div>\n</div>\n</div>";
},"useData":true});
templates['hpage_entrance'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"auth-form\">\n\n    <input type=\"hidden\" id=\"redirectAfterLogin\">\n\n    <div class=\"btn-group full-width\">\n        <button class=\"btn active\" tab-switch=\"tab-login\" id=\"tab_auth_login\" callback-function=\"tabActivatedEvent\" callback-parameter=\"login\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-login\" /></svg>\n            <span class=\"label hidden-xs\">Login</span>\n        </button>\n        <button class=\"btn\" tab-switch=\"tab-reg\" id=\"tab_auth_register\" callback-function=\"tabActivatedEvent\" callback-parameter=\"register\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-add-user\" /></svg>\n            <span class=\"label hidden-xs\">Register</span>\n        </button>\n        <button class=\"btn\" tab-switch=\"tab-passreset\" id=\"tab_auth_recover\" callback-function=\"tabActivatedEvent\" callback-parameter=\"recover\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-key\" /></svg>\n            <span class=\"label hidden-xs\">Recover</span>\n        </button>\n        \n        <button class=\"btn hidden\" tab-switch=\"tab-captcha\" id=\"tab_captcha\"></button>\n        <button class=\"btn hidden\" tab-switch=\"tab-password-reset\" id=\"tab_password_reset\"></button>\n        <button class=\"btn hidden\" tab-switch=\"tab-troubles\" id=\"tab_troubles\"></button>\n    </div>\n    \n    <div class=\"tabstack\">\n        <div class=\"tab-pane tab-login\">\n            <form action=\"\" class=\"form form-one-two test-hide\" id=\"loginForm\" form-action=\"loginAttempt\" form-block-processing=\"true\">\n                <div class=\"form-msg\"></div>\n                <div class=\"form-row\">\n                    <span class=\"two\">\n                          <span class=\"inp-icon-wrap\">\n                              <svg class=\"icon inp-icon\"><use xlink:href=\"#icon-user-cir\" /></svg>\n                              <input type=\"text\" class=\"inp-dft db w100p\" placeholder=\"Login\" id=\"enterlogin\">\n                          </span>\n                    </span>\n                </div>\n                <div class=\"form-row\">\n                    <span class=\"two\">\n                      <span class=\"inp-icon-wrap\">\n                          <svg class=\"icon inp-icon\"><use xlink:href=\"#icon-lock\" /></svg>\n                          <input type=\"password\" class=\"inp-dft db w100p\" placeholder=\"Password\" id=\"password\">\n                      </span>\n                    </span>\n                </div>\n                <div class=\"form-row\">\n                    <span class=\"two\">\n                        <label for=\"stayLogged\"><input type=\"checkbox\" name=\"\" id=\"stayLogged\" checked=\"checked\"> Stay logged in</label>\n                    </span>\n                </div>\n                <div class=\"form-row\">\n                    <span class=\"one empty\">&nbsp;</span>\n                    <span class=\"two\">\n                        <button class=\"btn btn-primary\" type=\"submit\">Sign In</button>\n                    </span>\n                </div>\n            </form>\n        </div>\n\n        <div class=\"tab-pane tab-captcha\" style=\"display:none\">\n            <form action=\"\" class=\"form form-one-two\" form-action=\"autoCheckCaptcha\" id=\"captchaForm\" form-block-processing=\"true\">\n                <div class=\"tac form-msg\">Captcha answer is incorrect</div>\n                <div class=\"form-row\">\n                    <span class=\"one tac\" id=\"recaptchaForm\"></span>\n                </div>\n                <div class=\"form-row\">\n                    <span class=\"one\">&nbsp;</span>\n                    <span class=\"two\">\n                        <button class=\"btn btn-primary\" type=\"submit\">Validate</button>\n                    </span>\n                </div>\n            </form>\n        </div>\n\n        <div class=\"tab-pane tab-reg\" style=\"display:none\">\n            <div class=\"result-msg\" style=\"display:none\" id=\"registerSuccess\">\n                <i class=\"success\"></i>\n                <div class=\"title\">Registration complete</div>\n                <div class=\"desc\">Please check your email for your new account password</div>\n                <div class=\"action\"><button class=\"btn btn-primary btn-manager\" button-action=\"showLoginTab\">Sign In</button></div>\n            </div>\n            <form action=\"\" class=\"form form-one-two\" id=\"registerForm\" form-action=\"registerAttempt\" form-block-processing=\"true\">\n                <div class=\"form-row\">\n                    <span class=\"one\"><label for=\"\">Login:</label></span>\n                    <span class=\"two\">\n                        <input type=\"text\" id=\"reglogin\" class=\"inp-dft db w100p\">\n                        <span class=\"error-msg\"></span>\n                    </span>\n                </div>\n                <div class=\"form-row\">\n                    <span class=\"one\"><label for=\"\">Email:</label></span>\n                    <span class=\"two\">\n                        <input type=\"email\" id=\"regemail\" class=\"inp-dft db w100p\" placeholder=\"@gmail.com / @yahoo.com\">\n                        <span class=\"error-msg\"></span>\n                    </span>\n                </div>\n                <div class=\"form-row\">\n                    <span class=\"one\">&nbsp;</span>\n                    <span class=\"two\">\n                        <button class=\"btn btn-primary\" type=\"submit\">Register</button>\n                    </span>\n                </div>\n                <div class=\"hint tac\" id=\"refcode\" style=\"display: none\"></div>\n            </form>\n        </div>\n        <div class=\"tab-pane tab-passreset\" style=\"display:none\">\n            <form action=\"\" class=\"form form-one-two\" id=\"recoverForm\" form-action=\"recoverAttempt\" form-block-processing=\"true\">\n                <div class=\"form-row\">\n                    <span class=\"one\"><label for=\"\">Email:</label></span>\n                    <span class=\"two\">\n                        <input type=\"email\" id=\"recoveremail\" class=\"inp-dft db w100p\">\n                        <span class=\"error-msg\"></span>\n                    </span>\n                </div>\n                <div class=\"form-row\">\n                    <span class=\"one\">&nbsp;</span>\n                    <span class=\"two\">\n                        <button class=\"btn btn-primary\" type=\"submit\">Recover access</button>\n                    </span>\n                </div>\n            </form>\n        </div>\n        <div class=\"tab-pane tab-captcha\" style=\"display:none\">\n            <form action=\"\" class=\"form form-one-two\" form-action=\"checkCaptcha\" id=\"captchaForm\" form-block-processing=\"true\">\n                <div class=\"form-msg\">Solve Recaptcha please =)</div>\n                <div class=\"form-row\">\n                    <span class=\"one\" id=\"recaptchaForm\"></span>\n                </div>\n            </form>\n        </div>\n        \n        <div class=\"tab-pane tab-password-reset\" style=\"display:none\">\n            <div class=\"result-msg\">\n                <i class=\"success\"></i>\n                <div class=\"title\">Code sent</div>\n                <div class=\"desc\" id=\"codeSentMessage\"></div>\n            </div>\n            <form action=\"\" class=\"form form-one-two form-newpass\" form-action=\"passwordResetAttempt\" id=\"passwordResetForm\" form-block-processing=\"true\">\n                <div class=\"form-msg\" id=\"recoverMessage\"></div>\n                <div class=\"form-row\">\n                    <span class=\"one\"><label for=\"\">Code:</label></span>\n                    <span class=\"two\">\n                        <input type=\"text\" id=\"confirmcode\" class=\"inp-dft db w100p\">\n                        <span class=\"error-msg\"></span>\n                    </span>\n                </div>\n                <div class=\"form-row\">\n                    <span class=\"one\"><label for=\"\">New password:</label></span>\n                    <span class=\"two\">\n                        <input type=\"password\" id=\"password_reset\" class=\"inp-dft db w100p active-input\" input-action=\"scorePassword\">\n                        <span class=\"error-msg\"></span>\n                        <div class=\"inpdesc\" id=\"pass-strength\">&nbsp;&nbsp;</div>\n                        <div class=\"pass-thumb bad\"><svg class=\"icon\"><use xlink:href=\"#icon-thumb\" /></svg></div>\n                    </span>\n                </div>\n                <div class=\"form-row\">\n                    <span class=\"one\">&nbsp;</span>\n                    <span class=\"two\">\n                        <button class=\"btn btn-primary\" type=\"submit\" id=\"setPasswordButton\">Set Password</button>\n                    </span>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['hpage_factory_directory'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"section\" id=\"categoriesSection\" style=\"display: none\">\n\n    <div class=\"terms collapsed btn-manager\" button-action=\"dialog.showTerms\">\n        <ul id=\"terms\" class=\"contents list\">\n            What is factories?<br><br>\n\n            Factories is a pilot feature, which was made to launch valuable amount of new job types for kolotibablo employees.\n            It is currently under heavy development and new things will appear almost every day.<br>\n            Each job type is now called \"Factory\".\n            Factories are made by 3rd-party developers and task managing is handled by their servers.\n            Anti-Captcha clients order tasks at Factories and Kolotibablo transmits tasks to Factory employees.\n            You can join any factory in the list and receive tasks from it when they are available.\n            <br><br>\n            Stay tuned, we will improve this description over time too.\n\n\n        </ul>\n        <div class=\"title grid-center-middle-noGutter\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-info\" /></svg>\n            <svg class=\"icon arrow-top\"><use xlink:href=\"#icon-arrow\" /></svg>\n            <div class=\"label\">What is this?</div>\n        </div>\n    </div>\n\n    <div class=\"grid-3\" id=\"categoriesList\"></div>\n\n</div>\n\n<div class=\"section\" id=\"factoriesSection\" style=\"display: none\">\n\n    <div class=\"paddingtop20px grid\">\n        <div class=\"col tal\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"load.categoriesList\">\n                <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-arrow\" /></svg>\n                <span class=\"label\">Back to Categories</span>\n            </button>\n        </div>\n    </div>\n\n\n    <table id=\"factoriesTable\" class=\"w100p table margintop20\">\n        <thead>\n            <td style=\"width: 50%\">Name and description</td>\n            <td>Info</td>\n            <td>Status</td>\n        </thead>\n    </table>\n\n\n</div>\n\n<div class=\"section\" id=\"remoteDataSection\" style=\"display: none\">\n    <div class=\"paddingtop20px grid\">\n        <div class=\"col tal\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"load.sameFactories\">\n                <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-arrow\" /></svg>\n                <span class=\"label\">Back to Factories</span>\n            </button>\n        </div>\n        <div class=\"col tar\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"dialog.editEmployeeRecord\" action-parameter=\"0\">\n                <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-plus\" /></svg>\n                <span class=\"label\" id=\"addRecordButtonText\">Add Record</span>\n            </button>\n        </div>\n    </div>\n\n    <div id=\"remoteDataContainer\"></div>\n\n</div>\n\n\n<div class=\"section\" id=\"remoteDataEditSection\" style=\"display: none\">\n    <div class=\"paddingtop20px grid\">\n        <div class=\"col tal\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"load.sameFactorySettings\">\n                <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-arrow\" /></svg>\n                <span class=\"label\">Back to List</span>\n            </button>\n        </div>\n    </div>\n\n    <form id=\"remoteDataEditContainer\" class=\"card-white form form-one-two zebra\" form-block-processing=\"true\" form-action=\"dialog.saveDataRecord\"></form>\n\n</div>";
},"useData":true});
templates['hpage_finance_applyexchanger'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"section\" id=\"formSection\" style=\"display: none\">\n\n    <form class=\"form form-one-two\" form-action=\"sendForm\" id=\"confirmFinalForm\" form-block-processing=\"true\">\n        <div class=\"body\">\n            <div class=\"form-row\">\n                <div class=\"one\">Account nickname in cryptoswapp.com :\n                    <div class=\"smaller\">Must already have some active buying offers</div>\n                </div>\n                <span class=\"two\">\n                    <input type=\"text\" id=\"nickname\" class=\"inp-dft db w100p\" autocomplete=\"off\">\n                    <span class=\"error-msg\"></span>\n                </span>\n            </div>\n            <div class=\"form-row\">\n                <div class=\"one\">Accounts in other P2P exchanges :\n                    <div class=\"smaller\">Increases your chances for approval</div>\n                </div>\n                <span class=\"two\">\n                    <input type=\"text\" id=\"otherp2p\" class=\"inp-dft db w100p\" autocomplete=\"off\">\n                    <span class=\"error-msg\"></span>\n                </span>\n            </div>\n            <div class=\"form-row\">\n                <label class=\"one\">Anything to comment?</label>\n                <span class=\"two\">\n                    <textarea id=\"comment\" class=\"inp-dft db w100p\" cols=\"30\" rows=\"10\"></textarea>\n                    <span class=\"error-msg\"></span>\n                </span>\n            </div>\n        </div>\n        <div class=\"foot tac padding20px\">\n            <button class=\"btn btn-primary\" type=\"submit\">Send application</button>\n            <button class=\"btn btn-side btn-cancel\">Cancel</button>\n        </div>\n    </form>\n\n</div>\n\n<div class=\"section\" id=\"sentSection\" style=\"display: none\">\n    <div class=\"card-white padding40px tac\">Application is sent</div>\n</div>";
},"useData":true});
templates['hpage_finance_cryptoswapp'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<div class=\"csw-presentation\">\n  <div class=\"tac mt1\"><img src=\"/images/csw-logo.svg\" alt=\"\"></div>\n  <div class=\"hdg2 tac mt1\">A peer-to-peer cryptocurrency exchange platform.</div>\n  <div class=\"mt1 csw-desc\">\n    <a href=\"https://cryptoswapp.com\" target=\"_blank\">CryptoSwapp</a> connects people who want to buy or sell cryptocurrency using a chat and secured by Escrow workflow.\n  </div>\n  <div class=\"tac\" style=\"margin-top:2rem\">\n    <img class=\"csw-presents\" src=\"/images/csw-presents.png\" width=\"611\" alt=\"\">\n  </div>\n\n  <div class=\"csw-scheme\" style=\"margin-top:4rem\">\n    <div class=\"csw-scheme-desc-item\">\n      Now you can withdraw funds directly from Kolotibablo to your CryptoSwapp wallets.\n    </div>\n    <div class=\"csw-scheme-desc-item hidden-xs\">\n      From there you have plenty of options to choose from.\n    </div>\n    <div class=\"csw-scheme-desc-item\">\n      CryptoSwapp supports more than 30 payment methods.\n      <div style=\"font-size: 20px; line-height: 32px; margin-top:1rem\">\n        To name a few:<br>\n        <strong>PayPal, Payoneer, Banesco bank transfer, UPI, State Bank of Vietnam</strong>\n      </div>\n    </div>\n    <div class=\"csw-scheme-img\">\n      <img src=\"/images/csw-scheme.png\" width=\"417\" alt=\"\">\n    </div>\n  </div>\n\n  <div class=\"hdg2 tac\" style=\"margin-top:4rem\">Don’t wait and try it now!</div>\n  <div class=\"tac mt1\">\n    <button class=\"btn btn-primary btn-manager\" button-action=\"withdraw\">Withdraw funds to CryptoSwapp</button>\n      &nbsp;&nbsp;\n    <button class=\"btn btn-default anti-navigate\" data-navigate=\"finance/applyexchanger\">Become an approved exchanger</button>\n  </div>\n\n  <div class=\"tac smaller wlimit-faq padding20px\">Ask your P2P trade partners to join Cryptoswapp.com. It is better and cheaper version of Localbitcoins and other P2P platforms.</div>\n</div>";
},"useData":true});
templates['hpage_finance_history'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"terms collapsed btn-manager\" button-action=\"toggleHelp\">\n    <ul class=\"contents list\">\n        <li class=\"hdg1\">What is it?</li>\n        <li>In this section you may find the history of all your protected money transactions.</li>\n        <li>\n            A transaction may be in one of the following states:<br>\n            <b>Queued.</b> The payment is in transaction queue and will be executed when there will be no other transactions ahead and we will have enough funds to run it. You may cancel transaction at this state (read below how).<br>\n            <b>Processing.</b> Your payment is being processed at the moment.<br>\n            <b>Complete.</b> Money have reached its destination. With Bitcoins it may take up to 1 hour.<br>\n            <b>Error.</b> System encountered an error while performing the transaction. Error reason is printed along with the state. You may also cancel transaction at this state.<br>\n            <b>Canceled.</b> Your payment was canceled by you, our system or administrator. Sometimes transactions that had errors are canceled automatically. In this case you might see cancelation reason along with transaction state. Administrator may cancel your transaction if it was in \"error\" state for too long time.<br>\n        </li>\n        <li class=\"hdg1\">Canceling transactions</li>\n        <li>\n            It is absolutely safe for you money to cancel a transaction in states \"queued\" or \"error\". Your transaction state will change to \"canceled\" and transaction amount will return to your protected balance.\n            Please use this option when you have problems with sending payments, especially with Webmoney as many of you point to blocked IDs, incorrect purses, etc.\n            <br>\n            To cancel a transaction just press a link near its state. That's it. Money will return immediately.\n        </li>\n    </ul>\n    <div class=\"title grid-center-middle-noGutter\">\n        <svg class=\"icon\"><use xlink:href=\"#icon-info\" /></svg>\n        <svg class=\"icon arrow-top\"><use xlink:href=\"#icon-arrow\" /></svg>\n        <div class=\"label\">Help</div>\n    </div>\n</div>\n\n<table class=\"table w100p\" id=\"historyTable\">\n    <thead>\n        <tr>\n            <th>date</th>\n            <th>amount</th>\n            <th>status</th>\n            <th>info</th>\n        </tr>\n    </thead>\n</table>\n";
},"useData":true});
templates['hpage_finance_mycards'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"section\" id=\"listSection\" style=\"display: none\">\n    <div class=\"paddingtop20px grid\">\n        <div class=\"col tal\">\n            <button class=\"btn btn-primary anti-navigate\" data-navigate=\"finance/withdraw\">\n                <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-arrow\" /></svg>\n                <span class=\"label\">Back to Withdrawals</span>\n            </button>\n        </div>\n        <div class=\"col tar\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"addCard\">\n                <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-plus\" /></svg>\n                <span class=\"label\">Add Card</span>\n            </button>\n        </div>\n    </div>\n\n    <table class=\"w100p table\" id=\"cardsList\">\n        <thead>\n            <td>Card</td>\n            <td>Name</td>\n        </thead>\n    </table>\n\n</div>\n\n\n<div class=\"section\" id=\"addCardSection\" style=\"display: none\">\n    <div class=\"paddingtop20px grid\">\n        <div class=\"col tal\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"backtoList\">\n                <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-arrow\" /></svg>\n                <span class=\"label\">Back to list</span>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"card-blue grid-middle\">\n        <div class=\"col-12\">\n            <h3>What will happen next</h3>\n            1. You are going to pay 1 USD at our website anti-captcha.com.<br>\n            2. Right after payment completion we will cancel transaction and send 1 USD back. <br>\n            3. After this you will be able to withdraw funds to your card. It will appear at withdrawal page.\n        </div>\n    </div>\n    <div class=\"padding20px tac\">\n        <button class=\"btn btn-primary btn-manager\" button-action=\"addCardConfirm\">\n            <span class=\"label\">Proceed</span>\n        </button>\n    </div>\n\n</div>\n\n<div class=\"section\" id=\"successSection\" style=\"display: none\">\n    <div class=\"paddingtop20px grid\">\n        <div class=\"col tal\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"backtoList\">\n                <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-arrow\" /></svg>\n                <span class=\"label\">Go to cards list</span>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"card-blue grid-middle\">\n        <div class=\"col-12\">\n            <h3>Card successfully added</h3>\n        </div>\n    </div>\n\n</div>\n\n\n<div class=\"section\" id=\"failedSection\" style=\"display: none\">\n    <div class=\"paddingtop20px grid\">\n        <div class=\"col tal\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"backtoList\">\n                <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-arrow\" /></svg>\n                <span class=\"label\">Go to cards list</span>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"card-blue grid-middle\">\n        <div class=\"col-12\">\n            <h3 class=\"error\">Could not add card due to transaction failure</h3>\n        </div>\n    </div>\n\n</div>";
},"useData":true});
templates['hpage_finance_withdraw'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"terms collapsed btn-manager\" button-action=\"toggleHelp\">\n    <ul class=\"contents list\">\n        <li class=\"hdg1\">How it works.</li>\n        <li>In Kolotibablo your earnings pass through 3 stages before you are able to withdraw them.</li>\n        <li>\n            <b>Stage 1. Accumulating</b>. You enter about 500 captchas during this stage, your entries are monitored by our robots and moderators. You have to type this amount before your money transfer to stage 2.<br>Please note that you have to enter at least 500 captchas in 48 hours to get your captchas into moderation stage.<br>\n            <b>Stage 2. Moderation</b>. Your account is added to moderation queue along with your captchas entries selected randomly. Moderation may take <b>up to 48 hours</b>, but usually every active account passes moderation several times per day. After your account is checked your money are transferred to stage 3.<br>\n            <b>Stage 3. Protected</b>. This is where you can withdraw your funds or send it to another account. In this stage your funds are untouchable. Even if your accounts get suspended for incorrect captcha entries (at stage 1 or 2) you will still have access to them. We decided to gurarantee this to stimulate teams using collective withdrawals as well as exchange services (i.e Kolotibablo &lt;-&gt; Local Banks).\n        </li>\n        <li class=\"hdg1\">Withdraw process.</li>\n        <li>\n            1. Select one of the payment system.<br>\n            2. Enter amount you want to withdraw.<br>\n            3. Enter correct requisites (purse, email, etc). If you enter them incorrectly, your withdraw request will not be accepted.<br>\n            4. Confirm your withdraw by entering your account pin code. If you haven't setup your pin code yet, do it on the settings page <span class=\"dash-link\" data-navigate=\"settings/account\">here</span>.<br>\n            5. Your withdraw request will be sent to payment gateway queue. If something goes wrong with your transaction (i.e. wrong requisites) you will be able to cancel it at any time and your money will return to your account.<br>\n\n        </li>\n    </ul>\n    <div class=\"title grid-center-middle-noGutter\">\n        <svg class=\"icon\"><use xlink:href=\"#icon-info\" /></svg>\n        <svg class=\"icon arrow-top\"><use xlink:href=\"#icon-arrow\" /></svg>\n        <div class=\"label\">Help</div>\n    </div>\n</div>\n\n<div class=\"section\" id=\"exchangeSection\" style=\"display: none\">\n    <div class=\"tac padding40px card-white wlimit-faq\">\n        <div class=\"tal\">\n        Hello,<br>\n        We've found that your account actively uses internal transfers.\n        We'd like to setup direct contact with exchangers in order to understand them better and suggest better environment for their trades.\n        Please fill <a href=\"https://forms.gle/HvKMNj598otHzaKj6\" target=\"_blank\">this form</a> to request priority support service.<br>\n        Please don't share this link with anyone else. Thank you.\n        </div>\n        <br><br><br>\n        <button class=\"btn btn-default btn-manager\" id=\"gotoTable\" button-action=\"viewTable\" action-parameter=\"\">\n            Go to payouts\n        </button>\n        <div id=\"formrequired\" class=\"tal error\" style=\"display: none\">We waited for a week for you to fill the form and you didn't do it.<br>\n            You must now fill the form first before you can withdraw your funds.\n            Make sure you specify your login correctly so we could enable your account.</div>\n    </div>\n</div>\n\n<div class=\"section\" id=\"listSection\" style=\"display: none\">\n    <div class=\"grid-center tac pay-steps withdraw\">\n        <div class=\"col banelement\">\n            <div class=\"step\">\n                <div class=\"step-cir\">\n                    <svg class=\"icon\"><use xlink:href=\"#icon-keyboard\"></use></svg>\n                    <div class=\"summ\" id=\"earning_money\">-</div>\n                    <div class=\"bonus-summ\" id=\"earning_money_bonus\"></div>\n                </div>\n                <div class=\"label\">accumulating balance</div>\n                <div class=\"hint\" id=\"accumulating_hint\"></div>\n            </div>\n        </div>\n        <div class=\"col-arrow banelement\"></div>\n        <div class=\"col banelement\">\n            <div class=\"step\">\n                <div class=\"step-cir\" id=\"onModerationState\">\n                    <svg class=\"icon\"><use xlink:href=\"#icon-hourglass\"></use></svg>\n                    <div class=\"summ\" id=\"pending_money\">0</div>\n                    <div class=\"bonus-summ\" id=\"pending_money_bonus\"></div>\n                </div>\n                <div class=\"label\">on moderation</div>\n            </div>\n        </div>\n        <div class=\"col-arrow banelement\"></div>\n        <div class=\"col\">\n            <div class=\"step\">\n                <div class=\"step-cir\">\n                    <svg class=\"icon\"><use xlink:href=\"#icon-shield\"></use></svg>\n                    <div class=\"summ\" id=\"protected_money\">-</div>\n                </div>\n                <div class=\"label\">protected balance</div>\n                <!--<button class=\"btn btn-primary btn-manager\" button-action=\"viewTable\" id=\"getMoneyButton\">get money</button>-->\n            </div>\n        </div>\n    </div>\n\n    <div id=\"table_section\" style=\"display: none\">\n        <div class=\"hdg1 tac\">Select Payment Method:</div>\n        <table class=\"table w100p\" id=\"systemsTable\">\n            <thead>\n                <th>System</th>\n                <th>Estimated Queue Time</th>\n                <th></th>\n            </thead>\n        </table>\n\n        <div class=\"smaller tac padding10px w75p mauto0\">\"Instant\" queue time means that your payment will be sent within 1 minute. In other cases you see the time which first payment in the queue is waiting for its turn.\n        When your payment is waiting in the queue, you may cancel it without commission and request your funds to any other payment system.</div>\n    </div>\n\n    <div class=\"hdg2 tac margintop40px\">List of verified Cryptoswapp.com traders</div>\n    <table class=\"w100p table\" id=\"csExchangersList\">\n        <thead>\n        <tr>\n            <td>Exchanger username</td>\n            <td>Payment system</td>\n            <td>Exchange deal</td>\n            <td style=\"min-width: 125px\"></td>\n        </tr>\n        </thead>\n        <tr>\n            <td colspan=\"4\" class=\"tac padding20px\">loading...</td>\n        </tr>\n    </table>\n    <div class=\"tac hint padding20px\">\n        Want to add yourself to the list? <span class=\"dash-link\" data-navigate=\"finance/applyexchanger\">click here</span>\n    </div>\n\n</div>\n\n<div class=\"section\" id=\"requisitesSection\" style=\"display: none\">\n\n    <div class=\"card-blue grid-middle\" id=\"cardPayoutNotification\" style=\"display: none\">\n        <div class=\"col-12\">\n            <h3>Important info about card payouts! Read it carefully!</h3>\n            1. Payouts lower than 20 USD have comission 3% + 1.7USD.<br>\n            1.1 <b>Payouts till 1 May are commission-free.</b><br>\n            2. For payouts 20 USD and above we pay the commission. <br>\n            3. At first, you have to bind your card to your account. Card binding is free. You pay us $1 and we send it back immediately.<br>\n            4. Once your card is bound, you can request payouts to it.\n               Payouts work via POS terminal transactions. We transfer them immediately and you can see them in your card statements.\n               However, transaction has to pass clearing by your bank which may take several days.\n               If your bank does not support such payments, we will catch your payment and add it back to your KB balance.\n            <div id=\"cardCalculations\" style=\"font-weight: bold\" class=\"padding5px\"></div>\n        </div>\n    </div>\n\n    <div class=\"card-blue grid-middle\" id=\"bitcoinNotification\" style=\"display: none\">\n        <div class=\"col-12\">\n            Please note that we are sending Bitcoins with low comission. This means that you will have to wait for your transaction when network \"mempool\" size is lower that 5 megabytes.\n            Check out \"mempool\" size statistics here: <a href=\"https://blockchain.info/ru/charts/mempool-size?timespan=30days\" target=\"_blank\">Mempool Size</a>.\n        </div>\n    </div>\n    <div class=\"form-row\" id=\"amountBlock\">\n        <div class=\"slider-wrap\">\n            <div style=\"position: absolute; margin-top: 9px; margin-left: -3px;\">$</div>\n            <input type=\"text\" name=\"\" id=\"amountInput\" slider-callback=\"#amountSlider\" value=\"0\" class=\"inp-dft\">\n                <div class=\"slider\">\n                     <div class=\"handle\" style=\"left: 50%\"\n                          id=\"amountSlider\"\n                          callback-input=\"#amountInput\"\n                          callback-function=\"setWithdrawAmount\"\n                          callback-parameter=\"amount\"\n                          default-value=\"1\" min-value=\"0.5\" max-value=\"500\" round-to=\"2\" allow-higher-value=\"false\"\n                     ></div>\n                </div>\n        </div>\n    </div>\n    <div id=\"requisitesBlock\">\n        <div class=\"form-row tac\"><svg class=\"icon arrow-bottom\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-arrow\"></use></svg></div>\n        <div class=\"form-row tac\">\n            <label class=\"db\">Requisites</label>\n            <input type=\"text\" name=\"\" id=\"recipient\" class=\"inp-dft\" placeholder=\"purse #\" callback-parameter=\"recipient\" callback-function=\"checkRecipient\" callback-speed=\"0\">\n            <span class=\"converted\" id=\"currency_ammount\"></span>\n        </div>\n    </div>\n    <!--<div id=\"pastaRequisites\" style=\"display: none\" class=\"tac padding30px\">\n        <div class=\"adropdown\" loader-function=\"getCardsList\" default-value=\"\" width=\"450px\" callback-parameter=\"pastaCard\" callback-function=\"setPastaCard\"></div>\n        <button class=\"btn btn-primary anti-navigate\" data-navigate=\"finance/mycards\">Manage cards</button>\n    </div>-->\n    <div id=\"cryptoswappBlock\" style=\"display: none\">\n        <div id=\"csloader\" class=\"tac smaller padding40px\" style=\"display: none\">loading your wallets...</div>\n        <div id=\"csemail\" class=\"card-white tac padding40px wlimit-faq\" style=\"display: none\">\n            <div class=\"smaller tac\">Enter email you used for registration at cryptoswapp.com</div>\n            <br>\n            <input type=\"text\" class=\"inp-dft\" id=\"csemailvalue\" placeholder=\"your@email.com\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"cs.addEmail\">Next</button>\n        </div>\n        <div id=\"csSelect\" class=\"card-white tac padding40px wlimit-faq\" style=\"display: none\">\n            <div class=\"tac\">Select your wallet at cryptoswapp.com</div>\n            <br>\n            <div class=\"adropdown\" id=\"cspurse\" default-value=\"\" width=\"500px\" callback-function=\"checkRecipient\" callback-parameter=\"cspurse\">\n            </div>\n            <div class=\"smaller tac margintop5px\" id=\"csestimation\"></div>\n        </div>\n    </div>\n    <div class=\"form-row tac\" id=\"paymentButton\"><button id=\"nextbutton\" style=\"opacity:0.1\" class=\"btn btn-primary btn-manager\" button-action=\"confirmAmount\">Next</button></div>\n</div>";
},"useData":true});
templates['hpage_info_app'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"section\" id=\"selectionSection\" style=\"display: none\">\n    <div class=\"hdg1 tac\">Select platform</div>\n    <div class=\"grid-2\" id=\"selection\">\n        <div class=\"col\">\n            <div class=\"card-white margin10px tac padding30px font20 btn-manager\" button-action=\"showAndroidApp\">\n                <div>Android App</div>\n                <img src=\"/images/pluginInstructions/android-card.png\" width=\"148\">\n                <div class=\"smaller\">Solve image captchas and Recaptcha on the go</div>\n            </div>\n        </div>\n        <div class=\"col\">\n            <div class=\"card-white margin10px tac padding30px font20 btn-manager\" button-action=\"showWindowsApp\">\n                <div>Windows Desktop</div>\n                <img src=\"/images/pluginInstructions/microsoft_logo.png\" width=\"200\">\n                <div class=\"smaller\">Solve image captchas and Recaptcha from Windows PC</div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"section\" id=\"androidSection\" style=\"display: none\">\n    <div class=\"download-app-row\">\n        <div class=\"df jcc alic\">\n            <a href=\"https://play.google.com/store/apps/details?id=com.kolotibablo&hl=en\" class=\"btn btn-primary nowrap\" style=\"width:300px;\">\n                <svg class=\"icon\"><use xlink:href=\"#icon-download\" /></svg>\n                <label>Download</label>\n            </a>\n            <div class=\"desc\">\n                Solve both image captchas and Recaptchas.<br>\n                No additional software required, just log in and work.\n            </div>\n        </div>\n    </div>\n    <div class=\"grid margintop40px\">\n        <div class=\"col-4\"><div class=\"mauto0 tac\"><img src=\"/images/android/1.png\" style=\"max-width: 80%\"></div></div>\n        <div class=\"col-4\"><div class=\"mauto0 tac\"><img src=\"/images/android/2.png\" style=\"max-width: 80%\"></div></div>\n        <div class=\"col-4\"><div class=\"mauto0 tac\"><img src=\"/images/android/3.png\" style=\"max-width: 80%\"></div></div>\n    </div>\n</div>\n\n<div class=\"section\" id=\"windowsSection\" style=\"display: none\">\n    <link rel=\"stylesheet\" href=\"/files/lightbox.min.css\">\n    <div class=\"wlimit-faq\">\n        <b class=\"fs18\">\n            We've launched new application for Windows which will\n            help you to work faster and earn more money!\n        </b>\n        <div class=\"mt1\">\n            App users have higher priority in captcha taking and\n            +20% higher bid, but for this opportunity you have to\n            solve Google No-Captcha \"I'm not a robot\" puzzles.\n        </div>\n    </div>\n    <div class=\"download-app-row\">\n        <div class=\"wlimit-faq df jcc alic\">\n            <a href=\"http://koloteam.com/kbsetup.exe\" class=\"btn btn-primary nowrap\" style=\"width:300px;\">\n                <svg class=\"icon\"><use xlink:href=\"#icon-download\" /></svg>\n                <label>Download</label>\n            </a>\n            <div class=\"desc\">\n                Please note. Chrome users may see a warning leading\n                to <a href=\"https://support.google.com/chrome/answer/6261569?p=ib_download_blocked&hl=en&rd=1\">this page.</a> Simply ignore it, and click \"save\" after\n                download. <span class=\"nowrap\">Or download <a href=\"https://yadi.sk/d/WGmf627-wisos\">from here.</a></span>\n            </div>\n        </div>\n    </div>\n    <div class=\"wlimit-faq\">\n        <div class=\"df jcc wgap app-screens\">\n            <div class=\"tac\">\n                <div class=\"title\">Standart mode:</div>\n                <img src=\"/images/desktop-app-screen-wmoney.png\" alt=\"\">\n            </div>\n            <div class=\"tac\">\n                <div class=\"title\">Mode without financial <span class=\"nowrap\">information ;-) :</span></div>\n                <img src=\"/images/desktop-app-screen-womoney.png\" alt=\"\">\n            </div>\n        </div>\n\n        <div class=\"card-desktop\">\n            <div class=\"head\">\n                <img src=\"/images/icon-rules.png\" alt=\"\">\n                <div class=\"title\">Rules</div>\n            </div>\n            <div class=\"body\">\n                <ul class=\"list list-bull\">\n                    <li>Only users with fast internet are allowed, no 3G/GPRS.</li>\n                    <li>\n                        For fast image captchas you have to solve Recaptchas.\n                        They come with higher bid though.\n                    </li>\n                    <li>\n                        As you solve Recaptchas your Recaptcha points grow.\n                        As you skip them, points value decrease.\n                    </li>\n                    <li>\n                        If your account reaches -5 Recaptcha points, you will\n                        not be allowed to work in the app.\n                    </li>\n                    <li>\n                        Please don't abuse the feedback function. Do not ask\n                        for multi-id mode, webmoney, higher bids. Don't aks to\n                        remove Recaptcha. Otherwise you will be kicked from\n                        app access forever.\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n        <div class=\"card-desktop\">\n            <div class=\"head\">\n                <img src=\"/images/icon-firewall.png\" alt=\"\">\n                <div class=\"title\">Tune your firewall</div>\n            </div>\n            <div class=\"body\">\n            If you are using a firewall, please allow our applications to fully use internet. It is important to solve Recaptcha correctly, otherwise system might temporarily disable your account.\n            <span class=\"dash-button\" button-action=\"toggleFirewallInstructions\">Learn what you need to do</span>\n\n            <div id=\"firewall\" style=\"display: none; position: relative; padding: 10px 0\">\n                Generally, you need to add these applications to your white-list:<br>\n            <ul>\n                    <li>KolotibabloWorker.exe<li>KolotibabloApp.exe<li>KolotibabloBrowser.exe\n            </ul>\n                <div class=\"padding10px\"><h4>Comodo</h4>\n                    <a href=\"/images/firewall/Comodo/Comodo1.png\" data-lightbox=\"comodo\"><img src=\"/images/firewall/Comodo/Comodo1.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/Comodo/Comodo2.png\" data-lightbox=\"comodo\"><img src=\"/images/firewall/Comodo/Comodo2.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/Comodo/Comodo3.png\" data-lightbox=\"comodo\"><img src=\"/images/firewall/Comodo/Comodo3.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/Comodo/Comodo4.png\" data-lightbox=\"comodo\"><img src=\"/images/firewall/Comodo/Comodo4.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/Comodo/Comodo5.png\" data-lightbox=\"comodo\"><img src=\"/images/firewall/Comodo/Comodo5.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/Comodo/Comodo8.png\" data-lightbox=\"comodo\"><img src=\"/images/firewall/Comodo/Comodo8.png\" width=\"100\"></a>\n                </div>\n                <div class=\"padding10px\"><h4>PC Tools</h4>\n                    <a href=\"/images/firewall/PC_Tools/PC_Tools1.png\" data-lightbox=\"pctools\"><img src=\"/images/firewall/PC_Tools/PC_Tools1.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/PC_Tools/PC_Tools2.png\" data-lightbox=\"pctools\"><img src=\"/images/firewall/PC_Tools/PC_Tools2.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/PC_Tools/PC_Tools3.png\" data-lightbox=\"pctools\"><img src=\"/images/firewall/PC_Tools/PC_Tools3.png\" width=\"100\"></a>\n                </div>\n                <div class=\"padding10px\"><h4>Windows</h4>\n                    <a href=\"/images/firewall/Windows/Windows1.png\" data-lightbox=\"Windows\"><img src=\"/images/firewall/Windows/Windows1.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/Windows/Windows2.png\" data-lightbox=\"Windows\"><img src=\"/images/firewall/Windows/Windows2.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/Windows/Windows3.png\" data-lightbox=\"Windows\"><img src=\"/images/firewall/Windows/Windows3.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/Windows/Windows4.png\" data-lightbox=\"Windows\"><img src=\"/images/firewall/Windows/Windows4.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/Windows/Windows5.png\" data-lightbox=\"Windows\"><img src=\"/images/firewall/Windows/Windows5.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/Windows/Windows6.png\" data-lightbox=\"Windows\"><img src=\"/images/firewall/Windows/Windows6.png\" width=\"100\"></a>\n                </div>\n                <div class=\"padding10px\"><h4>Zone Alarm</h4>\n                    <a href=\"/images/firewall/ZoneAlarm/ZoneAlarm1.png\" data-lightbox=\"ZoneAlarm\"><img src=\"/images/firewall/ZoneAlarm/ZoneAlarm1.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/ZoneAlarm/ZoneAlarm2.png\" data-lightbox=\"ZoneAlarm\"><img src=\"/images/firewall/ZoneAlarm/ZoneAlarm2.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/ZoneAlarm/ZoneAlarm3.png\" data-lightbox=\"ZoneAlarm\"><img src=\"/images/firewall/ZoneAlarm/ZoneAlarm3.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/ZoneAlarm/ZoneAlarm4.png\" data-lightbox=\"ZoneAlarm\"><img src=\"/images/firewall/ZoneAlarm/ZoneAlarm4.png\" width=\"100\"></a>\n                    <a href=\"/images/firewall/ZoneAlarm/ZoneAlarm5.png\" data-lightbox=\"ZoneAlarm\"><img src=\"/images/firewall/ZoneAlarm/ZoneAlarm5.png\" width=\"100\"></a>\n                </div>\n            </div>\n            </div>\n        </div>\n\n        <div class=\"card-desktop\">\n            <div class=\"head\">\n                <img src=\"/images/icon-notes.png\" alt=\"\">\n                <div class=\"title\">Notes</div>\n            </div>\n            <div class=\"body\">\n                <ul class=\"list list-bull\">\n                    <li>\n                        Recaptcha display speed does not depend on us.\n                        It depends on many factors, but most probably you\n                        have slow internet. We are still working on this and\n                        trying to improve it, but with no guarantee.\n                    </li>\n                    <li>\n                        You may now use your Recaptcha Points to remove errors you've made!\n                    </li>\n                    <li class=\"new-badge\">\n                        Version for Windows 7 now works faster than version for\n                        XP. This is due to Windows system limitations, so if you\n                        want Recaptchas to load faster, install Windows 7 (or any\n                        next version) on your computer.\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n        <!--<div class=\"card-desktop\">\n            <div class=\"head\">\n                <img src=\"/images/icon-future.png\" alt=\"\">\n                <div class=\"title\">Future plans</div>\n            </div>\n            <div class=\"body\">\n                <ul class=\"list list-bull\">\n                    <li>\n                        Improve stability.\n                    </li>\n                </ul>\n            </div>\n        </div>-->\n    </div>\n</div>\n\n\n\n<script src=\"/js/lightbox.min.js\"></script>";
},"useData":true});
templates['hpage_info_cert'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<div class=\"tac padding20px\">\n    To solve Recaptchas via web interface you have to first install our root certificate. <a href=\"/files/kolotibabloCertificate.crt\">Download certificate</a>.<br>\n</div>\n\n<div id=\"firefoxTutorial\" style=\"display: none;\" class=\"tac\">\n    <div class=\"tac hdg1\">Firefox browser tutorial</div>\n    <div class=\"hidden-sm\">\n        <iframe style=\"max-width: 100%\" width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/uLPesMutvKU\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n    </div>\n    <div class=\"visible-sm mauto0\">\n        <span class=\"error\" style=\"max-width: 95%\"><b>Click on download link above and make sure to check first checkbox.</b></span><br><br>\n        <img style=\"max-width: 95%\" src=\"/images/pluginInstructions/android_firefox/image6.jpg\">\n    </div>\n</div>\n\n<div style=\"display: none;\" class=\"tac chromeTutorial\">\n    <div class=\"tac hdg1\">Chrome browser tutorial</div>\n    <iframe style=\"max-width: 100%\" width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/OXHlI0vCg_g\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n</div>\n\n<div class=\"tac padding20px\">After installation your browser must open this website without security notification: <a href=\"https://cert.kolotibablo.com/certTest.html\">https://cert.kolotibablo.com/certTest.html</a></div>\n\n<div class=\"chromeTutorial\" style=\"display: none;\">\n    <div class=\"tac hdg1 margintop40px\">Pictured instructions</div>\n    <div class=\"story-gallery\">\n        <div class=\"controls\">\n            <img src=\"/images/arrow-left.png\" alt=\"slide left\" class=\"goleft btn-manager\" button-action=\"slideLeft\">\n            <img src=\"/images/arrow-left.png\" alt=\"slide right\" class=\"goright btn-manager\" button-action=\"slideRight\">\n        </div>\n        <div class=\"slides\">\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['hpage_info_faq'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"accordeon wlimit-faq\" id=\"faqRecords\">\n</div>";
},"useData":true});
templates['hpage_info_plugin'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<div class=\"tac padding20px selection\">To solve Recaptchas via web interface you have to install our plugin.\n    <br>It works well in browsers <a href=\"/files/kolobrowser_setup.exe\" target=\"_blank\">Chromium</a> and <a href=\"/files/kolobrowsercomodo_setup.exe\" target=\"_blank\">Komodo</a>.\n</div>\n\n<div class=\"paddingtop20px grid\" id=\"backButton\" style=\"display: none\">\n    <div class=\"col tal\">\n        <button class=\"btn btn-primary btn-manager\" button-action=\"init\">\n            <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-arrow\" /></svg>\n            <span class=\"label\">Back</span>\n        </button>\n    </div>\n</div>\n\n<div class=\"selection\" id=\"startSelection\">\n    <div class=\"hdg1 tac\">Browser packages with pre-installed plugin</div>\n    <div class=\"grid-2_xs-1 margintop10px\">\n        <div class=\"col\">\n            <div class=\"card-white margin10px tac padding30px font20\">\n                <div>Komodo</div>\n                <a href=\"https://kolotibablo.com/files/kolobrowsercomodo_setup.exe\"><img src=\"/images/pluginInstructions/komodo_logo.png\" width=\"200\"></a>\n            </div>\n        </div>\n        <div class=\"col\">\n            <div class=\"card-white margin10px tac padding30px font20\">\n                <div>Chromium</div>\n                <a href=\"https://kolotibablo.com/files/kolobrowser_setup.exe\"><img src=\"/images/pluginInstructions/chromium_logo.png\" width=\"200\"></a>\n            </div>\n        </div>\n    </div>\n    <div class=\"hdg1 tac margintop10px\">Or install manually in your browser. Select your platform:</div>\n    <div class=\"grid-2_xs-1 margintop10px\">\n        <div class=\"col\">\n            <div class=\"card-white margin10px tac padding30px font20 btn-manager\" button-action=\"selectMicrosoft\">\n                <div>I'm running Windows</div>\n                <img src=\"/images/pluginInstructions/microsoft_logo.png\" width=\"200\">\n            </div>\n        </div>\n        <div class=\"col\">\n            <div class=\"card-white margin10px tac padding30px font20 btn-manager\" button-action=\"selectAndroid\">\n                <div>I'm running Android</div>\n                <img src=\"/images/pluginInstructions/android-card.png\" width=\"150\">\n            </div>\n        </div>\n        <div class=\"col\">\n            <div class=\"card-white margin10px tac padding30px font20 btn-manager\" button-action=\"selectLinux\">\n                <div>I'm running Linux</div>\n                <img src=\"/images/pluginInstructions/linux_logo.png\" width=\"220\">\n            </div>\n        </div>\n    </div>\n\n</div>\n\n<div id=\"windowsDownload\" class=\"selection\" style=\"display: none; margin: 0 auto;\">\n    <div class=\"hgd1 tac\">Select your browser:</div>\n    <div class=\"grid-2_xs-1\" >\n        <div class=\"col\">\n            <div class=\"card-white margin10px tac padding30px font20 btn-manager\" button-action=\"selectWinFirefox\">\n                <div>Firefox</div>\n                <img src=\"/images/pluginInstructions/firefox_logo.png\" width=\"150\">\n            </div>\n        </div>\n        <div class=\"col\">\n            <div class=\"card-white margin10px tac padding30px font20 btn-manager\" button-action=\"selectWinChrome\">\n                <div>Chrome / Komodo / Chromium</div>\n                <img src=\"/images/pluginInstructions/chrome_logo.png\" width=\"170\">\n            </div>\n        </div>\n    </div>\n</div>\n\n<div id=\"firefoxWinDownload\" class=\"selection\" style=\"display: none; margin: 0 auto;\">\n    <div class=\"card-blue grid-middle marginbottom20 marginbottom20\" style=\"margin: 0 auto; max-width: 600px\">\n        <div class=\"col-6_xs-12\">\n            Download plugin XPI file.\n        </div>\n        <div class=\"col-6_xs-12 tac\">\n            <a class=\"btn btn-primary\" href=\"https://apprelease.kolotibablo.com/kbplugin.xpi\">\n                <svg class=\"icon thumb-up\"><use xlink:href=\"#icon-download\"></use></svg>\n                <label>Download</label>\n            </a>\n        </div>\n        <div class=\"padding20px\">\n            <span class=\"error fontbold\">IMPORTANT: </span>\n            If you see the following error: \"<i>This addon could not be installed because it has not been verified</i>\" or \"<i>Firefox has prevented this site from installing an unverified add-on</i>\" or something like that, do this:<br>\n            1. Enter \"about:config\" in Firefox navigation address, press Enter.<br>\n            2. Find record <b>xpinstall.signatures.required</b> and change it to <b>false</b>.<br>\n            3. Restart browser and try again\n        </div>\n    </div>\n    <div class=\"padding20px tac\">\n        <iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/LBkcx60Aoy0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n    </div>\n</div>\n\n<div id=\"chromeWinDownload\" class=\"selection\" style=\"display: none; margin: 0 auto;\">\n    <div class=\"card-blue grid-middle marginbottom20 marginbottom20\" style=\"margin: 0 auto; max-width: 500px\">\n        <div class=\"col-6_xs-12\">\n            Download plugin ZIP file.\n        </div>\n        <div class=\"col-6_xs-12 tac\">\n            <a class=\"btn btn-primary\" href=\"https://apprelease.kolotibablo.com/kbplugin.zip\">\n                <svg class=\"icon thumb-up\"><use xlink:href=\"#icon-download\"></use></svg>\n                <label>Download</label>\n            </a>\n        </div>\n        <div class=\"padding20px\">\n            <span class=\"error fontbold\">IMPORTANT: </span> In case your Chrome does not permit to use the plugin, run this regfile : <a href=\"https://kolotibablo.com/files/kolotibablo_bot.reg\">kolotibablo_bot.reg</a>\n        </div>\n    </div>\n    <div class=\"padding20px tac\">\n        <iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/3BAnnj-fwSc\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n    </div>\n</div>\n\n\n\n<div id=\"androidDownload\" class=\"selection\" style=\"display: none; margin: 0 auto;\">\n    <div class=\"hgd1 tac\">Select your browser:</div>\n    <div class=\"grid-1_xs-1\" >\n        <div class=\"col\">\n            <div class=\"card-white margin10px tac padding30px font20 btn-manager\" button-action=\"selectAndroidFirefox\">\n                <div>Firefox</div>\n                <img src=\"/images/pluginInstructions/firefox_logo.png\" width=\"150\">\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div id=\"firefoxAndroidDownload\" class=\"selection\" style=\"display: none; margin: 0 auto;\">\n    <div class=\"card-blue grid-middle marginbottom20\" style=\"margin: 0 auto; max-width: 500px\">\n        <div class=\"col-6_xs-12\">\n            Download plugin XPI file.\n        </div>\n        <div class=\"col-6_xs-12 tac\">\n            <a class=\"btn btn-primary\" href=\"https://apprelease.kolotibablo.com/kbplugin.xpi\">\n                <svg class=\"icon thumb-up\"><use xlink:href=\"#icon-download\"></use></svg>\n                <label>Download</label>\n            </a>\n        </div>\n    </div>\n</div>\n\n<div id=\"linuxDownload\" class=\"selection\" style=\"display: none; margin: 0 auto;\">\n    <div class=\"card-blue grid-middle marginbottom20 marginbottom20\" style=\"margin: 0 auto; max-width: 500px\">\n        <div class=\"col-6_xs-12\">\n            Download plugin CRX file.\n        </div>\n        <div class=\"col-6_xs-12 tac\">\n            <a class=\"btn btn-primary\" href=\"https://apprelease.kolotibablo.com/kbplugin.crx\" download>\n                <svg class=\"icon thumb-up\"><use xlink:href=\"#icon-download\"></use></svg>\n                <label>Download</label>\n            </a>\n        </div>\n    </div>\n</div>\n\n<div class=\"story-gallery selection\" style=\"display: none\">\n    <div class=\"controls\">\n        <img src=\"/images/arrow-left.png\" alt=\"slide left\" class=\"goleft btn-manager\" button-action=\"slideLeft\">\n        <img src=\"/images/arrow-left.png\" alt=\"slide right\" class=\"goright btn-manager\" button-action=\"slideRight\">\n    </div>\n    <div class=\"slides w90p\">\n    </div>\n</div>";
},"useData":true});
templates['hpage_info_priority'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<div class=\"card-white profession marginbottom20\">\n    <div id=\"priorityExplanation\" class=\"padding10px hdg1\">Your captcha priority calculations.</div>\n    <div class=\"padding5px\">Calculations are based on your activity during the last 7 days.</div>\n    <table class=\"table\" id=\"priorityInfo\">\n        <thead>\n            <td>Parameter</td>\n            <td>Max in system</td>\n            <td>Your raw value</td>\n            <td>Weight for images</td>\n            <td>Your value</td>\n            <td>Weight for recaptchas</td>\n            <td>Your value</td>\n        </thead>\n    </table>\n    <div class=\"hint\">\n    This data is displayed for informative purposes.\n    We in Kolotibablo dev team periodically review parameters and calculation method in order to improve quality of our service for our customers.\n    Our top priority is to satisfy our customers and only then our employees.\n    Customers want top quality of the product and we provide it to them through this priority system.\n    We suggest you to improve some of your parameters yourself, like work regularly, make less mistakes, avoid skips and task dropping.\n    </div>\n</div>\n";
},"useData":true});
templates['hpage_info_ratingsinfo'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n\n<div class=\"card-blue mt1 grid-middle\">\n    <div class=\"col-3_xs-12 hdg1\">How it works?</div>\n    <div class=\"col-9_xs-12 desc\">\n        Our system counts amount of image captchas you've entered for the last 30 days.\nThis amount activates corresponding bonus level and your earnings added to your account with this added rate.<br>\n    </div>\n</div>\n\n<table class=\"table w100p\" id=\"ratingsTable\">\n    <thead>\n        <tr>\n            <th width=\"33%\">level</th>\n            <th width=\"33%\">monthly volume</th>\n            <th width=\"33%\">bonus</th>\n        </tr>\n    </thead>\n</table>\n";
},"useData":true});
templates['hpage_info_recaptchaupdates'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n\n<div class=\"tac smaller padding5px\" id=\"recaptchaSpeedsHeader\" style=\"display: none\">Average Recaptcha speed by solving method</div>\n<div class=\"grid currencies marginbottom50px\" id=\"recaptchaSpeeds\" style=\"display: none\">\n</div>\n\n<div class=\"tac\">\n    <div id='MicrosoftTranslatorWidget' class='Dark mauto0' style='color:white;background-color:#555555'></div>\n</div>\n<div class=\"padding10px tac\" id=\"rescontent\">\n\n</div>\n\n<div class=\"hdg1 tac margintop30\">Your IP info and count of other workers with same address</div>\n<table class=\"w100p table\" id=\"ipInfoTable\">\n<thead>\n    <td>Type</td>\n    <td>IP</td>\n    <td>Other workers</td>\n</thead>\n</table>";
},"useData":true});
templates['hpage_info_referrermessage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"msg2refs\">\n    <div class=\"hdg1 tac\">Message from your referrer</div>\n    <div class=\"card-white padding10px wlimit-faq\">\n        <div class=\"padding10px fontbold\">Sent on <span id=\"date\"></span></div>\n        <div id=\"message\" class=\"padding10px\"></div>\n    </div>\n</div>";
},"useData":true});
templates['hpage_menu'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['hpage_reports_fstats'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"table-nav grid\" id=\"backButtonContainer\">\n    <div class=\"col-6_md-12\" id=\"factoryDropdownContainer\">\n    </div>\n    <div class=\"col-6_md-12\">\n        Withheld payments: $ <span id=\"withhelpPaymentsCount\">-</span>\n        <div class=\"smaller\">Some factories may delay task payments for result moderation</div>\n    </div>\n</div>\n\n<table class=\"table w100p\" id=\"statsTable\">\n    <thead>\n        <tr>\n            <th>date</th>\n            <th>volume</th>\n            <th>$ earned</th>\n        </tr>\n    </thead>\n</table>\n<div id=\"earnchart\" class=\"card-white\" style=\"width: 100%; height: 400px; margin: 20px 0\"></div>\n<div id=\"volumechart\" class=\"card-white\" style=\"width: 100%; height: 400px; margin: 20px 0\"></div>\n";
},"useData":true});
templates['hpage_reports_stats'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<div class=\"padding20px\" style=\"display:none\" id=\"noPendingPayments\">No pending payments</div>\n<div class=\"paddingbottom20px\" style=\"display:none\" id=\"pendingStats\">\n    <b>Pending payments for image captchas:</b>\n    <div class=\"smaller\">You have to input at least 500 captchas for the last 48 hours to bypass moderation. You will receive payment for these entries only after our moderator checks them.</div>\n    <table class=\"table w100p\" id=\"pendingStatsTable\">\n        <thead>\n            <tr>\n                <th>date</th>\n                <th>volume</th>\n                <th>$ earned</th>\n                <th>$ bonus</th>\n            </tr>\n        </thead>\n    </table>\n</div>\n\n<div class=\"table-nav grid\" id=\"backButtonContainer\">\n    <div class=\"col-6_md-12\">\n        <div class=\"adropdown\" loader-function=\"getQueueNames\" default-value=\"0\" width=\"300px\" callback-function=\"setCaptchaType\" callback-parameter=\"captchaType\">\n        </div>\n    </div>\n    <div class=\"col-6_md-12\">\n        Captchas pending moderation: $ <span id=\"moderationFunds\">-</span>\n    </div>\n</div>\n\n<table class=\"table w100p\" id=\"statsTable\">\n    <thead>\n        <tr>\n            <th>date</th>\n            <th>volume</th>\n            <th>$ earned</th>\n            <th>$ bonus *</th>\n            <th>refunds **</th>\n        </tr>\n    </thead>\n</table>\n<div class=\"padding20px smaller\">\n    * Bonus payments are applied for image captchas only and depend on your current rating.<br>\n    ** Refunds amount $/count. Our customers have option to report incorrectly solved captchas. After checking their objections we subtract task cost from your balance.\n</div>\n<div id=\"earnchart\" class=\"card-white\" style=\"width: 100%; height: 400px; margin: 20px 0\"></div>\n<div id=\"volumechart\" class=\"card-white\" style=\"width: 100%; height: 400px; margin: 20px 0\"></div>\n<div id=\"bonuschart\" class=\"card-white\" style=\"width: 100%; height: 400px; margin: 20px 0\"></div>\n\n";
},"useData":true});
templates['hpage_reports_systemstats'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"grid\">\n    <div class=\"col tac\">\n        <div class=\"switch-either\" callback-function=\"setPeriod\" callback-parameter=\"period\" show-hidden-on-true=\"false\">\n            <span class=\"label\">24 hours</span>\n            <span class=\"switch\"></span>\n            <span class=\"label\">1 week</span>\n        </div>\n    </div>\n    <div class=\"col tac\">\n        <div class=\"adropdown\" default-value=\"6\" width=\"250px\" callback-function=\"setQueue\" callback-parameter=\"queueId\">\n            <option value=\"6\">Recaptcha tasks</option>\n            <option value=\"1\">Image tasks</option>\n        </div>\n    </div>\n</div>\n<div class=\"card-white\">\n    <div id=\"bidchart\"  style=\"width: 100%; height: 500px; margin: 20px 0 10px; \"></div>\n</div>\n<div class=\"card-white\">\n    <div id=\"loadchart\"  style=\"width: 100%; height: 500px; margin: 20px 0 10px; \"></div>\n</div>\n<div class=\"card-white\">\n    <div id=\"demandchart\"  style=\"width: 100%; height: 500px; margin: 20px 0 10px; \"></div>\n</div>\n\n\n";
},"useData":true});
templates['hpage_settings_account'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"wlimit settings\">\n\n\n    <div class=\"grid\">\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">Account login</div>\n            <div class=\"desc\">\n                Not possible to change\n            </div>\n        </div>\n        <div class=\"controls col-5_xs-12\">\n            <span id=\"accountlogin\"></span>\n        </div>\n    </div>\n\n    <div class=\"grid\">\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">Password change</div>\n            <div class=\"desc\">\n                To change your password you need your old password and access to email\n            </div>\n        </div>\n        <div class=\"controls col-5_xs-12\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"changePass\">change password</button>\n        </div>\n    </div>\n\n\n    <div class=\"grid\">\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">Pin code setup</div>\n            <div class=\"desc\">\n                Pin code is required to withdraw funds from your account. To setup the pin, you must have access to your email <span class=\"myemail\"></span>. We will send confirmation code there which you will need to enter to complete pin setup. Remember that you can set the pin only once!\n            </div>\n        </div>\n        <div class=\"controls col-5_xs-12\">\n            <span id=\"setpin_already\" style=\"display:none\">You had already setup your pin code. It is not possible to change it.</span>\n            <div id=\"setpin_button\">\n                <button class=\"btn btn-primary btn-manager\" button-action=\"setPin\">set pin</button>\n            </div>\n        </div>\n    </div>\n\n</div>\n";
},"useData":true});
templates['hpage_settings_profile'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"section\" id=\"userpicSection\" style=\"display: none\">\n    <div class=\"paddingtop20px grid\" id=\"backButton\" style=\"display: none\">\n        <div class=\"col tal\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"init\">\n                <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-arrow\" /></svg>\n                <span class=\"label\">Back</span>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"padding10px tac\">\n\n        <input type=\"file\" id=\"uploadUserpic\" class=\"inputfile\">\n        <label for=\"uploadUserpic\" id=\"uploadFileButton\" class=\"photo-add\">\n            <img src=\"/images/app-card-add-plus.png\" alt=\"\">\n            <div class=\"title tac\">Select a photo</div>\n        </label>\n\n    </div>\n    <div class=\"dtable card-white padding10px mauto0 tac\" id=\"pictureBlock\" style=\"display: none\">\n        <div class=\"smaller\" style=\"padding-bottom: 10px\">Crop your photo</div>\n        <img style=\"max-width: 400px; max-height: 400px;\" class=\"croppie\" src=\"\">\n    </div>\n    <div class=\"tac padding10px\" id=\"uploadButtonBlock\" style=\"display: none\">\n        <button class=\"btn btn-primary btn-manager\" button-action=\"uploadFile\" id=\"uploadeButton\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-upload\" /></svg>\n            <span class=\"label\">Upload photo</span>\n        </button>\n        <div class=\"progressbar-single mauto0 margintop10px\" id=\"fileProgressbar\" style=\"display: none\">\n            Uploading file..\n            <div class=\"progress\" id=\"fileProgressbarValue\" style=\"width:0%\">Uploading file..</div>\n          </div>\n    </div>\n</div>\n\n<div class=\"card-white wlimit-faq tac section\" id=\"successSection\" style=\"display: none\">\n    <div class=\"padding20px\">\n        <svg class=\"icon green large\"><use xlink:href=\"#icon-check\" /></svg>\n    </div>\n    <h3>Operation success</h3>\n    <div class=\"desc padding20px\">Profile saved.<br>\n        <div>\n            <span class=\"dash-button\" button-action=\"init\">Go back</span>\n        </div>\n        <span class=\"dash-link\" data-navigate=\"start\">Go to start page</span>\n    </div>\n</div>\n\n<div class=\"wlimit settings section\" id=\"editSection\" style=\"display: none\">\n\n\n    <div class=\"grid\">\n\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">Profile picture</div>\n            <div class=\"desc\">\n                Set profile picture to be able to win prizes\n            </div>\n        </div>\n        <div class=\"controls col-5_xs-12 profile-pic-value\" id=\"nofilledBlock\" style=\"display: none\">\n            Fill your profile first.\n        </div>\n        <div class=\"controls col-5_xs-12 profile-pic-value\" id=\"nouserpicBlock\" style=\"display: none\">\n            <button class=\"btn btn-default btn-manager\" button-action=\"selectPhoto\">\n                <span class=\"label\">Set picture</span>\n            </button>\n        </div>\n        <div class=\"controls col-5_xs-12 profile-pic-value broulette-winners\" id=\"userpicBlock\" style=\"display: none\">\n            <div class=\"winner-item\">\n                <div class=\"avatar btn-manager\" button-action=\"selectPhoto\">\n                    <img src=\"\" id=\"userpicUrl\" width=\"88\">\n                </div>\n            </div>\n        </div>\n\n\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">Your name</div>\n        </div>\n        <div class=\"controls col-5_xs-12\">\n            <input type=\"text\" class=\"inp-dft w50px\" id=\"username\">\n        </div>\n\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">Language settings</div>\n            <div class=\"desc\">\n                Select languages you know. Note that you must select only languages you can understand and type in.\n            </div>\n        </div>\n        <div class=\"controls col-5_xs-12\" id=\"languagesContainer\">\n\n        </div>\n\n\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">Birthday date</div>\n            <div class=\"desc\">\n                Must be in format DD/MM/YYYY\n            </div>\n        </div>\n        <div class=\"controls col-5_xs-12\">\n            <input type=\"text\" class=\"inp-dft w50px\" id=\"birthday\" placeholder=\"DD/MM/YYYY\">\n        </div>\n\n\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">Gender</div>\n        </div>\n        <div class=\"controls col-5_xs-12\">\n            <div class=\"adropdown\" id=\"gender\" default-value=\"not_set\" width=\"200px\" callback-parameter=\"gender\">\n                <option value=\"not_set\">select value</option>\n                <option value=\"male\">male</option>\n                <option value=\"female\">female</option>\n            </div>\n        </div>\n\n        <div class=\"col-12 tac\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"saveSettings\">Save profile</button>\n        </div>\n\n    </div>\n\n\n\n</div>";
},"useData":true});
templates['hpage_start'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<iframe src=\"\" id=\"v3check\" width=\"1\" height=\"1\" style=\"position: absolute; top: -1000px; left: -1000px;\"></iframe>\n\n<div class=\"grid-6_sm-3_xs-2-center-noGutter quick-access marginbottom20\" style=\"opacity: 0\">\n    <div class=\"col \">\n        <a href=\"\" class=\"btn btn-primary anti-navigate margin5px\" data-navigate=\"earn\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-worker\" /></svg>\n            <span class=\"btn-text\">work via Web</span>\n        </a>\n    </div>\n    <div class=\"col \">\n        <a href=\"\" class=\"btn btn-primary anti-navigate margin5px\" data-navigate=\"info/app\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-download\" /></svg>\n            <span class=\"btn-text\">work via App</span>\n        </a>\n    </div>\n    <div class=\"col \" id=\"withdrawButton\">\n        <a href=\"\" class=\"btn btn-primary anti-navigate margin5px\" data-navigate=\"finance/withdraw\">\n            <img src=\"/images/icon-withdraw.png\" alt=\"withdraw funds\">\n            <span class=\"btn-text\">send money</span>\n        </a>\n    </div>\n    <div class=\"col \">\n        <a href=\"\" class=\"btn btn-primary anti-navigate margin5px\" data-navigate=\"reports/stats\">\n            <img src=\"/images/icon-chart-white.png\" alt=\"\">\n            <span class=\"btn-text\">track stats</span>\n        </a>\n    </div>\n    <div class=\"col \">\n        <a class=\"btn btn-primary anti-navigate margin5px\" data-navigate=\"tools/referrals\">\n            <img src=\"/images/icon-users.png\" alt=\"\">\n            <span class=\"btn-text\">referrals</span>\n        </a>\n    </div>\n    <div class=\"col \" id=\"factoryButton\">\n        <a class=\"btn btn-primary anti-navigate margin5px\" data-navigate=\"factory/directory\">\n            <span class=\"badge-new\" id=\"newCount\">new</span>\n            <svg class=\"icon\"><use xlink:href=\"#icon-factory\" /></svg>\n            <span class=\"btn-text\">More Jobs</span>\n        </a>\n    </div>\n</div>\n\n\n\n<div class=\"card-blue grid-middle marginbottom20\" id=\"newsWidget\" style=\"display: none;\">\n    <div class=\"col-9_xs-12\" id=\"newsText\">\n\n    </div>\n    <div class=\"col-3_xs-12 tac\">\n        <div class=\"btn btn-primary btn-manager\" button-action=\"markNewsAsRead\">Got it</div>\n    </div>\n</div>\n\n\n<div class=\"card-blue grid-middle marginbottom20\" id=\"profileFillSuggestbox\" style=\"display: none;\">\n    <div class=\"col-9_xs-12\">\n        Fill out your profile to receive new type of tasks.\n    </div>\n    <div class=\"col-3_xs-12 tac\">\n        <div class=\"btn btn-primary anti-navigate\" data-navigate=\"settings/profile\">Edit profile</div>\n    </div>\n</div>\n\n\n<div class=\"grid professions-list dashboard\" style=\"opacity: 1\">\n\n    <div class=\"col-12_xs-12\">\n\n        <div class=\"factory-state-banned\" id=\"reCaptchaBanned\" style=\"display: none;\">\n            <div class=\"factory-state-text\" id=\"recaptchaBanStatusText\">Banned</div>\n        </div>\n        <div class=\"card-white profession\">\n            <div class=\"title\">Recaptcha Solving</div>\n\n            <div style=\"position: absolute; right: 20px; top: 20px;\">\n                <div class=\"progressbar\" id=\"recaptchaLoadLabel\" title=\"50% demand\" style=\"width:90px;\" onmousedown=\"Anti.debugLevel = 'debug';\">\n                    <div class=\"progress\" id=\"recaptchaLoadProgress\" style=\"width:1%\"></div>\n                </div>\n            </div>\n\n            <div>Current bid: $<span id=\"avgRecaptchaBid\" class=\"fontbold\" style=\"color:#02BF00\"></span> / 1000&nbsp;&nbsp;|&nbsp;&nbsp;<span class=\"dash-link\" data-navigate=\"info/priority\">Priority</span> :  <span id=\"recaptchaPriorityStartLabel\">- / -</span></div>\n\n\n            <div id=\"recaptchaFollowTitlte\" class=\"margintop5px\"><b>Follow easy instructions to enable Recaptcha tasks:</b></div>\n            <ul class=\"key-value recaptcha-checklist\">\n                <li>\n                    <span class=\"key\">Compatible browser</span>\n                    <span class=\"value\" id=\"chromeInstalledLabel\"></span>\n                </li>\n                <li>\n                    <span class=\"key\">Certificate Installed:</span>\n                    <span class=\"value\" id=\"certificateInstallLabel\">\n                        <svg class=\"icon\" style=\"color:red\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-cross\"></use></svg>\n                        <a class=\"anti-navigate\" data-navigate=\"info/cert\">Installation instructions</a>\n                    </span>\n                </li>\n                <li>\n                    <span class=\"key\">Browser Plugin Installed and Running:</span>\n                    <span class=\"value\" id=\"pluginInstallLabel\">\n                        <svg class=\"icon\" style=\"color:red\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-cross\"></use></svg>\n                        <a class=\"anti-navigate\" data-navigate=\"info/plugin\">Installation instructions</a>\n                    </span>\n                </li>\n                <li>\n                    <span class=\"key\">Plugin version<span id=\"currentPluginVersionLabel\"></span>:</span>\n                    <span class=\"value\" id=\"pluginVersionLabel\">n/a</span>\n                </li>\n                <li style=\"display:none\" id=\"gmailPumpHintRow\">\n                    <span class=\"key\">Using Gmail pump tool:</span>\n                    <span class=\"value\" id=\"gmailPumpLabel\">n/a</span>\n                </li>\n                <li>\n                    <span class=\"key\"><span class=\"dash-button\" button-action=\"showIPBannedHint\">IP status</span>:</span>\n                    <span class=\"value\" id=\"ipStatusLabel\">--</span>\n                </li>\n                <li>\n                    <span class=\"key\">Account status:</span>\n                    <span class=\"value\" id=\"recaptchaAccountStatusLabel\">--</span>\n                </li>\n\n                <li id=\"recaptchaScoreRow\" style=\"display: none;\">\n                    <span class=\"key\">Recaptcha score:</span>\n                    <span class=\"value\" id=\"recaptchaScoreLabel\"><img src=\"/images/loader_rolling.gif\" style=\"width:20px\"></span>\n                </li>\n                <li id=\"recaptchaNews\" style=\"display:none\" class=\"error\">\n                    <span class=\"key\"><b>Recaptcha news update available!</b></span>\n                    <span class=\"value\"><span class=\"dash-link\" data-navigate=\"info/recaptchaupdates\">read news</span></span>\n                </li>\n            </ul>\n            <div class=\"foot grid-center\">\n                <div class=\"toggler\" id=\"recaptchaToggler\" callback-function=\"saveSettings\" callback-parameter=\"enableRecaptcha\"></div>\n                <label for=\"recaptchaToggler\">Receive tasks</label>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-6_xs-12\">\n        <div class=\"factory-state-banned\" id=\"imageCaptchaBanned\" style=\"display: none;\">\n            <div class=\"factory-state-text\">Banned</div>\n        </div>\n        <div class=\"card-white profession\">\n            <div class=\"title\">Image Captcha Solving</div>\n            <div class=\"smaller\" style=\"margin-top:-1rem\">Usual image captcha tasks</div>\n            <ul class=\"key-value recaptcha-checklist\">\n                <li>\n                    <span class=\"key nowrap\">Current bid:</span>\n                    <span class=\"value\" id=\"imageAverageBidLabel\"></span>\n                </li>\n                <li>\n                    <span class=\"key nowrap\">Monthly entries:</span>\n                    <span class=\"value\" id=\"captchaMonthCountLabel\"></span>\n                </li>\n                <li>\n                    <span class=\"key nowrap\">Monthly earnings:</span>\n                    <span class=\"value\" id=\"captchaMonthEarningLabel\"></span>\n                </li>\n                <li>\n                    <span class=\"key nowrap\"><span class=\"dash-link\" data-navigate=\"info/priority\">Priority</span>:</span>\n                    <span class=\"value\" id=\"imagePriorityStartLabel\">- / -</span>\n                </li>\n                <li>\n                    <span class=\"key nowrap\">Demand:</span>\n                    <span class=\"value\">\n                        <div class=\"progressbar\" id=\"imageLoadLabel\" title=\"50% demand\" style=\"width:90px;\">\n                            <div class=\"progress\" id=\"imageLoadProgress\" style=\"width:1%\"></div>\n                        </div>\n                    </span>\n                </li>\n            </ul>\n            <div class=\"foot grid-center\">\n                <div class=\"toggler\" id=\"imagetaskToggler\" callback-function=\"saveSettings\" callback-parameter=\"enableImageCaptcha\"></div>\n                <label for=\"imagetaskToggler\">Receive tasks</label>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-6_xs-12\">\n        <div class=\"factory-state-banned\" id=\"funCaptchaBanned\" style=\"display: none;\">\n            <div class=\"factory-state-text\">Banned</div>\n        </div>\n        <div class=\"card-white profession\">\n            <div class=\"title\">Fun Captcha</div>\n            <div class=\"smaller\" style=\"margin-top:-1rem\">Rotating captcha tasks</div>\n            <ul class=\"key-value recaptcha-checklist\">\n                <li>\n                    <span class=\"key nowrap\">Current bid:</span>\n                    <span class=\"value\" id=\"funcaptchaAverageBidLabel\"></span>\n                </li>\n                <li>\n                    <span class=\"key nowrap\">Demand:</span>\n                    <span class=\"value\">\n                        <div class=\"progressbar\" id=\"funcaptchaLoadLabel\" title=\"50% demand\" style=\"width:90px;\">\n                            <div class=\"progress\" id=\"funcaptchaLoadProgress\" style=\"width:1%\"></div>\n                        </div>\n                    </span>\n                </li>\n            </ul>\n            <div class=\"foot grid-center\">\n                <div class=\"toggler\" callback-function=\"saveSettings\" callback-parameter=\"enableFunCaptcha\"></div>\n                <label for=\"\">Receive tasks</label>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-6_xs-12\">\n        <div class=\"card-white profession\">\n            <div class=\"title\">GeeTest Captcha</div>\n            <div class=\"smaller\" style=\"margin-top:-1rem\">Sliding captcha tasks</div>\n            <ul class=\"key-value recaptcha-checklist\">\n                <li>\n                    <span class=\"key nowrap\">Current bid:</span>\n                    <span class=\"value\" id=\"geetestAverageBidLabel\"></span>\n                </li>\n                <li>\n                    <span class=\"key nowrap\">Demand:</span>\n                    <span class=\"value\">\n                        <div class=\"progressbar\" id=\"geetestLoadLabel\" title=\"50% demand\" style=\"width:90px;\">\n                            <div class=\"progress\" id=\"geetestLoadProgress\" style=\"width:1%\"></div>\n                        </div>\n                    </span>\n                </li>\n            </ul>\n            <div class=\"foot grid-center\">\n                <div class=\"toggler\" callback-function=\"saveSettings\" callback-parameter=\"enableGeetest\"></div>\n                <label for=\"\">Receive tasks</label>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-6_xs-12\">\n        <div class=\"card-white profession\">\n            <div class=\"title\">hCaptcha</div>\n            <div class=\"smaller\" style=\"margin-top:-1rem\">Recaptcha clone</div>\n            <ul class=\"key-value recaptcha-checklist\">\n                <li>\n                    <span class=\"key nowrap\">Current bid:</span>\n                    <span class=\"value\" id=\"hcaptchaAverageBidLabel\"></span>\n                </li>\n                <li>\n                    <span class=\"key nowrap\">Demand:</span>\n                    <span class=\"value\">\n                        <div class=\"progressbar\" id=\"hcaptchaLoadLabel\" title=\"50% demand\" style=\"width:90px;\">\n                            <div class=\"progress\" id=\"hcaptchaLoadProgress\" style=\"width:1%\"></div>\n                        </div>\n                    </span>\n                </li>\n            </ul>\n            <div class=\"foot grid-center\">\n                <div class=\"toggler\" callback-function=\"saveSettings\" callback-parameter=\"enableHCaptcha\"></div>\n                <label for=\"\">Receive tasks</label>\n            </div>\n        </div>\n    </div>\n\n\n\n\n</div>\n\n\n\n\n<div class=\"card-white profession marginbottom20\" id=\"androidApp\" style=\"display: none\">\n    <div class=\"close btn-manager\" button-action=\"hideMessage\" action-parameter=\"hide_android_promo\"><svg><use xlink:href=\"#icon-cross\" /></svg></div>\n\n    <div class=\"tac padding20px\">\n        Try our new <a href=\"https://play.google.com/store/apps/details?id=com.kolotibablo&hl=en\" target=\"_blank\">Android App</a>!<br>Solve both image captchas and Recaptchas. No additional software required, just log in and work!\n    </div>\n    <div class=\"grid\">\n        <div class=\"col-4\"><div class=\"mauto0 tac\"><img src=\"/images/android/1.png\" style=\"max-width: 80%\"></div></div>\n        <div class=\"col-4\"><div class=\"mauto0 tac\"><img src=\"/images/android/2.png\" style=\"max-width: 80%\"></div></div>\n        <div class=\"col-4\"><div class=\"mauto0 tac\"><img src=\"/images/android/3.png\" style=\"max-width: 80%\"></div></div>\n    </div>\n</div>\n\n\n<div class=\"card-white profession marginbottom20\" id=\"unbanSuggestbox\">\n    <div class=\"close btn-manager\" button-action=\"hideMessage\" action-parameter=\"hide_unban_promo\"><svg><use xlink:href=\"#icon-cross\" /></svg></div>\n    <div class=\"grid\">\n        <div class=\"col-9_xs-12 tal margintop10px\">\n            Spend your recaptcha points to unban access to image captchas for yourself or other accounts.\n            <br>Cost: 2,000 recaptcha points.\n        </div>\n        <div class=\"col-3_xs-12 tac margintop30px\">\n            <div class=\"btn btn-primary anti-navigate\" data-navigate=\"tools/unban\">More info</div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"card-blue grid-middle\" style=\"opacity: 0\">\n    <div class=\"col-12\" id=\"newsContainer\"></div>\n</div>";
},"useData":true});
templates['hpage_tools_fingerprint'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"card-white wlimit-faq padding20px\">\n    Each browser has its unique fingerprint, which is calculated as a hash sum of many unique browser parameters.\n    It can be user agent, screen resolution, list of installed fonts and many more.\n    Most of the time fingerprint does not change if you simply clean cookies.\n    Sometimes even changing a user agent does not help.<br>\n    Try experimenting with this page.\n    Clean cookies, register new account, view page from incognito mode.\n    If you keep getting same fingerprint, then Google is now aware that you're the same person even after cleaning cookies.\n\n    <div class=\"hdg1 tac margintop40px\" id=\"fingerprint\"></div>\n    <div class=\"smaller tac\">Your current browser fingerprint</div>\n\n    <div class=\"margintop40px\">Our plugin starting from version 2.30 can help you change this fingerprint with a click of a button.</div>\n\n</div>";
},"useData":true});
templates['hpage_tools_pump'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"terms collapsed btn-manager\" button-action=\"Anti.history.toggleHelp\" id=\"topHelper\" style=\"display: none\">\n    <div class=\"contents\">\n        <div class=\"gmail-workout-wrap\">\n            <div class=\"gmail-workout-title\">\n                Gmail account pumping\n            </div>\n            <div class=\"ill-desc workout-man\">\n                <div class=\"ill\"><img src=\"/images/gmail-workout-man.png\" alt=\"\"></div>\n                <div class=\"gap\"></div>\n                <div class=\"desc\">\n                    Your goal is to send and receive emails.\n                    Open received letters and reply to them with some probability.<br><br>\n\n                    This will improve your \"behavioural points\" for Google.\n                    Their algorithms over time will \"think\" that account is being used by real person and it will make your Recaptchas easier.\n                </div>\n            </div>\n            <div class=\"ill-desc\">\n                <div class=\"desc\">\n                    <div class=\"number\">1</div>\n                    Register required amount of Gmail accounts.\n                    It is better to have one account per day and switch them daily during a week.\n                    Means that you need 7 accounts.\n                </div>\n                <div class=\"gap\"></div>\n                <div class=\"ill\"><img src=\"/images/gmail-workout-reg.png\" alt=\"\"></div>\n            </div>\n            <div class=\"ill-desc\">\n                <div class=\"ill\"><img src=\"/images/gmail-workout-dbadd.png\" alt=\"\"></div>\n                <div class=\"gap\"></div>\n                <div class=\"desc\">\n                    <div class=\"number\">2</div>\n                    In KB account you add your email and owner's name in a table.\n                </div>\n            </div>\n            <div class=\"ill-desc\">\n                <div class=\"desc\">\n                    <div class=\"number\">3</div>\n                    Each day system generates simple tasks like sending email, searching a keyword in Google, etc.\n                    We'll give you uniquely generated texts for that.\n                </div>\n                <div class=\"gap\"></div>\n                <div class=\"ill\"><img src=\"/images/gmail-workout-copy-paste.png\" alt=\"\"></div>\n            </div>\n            <div class=\"ill-desc\">\n                <div class=\"ill\"><img src=\"/images/gmail-workout-recaptcha5s.png\" alt=\"\"></div>\n                <div class=\"gap\"></div>\n                <div class=\"desc\">\n                    <div class=\"number\">4</div>\n                    In a few weeks Google will start thinking that you are a real person and will make Recaptcha easier.\n                </div>\n            </div>\n            <div class=\"ill-desc\">\n\n        How email exchange works:<br>\n        1. We take your email and email of another KB user.<br>\n        2. We tell you what to send to this user from your email.<br>\n        3. Other user confirms he has received your email or tells us he did not find it.<br>\n        4. If your \"not found\" to \"confirmed\" ratio becomes too high - we won't send any more tasks to you.\n           So be honest and truely send and confirm those emails, it doesn't take too much time.<br><br>\n        IMPORTANT HINT !<br>\n        When you are using multiple Gmail accounts, DO NOT switch between them using Google's interface.\n        Instead, you should clean all your cookies or use incognito mode, otherwise Google will ban all your accounts.\n\n            </div>\n        </div>\n    </div>\n    <!--<ul class=\"contents list\">\n\n\n    </ul>-->\n    <div class=\"title grid-center-middle-noGutter\">\n        <svg class=\"icon\"><use xlink:href=\"#icon-info\" /></svg>\n        <svg class=\"icon arrow-top\"><use xlink:href=\"#icon-arrow\" /></svg>\n        <div class=\"label\">What is it?</div>\n    </div>\n</div>\n\n\n<div id=\"info\"></div>\n\n<div class=\"section\" id=\"listSection\" style=\"display: none\">\n    <div class=\"paddingtop20px grid\">\n        <div class=\"col tar\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"editAccountDialog\" action-parameter=\"0\">\n                <svg class=\"icon\"><use xlink:href=\"#icon-plus\" /></svg>\n                <span class=\"label\">Add Account</span>\n            </button>\n        </div>\n    </div>\n    <table id=\"accountsList\" class=\"w100p table\">\n        <thead>\n            <tr>\n                <td>Login & Name</td>\n                <td>Stats</td>\n                <td style=\"text-align: center\">Edit</td>\n            </tr>\n        </thead>\n    </table>\n    </div>\n\n<div class=\"section\" id=\"editSection\" style=\"display: none\">\n    <div class=\"paddingtop20px grid\">\n        <div class=\"col tal\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"init\">\n                <svg class=\"icon arrow-back\"><use xlink:href=\"#icon-arrow\" /></svg>\n                <span class=\"label\">Back</span>\n            </button>\n        </div>\n    </div>\n    <div id=\"editContainer\"></div>\n</div>\n\n";
},"useData":true});
templates['hpage_tools_referrals'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<div class=\"section\" id=\"mainSection\" style=\"display: none\">\n\n<div class=\"terms collapsed btn-manager\" button-action=\"showTerms\">\n    <ul id=\"terms\" class=\"contents list\"></ul>\n    <div class=\"title grid-center-middle-noGutter\">\n        <svg class=\"icon\"><use xlink:href=\"#icon-info\" /></svg>\n        <svg class=\"icon arrow-top\"><use xlink:href=\"#icon-arrow\" /></svg>\n        <div class=\"label\">Terms and conditions</div>\n    </div>\n</div>\n<div class=\"hdg1 tac\">\n    Quick stats\n</div>\n<div class=\"grid-5_xs-2 quick-stats\">\n    <div class=\"col\">\n        <div class=\"card-blue\">\n            <img src=\"/images/icon-click.svg\" alt=\"\" class=\"icon\">\n            <div class=\"title\">Monthly clicks</div>\n            <div class=\"value\" id=\"monthlyClicks\">-</div>\n        </div>\n    </div>\n    <div class=\"col\">\n        <div class=\"card-blue\">\n            <img src=\"/images/icon-user-plus.svg\" alt=\"\" class=\"icon\">\n            <div class=\"title\">Monthly registrations</div>\n            <div class=\"value\" id=\"monthlyRegs\">-</div>\n        </div>\n    </div>\n    <div class=\"col\">\n        <div class=\"card-blue\">\n            <img src=\"/images/icon-users.svg\" alt=\"\" class=\"icon\">\n            <div class=\"title\">Active referrals</div>\n            <div class=\"value\" id=\"activeReferralsCount\">-</div>\n        </div>\n    </div>\n    <div class=\"col\">\n        <div class=\"card-blue\">\n            <img src=\"/images/icon-piggy.svg\" alt=\"\" class=\"icon\">\n            <div class=\"title\">Earning referrals</div>\n            <div class=\"value\" id=\"earningReferralsCount\">-</div>\n        </div>\n    </div>\n    <div class=\"col\">\n        <div class=\"card-blue\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-dollar\" /></svg>\n            <div class=\"title\">Monthly earnings</div>\n            <div class=\"value\" id=\"monthlyEarnings\">-</div>\n        </div>\n    </div>\n</div>\n\n<div class=\"grid-spaceBetween-middle\">\n    <div class=\"col-3 hidden-xs\"></div>\n    <div class=\"col-6_xs-12 tac\"><div class=\"hdg1 m0\">Referral links</div></div>\n    <div class=\"col-3_xs-12 tar\"><button class=\"btn btn-primary btn-manager\" button-action=\"createLinkDialog\">Generate link</button></div>\n</div>\n<table class=\"table w100p table-reflinks\" id=\"refLinksTable\">\n    <thead>\n        <tr>\n            <th>Link</th>\n            <th>\n                Clicks\n                <div class=\"smaller\">month/total</div>\n            </th>\n            <th>\n                Registrations\n                <div class=\"smaller\">month/total</div>\n            </th>\n            <th>\n                Earning referrals\n                <div class=\"smaller\">referrals earning money</div>\n            </th>\n            <th>\n                Payments\n                <div class=\"smaller\">month/total</div>\n            </th>\n            <th></th>\n        </tr>\n    </thead>\n\n\n\n</table>\n\n<div class=\"grid\" id=\"chartDiv\" style=\"display: none\">\n    <div class=\"col-12\"><div class=\"card-white\" style=\"height:400px\" id=\"statsChart\">Chart</div></div>\n    <div class=\"col-12\"><div class=\"card-white\" style=\"height:400px\" id=\"earningChart\">Chart</div></div>\n    <div class=\"col-6\"><div class=\"card-white\" style=\"height:400px\" id=\"activeRefsChart\">Chart</div></div>\n    <div class=\"col-6\"><div class=\"card-white\" style=\"height:400px\" id=\"statusesChart\">Chart</div></div>\n</div>\n\n<div id=\"referralsTable\" style=\"display: none\">\n    <div class=\"grid\">\n        <div class=\"col-6 tac\">\n            <div class=\"adropdown\" default-value=\"status\" width=\"250px\" callback-function=\"setFilterStatus\" callback-parameter=\"status\">\n                <option value=\"all\">All referrals</option>\n                <option value=\"active\">active</option>\n                <option value=\"earning\">earning</option>\n                <option value=\"inactive\">inactive</option>\n                <option value=\"self-referer\">Self-referrer</option>\n                <option value=\"suspended\">suspended</option>\n            </div>\n            <div class=\"hint\">Filter status</div>\n        </div>\n        <div class=\"col-6 tac\">\n            <div class=\"adropdown\" default-value=\"sorting\" width=\"250px\" callback-function=\"setFilterSorting\" callback-parameter=\"sorting\">\n                <option value=\"create_date\">Registration date</option>\n                <option value=\"login\">Login</option>\n                <option value=\"monthearn\">Referral reward</option>\n            </div>\n            <div class=\"hint\">Ordering</div>\n        </div>\n    </div>\n\n    <table class=\"table w100p\" id=\"referersList\">\n        <thead>\n        <tr>\n            <td>Login</td>\n            <td>Join date</td>\n            <td>Status</td>\n            <td>Referral reward</td>\n        </tr>\n        </thead>\n    </table>\n</div>\n\n</div>\n\n\n<div class=\"msg2refs\">\n    <div class=\"hdg1 tac\">Send message to your refs</div>\n    <div class=\"grid\">\n        <div class=\"col-8_xs-12\">\n            <form class=\"card-white form\">\n                <div class=\"form-row\">\n                    <textarea class=\"inp-dft w100p\" rows=\"7\" id=\"refmessage\" placeholder=\"Your message\"></textarea>\n                </div>\n                <div class=\"form-row\">\n                    <button class=\"btn btn-primary btn-manager\" button-action=\"sendMessage\">\n                        <svg class=\"icon\"><use xlink:href=\"#icon-plane\"></use></svg>\n                        <label>Send</label>\n                    </button>\n                </div>\n            </form>\n        </div>\n        <div class=\"col-4_xs-12\">\n            <p class=\"smaller\">\n                Use this form to communicate with your referrals.\n                Good idea is to share tips and tricks of how they would earn more money.<br>\n                They will be notified in their interface when the message is updated.\n            </p>\n            <p><span class=\"fontbold\" id=\"readsCounter\"></span> users read your message</p>\n        </div>\n    </div>\n</div>\n\n<div class=\"section\" id=\"promoSection\" style=\"display: none\">\n\n</div>";
},"useData":true});
templates['hpage_tools_reftop'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"wlimit-faq\">\n\n\n    <div id=\"notEarning\" class=\"tac padding20px card-white\" style=\"display: none\">\n        Oops, it seems that you are not taking part in this top list :( <br>\n        Generate a referral link and get paid by referring other workers!\n\n        <div class=\"tac padding20px\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"go\">\n                <span class=\"label\">Start earning money now</span>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"hdg1 tac margin30px\">Top monthly earning referrers</div>\n    <table class=\"w100p table\" id=\"reftop\">\n        <thead>\n            <tr>\n                <td>Place</td>\n                <td>Name</td>\n                <td>Montly Earnings</td>\n            </tr>\n        </thead>\n    </table>\n\n\n    <div class=\"tac padding10px card-white margin20px\" id=\"topListBlock\">\n\n        Enter name for the top list:<br><br>\n\n        <input type=\"text\" id=\"toplistName\" class=\"inp-dft\">\n\n        <button class=\"btn btn-default medium btn-manager\" button-action=\"saveName\">\n            <span class=\"label\">Save</span>\n        </button>\n    </div>\n\n</div>";
},"useData":true});
templates['hpage_tools_retest'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<br>\n\n<div class=\"grid\">\n    <div class=\"col\">\n        <div class=\"long-island\" style=\"max-width: 100%; width: 400px; height: 600px; background-color: #CCC;  display: block; border-radius:5px\"></div>\n    </div>\n    <div class=\"col\">\n        <button class=\"btn btn-primary btn-manager medium\" button-action=\"createTask\" action-parameter=\"\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-plus\" /></svg>\n            <span class=\"label\">Create task</span>\n        </button>\n    </div>\n</div>\n";
},"useData":true});
templates['hpage_tools_story'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<div class=\"section\" id=\"inviteSection\" style=\"display: none\">\n<div class=\"invite-wrap\">\n    <div class=\"tac\"><img src=\"/images/kolostories-logo-big.png\" alt=\"\"></div>\n    <div class=\"wlimit-faq\">\n        <ul class=\"list\">\n            <li>\n                <div class=\"hdg1\">CONGRATULATIONS!</div>\n                <p>\n                    You and a few other workers who work for us for long time were\n                    invited to participate in our project -\n                    <a href=\"https://kolostories.com/\" target=\"_blank\">kolostories.com</a> .\n                    It is currently under development and content preparing, so don't\n                    pay too much attention to the website itself.\n                </p>\n            </li>\n            <li>\n                <div class=\"hdg1\">What is it about?</div>\n                <p>\n                    We made some studies and discovered that many of our potential\n                    clients and organizations suppose that using human labor in\n                    solving captchas is something inappropriate.\n                    They often think that captcha entry job is something related\n                    to slavery and avoid using our services. We all know that\n                    this is not true.\n                    Taking job at Kolotibablo is a subject of your personal choice.\n                    And we would like to show everybody that you and all other\n                    workers truely benefit from working here.\n                </p>\n            </li>\n            <li>\n                <div class=\"hdg1\">Am I getting paid?</div>\n                <p>\n                    Yes! We will pay you total <b>10 USD</b> to your protected\n                    balance for your story and pictures.\n                </p>\n            </li>\n        </ul>\n        <ul class=\"list\" style=\"display:none\" id=\"hiddenList\">\n            <li>\n                <div class=\"hdg1\">What I need to do?</div>\n                <p>\n                    We will ask you to upload us several photos of yourself, your workplace, your home, your family, your food and the streets of the place you live at.\n                    We will also ask you to tell a little about each picture and write a little story about our job at Kolotibablo and how you personally benefit from it.\n                </p>\n            </li>\n            <li>\n                <div class=\"hdg1\">Will you pay for every worker's story?</div>\n                <p>\n                    Yes, but we don't send these invitations to everyone.\n                    If you've received this invite, it won't go anywhere, please take your time to go and make fresh good pictures and come back to upload them.\n                    There's no time limit too, take as much time as you need. Make your story look good.\n                    <br>When you are done with uploading pictures, describing them and writing your story, you will be able to submit it to us for moderation.\n                    Once your story passes moderation, we will pay you for it and queue your story for publishing on kolostories.com.\n                    Once it is published, we'll give you a link to it, so you could share it with your friends and family.\n                </p>\n            </li>\n            <li>\n                <div class=\"hdg1\">What is required to pass moderation from first attempt?</div>\n                <p class=\"error\"><b>IMPORTANT!!! READ THIS CAREFULLY AND MAKE SURE YOU FOLLOW! OTHERWISE WE RESERVE RIGHT TO REMOVE INVITATION WITHOUT NOTICE!</b></p>\n                <p>\n                    - Upload your own photos. Don't take them from internet. <br>\n                    - Don't take street pictures from Google Maps. Take your own ones.<br>\n                    - Don't submit screenshots as your working space.<br>\n                    - Don't cut your pictures.<br>\n                    - No duplicates.<br>\n                    - No pictures taken in the dark.<br>\n                    - Make a good picture of yourself standing/sitting alone. No other objects should be present like fingers, people, etc. Stand or sit straight and look into the camera, its easy! Don't crop it, we will do it.<br>\n                    - Pictures shouldn't have professional quality, but good resolution is appriciated. Pictures taken on smartphone camera will be fine, but make sure you <b>clean your lens</b> before taking pictures. Many of you submit blurred pictures taken with dirty phones, we removed many invitation because of it.<br>\n                    - Accompany your photos with your story.\n                </p>\n            </li>\n            <li>\n                <div class=\"hdg1\">Examples of good stories</div>\n                <p>\n                    <a href=\"https://kolostories.com/contents/view/story/1676\" target=\"_blank\">https://kolostories.com/contents/view/story/1676</a> <br>\n                    <a href=\"https://kolostories.com/contents/view/story/2093\" target=\"_blank\">https://kolostories.com/contents/view/story/2093</a> <br>\n                    <a href=\"https://kolostories.com/contents/view/story/1275\" target=\"_blank\">https://kolostories.com/contents/view/story/1275</a> <br>\n                    <a href=\"https://kolostories.com/contents/view/story/1173\" target=\"_blank\">https://kolostories.com/contents/view/story/1173</a>\n                </p>\n            </li>\n        </ul>\n    </div>\n    <div class=\"readmore btn-manager\" button-action=\"readMore\" id=\"readMore\">\n        <span class=\"text\">Read more</span> <svg class=\"icon arrow-bottom\"><use xlink:href=\"#icon-arrow\" /></svg>\n    </div>\n    <div class=\"tac\"><a class=\"btn btn-primary btn-manager\" button-action=\"acceptInvite\">Accept Invitation</a></div>\n</div>\n</div>\n\n<div class=\"section\" id=\"editSection\" style=\"display: none\">\n\n<div class=\"story-block\">\n  <div class=\"hdg1\">1. Picture for avatar crop for kolostories.com</div>\n  <div class=\"right-wrong\">\n    <div class=\"right\">\n      <div class=\"title\">Correct:</div>\n      <div class=\"right-img\">\n        <svg><use xlink:href=\"#icon-check-cir\" /></svg>\n        <img src=\"/images/story1-right.png\" alt=\"\">\n      </div>\n      <div class=\"right-desc\">\n          <strong>Correct:</strong> make picture of yourself standing <b>straight</b>. Face completely must completely fit photo, some objects behind are ok.\n      </div>\n    </div>\n    <div class=\"wrong\">\n      <div class=\"title\">Incorrect:</div>\n      <div class=\"grid-2\">\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story1-wrong-profile.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Photo from side\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story1-wrong-angle.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Photo with angle\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story1-wrong-nocrop.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Head is out of visible range\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story1-wrong-others.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Your head is with with other people heads, animals or objects.\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card-white card-upload\" data-title=\"My Photo\">\n    <div class=\"desc\">\n      Please select a photo were you are smiling. Face must be visible,\n      body pose natural. Allow some space for crop with shoulders.\n          Don't put hands, people, animals or other objects in front of your face. The avatar picture is the most problematic because <b>most people</b> don't pay attention to this text.<br><br>\n\n        <div class=\"picture-requirements\"></div>\n\n    </div>\n    <div class=\"upload-slots\"></div>\n    <div class=\"story-desc\"></div>\n  </div>\n</div>\n\n<div class=\"story-block\">\n  <div class=\"hdg1\">2. Workspace picture</div>\n  <div class=\"right-wrong\">\n    <div class=\"right\">\n      <div class=\"title\">Correct:</div>\n      <div class=\"right-img\">\n        <svg><use xlink:href=\"#icon-check-cir\" /></svg>\n        <img src=\"/images/story2-right.png\" alt=\"\">\n      </div>\n      <div class=\"right-desc\">\n        <strong>Correct:</strong> computer is in 3-4 meters range, light is normal, table surface visible, screen contents visible. Screen must contain any page of Kolotibablo.com\n      </div>\n    </div>\n    <div class=\"wrong\">\n      <div class=\"title\">Incorrect:</div>\n      <div class=\"grid-2\">\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story2-wrong-turnedoff.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Screen shut down\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story2-wrong-dark.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Backlight is dark / screen is overhighlighted / screen contents not visible.\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story2-wrong-closeup.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Picture taken too close to computer\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story2-wrong-nocomp.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            No working device on picture.\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card-white card-upload\" data-title=\"My Workplace\">\n    <div class=\"desc\">\n      Please take a picture of your computer from distance 3-5 meters.\n      Computer screen must have browser opened on the main page\n      <a href=\"https://kolotibablo.com/\">https://kolotibablo.com/</a>. Order\n      on your desk is not required, it\n      should look natural. You are also welcome to upload pictures of the\n      building of the place where your working place is located.<br><br>\n\n      <div class=\"picture-requirements\"></div>\n    </div>\n    <div class=\"upload-slots\"></div>\n    <div class=\"story-desc\"></div>\n  </div>\n</div>\n\n<div class=\"story-block\">\n  <div class=\"hdg1\">3. Food pictures</div>\n  <div class=\"right-wrong\">\n    <div class=\"right\">\n      <div class=\"title\">Correct:</div>\n      <div class=\"right-img\">\n        <svg><use xlink:href=\"#icon-check-cir\" /></svg>\n        <img src=\"/images/story3-right.png\" alt=\"\">\n      </div>\n      <div class=\"right-desc\">\n        <strong>Correct:</strong> a picture of table with one or more plates with your favorite food.\n      </div>\n    </div>\n    <div class=\"wrong\">\n      <div class=\"title\">Incorrect:</div>\n      <div class=\"grid-2\">\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story3-wrong-coockies.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Various snickers and cookies.\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story3-wrong-selfie.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Food in hands or selfie with food.\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card-white card-upload\" data-title=\"My Food\">\n    <div class=\"desc\">\n      Please make a picture of the food you consume daily. Local dishes are\n      more preferred, something that would better describe your local culture.\n      If it is simple noodles or rice, this is ok too.<br><br>\n\n      <div class=\"picture-requirements\"></div>\n    </div>\n    <div class=\"upload-slots\"></div>\n    <div class=\"story-desc\"></div>\n  </div>\n</div>\n\n<div class=\"story-block\">\n  <div class=\"hdg1\">4. Street pictures</div>\n  <div class=\"right-wrong\">\n    <div class=\"right\">\n      <div class=\"title\">Correct:</div>\n      <div class=\"right-img\">\n        <svg><use xlink:href=\"#icon-check-cir\" /></svg>\n        <img src=\"/images/story4-right.png\" alt=\"\">\n      </div>\n      <div class=\"right-desc\">\n        <strong>Correct:</strong> a couple of photos taken outside your house with natural angle, so we could see roads, houses, plants, people, etc.\n      </div>\n    </div>\n    <div class=\"wrong\">\n      <div class=\"title\">Incorrect:</div>\n      <div class=\"grid-2\">\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story4-wrong-window.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">Pictures made by looking out of window\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story4-wrong-google.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Pictures from Google Street View\n          </div>\n        </div>\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story4-wrong-cropped.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Cropped / zoomed variation of \"correct\" photo.\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card-white card-upload\" data-title=\"My Street\">\n    <div class=\"desc\">\n      Please make a picture of the street you are living at. Just go out of\n      the place you live and take some shots. Don't make them somewhere in the city center, we need you to do it just outside your house.<br><br>\n\n      <div class=\"picture-requirements\"></div>\n    </div>\n    <div class=\"upload-slots\"></div>\n    <div class=\"story-desc\"></div>\n  </div>\n</div>\n\n<div class=\"story-block\">\n  <div class=\"hdg1\">5. Family pictures</div>\n  <div class=\"right-wrong\">\n    <div class=\"right\">\n      <div class=\"title\">Correct:</div>\n      <div class=\"right-img\">\n        <svg><use xlink:href=\"#icon-check-cir\" /></svg>\n        <img src=\"/images/story5-right.png\" alt=\"\">\n      </div>\n      <div class=\"right-desc\">\n        <strong>Correct:</strong> several people are watching to the camera\n      </div>\n    </div>\n    <div class=\"wrong\">\n      <div class=\"title\">Incorrect:</div>\n      <div class=\"grid-2\">\n        <div class=\"col\">\n          <div class=\"wrong-img\">\n            <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n            <img src=\"/images/story5-wrong-pet.png\" alt=\"\">\n          </div>\n          <div class=\"wrong-desc\">\n            Pictures with animals\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card-white card-upload\" data-title=\"My Family\">\n    <div class=\"desc\">\n      Please take a picture of your family members or friends. It can be a\n      group photo, or individual pictures of people you value the most.\n      Please select pictures where people are smiling.<br><br>\n\n      <div class=\"picture-requirements\"></div>\n    </div>\n    <div class=\"upload-slots\"></div>\n    <div class=\"story-desc\"></div>\n  </div>\n</div>\n\n\n\n<div class=\"story-block\">\n  <div class=\"hdg1\">6. Your room pictures</div>\n\n  <div class=\"card-white card-upload\" data-title=\"My Home\">\n    <div class=\"desc\">\n      Please take a few different pictures in the place where you live.\n      It can be a picture of the room where you sleep, maybe a living room where you watch TV (if you have it), or any other photos which will make us learn your living conditions.\n      <br><br>\n\n      <div class=\"picture-requirements\"></div>\n    </div>\n    <div class=\"upload-slots\"></div>\n    <div class=\"story-desc\"></div>\n  </div>\n</div>\n\n<div class=\"story-rules\">\n  <div class=\"hdg1 tac\">Common rules</div>\n  <div class=\"grid-3 wrong\">\n    <div class=\"col\">\n      <div class=\"wrong-img\">\n        <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n        <img src=\"/images/storyrule-blur.png\" alt=\"\">\n      </div>\n      <div class=\"wrong-desc\">\n        No blurred pictures or pictures taken with dirty lens\n      </div>\n    </div>\n    <div class=\"col\">\n      <div class=\"wrong-img\">\n        <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n        <img src=\"/images/storyrule-night.png\" alt=\"\">\n      </div>\n      <div class=\"wrong-desc\">\n        No night photos, only daytime pictures\n      </div>\n    </div>\n    <div class=\"col\">\n      <div class=\"wrong-img\">\n        <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n        <img src=\"/images/storyrule-shrink.png\" alt=\"\">\n      </div>\n      <div class=\"wrong-desc\">\n        No resizes\n      </div>\n    </div>\n    <div class=\"col\">\n      <div class=\"wrong-img\">\n        <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n        <img src=\"/images/storyrule-duplicates.png\" alt=\"\">\n      </div>\n      <div class=\"wrong-desc\">\n        No duplicates\n      </div>\n    </div>\n    <div class=\"col\">\n      <div class=\"wrong-img\">\n        <svg><use xlink:href=\"#icon-x-cir\" /></svg>\n        <img src=\"/images/storyrule-whitespace.png\" alt=\"\">\n      </div>\n      <div class=\"wrong-desc\">\n        Don't add empty spaces around the picture\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"card-white submit-story\">\n  <form class=\"form\">\n    <div class=\"form-row\">\n      <label for=\"\">Your name</label>\n      <input type=\"text\" name=\"\" id=\"authorName\" class=\"inp-dft w100p\">\n    </div>\n    <div class=\"form-row\">\n      <label for=\"\">Where are you from?</label>\n      <div class=\"adropdown dib\" id=\"countrySelector\" loader-function=\"getCountries\" default-value=\"AF\" width=\"300px\" callback-function=\"setCountry\" callback-parameter=\"countryName\"></div>\n    </div>\n    <div class=\"form-row\">\n      <label for=\"\">Your story:</label>\n      <textarea name=\"name\" rows=\"8\" class=\"inp-dft w100p\" id=\"storyText\" placeholder=\"Your story here\"></textarea>\n    </div>\n    <div class=\"form-row\">\n\n      <div class=\"check-wrap\">\n        <input type=\"checkbox\" name=\"checkbox\" id=\"termsCheckbox\" class=\"btn-manager\" button-action=\"termsCheckbox\">\n        <label for=\"termsCheckbox\" class=\"checkbox\">\n          <span class=\"faked-control\"><div class=\"checkmark\"></div></span>\n          <span class=\"label-text\">I agree with <a href=\"/kolostories_terms.html\">copyright agreement</a></span>\n        </label>\n      </div>\n    </div>\n    <div class=\"form-row\">\n      <button class=\"btn btn-primary btn-manager btn-disabled\" id=\"submitStoryButton\" button-action=\"submitStory\">Send to moderation</button>\n    </div>\n  </form>\n  <div class=\"desc\">\n    <div class=\"hdg1\">WHAT DO I NEED TO TELL IN MY STORY?</div>\n    <ul class=\"list-bull\">\n      <li>Tell us when your started working at the project.</li>\n      <li>How KB changed your life.</li>\n      <li>Any special message to our customers?</li>\n      <li>Any other things or stories related to KB. The more the better.</li>\n    </ul>\n\n    <p>\n      <strong>\n        For your comfort images and text are saved automatically. You can\n        close your browser and return to it again at any time.\n      </strong>\n    </p>\n\n    <div class=\"hdg1\">WHAT IS REQUIRED TO PASS MODERATION FROM FIRST ATTEMPT?</div>\n    <ul class=\"list-bull\">\n      <li>Upload your own photos. Don't take them from internet. We will find such ones and remove your invitation.</li>\n      <li>Follow guidelines.</li>\n      <li>Submit quality pictures with good resolution.</li>\n      <li>Don't try to cheat us please, stories are reviewed manually.</li>\n      <li>Accompany your photos with good story.</li>\n    </ul>\n\n    <div class=\"hdg1\">EXAMPLES OF GOOD STORIES</div>\n    <a href=\"https://kolostories.com/contents/view/story/1676\" target=\"_blank\">https://kolostories.com/contents/view/story/1676</a><br>\n    <a href=\"https://kolostories.com/contents/view/story/2093\" target=\"_blank\">https://kolostories.com/contents/view/story/2093</a><br>\n    <a href=\"https://kolostories.com/contents/view/story/1275\" target=\"_blank\">https://kolostories.com/contents/view/story/1275</a><br>\n    <a href=\"https://kolostories.com/contents/view/story/1173\" target=\"_blank\">https://kolostories.com/contents/view/story/1173</a>\n  </div>\n</div>\n\n</div>\n\n<div class=\"section\" id=\"successSection\" style=\"display: none\">\n    <div class=\"invite-wrap\">\n        <div class=\"tac\"><img src=\"/images/kolostories-logo-big.png\" alt=\"\"></div>\n        <div class=\"wlimit-faq tac\">\n            <div class=\"hdg1\">Thank you for your story.</div>\n            Your story sent to moderation! Please check your story status regularly at this page, because we might ask you to fix something in your pictures or description.\n            If everything goes normally, your story will be accepted, queued for publishing and you will receive your honorarium on your protected balance.\n        </div>\n    </div>\n</div>\n\n<div class=\"section\" id=\"deniedSection\" style=\"display: none\">\n    <div class=\"invite-wrap\">\n        <div class=\"tac\"><img src=\"/images/kolostories-logo-big.png\" alt=\"\"></div>\n        <div class=\"wlimit-faq tac\">\n            <div class=\"hdg1\">Please fix your story!</div>\n            Our moderator checked your story and denied it for approval with the following reason:<br><br>\n            <div id=\"reason\" style=\"font-weight: bold\"></div>\n            <br><br>\n        </div>\n        <div class=\"tac\"><a class=\"btn btn-primary btn-manager\" button-action=\"acceptInvite\">Fix story</a></div>\n    </div>\n</div>\n\n<div class=\"section\" id=\"moderatedSection\" style=\"display: none\">\n    <div class=\"invite-wrap\">\n        <div class=\"tac\"><img src=\"/images/kolostories-logo-big.png\" alt=\"\"></div>\n        <div class=\"wlimit-faq tac\">\n            <div class=\"hdg1\">Congratulations!</div>\n            Your story has passed moderation and is queued for publishing on <span id=\"publishDate\"></span>.\n        </div>\n    </div>\n</div>\n\n<div class=\"section\" id=\"publishedSection\" style=\"display: none\">\n    <div class=\"invite-wrap\">\n        <div class=\"tac\"><img src=\"/images/kolostories-logo-big.png\" alt=\"\"></div>\n        <div class=\"wlimit-faq tac\">\n            <div class=\"hdg1\">Congratulations!</div>\n            Your story has passed moderation and will be published at <span id=\"publishLink\"></span> on <span id=\"publishDate2\"></span>.\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['hpage_tools_unban'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"wlimit settings\">\n\n\n    <div class=\"grid\">\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">RP Balance</div>\n            <div class=\"desc\">\n                Balance in recaptcha points. You can earn these points by solving recaptchas via web interface or desktop application.\n            </div>\n        </div>\n        <div class=\"controls col-5_xs-12\">\n            <span class=\"font24 fontbold\" id=\"rpbalance\"></span>\n        </div>\n    </div>\n\n    <div class=\"grid\">\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">Unban myself</div>\n            <div class=\"desc\">\n                Unban your account and restore access to image captchas. Cost: 2,000 recaptcha points.\n            </div>\n        </div>\n        <div class=\"controls col-5_xs-12\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"unbanMyself\">unban myself</button>\n        </div>\n    </div>\n\n\n\n    <div class=\"grid\">\n        <div class=\"option col-7_xs-12\">\n            <div class=\"title\">Unban others</div>\n            <div class=\"desc\">\n                Unban account of your friend. Cost: 2,000 recaptcha points.\n            </div>\n        </div>\n        <div class=\"controls col-5_xs-12\">\n            <input type=\"text\" class=\"inp-dft w50p margintop10px\" id=\"targetEmail\" placeholder=\"account email\">\n            <button class=\"btn btn-primary btn-manager\" button-action=\"unbanOthers\">unban friend</button>\n        </div>\n    </div>\n\n\n</div>";
},"useData":true});
templates['informationBlock'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"close btn-hide\"><svg class=\"icon\"><use xlink:href=\"#icon-cross\" /></svg></div>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"title\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div class=\"desc\">"
    + ((stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"message","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>";
},"7":function(container,depth0,helpers,partials,data) {
    return "<button class=\"btn btn-hide\">Hide</button>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<div class=\"infoblock\" id=\"randid"
    + container.escapeExpression(((helper = (helper = helpers.randid || (depth0 != null ? depth0.randid : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"randid","hash":{},"data":data}) : helper)))
    + "\">\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.closable : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"wlimit\">\n        "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.title : depth0),"!=","",{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.message : depth0),"!=","",{"name":"ifCond","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.closable : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n</div>\n";
},"useData":true});
templates['mainDocumentLayoutLanguageSelector'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"language btn-manager\" button-action=\"Anti.topMenuManager.callSetLanguageCallback\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <span class=\"flag flag-"
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "\"></span>\n            "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n        </div><br>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"lang-flags\" style=\"opacity:0\">\n    <span class=\"icon flag flag-"
    + container.escapeExpression(((helper = (helper = helpers.currentLangId || (depth0 != null ? depth0.currentLangId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currentLangId","hash":{},"data":data}) : helper)))
    + "\"></span>\n    <div class=\"lang-flags-list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.languages : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});
templates['mainDocumentLayoutSidebar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sb-header grid-middle grid-noGutter\">\n    <div class=\"col\">\n        <span class=\"bat-med\">\n    <span class=\"balance anti-navigate pointer\" id=\"workerBalance\" data-navigate=\"finance/withdraw\">$0.0</span>\n</span>\n        <a class=\"logout btn-manager\" button-action=\"Anti.entrance.logOut\"><img src=\"/images/icon-logout.png\"></a>\n    </div>\n</div>\n\n<div class=\"menu\">\n<div class=\"menu-item\" id=\"menu1\">\n    <div class=\"head\">\n        <img src=\"/images/icon-work.png\" alt=\"\" class=\"menu-icon\">\n        <span class=\"label\">Captchas</span>\n        <img src=\"/images/caret.png\" alt=\"\" class=\"caret\">\n    </div>\n    <ul class=\"submenu\">\n        <li><a data-navigate=\"start\">Start Working</a></li>\n        <li><a data-navigate=\"reports/stats\">My Stats</a></li>\n        <li><a data-navigate=\"captchas/errors\">My Errors</a></li>\n        <li><a data-navigate=\"captchas/toplist\">Top Workers</a></li>\n        <li><a data-navigate=\"reports/systemstats\">System Stats</a></li>\n    </ul>\n</div>\n<div class=\"menu-item\" id=\"menu7\">\n    <div class=\"head\">\n        <img src=\"/images/icon-factory.png\" alt=\"\" class=\"menu-icon\">\n        <span class=\"label\">Factories</span>\n        <img src=\"/images/caret.png\" alt=\"\" class=\"caret\">\n    </div>\n    <ul class=\"submenu\">\n        <li><a data-navigate=\"factory/directory\">Factories Directory</a></li>\n        <li><a data-navigate=\"reports/fstats\">My Stats</a></li>\n    </ul>\n</div>\n<div class=\"menu-item\" id=\"menu2\">\n    <div class=\"head\">\n        <img src=\"/images/icon-finances.png\" alt=\"\" class=\"menu-icon\">\n        <span class=\"label\">Finance</span>\n        <img src=\"/images/caret.png\" alt=\"\" class=\"caret\">\n    </div>\n    <ul class=\"submenu\">\n        <li><a data-navigate=\"finance/withdraw\">Withdraw</a></li>\n        <li><a data-navigate=\"finance/history\">History</a></li>\n    </ul>\n</div>\n<div class=\"menu-item\" id=\"menu3\">\n    <div class=\"head\">\n        <img src=\"/images/icon-settings.png\" alt=\"\" class=\"menu-icon\">\n        <span class=\"label\">Settings</span>\n        <img src=\"/images/caret.png\" alt=\"\" class=\"caret\">\n    </div>\n    <ul class=\"submenu\">\n        <li><a data-navigate=\"settings/account\">Account</a></li>\n        <li><a data-navigate=\"settings/profile\">Profile</a></li>\n    </ul>\n</div>\n<div class=\"menu-item\" id=\"menu4\">\n    <div class=\"head\">\n        <img src=\"/images/icon-moneybag.png\" class=\"menu-icon\">\n        <span class=\"label\">Referrals</span>\n        <img src=\"/images/caret.png\" class=\"caret\">\n    </div>\n    <ul class=\"submenu\">\n        <li><a data-navigate=\"tools/referrals\">Links & Stats</a></li>\n        <li><a data-navigate=\"tools/reftop\">Top Referrers</a><span class=\"refprogram-badge\">&nbsp;<sup class=\"menu-badge-new\">New</sup></span></li>\n    </ul>\n</div>\n<div class=\"menu-item\" id=\"menu5\">\n    <div class=\"head\">\n        <img src=\"/images/icon-instruments.png\" alt=\"\" class=\"menu-icon\">\n        <span class=\"label\">Tools</span>\n        <img src=\"/images/caret.png\" alt=\"\" class=\"caret\">\n    </div>\n    <ul class=\"submenu\">\n        <li><a data-navigate=\"tools/pump\">Gmail Pumping</a></li>\n        <li><a data-navigate=\"tools/unban\">Captchas Unban</a></li>\n        <li><a data-navigate=\"tools/fingerprint\">Fingerprint Check</a></li>\n    </ul>\n</div>\n<div class=\"menu-item\" id=\"menu6\">\n    <div class=\"head\">\n        <img src=\"/images/icon-help.png\" alt=\"\" class=\"menu-icon\">\n        <span class=\"label\">Information</span>\n        <img src=\"/images/caret.png\" alt=\"\" class=\"caret\">\n    </div>\n    <ul class=\"submenu\">\n        <li><a data-navigate=\"info/faq\">FAQ</a></li>\n        <li><a data-navigate=\"info/priority\">Captcha Priority</a></li>\n        <li><a data-navigate=\"info/recaptchaupdates\">Recaptcha News</a></li>\n        <li><a data-navigate=\"info/plugin\">Install Plugin</a></li>\n        <li><a data-navigate=\"info/cert\">Install Certificate</a></li>\n        <li><a data-navigate=\"info/app\">Download Application</a></li>\n        <li><a data-navigate=\"info/ratingsinfo\">Ratings Info</a></li>\n    </ul>\n</div>\n<div class=\"kolostories-invite active\" id=\"kolostoriesInvite\" style=\"display: none; animation: blink 0.5s 10 alternate\">\n    <a data-navigate=\"tools/story\" class=\"btn anti-navigate\"><img src=\"/images/kolostories-logo.png\"> Kolostories invite</a>\n</div>\n</div>\n";
},"useData":true});
templates['mainDocumentLayoutTopbar'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "1";
},"3":function(container,depth0,helpers,partials,data) {
    return "0";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"header grid-middle grid-noGutter\" id=\"mainDocumentHeader\">\n    <div class=\"col-3_sm-4\">\n        <span class=\"anti-loader\"></span>\n        <a data-navigate=\"reports/dashboard\" class=\"logo anti-navigate\"><img src=\"/images/logo.png\"></a></div>\n    <div class=\"col page-header nowrap\" id=\"headerTitle\">Welcome</div>\n    <div class=\"col-3_sm-4_xs-8 infoicons\">\n        <span class=\"searchbar-wrap\" style=\"opacity: "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.searchBar : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n            <label for=\"spotlight\"><svg class=\"icon\"><use xlink:href=\"#icon-magnifier\" /></svg></label>\n            <input type=\"text\" class=\"searchbar\" id=\"spotlightInput\" callback-function=\"Anti.topMenuManager.stoplightType\" callback-parameter=\"stoplightText\" callback-speed=\"10\" title=\"Search box to quickly find something in this website\" role=\"search\">\n            <div class=\"search-close btn-manager\" button-action=\"Anti.topMenuManager.hideSpotLight\">\n                <svg class=\"icon\"><use xlink:href=\"#icon-cross\" /></svg>\n                <span>Close</span>\n            </div>\n        </span>\n        <span class=\"btn-start-work anti-navigate\" data-navigate=\"earn\">\n    <svg class=\"icon\"><use xlink:href=\"#icon-worker\" /></svg>\n    <span class=\"label\">Start working</span>\n</span>\n        <span class=\"info-bell\" style=\"display:none\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-bell\" /></svg>\n        </span>\n        <span class=\"info-flags\">\n            <span class=\"icon flag\"></span>\n        </span>\n        <span class=\"mobmenu visible-sm\">Menu</span>\n        <div class=\"msg-list\"></div>\n        <div class=\"flags-list\"></div>\n    </div>\n</div>  \n";
},"useData":true});
templates['mainDocumentLayoutTopbarFlag'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"language btn-manager\" button-action=\"Anti.topMenuManager.callSetLanguageCallback\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <span class=\"flag flag-"
    + alias4(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"code","hash":{},"data":data}) : helper)))
    + "\"></span>\n    "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n</div><br>\n";
},"useData":true});
templates['mainDocumentLayoutTopbarMessage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"msg msg-"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " btn-manager\" button-action=\"Anti.topMenuManager.showNotification\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n</div>\n";
},"useData":true});
templates['mycardTableRow'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n<td>"
    + alias4(((helper = (helper = helpers.card || (depth0 != null ? depth0.card : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"card","hash":{},"data":data}) : helper)))
    + "</td>\n<td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>\n";
},"useData":true});
templates['mycardTableRowEmpty'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<tr>\n<td colspan=3 align=center>no cards yet</td>\n</tr>\n";
},"useData":true});
templates['newPumpTaskAvailable'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<svg class=\"icon\" style=\"color:#ffa200\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-cross\"></use></svg>\n&nbsp;\nNew tasks available: "
    + container.escapeExpression(((helper = (helper = helpers.pumpTasksCount || (depth0 != null ? depth0.pumpTasksCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pumpTasksCount","hash":{},"data":data}) : helper)))
    + "\n&nbsp;&nbsp;\n<span class=\"dash-link\" data-navigate=\"tools/pump\">See tasks</span>\n";
},"useData":true});
templates['newPumpTaskNotUsing'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<svg class=\"icon\" style=\"color:red\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-cross\"></use></svg>\n&nbsp;&nbsp;&nbsp;Highly recommended for Recaptcha speeding<br>\n<span class=\"dash-link\" data-navigate=\"tools/pump\" style=\"margin-left:36px\">Start pumping</span>\n";
},"useData":true});
templates['pincodeStepWarning'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Important message</span>\n</div>\n<form class=\"form form-one-two\" form-action=\"Anti.dialogsManager.close\" id=\"pinSetForm\">\n    <div class=\"body\">\n        <div class=\"error font20 tac\">Warning! Write down your pin code!</div>\n        <h1 class=\"tac\" style=\"font-size:60px\">"
    + container.escapeExpression(((helper = (helper = helpers.pin || (depth0 != null ? depth0.pin : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pin","hash":{},"data":data}) : helper)))
    + "</h1>\n        <div>It is not possible to recover PIN code in case you forget it!.<br>\n        Knowing your PIN is the only way to withdraw money from your account!\n        </div>\n    </div>\n    <div class=\"foot\">\n        <button class=\"btn btn-primary\" type=\"submit\">OK</button>\n    </div>\n</form>\n";
},"useData":true});
templates['pluginVersionCorrectLabel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<svg class=\"icon\" style=\"color:green\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-check\"></use></svg>\n&nbsp;&nbsp;&nbsp;\n"
    + container.escapeExpression(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"version","hash":{},"data":data}) : helper)))
    + "\n";
},"useData":true});
templates['pluginVersionIncorrectLabel'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<svg class=\"icon\" style=\"color:#ffa200\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-cross\"></use></svg>\n&nbsp;&nbsp;&nbsp;\n"
    + container.escapeExpression(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"version","hash":{},"data":data}) : helper)))
    + "\n&nbsp;&nbsp;&nbsp;\n<span class=\"dash-link\" data-navigate=\"info/plugin\">Download update</span>\n";
},"useData":true});
templates['pumpAccountRemoveDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Confirm removal</span>\n</div>\n<div class=\"form form-one-two\">\n    <div class=\"body\">\n        Are you sure you want to remove this account?\n    </div>\n</div>\n\n<div class=\"foot\">\n    <button class=\"btn btn-primary btn-manager\" button-action=\"removeAccountConfirm\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Remove</button>\n    <button class=\"btn btn-side btn-cancel\">Cancel</button>\n</div>\n";
},"useData":true});
templates['pumpAccountRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "            "
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"en",{"name":"case","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            "
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"ru",{"name":"case","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            "
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"sp",{"name":"case","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "English";
},"4":function(container,depth0,helpers,partials,data) {
    return "Russian";
},"6":function(container,depth0,helpers,partials,data) {
    return "Spanish";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"smaller error fontbold\">Emails not found: "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.emailSentNotFound : stack1), depth0))
    + "</div>";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"smaller\">Emails not found: "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.emailSentNotFound : stack1), depth0))
    + "</div>";
},"12":function(container,depth0,helpers,partials,data) {
    return "<div class=\"tac smaller\">no tasks yet</div>";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <table class=\"w100p\">\n            <thead>\n                <tr>\n                <td>ID</td>\n                <td>Date</td>\n                <td>Task</td>\n                <td>Status</td>\n                <td>Actions</td>\n                </tr>\n            </thead>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.tasks : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </table>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <tr>\n                <td>"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "</td>\n                <td>"
    + alias4(((helper = (helper = helpers.add_date || (depth0 != null ? depth0.add_date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"add_date","hash":{},"data":data}) : helper)))
    + "</td>\n                <td>\n                    "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"==","email",{"name":"ifCond","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"==","email-incoming",{"name":"ifCond","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"==","search",{"name":"ifCond","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"==","youtube",{"name":"ifCond","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                </td>\n                <td>"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "</td>\n                <td>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"in","new|viewed",{"name":"ifCond","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"==","viewed",{"name":"ifCond","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </td>\n            </tr>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "Send email";
},"18":function(container,depth0,helpers,partials,data) {
    return "Confirm incoming email";
},"20":function(container,depth0,helpers,partials,data) {
    return "Search Google";
},"22":function(container,depth0,helpers,partials,data) {
    return "Watch Youtube";
},"24":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <button class=\"btn btn-default btn-manager small\" button-action=\"startTask\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                        <svg class=\"icon\"><use xlink:href=\"#icon-play\"></use></svg>\n                        <label>Start</label>\n                    </button>\n";
},"26":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                    <button class=\"btn btn-default btn-manager small\" button-action=\"startTask\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                        <svg class=\"icon\"><use xlink:href=\"#icon-check\"></use></svg>\n                        <label>Mark as complete</label>\n                    </button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<tr>\n    <td>"
    + alias4(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"login","hash":{},"data":data}) : helper)))
    + "@gmail.com : "
    + alias4(((helper = (helper = helpers.password || (depth0 != null ? depth0.password : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"password","hash":{},"data":data}) : helper)))
    + "\n        <div class=\"smaller\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + ",\n"
    + ((stack1 = (helpers["switch"] || (depth0 && depth0["switch"]) || alias2).call(alias1,(depth0 != null ? depth0.language_code : depth0),{"name":"switch","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </td>\n    <td>\n        <div class=\"smaller\">Sent mails: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.emailSent : stack1), depth0))
    + "</div>\n        <div class=\"smaller\">Received mails: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.emailReceived : stack1), depth0))
    + "</div>\n        <div class=\"smaller\">Confirmed receivings: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.emailSentConfirm : stack1), depth0))
    + "</div>\n        "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.emailSentNotFound : stack1),">",3,{"name":"ifCond","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.emailSentNotFound : stack1),"<",3,{"name":"ifCond","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </td>\n    <td class=\"tar\">\n        <button class=\"btn btn-default btn-manager medium\" button-action=\"editAccountDialog\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-pencil\"></use></svg>\n            <label>Edit</label>\n        </button>\n        <button class=\"btn btn-default btn-manager medium\" button-action=\"removeAccount\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <svg class=\"icon\"><use xlink:href=\"#icon-trash\"></use></svg>\n            <label>Remove</label>\n        </button>\n    </td>\n</tr>\n<tr>\n    <td colspan=\"3\" class=\"compact-table\">\n        "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.tasks : depth0),{"name":"unless","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.tasks : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </td>\n\n</tr>\n";
},"useData":true});
templates['pumpAccountRowEmpty'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<tr>\n<td colspan=\"4\" align=\"center\">no accounts yet</td>\n</tr>\n";
},"useData":true});
templates['pumpGMailIncomingEmailTaskView'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "<div class=\"form form-one-two card-white zebra\">\n    <div class=\"body\">\n        <div class=\"card-white padding10px w50p mauto0 marginbottom20px\">\n            1. Login into www.gmail.com with following login and password:<br>\n            Login: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.account : depth0)) != null ? stack1.login : stack1), depth0))
    + "@gmail.com<br>\n            Password: "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.account : depth0)) != null ? stack1.password : stack1), depth0))
    + "<br>\n            2. Check that you have received email from specified recipient.<br>\n            3. Confirm receiving or tell us that email is missing.\n        </div>\n        <div class=\"form-row\">\n            <label class=\"one\">Sender's address</label>\n            <div class=\"two\">\n                "
    + alias2(((helper = (helper = helpers.fromMail || (depth0 != null ? depth0.fromMail : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"fromMail","hash":{},"data":data}) : helper)))
    + "\n            </div>\n        </div>\n\n        <div class=\"form-row\">\n            <label class=\"one\">Email's subject</label>\n            <div class=\"two\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.subject : stack1), depth0))
    + "\n            </div>\n        </div>\n\n        <div class=\"form-row\">\n            <label class=\"one\">Email's author name</label>\n            <div class=\"two\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.author : stack1), depth0))
    + "\n            </div>\n        </div>\n\n    </div>\n    <div class=\"foot tac paddingtop20px\">\n        <button class=\"btn btn-primary btn-manager\" button-action=\"confirmEmailReceived\" action-parameter=\""
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">I've found this email</button>\n        <button class=\"btn btn-primary btn-manager\" button-action=\"confirmEmailNotReceived\" action-parameter=\""
    + alias2(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">I did not find this email</button>\n    </div>\n</div>\n";
},"useData":true});
templates['pumpGMailOutgoingEmailTaskView'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "<form class=\"form form-one-two card-white zebra\" form-action=\"confirmTaskSend\" id=\"confirmTaskSend\" action-parameter=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\" form-block-processing=\"true\">\n\n    <div class=\"body\">\n        <div class=\"card-white padding10px w50p mauto0 marginbottom20px\">\n            1. Login into www.gmail.com with following login and password:<br>\n            Login: "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.account : depth0)) != null ? stack1.login : stack1), depth0))
    + "@gmail.com<br>\n            Password: "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.account : depth0)) != null ? stack1.password : stack1), depth0))
    + "<br>\n            2. Send email to recipient below. Use given email subject and text.<br>\n            3. Confirm sending email.\n        </div>\n        <div class=\"form-row\">\n            <label class=\"one\">Send email to address</label>\n            <div class=\"two\">\n                <input type=\"text\" class=\"inp-dft db w100p\" value=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.email : stack1), depth0))
    + "\">\n            </div>\n        </div>\n\n        <div class=\"form-row\">\n            <label class=\"one\">Email's subject</label>\n            <div class=\"two\">\n                <input type=\"text\" class=\"inp-dft dib w100p\" value=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.subject : stack1), depth0))
    + "\">\n            </div>\n        </div>\n\n        <div class=\"form-row\">\n            <div class=\"one\">Text</div>\n            <div class=\"two\">\n                <textarea class=\"inp-dft db w100p\" rows=\"5\">"
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.body : stack1), depth0))
    + "</textarea>\n            </div>\n        </div>\n\n    </div>\n    <div class=\"foot tac paddingtop20px\">\n        <button class=\"btn btn-primary\" type=\"submit\">I've sent this email</button>\n    </div>\n</form>\n";
},"useData":true});
templates['pumpGMailRecordEdit'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<form class=\"form form-one-two card-white zebra\" form-action=\""
    + alias4(((helper = (helper = helpers.action || (depth0 != null ? depth0.action : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"action","hash":{},"data":data}) : helper)))
    + "\" id=\"saveForm\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" form-block-processing=\"true\">\n    <div class=\"body\">\n\n        <div class=\"form-row\">\n            <label class=\"one\">Owner Name *</label>\n            <div class=\"two\">\n                <input type=\"text\" class=\"inp-dft db w100p\" id=\"name\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n                <span class=\"error-msg\"></span>\n            </div>\n        </div>\n\n        <div class=\"form-row\">\n            <label class=\"one\">Login *</label>\n            <div class=\"two\">\n                <input type=\"text\" class=\"inp-dft dib w50p\" id=\"login\" value=\""
    + alias4(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"login","hash":{},"data":data}) : helper)))
    + "\">@gmail.com\n                <span class=\"error-msg\"></span>\n            </div>\n        </div>\n\n        <div class=\"form-row\">\n            <div class=\"one\">Password\n            <div class=\"smaller\">Optional, for auto-login features</div>\n            </div>\n            <div class=\"two\">\n                <input type=\"text\" class=\"inp-dft db w50p\" id=\"password\" value=\""
    + alias4(((helper = (helper = helpers.password || (depth0 != null ? depth0.password : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"password","hash":{},"data":data}) : helper)))
    + "\">\n            </div>\n        </div>\n\n        <div class=\"form-row\">\n            <div class=\"one\">Emails language\n            <div class=\"smaller\">You will send and receive emails in this language</div>\n            </div>\n            <div class=\"two\">\n                <div class=\"adropdown\" default-value=\""
    + alias4(((helper = (helper = helpers.language_code || (depth0 != null ? depth0.language_code : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"language_code","hash":{},"data":data}) : helper)))
    + "\" width=\"250px\" callback-parameter=\"language_code\">\n                    <option value=\"en\">English</option>\n                    <option value=\"ru\">Russian</option>\n                    <option value=\"es\">Spanish</option>\n                </div>\n            </div>\n        </div>\n\n    </div>\n    <div class=\"foot tac paddingtop20px\">\n        <button class=\"btn btn-primary\" type=\"submit\">Save</button>\n        <button class=\"btn btn-side btn-cancel\">Cancel</button>\n    </div>\n</form>\n";
},"useData":true});
templates['pumpGMailSearchTaskView'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "<form class=\"form form-one-two card-white zebra\" form-action=\"confirmTaskSend\" id=\"confirmTaskSearch\" action-parameter=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\" form-block-processing=\"true\">\n\n    <div class=\"body\">\n        <div class=\"card-white padding10px w50p mauto0 marginbottom20px\">\n            1. Login into www.gmail.com with following login and password:<br>\n            Login: "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.account : depth0)) != null ? stack1.login : stack1), depth0))
    + "@gmail.com<br>\n            Password: "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.account : depth0)) != null ? stack1.password : stack1), depth0))
    + "<br>\n            2. Open google.com and paste given search string.<br>\n            3. Click 1 or 2 links in search results and open them in new tabs. Switch to these tabs.<br>\n            4. Wait a couple of seconds and close tabs, then close Google search.<br>\n            5. Confirm task accomplishment.\n        </div>\n        <div class=\"form-row\">\n            <label class=\"one\">Keyword</label>\n            <div class=\"two\">\n                <input type=\"text\" class=\"inp-dft db w100p\" value=\""
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.keyword : stack1), depth0))
    + "\">\n            </div>\n        </div>\n\n    </div>\n    <div class=\"foot tac paddingtop20px\">\n        <button class=\"btn btn-primary\" type=\"submit\">Task completed</button>\n    </div>\n</form>\n";
},"useData":true});
templates['pumpGMailYoutubeTaskView'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "<form class=\"form form-one-two card-white zebra\" form-action=\"confirmTaskSend\" id=\"confirmTaskYoutube\" action-parameter=\""
    + alias1(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\" form-block-processing=\"true\">\n\n    <div class=\"body\">\n        <div class=\"card-white padding10px w100p mauto0 marginbottom20px\">\n            1. Login into www.gmail.com with following login and password:<br>\n            Login: "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.account : depth0)) != null ? stack1.login : stack1), depth0))
    + "@gmail.com<br>\n            Password: "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.account : depth0)) != null ? stack1.password : stack1), depth0))
    + "<br>\n            2. Open given Youtube link.<br>\n            3. Do one of the following to let Google know that you really watched this clip:<br>\n\n            &nbsp;&nbsp;&nbsp;&nbsp;Option A: Watch clip from the beginning till the end if you like it.<br>\n            &nbsp;&nbsp;&nbsp;&nbsp;Option B: Leave clip running in background tab and mute sound in your computer (not in youtube player!).<br>\n            &nbsp;&nbsp;&nbsp;&nbsp;Option C: Watch a few seconds at the beginning then scroll to the end of the clip and let it finish.<br>\n\n            4. Close tabs. Confirm task accomplishment.\n        </div>\n        <div class=\"form-row\">\n            <label class=\"one\">Youtube link</label>\n            <div class=\"two\">\n                <input type=\"text\" class=\"inp-dft db w100p\" value=\"https://youtube.com/watch?v="
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.task : depth0)) != null ? stack1.code : stack1), depth0))
    + "\">\n            </div>\n        </div>\n\n    </div>\n    <div class=\"foot tac paddingtop20px\">\n        <button class=\"btn btn-primary\" type=\"submit\">Task completed</button>\n    </div>\n</form>\n";
},"useData":true});
templates['recaptchaSpeedInfo'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"smaller\">Your recaptcha solving speed: "
    + alias4(((helper = (helper = helpers.recaptchaSpeed || (depth0 != null ? depth0.recaptchaSpeed : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"recaptchaSpeed","hash":{},"data":data}) : helper)))
    + "s, priority "
    + alias4(((helper = (helper = helpers.recaptchaPriority || (depth0 != null ? depth0.recaptchaPriority : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"recaptchaPriority","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"useData":true});
templates['recaptchaUpdateVersions'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col\">\n    <div class=\"item\">\n        <div class=\"curr-name\">"
    + alias4(((helper = (helper = helpers.version || (depth0 != null ? depth0.version : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"version","hash":{},"data":data}) : helper)))
    + "</div>\n        <div class=\"summ\">"
    + alias4(((helper = (helper = helpers.avgtime || (depth0 != null ? depth0.avgtime : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"avgtime","hash":{},"data":data}) : helper)))
    + " s</div>\n    </div>\n</div>\n";
},"useData":true});
templates['recaptchaupdateIpInfo'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n<td>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</td>\n<td>"
    + alias4(((helper = (helper = helpers.ip || (depth0 != null ? depth0.ip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ip","hash":{},"data":data}) : helper)))
    + "</td>\n<td>"
    + alias4(((helper = (helper = helpers.others || (depth0 != null ? depth0.others : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"others","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>\n";
},"useData":true});
templates['recaptchaupdatecontent'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"hdg1\">Update "
    + container.escapeExpression(((helper = (helper = helpers.add_date || (depth0 != null ? depth0.add_date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"add_date","hash":{},"data":data}) : helper)))
    + "</div>\n<div class=\"wlimit-faq padding10px tal\">"
    + ((stack1 = ((helper = (helper = helpers.instruction || (depth0 != null ? depth0.instruction : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"instruction","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['referralsGeneratelinkDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Terms and conditions</span>\n</div>\n<form action=\"\" class=\"form form-one-two\" id=\"confirmTermsForm\" form-action=\"createLink\" form-block-processing=\"true\">\n    <div class=\"body\">\n        <div class=\"scrollable\" id=\"termsDialog\"></div>\n    </div>\n    <div class=\"foot padding10px\">\n        <button class=\"btn btn-primary\">Confirm</button>\n        <button class=\"btn btn-side btn-cancel\">Cancel</button>\n    </div>\n</form>\n";
},"useData":true});
templates['referralsLinkTableRow'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr class=\"hover\">\n    <td>\n        <span class=\"ref-link\">"
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "</span>&nbsp;\n        <a href=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"link-out\"><svg class=\"icon icon-16\"><use xlink:href=\"#icon-linkout\" /></svg></a><br>\n        <span class=\"dash-button\" button-action=\"showPromoMaterials\" action-parameter=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\">Promo materials</span>\n    </td>\n    <td>"
    + alias4(((helper = (helper = helpers.clicks_month || (depth0 != null ? depth0.clicks_month : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"clicks_month","hash":{},"data":data}) : helper)))
    + "&nbsp;/&nbsp;"
    + alias4(((helper = (helper = helpers.clicks || (depth0 != null ? depth0.clicks : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"clicks","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = helpers.regs_month || (depth0 != null ? depth0.regs_month : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"regs_month","hash":{},"data":data}) : helper)))
    + "&nbsp;/&nbsp;"
    + alias4(((helper = (helper = helpers.regs || (depth0 != null ? depth0.regs : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"regs","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = helpers.earning_count || (depth0 != null ? depth0.earning_count : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"earning_count","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = helpers.earned_month || (depth0 != null ? depth0.earned_month : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"earned_month","hash":{},"data":data}) : helper)))
    + "&nbsp;/&nbsp;"
    + alias4(((helper = (helper = helpers.earned || (depth0 != null ? depth0.earned : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"earned","hash":{},"data":data}) : helper)))
    + "</td>\n    <td><button class=\"btn btn-primary btn-manager\" button-action=\"loadLinkStats\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Statistics</button></td>\n</tr>\n";
},"useData":true});
templates['referralsLinkTableRowEmpty'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<tr><td class=\"tac\" colspan=\"6\">no links yet</td></tr>\n";
},"useData":true});
templates['referralsListTableRow'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n    <td>"
    + alias4(((helper = (helper = helpers.login || (depth0 != null ? depth0.login : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"login","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = helpers.createDate_dateSimple || (depth0 != null ? depth0.createDate_dateSimple : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"createDate_dateSimple","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = helpers.monthearn || (depth0 != null ? depth0.monthearn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"monthearn","hash":{},"data":data}) : helper)))
    + "</td>\n</td>\n";
},"useData":true});
templates['referralsPromoMaterials'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"col-6 tar\"><img src=\""
    + alias2(alias1(depth0, depth0))
    + "\"></div>\n<div class=\"col-6\"><textarea class=\"inp-dft w100p\" rows=\"5\">\n<!--Kolotibablo banner begins-->\n<a href=\""
    + alias2(alias1((depths[1] != null ? depths[1].link : depths[1]), depth0))
    + "\" target=\"_blank\"><img src=\""
    + alias2(alias1(depth0, depth0))
    + "\" alt=\"Work online and earn real money\"></a>\n<!--Kolotibablo banner ends-->\n</textarea></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"paddingtop20px grid\">\n    <div class=\"col tal\">\n        <button class=\"btn btn-primary btn-manager\" button-action=\"init\">\n            <svg class=\"icon arrow-left\"><use xlink:href=\"#icon-arrow\" /></svg>\n            <span class=\"label\">Back</span>\n        </button>\n    </div>\n</div>\n<div class=\"grid\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.promo : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true,"useDepths":true});
templates['referralsTerms'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n    <li class=\"hdg1\">Terms and conditions.</li>\n    <li>1. You will earn 10% from each of your referral earnings. Money are transferred after referral account passes captcha moderation.</li>\n    <li>2. Self-referring is strictly prohibited.</li>\n    <li>3. Referrals who frequently change their IP address are treated as proxy users and thus, fake referrals. Referrals who have the same IP address as you - are treated as fake referrals too.</li>\n    <li>4. To attract referrals you have to generate a referral link. Maximum of 10 referrals links are allowed. There's no limit on number of referrals you may attract with each link</li>\n\n";
},"useData":true});
templates['referralsToplistRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "&nbsp;<span class=\"green fontbold\">(your account)</span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n    <td>"
    + alias4(((helper = (helper = helpers.place || (depth0 != null ? depth0.place : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"place","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.self : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </td>\n    <td>$"
    + alias4(((helper = (helper = helpers.earnings || (depth0 != null ? depth0.earnings : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"earnings","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>\n";
},"useData":true});
templates['remoteRecordRemovalDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Confirm record removal</span>\n</div>\n<div class=\"body tal\">Are you sure you want to delete this record?</div>\n\n<div class=\"foot\">\n    <button class=\"btn btn-primary btn-manager\" button-action=\"dialog.confirmRemoveEmployeeRecord\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.recordId || (depth0 != null ? depth0.recordId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"recordId","hash":{},"data":data}) : helper)))
    + "\">Yes, remove it</button>\n    <button class=\"btn btn-side btn-cancel\">Cancel</button>\n</div>\n";
},"useData":true});
templates['setPincodeStep1'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Step 1 of 2</span>\n</div>\n<form class=\"form form-one-two\" form-action=\"setPinConfirm\" id=\"pinSetForm\" form-block-processing=\"true\">\n    <div class=\"body\">\n        <div class=\"form-msg\" id=\"recoverMessage\"></div>\n        <div class=\"form-row\">\n            <label class=\"one\">Enter 4-digits pin code:</label>\n            <span class=\"two\">\n                <input type=\"text\" id=\"newpin\" class=\"inp-dft db w100p\">\n                <span class=\"error-msg\"></span>\n            </span>\n        </div>\n    </div>\n    <div class=\"foot\">\n        <button class=\"btn btn-primary\" type=\"submit\">Change</button>\n        <button class=\"btn btn-side btn-cancel\">Cancel</button>\n    </div>\n</form>\n";
},"useData":true});
templates['settingsProfileLanguageSelect'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.caption || (depth0 != null ? depth0.caption : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"caption","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"padding5px\"><div class=\"adropdown\" id=\"language"
    + alias4(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num","hash":{},"data":data}) : helper)))
    + "\" default-value=\""
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" width=\"300px\" callback-function=\"setLanguage\" callback-parameter=\"language"
    + alias4(((helper = (helper = helpers.num || (depth0 != null ? depth0.num : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></div>\n";
},"useData":true});
templates['spPriorityInfoTableRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    return " class=\"table-row-grey\"";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)));
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<b>"
    + container.escapeExpression(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + "</b>";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "x"
    + container.escapeExpression(((helper = (helper = helpers.imageWeight || (depth0 != null ? depth0.imageWeight : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"imageWeight","hash":{},"data":data}) : helper)));
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "x"
    + container.escapeExpression(((helper = (helper = helpers.recaptchaWeight || (depth0 != null ? depth0.recaptchaWeight : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"recaptchaWeight","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.isInfo : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n    <td class=\"tal\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInfo : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"smaller\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</div>\n    </td>\n    <td>"
    + alias4(((helper = (helper = helpers.max || (depth0 != null ? depth0.max : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"max","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + alias4(((helper = (helper = helpers.userValue || (depth0 != null ? depth0.userValue : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userValue","hash":{},"data":data}) : helper)))
    + "</td>\n    <td>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInfo : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n    <td><b>"
    + alias4(((helper = (helper = helpers.imageAmount || (depth0 != null ? depth0.imageAmount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"imageAmount","hash":{},"data":data}) : helper)))
    + "</b></td>\n    <td>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isInfo : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n    <td><b>"
    + alias4(((helper = (helper = helpers.recaptchaAmount || (depth0 != null ? depth0.recaptchaAmount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"recaptchaAmount","hash":{},"data":data}) : helper)))
    + "</b></td>\n</tr>\n";
},"useData":true});
templates['startGreenCheck'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<svg class=\"icon\" style=\"color:green\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-check\"></use></svg>\n";
},"useData":true});
templates['startNewsRow'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"margintop5\">\n <i>"
    + container.escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</i>&nbsp;&nbsp;"
    + ((stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n</div>\n";
},"useData":true});
templates['startpageFactoryCard'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <div class=\"factory-state-banned\">\n        <div class=\"factory-state-text\">Banned</div>\n        <svg class=\"icon close btn-manager\" button-action=\"removeFactory\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><use xlink:href=\"#icon-cross\" /></svg>\n    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <div class=\"factory-state-approving\">\n        <div class=\"factory-state-text\">On Approve</div>\n        <svg class=\"icon close btn-manager\" button-action=\"removeFactory\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><use xlink:href=\"#icon-cross\" /></svg>\n    </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"foot\">\n            <div class=\"toggler"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isEnabled : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" id=\"factoryToggler"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" callback-function=\"saveFactoryStatus\" callback-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></div>\n            <label for=\"factoryToggler"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">Receive tasks</label>\n            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.remoteData : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return " active";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<img src=\"/images/icon-gear.png\" class=\"btn-settings anti-navigate\" data-navigate=\"factory/directory/settings/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" button-action=\"manageRemoteData\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers["switch"] || (depth0 && depth0["switch"]) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.subscriptionStatus : depth0),{"name":"switch","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"train",{"name":"case","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"trainFailed",{"name":"case","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"factoryIsFull",{"name":"case","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                <button class=\"btn btn-default btn-manager small\" button-action=\"Anti.directory.dialog.startTraining\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                     <svg class=\"icon\"><use xlink:href=\"#icon-arrow\" /></svg>\n                     <span class=\"label\">Continue Test</span>\n                </button>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "                Qualification test failed\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "                Factory is temporarily not accepting new employees\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-4_xs-12\" id=\"factoryWidget"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.subscriptionStatus : depth0),"==","banned",{"name":"ifCond","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.subscriptionStatus : depth0),"==","onApprove",{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"card-white profession\">\n        <div class=\"close btn-manager\" button-action=\"removeFactory\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><svg><use xlink:href=\"#icon-cross\" /></svg></div>\n        <div class=\"title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n        <ul>Average bid: $"
    + alias4(((helper = (helper = helpers.averageBid || (depth0 != null ? depth0.averageBid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"averageBid","hash":{},"data":data}) : helper)))
    + "</ul>\n        <div class=\"smaller padding5px\">\n            "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n        </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.switchAvailable : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "\n    </div>\n</div>\n";
},"useData":true});
templates['storyAddDescription'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <label>Add description:</label>\n  <textarea name=\"name\" class=\"inp-dft photo-description\" rows=\"5\"></textarea>\n  <button class=\"btn btn-primary btn-manager\" button-action=\"savePhoto\" action-parameter=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" type=\"button\" id=\"saveButton"
    + alias4(((helper = (helper = helpers.titleId || (depth0 != null ? depth0.titleId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleId","hash":{},"data":data}) : helper)))
    + "\" style=\"display:none\">Save</button>\n";
},"useData":true});
templates['storyAddImage'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"text-red\">Required</div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"slot\" id=\"addImage"
    + alias4(((helper = (helper = helpers.titleId || (depth0 != null ? depth0.titleId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleId","hash":{},"data":data}) : helper)))
    + "\">\n    <input type=\"file\" id=\"uploadFile"
    + alias4(((helper = (helper = helpers.titleId || (depth0 != null ? depth0.titleId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleId","hash":{},"data":data}) : helper)))
    + "\" class=\"inputfile\">\n    <label for=\"uploadFile"
    + alias4(((helper = (helper = helpers.titleId || (depth0 != null ? depth0.titleId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleId","hash":{},"data":data}) : helper)))
    + "\" id=\"uploadFileButton\" class=\"photo-add\">\n        <img src=\"/images/app-card-add-plus.png\" alt=\"\">\n        <div class=\"title tac\">Add photo</div>\n    </label>\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>\n";
},"useData":true});
templates['storyEditImageDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Edit photo</span>\n</div>\n<form class=\"form form-one-two\" form-action=\"savePhoto\" id=\"savePhotoForm\" form-block-processing=\"true\">\n    <div class=\"body\">\n        <div class=\"form-row\">\n            <label class=\"one\">Your description</label>\n            <div class=\"two\">\n                <textarea rows=\"3\" class=\"inp-dft db w100p photo-description\">"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"description","hash":{},"data":data}) : helper)))
    + "</textarea>\n                <span class=\"error-msg\"></span>\n            </div>\n        </div>\n    </div>\n    <div class=\"foot\">\n        <button class=\"btn btn-primary\" type=\"submit\">Save</button>\n        <button class=\"btn btn-side btn-cancel\">Cancel</button>\n    </div>\n</form>\n";
},"useData":true});
templates['storyRemoveImageDialog'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"head\">\n    <div class=\"close\"></div>\n    <span class=\"title\">Remove photo</span>\n</div>\n<form class=\"form form-one-two\" form-action=\"removeImage\" id=\"removePhotoForm\" form-block-processing=\"false\">\n    <div class=\"body\">\n        Please confirm you want to remove this photo\n    </div>\n    <div class=\"foot\">\n        <button class=\"btn btn-primary\" type=\"submit\">Remove</button>\n        <button class=\"btn btn-side btn-cancel\">Cancel</button>\n    </div>\n</form>\n";
},"useData":true});
templates['storySavedImage'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"slot\">\n    <div class=\"uploaded-img\">\n      <div class=\"delete btn-manager\" button-action=\"removeImageDialog\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><svg class=\"icon\"><use xlink:href=\"#icon-trash\"></use></svg></div>\n      <img src=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-manager\" button-action=\"editImageDialog\" action-parameter=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n</div>\n";
},"useData":true});
templates['storyUploadingProgress'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"slot\" style=\"display:none\">\n    <div class=\"uploading-img\" id=\"uploadSlot"
    + alias4(((helper = (helper = helpers.titleId || (depth0 != null ? depth0.titleId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleId","hash":{},"data":data}) : helper)))
    + "\" data-name=\""
    + alias4(((helper = (helper = helpers.titleId || (depth0 != null ? depth0.titleId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleId","hash":{},"data":data}) : helper)))
    + "\" style=\"background-size: contain;\">\n      <div class=\"progressbar-single\" id=\"fileProgressbar"
    + alias4(((helper = (helper = helpers.titleId || (depth0 != null ? depth0.titleId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleId","hash":{},"data":data}) : helper)))
    + "\">\n        Uploading\n        <div class=\"progress\" id=\"fileProgressbarValue"
    + alias4(((helper = (helper = helpers.titleId || (depth0 != null ? depth0.titleId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titleId","hash":{},"data":data}) : helper)))
    + "\" style=\"width:0%\">Uploading</div>\n      </div>\n    </div>\n</div>\n";
},"useData":true});
templates['tabbedContentAutoSettings'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <tr>\n        <td>\n            "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n            <div class=\"smaller\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n        </td>\n        <td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0["boolean"] : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "        </td>\n    </tr>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "            <div class=\"toggler"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.value : depth0),"==","true",{"name":"ifCond","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" callback-function=\"saveSetting\" callback-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " active";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <input type=\"text\" class=\"inp-dft db\" value=\""
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" callback-function=\"saveSetting\" callback-parameter=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table w100p\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</table>\n";
},"useData":true});
templates['tabbedContentStructure'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <button class=\"btn"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" tab-switch=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <svg class=\"icon\"><use xlink:href=\"#"
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" /></svg>\n            <span class=\"label\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n        </button>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " active";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "        <div class=\"tab-pane "
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            "
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"vertical-tabs\">\n    <div class=\"btn-group\">\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n    <div class=\"tabstack\">\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});
templates['tableManagerAutoEmpty'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<tr><td colspan=\"20\" align=\"center\">no records</td></tr>\n";
},"useData":true});
templates['tableManagerAutoRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "    <input type=\"hidden\" name=\""
    + alias3(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(container.lambda(depth0, depth0))
    + "\">\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(data && data.key),"!=","afwRowId",{"name":"ifCond","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <td>"
    + ((stack1 = (helpers.truncate || (depth0 && depth0.truncate) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,90,"<span class=\"more-text\">&bull; &bull; &bull;</span>",{"name":"truncate","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<tr class=\"hover btn-manager\" button-action=\"Anti.tableManager.showRowData\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.afwRowId || (depth0 != null ? depth0.afwRowId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"afwRowId","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tr>\n";
},"useData":true});
templates['tableManagerHeader'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.key),"!=","afwRowId",{"name":"ifCond","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<td>"
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"key","hash":{},"data":data}) : helper)))
    + "</td>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<thead>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</thead>\n";
},"useData":true});
templates['tableManagerJSONBuilderRow'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<td>\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.contentType : depth0),"==","image",{"name":"ifCond","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.contentType : depth0),"==","text",{"name":"ifCond","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.contentType : depth0),"==","buttons",{"name":"ifCond","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</td>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<img src=\""
    + container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"content","hash":{},"data":data}) : helper)))
    + "\" class=\"tablemanager-content-image\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"content","hash":{},"data":data}) : helper)))
    + "\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.recordId : depth0),"!=",null,{"name":"ifCond","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.content : depth0),"contains","edit",{"name":"ifCond","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,(depth0 != null ? depth0.content : depth0),"contains","remove",{"name":"ifCond","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <button class=\"btn btn-default btn-manager\" button-action=\"dialog.editEmployeeRecord\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.recordId || (depth0 != null ? depth0.recordId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"recordId","hash":{},"data":data}) : helper)))
    + "\">Edit</button>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <button class=\"btn btn-default btn-manager\" button-action=\"dialog.removeEmployeeRecord\" action-parameter=\""
    + container.escapeExpression(((helper = (helper = helpers.recordId || (depth0 != null ? depth0.recordId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"recordId","hash":{},"data":data}) : helper)))
    + "\">Remove</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<tr>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tr>\n";
},"useData":true});
templates['tableManagerJSONBuilderTable'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<td>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</td>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"w100p table\" id=\"jsonBuilderTable\">\n<thead>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</thead>\n</table>\n";
},"useData":true});
templates['tableManagerPaging'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"paging\">\n    <div class=\"arrows\">\n        <a class=\"paging-arrow-left\"><img src=\"/images/icon-arrow-left.png\"></a>\n        <a class=\"paging-arrow-right\"><img src=\"/images/icon-arrow-right.png\"></a>\n    </div>\n    <div class=\"btn-group\">\n    </div>\n</div>\n";
},"useData":true});
templates['tableManagerRowDetails'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "            <div class=\"form-row\">\n                <label class=\"one\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</label>\n                <div class=\"two\">\n                    "
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.value : depth0)) != null ? stack1.length : stack1),">",0,{"name":"ifCond","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                </div>\n            </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<div class=\"highlight-text-wrap\"><div class=\"highlight-text\">";
  stack1 = ((helper = (helper = helpers.nl2br || (depth0 != null ? depth0.nl2br : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"nl2br","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.nl2br) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div></div>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"value","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"head\">\n    <div class=\"close\"></div>\n</div>\n<div class=\"form form-one-two\">\n    <div class=\"body\">\n        <div class=\"scrollable\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>\n";
},"useData":true});
})();