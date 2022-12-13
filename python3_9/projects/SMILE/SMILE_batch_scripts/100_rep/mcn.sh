#!/bin/sh

for ((j=1; j<=3; j++));
do
for ((i=0; i<=1; i++));
do
mv ./$1"train0_0"$j"0_"\ $i".csv" ./$1"train0_0"$j"0_"$i".csv"
done
done
