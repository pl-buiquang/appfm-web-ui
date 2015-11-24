<?php

# home of the demo binaries and data 
$demo_home = "/vagrant/data/demo_pap/";
#$demo_home = "/home/paul/projects/custom/cpm/data/demo_pap/";

# relative directory containing reference results
$ref_dir = "deft2015_corpus/TESTS_REFERENCE_DATA";

# reference result files
$ref_t1 = "T1b.txt";
$ref_t2 = "T2.1b.txt";
$ref_t3 = "T3b.txt";

# eval scripts
$eval1_2 = "deft2015_corpus/TOOLS/EVALUATION/evalT1-T2.pl";
$eval3 = "deft2015_corpus/TOOLS/EVALUATION/evalT3.pl";

# extract reference result subset from demo example set
$extractrefbin = "tools/extractdeftsubsetfromentry.py";
$extractrefbin3 = "tools/extractdeftsubsetfromentry3.py";

# pasta executable
$pastabin = "Pasta/src/pasta.sh";

# transform pasta/passage format to deft
$passagetodeftt3 = "ucomp_to_deft/ucomp_to_deft2015_task3";

# extract raw text/passage sentence content from passage source file matching a set of ids 
$extractsentences = "tools/extractSentenceContent.py";
$extractpassagesentences = "tools/extractpassagesentences.py";

# directory containing unannotated passage source files
$exemplesdir = "demo_workspace";

# directory containing annotated passage source files
$annotatedexemplereldir = "xml";

# set of examples to be displayed in the top right menu
$presetexamples = array(
  #"idexemple"=>"Description exemple"
  "505912494024851458"=>"Ex1",
  "489677577724772352"=>"Ex2",


);
