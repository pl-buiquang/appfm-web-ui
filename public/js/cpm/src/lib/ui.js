(function(vw){

  vw.cpm.ui = {}

  vw.cpm.ui.Modal = function(){
    var me = this;
    this.$el = $(vw.cpm.ui.Modal.template);
    this.$el.find('.cpm-modal-close').click(function(){
      me.close();
    });
    this.$el.find('.cpm-modal-content').perfectScrollbar({suppressScrollY:true});
    this.$el.hide();
  }

  vw.cpm.ui.Modal.prototype.open = function($content){
    if(vw.cpm.ui.Modal.alreadyExist){
      console.log("error : a modal is already open! this is a quick handmade framework that doesn't handle multiple opened modals..");
      return;
    }
    vw.cpm.ui.Modal.alreadyExist = true;
    
    $modalbg = $('<div id="cpm-modal-bg"></div>');
    $('body').append($modalbg);
    $modalbg.perfectScrollbar();
    this.$el.find(".cpm-modal-content").append($content);
    $modalbg.append(this.$el);
    this.$el.slideDown();
  }

  vw.cpm.ui.Modal.prototype.getContainer = function(){
    return this.$el.find(".cpm-modal-content");
  }

  vw.cpm.ui.Modal.prototype.close = function(){
    this.$el.slideUp({complete:function(){
      $('body').find("#cpm-modal-bg").remove();
      vw.cpm.ui.Modal.alreadyExist = false;
    }});
    
  }

  vw.cpm.ui.Modal.alreadyExist = false;
  vw.cpm.ui.Modal.template = '<div class="cpm-modal"><div class="cpm-modal-header"><div class="cpm-modal-close"></div></div><div class="cpm-modal-content"></div></div>';

    

}(window.vw = window.vw || {}));