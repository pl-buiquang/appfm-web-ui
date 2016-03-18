(function(vw){

  vw.cpm.Logger = function(app,options){
    this.options = options;
    this.app = app;
    this.logs = [];
    this.refreshlog = false;
  }

  vw.cpm.Logger.prototype.appendLog = function(message,type){
    var d = new Date();
    var n = d.toUTCString();
    this.logs.push({"entry":message,"type":type,"date":n});
    this.refreshlog = true;
    this.refresh();
  }

  vw.cpm.Logger.prototype.info = function(message){
    this.appendLog(message,"info");
  }

  vw.cpm.Logger.prototype.debug = function(message){
    this.appendLog(message,"debug");
  }

  vw.cpm.Logger.prototype.warn = function(message){
    this.appendLog(message,"warn");
  }

  vw.cpm.Logger.prototype.error = function(message){
    this.appendLog(message,"error");
  }

  vw.cpm.Logger.prototype.refresh = function(){
    var me = this;
    var panel = me.app.view.getPanel("AppFM log",true);
    if (panel){
      panel.$el.find(".frame-body").empty();
      panel.$el.find(".frame-body").append(me.render());
      this.refreshlog = false;
    }
  }

  vw.cpm.Logger.prototype.view = function(){
    var me = this;
    var panel = me.app.view.getPanel("AppFM log",true);
    if (!panel){
      panel = me.app.view.createPanel("AppFM log",me.render());
    }else{
      if (me.refreshlog){
        panel.$el.find(".frame-body").empty();
        panel.$el.find(".frame-body").append(me.render());
      }  
    }
    
    this.refreshlog = false;
    panel.focus();
  }


  vw.cpm.Logger.prototype.render = function(){
    data = "";
    for (var i = this.logs.length - 1; i >= 0; i--) {
      var item =this.logs[i];
      data += item["type"]+" - "+item["date"]+" : "+item["entry"]+"\n";
    }
    return '<code><pre class="pre-wrapped">'+data+'</pre></code>';
  }



}(window.vw = window.vw || {}));