(function(vw){

  vw.cpm.CorpusManager = function(app,$el,options){
    this.loaded = 0;
    this.initiated = false;
    this.options = options;
    this.app = app;
    this.view = new vw.cpm.CorpusManagerView(this,$el);
    this.filetree = {}
    this.init();
  }

  vw.cpm.CorpusManager.prototype.init = function(){
    var me = this;
    this.loaded = 0;
    me.fetch();
  }

  vw.cpm.CorpusManager.prototype.fetch = function(){
    var me = this;
    for (var i = me.app.cpmsettingsmanager.cpmsettings.corpus_dir.length - 1; i >= 0; i--) {
      var corpuspath = me.app.cpmsettingsmanager.cpmsettings.corpus_dir[i];
      var rendering = (function(path){
        var func = function(data){
          me.view.renderCorpora(data,path);
        }
        return func;
      })(corpuspath);

      me.lsDir(corpuspath,0,rendering);
    }
    me.lsDir(me.app.cpmsettingsmanager.cpmsettings.result_dir,0,function(data){
      me.view.renderResults(data);
    });
    /*$.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"corpus ls --json --all"},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        me.filetree = {"corpus":{"corpora":data.corpus},"results":{"results":data.results}}; // because...
        me.view.refresh();
      }
    })*/
  }

  vw.cpm.CorpusManager.prototype.refreshResults = function(){
    var me = this;
    me.lsDir(me.app.cpmsettingsmanager.cpmsettings.result_dir,0,function(data){
      me.view.renderResults(data);
    });
  }

  vw.cpm.CorpusManager.prototype.lsDir = function(filepath,offset,onsuccess){
    var me = this;
    var n2load = me.app.cpmsettingsmanager.cpmsettings.corpus_dir.length + 1;
    $.ajax({
      type:"POST",
      url : me.app.options.cpmbaseurl + "rest/cmd",
      data:{cmd:"corpus lsdir "+filepath+" "+offset},
      dataType : 'json',
      success:function(data,textStatus,jqXHR){
        //me.filetree = {"corpus":{"corpora":data.corpus},"results":{"results":data.results}}; // because...
        onsuccess.call(me,data,filepath);
        me.loaded += 1;
        if(me.loaded == n2load){
          me.initiated = true;
        }
      },
      error:function(){
        me.loaded += 1;
        if(me.loaded == n2load){
          me.initiated = true;
        }
      }
    });
  }




}(window.vw = window.vw || {}));