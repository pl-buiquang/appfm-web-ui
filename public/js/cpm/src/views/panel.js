(function(vw){

  vw.cpm.Panel = function(app,title,data,semanticid,cmd){
    this.app = app;
    this.semanticid = semanticid;
    this.$el = $(vw.cpm.Panel.frametemplate);
    this.app.view.contentpanel.find('#active-content-flow').prepend(this.$el);
    this.el = this.$el[0];
    this.uid = vw.cpm.Panel.uids++;
    this.cmd = cmd;
    this.init(title,data);
  };

  vw.cpm.Panel.prototype.init = function(title,data){
    var me = this;

    this.$el.attr("uid",this.uid);

    

    if(title != 'undefined'){
      me.$el.find(".frame-title").append(title);
    }
    if(data != 'undefined'){
      me.$el.find('.frame-body').append(data);
    }

    this.app.view.panels.push(me);
    this.app.view.refreshPanelList(); 


    me.$el.find(".frame-title").mouseup(function (e){
       vw.cpm.currentTextSelection = vw.cpm.utils.getSelectionText();
     });
    me.$el.find(".frame-body").mouseup(function (e){
       vw.cpm.currentTextSelection = vw.cpm.utils.getSelectionText();
     });

    me.$el.find(".frame-body").perfectScrollbar();
 
    me.$el.find('.frame-tool-pin').click(function(){
      me.stick();

    });

    me.$el.find('.frame-tool-close').click(function(){
      me.delete()
    });

    me.$el.find('.frame-tool-openfs').click(function(){
      me.fullscreen();

    });

    me.$el.find('.frame-tool-hide').click(function(){
      me.hide();
    });

    me.app.view.contentpanel[0].scrollTop = 0;
    me.app.view.contentpanel.perfectScrollbar("update");
  }



  vw.cpm.Panel.prototype.quitFullscreen = function(){
    var me = this;
    me.$el.removeClass("fullscreen");
    me.$el.find(".frame-body").trigger("fullscreenOff");
    me.$el.find(".frame-tool-quitfs").remove();
    me.$el.find(".frame-tools").children().show();
    // change content height 
    var content = me.$el.find(".frame-body").children().not(".ps-scrollbar-x-rail").not(".ps-scrollbar-y-rail");
    if(content.length == 1){
      if(content.prop("originalHeight")){
        content.height(content.prop("originalHeight"));
      }
    }
    
    var fb = me.$el.find(".frame-body");
    fb.height(fb.prop("originalHeight"));
    fb.perfectScrollbar('update');

    me.$el.find(".frame-body").trigger("fullscreenOff");
    /*
    me.app.view.$fullscreencontainer.fadeOut();
    var title = me.app.view.$fullscreencontainer.find(".frame-title").children();
    if(title.length == 0){
      me.$el.find(".frame-title").append(title);
    }
    var content = me.app.view.$fullscreencontainer.find(".frame-body").children();
    if(content.length != 0){
      if(content.length == 1){
        if(content.prop("originalHeight"))
          content.height(content.prop("originalHeight"));
      }
      me.$el.find(".frame-body").append(content);
      
    }
    */
  }

  vw.cpm.Panel.prototype.fullscreen = function(){
    var me = this;
    me.$el.addClass("fullscreen");
    me.$el.find(".frame-body").trigger("fullscreenOn");
    me.$el.find(".frame-tools").children().hide();
    me.$el.find(".frame-tools").append('<div class="frame-tool frame-tool-quitfs"></div>');
    // change content height
    var content = me.$el.find(".frame-body").children().not(".ps-scrollbar-x-rail").not(".ps-scrollbar-y-rail");
    if(content.length == 1){
      content.prop("originalHeight",content.height());
      content.height($(window).height()-100);
    }
    var fb = me.$el.find(".frame-body");
    fb.prop("originalHeight",fb.height());
    fb.height($(window).height()-70);
    fb.perfectScrollbar('update');
    me.$el.find(".frame-tool-quitfs").on("click",function(){
      me.quitFullscreen();
    });

    me.$el.find(".frame-body").trigger("fullscreenOn");

    /*
    me.app.view.$fullscreencontainer.fadeIn();
    var title = me.$el.find(".frame-title").children();
    if(title.length == 0){
      title = me.$el.find(".frame-title").html();
    }
    var content = me.$el.find(".frame-body").children();

    if(content.length==0){
      content = me.$el.find(".frame-body").html();
    }else if(content.length == 1){
      content.prop("originalHeight",content.height());
      content.height($(window).height()-100);
    }
    me.app.view.$fullscreencontainer.find(".frame-title").empty();
    me.app.view.$fullscreencontainer.find(".frame-body").empty();
    me.app.view.$fullscreencontainer.find(".frame-title").append(title);
    me.app.view.$fullscreencontainer.find(".frame-body").append(content);
    
    me.app.view.$fullscreencontainer.find(".frame-tool-quitfs").unbind("click");
    me.app.view.$fullscreencontainer.find(".frame-tool-quitfs").on("click",function(){
      me.quitFullscreen();
    });*/
  }

  vw.cpm.Panel.prototype.serialize = function(){
    return {cmd:this.cmd,uid:this.uid,sid:this.semanticid};
  }

  vw.cpm.Panel.deserialize = function(app,serialized){
    var cmd = new vw.cpm.Command(serialized.cmd.command,serialized.cmd.data);
    var panel = cmd.execute(app);
    return panel;
  }

  vw.cpm.Panel.prototype.show = function(){
    var me = this;
    var button = me.$el.find('.frame-tool-show');
    button.removeClass('frame-tool-show');
    button.addClass('frame-tool-hide');
    button.unbind("click");
    me.$el.find(".frame-body").slideDown({complete:function(){
      button.on("click",function(){
        me.hide();
      });
    }});
  }

  vw.cpm.Panel.prototype.hide = function(){
    var me = this;
    var button = me.$el.find('.frame-tool-hide');
    button.removeClass('frame-tool-hide');
    button.addClass('frame-tool-show');
    button.unbind("click");
    me.$el.find(".frame-body").slideUp({complete:function(){
      button.on("click",function(){
        me.show();
      });
    }});
  }

  vw.cpm.Panel.prototype.focus = function(){
    var me = this;
    me.app.view.contentpanel[0].scrollTop = me.$el[0].offsetTop-20;
  }

  vw.cpm.Panel.prototype.delete = function(){
    var me = this;
    var index = me.app.view.panels.indexOf(me);
    if(index!=-1){
      me.app.view.panels.splice(index,1);
      me.app.view.refreshPanelList(); 
    }

    if(me.exitCB){
      me.exitCB.call();
    }

    me.$el.animate({
          opacity: 0.25,
          height: "toggle"
        },{
        complete:function(){
          me.$el.remove();
        },
        duration : 200
      }
    );
  }

  vw.cpm.Panel.prototype.stick = function(){
    var me = this;
    //panel.detach();
    this.app.view.contentpanel.find('#active-content-sticky').append(me.$el); 
    var button = me.$el.find('.frame-tool-pin');
    button.removeClass('frame-tool-pin');
    button.addClass('frame-tool-unpin');
    button.unbind('click');
    button.click(function(){
      me.unstick();
    });
    me.app.view.contentpanel[0].scrollTop = 0;
    me.app.view.contentpanel.perfectScrollbar("update");
  }

  vw.cpm.Panel.prototype.unstick = function(){
    var me = this;
    //panel.detach();
    this.app.view.contentpanel.find('#active-content-flow').append(me.$el);
    var button = me.$el.find('.frame-tool-unpin');
    button.removeClass('frame-tool-unpin');
    button.addClass('frame-tool-pin');
    button.unbind('click');
    button.click(function(){
      me.stick();
    });
  }

  vw.cpm.Panel.prototype.addToolButton = function($button){
    $button.addClass("frame-tool");
    this.$el.find(".frame-tools").append($button);
  }

  vw.cpm.Panel.prototype.removeToolButton = function(buttonclass){
    this.$el.find(".frame-tools").find(buttonclass).remove();
  }

  vw.cpm.Panel.uids = 0;

  vw.cpm.Panel.maxFrameHeight = 650;

  vw.cpm.Panel.frametemplate = '<div class="frame"><div class="frame-header"><div class="frame-title"></div><div class="frame-tools"><div class="frame-tool frame-tool-close"></div><div class="frame-tool frame-tool-pin"></div><div class="frame-tool frame-tool-openfs"></div><div class="frame-tool frame-tool-hide"></div></div></div><div class="frame-body"></div></div>';





}(window.vw = window.vw || {}));
