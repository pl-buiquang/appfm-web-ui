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
      me.renderSource();
    }
    me.setActiveMenu(".module-view-graphic");

    this.$el.find(".module-view-source").on("click",function(){
      me.$el.find(".module-content-view").empty();
      me.renderSource();
      me.setActiveMenu(".module-view-source");
    });
    this.$el.find(".module-view-graphic").on("click",function(){
      me.showGraphical();
      me.setActiveMenu(".module-view-graphic");
    });
    this.$el.find(".module-save").on("click",function(){
      me.model.sync(function(){

      },function(){

      });
    });
    this.$el.find(".module-run").on("click",function(){
      me.$el.find(".module-content-view").empty();
      // first sync to see if current module def is validated by server
      // then render run configuration form
      me.renderRunConfForm();
      me.setActiveMenu(".module-run");
    });
  }

  vw.cpm.ModuleView.prototype.setActiveMenu = function(activemenuclass){
    this.$el.find(".module-header-item").removeClass("active");
    this.$el.find(activemenuclass).addClass("active");
  }

  vw.cpm.ModuleView.prototype.render=function(){
  }

  vw.cpm.ModuleView.prototype.renderSource = function(){
    var me = this;
    var content = me.model.def.source;//.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\s)/g,"&nbsp;");

    
    this.$el.find(".module-content-view").append('<div id="source-'+this.id+'" class="module-source-editor"></div>');
    this.$el.find('#source-'+this.id).append(content);
    this.editor = ace.edit("source-"+this.id);
    var YamlMode = ace.require("ace/mode/yaml").Mode;

    // for built-in modules set read only
    if(me.model.def.modulename.indexOf("_")==0){
      this.setReadOnly(true);
    }
    
    
    this.editor.getSession().setTabSize(2);
    this.editor.getSession().setUseSoftTabs(true);
    this.editor.session.setMode(new YamlMode());
  }

  vw.cpm.ModuleView.prototype.renderRunConfForm=function(){
    var me = this;

    $form = $('<div></div>');
    var inputs = me.model.def.module.input;
    for(var inputname in inputs){
      $form.append('<div class="module-run-conf-form-field"><span style="font-weight:bold">'+inputname+'</span><span style="font-style:italic;"> ('+inputs[inputname].type+')</span><input type="text" value="" name="'+inputname+'"></div>')
    }
    $form.append('<center><button class="submit" type="button">Run</button></center>');

    this.$el.find(".module-content-view").append($form);

    $form.find("input").droppable({
      drop: function( event, ui ) {
        $(this).val(ui.draggable.attr("filepath"));
      }
    });

    $form.find(".submit").on("click",function(){
      var conf = {}
      for(var inputname in inputs){
        conf[inputname] = $form.find('input[name="'+inputname+'"]').val()
      } 
      me.model.run(conf,function(){
        me.showGraphical();
        me.setActiveMenu(".module-view-graphic");
      });
    })
  }

  vw.cpm.ModuleView.prototype.showGraphical = function(){
    var me = this;
    me.$el.find(".module-content-view").empty();
    if(me.model.def.hasOwnProperty("module")){
      me.renderGraphical();
    }else{
      me.$el.find(".module-content-view").append("Unable to display graphical view of this module, definition contains error, please correct source file before");
    }
  }

  vw.cpm.ModuleView.prototype.renderGraphical=function(){
    var me = this;
    this.$el.find(".module-content-view").append(vw.cpm.ModuleView.templateGraphical);
    this.$el.find('.canvas-container').perfectScrollbar();
    this.$el.find(".canvas-view").attr('id',this.id);

    this.$el.find('.module-view-infos-panel').html(me.model.def.module.desc);

    // for built in module, disallow view
    if(me.model.def.modulename.indexOf("_")==0){
      return;
    }

    if(me.canvas){
      me.canvas.destroy();
    }
    me.canvas = new draw2d.Canvas(me.id);

    me.canvas.onDrop = function(droppedDomNode, x, y, shiftKey, ctrlKey)
    {
        console.log();
        var module = me.model.app.modulesmanager.modules[droppedDomNode.data("modname")];
        var moduleboxview =  new vw.cpm.ModuleBoxView(module,module.module.name,{});
        me.canvas.add(moduleboxview,x,y);
        /*var type = $(droppedDomNode).data("shape");
        var figure = eval("new "+type+"();");
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        this.getCommandStack().execute(command);*/
    }

    me.canvas.on("select", function(emitter, figure){
      console.log(emitter);
      
      if(figure){
        console.log(figure);
      }else{
        console.log(me.model.def);
      }
    });

    
    this.availableVariables = {};
    this.boundVariables = [];

    for(var inputname in me.model.def.module.input){
      var inputview = new vw.cpm.ModuleInputView(inputname);
      me.canvas.add(inputview);
      this.availableVariables[inputname] = inputview.port;
    }

    for(var outputname in me.model.def.module.output){
      var outputview = new vw.cpm.ModuleOutputView(outputname);
      me.canvas.add(outputview);
      this.boundVariables = this.boundVariables.concat(vw.cpm.utils.extractVars(me.model.def.module.output[outputname].value,outputview.port));
    }


    for (var i = 0; i < me.model.def.module.exec.length ; i++) {
      var execname = _.first(_.keys(me.model.def.module.exec[i]));
      regex = /(_?[a-zA-Z][a-zA-Z0-9\-_]+(@[a-zA-Z0-9\-_]+)?)(#(?:\w|-)+)?/;
      var match = regex.exec(execname);
      if(!match){
        alert("error when fetching execution modules pipeline ! ");
      }

      var moduleval = me.model.def.module.exec[i][execname];
      
      if(match[1] == "_MAP"){
        var mapcontainer = new vw.cpm.ModuleMapBoxView(module,execname,moduleval);
        me.canvas.add(mapcontainer,150*i+50,50);

        for(var j =0;j<moduleval.input.RUN.length;j++){
          var runitem = moduleval.input.RUN[j];
          var runitemexecname = _.first(_.keys(runitem));
          regex = /(_?[a-zA-Z][a-zA-Z0-9\-_]+(@[a-zA-Z0-9\-_]+)?)(#(?:\w|-)+)?/;
          var runitemmatch = regex.exec(runitemexecname);
          if(!runitemmatch){
            alert("error when fetching execution modules pipeline ! ");
          }

          var runitemmoduleval = runitem[runitemexecname];

          var runitemmodule = me.model.app.modulesmanager.modules[runitemmatch[1]];
          var runitemmoduleboxview =  new vw.cpm.ModuleBoxView(runitemmodule,runitemexecname,runitemmoduleval);

          this.availableVariables = vw.cpm.ModuleView.getOutputVars(runitemmodule,runitemexecname,runitemmoduleboxview,this.availableVariables,runitemmoduleval,"_MAP");
          this.availableVariables = vw.cpm.ModuleView.getOutputVars(runitemmodule,runitemexecname,runitemmoduleboxview,this.availableVariables,runitemmoduleval);
          var boundvariables = vw.cpm.ModuleView.getInputVars(runitemmoduleval.input,runitemmodule,runitemmoduleboxview);
          this.boundVariables = this.boundVariables.concat(boundvariables);
          me.canvas.add(runitemmoduleboxview,150*i+60,50+j*200);
        }
        mapcontainer.setDimension(200,moduleval.input.RUN.length*200+50);
      }else{
        var module = me.model.app.modulesmanager.modules[match[1]];
        var moduleboxview =  new vw.cpm.ModuleBoxView(module,execname,moduleval);

        this.availableVariables = vw.cpm.ModuleView.getOutputVars(module,execname,moduleboxview,this.availableVariables,moduleval);
        this.boundVariables = this.boundVariables.concat(vw.cpm.ModuleView.getInputVars(moduleval.input,module,moduleboxview));

        me.canvas.add(moduleboxview,150*i+50,50);
      }

    };
    
    console.log(this.availableVariables);
    console.log(this.boundVariables);

    this.createConnections();

  }

  vw.cpm.ModuleView.prototype.exportViewToModelObj = function(){
    var me = this;
    
    for (var i = 0; i < me.canvas.figures.data.length; i++) {
      me.canvas.figures.data[i]
    };
    for (var i = 0; i < me.canvas.lines.data.length; i++) {
      me.canvas.lines.data[i]
    };
  }

  vw.cpm.ModuleView.prototype.createConnections = function(){
    for (var i = 0; i < this.boundVariables.length; i++) {
      this.boundVariables[i]
      
      if(this.availableVariables[this.boundVariables[i].name]){
        var entry = this.availableVariables[this.boundVariables[i].name];
        var connection = new vw.cpm.ModuleConnectionView(entry,this.boundVariables[i].ref,this.boundVariables[i].raw);
        this.canvas.add(connection);
      }
    };
  }

  vw.cpm.ModuleView.getInputVars = function(modulevalinputs,moduledefdata,moduleboxview){
    var variablesadd = [];
    for (var inputname in  modulevalinputs) {
      var input = modulevalinputs[inputname];
      if(typeof input == "object"){
        if(input.constructor === Array){
          for (var i = 0; i < input.length; i++) {
            variablesadd = variablesadd.concat(vw.cpm.utils.extractVars(input[i],moduleboxview.inputports[inputname]));
          };
        }else{
          for (var i in input){
            variablesadd = variablesadd.concat(vw.cpm.utils.extractVars(input[i],moduleboxview.inputports[inputname]));
          }
        }
      }else{
        variablesadd = variablesadd.concat(vw.cpm.utils.extractVars(input,moduleboxview.inputports[inputname]));
      }
    };
    return variablesadd;
  }

  vw.cpm.ModuleView.getOutputVars = function(moduledata,execname,moduleboxview,variables,moduleval,prefix){
    var prepend = "";
    if(prefix){
      prepend = prefix+".";
    }
    for (var output in moduledata.module.output) {
      variables[prepend+execname+"."+output] = moduleboxview.outputports[output];
    };
    return variables;    
  }

  vw.cpm.ModuleView.templateGraphical = '<div><div class="module-view-toolbox">'+
    '<span class="module-view-toolbox-item">+ CMD</span>'+
    '<span class="module-view-toolbox-item">+ MAP</span>'+
    '<span class="module-view-toolbox-item">+ Input</span>'+
    '<span class="module-view-toolbox-item">+ Output</span>'+
    '</div><div class="canvas-container"><div class="canvas-view"></div></div><div class="module-view-infos-panel"></div></div>';

  vw.cpm.ModuleView.template = '<div class="module-header">'+
  '<span class="module-view-source module-header-item" style="float:left; margin-left:8px;">source</span>'+
  '<span class="module-view-graphic module-header-item" style="float:left; margin-left:20px;">view</span>'+
  '<span class="module-run module-header-item" style="float:right; margin-right:8px;">run</span>'+
  '<span class="module-save module-header-item" style="float:right; margin-right:20px;">save</span>'+
  '</div>'+
  '<div class="module-content-view"></div>';

  vw.cpm.ModuleView.templateGraphic = '<div class="module-graphical-view"><div ></div>';



}(window.vw = window.vw || {}));
