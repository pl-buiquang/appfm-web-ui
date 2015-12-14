(function(vw){

  vw.cpm.CLIView = function(model,$el){
    this.$el = $el;
    this.el = $el[0];
    this.model = model;
    this.init();

    this.panels = [];
  };

  vw.cpm.CLIView.maxFrameHeight = 500;

  vw.cpm.CLIView.prototype.init=function(){
    var me = this;

    this.$fullscreencontainer = $(vw.cpm.CLIView.fullscreentemplate);
    $('body').append(this.$fullscreencontainer);

    vw.cpm.CLIView.maxFrameHeight = $(window).height()-178 ;

    $("#cmd-bar-container").perfectScrollbar({suppressScrollX:true});  

    $("#active-content").css('height',window.innerHeight-94);
    $("#active-content").perfectScrollbar();

    $("#menu-content-body").css('height',window.innerHeight-80);
    $("#menu-content-body").perfectScrollbar({suppressScrollX:true});
    $(window).on('resize',function(){
      $("#menu-content-body").css('height',window.innerHeight-80);
      $("#menu-content-body").perfectScrollbar({suppressScrollX:true});
      $("#active-content").css('height',window.innerHeight-94);
      $("#active-content").perfectScrollbar();
      vw.cpm.CLIView.maxFrameHeight = $(window).height()-178 ;
    });


    this.contentpanel = $("#active-content");

    this.cmdbar = $('#cmdbar').cmd({
        prompt: '$',
        width: '100%',
        commands: function(command) {
            me.model.request($('<div>'+command+'</div>').text());
        }
        /*
        keydown:function(e,term){
          console.log(arguments);
          console.log(this);
        }*/
    });

    $('#cmdbar').on("mousedown",function(e){
      if(e.which == 2 && vw.cpm.currentTextSelection){
        me.cmdbar.insert(vw.cpm.currentTextSelection);
        me.toggleCLI(true);
      }
    });

    // Menu animations
    jQuery("#menu").click(function(){
      me.toggleCLI(false);
    });

    jQuery("#app-title").click(function(){
      me.toggleCLI(false);
      // set default menu if menu is to be opened and is empty
      if(jQuery("#main").hasClass("menu-closed")){
        me.model.activemenu = "default";
        me.model.setActiveMenu("default");
      }
      

      jQuery(".menu-open").switchClass("menu-open","menu-closed");
      jQuery(".menu-closed").switchClass("menu-closed","menu-open");
      
    });

    $(".main-menu-item").click(function(){
      if(me.model.activemenu == this.id){
        jQuery(".menu-open").switchClass("menu-open","menu-closed");
        jQuery(".menu-closed").switchClass("menu-closed","menu-open");
      }else{
        jQuery(".menu-closed").switchClass("menu-closed","menu-open");
        me.model.setActiveMenu(this.id);
        me.model.activemenu = this.id;
      }
    });


    jQuery("#active-content").on("click",function(){
      me.toggleCLI(false);
    });

    jQuery("#cmd-bar-container").on("click",function(){
      me.toggleCLI(true);
    });
  }

  vw.cpm.CLIView.prototype.toggleCLI = function(activate){
    if(activate){
      if(!this.cmdbar.isenabled()){
        this.cmdbar.enable();
        this.cmdbar.focus();
      }
    }else{
      if(this.cmdbar.isenabled()){
        this.cmdbar.disable();
      }
    }
  }

  vw.cpm.CLIView.prototype.stick = function(panel){
    var me = this;
    panel.detach();
    this.contentpanel.find('#active-content-sticky').append(panel); 
    var button = panel.find('.frame-tool-pin');
    button.removeClass('frame-tool-pin');
    button.addClass('frame-tool-unpin');
    button.unbind('click');
    button.click(function(){
      me.unstick(panel);
    }); 
  }

  vw.cpm.CLIView.prototype.unstick = function(panel){
    var me = this;
    panel.detach();
    this.contentpanel.find('#active-content-flow').append(panel);
    var button = panel.find('.frame-tool-unpin');
    button.removeClass('frame-tool-unpin');
    button.addClass('frame-tool-pin');
    button.unbind('click');
    button.click(function(){
      me.stick(panel);
    });
  }

  vw.cpm.CLIView.prototype.getPanel = function(title,do_not_create_new_if_not_found){
    var me = this;
    var index = -1;
    for(var i in me.panels){
      if(me.panels[i].find(".frame-title").html()==title){
        index = i;
        break;
      }
    }
    if(index!=-1){
      return me.panels[i];
    }else if(do_not_create_new_if_not_found){
      return undefined;
    }else{
      return me.createPanel(title);
    }

  }

  vw.cpm.CLIView.prototype.quitFullscreen = function($panel){
    var me = this;
    me.$fullscreencontainer.fadeOut();
    var title = me.$fullscreencontainer.find(".frame-title").children();
    if(title.length == 0){
      $panel.find(".frame-title").append(title);
    }
    var content = me.$fullscreencontainer.find(".frame-body").children()
    if(content.length != 0){
      $panel.find(".frame-body").append(content);
    }
    
  }

  vw.cpm.CLIView.prototype.fullscreen = function($panel){
    var me = this;
    me.$fullscreencontainer.fadeIn();
    var title = $panel.find(".frame-title").children();
    if(title.length == 0){
      title = $panel.find(".frame-title").html();
    }
    var content = $panel.find(".frame-body").children();
    if(content.length==0){
      content = $panel.find(".frame-body").html();
    }
    me.$fullscreencontainer.find(".frame-title").empty();
    me.$fullscreencontainer.find(".frame-body").empty();
    me.$fullscreencontainer.find(".frame-title").append(title);
    me.$fullscreencontainer.find(".frame-body").append(content);
    me.$fullscreencontainer.find(".frame-tool-quitfs").unbind("click");
    me.$fullscreencontainer.find(".frame-tool-quitfs").on("click",function(){
      me.quitFullscreen($panel);
    });
  }

  vw.cpm.CLIView.prototype.show = function($panel){
    var me = this;
    var button = $panel.find('.frame-tool-show');
    button.removeClass('frame-tool-show');
    button.addClass('frame-tool-hide');
    button.unbind("click");
    $panel.find(".frame-body").slideDown({complete:function(){
      button.on("click",function(){
        me.hide($panel);
      });
    }});
  }

  vw.cpm.CLIView.prototype.hide = function($panel){
    var me = this;
    var button = $panel.find('.frame-tool-hide');
    button.removeClass('frame-tool-hide');
    button.addClass('frame-tool-show');
    button.unbind("click");
    $panel.find(".frame-body").slideUp({complete:function(){
      button.on("click",function(){
        me.show($panel);
      });
    }});
  }

  vw.cpm.CLIView.prototype.createPanel = function(title,data){
    var me = this;
    var html = vw.cpm.CLIView.frametemplate;
    var $el = $(html);
    this.contentpanel.find('#active-content-flow').prepend($el);
    if(title != 'undefined'){
      $el.find(".frame-title").append(title);
    }
    if(data != 'undefined'){
      $el.find('.frame-body').append(data);
    }

    this.panels.push($el);


    $el.find(".frame-title").mouseup(function (e){
       vw.cpm.currentTextSelection = vw.cpm.utils.getSelectionText();
     });
    $el.find(".frame-body").mouseup(function (e){
       vw.cpm.currentTextSelection = vw.cpm.utils.getSelectionText();
     });
 
    $el.find('.frame-tool-pin').click(function(){
      me.stick($el);

    });

    $el.find('.frame-tool-close').click(function(){
      var index = me.panels.indexOf($el);
      if(index!=-1){
        me.panels.splice(index,1);
      }
      $el.remove();

    });

    $el.find('.frame-tool-openfs').click(function(){
      me.fullscreen($el);

    });

    $el.find('.frame-tool-hide').click(function(){
      me.hide($el);
    });


    return $el;
  }

  vw.cpm.CLIView.frametemplate = '<div class="frame"><div class="frame-header"><div class="frame-title"></div><div class="frame-tools"><div class="frame-tool frame-tool-close"></div><div class="frame-tool frame-tool-pin"></div><div class="frame-tool frame-tool-openfs"></div><div class="frame-tool frame-tool-hide"></div></div></div><div class="frame-body"></div></div>';
  vw.cpm.CLIView.fullscreentemplate = '<div id="fullscreen-container"><div class="frame-header"><div class="frame-title"></div><div class="frame-tools"><div class="frame-tool frame-tool-quitfs"></div></div></div><div class="frame-body"></div></div>';


}(window.vw = window.vw || {}));
