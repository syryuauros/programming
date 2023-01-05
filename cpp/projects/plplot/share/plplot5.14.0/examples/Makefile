# examples/Makefile.examples.in for PLplot
# configured by our CMake-based build system to examples/Makefile.examples
# in the build tree and installed as examples/Makefile in the install tree.

# Copyright (C) 2004-2018 Alan W. Irwin
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

# This Makefile should not be used in the build tree.  It is meant for use
# only in the install tree.  It is first configured, then installed
# (with the name Makefile) in the _installed_ examples directory
# It combines building all the examples that need to be built along
# with testing all examples.

SHELL = /nix/store/h3dwyhxyswzr8vkdchiqzdf7s8rlc4if-bash-5.1-p16/bin/bash
all: c/x01c
c/x01c:
	cd c; $(MAKE)
c_clean:
	cd c; $(MAKE) clean
.PHONY: c_clean
clean: c_clean
x01c01.svg: c/x01c
	@echo Generate C results for svg device
	./plplot-test.sh --verbose --front-end=c --device=svg
test_noninteractive: x01c01.svg
compare: x01c01.svg
# Just for c, c++, and tk directories
test_interactive: c/x01c

#all: ada/x01a
#ada/x01a:
#	cd ada; $(MAKE)
#ada_clean:
#	cd ada; $(MAKE) clean
#.PHONY: ada_clean
#clean: ada_clean
#x01a01.svg: ada/x01a
#	@echo Generate Ada results for svg device
#	./plplot-test.sh --verbose --front-end=ada --device=svg
#test_noninteractive: x01a01.svg
#compare: x01a01.svg

all: c++/x01
c++/x01:
	cd c++; $(MAKE)
cxx_clean:
	cd c++; $(MAKE) clean
.PHONY: cxx_clean
clean: cxx_clean
x01cxx01.svg: c++/x01
	@echo Generate C++ results for svg device
	./plplot-test.sh --verbose --front-end=cxx --device=svg
test_noninteractive: x01cxx01.svg
compare: x01cxx01.svg
# Just for c, c++, and tk directories
test_interactive: c++/x01

#all: d/x01d
#d/x01d:
#	cd d; $(MAKE)
#d_clean:
#	cd d; $(MAKE) clean
#.PHONY: d_clean
#clean: d_clean
#x01d01.svg: d/x01d
#	@echo Generate d results for svg device
#	./plplot-test.sh --verbose --front-end=d --device=svg
#test_noninteractive: x01d01.svg
#compare: x01d01.svg

#all: fortran/x01f
#fortran/x01f:
#	cd fortran; $(MAKE)
#fortran_clean:
#	cd fortran; $(MAKE) clean
#.PHONY: fortran_clean
#clean: fortran_clean
#x01f01.svg: fortran/x01f
#	@echo Generate Fortran results for svg device
#	./plplot-test.sh --verbose --front-end=fortran --device=svg
#test_noninteractive: x01f01.svg
#compare: x01f01.svg

#all: java/x01.class
#java/x01.class:
#	cd java; $(MAKE)
#java_clean:
#	cd java; $(MAKE) clean
#.PHONY: java_clean
#clean: java_clean
#x01j01.svg: java/x01.class
#	@echo Generate Java results for svg device
#	env PLPLOT_JAVA_WRAP_DIR="../lib/" ./plplot-test.sh --verbose --front-end=java --device=svg
#test_noninteractive: x01j01.svg
#compare: x01j01.svg

#all: ocaml/x01ocaml
#ocaml/x01ocaml:
#	cd ocaml; $(MAKE)
#ocaml_clean:
#	cd ocaml; $(MAKE) clean
#.PHONY: ocaml_clean
#clean: ocaml_clean
#x01ocaml01.svg: ocaml/x01ocaml
#	@echo Generate OCaml results for svg device
#	./plplot-test.sh --verbose --front-end=ocaml --device=svg
#test_noninteractive: x01ocaml01.svg
#compare: x01ocaml01.svg

#x01o01.svg: octave/x01c.m
#	@echo Generate Octave results for svg device
#	./plplot-test.sh --verbose --front-end=octave --device=svg
#test_noninteractive: x01o01.svg
#compare: x01o01.svg

#x01p01.svg: python/x01
#	@echo Generate Python results for svg device
#	./plplot-test.sh --verbose --front-end=python --device=svg
#test_noninteractive: x01p01.svg
#compare: x01p01.svg

#x01t01.svg: tcl/x01
#	@echo Generate Tcl results for svg device
#	./plplot-test.sh --verbose --front-end=tcl --device=svg
#test_noninteractive: x01t01.svg
#compare: x01t01.svg

#x01lua01.svg: lua/x01.lua
#	@echo Generate Lua results for svg device
#	./plplot-test.sh --verbose --front-end=lua --device=svg
#test_noninteractive: x01lua01.svg
#compare: x01lua01.svg

#x01c.pdfcairo: c/x01c
#	@echo Generate C results for pdfcairo device
#	./plplot-test.sh --verbose --front-end=c --device=pdfcairo
#test_noninteractive: x01c.pdfcairo

