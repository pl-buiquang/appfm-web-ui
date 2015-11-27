<?php

Router::addRoutes(
  array(
    //""=>"default_entry",
    "404"=>"default_404"
  )
);

function default_entry($args){
  global $page;

  $page->addJS(BASE_URL."public/js/cpm/build/cpmui.js");
  $page->addCSS(BASE_URL."public/js/cpm/build/style/style.css");

  $content = tpl("main");


  $page->addToBody($content);
}


function default_404($args){
  global $page;

  $content = "404";


  $page->addToBody($content);
}


function front_default_main_template($method,$args){
  global $page;

  //$page->addJS(BASE_URL."public/js/vendor/foundation/vendor/modernizr.js");
  $page->addCSS(BASE_URL."public/css/foundation.css");
  $page->addCSS(BASE_URL."public/css/jquery-ui.css");
  $page->addJS(BASE_URL."public/js/vendor/jquery-2.1.0.min.js");
  //$page->addJS(BASE_URL."public/js/vendor/bootstrap-3.1.1-dist/js/bootstrap.min.js");
  $page->addJS(BASE_URL."public/js/foundation.min.js");
  $page->addJS(BASE_URL."public/js/vendor/jquery-ui.min.js");

  

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



  $page->addToBody('<script>

      
        $(document).ready(function(){
          $(document).foundation();

        });
    </script>');

  $page->render();

}