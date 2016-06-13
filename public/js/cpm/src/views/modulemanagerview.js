(function(vw){

  vw.cpm.ModuleManagerView = function(model,$el){
    this.id = vw.cpm.utils.guid();
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.ModuleManagerView.prototype.init=function(){
    var me = this;

    $mastercontainer = $(vw.cpm.ModuleManagerView.template);
    me.$el.empty();
    me.$el.append($mastercontainer);

    me.$el.find("#modulemanager-menu").append('<div id="modulemanager-add-new">Create a new module</div>');
    me.$el.find("#modulemanager-menu").append('<input id="modulemanager-search" type="text">');
    me.$el.find("#modulemanager-add-new").click(function(){
      me.model.prepareCreateNewModule();
    });
    me.$el.find("#modulemanager-search").on("keyup",function(e){
      if(e.keyCode == 27){
        me.showAll();
        $(this).val("");
      }else{
        var query = $(this).val().trim();
        if(query){
          me.model.search(query,function(data){me.show(data);});
        }else{
          me.showAll();
        }
      }
    });
  }

  vw.cpm.ModuleManagerView.prototype.showAll = function(){
    this.$el.find(".treeview-leaf").each(function(i,e){
      var $node = $(e);
      if($node.hasClass("search-hidden")){
        $node.removeClass("search-hidden");
      }else if($node.hasClass("search-result")){
        $node.removeClass("search-result");
      }

    });
    this.$el.find('.treeview-node').each(function(i,e){
      if($(e).hasClass("search-hidden")){
        $(e).removeClass("search-hidden");
      }
    })
  }

  vw.cpm.ModuleManagerView.prototype.show = function(list){
    this.$el.find(".treeview-leaf").each(function(i,e){
      var $node = $(e);
      if(list.indexOf($node.html().trim()) == -1){
        if(!$node.hasClass("search-hidden")){
          $node.addClass("search-hidden");
        }
        if($node.hasClass("search-result")){
          $node.removeClass("search-result");
        }
      }else{
        if($node.hasClass("search-hidden")){
          $node.removeClass("search-hidden");
        }
        if(!$node.hasClass("search-result")){
          $node.addClass("search-result");
        }
        var $parents = $node.parents(".treeview-module-folder-content");
        $parents.each(function(ip,ep){
          var $ep = $(ep);
          var $epp = $ep.parent();
          if($epp.hasClass("treeview-folded")){
            $ep.show();
            $epp.removeClass("treeview-folded");
            $epp.addClass("treeview-unfolded");
          }
        });
      }
    });
    this.$el.find('.treeview-node').each(function(i,e){
      if(!$(e).hasClass("search-hidden")){
        $(e).addClass("search-hidden");
      }
    })
  }



  vw.cpm.ModuleManagerView.prototype.refresh = function(){
    var me = this;

    this.$el.find("#modulemanager-list").html(vw.cpm.ModuleManagerView.renderSubTree(this.model.moduletree,0));
    this.$el.find('.treeview-node').on("click",function(){
      var parent = $(this).parent();
      if(parent.hasClass("treeview-fold")){
        var children = parent.children();
        if(parent.hasClass("treeview-folded")){
          $(children[1]).slideDown();
          parent.removeClass("treeview-folded");
          parent.addClass("treeview-unfolded");
        }else{
          $(children[1]).slideUp();
          parent.removeClass("treeview-unfolded");
          parent.addClass("treeview-folded");
        }
      }
    });
    this.$el.find('.treeview-leaf').on("click",function(){
      var modulename = $(this).html();
      me.model.showModule(modulename);
    });
    this.$el.find('.treeview-leaf').draggable({ appendTo: "body",opacity: 0.7, helper: "clone" });
    this.$el.find('.treeview-leaf').droppable();
  }

  function compareTreeView(a,b){
    var at = typeof a;
    var bt = typeof b;
    
    if(a.hasOwnProperty("folder") && a.folder){
      return 1;
    }else if(b.hasOwnProperty("folder") && b.folder){
      return -1;
    }else if(at != bt){
      if(at == "string"){
        return -1;
      }else if(bt == "string"){
        return 1;
      }else{
        return 0; // should not happen since it means that both elements are objects
      }
    }else {
      return 0;
    }
  }

  vw.cpm.ModuleManagerView.renderSubTree = function(tree,offset){
    var html = "";
    var offsetsize = 14;
    if(typeof tree == "object"){
      if(tree.constructor === Array){
        tree = tree.sort(compareTreeView);
        for (var i = tree.length - 1; i >= 0; i--) {
          html += vw.cpm.ModuleManagerView.renderSubTree(tree[i],offset)
        };  
      }else{
        if(tree.hasOwnProperty("folder") && tree.folder){
          if(tree.foldername!=""){
            var folded = "treeview-folded";
            var hidden = 'style="display:none;"';
            if((offset / offsetsize) < 3){
              folded = "treeview-unfolded";
              hidden = "";
            }
            html += '<div class="treeview-fold '+folded+'"><div class="treeview-node treeview-module-folder" style="margin-left:'+offset+'px;">'+tree.foldername+'</div><div class="treeview-module-folder-content" '+hidden+'>' + vw.cpm.ModuleManagerView.renderSubTree(tree.items,offset + offsetsize)+'</div></div>';
          }else{
            html += vw.cpm.ModuleManagerView.renderSubTree(tree.items,offset)
          }
        }else if(tree.hasOwnProperty("module")){
          html += '<div class="treeview-leaf treeview-module-item draw2d_droppable" data-modname="'+tree.module.name+'" style="margin-left:'+offset+'px;">'+tree.module.name+'</div>';
        }else{
          html += '<div class="treeview-leaf treeview-module-item" style="margin-left:'+offset+'px; color:red;">'+tree.modulename+'</div>';
        }
        
      }

    }
    return html;
  }


  vw.cpm.ModuleManagerView.template = '<div><div id="modulemanager-menu"></div><div id="modulemanager-list"></div></div>';

  vw.cpm.ModuleManagerView.templatePreConfigAddNew = '<div>'+
    '<div style="padding:12px;">'+
      '<div>Choose a name for your new module (allowed form : [a-zA-Z][a-zA-Z0-9\-_]+(@[a-zA-Z0-9\-_]+)? ): <input type="text"></div>'+
      '<button class="create-module-preconfig-submit" type="button">Ok</button>'+
      '<div style="margin-top:24px; font-size:0.75em;">For more information about how to create modules refer to help pages.</div>'+
    '</div>'+
  '</div>';

  



}(window.vw = window.vw || {}));
