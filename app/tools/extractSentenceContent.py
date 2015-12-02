#!/usr/bin/python

import argparse
import re

parser = argparse.ArgumentParser()
parser.add_argument('entry', type=file, help='entry file')
parser.add_argument('ids', nargs='*', help='ids to fetch')

args = parser.parse_args()


ids = args.ids
sentences = []
goprint = False
cursentence = ""
prevOffset = 0
for line in args.entry:
  if line.startswith('<Sentence') and (len(args.ids)==0 or re.match('.*?origin="('+"|".join(ids)+')"',line) != None):
    goprint = True
  elif line.startswith('</Sentence') and goprint:
    sentences.append(cursentence)
    cursentence = ""
    prevOffset = 0
    goprint = False

  if goprint :
    if line.startswith("<T") :
      startmatch = re.match('.*?start="(.*?)"',line)
      contentmatch = re.match('.*?>(.*)<',line)
      offset = 0
      if startmatch :
        offset = int(startmatch.group(1))-prevOffset
      content = ""
      if contentmatch:
        content = contentmatch.group(1)
      if content == "OSE_GLOBALE":
        continue
      for i in range(0,offset):
        cursentence += " "
      cursentence += content
      prevOffset = prevOffset + offset + len(content.decode('utf-8'))


for sentence in sentences:
  print sentence.strip()
