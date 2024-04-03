#!/usr/bin/env sh

echo "now server programs (apiForDBTree.py & test_server.py) will be killed"

echo "apiForDBTree pid: " `ps aux | grep apiForDBTree | awk '{print $2}' | head -n 1` " will be killed"
echo "test_server pid: " `ps aux | grep test_server | awk '{print $2}' | head -n 1` " will be killed"

# ps aux | grep .py | grep auros
kill -9 `ps aux | grep apiForDBTree | awk '{print $2}' | head -n 1`
kill -9 `ps aux | grep test_server | awk '{print $2}' | head -n 1`
