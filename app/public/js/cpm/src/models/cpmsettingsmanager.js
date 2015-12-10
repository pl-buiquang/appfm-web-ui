(function(vw){

  vw.cpm.CPMSettingsManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.CPMSettingsManagerView(this,$el);
    this.cpmsettings = {};
    this.init();
  }

  vw.cpm.CPMSettingsManager.prototype.init = function(){
    var me = this;
    me.fetch();
  }

  vw.cpm.CPMSettingsManager.prototype.fetch = function(){
    var me = this;
    this.app.cpmCall("settings",function(data){
      me.cpmsettings = data;
      me.view.render();
    });
  }



}(window.vw = window.vw || {}));