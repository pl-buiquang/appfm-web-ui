#!/usr/bin/python

import argparse

parser = argparse.ArgumentParser()
parser.add_argument('ref', type=file, help='entry file')
parser.add_argument('ids', nargs='+', help='ids to fetch')

args = parser.parse_args()


ids = args.ids
for line in args.ref:
  elts = line.split("|")
  if elts[0] in ids:
    print line.strip()
