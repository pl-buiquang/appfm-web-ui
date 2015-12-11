#!/usr/bin/python

import argparse
import re

parser = argparse.ArgumentParser()
parser.add_argument('entry', type=file, help='entry file')
parser.add_argument('newstartid', type=int, help='new start id')
parser.add_argument('ids', nargs='+', help='result file')

args = parser.parse_args()


ids = args.ids
startid = args.newstartid
goprint = False
for line in args.entry:
  if line.startswith('<Sentence') and re.match('.*?origin="('+"|".join(ids)+')"',line) != None:
    goprint = True
  elif line.startswith('</Sentence') and goprint:
    startid += 1
    print line.strip()
    goprint = False
  if goprint :
    line = re.sub('="E\d+','="E'+str(startid),line)
    print line.strip()
