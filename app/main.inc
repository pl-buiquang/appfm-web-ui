<?php


global $context;

$context = new ZMQContext();

Router::addRoutes(array(
  ""=>"cpm_main",
  "test"=>"cpm_test",
  "rest/cmd"=>"cmdexec",
  "rest/file"=>"fetchfile"
));

function cpm_main(){
  global $page;

  //$page->addJS(BASE_URL."public/js/vendor/bootstrap-3.1.1-dist/js/bootstrap.min.js");
  //$page->addJS(BASE_URL."public/js/foundation.min.js");

  $page->addCSS(BASE_URL."public/css/jquery-ui.css");
  $page->addJS(BASE_URL."public/js/vendor/jquery-2.1.0.min.js");
  $page->addJS(BASE_URL."public/js/vendor/jquery-ui.min.js");


  $page->addJS(BASE_URL."public/js/vendor/underscore-min.js");
  $page->addJS(BASE_URL."public/js/vendor/backbone-min.js");

  $page->addJS(BASE_URL."public/js/vendor/store.min.js");

  $page->addJS(BASE_URL."public/js/cpm/build/cpmui.js");
  $page->addCSS(BASE_URL."public/js/cpm/build/style/style.css");

  $page->addCSS(BASE_URL."public/css/app.css");

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


  $html = tplset(array(
    "BASE_URL"=>BASE_URL
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
     $events = $poll->poll($readable, $writable, 20000);
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
  Logger::Log($message);
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

function fetchfile(){
  if(isset($_POST)){
    // TODO !!! Limit file access !!!
    $content = file_get_contents($_POST['file']);
    Logger::Log($_POST['file']);
    Logger::Log($content);
    echo $content;
    exit();
  }
  echo "";
  exit();
}
