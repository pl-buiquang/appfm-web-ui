<?php

class PageBuilder{
  
  private $html = null;
  private $js = array();
  private $jscode = array();
  private $headerExtras = array();
  private $css = array();
  private $body = array();
  private $title = TITLE;
  public static $seoset = false;
  
  
  public function __construct(){
    $this->html = file_get_contents(PAGE_MAIN_TEMPLATE);
  }
  
  public function addJS($js){
    if(false === array_search($js, $this->js)){
      $this->js[] = $js;
    }
  }

  public function addJScode($js){
    if(false === array_search($js, $this->js)){
      $this->jscode[] = $js;
    }
  }

  public function addToHeader($code){
    $this->headerExtras[] = $code;
  }
  
  public function addCSS($css){
    if(false === array_search($css, $this->css)){
      $this->css[] = $css;
    }
  }
  
  public function addToBody($html){
    $this->body[] = $html;
  }


  public function setSEOHeaders($pageinfos){
    // default html meta
    if(isset($pageinfos['title'])){
      $this->setTitle($pageinfos['title']);
    }
    if(isset($pageinfos['keywords'])){
      $this->addToHeader('<meta name="keywords" content="'.implode($pageinfos['keywords']).'"/>');
    }
    if(isset($pageinfos['description'])){
      $this->addToHeader('<meta name="description" content="'.$pageinfos['description'].'"/>');
    }
    if(isset($pageinfos['private'])){
      $this->addToHeader('<meta name="robots" content="noindex,nofollow"/>');
    }else{
      $this->addToHeader('<meta name="robots" content="index,follow"/>');
    }
    // fb meta
    if(isset($pageinfos['title'])){
      $this->addToHeader('<meta property="og:title" content="'.$pageinfos['title'].'"/>');
    }
    if(isset($pageinfos['image'])){
      $this->addToHeader('<meta property="og:image" content="'.$pageinfos['image'].'"/>');
    }
    if(isset($pageinfos['url'])){
      $this->addToHeader('<meta property="og:url" content="'.$pageinfos['url'].'"/>');
    }
    if(isset($pageinfos['description'])){
      $this->addToHeader('<meta property="og:description" content="'.$pageinfos['description'].'"/>');
    }
    if(isset($pageinfos['site_name'])){
      $this->addToHeader('<meta property="og:site_name" content="'.$pageinfos['site_name'].'"/>');
    }
    if(isset($pageinfos['app_id'])){
      $this->addToHeader('<meta property="fb:app_id" content="'.$pageinfos['app_id'].'"/>');
    }
    if(isset($pageinfos['locale'])){
      $this->addToHeader('<meta property="og:locale" content="'.$pageinfos['locale'].'"/>');
    }
    if(isset($pageinfos['type'])){
      $this->addToHeader('<meta property="og:type" content="'.$pageinfos['type'].'"/>');
    }
    PageBuilder::$seoset = true;
  } 
  
  public function renderBody(){
    $html = "";
    foreach($this->body as $elt){
      $html.=$elt;
    }
    return $html;
  }
  
  public function setTitle($title){
    $this->title = $title;
  }
  
  public function renderHeader(){
    $html = "";
    $html.= "<title>".$this->title."</title>\n";
    foreach($this->js as $js){
      $html .= "<script src=\"".$js."\"></script>\n";
    }
    $html .= "<script>";
    foreach($this->jscode as $js){
      $html .= $js;
    }
    $html .= "</script>\n";
    foreach($this->css as $css){
      $html .= "<link rel=\"stylesheet\" type=\"text/css\" href=\"".$css."\">\n";
    }
    foreach($this->headerExtras as $js){
      $html .= $js;
    }
    return $html;
  }
  
  public function render(){
    $html = preg_replace("/\[\[HEAD\]\]/", $this->renderHeader(), $this->html);
    $html = preg_replace("/\[\[BODY\]\]/", $this->renderBody(), $html);
    echo $html;
  }
}