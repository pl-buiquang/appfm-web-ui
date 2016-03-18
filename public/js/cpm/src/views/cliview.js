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
    $("#active-content").perfectScrollbar({suppressScrollX:true});

    $("#menu-content-body").css('height',window.innerHeight-80);
    $("#menu-content-body").perfectScrollbar({suppressScrollX:true});
    $(window).on('resize',function(){
      $("#menu-content-body").css('height',window.innerHeight-80);
      $("#menu-content-body").perfectScrollbar({suppressScrollX:true});
      $("#active-content").css('height',window.innerHeight-94);
      $("#active-content").perfectScrollbar({suppressScrollX:true});
      vw.cpm.CLIView.maxFrameHeight = $(window).height()-178 ;
    });

    $("#log-button").click(function(){
      me.model.logger.view();
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

    

    jQuery("#app-title").click(function(){
      me.toggleCLI(false);
      // set default menu if menu is to be opened and is empty
      if(me.model.activemenu =="default"){
        jQuery(".menu-open").switchClass("menu-open","menu-closed");
        jQuery(".menu-closed").switchClass("menu-closed","menu-open");
      }else{
        me.openMenu("default");
      }
      
    });

    $(".main-menu-item").click(function(){
      if(me.model.activemenu == this.id){
        jQuery(".menu-open").switchClass("menu-open","menu-closed");
        jQuery(".menu-closed").switchClass("menu-closed","menu-open");
      }else{
        me.openMenu(this.id);
      }
    });

    // Menu animations
    jQuery("#menu").click(function(){
      me.toggleCLI(false);
    });

    jQuery("#menu-content").on("click",function(){
      me.toggleCLI(false);
    });

    jQuery("#active-content").on("click",function(){
      me.toggleCLI(false);
    });

    jQuery("#cmd-bar-container").on("click",function(){
      me.toggleCLI(true);
    });
  }

  vw.cpm.CLIView.prototype.closeMenu = function(){
    var me = this;
    me.model.activemenu = "default";
    me.model.setActiveMenu("default");
    jQuery(".menu-open").switchClass("menu-open","menu-closed");
  }

  vw.cpm.CLIView.prototype.openMenu = function(id){
    var me = this;
    jQuery(".menu-closed").switchClass("menu-closed","menu-open");
    me.model.setActiveMenu(id);
    me.model.activemenu = id;
  }

  vw.cpm.CLIView.prototype.setStatusButton = function(status){
    $("#status-button").removeClass();
    $("#status-button").addClass("status-button-"+status);
    if(status == "limited"){
      $("#status-button").attr("title","Websocket does not seem to work. Some feature won't be available...");
    }else{
      $("#status-button").attr("title",undefined);
    }
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

  vw.cpm.CLIView.prototype.refreshPanelList = function(){
    var me =this;
    var html = "";
    for (var i = me.panels.length - 1; i >= 0; i--) {
      var panel = me.panels[i];
      html += '<div class="panel-item" uid="'+panel.uid+'">'+panel.$el.find('.frame-title').text()+'</div><div class="panel-item-close" uid="'+panel.uid+'"></div>';
    }
    this.model.menus["default"].body.empty();
    this.model.menus["default"].body.append(html);
    this.model.menus["default"].body.find(".panel-item").click(function(){
      var panel = me.getPanelFromUID($(this).attr("uid"));
      panel.focus();
    });
    this.model.menus["default"].body.find(".panel-item-close").click(function(){
      var panel = me.getPanelFromUID($(this).attr("uid"));
      panel.delete();
    });
  }

  vw.cpm.CLIView.prototype.getPanelFromSID = function(sid,do_not_create_new_if_not_found,title){
    var me = this;
    var index = -1;
    for(var i in me.panels){
      if(me.panels[i].semanticid != undefined && me.panels[i].semanticid==sid){
        index = i;
        break;
      }
    }
    if(index!=-1){
      return me.panels[index];
    }else if(do_not_create_new_if_not_found){
      return undefined;
    }else{
      return me.createPanel(title,"",sid);
    }
  }

  vw.cpm.CLIView.prototype.getPanel = function(title,do_not_create_new_if_not_found){
    var me = this;
    var index = -1;
    for(var i in me.panels){
      if(me.panels[i].$el.find(".frame-title").html()==title){
        index = i;
        break;
      }
    }
    if(index!=-1){
      return me.panels[index];
    }else if(do_not_create_new_if_not_found){
      return undefined;
    }else{
      return me.createPanel(title);
    }

  }

  vw.cpm.CLIView.prototype.getPanelFromUID = function(uid){
    var me = this;
    var index = -1;
    for(var i in me.panels){
      if(me.panels[i].uid==uid){
        index = i;
        break;
      }
    }
    if (index != -1){
      return me.panels[index];
    }else{
      return undefined;
    }
  }

  vw.cpm.CLIView.prototype.getPanelFromContent = function($el){
    return this.getPanelFromUID($el.parents(".frame").attr("uid"));
  }


  vw.cpm.CLIView.prototype.createPanel = function(title,data,sid){
    var panel = new vw.cpm.Panel(this.model,title,data,sid);
    
    return panel;
  }

  vw.cpm.CLIView.fullscreentemplate = '<div id="fullscreen-container"><div class="frame-header"><div class="frame-title"></div><div class="frame-tools"><div class="frame-tool frame-tool-quitfs"></div></div></div><div class="frame-body"></div></div>';


}(window.vw = window.vw || {}));
