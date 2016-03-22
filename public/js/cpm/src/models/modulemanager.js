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

  vw.cpm.ModuleManager.prototype.checkNameExist = function(modulename,success,failure){
    var me = this;
    var regex = /^(_?[a-zA-Z][a-zA-Z0-9\-_]+(@[a-zA-Z0-9\-_]+)?)(#(?:\w|-)+)?$/;
    var match = regex.exec(modulename);
    if(!match){
      failure.call();
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
            failure.call();
            return;
          }
        }
        success.call();
      },
      error:function(){
        failure.call();
      }
    });
  }

  vw.cpm.ModuleManager.prototype.prepareCreateNewModule = function(){
    var me = this;
    var modal = new vw.cpm.ui.Modal();
    $preconfig = $(vw.cpm.ModuleManagerView.templatePreConfigAddNew);
    $preconfig.find('.create-module-preconfig-submit').click(function(){
      var modulename = $preconfig.find('input').val();
      var dirpath = "custom";
      me.checkNameExist(modulename,function(){
        modal.close();
        me.createNewModule(modulename,dirpath);
      },function(){
        var modalcontent = modal.getContainer();
        modalcontent.find(".error-message").remove();
        modalcontent.prepend('<div class="error-message">Module name already exist or isn\'t allowed, please choose another name</div>');
      });
    });
    modal.open($preconfig);
  }

  vw.cpm.ModuleManager.prototype.createNewModule = function(modulename,containerdirpath){
    var me = this;
    var panel = me.app.view.createPanel(modulename,"","moduledef-"+modulename,new vw.cpm.Command("m",modulename));
    var newmoduledef = {
      module:{
        name:modulename,
        desc:"please fill in a brief description",
        input:{},
        output:{},
        exec:[],
      },
      modulename:modulename,
      source:"name : "+modulename+"\n\ndesc : > \n  please fill in a brief description",
      sourcepath:me.app.cpmsettingsmanager.defaultModulesDir+"/custom/"+modulename+".module",
      creation:true
    };
    var module = new vw.cpm.Module(me.app,panel.$el.find(".frame-body"),newmoduledef);
    module.view.render();
  }

  vw.cpm.ModuleManager.prototype.showModule = function(modulename){
    var me = this;
    var panel = me.app.view.getPanelFromSID("moduledef-"+modulename,false,modulename,new vw.cpm.Command("m",modulename));
    var module = new vw.cpm.Module(me.app,panel.$el.find(".frame-body"),me.modules[modulename]);
    me.modulesobj.push(module);
    module.view.render();
    panel.focus();
  }


}(window.vw = window.vw || {}));