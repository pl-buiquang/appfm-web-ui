<?php

/*

Tâche 1 :
POSITIF / NEGATIF

Tâche 2 :
SENTIMENT / OPINION / EMOTION

Tâche 3 :
19 classes (minus instruction)

to get non annotated xml : egrep -v "</?(G|R|source|osee|target).*" ORIGIN_FILE > EMPTY_FILE

*/

Router::addRoutes(
  array(
    "demo"=>"demo_pap",
    "demo/t1"=>"demo_pap_t1",
    "demo/t3"=>"demo_pap_t3"
  )
);


function demo_pap($args){
  global $page;

  $page->addCSS('https://fonts.googleapis.com/css?family=Lato:400,400italic,700,700italic');
  $page->addCSS(BASE_URL.'public/css/demo.css');


  
  $content = tplset(array("BASE_URL"=>BASE_URL),tpl("demo-pap/startmenu"));



  $html = tplset(array(
    "CONTENT" => $content
    ),tpl("demo-pap/demo"));

  $page->addToBody($html);
}


function demo_pap_t1(){
  global $page;

  $page->addCSS('https://fonts.googleapis.com/css?family=Lato:400,400italic,700,700italic');
  $page->addCSS(BASE_URL.'public/css/demo.css');


  $sentence_info = fetchSentence_t1();
  $form = createForm_t1($sentence_info["sid"]);
  $content = tplset(array(
    "SENTENCE" => $sentence_info["content"],
    "FORM" => $form->render()
    ),tpl("demo-pap/annotate.t1"));
  $content .= $form->handle();




  $html = tplset(array(
    "CONTENT" => $content
    ),tpl("demo-pap/demo"));

  $page->addToBody($html); 
}

function demo_pap_t3(){
  global $page;

  $page->addCSS('https://fonts.googleapis.com/css?family=Lato:400,400italic,700,700italic');
  $page->addCSS(BASE_URL.'public/css/demo.css');


  eval_t3();


  $html = "";
  /*$html = tplset(array(
    "CONTENT" => $content
    ),tpl("demo-pap/demo"));*/

  $page->addToBody($html); 
}


function evalAnswer(){

}

function getConf($name){
  include("demo.config.php");
  return $$name;
}

function readOneLineAt($lineindex,$file){
  $f = fopen($file, 'r');
  $lineNo = 0;
  $retLine = "";
  while ($line = fgets($f)) {
      if ($lineNo == $lineindex) {
          $retLine = $line;
          break;
      }
      $lineNo++;
  }
  fclose($f);
  return $retLine;
}


function fetchSentence_t1($multiple = false){
  $demo_home = getConf("demo_home");
  $tweetdir = $demo_home.getConf("tweet_dir");
  $refdir = $demo_home.getConf("ref_dir");

  $result_file = $refdir."/".getConf("ref_t1");

  $annotated_xml_dir = $demo_home.getConf("annotated_xml_dir");

  
  if($multiple){

  }else{
    $rand = rand(0,1);
    $class = "POSITIF_t1.txt";
    if($rand){
      $class = "NEGATIF_t1.txt";
    }  
    $count = shell_exec("wc -l ".$annotated_xml_dir."/".$class);
    $rand = rand(0,$count-1);
    $line = readOneLineAt($rand,$annotated_xml_dir."/".$class);
    $tweetfile = preg_replace("/(.*?)\s(.*)/", "$1", $line);
    return array("sid"=>str_replace(".txt", "", $tweetfile),"content"=>file_get_contents($tweetdir."/".$tweetfile));
  }

  return array("sid"=>0,"content"=>"Les jeux écologiques Bioviva, pour jouer écolo !");
}

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
  $form = new Form("sid");

  $callback = "eval_t1";
  $section = $form->addSection();

  $section->addElement("sid","","hidden",array("hidden"=>true),$sid);
  $section->addElement("valence","Valence : ","select",array("inline"=>true,"options"=>array("x"=>"","+"=>"Positif","-"=>"Negatif")));

  $section->addElement("submit","","submit",array("callback"=>$callback),"Soumettre",false,"button");
  return $form;
}


function eval_t3(){
  $demo_home = getConf("demo_home");
  $refdir = $demo_home.getConf("ref_dir");

  $res_file = $demo_home."xml/POSITIF.xml";
  shell_exec($demo_home.getConf("pastabin")." gui ".$res_file);
  return "ok";
}

function createForm_t3($sid){
  $form = new Form("sid");

  $callback = "eval_t3";
  $section = $form->addSection();

  $section->addElement("sid","","hidden",array("hidden"=>true),$sid);

  $section->addElement("submit","","submit",array("callback"=>$callback),"Annoter",false,"button");
  return $form;
}