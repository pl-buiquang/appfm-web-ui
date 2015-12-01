<?php

class Cache{
  private static $cache = array();

  public static function set($cid,$value){
    $db = DB::getDB();
    $q = $db->query("SELECT value FROM copc_cache WHERE ckey LIKE '$cid'");
    if($q && $q->rowCount()){
      $st = $db->prepare("UPDATE copc_cache SET value = ? WHERE ckey = ?");
    }else{
      $st = $db->prepare("INSERT INTO copc_cache(`ckey`,`value`) VALUES(?,?)");
    }
    self::$cache[$cid] = $value;
    $value = serialize($value);
    $r = $st->execute(array($cid,$value));
  }

  public static function get($cid){
    if(isset(self::$cache[$cid])){
      return self::$cache[$cid];
    }else{
      $db = DB::getDB();
      $q = $db->query("SELECT value FROM copc_cache WHERE ckey LIKE '$cid'");
      $val = NULL;
      if($q && $q->rowCount()){
        $r = $q->fetch(PDO::FETCH_ASSOC);
        $val= $r['value'];
        $val= unserialize($val);
        self::$cache[$cid] = $val;
        return self::$cache[$cid];
      }
    }
    return NULL;
  }

  public static function clear($cid=NULL){
    if(isset($cid)){
      $db = DB::getDB();
      $q = $db->exec("DELETE FROM copc_cache WHERE ckey LIKE '$cid'");
    }else{
      $q = $db->exec("DELETE FROM copc_cache");
    }
  }
}