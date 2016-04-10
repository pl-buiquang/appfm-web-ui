(function(vw){

  vw.cpm.CPMSettingsManagerView = function(model,$el){
    this.id = vw.cpm.utils.guid();
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.CPMSettingsManagerView.prototype.init=function(){
    var me = this;
    
  }

  vw.cpm.CPMSettingsManagerView.prototype.render = function(){
    var me = this;
    this.$el.empty();
    
    var data = this.model.cpmsettings;
    var html ='<div><button class="cpm-refresh">Refresh</button></div>';
    html +='<div><button class="cpm-reconnect-ws">Reconnect (websockets)</button></div>';
    html += '<div class="settings-field-title"> Connection infos : </div>';
    html += '<div class="settings-field-body"><select id="server-chooser">';
    for (var server in me.model.app.options.servers) {
      var selected = ""
      if(this.model.app.options.cpmhost == me.model.app.options.servers[server]["CPM_HOST"]){
        selected = "selected"
      }
      html+= '<option value="'+server+'" '+selected+'>'+server+'</option>';
    }
    html += '</select></div>';
    html += '<div class="settings-field-body"><div>AppFM Host : </div><input type="text" name="cpmhost" value="'+this.model.app.options.cpmhost+'"></div>';
    html += '<div class="settings-field-body"><div>AppFM Port : </div><input type="text" name="cpmport" value="'+this.model.app.options.cpmport+'"></div>';
    html += '<div class="settings-field-body"><div>AppFM WS Host+Port : </div><input type="text" name="cpwsmhost" value="'+this.model.app.options.cpmwshost+'"></div>';
    html +='<div class="settings-field-body"><button class="cpm-reconnect">Connect</button></div>';
    html += '<div class="settings-field-title"> Corpus directory : </div><div class="settings-field-body">'+data.corpus_dir+'</div>';
    html += '<div class="settings-field-title"> Result directory : </div><div class="settings-field-body">'+data.result_dir+'</div>';
    var moduledir = '<div class="settings-field-title"> Modules directories :</div><div class="settings-field-body"><ul>'
    for (var i = data.modules.length - 1; i >= 0; i--) {
      moduledir += "<li ";
      if(data.modules[i].exist){
        moduledir += '>';
      }else{
        moduledir += 'class="warning-field">';
      }
      moduledir+= data.modules[i].name+'</li>';
    };
    moduledir += '</ul></div>';
    html += moduledir;
    this.$el.append(html);

    this.$el.find('#server-chooser').on("change",function(){
      var servername = $(this).val();
      me.$el.find('input[name=cpmhost]').val(me.model.app.options.servers[servername]["CPM_HOST"]);
      me.$el.find('input[name=cpmport]').val(me.model.app.options.servers[servername]["CPM_PORT"]);
      me.$el.find('input[name=cpwsmhost]').val(me.model.app.options.servers[servername]["CPM_WS_HOST"]);
    });

    this.$el.find('.cpm-reconnect').click(function(){
      var host = me.$el.find('input[name=cpmhost]').val();
      var port = me.$el.find('input[name=cpmport]').val();
      var wshostport = me.$el.find('input[name=cpwsmhost]').val();
      me.model.updateConnection(host,port,wshostport);
    });

    
    this.$el.find(".cpm-refresh").click(function(){
      me.model.app.reload();
    });
    this.$el.find(".cpm-reconnect-ws").click(function(){
      me.model.app.initWS();
    });
  }

 
  



}(window.vw = window.vw || {}));
