<?php

  class Utils{

    public static function validateMail($mail){
      return (!filter_var($mail, FILTER_VALIDATE_EMAIL) === false);
    }

    public static function setMessage($message){
      if(isset($_SESSION['message'])){
        $_SESSION['message'][] = $message;
      }else{
        $_SESSION['message'] = array($message);
      }
    }

    public static function consumeMessages(){
      if(isset($_SESSION['message'])){
        $messages = $_SESSION['message'];
        unset($_SESSION['message']);
        return $messages;
      }
      return NULL;
    }
    
    public static function toMachineName($name,$replacement="_"){
      $name = preg_replace("/[^A-Za-z0-9]/",$replacement, $name);
      return $name;
    }



    public static function setVal($name,$val){
      $_SESSION[$name] = $val;
    }

    public static function delVal($name){
      unset($_SESSION[$name]);
    }

    public static function getVal($name){
      if(isset($_SESSION[$name])){
        return $_SESSION[$name];
      }
      return NULL;
    }

    //fonction d'encodage en UTF-8
    public static function utf8_encode_safe($string)
    {
       //si ma chaîne n'est pas encodée
       if(!mb_detect_encoding($string, 'UTF-8', true))
       {
         //je la ré-encode et je la renvoie
         return utf8_encode($string);
       }
       //sinon si elle est déjà dans le bon format
       else
       {
         //je renvoie la même chose
         return $string;
       }
    }

    public static function rest_helper($url, $params = null, $verb = 'GET', $format = 'json')
    {
      $cparams = array(
        'http' => array(
          'method' => $verb,
          'ignore_errors' => true
        )
      );
      if ($params !== null) {
        $params = http_build_query($params);
        if ($verb == 'POST') {
          $cparams['http']['content'] = $params;
        } else {
          $url .= '?' . $params;
        }
      }

      $context = stream_context_create($cparams);
      $fp = fopen($url, 'rb', false, $context);
      if (!$fp) {
        $res = false;
      } else {
        // If you're trying to troubleshoot problems, try uncommenting the
        // next two lines; it will show you the HTTP response headers across
        // all the redirects:
        // $meta = stream_get_meta_data($fp);
        // var_dump($meta['wrapper_data']);
        $res = stream_get_contents($fp);
      }

      if ($res === false) {
        throw new Exception("$verb $url failed: $php_errormsg");
      }

      switch ($format) {
        case 'json':
          $r = json_decode($res,true);
          if ($r === null) {
            throw new Exception("failed to decode $res as json");
          }
          return $r;

        case 'xml':
          $r = simplexml_load_string($res);
          if ($r === null) {
            throw new Exception("failed to decode $res as xml");
          }
          return $r;
      }
      return $res;
    }



    public static function startsWith($haystack, $needle)
    {
      return $needle === "" || strpos($haystack, $needle) === 0;
    }

    public static function endsWith($haystack, $needle)
    {
      return $needle === "" || substr($haystack, -strlen($needle)) === $needle;
    }

    public static function fetchModules($path){
      foreach (glob("$path/*") as $file){
        $fileinfo = Utils::fileExtensionInfo($file);
        if($fileinfo["extension"]=="inc"){
          require_once $file;
        }
      }
    }

    public static function fileExtensionInfo($name){
      $parts = explode(".",$name);
      $extension = "";
      if(count($parts)>1){
        $extension = array_pop($parts);
      }
      return array("name"=>implode(".",$parts),"extension"=>$extension);
    }



  }



class Logger {

  public static function Debug($message){
    if(!defined("DEBUG") || DEBUG!==TRUE){
      return;
    }
    Logger::Log($message,"DEBUG");
  }

  public static function Log($message,$title = ''){
    $remoteAddr = isset($_SERVER['REMOTE_ADDR'])?$_SERVER['REMOTE_ADDR']:'local';
    $remoteAddrProxy = isset($_SERVER['HTTP_X_FORWARDED_FOR'])?$_SERVER['HTTP_X_FORWARDED_FOR']:'';
    $user = "(".$remoteAddr."|".$remoteAddrProxy.") ";
    
    $path = BASE_DIR.LOG_HOME_PATH;
    $myFile = $path . "custom.log";
    $fh = fopen($myFile, 'a') or die("can't open file ".$myFile);
    $date_array = getdate();
    $time = "[" . $date_array['mday'] . "/" . $date_array['mon'] . "/" . $date_array['year'] . " - " . $date_array['hours'] . ":" . $date_array['minutes'] . ":" . $date_array['seconds'] . "]";
    if(!is_string($message)){
      $message = var_export($message,true);
    }
    fwrite($fh, $time . " " . $user . $title . ' => ' . $message);
    fwrite($fh, "\n");
    fclose($fh);
    if(filesize($myFile)>20000000){
      Logger::rotate();
    }
  }

  public static function rotate(){
    $path = BASE_DIR.LOG_HOME_PATH;
    $myFile = $path . "custom.log";
    $i = 1;
    $newlog = $path."custom.log.".$i;
    while(file_exists($newlog)){
      $i++;
    }
    for($j=($i-1);$j>=1;$j--){
      if(file_exists($path."custom.log.".$j)){
        rename($path."custom.log.".$j,$path."custom.log.".($j+1));
      }
    }
    rename($myFile,$path."custom.log.1");
  }

  public static function SaveFile($data,$filename){
    $path = BASE_DIR.LOG_HOME_PATH;
    $myFile = $path . $filename;
    $fh = fopen($myFile, 'a') or die("can't open file");
    if(!is_string($data)){
      $data = var_export($data,true);
    }
    fwrite($fh, $data);
    fwrite($fh, "\n");
    fclose($fh);
    return $myFile;
  }
}
