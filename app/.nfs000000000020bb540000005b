<?php

Router::addRoutes(array(
  ""=>"cpm_main"
));

function cpm_main(){
  global $page;

  $page->addJS(BASE_URL."public/js/cpm/build/cpmui.js");
  $page->addCSS(BASE_URL."public/js/cpm/build/style/style.css");

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

  $page->addJS(BASE_URL."public/jcubic-jquery.terminal/js/jquery.terminal-0.8.8.min.js");
  $page->addJS(BASE_URL."public/jcubic-jquery.terminal/js/jquery.mousewheel-min.js");
  $page->addCSS(BASE_URL."public/jcubic-jquery.terminal/css/jquery.terminal.css");

  $page->addCSS(BASE_URL.'public/css/perfect-scrollbar/css/perfect-scrollbar.css');
  $page->addJS(BASE_URL.'public/js/vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.js');


  $html = tpl("main");


  $page->addToBody($html);

  $page->addToBody('

    <script>
    jQuery("#tool-panel").click(function(){
      jQuery(this).toggle();
    });


var canvas = new draw2d.Canvas("gfx_holder");
    var rect =  new draw2d.shape.basic.Rectangle();
       canvas.add(rect,100,10);
</script>');



}