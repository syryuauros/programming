# examples/c++/Makefile.examples.in for PLplot
###
### Process this file with configure to produce Makefile.examples
###
# Copyright (C) 2002-2015  Alan W. Irwin
# Copyright (C) 2004  Rafael Laboissiere
# Copyright (C) 2004  Andrew Ross
#
# This file is part of PLplot.
#
# PLplot is free software; you can redistribute it and/or modify
# it under the terms of the GNU Library General Public License as published by
# the Free Software Foundation; version 2 of the License.
#
# PLplot is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Library General Public License for more details.
#
# You should have received a copy of the GNU Library General Public License
# along with the file PLplot; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301  USA

SHELL = /nix/store/h3dwyhxyswzr8vkdchiqzdf7s8rlc4if-bash-5.1-p16/bin/bash
CXX = /nix/store/lsyzzki1iv9gwk4vdss7i1cjxrnxling-gcc-wrapper-11.3.0/bin/g++  
EXEEXT = 

PKG_CONFIG_ENV = PKG_CONFIG_PATH="../lib/pkgconfig:/nix/store/0l59kiby8xr8y694d56v1jb8v78byfkp-file-5.41/lib/pkgconfig"
RPATHCMD = -Wl,-rpath -Wl,"../lib"
#QT_MOC_EXECUTABLE = 
#qt_RPATHCMD = 

#PLPLOTWXWIDGETS_EXECUTABLES_list = \
#	$(EXEEXT)

#qt_gui_EXECUTABLES_list = \
#	qt_example$(EXEEXT)

EXECUTABLES_list = \
		 x01cc$(EXEEXT) \
		 x00$(EXEEXT) \
		 x01$(EXEEXT) \
		 x02$(EXEEXT) \
		 x03$(EXEEXT) \
		 x04$(EXEEXT) \
		 x05$(EXEEXT) \
		 x06$(EXEEXT) \
		 x07$(EXEEXT) \
		 x08$(EXEEXT) \
		 x09$(EXEEXT) \
		 x10$(EXEEXT) \
		 x11$(EXEEXT) \
		 x12$(EXEEXT) \
		 x13$(EXEEXT) \
		 x14$(EXEEXT) \
		 x15$(EXEEXT) \
		 x16$(EXEEXT) \
		 x17$(EXEEXT) \
		 x18$(EXEEXT) \
		 x19$(EXEEXT) \
		 x20$(EXEEXT) \
		 x21$(EXEEXT) \
		 x22$(EXEEXT) \
		 x23$(EXEEXT) \
		 x24$(EXEEXT) \
		 x25$(EXEEXT) \
		 x26$(EXEEXT) \
		 x27$(EXEEXT) \
		 x28$(EXEEXT) \
		 x29$(EXEEXT) \
		 x30$(EXEEXT) \
		 x31$(EXEEXT) \
		 x33$(EXEEXT) \
		 $(PLPLOTWXWIDGETS_EXECUTABLES_list) \
		 $(qt_gui_EXECUTABLES_list)


all: $(EXECUTABLES_list)

clean:
	rm -f $(EXECUTABLES_list)

# target_link_libraries(wxPLplotDemo plplotwxwidgets plplotcxx  /nix/store/cynvahq5hc4g8hg99vajx6p1gw7sqhm7-glibc-2.34-210/lib/libm.so)
#$(EXEEXT): .cpp
#	$(CXX) $< -o $@ $(RPATHCMD) $(shell $(PKG_CONFIG_ENV) pkg-config  --cflags --libs plplot-wxwidgets plplot-c++)  /nix/store/cynvahq5hc4g8hg99vajx6p1gw7sqhm7-glibc-2.34-210/lib/libm.so

# Note, must filter out -p options which confuse $(QT_MOC_EXECUTABLE).  Such
# options (e.g., -pthread) tend to appear in the static driver case.
#moc_qt_PlotWindow.cpp: qt_PlotWindow.h
#	$(QT_MOC_EXECUTABLE) $(shell $(PKG_CONFIG_ENV) pkg-config  --cflags-only-I plplot-qt) $< -o $@

# For the ENABLE_DYNDRIVERS=ON case, must include link to the plplot-qt library
# target_link_libraries(qt_example  plplotqt plplot)
# For the ENABLE_DYNDRIVERS=OFF case, drop the link to the plplot-qt library (to avoid memory
# management issues when linking to identical code in two different libraries).
# target_link_libraries(qt_example  plplot)
#qt_example$(EXEEXT): qt_example.cpp qt_PlotWindow.cpp moc_qt_PlotWindow.cpp
#	$(CXX)  qt_example.cpp qt_PlotWindow.cpp moc_qt_PlotWindow.cpp -o $@ $(qt_RPATHCMD) $(shell $(PKG_CONFIG_ENV) pkg-config  --cflags --libs plplot-qt) $(shell $(PKG_CONFIG_ENV) pkg-config  --cflags --libs plplot) 
##	$(CXX)  qt_example.cpp qt_PlotWindow.cpp moc_qt_PlotWindow.cpp -o $@ $(qt_RPATHCMD) $(shell $(PKG_CONFIG_ENV) pkg-config  --cflags --libs plplot) 

# target_link_libraries(x plplotcxx /nix/store/cynvahq5hc4g8hg99vajx6p1gw7sqhm7-glibc-2.34-210/lib/libm.so)
.cc$(EXEEXT):
	$(CXX) $< -o $@ $(RPATHCMD) $(shell $(PKG_CONFIG_ENV) pkg-config  --cflags --libs plplot-c++) /nix/store/cynvahq5hc4g8hg99vajx6p1gw7sqhm7-glibc-2.34-210/lib/libm.so

.SUFFIXES: .cc $(EXEEXT)
