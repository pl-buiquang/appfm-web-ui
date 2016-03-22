(function(vw){

  vw.cpm.utils = {}

  vw.cpm.utils.guids = [];
  vw.cpm.utils.guid = function(){
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    var guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    while(vw.cpm.utils.guids.indexOf(guid)!=-1){
      guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    }
    vw.cpm.utils.guids.push(guid);
    return guid;
  }

  vw.cpm.utils.waitTill = function(refObj,field,callback,refreshInterval){
    var interval = setInterval(function(){
      var cond = false;
      if(_.isFunction(refObj[field]) ){
        cond = refObj[field].call(refObj);
      }else{
        cond = refObj[field];
      }
      if(cond){
        clearInterval(interval);
        callback.call();
      }
    },refreshInterval);
  }

  vw.cpm.utils.getSelectionText =function() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
  }

  vw.cpm.utils.getParentDir = function(filepath){
    var index = filepath.lastIndexOf("/")
    if(index!=-1){
      return filepath.substring(0,index);
    }else{
      return filepath;
    }
    
  }

  vw.cpm.utils.extractVars = function(value,ref){
    var variables = [];

    if(typeof value == "object"){
      if(value.constructor === Array){
        for (var i = 0; i < value.length; i++) {
          variables = variables.concat(vw.cpm.utils.extractVars(value[i],ref));
        };
      }else{
        for (var i in value){
          variables = variables.concat(vw.cpm.utils.extractVars(value[i],ref));
        }
      }
    }else{
      var escapeddollar = value.replace("\\$","__DOLLAR_ESCAPED__");
      var regex = /\$(?:(?:\{(([a-zA-Z_\-\.@]+)(:.+)?)\})|([a-zA-Z_\-]+))/g;
      var match;
      while (match = regex.exec(escapeddollar)){
        var variable = {ref:ref,raw:value};
        if(match[1]){
          variable.name = match[2];
          if(match[3]){
            variable.attr = match[3].substring(1);
          }
        }else{
          variable.name = match[4];
        }
        variables.push(variable);
      }
      
    }

    return variables;

    
  }
    

}(window.vw = window.vw || {}));