<?php 
  session_start();
  require_once("lib/loader.inc");
  
  Utils::fetchModules("app");
  

  
  global $page;
  $page = new PageBuilder();

  Router::dispach();
  Logger::Log(Router::getRoute());
  

?>
