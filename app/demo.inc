<?php

Router::addRoutes(
  array(
    "demo"=>"demo_pap",
  )
);

function demo_pap($args){
  global $page;

  $page->addCSS('https://fonts.googleapis.com/css?family=Lato:400,400italic,700,700italic');


  $content = '<style>p{font-family: "Lato", sans-serif;}</style><p>Hello world!</p>';

  $html = tplset(array(
    "CONTENT" => $content.json_encode($args)
    ),tpl("specials/demo"));

  $page->addToBody($html);
}


function evalAnswer(){

}