<?php

class Router{

  private static $route = null;
  private static $routes = array();
  
  public static function getRoute(){
    if(!isset(Router::$route)){
      $requestUri = $_SERVER['REQUEST_URI'];
      $requestArgs = explode("/",$requestUri);
      $path = array();
      for($i=0;$i<count($requestArgs);$i++){
        if(isset($requestArgs[$i]) && !empty($requestArgs[$i])){
          $pathPart = $requestArgs[$i];
          $pathParts = explode("?", $pathPart);
          if(!empty($pathParts[0]) && $pathParts[0]!=APP_HOME_ROUTE_FIX){
            $path[] = $pathParts[0];
          }
        }
      }
      
      Router::$route = trim(implode("/", $path));
    }
    return Router::$route;
  }
  
  public static function dispach(){
    $path = Router::getRoute();
    Logger::Log($path);
    $l = 0;
    $callback = null;
    $restofpath = "";
    foreach(Router::$routes as $route => $method){
      if($route == $path){
        if(is_array($method)){
          // @todo could be transformed in recursive calluserfunc chain with proper interfaces
          call_user_func($method[0],$method[1],NULL);
        }else{
          call_user_func(CALLER_DEFAULT_MAIN_TEMPLATE,$method,NULL);
        }
        return;
      }else if($path !== "" 
        && $route !== "" 
        && strpos($path, $route) === 0 
        && (strlen($route) == strlen($path) || strpos(substr($path, strlen($route)),"/")===0)
        ){
        if($l<strlen($route)){
          $callback = $method;
          $l = strlen($route);
          $restofpath = substr($path, strlen($route));
        }
      }
    }
    if($callback!=null){
      if(strpos($restofpath, "/")===0 && strlen($restofpath)>1){
        $restofpath = substr($restofpath, 1);
      }
      $args = explode("/", $restofpath);
      if(is_array($callback)){
        call_user_func($callback[0],$callback[1],$args);
      }else{
        call_user_func(CALLER_DEFAULT_MAIN_TEMPLATE,$callback,$args);
      }
      return;
    }

    if(isset(Router::$routes["404"])){
      if(is_array(Router::$routes["404"])){
        call_user_func(Router::$routes["404"][0],Router::$routes["404"][1],NULL);
      }else{
        call_user_func(CALLER_DEFAULT_MAIN_TEMPLATE,Router::$routes["404"],NULL);
      }
    }
  }

  public static function redirect($path=NULL){
    if(!isset($path)){
      $path = Router::getRoute();
    }
    header("HTTP/1.1 303 See Other");
    header("Location:".BASE_URL.$path);
    exit(0);
  }
  
  public static function addRoutes($routes){
    foreach($routes as $path=>$method){
      Router::$routes[$path]=$method;
    }
  }


  
}

function core_default_main_template($method,$args){

  $returnvalue = call_user_func($method,$args);
  echo $returnvalue;
  exit(0);


}