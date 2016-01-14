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
    alert('no save function yet, you have to modify the source file by directly in the server files');
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
    console.log(conf);
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
        var $panel = me.app.view.createPanel(me.def.modulename+" (run "+runid+")");
        var process = new vw.cpm.Process(me.app,$panel.find(".frame-body"),{moduledef:me.def.module,runconf:conf,runid:runid});
        process.sync();
        me.app.processmanager.fetchAll(); // very unoptimized
        success.call(me.view);
      },
      error:function(){

      }
    });
  
  }

}(window.vw = window.vw || {}));