compile script for c++
=

## using shell environment
 $ nix-shell -p gcc <br/>
 $ g++ [file_name.cpp] <br/>
 $ ./[file_name.out] <br/>

## using flake
 $ ~/gits/programming/cpp/gcc/bin/g++ [file_name.cpp] <br/>
 $ ./[file_name.out] <br/>

## using nix-shell for gtkmm3
 $ nix-shell -p pkgconfig gtkmm3
