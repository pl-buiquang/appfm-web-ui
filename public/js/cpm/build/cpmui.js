(function(vw){
  
  vw.cpm = {};

}(window.vw = window.vw || {}));
(function(vw){

  vw.cpm.CLI = function($el,options){
    this.options = options;
    this.view = new vw.cpm.CLIView(this,$el);
  }

  vw.cpm.CLI.prototype.init = function(){
    
  }


  vw.cpm.CLI.prototype.request = function(command){
    var me = this;

    if(command == "test"){
      var panel = this.view.createPanel();
      var module = new vw.cpm.Module(this,panel,{name:"pipeline-test"});
      
      
      return;
    }

    $.ajax({
        type: "POST",
        data : {cmd:command},
        url: me.options.cpmbaseurl+"/rest/cmd",
        dataType : "html",
        success: function(data, textStatus, jqXHR) {
          me.view.createPanel(data);
          console.log(data);
        },
        error:function(){

        }
      });
  }

}(window.vw = window.vw || {}));
(function(vw){

  vw.cpm.utils = {}

  vw.cpm.utils.guids = [];
  vw.cpm.utils.guid = function(){
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    var guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    while(vw.cpm.utils.guids.indexOf(guid)!=-1){
      guid = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    }
    vw.cpm.utils.guids.push(guid);
    return guid;
  }

}(window.vw = window.vw || {}));
(function(vw){

  vw.cpm.Module = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.ModuleView(this,$el);
  }

  vw.cpm.Module.prototype.init = function(){
    
  }


  vw.cpm.Module.prototype.request = function(command){

  }

}(window.vw = window.vw || {}));
(function(vw){

  vw.cpm.Result = function(){
    
  }

}(window.vw = window.vw || {}));
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

(function(vw){

  vw.cpm.ModuleView = function(model,$el){
    this.id = vw.cpm.utils.guid();
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.ModuleView.prototype.init=function(){
    var me = this;
    this.$el.append('<div id="'+this.id+'"></div>');

    var canvas = new draw2d.Canvas(me.id);
    var rect =  new draw2d.shape.basic.Rectangle();
       canvas.add(rect,100,10);
  }



}(window.vw = window.vw || {}));

(function(vw){

  vw.cpm.ResultView = function(model,$el){
    this.$el = $el;
    this.el = $el[0];
    this.model = model;
  };


}(window.vw = window.vw || {}));