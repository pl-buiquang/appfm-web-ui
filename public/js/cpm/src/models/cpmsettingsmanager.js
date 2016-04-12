(function(vw){

  vw.cpm.CPMSettingsManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.CPMSettingsManagerView(this,$el);
    this.cpmsettings = {corpus_dir:"not connected",modules:[],result_dir:"not connected"};
    this.initiated = false;
    this.init();
  }

  vw.cpm.CPMSettingsManager.prototype.init = function(callback){
    var me = this;
    me.view.render();
    me.fetch();
  }

  vw.cpm.CPMSettingsManager.prototype.fetch = function(callback){
    var me = this;
    this.app.cpmCall("settings",function(data){
      me.initiated = true;
      me.cpmsettings = data;
      // set default module dir for newly created modules
      for (var i = 0; i < data.modules.length; i++) {
        if(data.modules[i].exist){
          me.defaultModulesDir = data.modules[i].name;
          break;    
        }
      };
      me.view.render();
      if(me.options.init){
        me.options.init.call(me.app);
      }
    });
  }

  vw.cpm.CPMSettingsManager.prototype.updateConnection = function(host,port,wshost){
    console.log(host);
    var me = this;
    $.ajax({
        type: "POST",
        data : {
          CPM_HOST:host,
          CPM_PORT:port,
          CPM_WS_HOST:wshost
        },
        dataType:"json",
        url: me.app.options.cpmbaseurl+"updateConnectionInfo",
        success: function(data, textStatus, jqXHR) {
          if(data.error){
            alert("wrong connection information. nothing changed!");
          }else if(data.success){
            store.set("connectionInfo",{
              CPM_HOST:host,
              CPM_PORT:port,
              CPM_WS_HOST:wshost
            });
            window.location.reload();  
          }else{
            console.log(data);
            alert("something went wrong. nothing changed!");
          }
          
        },
        error:function(){
          alert("wrong connection information. nothing changed!");
        }
      });
  }



}(window.vw = window.vw || {}));