<?php

Router::addRoutes(
  array(
    //""=>"default_entry",
    "404"=>"default_404"
  )
);


function default_404($args){
  global $page;

  $content = "404";


  $page->addToBody($content);
}


function front_default_main_template($method,$args){
  global $page;

  
  

  $messages = Utils::consumeMessages();
  if(isset($messages)){
    $message = '';
    foreach ($messages as $item) {
      $message .= message($item);
    }
    
  }else{
    $message = '';
  }
  $page->addToBody($message);

  call_user_func($method,$args);



  

  $page->render();

}