<?php

function message($message){
  return tplset(array("MID"=>rand(0,99),"BASE_URL"=>BASE_URL,"CONTENT"=>$message),tpl("message"));
}

class Table{
  private $rows;
  private $header = array();
  private $tablestyle = NULL;
  private $rowstyle1 = NULL;
  private $rowstyle2 = NULL;
  private $headerRowStyle = NULL;

  public function __construct($header,$rows=array(),$styles=array()){
    $this->header = $header;
    if(isset($styles["table"])){
      $this->tablestyle = $styles["table"];
    }
    if(isset($styles["row1"])){
      $this->rowstyle1 = $styles["row1"]; 
    }
    if(isset($styles["row2"])){
      $this->rowstyle2 = $styles["row2"];
    }
    if(isset($styles["header"])){
      $this->headerRowStyle = $styles["header"];
    }
    $this->rows = $rows;
  }

  public function addRow($values){
    $this->rows[] = $values;
  }

  private static function renderRow($row,$itemtype='td'){
    $html = "";
    foreach ($row as $field) {
      $html .= '<'.$itemtype;
      $val = $field;
      if(is_array($field)){
        if(isset($field["style"])){
          $html .= ' style="'.$field["style"].'"';
        }
        $val = $field["val"];
      }
      $html .= '>'.$val.'</'.$itemtype.'>';
    }
    return $html;
  }

  public function render(){
    $html = "<table";
    if(isset($this->tablestyle)){
      $html .= ' style="'.$this->tablestyle.'"';
    }
    $html.="><tr";
    if(isset($this->headerRowStyle)){
      $html .= ' style="'.$this->headerRowStyle.'"';
    }
    $html.=">";
    $html .= self::renderRow($this->header,'th');
    $html .= "</tr>";
    $parity = 0;
    foreach ($this->rows as $row) {
      $html.="<tr";
      $parity = !$parity;
      if(isset($this->rowstyle1) && isset($this->rowstyle2)){
        if($parity){
          $html .= ' style="'.$this->rowstyle1.'"';
        }else{
          $html .= ' style="'.$this->rowstyle2.'"';
        }
      }else if(isset($this->rowstyle1)){
        $html .= ' style="'.$this->rowstyle1.'"';
      }else if(isset($this->rowstyle2)){
        $html .= ' style="'.$this->rowstyle2.'"';
      }
      $html.=">";
      $html .= self::renderRow($row);
      $html .= "</tr>";
    }
    $html .= '</table>';
    return $html;
  }
}

class FormElement{
  public /*string*/ $default_value;
  private /*string*/ $title;
  public /*string*/ $name;
  public /*string*/ $type;
  public /*array*/ $values;
  private /*string*/ $classes;
  public /*bool*/ $required;

  public function __construct(&$formsection,$name,$title = "",$type ="",$values = array(),$default_value = NULL,$required = false,$classes = ""){
    $this->formsection = &$formsection;
    $name = toMachineName($name);
    if(FALSE === array_search($name,$formsection->form->formitemnames)){
      $formsection->form->formitemnames[]=$name;
      $this->name = $name;
    }else{
      throw new Exception("Error while creating form item, name already exist (".$name.")", 1);
    }
    $this->title = $title;
    $this->name = $name;
    $this->type = $type;
    $this->values = $values;
    $this->required = $required && $type !== "submit";
    $this->default_value = $default_value;
    $this->classes = $classes;
  }

  public function setDefaultValue($value){
    $this->default_value = $value;
  }

