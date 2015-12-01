(function(vw){

  vw.cpm.CLIView = function(model,$el){
    this.$el = $el;
    this.el = $el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.CLIView.prototype.init=function(){
    var me = this;
    $("#cmd-bar-container").perfectScrollbar({suppressScrollX:true});  
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

    jQuery("#menu").click(function(){
      me.toggleCLI(false);
      jQuery("#main.menu-open").switchClass("menu-open","menu-closed");
      jQuery("#main.menu-closed").switchClass("menu-closed","menu-open");
    })

    jQuery("#active-content").on("click",function(){
      me.toggleCLI(false);
    })

    jQuery("#cmd-bar-container").on("click",function(){
      me.toggleCLI(true);
    })
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

  vw.cpm.CLIView.prototype.createPanel = function(){
    var html = '<div class="frame"></div>';
    var $el = $(html);
    this.contentpanel.append($el);
    return $el;
  }


}(window.vw = window.vw || {}));
