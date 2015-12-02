(function(vw){

  vw.cpm.Module = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.ModuleView(this,$el);
  }

  vw.cpm.Module.prototype.init = function(){
    
  }



}(window.vw = window.vw || {}));