cmake_minimum_required (VERSION 2.8)
project (mytest)
find_package(OpenCV REQUIRED)
add_subdirectory(mylib)
add_executable (mytest main.cpp)
target_link_libraries(mytest PUBLIC mylib ${OpenCV_LIBS})   # 'mylib' means the name of libraries, (lib)mylib(.a)
#target_link_directories(mytest PUBLIC mylib/build) # path of library files ('libmylib.a')
target_include_directories(mytest PUBLIC ${OpenCV_INCLUDE_DIRS}) # path of header files (my.h, your.h)

#https://ladofa.blogspot.com/2020/09/c-3-cmake.html
