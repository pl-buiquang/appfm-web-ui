(function(vw){

  vw.cpm.ModuleView = function(model,$el){
    this.id = vw.cpm.utils.guid();
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.ModuleView.prototype.init=function(){
    var me = this;
    this.$el.append(vw.cpm.ModuleView.template);
    if(me.model.def.hasOwnProperty("module")){
      me.renderGraphical();
    }else{
      me.$el.find(".module-content-view").append(me.model.def.source.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\s)/g,"&nbsp;"));
    }
    this.$el.find(".module-view-source").on("click",function(){
      me.$el.find(".module-content-view").empty();
      me.$el.find(".module-content-view").append(me.model.def.source.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\s)/g,"&nbsp;"));
    });
    this.$el.find(".module-view-graphic").on("click",function(){
      me.$el.find(".module-content-view").empty();
      if(me.model.def.hasOwnProperty("module")){
        me.renderGraphical();
      }else{
        me.$el.find(".module-content-view").append("Unable to display graphical view of this module, definition contains error, please correct source file before");
      }
    });
  }

  vw.cpm.ModuleView.prototype.render=function(){
  }

  vw.cpm.ModuleView.prototype.renderGraphical=function(){
    var me = this;
    this.$el.find(".module-content-view").append('<div id="'+this.id+'" class="canvas-view"></div>');

    var canvas = new draw2d.Canvas(me.id);
    var rect =  new draw2d.shape.basic.Rectangle();
       canvas.add(rect,100,10);
  }

  vw.cpm.ModuleView.template = '<div class="module-header"><span class="module-view-source" style="float:left; margin-right:20px;">source</span><span class="module-view-graphic" style="float:left;">view</span></div><div class="module-content-view"></div>';



}(window.vw = window.vw || {}));
