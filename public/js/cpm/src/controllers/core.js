(function(vw){

  vw.cpm.CLI = function($el,options){
    this.options = options;
    this.view = new vw.cpm.CLIView(this,$el);
  }

  vw.cpm.CLI.prototype.init = function(){
    
  }


  vw.cpm.CLI.prototype.request = function(command){
    var me = this;

    if(command == "test"){
      var panel = this.view.createPanel();
      var module = new vw.cpm.Module(this,panel,{name:"pipeline-test"});
      
      
      return;
    }

    $.ajax({
        type: "POST",
        data : {cmd:command},
        url: me.options.cpmbaseurl+"/rest/cmd",
        dataType : "html",
        success: function(data, textStatus, jqXHR) {
          me.view.createPanel(data);
          console.log(data);
        },
        error:function(){

        }
      });
  }

}(window.vw = window.vw || {}));