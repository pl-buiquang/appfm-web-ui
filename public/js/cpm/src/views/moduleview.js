(function(vw){

  vw.cpm.ModuleView = function(model,$el){
    this.id = vw.cpm.utils.guid();
    this.model = model;
    if($el){
      this.$el = $el || $('<div></div>');
      this.el = this.$el[0];
      this.init();
    }
  };

  vw.cpm.ModuleView.prototype.init=function(){
    var me = this;
    this.$el.empty();
    this.$el.append(vw.cpm.ModuleView.template);

    this.$el.find('.module-view-infos-panel').perfectScrollbar({suppressScrollX:true});

    /*if(me.model.def.hasOwnProperty("module")){
      me.renderGraphical();
    }else{
      me.renderSource();
    }
    me.setActiveMenu(".module-view-graphic");
    */
   me.renderSource();
   me.setActiveMenu(".module-view-source");
   
   
    this.$el.find(".module-view-source").on("click",function(){
      me.$el.find(".module-content-view").empty();
      me.renderSource();
      me.setActiveMenu(".module-view-source");
    });
   /* this.$el.find(".module-view-graphic").on("click",function(){
      me.showGraphical();
      me.setActiveMenu(".module-view-graphic");
    });
    */
   
    this.$el.find(".module-save").on("click",function(){
      me.model.sync(function(){
        me.init();
        me.model.app.logger.info("successfully saved");
        me.$el.find(".module-save").addClass("success-action");
        setTimeout(function(){
          me.$el.find(".module-save").removeClass("success-action");
        },2000);
      },function(){
        me.init();
        me.model.app.logger.error("couldn't save. error happend!");
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

    if(me.model.def.error){
      this.$el.find(".module-content-view").append('<div class="error-msg">'+me.model.def.error+'</div>');  
    }
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

    
    this.$el.on("fullscreenOn",function(){
        me.$el.find(".module-source-editor").height(me.$el.find(".module-view-container").height()-me.$el.find(".module-header").height());
        me.editor.resize();
      });

    this.$el.on("fullscreenOff",function(){      
        me.$el.find(".module-source-editor").height(me.$el.find(".module-view-container").height()-me.$el.find(".module-header").height());
        me.editor.resize();
      });


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
        var value = $form.find('input[name="'+inputname+'"]').val()
        if(value.trim()!=""){
          conf[inputname] = value;
        }
      } 
      me.model.run(conf,function(){
        me.$el.find(".module-content-view").empty();
        me.renderSource();
        me.setActiveMenu(".module-view-source");
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
    return; // disabled
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

    draw2d.Configuration.factory.createConnection = vw.cpm.ModuleConnectionView;

    me.canvas.onDrop = function(droppedDomNode, x, y, shiftKey, ctrlKey)
    {
        var module = me.model.app.modulesmanager.modules[droppedDomNode.data("modname")];
        var moduleboxview =  new vw.cpm.ModuleBoxView(module,module.module.name,{},"");
        me.canvas.add(moduleboxview,x,y);
        /*var type = $(droppedDomNode).data("shape");
        var figure = eval("new "+type+"();");
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        this.getCommandStack().execute(command);*/
    }

    this.$el.find(".mvti-output").click(function(e){
      var outputview = new vw.cpm.ModuleOutputView("new_output",{});
      me.canvas.add(outputview,50,50);
    });
    this.$el.find(".mvti-input").click(function(e){
      var inputview = new vw.cpm.ModuleInputView("new_input",{});
      me.canvas.add(inputview,50,50);

    });
    this.$el.find(".mvti-cmd").click(function(e){
      console.log(e);
      var module = me.model.app.modulesmanager.modules["_CMD"];
      var moduleboxview =  new vw.cpm.ModuleBoxView(module,module.module.name,{CMD:"",
          DOCKERFILE:"false",
          CONTAINED:"false"},"");
      me.canvas.add(moduleboxview,50,50);
    });
    this.$el.find(".mvti-map").click(function(e){
      var module = me.model.app.modulesmanager.modules["_MAP"];
      var moduleboxview =  new vw.cpm.ModuleMapBoxView(module,module.module.name,{IN:"",
          RUN:"",
          REGEX:"",
          CHUNK_SIZE:""},"");
      me.canvas.add(moduleboxview,50,50);
    });

    me.canvas.on("select", function(emitter, figure){
      console.log(emitter);
      
      if(figure){
        console.log(figure);
        me.$el.find('.module-view-infos-panel').empty();
        me.$el.find('.module-view-infos-panel').append(figure.info());
      }else{
        console.log(me.model.def);
        me.$el.find('.module-view-infos-panel').html(JSON.stringify(me.model.def.module));
      }
    });

    
    this.availableVariables = {};
    this.boundVariables = [];

    for(var inputname in me.model.def.module.input){
      var inputview = new vw.cpm.ModuleInputView(inputname,me.model.def.module.input[inputname]);
      me.canvas.add(inputview);
      this.availableVariables[inputname] = inputview.port;
    }

    var rundirinput = new vw.cpm.ModuleInputView("_RUN_DIR",{type:"DIR"});
    me.canvas.add(rundirinput);
    this.availableVariables["_RUN_DIR"] = rundirinput.port;

    var defdirinput = new vw.cpm.ModuleInputView("_DEF_DIR",{type:"DIR"});
    me.canvas.add(defdirinput);
    this.availableVariables["_DEF_DIR"] = defdirinput.port;

    for(var outputname in me.model.def.module.output){
      var outputview = new vw.cpm.ModuleOutputView(outputname,me.model.def.module.output[outputname]);
      me.canvas.add(outputview);
      this.boundVariables = this.boundVariables.concat(vw.cpm.utils.extractVars(me.model.def.module.output[outputname].value,outputview.port));
    }


    for (var i = 0; i < me.model.def.module.exec.length ; i++) {
      var execname = _.first(_.keys(me.model.def.module.exec[i]));
      regex = /(_?[a-zA-Z][a-zA-Z0-9\-_]+(@[a-zA-Z0-9\-_]+)?)(#((?:\w|-)+))?/;
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
          regex = /(_?[a-zA-Z][a-zA-Z0-9\-_]+(@[a-zA-Z0-9\-_]+)?)(#((?:\w|-)+))?/;
          var runitemmatch = regex.exec(runitemexecname);
          if(!runitemmatch){
            alert("error when fetching execution modules pipeline ! ");
          }

          var runitemmoduleval = runitem[runitemexecname];

          var runitemmodule = me.model.app.modulesmanager.modules[runitemmatch[1]];
          var runitemmoduleboxview =  new vw.cpm.ModuleBoxView(runitemmodule,runitemexecname,runitemmoduleval,runitemmatch[4]);

          this.availableVariables = vw.cpm.ModuleView.getOutputVars(runitemmodule,runitemexecname,runitemmoduleboxview,this.availableVariables,runitemmoduleval,"_MAP");
          this.availableVariables = vw.cpm.ModuleView.getOutputVars(runitemmodule,runitemexecname,runitemmoduleboxview,this.availableVariables,runitemmoduleval);
          var boundvariables = vw.cpm.ModuleView.getInputVars(runitemmoduleval.input,runitemmodule,runitemmoduleboxview);
          this.boundVariables = this.boundVariables.concat(boundvariables);
          me.canvas.add(runitemmoduleboxview,150*i+60,50+j*200);
        }
        mapcontainer.setDimension(200,moduleval.input.RUN.length*200+50);
      }else{
        var module = me.model.app.modulesmanager.modules[match[1]];
        var moduleboxview =  new vw.cpm.ModuleBoxView(module,execname,moduleval,match[4]);

        this.availableVariables = vw.cpm.ModuleView.getOutputVars(module,execname,moduleboxview,this.availableVariables,moduleval);
        this.boundVariables = this.boundVariables.concat(vw.cpm.ModuleView.getInputVars(moduleval.input,module,moduleboxview));

        me.canvas.add(moduleboxview,150*i+50,50);
      }

    };
    
    console.log(this.availableVariables);
    console.log(this.boundVariables);

    this.createConnections();

  }

  vw.cpm.ModuleView.prototype.showInfo = function(element){

  }

  vw.cpm.ModuleView.prototype.exportViewToModelObj = function(){
    var me = this;
    
    for (var i = 0; i < me.canvas.figures.data.length; i++) {
      me.canvas.figures.data[i];
    };
    for (var i = 0; i < me.canvas.lines.data.length; i++) {
      me.canvas.lines.data[i];
    };
  }

  vw.cpm.ModuleView.prototype.createConnections = function(){
    for (var i = 0; i < this.boundVariables.length; i++) {
      console.log(this.boundVariables[i]);
      
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
    '<span class="module-view-toolbox-item mvti-cmd">+ CMD</span>'+
    '<span class="module-view-toolbox-item mvti-map">+ MAP</span>'+
    '<span class="module-view-toolbox-item mvti-input">+ Input</span>'+
    '<span class="module-view-toolbox-item mvti-output">+ Output</span>'+
    '</div><div class="canvas-container"><div class="canvas-view"></div></div><div class="module-view-infos-panel"></div></div>';

  vw.cpm.ModuleView.template = '<div class="module-view-container"><div class="module-header">'+
  '<span class="module-view-source module-header-item" style="float:left; margin-left:8px; text-shadow:1px 1px #999999">source</span>'+
  //'<span class="module-view-graphic module-header-item" style="float:left; margin-left:20px;">view</span>'+
  '<span class="module-save module-header-item" style="float:left; margin-left:8px; text-shadow:1px 1px #999999">save</span>'+
  '<span class="module-run module-header-item" style="float:left; margin-left:8px; text-shadow:1px 1px #999999">run</span>'+
  '</div>'+
  '<div class="module-content-view"></div></div>';

  vw.cpm.ModuleView.templateGraphic = '<div class="module-graphical-view"><div ></div>';



}(window.vw = window.vw || {}));
