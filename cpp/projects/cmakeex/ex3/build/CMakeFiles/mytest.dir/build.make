# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /nix/store/k7lm30wld0jhdks4maz47v7ak8ydv2g6-cmake-3.22.3/bin/cmake

# The command to remove a file.
RM = /nix/store/k7lm30wld0jhdks4maz47v7ak8ydv2g6-cmake-3.22.3/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/auros/gits/programming/cpp/projects/cmakeex/ex3

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/auros/gits/programming/cpp/projects/cmakeex/ex3/build

# Include any dependencies generated for this target.
include CMakeFiles/mytest.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/mytest.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/mytest.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/mytest.dir/flags.make

CMakeFiles/mytest.dir/main.cpp.o: CMakeFiles/mytest.dir/flags.make
CMakeFiles/mytest.dir/main.cpp.o: ../main.cpp
CMakeFiles/mytest.dir/main.cpp.o: CMakeFiles/mytest.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/auros/gits/programming/cpp/projects/cmakeex/ex3/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/mytest.dir/main.cpp.o"
	/nix/store/lsyzzki1iv9gwk4vdss7i1cjxrnxling-gcc-wrapper-11.3.0/bin/g++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/mytest.dir/main.cpp.o -MF CMakeFiles/mytest.dir/main.cpp.o.d -o CMakeFiles/mytest.dir/main.cpp.o -c /home/auros/gits/programming/cpp/projects/cmakeex/ex3/main.cpp

CMakeFiles/mytest.dir/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/mytest.dir/main.cpp.i"
	/nix/store/lsyzzki1iv9gwk4vdss7i1cjxrnxling-gcc-wrapper-11.3.0/bin/g++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/auros/gits/programming/cpp/projects/cmakeex/ex3/main.cpp > CMakeFiles/mytest.dir/main.cpp.i

CMakeFiles/mytest.dir/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/mytest.dir/main.cpp.s"
	/nix/store/lsyzzki1iv9gwk4vdss7i1cjxrnxling-gcc-wrapper-11.3.0/bin/g++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/auros/gits/programming/cpp/projects/cmakeex/ex3/main.cpp -o CMakeFiles/mytest.dir/main.cpp.s

# Object files for target mytest
mytest_OBJECTS = \
"CMakeFiles/mytest.dir/main.cpp.o"

# External object files for target mytest
mytest_EXTERNAL_OBJECTS =

mytest: CMakeFiles/mytest.dir/main.cpp.o
mytest: CMakeFiles/mytest.dir/build.make
mytest: CMakeFiles/mytest.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/auros/gits/programming/cpp/projects/cmakeex/ex3/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable mytest"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/mytest.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/mytest.dir/build: mytest
.PHONY : CMakeFiles/mytest.dir/build

CMakeFiles/mytest.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/mytest.dir/cmake_clean.cmake
.PHONY : CMakeFiles/mytest.dir/clean

CMakeFiles/mytest.dir/depend:
	cd /home/auros/gits/programming/cpp/projects/cmakeex/ex3/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/auros/gits/programming/cpp/projects/cmakeex/ex3 /home/auros/gits/programming/cpp/projects/cmakeex/ex3 /home/auros/gits/programming/cpp/projects/cmakeex/ex3/build /home/auros/gits/programming/cpp/projects/cmakeex/ex3/build /home/auros/gits/programming/cpp/projects/cmakeex/ex3/build/CMakeFiles/mytest.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/mytest.dir/depend

