(function(vw){

  vw.cpm.Process = function(app,$el,conf){
    this.app = app;
    this.init(conf);
    this.view = new vw.cpm.ProcessView(this,$el);
  }

  vw.cpm.Process.prototype.init = function(conf){
    this.moduledef = conf.moduledef;
    this.conf = conf.runconf;
    this.runid = conf.runid;
    this.info = {};
    this.synced = false;
  }

  vw.cpm.Process.prototype.sync = function(){
    var me = this;
    $.ajax({
      type: "POST",
      data : {
        cmd: "process get "+me.runid,
      },
      url: me.app.options.cpmbaseurl+"rest/cmd",
      dataType : "json",
      success: function(data, textStatus, jqXHR) {
        me.info = data;
        me.synced = true;
        me.view.refresh();
      },
      error:function(){
        alert('could not parse process info json (run id = '+me.runid+')');
      }
    });
  }

  vw.cpm.Process.prototype.getStatus = function(callback){
    var me = this;
    $.ajax({
      type: "POST",
      data : {
        cmd: "process status "+me.runid+" --json",
      },
      url: me.app.options.cpmbaseurl+"rest/cmd",
      dataType : "json",
      success: function(data, textStatus, jqXHR) {
        callback.call(me.view,data);
      },
      error:function(){
        alert('could not parse process info json (run id = '+me.runid+')');
      }
    });
  }

  vw.cpm.Process.prototype.delete = function(){
    var me = this;
    $.ajax({
      type : "POST",
      data : {
        cmd : "process del "+me.runid
      },
      url : me.app.options.cpmbaseurl+"rest/cmd",
      success : function(data){
        if(data == "ok"){
          var panel = me.app.view.getPanelFromContent(me.view.$el);
          panel.delete();
          me.app.processmanager.remove(me.runid);
        }
      },
      error : function(){
        me.app.logger.error("error when trying to delete process result "+me.runid);
      }
    });
  }

  

  vw.cpm.Process.prototype.run = function(conf,success,error){
    var me = this;
    me.app.logger.debug(conf);
    if(success){
      success.call(me.view);
    }
  }

}(window.vw = window.vw || {}));