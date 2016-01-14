(function(vw){

  vw.cpm.ModuleBoxView = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "Module",
  
    init : function(def,execname)
    {
        this._super();
        // init the object with some good defaults for the activity setting.
        this.setUserData({def:def,name:execname});
        
        this.inputports = this.createPort("input", new draw2d.layout.locator.LeftLocator(this));
        this.outputports = this.createPort("output", new draw2d.layout.locator.RightLocator(this));
        console.log(def);
        //this.setCssClass("activity");
        this.setBackgroundColor("#f4f4f4");

        // UI representation
        this.setStroke(1);
        this.setColor("#e0e0e0");
        this.setRadius(1);  
        
        // Compose the top row of the shape
        //
        var top = this.createLabel(execname).setStroke(0);        
        this.label = top;
        
        // the middle part of the shape
        // This part contains the ports for the connection
        //
        var center =  new draw2d.shape.basic.Rectangle();  
        center.getHeight= function(){return 1;};
        center.setMinWidth(90);
        center.setColor("#e0e0e0");
        
        // the bottom of the activity shape
        //
        var bottom = this.createLabel("???");   
        this.activityLabel = bottom;
        bottom.setMinHeight(30);
        bottom.setStroke(0);
        bottom.setBackgroundColor(null);
        bottom.setFontColor("#a0a0a0");

        // finally compose the shape with top/middle/bottom in VerticalLayout
        //
        this.add(top);
        this.add(center);
        this.add(bottom);        
     },

     createLabel: function(txt){
       var label =new draw2d.shape.basic.Label({text:txt});
       label.setStroke(1);
       label.setRadius(0);
       label.setBackgroundColor(null);
       label.setPadding(5);
       label.setColor(this.bgColor.darker(0.2));
       label.onDoubleClick=function(angle){/* ignore them for the layout elements*/};
          
       return label;
     },

   });





}(window.vw = window.vw || {}));
