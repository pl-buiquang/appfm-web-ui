(function(vw){

  vw.cpm.CorpusManagerView = function(model,$el){
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.CorpusManagerView.prototype.init=function(){
    var me = this;
    this.$el.empty();
    var template = '<div class="treeview-fold treeview-unfolded" depth="0"><div class="treeview-node">Corpora</div><div id="corpora-corpora-container"></div></div><div class="treeview-fold treeview-unfolded" depth="0"><div class="treeview-node">Results</div><div id="corpora-results-container"></div></div>';
    this.$el.append(template);
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
  }

  vw.cpm.CorpusManagerView.prototype.renderCorpora = function(data,path){
    var me = this;
    var directory = {};
    directory[path] = data;
    var $html = me.renderDirectory([directory],"",1);
    this.$el.find("#corpora-corpora-container").append($html);
  }

  vw.cpm.CorpusManagerView.prototype.renderResults = function(data){
    var me = this;
    var $html = me.renderDirectory(data,me.model.app.cpmsettingsmanager.cpmsettings.result_dir,1);
    this.$el.find("#corpora-results-container").empty();
    this.$el.find("#corpora-results-container").append($html);
  }

  vw.cpm.CorpusManagerView.prototype.refresh = function(){
    var me = this;
    var corpus = vw.cpm.CorpusManagerView.renderSubTree(this.model.filetree.corpus,0,me.model.app.cpmsettingsmanager.cpmsettings.corpus_dir);
    var results = vw.cpm.CorpusManagerView.renderSubTree(this.model.filetree.results,0,me.model.app.cpmsettingsmanager.cpmsettings.result_dir);
    this.$el.html(corpus+results);

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
    this.$el.find('.treeview-node').not(".treeview-more").draggable({ appendTo: "body",opacity: 0.7, helper: "clone" });
    this.$el.find('.treeview-leaf').not(".treeview-more").draggable({ appendTo: "body",opacity: 0.7, helper: "clone" });
  }

  function compareTreeView(a,b){
    var at = typeof a;
    var bt = typeof b;
    
    if(a.hasOwnProperty("...")){
      return -1;
    }else if(b.hasOwnProperty("...")){
      return 1;
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

  vw.cpm.CorpusManagerView.renderSubTree = function(tree,offset,parentpath){
    var html = "";
    if(typeof tree == "object"){
      if(tree.constructor === Array){
        tree = tree.sort(compareTreeView);
        for (var i = tree.length - 1; i >= 0; i--) {
          html += vw.cpm.CorpusManagerView.renderSubTree(tree[i],offset,parentpath)
        };  
      }else{
        for (var i in tree) {
          if(i=="..."){
            if(tree[i] == "file"){
              html += '<div class="treeview-leaf treeview-more" style="margin-left:'+offset+'px;" filepath="'+parentpath+'">'+i+'</div>';
            }else{
              html += '<div class="treeview-node treeview-more" style="margin-left:'+offset+'px;" filepath="'+parentpath+'">'+i+'</div>';
            }
          }else{
            var folded = "treeview-folded";
            var hidden = 'style="display:none;"';
            var name = i;
            if(offset == 0){
              folded = "treeview-unfolded";
              hidden = "";
              name = "";
            }
            html += '<div class="treeview-fold '+folded+'"><div class="treeview-node" style="margin-left:'+offset+'px;" filepath="'+parentpath+name+'">'+i+'</div><div '+hidden+'>' + vw.cpm.CorpusManagerView.renderSubTree(tree[i],offset + 14,parentpath+name+"/")+'</div></div>';
          }
        };
      }

    }else if(typeof tree == "string"){
      html += '<div class="treeview-leaf" style="margin-left:'+offset+'px;" filepath="'+parentpath+tree+'">'+tree+'</div>';
    }
    return html;
  }

  vw.cpm.CorpusManagerView.prototype.renderDirectory = function(data,parentpath,depth){
    var me = this;
    var offset = depth*14;
    var html = "<div>";
    for (var i = 0; i < data.length; i++) {
      if(typeof data[i] == "object"){
        var filename = _.first(_.keys(data[i]));
        if(filename == "..."){
          html += '<div class="treeview-leaf treeview-more" style="margin-left:'+offset+'px;" filepath="'+parentpath+'" next="'+data[i][filename]+'">'+filename+'</div>';
        }else{
          var startingslash = "/";
          if(filename.indexOf("/")==0){
            startingslash = "";
          }
          html += '<div class="treeview-fold treeview-folded" depth="'+depth+'"><div class="treeview-node" style="margin-left:'+offset+'px;" filepath="'+parentpath+startingslash+filename+'">'+filename+'</div><div style="display:none;"></div></div>';
        }
      }else{
        var filename = data[i];
        var startingslash = "/";
        if(filename.indexOf("/")==0){
          startingslash = "";
        }
        html += '<div class="treeview-leaf" style="margin-left:'+offset+'px;" filepath="'+parentpath+startingslash+filename+'">'+filename+'</div>';
      }
    };
    html+="</div>";
    var $html = $(html);
    $html.find('.treeview-leaf').not(".treeview-more").click(function(){
      var that = this;
      var filepath = $(this).attr("filepath");
      me.model.app.openFile(filepath);
    });
    $html.find('.treeview-more').click(function(){
      var that = this;
      var filepath = $(this).attr("filepath");
      var parent = $(this).parent();
      var offset = $(this).attr("next");
      var depth = 0;
      $(that).addClass("treeview-leaf-waiting");
      if(parent.parent().hasClass("treeview-fold")){
        depth = parent.parent().attr("depth");
      }
      me.model.lsDir(filepath,offset,function(newdata,parentpath){
        var addedhtml = me.renderDirectory(newdata,parentpath,parseInt(depth)+1);
        $(that).removeClass("treeview-leaf-waiting");
        $(that).replaceWith(addedhtml);
      });
    });
    $html.find('.treeview-node').click(function(){
      var that = this;
      var filepath = $(this).attr("filepath");
      var parent = $(this).parent();
      var offset = 0;
      var depth = 0;
      $(that).addClass("treeview-node-waiting");
      if(parent.hasClass("treeview-fold")){
        depth = parent.attr("depth");
      }
      $(that).unbind("click");
      me.model.lsDir(filepath,offset,function(newdata,parentpath){
        var addedhtml = me.renderDirectory(newdata,parentpath,parseInt(depth)+1);
        var parent = $(that).parent(".treeview-fold");
        var children = parent.children();
        parent.removeClass("treeview-folded");
        parent.addClass("treeview-unfolded");
        $(that).removeClass("treeview-node-waiting");
        $(children[1]).append(addedhtml);
        $(children[1]).slideDown();
        $(that).on("click",function(){
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
      });
    });
    $html.find('.treeview-node').not(".treeview-more").draggable({ appendTo: "body",opacity: 0.7, helper: "clone" });
    $html.find('.treeview-leaf').not(".treeview-more").draggable({ appendTo: "body",opacity: 0.7, helper: "clone" });
    return $html.children();
  }


}(window.vw = window.vw || {}));
