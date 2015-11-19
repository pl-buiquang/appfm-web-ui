<?php

function eval_t1($form,&$values){
  $demo_home = getConf("demo_home");
  $refdir = $demo_home.getConf("ref_dir");

  $res_content = $values['sid']."\t".$values["valence"];
  $res_file = "/tmp/foo";
  file_put_contents($res_file,$res_content);
  $ref_content = shell_exec($demo_home.getConf("extractrefbin")." ".$res_file." ".$refdir."/".getConf("ref_t1"));
  $ref_file = "/tmp/bar";
  file_put_contents($ref_file,$ref_content);
  return shell_exec($demo_home.getConf("eval1_2")." -s ".$res_file." -g ".$ref_file);
}



function createForm_t1($sid){
  $form = new Form($sid);

  $callback = "eval_t1";
  $section = $form->addSection();

  $section->addElement("sid","","hidden",array("hidden"=>true),$sid);
  $section->addElement("valence","Valence : ","select",array("inline"=>true,"options"=>array("x"=>"","+"=>"Positif","-"=>"Negatif")));

  $section->addElement("submit","","submit",array("callback"=>$callback),"Soumettre",false,"button");
  return $form;
}

function fetchSentence_t1($multiple = false){
  $demo_home = getConf("demo_home");
  $sourcerelativedir = getConf("exemplesdir");

  $sourcesfiles = array(
    "POSITIF.xml",
    "NEGATIF.xml");
  
  if($multiple){

  }else{
    $rand = rand(0,1);

    $filesource = $demo_home.$sourcerelativedir."/empty_".$sourcesfiles[$rand];
    $fileinfo = $demo_home.$sourcerelativedir."/info_".$sourcesfiles[$rand];

    $count = shell_exec("wc -l ".$fileinfo);
    $rand = rand(0,$count-1);
    $id = readOneLineAt($rand,$fileinfo);
    $id = trim($id);
    $content = shell_exec(getConf("extractsentences")." $filesource $id");
    return array("sid"=>str_replace(".txt", "", $id),"content"=>$content);
  }

  return array("sid"=>0,"content"=>"Les jeux écologiques Bioviva, pour jouer écolo !");
}


function eval_t2($form,&$values){
  $demo_home = getConf("demo_home");
  $refdir = $demo_home.getConf("ref_dir");

  global $sourcescat;

  $type = ($values["valence"])?$sourcescat[$values["valence"]-1]:"undefined";

  $res_content = $values['sid']."\t".$type;
  $res_file = "/tmp/foo";
  file_put_contents($res_file,$res_content);
  $ref_content = shell_exec($demo_home.getConf("extractrefbin")." ".$res_file." ".$refdir."/".getConf("ref_t2"));
  $ref_file = "/tmp/bar";
  file_put_contents($ref_file,$ref_content);
  return shell_exec($demo_home.getConf("eval1_2")." -s ".$res_file." -g ".$ref_file);
}

function createForm_t2($sid,$sentence){
  global $sourcescat;

  $cat = array_merge(array(""),$sourcescat);

  $form = new Form($sid);

  $callback = "eval_t2";
  $section = $form->addSection("",false,false,true);

  $section->addElement("sid","","hidden",array("hidden"=>true),$sid);
  $section->addElement("title","","custom",array("inline"=>true,"html"=>'<h2>Item N°1</h2>'));
  $section->addElement("sentence","","custom",array("inline"=>true,"html"=>'<div class="panel" style="display:inline-block; width:800px;">'.$sentence.'</div>'));
  $section->addElement("valence","","select",array("inline"=>true,"options"=>$cat,"otherparams"=>'style="margin-left:50px; max-width:100px;"'));

  $section->addElement("submit","","submit",array("callback"=>$callback,"otherparams"=>'style="margin-left:40%;"'),"Soumettre",false,"button");
  return $form;
}

function fetchSentence_t2($multiple = false){
  $demo_home = getConf("demo_home");
  $sourcerelativedir = getConf("exemplesdir");

  $annotated_xml_dir = $demo_home.getConf("annotated_xml_dir");

  global $sourcescat;

  global $sourcesfiles;

  
  if($multiple){

  }else{
    $randcat = rand(0,3);
    $catsource = $sourcescat[$randcat];
    $randfile = rand(0,count($catsource)-1);
    $filesource = $demo_home.$sourcerelativedir."/empty_".$sourcesfiles[$randcat][$randfile];
    $fileinfo = $demo_home.$sourcerelativedir."/info_".$sourcesfiles[$randcat][$randfile];

    $count = shell_exec("wc -l $fileinfo");
    $rand = rand(0,$count-1);
    $id = readOneLineAt($rand,$fileinfo);
    $id = trim($id);
    $content = shell_exec(getConf("extractsentences")." $filesource $id");
    return array("sid"=>str_replace(".txt", "", $id),"content"=>$content);
  }

}