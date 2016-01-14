(function(vw){

  vw.cpm.HelpManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.HelpManagerView(this,$el);
    this.init();
  }

  vw.cpm.HelpManager.prototype.init = function(){
    var me = this;

    this.slides = '<iframe style="border-style:none;border:0;margin:0;padding:0;" height="500px" width="100%" src="'+this.app.options.cpmbaseurl+'public/doc/slides/index.html"></iframe>';
  }


  vw.cpm.HelpManager.prototype.displayCLIHelp = function(){
    var helpcontent = 'todo.. :/';
    this.app.view.createPanel("help",helpcontent);
  }
  




}(window.vw = window.vw || {}));