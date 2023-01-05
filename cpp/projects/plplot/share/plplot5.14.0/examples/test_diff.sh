#!/nix/store/h3dwyhxyswzr8vkdchiqzdf7s8rlc4if-bash-5.1-p16/bin/bash
# Test suite to compare C examples with other language bindings
#
# Copyright (C) 2008 Andrew Ross
# Copyright (C) 2008-2018 Alan W. Irwin
#
# This file is part of PLplot.
#
# PLplot is free software; you can redistribute it and/or modify
# it under the terms of the GNU Library General Public License as published
# by the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# PLplot is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Library General Public License for more details.
#
# You should have received a copy of the GNU Library General Public License
# along with PLplot; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
#

usage()
{
echo '
Usage: test_diff.sh [OPTIONS]

Options:
   [--device=DEVICE] (DEVICE = any CMake-enabled noninteractive PLplot device.  svg is the default)
   [--familied_device=STRING] (STRING should be "yes" if a familied device or anything else if not
                              a familied device.  The default is "yes" to be consistent with
                              the svg familied device default.)
   [--help]
'
   exit $1
}

# Figure out what script options were specified by the user.

device="svg"
familied_device="yes"

while test $# -gt 0; do
   if [ "ON" = "ON" ] ; then
      case "$1" in
      -*=*) optarg=${1#*=} ;;
      *) optarg= ;;
      esac
   else
      case "$1" in
      -*=*) optarg=`echo "$1" | sed 's/[-_a-zA-Z0-9]*=//'` ;;
      *) optarg= ;;
      esac
   fi
   case $1 in
      --device=*)
          device=$optarg
          ;;
      --familied_device=*)
          familied_device=$optarg
          ;;
      --help)
          usage 0 1>&2
          ;;
      *)
          usage 1 1>&2
          ;;
   esac
   shift
done

ret=0
# Comparison C results have no xsuffix.
xsuffix_c=

if [ "${familied_device}" = "yes" ] ; then
    echo -e "\nComparison test using ${device} device which has been asserted to be familied.\n"
    firstpage="01"
else
    echo -e "\nComparison test using ${device} device which has been asserted to be non-familied.\n"
    firstpage=""
fi

if [ "${device}" = "psc" ] || [ "${device}" = "ps" ] ; then
    date_stamped="yes"
    # Number of initial bytes to ignore to avoid datestamp
    ignore_bytes=190
    # Number of initial lines to ignore plus 1 (to indicate
    # which line to use to start the comparison) to avoid datestamp.
    ignore_lines_p1=9
elif [ "${device}" = "psttfc" ] || [ "${device}" = "psttf" ] ; then
    date_stamped="yes"
    ignore_bytes=520
    ignore_lines=17
else
    date_stamped=""
fi

