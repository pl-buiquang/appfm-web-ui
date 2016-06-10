<?php

Router::addRoutes(array(
  "rest"=>array("rest_template","rest"),
  "file"=>array("rest_template","getFile")
));

function rest_template($method,$args){
  call_user_func($method,$args);
  exit;
}

function rest($args){
  echo $args[0];
}

function getFile($args){
  if(isset($_POST) && isset($_POST['file'])){
    $file = $_POST['file'];
    $filecontent = cpm_command_call("fs get ".$file);
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename($file));
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header('Content-Length: ' . mb_strlen($filecontent));
    ob_clean();
    flush();
    echo $filecontent;
    exit;
  }
}