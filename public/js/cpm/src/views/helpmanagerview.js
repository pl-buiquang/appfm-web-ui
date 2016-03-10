(function(vw){

  vw.cpm.HelpManagerView = function(model,$el){
    this.id = vw.cpm.utils.guid();
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.HelpManagerView.prototype.init=function(){
    var me = this;
    this.$el.append(vw.cpm.HelpManagerView.template);

    this.$el.find("#help-main-wiki-page").on("click",function(){
      me.model.app.openIFrame(me.model.app.options.cpmbaseurl+'/dokuwiki/',"Wiki");
    });
    this.$el.find("#help-presa-slides").on("click",function(){
      me.model.app.openIFrame(me.model.app.options.cpmbaseurl+'/introslides',"Intro");
    });
    this.$el.find("#help-tutorial").on("click",function(){
      me.model.app.demo();
    });
    /*
    this.$el.find("#help-tutorial-module").on("click",function(){
      me.model.app.demoModule();
    });*/
    
    
  }

  vw.cpm.HelpManagerView.template = '<div id="help-tutorial" style="cursor:pointer;">Tutorial</div><div id="help-presa-slides" style="cursor:pointer;">Introduction slides</div><div id="help-main-wiki-page" style="cursor:pointer;">Main wiki</div>';
  //<div id="help-tutorial-module" style="cursor:pointer;">Module tutorial</div>

  



}(window.vw = window.vw || {}));
