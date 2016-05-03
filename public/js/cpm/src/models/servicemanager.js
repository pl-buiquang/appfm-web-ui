(function(vw){

  vw.cpm.ServiceManager = function(app,$el,options){
    this.initiated = false;
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.ServiceManagerView(this,$el);
    this.init();
    this.services = []; 
  }

  vw.cpm.ServiceManager.prototype.init = function(){
    var me = this;
    me.fetchAll();
  }

  vw.cpm.ServiceManager.prototype.showService = function(servicename){
    var me = this;
    for (var i = me.services.length - 1; i >= 0; i--) {
      if(me.services[i].name == servicename){
        var service = me.services[i];
        var title = service.name;
        if(service.url){
          title = '<a href="'+service.url+'" target="_blank">'+service.name+'</a>';
        }
        var panel = this.app.view.getPanelFromSID("service-"+servicename,false,title,new vw.cpm.Command("s",servicename));
        var serviceview = new vw.cpm.ServiceView(this.app,panel.$el.find(".frame-body"),service);
        break;
      }
    }
    
    panel.focus();
  }

  vw.cpm.ServiceManager.prototype.startService = function(serviceview){
    var me = this;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"service start "+serviceview.service.name},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        if(data.error){
          me.app.logger.error(data.error);
        }else{
          serviceview.service.status = true;
          me.view.refresh();
          serviceview.refresh();
        }
      }
    });
  }

  vw.cpm.ServiceManager.prototype.stopService = function(serviceview){
    var me = this;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"service stop "+serviceview.service.name},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        if(data.error){
          me.app.logger.error(data.error);
        }else{
          serviceview.service.status = false;
          me.view.refresh();
          serviceview.refresh();
        }
      }
    });
  }


  vw.cpm.ServiceManager.prototype.fetchAll = function(modulename,callback){
    var me = this;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"service ls"},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        if(data.error){
          me.app.logger.error(data.error);
        }else{
          me.services = data;
          me.view.refresh();
          me.initiated = true;          
        }
      }
    });

  }



}(window.vw = window.vw || {}));