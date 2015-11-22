<?php

Router::addRoutes(array(
  ""=>"cpm_main"
));

function cpm_main(){
  global $page;

  $html = shell_exec("cpm module ls");

  $html = str_replace("\n", "<br>", $html);

  $page->addToBody($html);



}