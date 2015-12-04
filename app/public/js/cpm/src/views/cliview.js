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

    vw.cpm.CLIView.maxFrameHeight = $(window).height()-154 ;

    $("#cmd-bar-container").perfectScrollbar({suppressScrollX:true});  

    $("#menu-content-body").css('height',window.innerHeight-80);
    $("#menu-content-body").perfectScrollbar();
    $(window).on('resize',function(){
      $("#menu-content-body").css('height',window.innerHeight-80);
      $("#menu-content-body").perfectScrollbar();
      vw.cpm.CLIView.maxFrameHeight = $(window).height()-154 ;
    });


    this.contentpanel = $("#active-content");

    this.cmdbar = $('#cmdbar').cmd({
        prompt: '$',
        width: '100%',
        commands: function(command) {
          console.log(command);
            console.log(this);
            me.model.request(command);
        },/*
        keydown:function(e,term){
          console.log(arguments);
          console.log(this);
        }*/
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
      

      jQuery("#main.menu-open").switchClass("menu-open","menu-closed");
      jQuery("#main.menu-closed").switchClass("menu-closed","menu-open");
      
    });

    $(".main-menu-item").click(function(){
      if(me.model.activemenu == this.id){
        jQuery("#main.menu-open").switchClass("menu-open","menu-closed");
        jQuery("#main.menu-closed").switchClass("menu-closed","menu-open");
      }else{
        jQuery("#main.menu-closed").switchClass("menu-closed","menu-open");
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
    if(activate!="undefined"){
      if(activate){
        if(!this.cmdbar.isenabled()){
          this.cmdbar.enable();
        }
      }else{
        if(this.cmdbar.isenabled()){
          this.cmdbar.disable();
        }
      }
    }else if(this.cmdbar.isenabled()){
      this.cmdbar.disable();
    }else{
        this.cmdbar.enable();
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


    return $el;
  }

  vw.cpm.CLIView.frametemplate = '<div class="frame"><div class="frame-header"><div class="frame-title"></div><div class="frame-tools"><div class="frame-tool frame-tool-close"></div><div class="frame-tool frame-tool-pin"></div></div></div><div class="frame-body"></div></div>';


}(window.vw = window.vw || {}));
