a:58:{i:0;a:3:{i:0;s:14:"document_start";i:1;a:0:{}i:2;i:0;}i:1;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:9:"Use Cases";i:1;i:1;i:2;i:1;}i:2;i:1;}i:2;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:1;}i:2;i:1;}i:3;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:26;}i:4;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:8:"Examples";i:1;i:2;i:2;i:26;}i:2;i:26;}i:5;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:2;}i:2;i:26;}i:6;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:26;}i:7;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:75:"take one text file, parse it with bonsai, get the result, view parse graphs";}i:2;i:48;}i:8;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:123;}i:9;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:123;}i:10;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:84:"take folder with pdfs, transform them into text files, save the resulting collection";}i:2;i:125;}i:11;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:209;}i:12;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:209;}i:13;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:85:"from parsed graphs, filter some depending on whatever, get context of filtered graphs";}i:2;i:211;}i:14;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:296;}i:15;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:296;}i:16;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:75:"from text files, annotate with wolf, get context of file with matched query";}i:2;i:298;}i:17;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:373;}i:18;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:373;}i:19;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:62:"from text files, parse them, apply ner, apply dbpedia ids/refs";}i:2;i:375;}i:20;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:437;}i:21;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:437;}i:22;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:65:"from one sentence, parse it, apply ner + dbpedia, answer question";}i:2;i:439;}i:23;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:504;}i:24;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:506;}i:25;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:22:"Information Extraction";i:1;i:2;i:2;i:506;}i:2;i:506;}i:26;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:2;}i:2;i:506;}i:27;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:542;}i:28;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:20:"Information Research";i:1;i:2;i:2;i:542;}i:2;i:542;}i:29;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:2;}i:2;i:542;}i:30;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:542;}i:31;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:99:"Pipeline1 : use doc collection, parse, apply ontology mapping, apply tf-idf, store in elasticsearch";}i:2;i:576;}i:32;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:675;}i:33;a:3:{i:0;s:4:"code";i:1;a:3:{i:0;s:52:"
$ cpm run pipeline_index --in collection_id --lazy
";i:1;N;i:2;N;}i:2;i:682;}i:34;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:682;}i:35;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:71:"lazy : don't process already processed documents (or watch for changes)";}i:2;i:744;}i:36;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:815;}i:37;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:815;}i:38;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:113:"Pipeline2 : launch elasticsearch service, use text input, tokenize, lemmatize, query elasticsearch, output result";}i:2;i:817;}i:39;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:930;}i:40;a:3:{i:0;s:4:"code";i:1;a:3:{i:0;s:46:"
$ cpm run pipeline_query "keyword1 keyword2"
";i:1;N;i:2;N;}i:2;i:937;}i:41;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:993;}i:42;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:3:"Q&A";i:1;i:2;i:2;i:993;}i:2;i:993;}i:43;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:2;}i:2;i:993;}i:44;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:993;}i:45;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:9:"Start cpm";}i:2;i:1010;}i:46;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:1019;}i:47;a:3:{i:0;s:4:"code";i:1;a:3:{i:0;s:43:"
$ service cpm start
cpm started, pid 1234
";i:1;N;i:2;N;}i:2;i:1026;}i:48;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:1026;}i:49;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:56:"Launch registered pipeline, with unregistred data/corpus";}i:2;i:1079;}i:50;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:1135;}i:51;a:3:{i:0;s:4:"code";i:1;a:3:{i:0;s:78:"
$ cpm run my_pipeline --if ~/data/question.txt --of ~/data/output/answer.txt
";i:1;N;i:2;N;}i:2;i:1142;}i:52;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:1142;}i:53;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:28:"Launch unregistered pipeline";}i:2;i:1230;}i:54;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:1258;}i:55;a:3:{i:0;s:4:"code";i:1;a:3:{i:0;s:110:"
$ cpm run pipeline_name --config ~/data/pipeline.conf --if ~/data/question.txt --of ~/data/output/answer.txt
";i:1;N;i:2;N;}i:2;i:1265;}i:56;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:1384;}i:57;a:3:{i:0;s:12:"document_end";i:1;a:0:{}i:2;i:1384;}}