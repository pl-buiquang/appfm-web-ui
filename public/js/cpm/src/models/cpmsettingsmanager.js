(function(vw){

  vw.cpm.CPMSettingsManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.CPMSettingsManagerView(this,$el);
    this.cpmsettings = {};
    this.init();
  }

  vw.cpm.CPMSettingsManager.prototype.init = function(callback){
    var me = this;
    me.fetch();
  }

  vw.cpm.CPMSettingsManager.prototype.fetch = function(callback){
    var me = this;
    this.app.cpmCall("settings",function(data){
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



}(window.vw = window.vw || {}));