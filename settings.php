<?php

define("DEBUG",true);
define("LOG_HOME_PATH",'log/');
define("PAGE_MAIN_TEMPLATE" ,"templates/html.tpl.php");
define("TITLE","CPM");
#define("APP_HOME_ROUTE_FIX","/cpm");
define("APP_HOME_ROUTE_FIX","");
define("BASE_DIR","/vagrant/web/");
#define("BASE_DIR","/var/www/cpm/");
$hostname = "http://localhost:8080/";
#$hostname = "http://localhost";
if(!empty($_SERVER["HTTP_HOST"])){
  $hostname = $_SERVER['REQUEST_SCHEME']."://".$_SERVER["HTTP_HOST"].APP_HOME_ROUTE_FIX."/";
}

define("BASE_URL",$hostname);
define("CALLER_DEFAULT_MAIN_TEMPLATE",'front_default_main_template');


define("CPM_HOST","localhost");
define("CPM_PORT","5555");
/*
define("CPM_HOST","10.0.2.2");
define("CPM_PORT","5556");
*/
