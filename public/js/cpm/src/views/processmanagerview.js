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


    var html ="";
    // list process results 
    for (var modulename in me.model.runs){
      html += '<div><div class="settings-field-title" style="cursor:pointer;">'+modulename+'</div><div class="settings-field-body"><ul class="run-list" style="font-size:12px;">'
      for(var i in me.model.runs[modulename]){
        html += '<li runid="'+me.model.runs[modulename][i].runid+'">'+me.model.runs[modulename][i].datecreated+'</li>';
      }
      html+= '</ul></div></div>';
    }
    
    me.$el.empty();
    me.$el.append(html);
    me.$el.find(".settings-field-title").on("click",function(){
      $(this).parent().find(".settings-field-body").toggle();
    });
    me.$el.find(".settings-field-body li").on("click",function(){
      me.model.showRun($(this).parents(".settings-field-body").prev().html().trim(),$(this).attr("runid"));
    });
  }

  


  



}(window.vw = window.vw || {}));