  public function render(){
    $rendered = '';
    $outertag = 'div';
    if($this->formsection->inline){
      $outertag = 'span';
    }
    $titletag = 'div';
    if(isset($this->values["inline"])){
      $titletag = 'span';
    }
    $required = '';
    if($this->required && $this->type != "submit"){
      $required = '<span style="margin-left:5px;color:red;">*</span>';
    }
    $rendered .= '<'.$outertag.'><'.$titletag.' class="form-item-title">'.$this->title.$required.'</'.$titletag.'>';
    

    $tag = '<div';
    $content = NULL;
    $params = '';
    $addons = '';
    if($this->type == "select"){
      $tag = 'select';
      $content = '';
      foreach ($this->values["options"] as $option_value => $option_title) {
        $content .= '<option ';
        if(isset($this->default_value) && $this->default_value == $option_value){
          $content .= 'selected ';
        }
        if(Utils::startsWith($option_value,'form-option-title')){
          $content .= ' style="background-color:#C02026;color:white;font-weight:bold;" disabled ';
        }
        $content .= ' value="'.$option_value.'">'.$option_title.'</option>';
      }
    }else if($this->type == "text" || $this->type == "password"){
      $tag = 'input';
      if(isset($this->values["date"])){
        $params = ' id="date-'.$this->formsection->form->name.'-'.$this->name.'"';
        $addons = ' <script>
  $(function() {
    $( "#date-'.$this->formsection->form->name.'-'.$this->name.'" ).datepicker();
    $( "#date-'.$this->formsection->form->name.'-'.$this->name.'" ).datepicker( "option", "dateFormat", "dd/mm/yy" ).datepicker(\'setDate\', "'.$this->default_value.'");
  });
  </script>';
      }
    }else if($this->type == "textarea"){
      $tag = 'textarea';
      if(isset($this->default_value)){
        $content = $this->default_value;
      }else{
        $content = "";
      }
      if(isset($this->values["ckeditor"])){
        $addons = '<script>
                CKEDITOR.replace( "editor-'.$this->formsection->form->name.'-'.$this->name.'" ,{
                  toolbarGroups: [
        {"name":"basicstyles","groups":["basicstyles"]},
        {"name":"links","groups":["links"]},
        {"name":"paragraph","groups":["list","blocks","indent","align"]},
        {"name":"insert","groups":["insert"]},
        {"name":"styles","groups":["styles"]},
        {"name":"colors"}
      ],
      // Remove the redundant buttons from toolbar groups defined above.
      removeButtons: "Styles"
                  });
            </script>';
        $params = ' id="editor-'.$this->formsection->form->name.'-'.$this->name.'"';
      }
    }else if($this->type == "checkbox"){
      $tag = 'input';
      if(isset($this->default_value)&& $this->default_value == "checked"){
        $params = " checked ";
      }
    }else if($this->type == "submit"){
      $tag = 'input';
      $params = ' action=""';
      if(isset($this->values["confirm"])){
        $params = ' id="submit-'.$this->formsection->form->name.'-'.$this->name.'"';
        $addons = ' <script>
  $(function() {
    $( "#submit-'.$this->formsection->form->name.'-'.$this->name.'" ).click(function(event){
      vw.cap.confirm(event,"'.$this->values["confirm"].'");
    });
  });
    
  </script>';
      }
    }else if($this->type == "ajax"){
      $tag = 'div';
    }else if($this->type == "hidden"){
      $tag = 'input';
    }else if($this->type == "file"){
      $tag = 'input';
    }else if($this->type == "custom"){
      return $this->values["html"];
    }

    $rendered .= '<'.$tag . ' type="'.$this->type.'" name="'.$this->formsection->form->name.'['.$this->name.']"' . $params ;
    if(isset($this->values["otherparams"])){
      $rendered .= ' '.$this->values["otherparams"];
    }
    if($this->classes){
      $rendered .= ' class="'.$this->classes.'"';
    }

    if(isset($this->default_value) && $this->type != "textarea"){
      $rendered .= ' value="'.$this->default_value.'"';
    }

    if(isset($content)){
      $rendered .= '>'.$content.'</'.$tag .'>';
    }else{
      $rendered .= '/>';
    }

    if(isset($addons)){
      $rendered .= $addons;
    }

    $rendered .= '</'.$outertag .'>';

    
    return $rendered;
  }

}

class FormSection{
  public $form;
  public $title;
  public $warpable;
  public $warped;
  private $items = array();

  public function __construct(&$form,$title="",$warpable=false,$warped=false,$inline=false){
    $this->form = &$form;
    $this->title = $title;
    $this->warpable = $warpable;
    $this->warped = $warped;
    $this->inline = $inline;
  }

  public function addElement($name,$title = "",$type ="",$values = array(),$default_value = NULL,$required = false,$classes = ""){
    $item = new FormElement($this,$name,$title,$type,$values,$default_value,$required,$classes);
    $this->items[] = $item;
    if($type == "submit" || $type == "ajax"){
      $this->form->callbacks[] = $item;
    }
    if($item->required){
      $this->form->requireditems[] = $item;
    }
  }

  public function getElements(){
    return $this->items;
  }
}

class Form{
  private static $forms = array();
  public $name;
  public $sections = array();
  public $callbacks = array();
  public $formitemnames = array();
  public $requireditems = array();
  public $dataobject = NULL; 
  public $enctype=NULL;

  public function __construct($name="default"){
    $name = toMachineName($name);
    if(FALSE === array_search($name,self::$forms)){
      self::$forms[]=$name;
      $this->name = $name;
    }else{
      throw new Exception("Error while creating form, name already exist (".$name.")", 1);
    }
  }

  public function setEncType($enctype){
    $this->enctype = $enctype;
  }

  public function &addSection($title="",$wrappable=false,$wrapped=false,$inline=false){
    $section = new FormSection($this,$title,$wrappable,$wrapped,$inline);
    $this->sections[] = $section;
    return $section;
  }


