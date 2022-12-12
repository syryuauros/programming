#!/bin/sh
#SBATCH --ntasks-per-node=1

python3 $1$2 $1 $3
