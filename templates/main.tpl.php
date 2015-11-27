<style>
#menu{
  background-color: #444444;
  position: absolute;
  width:80px;
  left:0;
  top:0;
  bottom: 0;
}

#menu-content{
  top:0;
  bottom: 0;
  background-color: #555555;
  position: absolute;
  width:300px;
  left:80px;
}

#main{
  top:0;
  bottom: 0;
  background-color: #e4e4e4;
  position: absolute;
  overflow-x: hidden;
  right:0;
}

.frame{
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
    margin: 0 24px 24px;
    position: relative;
}

.menu-open{
  left:380px;
}

.menu-closed{
  left:80px;
}

#cmdbar{
 width: 100%; 
  min-height:30px;
  word-wrap:break-word;
    outline:0px solid transparent;
    height:auto;
    overflow: hidden;
    margin-bottom: 10px;
    padding-left:20px;
    cursor: text;
}


#cmdbar:focus{
  outline:0px solid transparent;
}

#cmd-bar-container{
  padding-top: 10px;
  background-color: #fff;
  width:100%;
   box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
   min-height: 40px;
   max-height: 100px;
   position:relative;
}

</style>

<div id="left-panel">
  <div id="menu">
  Menu
  </div>
  <div id="menu-content">
  </div>
</div>
<div id="main" class="menu-closed">
  <div id="cmd-bar-container">
    <div id="cmdbar">
    </div>
  </div>
  <div id="active-content">
    <div class="frame">
          
            <div id="gfx_holder" width="100%" height="800px;"></div>
          
    </div>
  </div>
</div>


<script>

    $("#cmd-bar-container").perfectScrollbar({suppressScrollX:true});  

    window.cliobj = $('#cmdbar').cmd({
        prompt: '$',
        width: '100%',
        commands: function(command) {
          console.log(command);
            console.log(this);
        },
    });



    function toggleCLI(activate='undefined'){
        if(activate!="undefined"){
          if(activate){
            if(!window.cliobj.isenabled()){
              window.cliobj.enable();
            }
          }else{
            if(window.cliobj.isenabled()){
              window.cliobj.disable();
            }
          }
        }else if(window.cliobj.isenabled()){
          window.cliobj.disable();
        }else{
            window.cliobj.enable();
              
        }
    }




jQuery("#menu").click(function(){
  toggleCLI(false);
  jQuery("#main.menu-open").switchClass("menu-open","menu-closed");
  jQuery("#main.menu-closed").switchClass("menu-closed","menu-open");
})

jQuery("#active-content").on("click",function(){
  toggleCLI(false);
})

jQuery("#cmd-bar-container").on("click",function(){
  toggleCLI(true);
})

var cli = new vw.cpm.CLI(jQuery("#cpm-cli-main"));
</script>

