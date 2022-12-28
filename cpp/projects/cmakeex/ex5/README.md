https://ladofa.blogspot.com/2020/09/c-3-cmake.html
https://stackoverflow.com/questions/40667313/how-to-get-opencv-to-work-in-nix

$ nix develop       /* cpp develop shell with opencv installed */

$ cd ../../build     /* main.cpp compile*/
$ cmake ..
$ make

/* don`t need to build libraries, 'mylib' is automatically build while main.cpp compile, for the subdirectory term describes all the information about libraries */
