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

    this.reload();

    this.helpmanager = new vw.cpm.HelpManager(this,this.menus['help-menu'].body);

    

    var firstrun = store.get('firstrun')
    if(!firstrun){
      var panel = this.openIFrame(this.options.cpmbaseurl+'/introslides',"Intro");
      //this.view.fullscreen(panel);
      me.demo();
      store.set('firstrun','done');
    }else{
      var panel = this.openIFrame(this.options.cpmbaseurl+'/introslides',"Intro");

    }
  
  }

  vw.cpm.CLI.prototype.reload = function(){
    var me = this;
    this.cpmsettingsmanager = new vw.cpm.CPMSettingsManager(this,this.menus['settings-menu'].body,{init:function(){
      me.initmodules();
    }});
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
      return;
    }

    if(command == "brat"){
      this.openIFrame('http://'+me.options.hostname+':8001/index.xhtml',"brat");
      return;
    }

    if(command.startsWith("file")){
      var elts = command.split(" ");
      me.openFile(elts[1]);
      return ;
    }

    if(command == "cadvisor"){
      this.openIFrame('http://'+me.options.hostname+':8082/',"cadvisor");
      return;
    }

    me.cpmRawCall(command,function(data){
      data = jQuery('<div />').text(data).html();
      data = '<code><pre class="pre-wrapped">'+data+'</pre></code>';
      me.view.createPanel(command,data);
      console.log(data);
    });

    
  }

  vw.cpm.CLI.prototype.openIFrame = function(url,title){
    var me = this;
    var name = url;
    if(title){
      name = title;
    }
    $panel = me.view.createPanel('<a href="'+url+'" target="_blank">'+name+'</a>');
    $panel.find('.frame-body').append('<iframe style="border-style:none;border:0;margin:0;padding:0;" width="100%" height="600px" src="'+url+'"></iframe>');
    return $panel;
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
        data = jQuery('<div />').text(data).html();
        //data = data.replace(/\s/g,'&nbsp;');
        //data = data.replace(/\n|\r|\r\n/g,'<br>');
        data = '<code><pre class="pre-wrapped">'+data+'</pre></code>';
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

  vw.cpm.CLI.prototype.demo = function(){
    var me = this;
    var intro = introJs();
    intro.setOptions({
      steps: [
        { 
          intro: "<h1>Welcome to AppFM</h1>the Application Frame Manager for NLP!<br>This short tutorial will present you the basic interface."
        },
        {
          element: document.querySelector('#cmd-bar-container'),
          intro: "This is the command bar. It sends direct raw command to the server.",
          position:'bottom'
        },
        {
          element: document.querySelectorAll('.frame')[0],
          intro: "Results of most commands are displayed in windows frame within content flow.",
          position:'bottom'
        },
        {
          element: document.querySelector('#corpus-menu'),
          intro: "There is 3 main menus. This first one show a list of all corpus handled by AppFM.",
          position: 'right'
        },
        {
          element: document.querySelector('#module-menu'),
          intro: "This one list the modules available that can be executed over the data available in the previous menu.",
          position: 'right'
        },
        {
          element: document.querySelector('#process-menu'),
          intro: "This last one shows the list of past modules executions.",
          position: 'right'
        },
        {
          element: document.querySelector('#settings-menu'),
          intro: "Global settings can be reviewed here.",
          position: 'right'
        },
        {
          element: document.querySelector('#help-menu'),
          intro: "...and if you need more help, this is where you can find further documentation.",
          position: 'right'
        }              
      ]
    });
    intro.onchange(function(element){
      if(element.id=="corpus-menu"){
        me.view.openMenu("corpus-menu");
      }else if(element.id=="module-menu"){
        me.view.openMenu("module-menu");
      }else if(element.id=="process-menu"){
        me.view.openMenu("process-menu");
      }else if(element.id=="settings-menu"){
        me.view.openMenu("settings-menu");
      }else if(element.id=="help-menu"){
        me.view.openMenu("help-menu");
      }
    });
    intro.onexit(function(){
      me.view.closeMenu();
    });
    intro.oncomplete(function(){
      me.view.closeMenu();
    });
    intro.start();
  }

}(window.vw = window.vw || {}));