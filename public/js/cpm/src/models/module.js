(function(vw){

  vw.cpm.Module = function(app,$el,moduledef){
    this.def = moduledef;
    this.lastSavedSource = moduledef.source;
    this.app = app;
    this.view = new vw.cpm.ModuleView(this,$el);
    this.synced = false;
  }

  vw.cpm.Module.prototype.init = function(){
    
  }

  vw.cpm.Module.prototype.fetch = function(){
    
  }

  vw.cpm.Module.prototype.sync = function(success,error,ignoreWarning){
    var me = this;
    me.def.source = me.view.editor.getValue();
    var synctype = "update "+me.def.modulename;
    if(me.def.creation){
      synctype = "create "+me.def.modulename+" "+vw.cpm.utils.getParentDir(me.def.sourcepath);
    }
    var force = "";
    if(ignoreWarning){
      force = " --force";
    }
    $.ajax({
      type: "POST",
      data : {
        cmd: "module "+synctype+force,
        data:me.def.source
      },
      url: me.app.options.cpmbaseurl+"rest/cmd",
      dataType : "json",
      success: function(data, textStatus, jqXHR) {
        if(data.success){
          if(me.def.creation || !me.def.module || ignoreWarning){
            me.app.modulesmanager.fetchAll();
            if(me.def.creation){
              delete me.def.creation;
            }
          }
          delete me.def.error;
          me.internalSyncToModel();
          me.lastSavedSource = me.def.source;
          if(success){
            success.call();  
          }
        }else if(data.warning){
           me.syncWarningOptions(data.warning,success,error);
        }else{
          me.def.error = data.error;
          alert(data.error);
          if(error){
            error.call();  
          }
        }
      },
      error:function(){
        if(error){
          error.call();  
        }
      }
    });
  }

  vw.cpm.Module.prototype.syncWarningOptions = function(modulelist,sucess,error){
    var me = this;
    var modal = new vw.cpm.ui.Modal();
    $html = $(vw.cpm.ModuleView.templateWarningSave);
    $html.find('.tpl-warning-save-message').html(modulelist);
    $html.find('.clone-module').click(function(){
      modal.close(true);
      me.app.modulesmanager.prepareCreateNewModule(me.def.source);
    });
    $html.find('.force-module-save').click(function(){
      modal.close();
      me.sync(sucess,error,true);
    });
    $html.find('.abort-module-save').click(function(){
      modal.close();
    });
    modal.open($html);
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
        if(success){
          success.call(me.view);
        }
      },
      error:function(){

      }
    });
  
  }

  

  vw.cpm.Module.prototype.internalSyncToSource = function(){
    this.def.source = YAML.stringify(this.def.module,99);
  }

  vw.cpm.Module.prototype.internalSyncToModel = function(){
    this.def.module = YAML.parse(this.def.source);
  }

  

}(window.vw = window.vw || {}));