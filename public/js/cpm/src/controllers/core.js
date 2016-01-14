(function(vw){

  vw.cpm.CLI = function($el,options){
    this.options = options;
    this.view = new vw.cpm.CLIView(this,$el);
    this.init();
    
    
  }

  



  
  vw.cpm.CLI.prototype.init = function(){
    var me = this;

    this.foo = "bar";

    if (!store.enabled) {
      alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser. Your session won\'t be saved across page reloads');
      
    }
    console.log(store.get('test'));

    store.set('test',this.view.panels);  



    this.activemenu = "";

    this.menus = {
      "default":{title:"Application Frame Mngr",body:$('<div></div>')},
      "corpus-menu":{title:"Corpora",body:$('<div></div>')},
      "module-menu":{title:"Modules",body:$('<div></div>')},
      "process-menu":{title:"Process",body:$('<div></div>')},
      "settings-menu":{title:"Settings",body:$('<div></div>')},
      "help-menu":{title:"Help",body:$('<div></div>')}
    }

    this.cpmsettingsmanager = new vw.cpm.CPMSettingsManager(this,this.menus['settings-menu'].body,{init:function(){
      me.initmodules();
    }});

    this.helpmanager = new vw.cpm.HelpManager(this,this.menus['help-menu'].body);

    

    var firstrun = store.get('firstrun')
    if(!firstrun){
      var panel = this.view.createPanel('Intro',this.helpmanager.slides);  
      this.view.fullscreen(panel);
      store.set('firstrun','done');
    }else{
      var panel = this.view.createPanel('Intro',this.helpmanager.slides);

    }
  
  }

  vw.cpm.CLI.prototype.initmodules = function(){
    this.modulesmanager = new vw.cpm.ModuleManager(this,this.menus['module-menu'].body);

    this.corpusmanager = new vw.cpm.CorpusManager(this,this.menus['corpus-menu'].body);

    this.processmanager = new vw.cpm.ProcessManager(this,this.menus['process-menu'].body);
  }

  vw.cpm.CLI.prototype.setActiveMenu = function(menuitem){
    this.view.$el.find('#menu-content-title').empty();
    this.view.$el.find('#menu-content-body').children().detach();

    var menucontent = this.menus[menuitem];
    this.view.$el.find('#menu-content-title').append(menucontent.title);
    this.view.$el.find('#menu-content-body').append(menucontent.body);
  }

  vw.cpm.CLI.prototype.cpmRawCall = function(command,callback){
    var me = this;
    $.ajax({
        type: "POST",
        data : {
          cmd: command
        },
        url: me.options.cpmbaseurl+"rest/cmd",
        success: function(data, textStatus, jqXHR) {
          callback.call(me,data);
        },
        error:function(){

        }
      });
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

    command = command.trim();

    if(command == "test"){
      var $panel = this.view.createPanel("test");
      var process = new vw.cpm.Process(this,$panel.find('.frame-body'),{moduledef:me.modulesmanager.modules['stanford-parser'],runconf:{IN:'/home/paul/custom/cpm/data/testcorpus/humanism.txt'},runid:"some run id"});
    }

    if(command == "help"){
      me.helpmanager.displayCLIHelp();
    }

    if(command == "brat"){
      $panel = me.view.getPanel("brat");
      $panel.find('.frame-body').empty();
      $panel.find('.frame-body').append('<iframe style="border-style:none;border:0;margin:0;padding:0;" width="100%" height="500px" src="http://'+me.options.hostname+':8001/index.xhtml"></iframe>');
      return;
    }

    if(command.startsWith("file")){
      var elts = command.split(" ");
      me.openFile(elts[1]);
      return ;
    }

    me.cpmRawCall(command,function(data){
      me.view.createPanel(command,data);
      console.log(data);
    });

    
  }

  vw.cpm.CLI.prototype.openFile = function(filepath){
    var me = this;
    $.ajax({
      type: "POST",
      data : {
        file:filepath
      },
      url: me.options.cpmbaseurl+"rest/file",
      success: function(data, textStatus, jqXHR) {
        data = '<code><pre>'+data+'</pre></code>';
        me.view.createPanel(filepath,data);
      },
      error:function(){

      }
    });
  }

  vw.cpm.CLI.prototype.getFileContent = function(filepath,callback){
    var me = this;
    $.ajax({
      type: "POST",
      data : {
        file:filepath
      },
      url: me.options.cpmbaseurl+"rest/file",
      success: function(data, textStatus, jqXHR) {
        callback.call(me,data);
      },
      error:function(){

      }
    });
  }


  vw.cpm.CLI.prototype.cpmSettings = function(){
    
  }

}(window.vw = window.vw || {}));