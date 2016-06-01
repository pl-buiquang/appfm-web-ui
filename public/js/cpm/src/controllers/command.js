(function(vw){

  /**
   * This class is used to serialize Panel instanciation and allow saving AppFM view state across browser restart using localStorage feature
   * Some non exhaustive commands are :
   *  - module view
   *  - process view
   *  - file view
   *  - iframe view
   *  - static apps (logs, intro, etc.)
   *
   * 
   */

  vw.cpm.Command = function(command,data){
    this.command = command;
    this.data = data;
  }


  vw.cpm.Command.prototype.execute = function(app){
    var me = this;
    vw.cpm.utils.waitTill(app,"isInitiated",function(){
      if(me.command == "p"){
        app.processmanager.showRun(me.data.name,me.data.runid);
      }else if(me.command == "m"){
        app.modulesmanager.showModule(me.data)
      }else if(me.command == "f"){
        app.openFile(me.data);
      }else if(me.command == "i"){
        var items = me.data.split("\t");
        app.openIFrame(items[1],items[0]);
      }else if(me.command == "s"){
        if(me.data == "log"){
          app.logger.view();
        }else if(me.data == "help"){
          app.helpmanager.displayCLIHelp();
        }else{
          
        }
      }else if(me.command == "l"){
        if(!app.servicemanager.showService(me.data)){
          app.logger.warn("unknown panel system command : "+me.data);
        }
      }else if(me.command == "c"){
        app.request(me.data);
      }else{
        app.logger.warn("unknown panel command : "+me.command+"("+me.data+")");
      }
    },1000)
  }

 

}(window.vw = window.vw || {}));