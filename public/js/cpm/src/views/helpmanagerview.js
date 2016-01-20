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
      me.model.app.view.createPanel("Main wiki page",'<iframe width="100%" height="'+vw.cpm.CLIView.maxFrameHeight+'px;" style="border:none;" src="'+me.model.app.options.cpmbaseurl+'/dokuwiki">');
    });
    this.$el.find("#help-presa-slides").on("click",function(){
      var $panel = me.model.app.view.getPanel("Intro");
      $panel.find(".frame-body").html(me.model.slides);
    });
    
  }

  vw.cpm.HelpManagerView.template = '<div id="help-presa-slides" style="cursor:pointer;">Introduction slides</div><div id="help-main-wiki-page" style="cursor:pointer;">Main wiki</div>';

  



}(window.vw = window.vw || {}));
