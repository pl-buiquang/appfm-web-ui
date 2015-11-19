<?php

# home of the demo binaries and data 
#$demo_home = "/vagrant/data/demo_pap/";
$demo_home = "/home/paul/projects/custom/cpm/data/demo_pap/";

# relative directory containing reference results
$ref_dir = "deft2015_corpus/TESTS_REFERENCE_DATA";

$ref_t1 = "T1b.txt";
$ref_t2 = "T2.1b.txt";
$ref_t3 = "T3b.txt";


$eval1_2 = "deft2015_corpus/TOOLS/EVALUATION/evalT1-T2.pl";
$eval3 = "deft2015_corpus/TOOLS/EVALUATION/evalT3.pl";

$extractrefbin = "extractdeftsubsetfromentry.py";
$extractrefbin3 = "extractdeftsubsetfromentry3.py";

$pastabin = "Pasta/src/pasta.sh";

$passagetodeftt3 = "ucomp_to_deft/ucomp_to_deft2015_task3";


$extractsentences = "tools/extractSentenceContent.py";
$extractpassagesentences = "tools/extractpassagesentences.py";


$exemplesdir = "demo_workspace";

$annotatedexemplereldir = "xml";
$presetexamples = array(
  #"idexemple"=>"Description exemple"
  "505912494024851458"=>"Ex1",
  "489677577724772352"=>"Ex2",


);