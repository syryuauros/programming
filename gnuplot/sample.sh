#!/bin/sh

gnuplot <<EOF
        set title "sin(x)"
        set ylabel "y"
        set xlabel "x"
        plot sin(x)
        pause mouse key
EOF
