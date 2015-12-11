(function(vw){

  vw.cpm.Process = function(app,$el,conf){
    this.app = app;
    this.init(conf);
    this.view = new vw.cpm.ProcessView(this,$el);
    this.synced = false;
  }

  vw.cpm.Process.prototype.init = function(conf){
    this.moduledef = conf.moduledef;
    this.conf = conf.runconf;
    this.runid = conf.runid;
  }

  vw.cpm.Process.prototype.fetch = function(){
    
  }

  vw.cpm.Process.prototype.sync = function(success,error){
    alert('no save function yet, you have to modify the source file by directly in the server files');
  }

  vw.cpm.Process.prototype.run = function(conf,success,error){
    var me = this;
    console.log(conf);
    if(success){
      success.call(me.view);
    }
  }

}(window.vw = window.vw || {}));