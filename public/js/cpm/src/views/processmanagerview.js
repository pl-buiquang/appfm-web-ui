(function(vw){

  vw.cpm.ProcessManagerView = function(model,$el){
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.ProcessManagerView.prototype.init=function(){
    var me = this;
  }

  vw.cpm.ProcessManagerView.prototype.refresh = function(){
    var me = this;
    var html = "";
    for (var modulename in me.model.runs){
      html += '<div>'+modulename+'</div><ul>';
      for(var i in me.model.runs[modulename]){
        html += '<li>'+me.model.runs[modulename][i]+'</li>';
      }
      html+= '</ul>';
    }
    me.$el.empty();
    me.$el.append(html);
  }




  



}(window.vw = window.vw || {}));
