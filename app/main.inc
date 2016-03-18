<?php


global $context;

$context = new ZMQContext();

Router::addRoutes(array(
  ""=>"cpm_main",
  "test"=>"cpm_test",
  "rest/cmd"=>"cmdexec",
  "introslides"=>"introslides",
));

function cpm_main(){
  global $page;

  //$page->addJS(BASE_URL."public/js/vendor/bootstrap-3.1.1-dist/js/bootstrap.min.js");

  $page->addCSS(BASE_URL."public/css/jquery-ui.css");
  $page->addJS(BASE_URL."public/js/vendor/jquery-2.1.0.min.js");
  $page->addJS(BASE_URL."public/js/vendor/jquery-ui.min.js");


  $page->addJS(BASE_URL."public/js/vendor/underscore-min.js");
  $page->addJS(BASE_URL."public/js/vendor/backbone-min.js");

  $page->addJS(BASE_URL."public/js/vendor/store.min.js");


  $page->addJS(BASE_URL."public/vendor/draw2d/prod/lib/jquery.autoresize.js");
  $page->addJS(BASE_URL."public/vendor/draw2d/prod/lib/jquery-touch_punch.js");
  $page->addJS(BASE_URL."public/vendor/draw2d/prod/lib/jquery.contextmenu.js");
  $page->addJS(BASE_URL."public/vendor/draw2d/prod/lib/shifty.js");
  $page->addJS(BASE_URL."public/vendor/draw2d/prod/lib/raphael.js");
  $page->addJS(BASE_URL."public/vendor/draw2d/prod/lib/rgbcolor.js");
  $page->addJS(BASE_URL."public/vendor/draw2d/prod/lib/canvg.js");
  $page->addJS(BASE_URL."public/vendor/draw2d/prod/lib/Class.js");
  $page->addJS(BASE_URL."public/vendor/draw2d/prod/lib/json2.js");
  $page->addJS(BASE_URL."public/vendor/draw2d/prod/lib/pathfinding-browser.min.js");
  $page->addJS(BASE_URL."public/vendor/draw2d/prod/src/draw2d.js");

  $page->addJS(BASE_URL."public/vendor/jcubic-jquery.terminal/js/jquery.terminal-0.8.8.min.js");
  $page->addJS(BASE_URL."public/vendor/jcubic-jquery.terminal/js/jquery.mousewheel-min.js");
  $page->addCSS(BASE_URL."public/vendor/jcubic-jquery.terminal/css/jquery.terminal.css");

  $page->addCSS(BASE_URL.'public/css/perfect-scrollbar/css/perfect-scrollbar.css');
  $page->addJS(BASE_URL.'public/js/vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.js');


  $page->addJS(BASE_URL.'public/js/vendor/ace-builds-master/src-noconflict/ace.js');

  $page->addJS(BASE_URL.'public/js/vendor/ace-builds-master/src-noconflict/theme-twilight.js');

  $page->addJS(BASE_URL.'public/js/vendor/ace-builds-master/src-noconflict/mode-yaml.js');

  $page->addJS(BASE_URL.'public/js/vendor/yaml.js-develop/dist/yaml.js');


  $page->addJS(BASE_URL.'public/vendor/intro.js-2.0/intro.js');
  $page->addCSS(BASE_URL.'public/vendor/intro.js-2.0/introjs.css');
  
  $page->addJS(BASE_URL."public/js/cpm/build/cpmui.js");
  $page->addCSS(BASE_URL."public/js/cpm/build/style/style.css");

  $page->addCSS(BASE_URL."public/css/app.css");


  $html = tplset(array(
    "BASE_URL"=>BASE_URL,
    "HOSTNAME" => CPM_HOST,
    "WS_PORT" => CPM_WS_PORT
    ),tpl("main"));



  

  $page->addToBody($html);

}



function cpm_command_call($command,$data=NULL){
  global $context;

  set_time_limit ( 30);
  $socket = $context->getSocket(ZMQ::SOCKET_REQ);

  $socket->connect("tcp://".CPM_HOST.":".CPM_PORT);

  $dataframe = "";
  if(isset($data) && !empty($data)){
    $dataframe = "==DATA==".$data."==END_DATA==";
  }
  /* Send a request */
  $socket->send("==CMD==".$_POST['cmd']."==END_CMD==".$dataframe);

  $poll = new ZMQPoll();

  $id = $poll->add($socket, ZMQ::POLL_IN);
  $readable = array();
  $writable = array();
  try {
     /* Bloc le Poll tant qu'il y a quelque chose à faire */
     $events = $poll->poll($readable, $writable, 60000);
     $errors = $poll->getLastErrors();

     if (count($errors) > 0) {
         foreach ($errors as $error) {
             echo "Error polling object " . $error . "\n";
         }
     }
   } catch (ZMQPollException $e) {
       echo "poll failed: " . $e->getMessage() . "\n";
   }

  if($events > 0){
      $message = $socket->recv();    
  }else{
    $message = "timeout";
  }
  return $message;
}


function cmdexec(){
  if(isset($_POST)){
    $data = isset($_POST['data'])?$_POST['data']:"";
    $message = cpm_command_call($_POST['cmd'],$data);

    echo $message;
    exit();
  }
  echo "";
  exit();
}


function introslides(){

  global $page;

  $page->addJS(BASE_URL."public/vendor/reveal.js-3.2.0/lib/js/head.min.js");
  $page->addJS(BASE_URL."public/vendor/reveal.js-3.2.0/js/reveal.js");

  $page->addCSS(BASE_URL."public/vendor/reveal.js-3.2.0/css/reveal.css");
  $page->addToHeader('<link rel="stylesheet" href="'.BASE_URL.'public/vendor/reveal.js-3.2.0/css/theme/black.css" id="theme">');
  $page->addCSS(BASE_URL."public/vendor/reveal.js-3.2.0/lib/css/zenburn.css");


  $page->addToHeader("<script>
      var link = document.createElement( 'link' );
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = window.location.search.match( /print-pdf/gi ) ? 'css/print/pdf.css' : 'css/print/paper.css';
      document.getElementsByTagName( 'head' )[0].appendChild( link );
    </script>");


  $page->addToBody(tplset(array(),tpl("introslides")));


  $page->addToBody("    <script>

      // Full list of configuration options available at:
      // https://github.com/hakimel/reveal.js#configuration
      Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,

        transition: 'slide', // none/fade/slide/convex/concave/zoom

        // Optional reveal.js plugins
        dependencies: [
          { src: '".BASE_URL."public/vendor/reveal.js-3.2.0/"."lib/js/classList.js', condition: function() { return !document.body.classList; } },
          { src: '".BASE_URL."public/vendor/reveal.js-3.2.0/"."plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: '".BASE_URL."public/vendor/reveal.js-3.2.0/"."plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: '".BASE_URL."public/vendor/reveal.js-3.2.0/"."plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
          { src: '".BASE_URL."public/vendor/reveal.js-3.2.0/"."plugin/zoom-js/zoom.js', async: true },
          { src: '".BASE_URL."public/vendor/reveal.js-3.2.0/"."plugin/notes/notes.js', async: true }
        ]
      });

      

    </script>
");
}

function cpm_test($args){
  global $page;

  $page->addJS(BASE_URL."public/js/vendor/jquery-2.1.0.min.js");
  $page->addJS(BASE_URL."public/vendor/node_modules/bootstrap/dist/js/bootstrap.min.js");
  $page->addCSS(BASE_URL."public/vendor/node_modules/bootstrap/dist/css/bootstrap.min.css");
  $page->addToBody(tpl("test"));

}

