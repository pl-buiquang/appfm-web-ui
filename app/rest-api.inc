<?php

Router::addRoutes(array(
  "rest"=>array("rest_template","rest"),
));

function rest_template($method,$args){
  call_user_func($method,$args);
  exit;
}

function rest($args){
  echo $args[0];
}