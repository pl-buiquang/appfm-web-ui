(function(vw){
  
  vw.cpm = {};

}(window.vw = window.vw || {}));
(function(vw){

  vw.cpm.CLI = function($el,options){
    this.options = options;
    this.view = new vw.cpm.CLIView(this,$el);
    this.init();
  }

  vw.cpm.CLI.prototype.init = function(){
    var me = this;

    

    this.menus = {
      "default":{title:"Corpus & Process Manager",body:"???"},
      "corpus-menu":{title:"Corpora",body:$('<div></div>')},
      "module-menu":{title:"Modules",body:"???"},
      "process-menu":{title:"Process",body:"???"},
      "settings-menu":{title:"Settings",body:"???"},
      "help-menu":{title:"Help",body:"???"}
    }

    this.corpusmanager = new vw.cpm.CorpusManager(this,this.menus['corpus-menu'].body);

    this.cpmCall("settings",function(data){
      var html ="";
      html += '<div> Result directory : '+data.result_dir+'</div>';
      html += '<div> Corpus directory : '+data.corpus_dir+'</div>';
      var moduledir = '<div>'
      for (var i = data.modules.length - 1; i >= 0; i--) {
        moduledir += "<span ";
        if(data.modules[i].exist){
          moduledir += 'style="color:green">';
        }else{
          moduledir += 'style="color:red">';
        }
        moduledir+= data.modules[i].name+'</span>';
      };
      moduledir += '</div>';
      html += moduledir;
      me.menus['settings-menu'].body = html;
    });
  }

  vw.cpm.CLI.prototype.setActiveMenu = function(menuitem){
    this.view.$el.find('#menu-content-title').empty();
    this.view.$el.find('#menu-content-body').empty();

    var menucontent = this.menus[menuitem];
    this.view.$el.find('#menu-content-title').append(menucontent.title);
    this.view.$el.find('#menu-content-body').append(menucontent.body);
  }

  vw.cpm.CLI.prototype.cpmCall = function(command,callback){
    var me = this;
    $.ajax({
        type: "POST",
        data : {
          cmd: command+" --json"
        },
        url: me.options.cpmbaseurl+"rest/cmd",
        dataType : "json",
        success: function(data, textStatus, jqXHR) {
          callback.call(me,data);
        },
        error:function(){

        }
      });
  }


  vw.cpm.CLI.prototype.request = function(command){
    var me = this;

    if(command == "test"){
      var panel = this.view.createPanel();
      var module = new vw.cpm.Module(this,panel.find('.frame-body'),{name:"pipeline-test"});
      
      
      return;
    }

    me.cpmCall(command,function(data){
      me.view.createPanel(command,data);
          console.log(data);
        });

    
  }


  vw.cpm.CLI.prototype.cpmSettings = function(){
    
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

  vw.cpm.CorpusManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.CorpusManagerView(this,$el);
    this.filetree = {}
    this.init();
  }

  vw.cpm.CorpusManager.prototype.init = function(){
    var me = this;
    me.sync();
  }

  vw.cpm.CorpusManager.prototype.sync = function(){
    var me = this;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"corpus ls --json"},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        me.filetree = data;
        me.view.refresh();
      }
    })
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



}(window.vw = window.vw || {}));
(function(vw){

  vw.cpm.ModuleManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.ModuleView(this,$el);
  }

  vw.cpm.ModuleManager.prototype.init = function(){
    
  }



}(window.vw = window.vw || {}));
(function(vw){

  vw.cpm.CLIView = function(model,$el){
    this.$el = $el;
    this.el = $el[0];
    this.model = model;
    this.init();

    this.panels = [];
  };

  vw.cpm.CLIView.prototype.init=function(){
    var me = this;
    $("#cmd-bar-container").perfectScrollbar({suppressScrollX:true});  

    $("#menu-content-body").css('height',window.innerHeight-80);
    $("#menu-content-body").perfectScrollbar();
    $(window).on('resize',function(){
      $("#menu-content-body").css('height',window.innerHeight-80);
      $("#menu-content-body").perfectScrollbar();
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
      if(jQuery("#main").hasClass("menu-closed") && me.$el.find("#menu-content-title").children().length==0){
        me.model.setActiveMenu("default");
      }

      jQuery("#main.menu-open").switchClass("menu-open","menu-closed");
      jQuery("#main.menu-closed").switchClass("menu-closed","menu-open");
      
    });

    $(".main-menu-item").click(function(){
      jQuery("#main.menu-closed").switchClass("menu-closed","menu-open");
      me.model.setActiveMenu(this.id);
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

(function(vw){

  vw.cpm.CorpusManagerView = function(model,$el){
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.CorpusManagerView.prototype.init=function(){
    var me = this;

  }

  vw.cpm.CorpusManagerView.prototype.refresh = function(){
    this.$el.html(vw.cpm.CorpusManagerView.renderSubTree(this.model.filetree,0));
  }

  vw.cpm.CorpusManagerView.renderSubTree = function(tree,offset){
    var html = "";
    if(typeof tree == "object"){
      if(tree.constructor === Array){
        for (var i = tree.length - 1; i >= 0; i--) {
          html += vw.cpm.CorpusManagerView.renderSubTree(tree[i],offset)
        };  
      }else{
        for (var i in tree) {
          html += '<div class="treeview-node" style="margin-left:'+offset+'px;">'+i+'</div>' + vw.cpm.CorpusManagerView.renderSubTree(tree[i],offset + 12)
        };
      }

    }else if(typeof tree == "string"){
      html += '<div class="treeview-leaf" style="margin-left:'+offset+'px;">'+tree+'</div>';
    }
    return html;
  }



}(window.vw = window.vw || {}));

(function(vw){

  vw.cpm.ModuleManagerView = function(model,$el){
    this.id = vw.cpm.utils.guid();
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.ModuleManagerView.prototype.init=function(){
    var me = this;
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
    this.$el.append('<div id="'+this.id+'" class="canvas-view"></div>');

    var canvas = new draw2d.Canvas(me.id);
    var rect =  new draw2d.shape.basic.Rectangle();
       canvas.add(rect,100,10);
  }



}(window.vw = window.vw || {}));
