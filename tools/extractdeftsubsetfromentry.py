#!/usr/bin/python

import argparse

parser = argparse.ArgumentParser()
parser.add_argument('entry', type=file, help='entry file')
parser.add_argument('result', type=file, help='result file')

args = parser.parse_args()


ids = []
for line in args.entry:
  elts = line.split("\t")
  if not elts[0] in ids:
    ids.append(elts[0])

for line in args.result:
  elts = line.split("\t")
  if elts[0] in ids:
    print line.strip()
