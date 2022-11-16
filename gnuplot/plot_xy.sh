#!/bin/sh

# https://blog.naver.com/nai0315/10113430741
# https://swstar.tistory.com/193
# with options  http://www.gnuplot.info/docs_4.2/node145.html
# https://github.com/syryuauros/Manuals/blob/main/useful/1_key_app.org
# grammar: $./plot_xy.sh ./simple_xydata.txt

gnuplot <<EOF
        # setting for output as a png file, if you want to draw interactively comment out this part
        set terminal pngcairo enhanced color font "Arial,48" dashlength 0.5 size 1920,1440
        set output '$1.png'

        # # layer overall for the output setup above
        set border lw 5
        set pointsize 3
        set tics scale 1

#--------------------------------------------------------------------------------------------------
        # range, variable setup
        # PI = 3.14159265
        # xmin = 0.
        # xmax = 8.5
        # ymin = -1.2
        # ymax = 1.2

        # range, label setup
        set title "TITLE"
        # set xrange [xmin:xmax]
        # set xlabel 'x' offset 0.,0.4 font "Arial,48"
        # set yrange [ymin:ymax]
        # set ylabel 'sin(x+{/Symbol D}x)' offset 1.,0. font "Arial,48"
        # set label 1001 '{/Symbol p}' at PI + 0.01 * (xmax - xmin), 0.06 * (ymax - ymin) font "Arial,36"
#---------------------------------------------------------------------------------------------------
        # line type setup -- dt: dash type,  lw: line-width
        # https://htmlcolorcodes.com/
        # https://coolors.co/palettes/trending
        color6 = '#264653'
        color7 = '#2a9d8f'
        color8 = '#e9c46a'
        color9 = '#f4a261'
        color10 = '#e76f51'
        set style line 11 dt 1 lw 10 linecolor rgb 'red'
        set style line 12 dt 1 lw 10 linecolor rgb 'magenta'
        set style line 13 dt 1 lw 10 linecolor rgb 'green'
        set style line 14 dt 1 lw 10 linecolor rgb 'blue'
        set style line 15 dt 1 lw 10 linecolor rgb 'purple'
        set style line 16 dt 1 lw 10 linecolor rgb color6
        set style line 17 dt 1 lw 10 linecolor rgb color7
        set style line 18 dt 1 lw 10 linecolor rgb color8
        set style line 19 dt 1 lw 10 linecolor rgb color9
        set style line 20 dt 1 lw 10 linecolor rgb color10

        # margin setup
        set lmargin 7.
        set rmargin 1.
        set tmargin 2.5
        set bmargin 3.
        set key left top

#--------------------------------------------------------------------------------------------------
        # insert arrow mark without head
        # set arrow from PI, 0.2 to PI, -1.1 nohead linestyle 102
        # set label 1002 '2{/Symbol p}' at 2. * PI + 0.01 * (xmax - xmin), -0.03 * (ymax - ymin) font "TimesNewRoman,36"
        # set arrow from 2. * PI, -0.2 to 2. * PI, 1.1 nohead linestyle 102

        #set key at xmin + 0.03 * (xmax - xmin), ymin + 0.97 * (ymax - ymin)
#--------------------------------------------------------------------------------------------------

        # plot,   dt=dash-type, lw=line-width, pt=point-type, ps=point-size
        plot '$1' u 1:2 with line linestyle 16 title '',\
        '$1' u 1:3 with linespoints linestyle 17 dt 2 pt 7 ps 5 title '',\
        '$1' u 1:4 with linespoints linestyle 18 dt 2 pt 8 ps 5 title '',\
        '$1' u 1:5 with linespoints linestyle 19 pt 9 ps 5 title '',\
        '$1' u 1:6 with line linestyle 20 dt 3 lw 10 title ''
        pause mouse key
EOF
