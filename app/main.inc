<?php


global $context;

$context = new ZMQContext();

Router::addRoutes(array(
  ""=>"cpm_main",
  "test"=>"cpm_test",
  "rest/cmd"=>"cmdexec",
  "introslides"=>"introslides",
  "updateConnectionInfo"=>"updateconnectionInfo",
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


  $cpm_ws_host=CPM_WS_HOST;
  if(isset($_SESSION["CPM_WS_HOST"])){
    $cpm_ws_host=$_SESSION["CPM_WS_HOST"];
  }
  $cpm_host=CPM_HOST;
  if(isset($_SESSION["CPM_HOST"])){
    $cpm_host=$_SESSION["CPM_HOST"];
  }
  $cpm_port=CPM_PORT;
  if(isset($_SESSION["CPM_PORT"])){
    $cpm_port=$_SESSION["CPM_PORT"];
  }

  $html = tplset(array(
    "BASE_URL"=>BASE_URL,
    "HOSTNAME" => $_SERVER["SERVER_NAME"],
    "WS_HOST" => $cpm_ws_host,
    "CPM_HOST"=>$cpm_host,
    "CPM_PORT"=>$cpm_port,
    "SERVERS"=>json_encode(readServerInfo())
    ),tpl("main"));



  

  $page->addToBody($html);

  $page->addToBody('<script>$(document).ready(function(){if (Notification.permission !== "granted"){
    Notification.requestPermission();}});</script>');

}



function updateconnectionInfo(){
  Logger::Log($_POST);
  if(!isset($_POST["CPM_HOST"]) || !isset($_POST["CPM_PORT"]) || !isset($_POST["CPM_WS_HOST"])){
    echo '{"error":true}';
    exit();
  }

  $prevConncetionInfo = array(
    "CPM_HOST"=>$_SESSION["CPM_HOST"],
    "CPM_PORT"=>$_SESSION["CPM_PORT"],
    "CPM_WS_HOST"=>$_SESSION["CPM_WS_HOST"]
    );

  Logger::Log($_SESSION);

  $_SESSION["CPM_HOST"] = $_POST["CPM_HOST"];  
  $_SESSION["CPM_PORT"] = $_POST["CPM_PORT"];
  $_SESSION["CPM_WS_HOST"] = $_POST["CPM_WS_HOST"];
  $message = cpm_command_call("status");
  if($message != "timeout"){
    echo '{"success":true}';
    exit();
  }else{
    $_SESSION["CPM_HOST"] = $prevConncetionInfo["CPM_HOST"];  
    $_SESSION["CPM_PORT"] = $prevConncetionInfo["CPM_PORT"];
    $_SESSION["CPM_WS_HOST"] = $prevConncetionInfo["CPM_WS_HOST"];
    echo '{"error":true}';
    exit();
  }
  
}



function cpm_command_call($command,$data=NULL){
  global $context;

  set_time_limit ( 30);
  $socket = $context->getSocket(ZMQ::SOCKET_REQ);


  $cpm_host=CPM_HOST;
  if(isset($_SESSION["CPM_HOST"])){
    $cpm_host=$_SESSION["CPM_HOST"];
  }
  $cpm_port=CPM_PORT;
  if(isset($_SESSION["CPM_PORT"])){
    $cpm_port=$_SESSION["CPM_PORT"];
  }

  $socket->connect("tcp://".$cpm_host.":".$cpm_port);

  $dataframe = "";
  if(isset($data) && !empty($data)){
    $dataframe = "==DATA==".$data."==END_DATA==";
  }
  /* Send a request */
  $socket->send("==CMD==".$command."==END_CMD==".$dataframe);

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
      link.href = window.location.search.match( /print-pdf/gi ) ? '".BASE_URL."public/vendor/reveal.js-3.2.0/css/print/pdf.css' : '".BASE_URL."public/vendor/reveal.js-3.2.0/css/print/paper.css';
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

function readServerInfo(){
  $infos = array();
  if(file_exists(BASE_DIR."servers.info")){
    $content = file_get_contents(BASE_DIR."servers.info");
    $lines = split("\n", $content);
    $curinfo = NULL;
    foreach ($lines as $line) {
      $line = trim($line);
      if($line == "" || Utils::startsWith($line,"#")){
        continue;
      }
      $matches = array();
      $match = preg_match("/\[(.*?)\]/", $line,$matches);
      if($match){
        $infos[$matches[1]] = array();
        $curinfo = &$infos[$matches[1]];
      }else{
        $items = split(":",$line);
        if(count($items)<2){
          continue;
        }else{
          $curinfo[trim($items[0])] = trim(implode(":",array_slice($items,1)));
        }
      }

    }
    Logger::Log($infos);
    return $infos;
  }
}
