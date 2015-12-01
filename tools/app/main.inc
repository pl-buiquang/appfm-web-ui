<?php


global $context;

$context = new ZMQContext();

Router::addRoutes(array(
  ""=>"cpm_main",
  "test"=>"cpm_test"
));

function cpm_main(){
  global $page;

  $html = shell_exec("cpm module ls");

  $html = str_replace("\n", "<br>", $html);


  

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