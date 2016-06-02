(function(vw){

  vw.cpm.ProcessView = function(model,$el){
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.ProcessView.prototype.init=function(){
    var me = this;
    this.$el.empty();
    this.$el.append(vw.cpm.ProcessView.template);
    
    this.shared = {};
    var panel = me.model.app.view.getPanelFromContent(this.$el);
    if(panel){
      panel.exitCB = function(){
        clearInterval(me.shared.interval);
      }
    }
  }

  
  vw.cpm.ProcessView.prototype.refresh=function(){
    var me = this;
    if(me.model.synced){
      me.$el.find('.run-status .info-box-content').html('<div>'+me.model.info.status+'</div><div class="process-detailed-status"></div><button class="processresult-refresh" type="button">refresh</button><button class="processresult-log" type="button">log</button><button class="processresult-delete" type="button">delete</button>');
      me.$el.find('.run-status .info-box-content .processresult-refresh').on("click",function(){
        me.model.sync($(this));
      });
      me.$el.find('.run-status .info-box-content .processresult-delete').on("click",function(){
        me.model.delete($(this));
      });

      me.$el.find('.processresult-log').on("click",function(){
        me.model.app.request("process log "+me.model.runid);
      });

      var config = "<ul>";
      for(var key in me.model.info.runconf){
        config += '<li><span style="font-weight:bold;">'+key+' : </span><span>'+vw.cpm.ProcessView.printVar(me.model.info.runconf[key],key)+'</span></li>';
      }
      config += "</ul>";
      me.$el.find('.run-config .info-box-content').html(config);

      var results = "<ul>";
      for(var key in me.model.info.env){
        if(me.model.info.runconf.hasOwnProperty(key)){
          continue;
        }
        results += '<li><span style="font-weight:bold;">'+key+' : </span><span>'+vw.cpm.ProcessView.printVar(me.model.info.env[key],key)+'</span></li>';
      }
      for(var key in me.model.info.parentEnv){
        if(me.model.info.runconf.hasOwnProperty(key)){
          continue;
        }
        results += '<li><span style="font-weight:bold;">'+key+' : </span><span>'+vw.cpm.ProcessView.printVar(me.model.info.parentEnv[key],key)+'</span></li>';
      }
      results += "</ul>";
      me.$el.find('.run-results .info-box-content').html(results);

      me.$el.find('.file-var').click(function(){
        me.model.app.openFile($(this).html().trim());
      });

      me.$el.find('.iframe-var').click(function(){
        me.model.app.openIFrame($(this).html().trim());
      });

      if(me.shared.interval){
        clearInterval(me.shared.interval);
      }
      me.shared.interval = setInterval(function(){
        me.model.getStatus(function(data){
          if(data.exited){
            clearInterval(me.shared.interval);
          }else{
            me.$el.find(".process-detailed-status").html('<code><pre class="pre-wrapped">'+data.info+'</pre></code>');
          }
        });
      },2000);


      me.$el.find('.info-box').each(function(i){
        $(this).find(".info-box-title").click(function(){
          $(this).parent().find('.info-box-content').toggle();
        })
      })
    }
  }

  vw.cpm.ProcessView.printVar = function(variable,variablename){
    if(variable.type == "FILE"){
      return '<span class="file-var link">'+variable.value+'</span>';
    }else if(variable.type == "FILE*"){
      var html = '<ul>';
      for (var i = 0; i < variable.value.length; i++) {
         html += '<li class="file-var link">'+variable.value[i]+'</li>';
      };
      html += '</ul>';
      return html;
    }else if(variable.type == "VAL" && variable.format == "url"){
      var html = '<span class="iframe-var" name="'+variablename+'">'+variable.value.replace("localhost",vw.cpm.INSTANCE.options.cpmhost)+'</span>';
      return html;
    }else if(typeof variable.value == "string" && variable.format == "html"){
      return variable.value;  
    }else{
      return JSON.stringify(variable.value).replace("/\n/","<br>").replace("/\s/","&nbsp;").replace("/\\\"/",'"');    
    }
    
  }



  vw.cpm.ProcessView.template = '<div class="run-status info-box"><div class="info-box-title">Status</div> <div class="info-box-content"></div></div>'+
    '<div class="run-config info-box"><div class="info-box-title">Config</div><div class="info-box-content"></div></div>'+
    '<div class="run-results info-box"><div class="info-box-title">Results</div> <div class="info-box-content"></div></div>';



}(window.vw = window.vw || {}));
