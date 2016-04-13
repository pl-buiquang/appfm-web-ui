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



  vw.cpm.ui.WrapDiv = function(content,title,minheight,maxheight){
    var me = this;
    this.$el = $(vw.cpm.ui.WrapDiv.template);
    this.$el.find('.cpm-wrap-div-switch').click(function(){
      me.wrapToggle();
    });
    var $container = me.$el.find(".cpm-wrap-div-content");
    if(minheight){
      $container.css("min-height",minheight);
    }
    if(maxheight){
      $container.css("max-height",maxheight);
    }
    if(title){
      me.$el.find(".cpm-wrap-div-header").prepend(title);
    }
    $container.append(content);
  }

  vw.cpm.ui.WrapDiv.prototype.wrapToggle = function(){
  }
    
  vw.cpm.ui.WrapDiv.template = '<div class="cpm-wrap-div"><div class="cpm-wrap-div-header"><div class="cpm-wrap-div-switch"></div></div><div class="cpm-wrap-div-content"></div></div>';
  


}(window.vw = window.vw || {}));