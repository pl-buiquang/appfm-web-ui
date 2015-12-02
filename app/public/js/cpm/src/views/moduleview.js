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
    this.$el.append('<div id="'+this.id+'" class="canvas-view"></div>');

    var canvas = new draw2d.Canvas(me.id);
    var rect =  new draw2d.shape.basic.Rectangle();
       canvas.add(rect,100,10);
  }



}(window.vw = window.vw || {}));
