<?php



class DB{
  private static $instance;

  public $pdo = NULL;

  private function __construct(){
    $this->pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PWD);
    // add error handling here
  }

  public static function getDB(){
    if(!isset(self::$instance)){
      self::$instance = new DB();
    }
    return self::$instance->pdo;
  }

  public static function getObjectById($id,$table){
    if(filter_var($id, FILTER_VALIDATE_INT) !== FALSE){
      $db = DB::getDB();

      $req = "SELECT *
                 FROM $table
                 WHERE id = '$id'";
      $st = $db->query($req);
      if($st){
        return $st->fetch(PDO::FETCH_ASSOC);
      }
    }
    return NULL;
  }

  public static function getObjectField($id,$table,$field){
    if(filter_var($id, FILTER_VALIDATE_INT) !== FALSE){
      $db = DB::getDB();

      $req = "SELECT $field
                         FROM $table
                         WHERE id = '$id'";
      $st = $db->query($req);
      if($st){
        $r = $st->fetch(PDO::FETCH_ASSOC);
        if(isset($r[$field])){
          return $r[$field];
        }
      }
    }
    return NULL;
  }

}

interface IDBObject{
  static function tablename();
  static function fields();
  static function form_handle_preprocess(&$form,&$values,$creation);
  static function form_handle_success($form,$values,$creation);
}

abstract class DBObject implements IDBObject{
  protected $vals = array();
  protected $id = NULL;
  protected $lazy;
  private $objectclass = NULL;

  public function __construct($id=NULL,$lazy=false){
    $this->objectclass = $class =get_called_class();
    $this->lazy = $lazy;
    if(isset($id)){
      $this->id = $id;
      if(!$lazy){
        $this->vals = DB::getObjectById($id,$class::tablename());
        if(!isset($this->vals) || $this->vals === FALSE){
          $this->id = NULL;
          $this->vals = array();
        }
      }else{
        $idexist = DB::getObjectField($id,$class::tablename(),'id');
        if(!isset($idexist) || $idexist === FALSE){
          $this->id = NULL;
        }
      }
    }
  }

  public function __get($name){
    $class = $this->objectclass;
    if(isset($this->vals[$name])){
      return $this->vals[$name];
    }elseif(isset($this->id) && $this->lazy){
      $this->vals[$name] = DB::getObjectField($this->id,$class::tablename(),$name);
      return $this->vals[$name];
    }
    return NULL;
  }

  public function __set($name,$val){
    $this->vals[$name]=$val;
  }

  public function existInDB(){
    return isset($this->id);
  }


  public function validate(){
    $config = HTMLPurifier_Config::createDefault();
    $purifier = new HTMLPurifier($config);
    $class = $this->objectclass;
    $fields = $class::fields();
    foreach ($fields as $field => $options) {
      if(isset($values[$field])){
        // prevent some xss attack
        $values[$field] = $purifier->purify($values[$field]);
        if(isset($options['validate'])){
          $test = call_user_func($options['validate'],$values[$field]);
          if(!$test){
            return false;
          }
        }
      }
    }
    return true;
  }

  public function setValues($values){
    $class = $this->objectclass;
    $fields = $class::fields();
    foreach ($fields as $field => $options) {
      if(isset($values[$field])){
        if(isset($options['preprocess'])){
          $this->vals[$field] = call_user_func($options['preprocess'],$values[$field]);
        }else{
          $this->vals[$field] = encoder($values[$field]);
        }
      }
    }
  }

  public function delete(){
    if(isset($this->id)){
      $class = $this->objectclass;
      $table = $class::tablename();
      $id = $this->id;
      $db = DB::getDB();
      $n = $db->exec("DELETE FROM $table
                    WHERE id = '$id'");
      if($n == 1){
        unset($this->id);
        return true;
      }
    }
    return false;
  }

  public function save(){
    $class = $this->objectclass;
    if(isset($this->id)){
      $updatevals = array();
      $fields = $class::fields();
      $updatefields = "";
      foreach ($fields as $field => $options) {
        if(isset($this->vals[$field])){
          $updatefields .= $field." = :".$field.",";
          $updatevals[":".$field] = $this->vals[$field];
        }
        if($field == "modification_date"){
          $creationvalnames .= ":".$field.",";
          $creationvals[":".$field] = date("Y-m-d H:i:s");
          $creationfields .= $field.",";
        }
      }
      $updatefields = trim($updatefields,",");
      $updatevals[":id"] = $this->id;

      $table = $class::tablename();
      $req = "UPDATE $table SET $updatefields WHERE id = :id";
      $db = DB::getDB();               
      $que = $db->prepare($req);
      $r = $que->execute($updatevals);
      return $r;
    }else{
      $creationvals = array();
      $fields = $class::fields();
      $creationfields = "";
      $creationvalnames = "";
      foreach ($fields as $field => $options) {
        if(isset($this->vals[$field])){
          $creationvalnames .= ":".$field.",";
          $creationvals[":".$field] = $this->vals[$field];
          $creationfields .= $field.",";
        }
        if($field == "creation_date"){
          $creationvalnames .= ":".$field.",";
          $creationvals[":".$field] = date("Y-m-d H:i:s");
          $creationfields .= $field.",";
        }
        if($field == "modification_date"){
          $creationvalnames .= ":".$field.",";
          $creationvals[":".$field] = date("Y-m-d H:i:s");
          $creationfields .= $field.",";
        }
      }
      $creationfields = trim($creationfields,",");
      $creationvalnames = trim($creationvalnames,",");

      $table = $class::tablename();
      $req = "INSERT INTO $table ($creationfields)
                      VALUES($creationvalnames)";
      $db = DB::getDB();               
      $que = $db->prepare($req);
      $r = $que->execute($creationvals);
      if($r){
        $this->id = $db->lastInsertId();
      }
      return $r;
    }
  }

  public function toJSON(){
    return json_encode($this->vals);
  }
}

function default_form_handle($form,$values){
  $obj = $form->dataobject;
  $class = get_class($obj);
  $creation = !$obj->existInDB();
  if(!isAdmin() && !$creation){
    setMessage("Vous n'avez pas les droits requis pour modifier cet élément.");
    Router::redirect();
  }
  if($form->required()){
    $class::form_handle_preprocess($form,$values,$creation);
    $obj->setValues($values);
    if($obj->validate()){
      $r = $obj->save();
      if($r){
        $class::form_handle_success($form,$values,$creation);
        return;
      }        
    }
    $form->setPostValues();
    return message("Enregistrement non effectué. Le formulaire contient des informations non valides");
  }else{
    $form->setPostValues();
    return message("Enregistrement non effectué. Tous les champs requis ne sont pas renseignés.");
  }
}