(function(vw){

  vw.cpm.CorpusManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.CorpusManagerView(this,$el);
    this.filetree = {}
    this.init();
  }

  vw.cpm.CorpusManager.prototype.init = function(){
    var me = this;
    me.fetch();
  }

  vw.cpm.CorpusManager.prototype.fetch = function(){
    var me = this;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"corpus ls --json"},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        me.filetree = {"/":data.corpus}; // because...
        me.view.refresh();
      }
    })
  }



}(window.vw = window.vw || {}));