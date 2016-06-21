(function(vw){

  vw.cpm.ModuleManager = function(app,$el,options){
    this.initiated = false;
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.ModuleManagerView(this,$el);
    this.init();
    this.moduletree = {};
    this.modules = {};
    this.modulesobj = [];
  }

  vw.cpm.ModuleManager.prototype.init = function(){
    var me = this;
    me.fetchAll();
  }

  vw.cpm.ModuleManager.prototype.fetchAll = function(){
    var me = this;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"module ls --json"},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        me.moduletree = data;
        me.modules = {};
        me.parseModuleTree(data);
        me.addDefaultModules();
        me.view.refresh();
        me.initiated = true;
      }
    })
  }

  vw.cpm.ModuleManager.prototype.search = function(query,onsuccess){
    var me = this;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"module search --json",data:query},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        onsuccess.call(me,data);
      },error:function(message){
        me.app.logger.error(message);
      }
    }) 
  }

  vw.cpm.ModuleManager.prototype.addDefaultModules = function(){
    this.modules["_CMD"]={
      module:{
        name:"_CMD",
        desc:"CMD",
        input:{
          CMD:{
            type:"VAL"
          },
          DOCKERFILE:{
            type:"VAL",
            value:"false"
          },
          CONTAINED:{
            type:"VAL",
            value:"false"
          }
        },
        output:{
          STDOUT:{
            type:"VAL"
          }
        },
        exec:[]
      },
      modulename:"_CMD",
      source:"",
      sourcepath:"/no/path"
    };
    this.modules["_MAP"]={
      module:{
        name:"_MAP",
        desc:"MAP",
        input:{
          IN:{
            type:"DIR"
          },
          RUN:{
            type:"MODVAL+"
          },
          REGEX:{
            type:"VAL"
          },
          CHUNK_SIZE:{
            type:"VAL",
            value:"10"
          }
        },
        output:{},
        exec:[]
      },
      modulename:"_MAP",
      source:"",
      sourcepath:"/no/path"
    };
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

  vw.cpm.ModuleManager.prototype.checkNameExist = function(modulepath,modulename,success,failure){
    var me = this;
    var regex = /^(_?[a-zA-Z][a-zA-Z0-9\-_]+(@[a-zA-Z0-9\-_]+)?)(#(?:\w|-)+)?$/;
    var match = regex.exec(modulename);
    if(!match){
      failure.call(me,"Module name isn't valid. Please choose another name.");
      return;
    }
    var allowedDirectory = false;
    for (var i = me.app.cpmsettingsmanager.cpmsettings.modules.length - 1; i >= 0; i--) {
      if(me.app.cpmsettingsmanager.cpmsettings.modules[i].exist && modulepath.indexOf(me.app.cpmsettingsmanager.cpmsettings.modules[i].name) == 0){
        allowedDirectory = true;
        break;
      }
    }
    if(!allowedDirectory){
      failure.call(me,"The directory you choose isn't located within modules directories.");
      return;
    }
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"module ls --name"},
      success:function(data,textStatus,jqXHR){
        var modulenames = data.split("\n");
        for (var i = 0; i < modulenames.length; i++) {
          modname = modulenames[i].trim();
          if(modname == modulename){
            failure.call(me,"Module name already exist. Please choose another name.");
            return;
          }
        }
        success.call();
      },
      error:function(){
        failure.call(me,"Error when retrieving existing modules.");
      }
    });
  }

  vw.cpm.ModuleManager.prototype.prepareCreateNewModule = function(source){
    var me = this;
    var modal = new vw.cpm.ui.Modal();
    $preconfig = $(vw.cpm.ModuleManagerView.templatePreConfigAddNew);
    $preconfig.find('input[name="directory"]').val(me.app.cpmsettingsmanager.defaultModulesDir);
    $preconfig.find('.create-module-preconfig-submit').click(function(){
      var modulename = $preconfig.find('input[name="name"]').val();
      var dirpath = $preconfig.find('input[name="directory"]').val();
      me.checkNameExist(dirpath,modulename,function(){
        modal.close();
        me.createNewModule(modulename,dirpath,source);
      },function(errormessage){
        var modalcontent = modal.getContainer();
        modalcontent.find(".error-message").remove();
        modalcontent.prepend('<div class="error-message">'+errormessage+'</div>');
      });
    });
    modal.open($preconfig);
  }

  vw.cpm.ModuleManager.prototype.createNewModule = function(modulename,containerdirpath,prefilledsource){
    var me = this;
    var panel = me.app.view.createPanel(modulename,"","moduledef-"+modulename,new vw.cpm.Command("m",modulename));
    var modulecontent = {
      name:modulename,
      desc:"please fill in a brief description",
      input:{
        IN : {
          type : "VAL",
          desc : "you can add some description here, baisc valid types are VAL,FILE,DIR. format and schema are optional field for documentation purpose for now.",
          format : "unknown",
          schema : "unknown"
        }
      },
      output:{
        OUT : {
          type : "VAL",
          desc : "you can add some description here, baisc valid types are VAL,FILE,DIR. format and schema are optional field for documentation purpose for now.",
          format : "unknown",
          schema : "unknown",
          value : "\"mandatory value (can use exec modules outputs : ${_CMD#mandatory_id_for_same_name_modules.STDOUT})\""
        }
      },
      exec:[
        {
          "_CMD#mandatory_id_for_same_name_modules" : {
            CMD : "echo \"Hello $IN ! \""
          }
        }
      ],
    };
    var sourcecontent = YAML.stringify(modulecontent,99);
    if(prefilledsource){
      sourcecontent = prefilledsource.replace(/name\s*:(.*)/g,"name : "+modulename);
      modulecontent = YAML.parse(sourcecontent);
    }
    var newmoduledef = {
      module:modulecontent,
      modulename:modulename,
      source:sourcecontent,
      sourcepath:containerdirpath+"/"+modulename+".module",
      creation:true
    };
    var module = new vw.cpm.Module(me.app,panel.$el.find(".frame-body"),newmoduledef);
    module.def.warning = "If you wish to prevent other users from modifying this module definition, please set proper unix permissions in the file ("+containerdirpath+"/"+modulename+".module"+") created in the server.";
    module.view.render();
    module.sync();
    return module;
  }

  vw.cpm.ModuleManager.prototype.showModule = function(modulename){
    var me = this;
    var panel = me.app.view.getPanelFromSID("moduledef-"+modulename,false,modulename,new vw.cpm.Command("m",modulename));
    var module = new vw.cpm.Module(me.app,panel.$el.find(".frame-body"),me.modules[modulename]);
    me.modulesobj.push(module);
    module.view.render();
    panel.focus();
  }

  vw.cpm.ModuleManager.prototype.getModule = function(modulename){
    for (var i in modulesobj){
      if(modulesobj[i].def.modulename==modulename){
        return modulename;
      }
    }
    return new vw.cpm.Module(me.app,undefined,me.modules[modulename]);
  }


}(window.vw = window.vw || {}));