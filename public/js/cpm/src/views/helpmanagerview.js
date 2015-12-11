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

    this.$el.find("#help-module-doc").on("click",function(){
      me.model.app.view.createPanel("Modules doc page",'<iframe width="100%" height="'+vw.cpm.CLIView.maxFrameHeight+'px;" style="border:none;" src="https://versatile-world.net/wiki/work/cpm/spec_draft?rev=1445003156&mddo=print">');
    });
    this.$el.find("#help-main-wiki-page").on("click",function(){
      me.model.app.view.createPanel("Main wiki page",'<iframe width="100%" height="'+vw.cpm.CLIView.maxFrameHeight+'px;" style="border:none;" src="https://versatile-world.net/wiki/work/cpm">');
    });
    
  }

  vw.cpm.HelpManagerView.template = '<div id="help-main-wiki-page" style="cursor:pointer;">Main wiki</div><div id="help-module-doc" style="cursor:pointer;">Modules</div>';

  



}(window.vw = window.vw || {}));
