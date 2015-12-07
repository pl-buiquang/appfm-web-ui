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

    this.activemenu = "";

    this.menus = {
      "default":{title:"Corpus & Process Manager",body:$('<div></div>')},
      "corpus-menu":{title:"Corpora",body:$('<div></div>')},
      "module-menu":{title:"Modules",body:$('<div></div>')},
      "process-menu":{title:"Process",body:$('<div></div>')},
      "settings-menu":{title:"Settings",body:$('<div></div>')},
      "help-menu":{title:"Help",body:$('<div></div>')}
    }

    this.helpmanager = new vw.cpm.HelpManager(this,this.menus['help-menu'].body);

    this.corpusmanager = new vw.cpm.CorpusManager(this,this.menus['corpus-menu'].body);

    this.modulesmanager = new vw.cpm.ModuleManager(this,this.menus['module-menu'].body);


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
    this.view.$el.find('#menu-content-body').children().detach();

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

  vw.cpm.HelpManager = function(app,$el,options){
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.HelpManagerView(this,$el);
    this.init();
  }

  vw.cpm.HelpManager.prototype.init = function(){
    var me = this;
  }




}(window.vw = window.vw || {}));
(function(vw){

  vw.cpm.Module = function(app,$el,moduledef){
    this.def = moduledef;
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
    this.view = new vw.cpm.ModuleManagerView(this,$el);
    this.init();
    this.moduletree = {};
    this.modules = {};
  }

  vw.cpm.ModuleManager.prototype.init = function(){
    var me = this;
    me.sync();
  }

  vw.cpm.ModuleManager.prototype.sync = function(){
    var me = this;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"module ls --json"},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        me.moduletree = data;
        me.parseModuleTree(data);
        me.view.refresh();
      }
    })
  }

  vw.cpm.ModuleManager.prototype.parseModuleTree = function(tree){
    if(typeof tree == "object"){
      if(tree.constructor === Array){
        for (var i = tree.length - 1; i >= 0; i--) {
          this.parseModuleTree(tree[i])
        };  
      }else{
        if(tree.hasOwnProperty("folder") && tree.folder){
          this.parseModuleTree(tree.items);
        }else{
          this.modules[tree.modulename] = tree;
        }
      }
    }
  }

  vw.cpm.ModuleManager.prototype.fetch = function(modulename,callback){
    var me = this;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"module info "+modulename+" --json"},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        callback.call(me,data);
      }
    })

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

  vw.cpm.CLIView.maxFrameHeight = 500;

  vw.cpm.CLIView.prototype.init=function(){
    var me = this;

    vw.cpm.CLIView.maxFrameHeight = $(window).height()-154 ;

    $("#cmd-bar-container").perfectScrollbar({suppressScrollX:true});  

    $("#active-content").css('height',window.innerHeight-70);
    $("#active-content").perfectScrollbar();

    $("#menu-content-body").css('height',window.innerHeight-80);
    $("#menu-content-body").perfectScrollbar();
    $(window).on('resize',function(){
      $("#menu-content-body").css('height',window.innerHeight-80);
      $("#menu-content-body").perfectScrollbar();
      $("#active-content").css('height',window.innerHeight-70);
      $("#active-content").perfectScrollbar();
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
    var me = this;
    this.$el.html(vw.cpm.CorpusManagerView.renderSubTree(this.model.filetree,0));
    this.$el.find('.treeview-node').on("click",function(){
      var parent = $(this).parent();
      if(parent.hasClass("treeview-fold")){
        var children = parent.children();
        if(parent.hasClass("treeview-folded")){
          $(children[1]).slideDown();
          parent.removeClass("treeview-folded");
          parent.addClass("treeview-unfolded");
        }else{
          $(children[1]).slideUp();
          parent.removeClass("treeview-unfolded");
          parent.addClass("treeview-folded");
        }
      }
    });
    this.$el.find('.treeview-node').draggable({ appendTo: "body",opacity: 0.7, helper: "clone" });
    this.$el.find('.treeview-node').droppable();
  }

  function compareTreeView(a,b){
    var at = typeof a;
    var bt = typeof b;
    
    if(a.hasOwnProperty("...")){
      return -1;
    }else if(b.hasOwnProperty("...")){
      return 1;
    }else if(at != bt){
      if(at == "string"){
        return -1;
      }else if(bt == "string"){
        return 1;
      }else{
        return 0; // should not happen since it means that both elements are objects
      }
    }else {
      return 0;
    }
  }

  vw.cpm.CorpusManagerView.renderSubTree = function(tree,offset){
    var html = "";
    if(typeof tree == "object"){
      if(tree.constructor === Array){
        tree = tree.sort(compareTreeView);
        for (var i = tree.length - 1; i >= 0; i--) {
          html += vw.cpm.CorpusManagerView.renderSubTree(tree[i],offset)
        };  
      }else{
        for (var i in tree) {
          if(i=="..."){
            if(tree[i] == "file"){
              html += '<div class="treeview-leaf treeview-more" style="margin-left:'+offset+'px;">'+i+'</div>';
            }else{
              html += '<div class="treeview-node treeview-more" style="margin-left:'+offset+'px;">'+i+'</div>';
            }
          }else{
            var folded = "treeview-folded";
            var hidden = 'style="display:none;"';
            if(offset == 0){
              folded = "treeview-unfolded";
              hidden = "";
            }
            html += '<div class="treeview-fold '+folded+'"><div class="treeview-node" style="margin-left:'+offset+'px;">'+i+'</div><div '+hidden+'>' + vw.cpm.CorpusManagerView.renderSubTree(tree[i],offset + 14)+'</div></div>';
          }
        };
      }

    }else if(typeof tree == "string"){
      html += '<div class="treeview-leaf" style="margin-left:'+offset+'px;">'+tree+'</div>';
    }
    return html;
  }



}(window.vw = window.vw || {}));

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

    this.$el.find("#help-module-doc").on("click",function(){
      me.model.app.view.createPanel("Modules doc page",'<iframe width="100%" height="'+vw.cpm.CLIView.maxFrameHeight+'px;" style="border:none;" src="https://versatile-world.net/wiki/work/cpm/spec_draft?rev=1445003156&mddo=print">');
    });
    this.$el.find("#help-main-wiki-page").on("click",function(){
      me.model.app.view.createPanel("Main wiki page",'<iframe width="100%" height="'+vw.cpm.CLIView.maxFrameHeight+'px;" style="border:none;" src="https://versatile-world.net/wiki/work/cpm">');
    });
    
  }

  vw.cpm.HelpManagerView.template = '<div id="help-main-wiki-page" style="cursor:pointer;">Main wiki</div><div id="help-module-doc" style="cursor:pointer;">Modules</div>';

  



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

  vw.cpm.ModuleManagerView.prototype.refresh = function(){
    var me = this;
    this.$el.html(vw.cpm.ModuleManagerView.renderSubTree(this.model.moduletree,0));
    this.$el.find('.treeview-node').on("click",function(){
      var parent = $(this).parent();
      if(parent.hasClass("treeview-fold")){
        var children = parent.children();
        if(parent.hasClass("treeview-folded")){
          $(children[1]).slideDown();
          parent.removeClass("treeview-folded");
          parent.addClass("treeview-unfolded");
        }else{
          $(children[1]).slideUp();
          parent.removeClass("treeview-unfolded");
          parent.addClass("treeview-folded");
        }
      }
    });
    this.$el.find('.treeview-leaf').on("click",function(){
      var modulename = $(this).html();
      var $panel = me.model.app.view.createPanel(modulename);
      var module = new vw.cpm.Module(me.model.app,$panel.find(".frame-body"),me.model.modules[modulename]);
      module.view.render();
    });
    this.$el.find('.treeview-leaf').draggable({ appendTo: "body",opacity: 0.7, helper: "clone" });
    this.$el.find('.treeview-leaf').droppable();
  }

  function compareTreeView(a,b){
    var at = typeof a;
    var bt = typeof b;
    
    if(a.hasOwnProperty("folder") && a.folder){
      return 1;
    }else if(b.hasOwnProperty("folder") && b.folder){
      return -1;
    }else if(at != bt){
      if(at == "string"){
        return -1;
      }else if(bt == "string"){
        return 1;
      }else{
        return 0; // should not happen since it means that both elements are objects
      }
    }else {
      return 0;
    }
  }

  vw.cpm.ModuleManagerView.renderSubTree = function(tree,offset){
    var html = "";
    if(typeof tree == "object"){
      if(tree.constructor === Array){
        tree = tree.sort(compareTreeView);
        for (var i = tree.length - 1; i >= 0; i--) {
          html += vw.cpm.ModuleManagerView.renderSubTree(tree[i],offset)
        };  
      }else{
        if(tree.hasOwnProperty("folder") && tree.folder){
          var folded = "treeview-folded";
            var hidden = 'style="display:none;"';
            if(true || offset == 0){
              folded = "treeview-unfolded";
              hidden = "";
            }
            html += '<div class="treeview-fold '+folded+'"><div class="treeview-node" style="margin-left:'+offset+'px;">'+tree.foldername+'</div><div '+hidden+'>' + vw.cpm.ModuleManagerView.renderSubTree(tree.items,offset + 14)+'</div></div>';
        }else if(tree.hasOwnProperty("module")){
          html += '<div class="treeview-leaf" style="margin-left:'+offset+'px;">'+tree.module.name+'</div>';
        }else{
          html += '<div class="treeview-leaf" style="margin-left:'+offset+'px; color:red;">'+tree.modulename+'</div>';
        }
        
      }

    }
    return html;
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
    this.$el.append(vw.cpm.ModuleView.template);
    if(me.model.def.hasOwnProperty("module")){
      me.renderGraphical();
    }else{
      me.$el.find(".module-content-view").append(me.model.def.source.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\s)/g,"&nbsp;"));
    }
    this.$el.find(".module-view-source").on("click",function(){
      me.$el.find(".module-content-view").empty();
      me.$el.find(".module-content-view").append(me.model.def.source.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\s)/g,"&nbsp;"));
    });
    this.$el.find(".module-view-graphic").on("click",function(){
      me.$el.find(".module-content-view").empty();
      if(me.model.def.hasOwnProperty("module")){
        me.renderGraphical();
      }else{
        me.$el.find(".module-content-view").append("Unable to display graphical view of this module, definition contains error, please correct source file before");
      }
    });
  }

  vw.cpm.ModuleView.prototype.render=function(){
  }

  vw.cpm.ModuleView.prototype.renderGraphical=function(){
    var me = this;
    this.$el.find(".module-content-view").append('<div id="'+this.id+'" class="canvas-view"></div>');

    var canvas = new draw2d.Canvas(me.id);
    var rect =  new draw2d.shape.basic.Rectangle();
       canvas.add(rect,100,10);
  }

  vw.cpm.ModuleView.template = '<div class="module-header"><span class="module-view-source" style="float:left; margin-right:20px;">source</span><span class="module-view-graphic" style="float:left;">view</span></div><div class="module-content-view"></div>';



}(window.vw = window.vw || {}));
