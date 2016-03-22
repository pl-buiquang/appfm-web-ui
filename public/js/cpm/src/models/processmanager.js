(function(vw){

  vw.cpm.ProcessManager = function(app,$el,options){
    this.initiated = false;
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.ProcessManagerView(this,$el);
    this.init();
    this.startedprocess = []; // for websocket update only those
    this.runs = {};
  }

  vw.cpm.ProcessManager.prototype.init = function(){
    var me = this;
    me.fetchAll();
  }

  vw.cpm.ProcessManager.prototype.showRun = function(modulename,runid){
    var me = this;
    var panel = this.app.view.getPanelFromSID("process-"+runid,false,'<span class="link">'+modulename + "</span> ( "+runid+" )",new vw.cpm.Command("p",{name:modulename,runid:runid}));
    panel.$el.find(".frame-title").find(".link").click(function(){
      me.app.modulesmanager.showModule(modulename);
    });
    var process = new vw.cpm.Process(this.app,panel.$el.find(".frame-body"),{moduledef:me.app.modulesmanager.modules[modulename].module,runconf:{},runid:runid});
    process.sync();
    panel.focus();
  }

  vw.cpm.ProcessManager.prototype.remove = function(runid){
    var me = this;
    var found = false;
    for (runmodulename in me.runs){
      for(var i = 0 ; i < me.runs[runmodulename].length ; i++){
        if(me.runs[runmodulename][i].runid == runid){
          me.runs[runmodulename].splice(i,1);
          if(me.runs[runmodulename].length == 0){
            delete me.runs[runmodulename];
          }
          found = true;
          break;
        }
      }
      if(found){
        break;
      }
    }
    me.view.refresh();
  }

  vw.cpm.ProcessManager.prototype.fetchAll = function(modulename,callback){
    var me = this;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"process ls -a"},
      dataType : 'text',
      success:function(data,textStatus,jqXHR){
        me.runs = {};
        var processes = data.split("\n");
        for (var i in processes){
          var process = processes[i].trim();
          if(process!=""){
            var pinfo = process.split(":");
            var runmodulename = pinfo[0].trim();
            regex = /(.*?)\((.*?)\)/;
            var match = regex.exec(pinfo.slice(1).join(":").trim());
            if(!match){
              continue;
            }
            var runid = match[1].trim();
            var date = match[2].trim();
            if(me.runs.hasOwnProperty(runmodulename)){
              me.runs[runmodulename].push({runid:runid,datecreated:date});
            }else{
              me.runs[runmodulename] = [{runid:runid,datecreated:date}];
            }
          }
        }
        me.view.refresh();
        me.initiated = true;
      }
    });

  }



}(window.vw = window.vw || {}));