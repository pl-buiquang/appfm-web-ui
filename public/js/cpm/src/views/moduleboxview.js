(function(vw){

  vw.cpm.ModuleInputView = draw2d.shape.basic.Circle.extend({

    NAME : "Input",

    init : function(inputname,inputdata){
      this._super({stroke:3, color:"#3d3d3d", bgColor:"#3dff3d"});

      this.port = this.createPort("output", new draw2d.layout.locator.RightLocator(this));
      
      this.label = new draw2d.shape.basic.Label({text:inputname});

      //this.label.setStroke(0);
      this.add(this.label, new draw2d.layout.locator.BottomLocator(this));

      var data = inputdata;
      data.name = inputname;

      this.setUserData(data);
    },

    info : function(){
      var disabled = "";
      if(this.userData.name == "_RUN_DIR" || this.userData.name == "_DEF_DIR"){
        disabled = " disabled ";
      }
      var typevalue = "";
      if(this.userData.type){
        typevalue = this.userData.type;
      }
      var formatvalue = "";
      if(this.userData.format){
        formatvalue = this.userData.format;
      }
      var schemavalue = "";
      if(this.userData.schema){
        schemavalue = this.userData.schema;
      }
      var valuevalue = "";
      if(this.userData.value){
        valuevalue = this.userData.value;
      }

      var type = '<div>Type : <input class="mv-info-type" type="text" value="'+typevalue+'"'+disabled+'></div>';
      var format = '<div>Format : <input class="mv-info-format" type="text" value="'+formatvalue+'"'+disabled+'></div>';
      var schema = '<div>Schema : <input class="mv-info-schema" type="text" value="'+schemavalue+'"'+disabled+'></div>';
      var value = '<div>Default value : <input class="mv-info-value" type="text" value="'+valuevalue+'"'+disabled+'></div>';

      return $('<div><div>Name : <input class="mv-info-name" type="text" value="'+this.userData.name+'"'+disabled+'></div>'+type+format+schema+value+
        '</div>');
    }
  });

  vw.cpm.ModuleOutputView = draw2d.shape.basic.Circle.extend({

    NAME : "Output",

    init : function(outputname,outputdata){
      this._super({stroke:3, color:"#3d3d3d", bgColor:"#3dff3d"});

      this.port = this.createPort("input", new draw2d.layout.locator.LeftLocator(this));

      
      this.label = new draw2d.shape.basic.Label({text:outputname});

      //this.label.setStroke(0);
      this.add(this.label, new draw2d.layout.locator.BottomLocator(this)); 

      var data = outputdata;
      data.name = outputname;

      this.setUserData(data);
    },

    info : function(){
      var typevalue = "";
      if(this.userData.type){
        typevalue = this.userData.type;
      }
      var formatvalue = "";
      if(this.userData.format){
        formatvalue = this.userData.format;
      }
      var schemavalue = "";
      if(this.userData.schema){
        schemavalue = this.userData.schema;
      }
      var valuevalue = "";
      if(this.userData.value){
        valuevalue = this.userData.value;
      }

      var type = '<div>Type : <input class="mv-info-type" type="text" value="'+typevalue+'"></div>';
      var format = '<div>Format : <input class="mv-info-format" type="text" value="'+formatvalue+'"></div>';
      var schema = '<div>Schema : <input class="mv-info-schema" type="text" value="'+schemavalue+'"></div>';
      var value = '<div>Return value : <input class="mv-info-value" type="text" value="'+valuevalue+'"></div>';

      return $('<div><div>Name : <input class="mv-info-name" type="text" value="'+this.userData.name+'"></div>'+type+format+schema+value+
        '</div>');
    }
  });

  vw.cpm.ModuleConnectionView = function(start,end,labelname){
    var connection = new draw2d.Connection();
    //var label = new draw2d.shape.basic.Label({text:labelname, stroke:1, color:"#FF0000", fontColor:"#0d0d0d"});


    //connection.add(label, new draw2d.layout.locator.ParallelMidpointLocator());
    connection.setStroke(2);
    connection.setOutlineStroke(1);
    connection.setOutlineColor("#303030");
    connection.setRouter(null);
    connection.setColor("#91B93E");

    connection.setSource(start);
    connection.setTarget(end);

    var value = labelname;
    if(typeof labelname == "function"){
      value = start.
    }
    connection.setUserData({
      value:value
    });

    connection.info = function(){
      return $('<div>'+this.userData.value+'</div>');
    };

    return connection;
  }

  vw.cpm.ModuleMapBoxView = draw2d.shape.composite.Raft.extend({
    NAME : "ModuleMAP",

    init : function(def,execname,moduleval,namespace){
        this._super({width:200,height:200});

        var port = this.createPort("hybrid", new draw2d.layout.locator.LeftLocator(this));
          port.setName("input");


    },

    info : function(){
      return $('<div>map</div>');
    }


  });

  vw.cpm.ModuleBoxView = draw2d.shape.layout.VerticalLayout.extend({

    NAME: "Module",
  
    init : function(def,execname,moduleval,namespace)
    {
        this._super();
        // init the object with some good defaults for the activity setting.
        this.setUserData({def:def,name:execname,moduleval:moduleval,namespace:namespace});
        
        this.inputports = {};
        this.outputports = {};
        
        console.log(def);
        console.log(moduleval);
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
        
        
        // finally compose the shape with top/middle/bottom in VerticalLayout
        //
        this.add(top);
        this.add(center);

        // the bottom of the activity shape
        //
        //
        //
        for(var inputname in def.module.input){
          var input = this.createLabel(inputname);   
          input.setMinHeight(30);
          input.setStroke(0);
          input.setBackgroundColor(null);
          input.setFontColor("#a0a0a0");
          var port = input.createPort("input", new draw2d.layout.locator.LeftLocator(input));
          port.setName("input_"+execname+"_"+inputname);
          this.inputports[inputname]=port;
          this.add(input);
        }

        for(var outputname in def.module.output){
          var output = this.createLabel(outputname);   
          output.setMinHeight(30);
          output.setStroke(0);
          output.setBackgroundColor(null);
          output.setFontColor("#a0a0a0");
          var port = output.createPort("output", new draw2d.layout.locator.RightLocator(output));
          port.setName("output_"+execname+"_"+outputname);
          this.outputports[outputname]=port;
          this.add(output);
        }
        
        
    },

    createLabel: function(txt){
       var label =new draw2d.shape.basic.Label({text:txt,padding:{left:10, top:3, right:10, bottom:5},resizeable:true});
       label.setStroke(1);
       label.setRadius(0);
       label.setBackgroundColor(null);
       label.setColor(this.bgColor.darker(0.2));
       label.onDoubleClick=function(angle){/* ignore them for the layout elements*/};
          
       return label;
     },

    info : function(){
      var inputs = "";
      for(var inputname in this.userData.moduleval.input){
        inputs += '<div>'+inputname+' : <input type="text" value="'+this.userData.moduleval.input[inputname]+'"></div>';
      }
      var outputs = "";
      if(this.userData.def.modulename!="_CMD" && this.userData.def.modulename!="_MAP"){
        for(var outputname in this.userData.def.module.output){
          outputs += '<div>'+outputname+' : <input type="text" style="width:90%;" value="'+this.userData.def.module.output[outputname].value+'"></div>';
        }
      }
      var namespace = "";
      if(this.userData.namespace){
        namespace = this.userData.namespace;
      }
      return $('<div><div class="mv-info-title">'+this.userData.def.modulename+'</div>'+
        '<div>Namespace : <input type="text" value="'+namespace+'"></div>'+
        '<div style="font-size:1.45em;">Inputs</div>'+
        inputs+
        '<div style="font-size:1.45em;">Outputs</div>'+
        outputs+
        '</div>');
    }

   });





}(window.vw = window.vw || {}));
