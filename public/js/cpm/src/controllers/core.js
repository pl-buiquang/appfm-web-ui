(function(vw){

  vw.cpm.CLI = function($el,options){
    this.options = options;
    this.view = new vw.cpm.CLIView(this,$el);
    this.init();
    
    
  }

  



  
  vw.cpm.CLI.prototype.init = function(){
    var me = this;

    vw.cpm.SingletonCLI = this;

    this.logger = new vw.cpm.Logger(this,{});

    this.logger.info("Starting AppFM web ui");

    this.testmodule = "treetagger_fr";

    if (!store.enabled) {
      alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser. Your session won\'t be saved across page reloads');
      
    }

    


    this.activemenu = "";

    this.menus = {
      "default":{title:"Application Frame Mngr",body:$('<div></div>')},
      "corpus-menu":{title:"Corpora",body:$('<div></div>')},
      "module-menu":{title:"Modules",body:$('<div></div>')},
      "process-menu":{title:"Process",body:$('<div></div>')},
      "settings-menu":{title:"Settings",body:$('<div></div>')},
      "help-menu":{title:"Help",body:$('<div></div>')}
    }

    me.wssocketactive = false;


    this.reload();

    this.checkstatus();

    this.helpmanager = new vw.cpm.HelpManager(this,this.menus['help-menu'].body);



  
  }

  vw.cpm.CLI.prototype.checkstatus = function(){
    var me = this;
    if(this.longpolling);
    clearInterval(this.longpolling);
    this.longpolling = setInterval(function(){
      $.ajax({
        type: "POST",
        data : {
          cmd: "status"
        },
        url: me.options.cpmbaseurl+"rest/cmd",
        success: function(data, textStatus, jqXHR) {
          if(data == "timeout"){
            me.logger.error("Couldn't connect to server : timeout");
            me.view.setStatusButton("offline");
          }else{
            if(me.wssocketactive){
              me.view.setStatusButton("online");
              clearInterval(me.longpolling);
              me.longpolling = undefined;
            }else{
              me.view.setStatusButton("limited");
            }
          }
        },
        error:function(jqXHR,textStatus,errorThrown){
          me.logger.error(errorThrown);
          me.view.setStatusButton("offline");
        },
        timeout: 20000 
      });
    },60000);
  }

  vw.cpm.CLI.prototype.initWS = function(){
    var me = this;
    try{
      this.wssocket = new WebSocket("ws://"+me.options.cpmwshost);
      this.wssocket.onopen = function(e){
        me.logger.info("opening websocket connection");
        me.wssocketactive = true;
        me.view.setStatusButton("online");
      };
      this.wssocket.onclose = function(e){
        me.logger.info("websocket connection ended with code "+e.code+" ( "+e.reason+" )");
        me.wssocketactive = false;
        me.checkstatus();
        console.log(arguments);
        //me.view.setStatusButton("offline");
      };
      this.wssocket.onmessage = function(e){
        var obj = JSON.parse(e.data);
        
        if(obj.type == "kernel-started"){

        }else if(obj.type == "kernel-stopped"){

        }else if(obj.type == "process-ended"){
          if(_.indexOf(me.processmanager.startedprocess,obj.target)!=-1){
            vw.cpm.utils.showNotif("Process ended !","The run ("+obj.target+") of module "+obj.more+" has ended !",function(){
              me.processmanager.showRun(obj.more,obj.target);
            },me.options.cpmbaseurl+'public/img/system/process.png');
            me.processmanager.showRun(obj.more,obj.target);
          }
        }else if(obj.type == "process-started"){
          me.processmanager.fetchAll();
        }else if(obj.type == "process-deleted"){
          me.processmanager.fetchAll();
        }else if(obj.type == "process-update"){
          /*if(_.indexOf(me.processmanager.startedprocess,obj.target)!=-1){
            // todo : should update view with status log
          }*/
          me.logger.info(obj.target+"\n"+obj.more);
        }else if(obj.type == "module-created"){
          me.modulesmanager.fetchAll();
        }else if(obj.type == "module-updated"){
          me.modulesmanager.fetchAll();
        }else{
          console.log(e);
          me.logger.info(obj.type+" "+obj.target+" "+obj.more);
        }
      };
      this.wssocket.onerror = function(e){
        console.log(arguments);
        me.checkstatus();
      };
    }catch(err){
      me.logger.warn(err);
      return;
    }
  }

  vw.cpm.CLI.prototype.reload = function(){
    var me = this;
    this.cpmsettingsmanager = new vw.cpm.CPMSettingsManager(this,this.menus['settings-menu'].body,{init:function(){
      var connectionInfo = store.get("connectionInfo");
      if(connectionInfo){
        if(me.options.cpmwshost != connectionInfo["CPM_WS_HOST"] && 
          me.options.cpmhost != connectionInfo["CPM_HOST"] &&
          me.options.cpmport !=connectionInfo["CPM_PORT"]){
          me.cpmsettingsmanager.updateConnection(connectionInfo["CPM_HOST"],connectionInfo["CPM_PORT"],connectionInfo["CPM_WS_HOST"])
        }
      }
      me.logger.info("Received appfm server settings");
      me.initmodules();
    }});
  }

  vw.cpm.CLI.prototype.isInitiated = function(){
    return this.cpmsettingsmanager.initiated && this.modulesmanager.initiated && this.processmanager.initiated && this.corpusmanager.initiated;
  }

  vw.cpm.CLI.prototype.initmodules = function(){
    var me = this;
    this.view.setStatusButton("online");

    this.modulesmanager = new vw.cpm.ModuleManager(this,this.menus['module-menu'].body);

    this.corpusmanager = new vw.cpm.CorpusManager(this,this.menus['corpus-menu'].body);

    this.processmanager = new vw.cpm.ProcessManager(this,this.menus['process-menu'].body);

    this.initWS();

    var firstrun = store.get('firstrun')
    if(!firstrun){
      var panel = this.openIFrame(this.options.cpmbaseurl+'/introslides',"Intro");
      //this.view.fullscreen(panel);
      me.demo();
      store.set('firstrun','done');
    }else{
      var panels = store.get(me.options.hostname+"-panels");
      if(panels && panels.length > 0){
        store.set(me.options.hostname+"-panels",[]);
        for (var i = panels.length - 1; i >= 0; i--) {
          vw.cpm.Panel.deserialize(this,panels[i]);
          this.logger.info("Loading panel : "+panels[i].cmd.command+" "+panels[i].cmd.data);
        }
      }else{
        var panel = this.openIFrame(this.options.cpmbaseurl+'/introslides',"Intro");
      }

    }

    
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
        error:function(jqXHR,textStatus,errorThrown){
          me.logger.error(errorThrown);
        },
      });
  }


  vw.cpm.CLI.prototype.request = function(command){
    var me = this;

    command = command.trim();


    if(command == "help"){
      me.helpmanager.displayCLIHelp();
      return;
    }

    if(command == "brat"){
      this.openIFrame('http://'+me.options.cpmhost+':8001/index.xhtml',"brat");
      return;
    }

    if(command.startsWith("file")){
      var elts = command.split(" ");
      me.openFile(elts[1]);
      return ;
    }

    if(command == "cadvisor"){
      this.openIFrame('http://'+me.options.cpmhost+':8082/',"cadvisor");
      return;
    }

    me.cpmRawCall(command,function(data){
      data = jQuery('<div />').text(data).html();
      data = '<code><pre class="pre-wrapped">'+data+'</pre></code>';
      me.view.createPanel(command,data,"cmd-"+command,new vw.cpm.Command("c",command));
      console.log(data);
    });

    
  }

  vw.cpm.CLI.prototype.openIFrame = function(url,title){
    var me = this;
    var name = url;
    if(title){
      name = title;
    }
    var panel = me.view.createPanel('<a href="'+url+'" target="_blank">'+name+'</a>',"","iframe-"+url,new vw.cpm.Command("i",name+"\t"+url));
    panel.$el.find('.frame-body').append('<iframe style="border-style:none;border:0;margin:0;padding:0;" width="100%" height="600px" src="'+url+'"></iframe>');
    return panel;
  }

  vw.cpm.CLI.prototype.openFile = function(filepath){
    var me = this;
    me.cpmRawCall("fs get "+filepath,function(data) {
        data = jQuery('<div />').text(data).html();
        //data = data.replace(/\s/g,'&nbsp;');
        //data = data.replace(/\n|\r|\r\n/g,'<br>');
        data = '<code><pre class="pre-wrapped">'+data+'</pre></code>';
        me.view.createPanel(filepath,data,"fs-"+filepath,new vw.cpm.Command("f",filepath));
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
          element: document.querySelector('#log-button'),
          intro: "Clicking here will show you some logged informations.<br>The status button next to it should be green or yellow (in case optional websockets isn't supported by your browser or port is blocked)",
          position: 'top'
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

  vw.cpm.CLI.prototype.demoModule = function(){
    var me = this;
    var intro = introJs();
    var testmodule = me.testmodule;
    if (!me.modulesmanager.modules["testmodule"]){
      for (modulename in me.modulesmanager.modules){
        if (modulename != "_CMD" && modulename != "_MAP"){
          testmodule = modulename;
          break;
        }
      }
    }
    me.modulesmanager.showModule(testmodule);
    intro.setOptions({
      steps: [
        { 
          intro: "<h1>Modules</h1>This short tutorial will present you how the basic actions availables with modules."
        },
        {
          element: document.querySelector('#module-menu'),
          intro: "Modules available are list here.<br>For the tutorial purpose, We'll open one for you.",
          position:'bottom'
        },
        {
          element:  document.querySelectorAll('.frame')[0],
          intro: "Here is the module view",
          position:'bottom'
        },
        {
          element: document.querySelector('#corpus-menu'),
          intro: "You can then drag and drop files from corpus into the proper input fields.",
          position: 'right'
        },
        // then run
        // a process view appears
        // that you can close and find at any moment within the process list
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