(function(vw){

  vw.cpm.ProcessManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.ProcessManagerView(this,$el);
    this.init();
    this.moduletree = {};
    this.modules = {};
  }

  vw.cpm.ProcessManager.prototype.init = function(){
    var me = this;
    me.sync();
  }

  vw.cpm.ProcessManager.prototype.sync = function(){
    var me = this;
    /*$.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"module ls --json"},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        me.moduletree = data;
        me.parseModuleTree(data);
        me.view.refresh();
      }
    })*/
  }


  vw.cpm.ProcessManager.prototype.fetch = function(modulename,callback){
    var me = this;
    /*$.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"module info "+modulename+" --json"},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        callback.call(me,data);
      }
    })*/

  }



}(window.vw = window.vw || {}));