  public function render(){
    $id = ' id="form-'.$this->name.'"';
    $enctype = '';
    if(isset($this->enctype)){
      $enctype = ' enctype="'.$this->enctype.'"';
    }
    $rendered = '<form method="post" name="'.$this->name.'" action=""'.$id.$enctype.'>';
    foreach ($this->sections as $section) {
      if($section->title || $section->warpable || $section->warped){
        $rendered .= '<fieldset';
        if($section->warped){
            $rendered .= ' class="fieldset-wrapped"';
        }
        $rendered .='>';
        $rendered .= '<legend';
        if($section->warpable || $section->warped){
          $rendered .= ' class="form-wrappable" onClick="vw.cap.wrap(this);"';
        }
        $rendered .= '>';
        if($section->title){
          $rendered .=  $section->title;
        }
        if($section->warped){
          $rendered .= ' <div class="wrap-hint">(déplier)</div>';
        }else{
          $rendered .= ' <div class="wrap-hint"></div>';
        }
        $rendered .= '</legend><div';
        if($section->warped){
            $rendered .= ' class="form-wrapped"';
        }
        $rendered .='>';
      }else{
        $rendered .= '<div><div>';
      }
      $items = $section->getElements();
      foreach ($items as $item) {
        $rendered .= $item->render();
      }
      if($section->title || $section->warpable || $section->warped){
        $rendered .= '</div></fieldset>';
      }else{
        $rendered .= '</div></div>';
      }
    }
    $rendered .= ' 
    </form>';
    if(count($this->requireditems)>0){
      $rendered .= '<div style="float:right; font-size:0.7em;">Les champs marqués d\'un asterisque (<span style="color:red;">*</span>) sont obligatoires</div>';
    }
    return $rendered;
  }

  public function required($values=NULL){
    if(!isset($values)){
      $values = $_POST[$this->name];
    }
    foreach ($this->requireditems as $item) {
      if(!isset($values[$item->name])||empty($values[$item->name])){
        return false;
      }
    }
    return true;
  }

  public function hasChanged($fieldname,$newvalue){
    foreach ($this->sections as $section) {
      $items = $section->getElements();
      foreach ($items as $item) {
        if($item->name==$fieldname){
          $samestate = isset($item->default_value) == isset($newvalue);
          if(isset($item->default_value) && isset($newvalue)){
            $same = $item->default_value === $newvalue;
          }
          return !$samestate || !$same;
        }
      }
    }
  }

  public function setPostValues($values=NULL){
    if(!isset($values)){
      $values = $_POST[$this->name];
    }
    foreach ($this->sections as $section) {
      $items = $section->getElements();
      foreach ($items as $item) {
        if(isset($values[$item->name])){
          $item->setDefaultValue($values[$item->name]);
        }
      }
    }
  }

  // try to execute first callback 
  public function handle($usecallback=NULL){
    $result = NULL;
    if(isset($_POST[$this->name])){
      foreach ($this->callbacks as $submititem) {
        if(isset($_POST[$this->name][$submititem->name])){
          $fct = $submititem->values["callback"];
          if(is_callable($fct)){
            $result = $fct($this,$_POST[$this->name]);
          }else if(is_string($fct)){
            $result = call_user_func($fct,$this,$_POST[$this->name]);
          }
          return $result;
        }
        if(isset($submititem->values["ajax"]) && $submititem->values["ajax"]===TRUE){
          print $result;
          exit(0);
        }
      }
      if(isset($usecallback)){
        if(is_callable($usecallback)){
          $result = $usecallback($this,$_POST[$this->name]);
        }else if(is_string($usecallback)){
          $result = call_user_func($usecallback,$this,$_POST[$this->name]);
        }
        return $result;
      }
    }
    return $result;
  }
}



################################################
#               Templates                      #
################################################

function tpl($name){
  $templatedir = "templates/";
  if(file_exists($templatedir.$name.".tpl.php")){
    $template = file_get_contents($templatedir.$name.".tpl.php");
  }else if(file_exists($templatedir."ui/".$name.".tpl.php")){
    $template = file_get_contents($templatedir."ui/".$name.".tpl.php");
  }else{
    $template = "Error couldn't retrieve template ";
  }
  return $template;    
}

function tplset($replacements,$template){
  $newtemplate = $template;
  foreach ($replacements as $key => $value) {
    $newtemplate = tplset_item($key,$value,$newtemplate);
  }
  return $newtemplate;
}

function tplclean($instance,$templatename){
  $template = $instance;
  $keys = array();
  $count = 0;
  if(func_num_args()==2){
    $count = preg_match_all("/\[\[([A-Za-z0-9_\-]*?)\]\]/", tpl($templatename), $keys);
  }else if(func_num_args()==1){
    $count = preg_match_all("/\[\[([A-Za-z0-9_\-]*?)\]\]/", $template, $keys);
  }
  if($count){
    foreach ($keys[1] as $key) {
      $template = tplset_item($key,"",$template);
    }
  }
  return $template;
  
}

function tplset_item($varname,$content,$template){
  $newtemplate = preg_replace("/\[\[$varname\]\]/", $content, $template);
  if($newtemplate == NULL){
    Logger::Debug("error while setting element in template :".$template);
    return $template;
  }
  return $newtemplate;
}


