(function(vw){

  vw.cpm.Module = function(app,$el,moduledef){
    this.def = moduledef;
    this.app = app;
    this.view = new vw.cpm.ModuleView(this,$el);
    this.synced = false;
  }

  vw.cpm.Module.prototype.init = function(){
    
  }

  vw.cpm.Module.prototype.fetch = function(){
    
  }

  vw.cpm.Module.prototype.sync = function(success,error){
    var me = this;
    me.def.source = me.view.editor.getValue();
    var synctype = "update "+me.def.modulename;
    if(me.def.creation){
      synctype = "create "+me.def.modulename+" "+vw.cpm.utils.getParentDir(me.def.sourcepath);
    }
    console.log(me.def);
    $.ajax({
      type: "POST",
      data : {
        cmd: "module "+synctype,
        data:me.def.source
      },
      url: me.app.options.cpmbaseurl+"rest/cmd",
      dataType : "json",
      success: function(data, textStatus, jqXHR) {
        if(data.success){
          if(me.def.creation){
            me.app.modulesmanager.fetchAll();
            delete me.def.creation;  
          }
          success.call();
        }else{
          alert(me.error);
          error.call();
        }
      },
      error:function(){

      }
    });
  }

  vw.cpm.Module.confToYaml = function(conf){
    var out = "";
    for(var confname in conf){
      out += confname+" : "+conf[confname]+"\n";
    }
    return out;
  }

  vw.cpm.Module.prototype.run = function(conf,success,error){
    var me = this;
    $.ajax({
      type: "POST",
      data : {
        cmd: "module run "+me.def.modulename,
        data:vw.cpm.Module.confToYaml(conf)
      },
      url: me.app.options.cpmbaseurl+"rest/cmd",
      dataType : "text",
      success: function(data, textStatus, jqXHR) {
        var runid = data;
        me.app.processmanager.startedprocess.push(runid);
        me.app.processmanager.showRun(me.def.modulename,runid);
        me.app.processmanager.fetchAll(); // very unoptimized
        success.call(me.view);
      },
      error:function(){

      }
    });
  
  }

  

  vw.cpm.Module.prototype.internalSyncToSource = function(){
    this.def.source = YAML.stringify(this.def.module);
  }

  vw.cpm.Module.prototype.internalSyncToModel = function(){
    this.def.module = YAML.parse(this.def.source);
  }

  

}(window.vw = window.vw || {}));