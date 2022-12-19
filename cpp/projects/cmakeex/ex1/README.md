https://ladofa.blogspot.com/2018/07/c-1.html

g++ -c my.cpp
g++ -c main.cpp
g++ -o test my.o main.o -static /* flake.nix에서 static library를 깔았기 때문에 -static으로 옵션을 준다*/
