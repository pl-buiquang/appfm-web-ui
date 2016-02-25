(function(vw){

  vw.cpm.HelpManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.HelpManagerView(this,$el);
    this.init();
  }

  vw.cpm.HelpManager.prototype.init = function(){
    var me = this;

  }


  vw.cpm.HelpManager.prototype.displayCLIHelp = function(){
    var helpcontent = 'todo.. :/';
    this.app.view.createPanel("help",helpcontent);
  }
  




}(window.vw = window.vw || {}));