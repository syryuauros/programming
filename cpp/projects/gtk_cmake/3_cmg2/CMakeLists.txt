cmake_minimum_required (VERSION 2.8)
project (mytest)
find_package(PkgConfig REQUIRED)
pkg_check_modules(GTKMM REQUIRED gtkmm-3.0)  # compile option `pkg-config gtkmm-3.0 --cflags --libs`
#add_subdirectory(mylib)
add_executable (mytest main.cpp)
target_link_libraries(mytest PUBLIC ${GTKMM_LIBRARIES})   # 'mylib' means the name of libraries, (lib)mylib(.a)
target_compile_definitions(mytest PUBLIC ${GTKMM_CFLAGS_OTHER})
target_include_directories(mytest PUBLIC ${GTKMM_INCLUDE_DIRS}) # path of header files (my.h, your.h)
target_link_directories(mytest PUBLIC ${GTKMM_LIBRARY_DIRS}) # path of library files


#https://ladofa.blogspot.com/2020/09/c-3-cmake.html
#https://gist.github.com/fracek/3323924
#https://stackoverflow.com/questions/2730135/how-do-i-link-gtk-library-more-easily-with-cmake-in-windows
