(function(vw){

  vw.cpm.HelpManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.HelpManagerView(this,$el);
    this.init();
  }

  vw.cpm.HelpManager.prototype.init = function(){
    var me = this;

    this.slides = '<iframe style="border-style:none;border:0;margin:0;padding:0;" height="500px" width="100%" src="http://localhost:8080/public/doc/slides/index.html"></iframe>';
  }

  




}(window.vw = window.vw || {}));