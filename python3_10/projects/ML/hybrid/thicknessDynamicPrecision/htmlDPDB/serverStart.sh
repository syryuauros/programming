#!/usr/bin/env sh

echo "now Starting server programs (apiForDBTree.py & test_server.py)"

echo "apiForDBTree pid: " `ps aux | grep apiForDBTree | awk '{print $2}' | head -n 1` "start now"
echo "test_server pid: " `ps aux | grep test_server | awk '{print $2}' | head -n 1` "start now"

# ps aux | grep .py | grep auros
/home/auros/gits/programming/python3_10/projects/ML/hybrid/thicknessDynamicPrecision/htmlDPDB/apiForDBTree.py &
/home/auros/gits/programming/python3_10/projects/ML/hybrid/thicknessDynamicPrecision/htmlDPDB/test_server.py &
