(function(vw){

  vw.cpm.CorpusManagerView = function(model,$el){
    this.$el = $el || $('<div></div>');
    this.el = this.$el[0];
    this.model = model;
    this.init();
  };

  vw.cpm.CorpusManagerView.prototype.init=function(){
    var me = this;

  }

  vw.cpm.CorpusManagerView.prototype.refresh = function(){
    this.$el.html(vw.cpm.CorpusManagerView.renderSubTree(this.model.filetree,0));
  }

  vw.cpm.CorpusManagerView.renderSubTree = function(tree,offset){
    var html = "";
    if(typeof tree == "object"){
      if(tree.constructor === Array){
        for (var i = tree.length - 1; i >= 0; i--) {
          html += vw.cpm.CorpusManagerView.renderSubTree(tree[i],offset)
        };  
      }else{
        for (var i in tree) {
          html += '<div class="treeview-node" style="margin-left:'+offset+'px;">'+i+'</div>' + vw.cpm.CorpusManagerView.renderSubTree(tree[i],offset + 12)
        };
      }

    }else if(typeof tree == "string"){
      html += '<div class="treeview-leaf" style="margin-left:'+offset+'px;">'+tree+'</div>';
    }
    return html;
  }



}(window.vw = window.vw || {}));
