cmake_minimum_required (VERSION 2.8)
project (mylib)
add_library (mylib src/my.cpp src/your.cpp)
target_include_directories(mylib PUBLIC include)

#https://ladofa.blogspot.com/2020/09/c-3-cmake.html
