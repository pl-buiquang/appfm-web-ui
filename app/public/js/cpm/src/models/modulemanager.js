(function(vw){

  vw.cpm.ModuleManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.ModuleView(this,$el);
  }

  vw.cpm.ModuleManager.prototype.init = function(){
    
  }



}(window.vw = window.vw || {}));