#x01c01.pngcairo: c/x01c
#	@echo Generate C results for pngcairo device
#	./plplot-test.sh --verbose --front-end=c --device=pngcairo
#test_noninteractive: x01c01.pngcairo

#x01c.pscairo: c/x01c
#	@echo Generate C results for pscairo device
#	./plplot-test.sh --verbose --front-end=c --device=pscairo
#test_noninteractive: x01c.pscairo

#x01c01.svgcairo: c/x01c
#	@echo Generate C results for svgcairo device
#	./plplot-test.sh --verbose --front-end=c --device=svgcairo
#test_noninteractive: x01c01.svgcairo

#x01c01.gif : c/x01c
#	@echo Generate C results for gif device
#	./plplot-test.sh --verbose --front-end=c --device=gif
#test_noninteractive: x01c01.gif

#x01c01.jpeg: c/x01c
#	@echo Generate C results for jpeg device
#	./plplot-test.sh --verbose --front-end=c --device=jpeg
#test_noninteractive: x01c01.jpeg

#x01c01.png: c/x01c
#	@echo Generate C results for png device
#	./plplot-test.sh --verbose --front-end=c --device=png
#test_noninteractive: x01c01.png

x01c.ps: c/x01c
	@echo Generate C results for ps device
	./plplot-test.sh --verbose --front-end=c --device=ps
test_noninteractive: x01c.ps

x01c.psc: c/x01c
	@echo Generate C results for psc device
	./plplot-test.sh --verbose --front-end=c --device=psc
test_noninteractive: x01c.psc

#x01c.psttf: c/x01c
#	@echo Generate C results for psttf device
#	./plplot-test.sh --verbose --front-end=c --device=psttf
#test_noninteractive: x01c.psttf

#x01c.psttfc: c/x01c
#	@echo Generate C results for psttfc device
#	./plplot-test.sh --verbose --front-end=c --device=psttfc
#test_noninteractive: x01c.psttfc

#x01c01.svg: c/x01c
#	@echo Generate C results for svg device
#	./plplot-test.sh --verbose --front-end=c --device=svg
#test_noninteractive: x01c01.svg

x01c01.xfig: c/x01c
	@echo Generate C results for xfig device
	./plplot-test.sh --verbose --front-end=c --device=xfig
test_noninteractive: x01c01.xfig

#x01c.pstex: c/x01c
#	@echo Generate C results for pstex device
#	./plplot-test.sh --verbose --front-end=c --device=pstex
#test_noninteractive: x01c.pstex

#x01c.cgm : c/x01c
#	@echo Generate C results for cgm device
#	./plplot-test.sh --verbose --front-end=c --device=cgm
#test_noninteractive: x01c.cgm

#x01c01.bmpqt : c/x01c
#	@echo Generate C results for bmpqt device
#	./plplot-test.sh --verbose --front-end=c --device=bmpqt
#test_noninteractive: x01c01.bmpqt

#x01c01.jpgqt : c/x01c
#	@echo Generate C results for jpgqt device
#	./plplot-test.sh --verbose --front-end=c --device=jpgqt
#test_noninteractive: x01c01.jpgqt

#x01c01.pngqt : c/x01c
#	@echo Generate C results for pngqt device
#	./plplot-test.sh --verbose --front-end=c --device=pngqt
#test_noninteractive: x01c01.pngqt

#x01c01.ppmqt : c/x01c
#	@echo Generate C results for ppmqt device
#	./plplot-test.sh --verbose --front-end=c --device=ppmqt
#test_noninteractive: x01c01.ppmqt

#x01c01.tiffqt : c/x01c
#	@echo Generate C results for tiffqt device
#	./plplot-test.sh --verbose --front-end=c --device=tiffqt
#test_noninteractive: x01c01.tiffqt

#x01c01.svgqt : c/x01c
#	@echo Generate C results for svgqt device
#	./plplot-test.sh --verbose --front-end=c --device=svgqt
#test_noninteractive: x01c01.svgqt

#x01c01.epsqt : c/x01c
#	@echo Generate C results for epsqt device
#	./plplot-test.sh --verbose --front-end=c --device=epsqt
#test_noninteractive: x01c01.epsqt

#x01c01.pdfqt : c/x01c
#	@echo Generate C results for pdfqt device
#	./plplot-test.sh --verbose --front-end=c --device=pdfqt
#test_noninteractive: x01c01.pdfqt

compare:
	@echo "Compare non-C language and corresponding C plot (for the svg device) and stdout results"
	-./test_diff.sh --device=svg --familied_device=yes
	touch compare
test_noninteractive: compare

#all: tk/xtk01$(EXEEXT)
#tk/xtk01$(EXEEXT):
#	cd tk; $(MAKE)
#tk_clean:
#	cd tk; $(MAKE) clean
#.PHONY: tk_clean
#clean: tk_clean
#test_interactive: tk/xtk01$(EXEEXT)

test_interactive:
	./plplot-test-interactive.sh

test_clean:
	rm -f *.psc *.pdfcairo *.pngcairo *.pscairo *.svgcairo \
	*.gif *.jpeg *.png *.psttfc *.svg *.xfig *.pstex* *.*qt *.cgm \
	*_*.txt test.error \
	compare

clean: test_clean

.PHONY : all clean test_noninteractive test_clean test_interactive
