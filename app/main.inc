<?php


global $context;

$context = new ZMQContext();

Router::addRoutes(array(
  ""=>"cpm_main",
  "test"=>"cpm_test",
  "rest/cmd"=>"cmdexec"
));

function cpm_main(){
  global $page;

  $page->addJS(BASE_URL."public/js/cpm/build/cpmui.js");
  $page->addCSS(BASE_URL."public/js/cpm/build/style/style.css");

  $page->addJS(BASE_URL."public/draw2d/prod/lib/jquery.autoresize.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/jquery-touch_punch.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/jquery.contextmenu.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/shifty.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/raphael.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/rgbcolor.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/canvg.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/Class.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/json2.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/pathfinding-browser.min.js");
  $page->addJS(BASE_URL."public/draw2d/prod/src/draw2d.js");

  $page->addJS(BASE_URL."public/jcubic-jquery.terminal/js/jquery.terminal-0.8.8.min.js");
  $page->addJS(BASE_URL."public/jcubic-jquery.terminal/js/jquery.mousewheel-min.js");
  $page->addCSS(BASE_URL."public/jcubic-jquery.terminal/css/jquery.terminal.css");

  $page->addCSS(BASE_URL.'public/css/perfect-scrollbar/css/perfect-scrollbar.css');
  $page->addJS(BASE_URL.'public/js/vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.js');


  $html = tplset(array(
    "BASE_URL"=>BASE_URL
    ),tpl("main"));



  

  $page->addToBody($html);




}


function cpm_test(){
  global $page;

  $page->addJS(BASE_URL."public/draw2d/prod/lib/jquery.autoresize.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/jquery-touch_punch.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/jquery.contextmenu.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/shifty.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/raphael.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/rgbcolor.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/canvg.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/Class.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/json2.js");
  $page->addJS(BASE_URL."public/draw2d/prod/lib/pathfinding-browser.min.js");
  $page->addJS(BASE_URL."public/draw2d/prod/src/draw2d.js");


  $debug = "";//foo();



  Logger::Log(json_decode($debug));

  $debug = json_encode(json_decode($debug),JSON_PRETTY_PRINT);

  $debug = str_replace("\n", "<br>", $debug);
  $debug = str_replace(" ", "&nbsp;", $debug);

  $html = tplset(array(
    "DEBUG"=>$debug,
    ),tpl("test"));

  $page->addToBody($html);



}

function cmdexec(){
  if(isset($_POST)){
    global $context;

    $socket = $context->getSocket(ZMQ::SOCKET_REQ,'default');

    $socket->connect("tcp://192.168.1.27:5555");

    /* Send a request */
    $socket->send("==CMD==".$_POST['cmd']."==END_CMD==");

    /* Receive back the response */
    $message = $socket->recv();

    echo $message;
    exit();
  }
  echo "";
  exit();
}


function foo(){
  global $context;

  $socket = $context->getSocket(ZMQ::SOCKET_REQ,'default');

  $socket->connect("tcp://localhost:5555");

  /* Send a request */
  $socket->send("==CMD==module ls --json==END_CMD==");

  /* Receive back the response */
  $message = $socket->recv();

  return $message;
}