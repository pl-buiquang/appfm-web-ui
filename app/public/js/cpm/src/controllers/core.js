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