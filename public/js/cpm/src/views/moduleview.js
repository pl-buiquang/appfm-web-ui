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
    var editor = ace.edit("source-"+this.id);
    var YamlMode = ace.require("ace/mode/yaml").Mode;
    editor.session.setMode(new YamlMode());
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
    this.$el.find(".canvas-view").attr('id',this.id);

    this.$el.find('.module-view-infos-panel').html(me.model.def.module.desc);
    if(me.canvas){
      me.canvas.destroy();
    }
    me.canvas = new draw2d.Canvas(me.id);

    me.canvas.onDrop = function(droppedDomNode, x, y, shiftKey, ctrlKey)
    {
        console.log();
        var module = me.model.app.modulesmanager.modules[droppedDomNode.data("modname")];
        var moduleboxview =  new vw.cpm.ModuleBoxView(module.module,module.module.name);
        me.canvas.add(moduleboxview,x,y);
        /*var type = $(droppedDomNode).data("shape");
        var figure = eval("new "+type+"();");
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        this.getCommandStack().execute(command);*/
    }

    me.canvas.on("select", function(emitter, figure){
      console.log(emitter);
      console.log(figure);
    });
    
    for(var inputname in me.model.def.module.input){
      var inputview = new vw.cpm.ModuleInputView();
      me.canvas.add(inputview);
    }

    for(var outputname in me.model.def.module.output){
      var outputview = new vw.cpm.ModuleOutputView();
      me.canvas.add(outputview);
    }

    for (var i = 0; i < me.model.def.module.exec.length ; i++) {
      var execname = _.first(_.keys(me.model.def.module.exec[i]));
      regex = /(_?[a-zA-Z][a-zA-Z0-9\-_]+(@[a-zA-Z0-9\-_]+)?)(#(?:\w|-)+)?/;
      var match = regex.exec(execname);
      if(!match){
        alert("error when fetching execution modules pipeline ! ");
      }
      var module = me.model.app.modulesmanager.modules[match[1]];
      var moduleboxview =  new vw.cpm.ModuleBoxView(module,execname,me.model.def.module.exec[i]);
      me.canvas.add(moduleboxview,150*i+50,50);
    };
    
  }

  vw.cpm.ModuleView.templateGraphical = '<div><div class="canvas-view"></div><div class="module-view-infos-panel"></div></div>';

  vw.cpm.ModuleView.template = '<div class="module-header">'+
  '<span class="module-view-source module-header-item" style="float:left; margin-left:8px;">source</span>'+
  '<span class="module-view-graphic module-header-item" style="float:left; margin-left:20px;">view</span>'+
  '<span class="module-run module-header-item" style="float:right; margin-right:8px;">run</span>'+
  '<span class="module-save module-header-item" style="float:right; margin-right:20px;">save</span>'+
  '</div>'+
  '<div class="module-content-view"></div>';

  vw.cpm.ModuleView.templateGraphic = '<div class="module-graphical-view"><div ></div>';



}(window.vw = window.vw || {}));