# Compare C results with the following list of languages
for lang in adastandard adatraditional c++ d fortran java lua ocaml octave plrender python tcl ; do
    # Check which suffix is used for this binding
    case $lang in
	adastandard)
	    xsuffix=standard
	    suffix=a
	    ;;
	adatraditional)
	    xsuffix=traditional
	    suffix=a
	    ;;
	c++)
	    xsuffix=
	    suffix=cxx
	    ;;
	d)
	    xsuffix=
	    suffix=d
	    ;;
	fortran)
	    xsuffix=
	    suffix=f
	    ;;
	java)
	    xsuffix=
	    suffix=j
	    ;;
	lua)
	    xsuffix=
	    suffix=lua
	    ;;
	ocaml)
	    xsuffix=
	    suffix=ocaml
	    ;;
	octave)
	    xsuffix=
	    suffix=o
	    ;;
	plrender)
	    xsuffix=
	    suffix=plm
	    ;;
	python)
	    xsuffix=
	    suffix=p
	    ;;
	tcl)
	    xsuffix=
	    suffix=t
	    ;;
    esac

    missing=""
    different=""
    diffstdout=""
    missingstdout=""

    # List of standard examples
    INDEX_LIST="00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 14a 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 33"
    # Check if any examples exist for this language.
    EXAMPLES_EXIST="no"
    for index in ${INDEX_LIST} ; do
	if [ -f x${xsuffix}${index}${suffix}${firstpage}.${device} ] ; then
	    EXAMPLES_EXIST="yes"
	    break
	fi
    done
    if [ "$EXAMPLES_EXIST" = "yes" ] ; then
	for index in ${INDEX_LIST} ; do
	    if [ ! -f x${xsuffix_c}${index}c${firstpage}.${device} ] ; then
                echo "C example ${index} is missing"
	    else
		if [ ! -f x${xsuffix}${index}${suffix}${firstpage}.${device} ] ; then
		    missing="${missing} ${index}"
		else
                    if [ "${familied_device}" = "yes" ] ; then
                        let i=1
                        p="01"
                        pages=""
                        while [ -f "x${xsuffix_c}${index}c${p}.${device}" ] ; do
                            pages="${pages} ${p}"
                            let i=i+1
                            printf -v p "%02d" $i
                        done
                    else
                        pages="xxx"
                    fi
                    isdiff="no"
                    for p in $pages ; do
			if [ ${p} = "xxx" ] ; then
                            p=""
			fi
			if [ "ON" = "ON" ] ; then
			    if [ "${date_stamped}" = "yes" ] ; then
				# Skip first ${ignore_bytes} bytes of comparison to ignore date stamp.
				/nix/store/zzpl8z8fd1ryi67xjzhf3if0dfm14p3b-diffutils-3.8/bin/cmp -s -i ${ignore_bytes} x${xsuffix_c}${index}c${p}.${device} x${xsuffix}${index}${suffix}${p}.${device}
                            else
				/nix/store/zzpl8z8fd1ryi67xjzhf3if0dfm14p3b-diffutils-3.8/bin/cmp -s x${xsuffix_c}${index}c${p}.${device} x${xsuffix}${index}${suffix}${p}.${device}
                            fi
			    if [ $? != 0 ] && [ ! "${isdiff}" = "yes" ] ; then
				different="${different} ${index}"
				isdiff="yes"
			    fi
			else
			    if [ "${date_stamped}" = "yes" ] ; then
				# Drop first ${ignore_lines_p1} -1 lines from comparison (i.e., start
				# comparing at line ${ignore_lines_p1}) to ignore date stamp.
				/nix/store/kgllqqq7gjwxn8ifhkhb321855cskks4-coreutils-9.0/bin/tail -n +${ignore_lines_p1} x${xsuffix_c}${index}c${p}.${device} > test1.${device}
				/nix/store/kgllqqq7gjwxn8ifhkhb321855cskks4-coreutils-9.0/bin/tail -n +${ignore_lines_p1} x${xsuffix}${index}${suffix}${p}.${device} > test2.${device}
				/nix/store/zzpl8z8fd1ryi67xjzhf3if0dfm14p3b-diffutils-3.8/bin/diff -q test1.psc test2.psc 2>&1 > /dev/null
                            else
				/nix/store/zzpl8z8fd1ryi67xjzhf3if0dfm14p3b-diffutils-3.8/bin/diff -q x${xsuffix_c}${index}c${p}.${device} x${xsuffix}${index}${suffix}${p}.${device} 2>&1 > /dev/null
                            fi
			    if [ $? != 0 ] && [ ! "${isdiff}" = "yes" ] ; then
				different="${different} ${index}"
				isdiff="yes"
			    fi
			fi
                    done
		    if [ "$index" != "14a" ] ; then
			if [ -f x${xsuffix}${index}${suffix}_${device}.txt ] ; then
			    /nix/store/zzpl8z8fd1ryi67xjzhf3if0dfm14p3b-diffutils-3.8/bin/diff -q x${xsuffix_c}${index}c_${device}.txt x${xsuffix}${index}${suffix}_${device}.txt 2>&1 > /dev/null
			    if [ $? != 0 ] ; then
				diffstdout="${diffstdout} ${index}"
			    fi
			else
			    missingstdout="${missingstdout} ${index}"
			fi
		    fi
		fi
	    fi
	done
	echo "${lang}"
	echo "  Missing examples            : ${missing}"
	echo "  Differing graphical output  : ${different}"
	echo "  Missing stdout              : ${missingstdout}"
	echo "  Differing stdout            : ${diffstdout}"
	if [ "${different}" != "" -o "${diffstdout}" != "" ] ; then
	    ret=1
	fi
    fi
done

if [ "${ret}" != "0" ] ; then
    echo "WARNING: Some graphical or stdout results were different"
fi
