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
    "demo/rest/difft3"=>"pasta_diff_results",
    "demo/rest/annotatedres"=>"pasta_annotated_res"
  )
);


function demo_pap($args){
  global $page;

  $page->addCSS('https://fonts.googleapis.com/css?family=Lato:400,400italic,700,700italic');
  $page->addCSS(BASE_URL.'public/css/demo.css');
  $page->addCSS(BASE_URL.'public/css/perfect-scrollbar/css/perfect-scrollbar.css');
  $page->addJS(BASE_URL.'public/js/vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.js');

  $content = tplset(array("BASE_URL"=>BASE_URL),tpl("demo-pap/startmenu"));  
  if(isset($args) && count($args)>=1){
    if($args[0]=="t1" || $args[0]=="t2"){
      $content = demo_pap_t1_2(array_shift($args),$args);
    }elseif($args[0]=="t3"){
      array_shift($args);
      $content = demo_pap_t3($args);
    }elseif($args[0] == "sample" && count($args)>=2){
      demo_sample($args[1]);
      Router::redirect("demo");
    }
  }else{
    $content = tplset(array("BASE_URL"=>BASE_URL),tpl("demo-pap/startmenu"));  
  }
  
  $presetexamples = getConf("presetexamples");
  $samples= "";
  foreach($presetexamples as $id => $name){
    $samples .= '<li><a href="'.BASE_URL.'demo/sample/'.$id.'">'.$name.'</a></li>';
  }
  

  $html = tplset(array(
    "BASE_URL"=>BASE_URL,
    "EXEMPLES"=>$samples,
    "CONTENT" => $content
    ),tpl("demo-pap/demo"));

  $page->addToBody($html);

  $page->addToBody('<script>
        $(document).ready(function(){
          $(document).foundation({
          });
        });
    </script>');
}


function demo_pap_t1_2($task,$args){
  $sourcescat = array(
    "POSITIF",
    "NEGATIF", 
    );

  $sourcesfiles = array(
    array(
      "POSITIF.xml",
      ),
    array(
      "NEGATIF.xml",
      ),
    );

  if($task == "t2"){
    $sourcescat = array(
      "EMOTION",
      "SENTIMENT", 
      "INFORMATION", 
      "OPINION"
      );

    $sourcesfiles = array(
      array(
        "AMOUR.xml",
        "APAISEMENT.xml",
        "COLERE.xml",
        "DEPLAISIR.xml",
        "DERANGEMENT.xml",
        "ENNUI.xml",
        "PEUR.xml",
        "PLAISIR.xml",
        "MEPRIS.xml",
        "SURPRISE_NEGATIVE.xml",
        "SURPRISE_POSITIVE.xml",
        "TRISTESSE.xml",
        ),
      array(
        "INSATISFACTION.xml",
        "SATISFACTION.xml"
        ),
      array(
        "INFORMATION.xml",
        ),
      array(
        "ACCORD.xml",
        "DESACCORD.xml",
        "DEVALORISATION.xml",
        "VALORISATION.xml"
        )
      );
  }
  
  $content = "";
  $result = "";
  $more="";
  $prevresult = NULL;
    Logger::Log($_SESSION);
    Logger::Log($_POST);

  if(isset($_SESSION['prevform'])){
    $prevform = init_t1_2($_SESSION['prevform'],$sourcescat,true);
    $prevresult = $prevform->handle();
  }

  if(isset($prevresult)){
    $prevform->setPostValues();
    $content = $prevform->render();
    $result = renderResult1_2($prevresult);
    $more = '<button id="compare-result" type="button" class="button" style="margin-left:40%;">Voir les annotations complètes</button>
  <script>
    jQuery("#compare-result").click(function(){
      jQuery.ajax({
        type: "POST",
        data : '.json_encode($_SESSION['prevform']).',
        url: "'.BASE_URL.'demo/rest/annotatedres",
        dataType : "json",
        success: function(data, textStatus, jqXHR) {
          console.log(data);
        }
      });
    });
  </script>
  ';
    unset($_SESSION['prevform']);
    $_SESSION['prevresult'] = array("content"=>$content,"result"=>$result,"more"=>$more);
    Router::redirect();
  }elseif(isset($_SESSION['prevresult'])){
    $content = $_SESSION['prevresult']['content'];
    $result = $_SESSION['prevresult']['result'];
    $more = $_SESSION['prevresult']['more'];
    unset($_SESSION['prevresult']);
  }else{
    $multiple = isset($args) && count($args)>=1 && $args[0] == "multiple";
    $fixednumber = NULL;
    if(!$multiple && isset($args) && count($args)>=1 && filter_var($args[0], FILTER_VALIDATE_INT) !== FALSE){
      $fixednumber = $args[0];
      $multiple = true;
    }

    $sentence_info = fetchSentences($sourcescat,$sourcesfiles,$multiple,$fixednumber);
    $form = init_t1_2($sentence_info,$sourcescat);
    
    $_SESSION['prevform'] = $sentence_info;

    $content = $form->render();

  }





  $html = tplset(array("CONTENT"=>$content,"RESULT"=>$result,"MORE"=>$more),tpl("demo-pap/annotate"));

  return $html; 
}



function demo_sample($id){
  $demo_home = getConf("demo_home");
  $annotatedexemplereldir = getConf("annotatedexemplereldir");
  $content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<Document dtdVersion=\"2.1\" file=\"uComp_xml_utf8_tokenizer_FR_ax9tvaU/INPUT_NOHTML\">\n";
  $cmd = "grep -l $id ".$demo_home."$annotatedexemplereldir/*";
  $sourcefile = shell_exec($cmd);
  $i = 1;
  $cmd2 = BASE_DIR.getConf("extractpassagesentences")." ".trim($sourcefile)." $i $id.txt";
  $content .= shell_exec($cmd2);
  $content .= '</Document>';
  file_put_contents("/tmp/demo_sample_$id",$content);


  shell_exec("export DISPLAY=:0; xhost +SI:localuser:`whoami`");
  //xhost -SI:localuser:anotheruser to remove
  shell_exec("export DISPLAY=:0; ".$demo_home.getConf("pastabin")." gui /tmp/demo_sample_$id");
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

function extractSentences($ids,$file){
  $demo_home = getConf("demo_home");
  $sentences = array();
  foreach ($ids as $id) {
    $sentences[$id] = shell_exec(BASE_URL.getConf("extractsentences")." $file ".$id);
  }
  return $sentences;
}




function fetchSentences($examplescats,$examplesfiles,$multiple=false,$fixednumber=NULL,$forcefairbalance=true){
  $demo_home = getConf("demo_home");
  $sourcerelativedir = getConf("exemplesdir");

  $exempleset = array();

  $n = 1;
  $ncat = count($examplescats)-1;
  if($multiple){
    $n = $ncat+1;
    if(isset($fixednumber)){
      $n = $fixednumber;
    }
  }

  // TODO prevent identical
  $catset = array();
  for($i = 0;$i<$n;$i++){
    $randcat = rand(0,$ncat);
    // if forcebalance (get all possible exemple types)
    while($forcefairbalance && $i <= $ncat && array_search($randcat, $catset)!==FALSE){
      $randcat = rand(0,$ncat);
    }
    $catset[] = $randcat;

    

    $examplefilessource = $examplesfiles[$randcat];
    $id = "";
//    while(array_search(str_replace(".txt", "", $id), $exempleset)!==FALSE){
      $randfile = rand(0,count($examplefilessource)-1);
      $filesource = $demo_home.$sourcerelativedir."/empty_".$examplefilessource[$randfile];
      $fileinfo = $demo_home.$sourcerelativedir."/info_".$examplefilessource[$randfile];
      $annotatedsource = $demo_home.getConf('annotatedexemplereldir')."/".$examplefilessource[$randfile];

      $count = shell_exec("wc -l $fileinfo");
      $rand = rand(0,$count-1);
      $id = readOneLineAt($rand,$fileinfo);
      $id = trim($id);
//    }
    $content = shell_exec(getConf("extractsentences")." $filesource $id");
    $exempleset[str_replace(".txt", "", $id)] = array("sourcefile"=>$filesource,"content"=>$content,"annotated"=>$annotatedsource);
  }

  
  return $exempleset;
  
  
}



function init_t1_2($sentences_info,$sourcecat,$result=false){
  $cat = array_merge(array(""),$sourcecat);

  $formid = implode("-", array_keys($sentences_info));

  $form = new Form($formid);

  $callback = "eval_t1_2";

  $i = 0;
  $n = count($sentences_info);
  foreach ($sentences_info as $key => $value) {
    $section = $form->addSection("",false,false,true);
    $section->addElement("sid_$i","","hidden",array("hidden"=>true),$key);
    $section->addElement("title_$i","","custom",array("inline"=>true,"html"=>'<h3>'.($i+1).'/'.$n.'</h3>'));
    $section->addElement("refid_$i","","custom",array("html"=>'<div style="width:100%; display:block;">'.$key.'</div>'));
    $section->addElement("sentence_$i","","custom",array("inline"=>true,"html"=>'<div class="panel" style="display:inline-block; width:800px;">'.$value['content'].'</div>'));
    $section->addElement("valence_$i","","select",array("inline"=>true,"options"=>$cat,"otherparams"=>'style="margin-left:50px; max-width:100px;"'));
    $i+=1;
  }

  $section = $form->addSection("",false,false,true);
  $section->addElement("sourcecat","","hidden",array("hidden"=>true),htmlspecialchars(json_encode($sourcecat)));

  $hidesubmit = "";
  if($result){
    $hidesubmit = 'display:none;';
  }
  $section->addElement("submit","","submit",array("callback"=>$callback,"otherparams"=>'style="margin-left:40%;'.$hidesubmit.'"'),"Soumettre",false,"button");  
  
  return $form;

}

function eval_t1_2($form,&$values){
  $demo_home = getConf("demo_home");
  $refdir = $demo_home.getConf("ref_dir");

  $sourcescat = json_decode(htmlspecialchars_decode($values["sourcecat"]));

  $reffilename = getConf("ref_t1");
  $fixeval1valence = true;
  if(count($sourcescat)>2){
    $reffilename = getConf("ref_t2");
    $fixeval1valence = false;
  }

  $res_content = "";
  $hyp = array();
  foreach ($values as $key => $value) {
    if(Utils::startsWith($key,"sid")){

      $tmp = explode("_", $key);
      $i = $tmp[1];
      $type = ($values["valence_$i"])?$sourcescat[$values["valence_$i"]-1]:"undefined";
      if($fixeval1valence){
        if($type=="POSITIF"){
          $type = "+";
        }else if ($type == "NEGATIF"){
          $type = "-";
        }
      }
      $res_content .= $values["sid_$i"]."\t".$type."\n";
      $hyp[$i] = array("id"=>$values["sid_$i"],"val"=>$type);    
    }
    
  }

  $res_content = trim($res_content);
  $res_file = "/tmp/demo_deft_hyp";
  file_put_contents($res_file,$res_content);
  $cmd = BASE_DIR.getConf("extractrefbin")." ".$res_file." ".$refdir."/".$reffilename;
  Logger::Log($cmd);
  $ref_content = shell_exec($cmd);
  
  $ref = array();
  $rawref = explode("\n", $ref_content);
  foreach ($rawref as $key => $value) {
    $items = explode("\t",$value);
    $ref[$items[0]] = $items[1];
  }

  for($i=0;$i<count($hyp);$i++) {
    $val = $ref[$hyp[$i]["id"]];
    $hyp[$i]["result"] = ($val == $hyp[$i]["val"]);
    $hyp[$i]["refval"] = $val;
  }

  return $hyp;  
  /*$ref_file = "/tmp/demo_deft_ref";
  file_put_contents($ref_file,$ref_content);

  return shell_exec($demo_home.getConf("eval1_2")." -v -s ".$res_file." -g ".$ref_file);*/
}


function renderResult1_2($result){
  $html = "";
  for($i=0;$i<count($result);$i++) {
    $item = $result[$i];
    $html .= '<div id="item-result-'.$i.'" ';
    if($item["result"]){
      $html .= 'class="item-result-true">';
    }else{
      $html .= 'class="item-result-false"><div style="padding-top:35px;">'.$item["refval"].'</div>';
    }
    $html .= '</div>';
  }
  $html .= '<script>
    var children = jQuery("form").children();
    console.log(children);
    for(var i in children){
      var height = jQuery(children[i]).height();
      jQuery("#item-result-"+i).height(height-60);
      jQuery("#item-result-"+i).css("margin-top","60px");
    }
  </script>';
  return $html;
}



function demo_pap_t3_brat($args){
  $multiple = isset($args) && count($args)>=1 && $args[0] == "multiple";
  $fixednumber = 5;
  if(!$multiple && isset($args) && count($args)>=1 && filter_var($args[0], FILTER_VALIDATE_INT) !== FALSE){
    $fixednumber = $args[0];
    $multiple = true;
  }

  $sourcescat = array(
    "AMOUR",
    "APAISEMENT",
    "COLERE",
    "DEPLAISIR",
    "DERANGEMENT",
    "ENNUI",
    "PEUR",
    "PLAISIR",
    "MEPRIS",
    "SURPRISE_NEGATIVE",
    "SURPRISE_POSITIVE",
    "TRISTESSE",
    "INSATISFACTION",
    "SATISFACTION",
    "INFORMATION",
    "ACCORD",
    "DESACCORD",
    "DEVALORISATION",
    "VALORISATION"
    );

  $sourcesfiles = array(
    array("AMOUR.xml"),
    array("APAISEMENT.xml"),
    array("COLERE.xml"),
    array("DEPLAISIR.xml"),
    array("DERANGEMENT.xml"),
    array("ENNUI.xml"),
    array("PEUR.xml"),
    array("PLAISIR.xml"),
    array("MEPRIS.xml"),
    array("SURPRISE_NEGATIVE.xml"),
    array("SURPRISE_POSITIVE.xml"),
    array("TRISTESSE.xml"),
    array("INSATISFACTION.xml"),
    array("SATISFACTION.xml"),
    array("INFORMATION.xml"),
    array("ACCORD.xml"),
    array("DESACCORD.xml"),
    array("DEVALORISATION.xml"),
    array("VALORISATION.xml")
    );

  $sentences_info = fetchSentences($sourcescat,$sourcesfiles,$multiple,5);

  $demo_home = getConf("demo_home");
  $content = "";
  foreach($sentences_info as $id => $sentence_info){
    $content .= $sentence_info['content'];
    $content .= "\n";
  }
  file_put_contents(BASE_DIR."tmp/demo_deft_hyp.txt",$content);
  file_put_contents(BASE_DIR."tmp/demo_deft_hyp.ann","");
  
  $content = '<iframe src="http://localhost:8001/index.xhtml#/demo_deft_hyp" width="100%" height="800px;"></iframe>';

  return $content;
}


function demo_pap_t3($args){
  $multiple = isset($args) && count($args)==1 && $args[0] == "multiple";
  $fixednumber = 5;
  if(!$multiple && isset($args) && count($args)>=1 && filter_var($args[0], FILTER_VALIDATE_INT) !== FALSE){
    $fixednumber = $args[0];
    $multiple = true;
  }

  $sourcescat = array(
    "AMOUR",
    "APAISEMENT",
    "COLERE",
    "DEPLAISIR",
    "DERANGEMENT",
    "ENNUI",
    "PEUR",
    "PLAISIR",
    "MEPRIS",
    "SURPRISE_NEGATIVE",
    "SURPRISE_POSITIVE",
    "TRISTESSE",
    "INSATISFACTION",
    "SATISFACTION",
    "INFORMATION",
    "ACCORD",
    "DESACCORD",
    "DEVALORISATION",
    "VALORISATION"
    );

  $sourcesfiles = array(
    array("AMOUR.xml"),
    array("APAISEMENT.xml"),
    array("COLERE.xml"),
    array("DEPLAISIR.xml"),
    array("DERANGEMENT.xml"),
    array("ENNUI.xml"),
    array("PEUR.xml"),
    array("PLAISIR.xml"),
    array("MEPRIS.xml"),
    array("SURPRISE_NEGATIVE.xml"),
    array("SURPRISE_POSITIVE.xml"),
    array("TRISTESSE.xml"),
    array("INSATISFACTION.xml"),
    array("SATISFACTION.xml"),
    array("INFORMATION.xml"),
    array("ACCORD.xml"),
    array("DESACCORD.xml"),
    array("DEVALORISATION.xml"),
    array("VALORISATION.xml")
    );

  $sentences_info = fetchSentences($sourcescat,$sourcesfiles,$multiple,$fixednumber);
  
  launch_pasta($sentences_info);

  $raw_output = eval_t3($sentences_info);
  $content = render_eval_t3($raw_output,$sentences_info,$sourcescat);
  

  return $content; 
}

function pasta_annotated_res(){
  pasta_show_results(false);
}

function pasta_diff_results(){
  pasta_show_results();
}

function pasta_show_results($diff=true){
  $sentences_info = "";
  header("Content-type:application/json");
  echo "{}";

  if (isset($_POST) ){
    $sentences_info = $_POST;
  }else{
    return ;
  }



  $demo_home = getConf("demo_home");
  $content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<Document dtdVersion=\"2.1\" file=\"uComp_xml_utf8_tokenizer_FR_ax9tvaU/INPUT_NOHTML\">\n";
  $i = 1;
  foreach($sentences_info as $id => $sentence_info){
    if($diff){
      $content .= shell_exec(getConf("extractpassagesentences")." /tmp/demo_deft_hyp_passage $i $id.txt");
      $content .= "\n";
      $i+=1;
    }
    $content .= shell_exec(getConf("extractpassagesentences")." ".$sentence_info['annotated']." $i $id.txt");
    $content .= "\n";
    $i+=1;
  }
  $content .= '</Document>';
  file_put_contents("/tmp/demo_deft_diff",$content);


  shell_exec("export DISPLAY=:0; xhost +SI:localuser:`whoami`");
  //xhost -SI:localuser:anotheruser to remove
  shell_exec("export DISPLAY=:0; ".$demo_home.getConf("pastabin")." gui /tmp/demo_deft_diff");
}


function launch_pasta($sentences_info){
  $demo_home = getConf("demo_home");
  $content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<Document dtdVersion=\"2.1\" file=\"uComp_xml_utf8_tokenizer_FR_ax9tvaU/INPUT_NOHTML\">\n";
  $i = 1;
  foreach($sentences_info as $id => $sentence_info){
    $content .= shell_exec(getConf("extractpassagesentences")." ".$sentence_info['sourcefile']." $i $id.txt");
    $content .= "\n";
    $i+=1;
  }
  $content .= '</Document>';
  file_put_contents("/tmp/demo_deft_hyp_passage",$content);


  shell_exec("export DISPLAY=:0; xhost +SI:localuser:`whoami`");
  //xhost -SI:localuser:anotheruser to remove
  shell_exec("export DISPLAY=:0; ".$demo_home.getConf("pastabin")." gui /tmp/demo_deft_hyp_passage");

}

function eval_t3($sentences_info){
  $demo_home = getConf("demo_home");
  $refdir = $demo_home.getConf("ref_dir");

  $cmd = $demo_home.getConf("passagetodeftt3")." -i /tmp/demo_deft_hyp_passage -o /tmp/demo_deft_hyp; sed -e \"s/.txt//gm\" /tmp/demo_deft_hyp > /tmp/demo_deft_hyp_fixed";
  shell_exec($cmd);

  $ids = array_keys($sentences_info);
  $ids = implode(" ", $ids);  
  $cmd2 = BASE_DIR.getConf("extractrefbin3")." ".$refdir."/".getConf("ref_t3")." ".$ids;
  Logger::Log($cmd2);
  $ref_content = shell_exec($cmd2);
  $ref_file = "/tmp/demo_deft_ref";
  file_put_contents($ref_file,$ref_content);
  return shell_exec($demo_home.getConf("eval3")." -vRG -s /tmp/demo_deft_hyp_fixed -g ".$ref_file);
}

function renderTableInfo($lines){
  $attrs = array("Precision","Recall","F-Measure1");

  $html = "";
  $tableinfo = array();
  $currtableinfo = NULL;
  $prevline = NULL;
  foreach ($lines as $line) {
    $line = trim($line);
    if($line == ""){
      continue;
    }
    $lineelts = explode(":",$line);
    if(array_search($lineelts[0],$attrs) === FALSE){
      $currtableinfo = &$tableinfo[];
      $currtableinfo = array("groupe"=>$lineelts[0]);
    }else if(isset($currtableinfo)){
      $currtableinfo[$lineelts[0]]=$lineelts[1];
    }
    $prevline = $line;
  }
  
  $html .= '<div class="limit-size-ps"><table>';
  if(count($tableinfo[0])==1){
    array_shift($tableinfo);
  }
  $keys = array_keys($tableinfo[0]);
  foreach ($tableinfo as $infos) {
    $tmpkeys = array_keys($infos);
    if(count($tmpkeys)>count($keys)){
      $keys = $tmpkeys;
    }
  }
  foreach ($keys as $key) {
    $html .= '<tr>';
    $html .= '<td>'.$key.'</td>';
    foreach ($tableinfo as $info) {
      $html .= '<td>'.$info[$key].'</td>';
    }
    $html .= '</tr>';
  }
  $html.='</table></div>';
  return $html;
}

function renderExempleDetailResult($lines,$sentences_info,$htmlidprefix){
  $sids = array_keys($sentences_info);
  //$html .='<ul class="accordion" data-accordion style="margin-left:0;">';
  $html = "";
  $grouptable = NULL;
  $i =1;
  foreach ($lines as $line) {
    $line = trim($line);
    if(array_search($line, $sids)!==FALSE){
      if(isset($grouptable)){
        $html .= renderTableInfo($grouptable);
        //$html .= '</div></li>';
        $html .= '</div>';
      }
      $html .= '<div class="result-item-detail-title">'.$i.'. "'.$sentences_info[$line]['content'].'"</div><div class="accordion-content-like">';/*
      $html .= ' <li class="accordion-navigation">
    <a href="#'.$htmlidprefix.'-'.$line.'">'.$sentences_info[$line]['content'].'</a>
    <div id="'.$htmlidprefix.'-'.$line.'" class="content '.(isset($grouptable)?"":"active").'">';*/
      $grouptable = array();
      $i+=1;
    }else if(isset($grouptable)){
      $grouptable[] = $line;
    }
    //$html .= $line."<br>";
  }
  if(isset($grouptable)){
    $html .= renderTableInfo($grouptable);
  }
  //$html .= '</div></li></ul>';
  $html .= '</div>';
  return $html;
}

function render_eval_t3($raw_output,$sentences_info,$sourcescat){
  $html = "";
  $sids = array_keys($sentences_info);
  $output_groups = explode("------------------------------",$raw_output);
  foreach ($output_groups as &$group) {
    $group =  explode("\n",$group);
  }

  $addon0 = array();
  foreach ($output_groups[2] as $line) {
    $line = trim($line);
    if(array_search($line, $sids)!==FALSE){
      break;
    }
    $addon0[] = $line;
  }

  $output_groups[1] = array_merge($output_groups[1],$addon0);
  $output_groups[3] = array_merge($output_groups[3],$output_groups[4]);

  $html .= '<h2>Résultats</h2><ul class="tabs" data-tab>
  <li class="tab-title active"><a href="#results-groups">Groupes</a></li>
  <li class="tab-title"><a href="#results-rels">Relations</a></li>
</ul>
<div class="tabs-content" style="background-color:#fff;">
  <div class="content active" id="results-groups"><div class="result-item-detail-title">Global</div><div class="accordion-content-like">
';

  // global group result
  $html .= renderTableInfo($output_groups[1]);


  $html .= '</div>';

  $html .= renderExempleDetailResult($output_groups[0],$sentences_info,"group");

  $html.='';

  $html .= '</div>
  <div class="content" id="results-rels"><div class="result-item-detail-title">Global</div><div class="accordion-content-like">
';

  // global group result
  $html .= renderTableInfo($output_groups[3]);


  $html .= '</div>';

  $html .= renderExempleDetailResult($output_groups[2],$sentences_info,"rel");

  $html.='</div></div>';


  
  /*foreach ($output_groups as $output_lines) {
    $html .= '<div class="row"><div class="panel">';
    foreach ($output_lines as $line) {
      $html .= $line."<br>";
    }
    $html .= '</div></div>';
  }*/


  $html = $html.'<button id="compare-result" type="button" class="button" style="margin-left:40%;">Comparer les résultats</button>
  <script>
    jQuery(".limit-size-ps").perfectScrollbar();  
    jQuery("#compare-result").click(function(){
      jQuery.ajax({
        type: "POST",
        data : '.json_encode($sentences_info).',
        url: "'.BASE_URL.'demo/rest/difft3",
        dataType : "json",
        success: function(data, textStatus, jqXHR) {
          console.log(data);
        }
      });
    });
  </script>
  ';

  return $html;
}
