(function(vw){

  vw.cpm.ServiceManagerView = function(model,$el){
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.ServiceManagerView.prototype.init=function(){
    var me = this;
    me.$el.empty();
  }

  vw.cpm.ServiceManagerView.prototype.refresh = function(){
    var me = this;


    var html ="";
    // list process results 
    for (var i in me.model.services){
      var service = me.model.services[i];
      var active = "";
      if(service.status){
        active = "active";
      }
      html += '<div class="service '+active+'"><div class="service-name">'+service.name+'</div></div>';
    }
    
    me.$el.empty();
    me.$el.append(html);
    me.$el.find(".service-name").on("click",function(){
      me.model.showService($(this).html().trim());
    });
  }


  vw.cpm.ServiceView = function(app,$el,model){
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.service = model;
    this.app = app;
    this.refresh();
  }

  vw.cpm.ServiceView.prototype.refresh = function(){
    var me = this;
    this.$el.empty();
    if(this.service.desc){
      this.$el.append('<div>'+this.service.desc+'</div>');  
    }
    this.$el.append('<div> Status : '+(this.service.status?"running":"stopped")+'</div>');
    if(this.service.status){
      this.$el.append('<div class="service-run-switch"><button>Stop</button></div>');
    }else{
      this.$el.append('<div class="service-run-switch"><button>Start</button></div>');
    }
    if(this.service.test){
      this.$el.append('<div><button class="service-test">Test service</button></div>'); 
      this.$el.find('.service-test').click(function(){
        if(!$(this).hasClass('ajax-submitted')){
          me.app.servicemanager.testService(me,$(this));        
        }
      });
    }

    this.$el.find('.service-run-switch').click(function(){
      if(!$(this).hasClass('ajax-submitted')){
        if(me.service.status){
          me.app.servicemanager.stopService(me,$(this));
        }else{
          me.app.servicemanager.startService(me,$(this));
        }        
      }
    });
    var ul = '<ul>';
    if(me.service.log){
      ul += '<li><span>log : </span>'+me.service.log;
    }
    for (var outputname in me.service.outputs) {
      ul += '<li><span>'+outputname+' : </span>'+vw.cpm.ProcessView.printVar(me.service.outputs[outputname],outputname);
    }
    ul += '</ul>';
    this.$el.append(ul);
    me.$el.find('.iframe-var').click(function(){
      me.app.openIFrame($(this).html().trim(),me.service.name+" "+$(this).attr('name'));
    });    
  }
  



  



}(window.vw = window.vw || {}));
