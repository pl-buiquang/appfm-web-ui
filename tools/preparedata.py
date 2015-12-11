#!/usr/bin/python

import argparse
import re
import subprocess
import os

parser = argparse.ArgumentParser(description='Extract result subset from entry list')
parser.add_argument('outdir',help='entry file')
parser.add_argument('files', type=file, nargs='+',help='entry files')

args = parser.parse_args()

if not os.path.exists(args.outdir):
  print "the output directory does not exist!"
  exit() 

for fileitem in args.files:
  ids = []
  for line in fileitem:
    if line.startswith("<Sentence"):
      idmatch = re.match('<Sentence.*?origin="(.*?)"',line)
      if idmatch :
        ids.append(idmatch.group(1))

  infofile = open(args.outdir.rstrip('/')+"/info_"+os.path.basename(fileitem.name),"w")
  infofile.write("\n".join(ids))
  infofile.close()

  # create new base empty file
  newfile = open(args.outdir.rstrip('/')+"/empty_"+os.path.basename(fileitem.name),"w")
  newfile.write(subprocess.check_output('egrep -v "<\/?(R|source|osee|target|oseeSrc|G)" '+fileitem.name,shell=True))
  newfile.close()