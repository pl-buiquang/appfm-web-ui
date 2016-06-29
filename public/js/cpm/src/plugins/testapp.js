(function(vw){

  vw.cpm.TestApp = function(appfm){
    this.appfm = appfm;
    this.view = new vw.cpm.TestAppView(this);
  };



  /*********************************
  *       View
  * *********************************/

  vw.cpm.TestAppView = function(model,$el){
    this.model = model;
    this.$el =  $el || $('<div></div>');
  }

  vw.cpm.TestAppView.prototype.show = function(){
    var me = this;
    this.$el.empty();
    if (!Object.keys(this.model.appfm.modulesmanager.modules).indexOf("es-search") ||
      !Object.keys(this.model.appfm.modulesmanager.modules).indexOf("elasticsearch-brat-index") ||
      !this.model.appfm.servicemanager.hasService("elasticsearch")
      ){
      this.$el.append("missing some of the required modules/services..");
    }else{
      this.$el.append(vw.cpm.TestAppView.template);
      this.$el.find("#testapp-submit").click(function(){
        // running a module
        var moduledata = me.model.appfm.modulesmanager.modules["es-search"];
        var module = new vw.cpm.Module(me.model.appfm,undefined,moduledata);
        var conf = {
          "NE": me.$el.find("#testapp-input").val()
        }
        module.run(conf,function(data){

          // retrieve process and add end handler
          var runid = data;
          me.model.appfm.processmanager.onStop[runid]=function(){

            // retrieve result when finished
            var process = new vw.cpm.Process(me.model.appfm,undefined,{moduledef:me.model.appfm.modulesmanager.modules["es-search"].module,runconf:{},runid:runid});
            process.sync(undefined,function(result){
              var html = jQuery('<div />').text(result.env["_CMD.STDOUT"].value).html();
              html = '<code><pre class="pre-wrapped">'+html+'</pre></code>';
              me.$el.find('#testapp-results').html(html);
              process.delete();
            });
          } 
          
        },undefined,true);
      });
    }

  }

  vw.cpm.TestAppView.template = '<div><input id="testapp-input" type="text"><br><button id="testapp-submit">Search</button><br><div id="testapp-results"></div></div>';

 

}(window.vw = window.vw || {}));
