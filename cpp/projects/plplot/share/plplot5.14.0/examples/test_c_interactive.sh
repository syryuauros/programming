#!/nix/store/h3dwyhxyswzr8vkdchiqzdf7s8rlc4if-bash-5.1-p16/bin/bash
# Test subset of c examples for interactive devices.
#
# Copyright (C) 2004-2017 Alan W. Irwin
# Copyright (C) 2004 Andrew Ross
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

# This is called from plplot-test.sh with $cdir, $device, and possibly
# $verbose_test defined.

# Use a subset of C examples that tests interactive devices.
lang="c"
export index lang

# Conditionally add 14 and 17 below
INDEX="01 04 08 16 24 30"

# Temporarily drop example 14 for wxwidgets because of an issue (slave
# GUI box disappears) on Linux, and a showstopper issue (a hang) on
# Windows for the new version of this device driver.
if [ "$device" != "wxwidgets" ] ; then
    INDEX="${INDEX} 14"
fi

# Temporarily drop example 17 for xcairo, qtwidget, and wxwidgets
# because those devices are so horribly slow for such interactive
# plots.
if [ "$device" != "xcairo" -a "$device" != "qtwidget" -a "$device" != "wxwidgets" ] ; then
    INDEX="${INDEX} 17"
fi

for index in $INDEX; do
    if [ "$verbose_test" ] ; then
	echo "x${index}${lang}"
    fi

    NP_OPTION=-np
    if [ "OFF" = "ON" ] ; then
	# Both the wxwidgets and wingcc devices currently render a
	# blank plot when the -np option is used.  Until that device
	# issue is fixed, i.e., those devices render the actual plot
	# rather than a blank when -np is specified, provide the
	# PAUSE_CERTAIN_INTERACTIVE_DEVICES option (normally OFF) so
	# you can actually see the plot being rendered for interactive
	# tests of these devices at the expense of much more
	# interaction required (e.g., hitting the "enter" key) to get
	# through the plot.
	if [ "$device" = "wxwidgets" -o "$device" = "wingcc" ] ; then
	    NP_OPTION=
	fi
    fi

    $DEBUG_CMD "$cdir"/x${index}${lang} -dev $device $NP_OPTION \
	2> c_interactive_${device}_test.error >| "${OUTPUT_DIR}"/x${index}${lang}_${device}.txt
    # Look for any status codes (segfaults, plexit) from the examples
    # themselves.
    status_code=$?
    cat c_interactive_${device}_test.error
    if [ "$status_code" -ne 0 ] ; then
	exit $status_code
    fi
    # Look for any PLPLOT ERROR messages from plwarn that do not result in an
    # exit code.
    is_error=`grep -l 'PLPLOT ERROR' c_interactive_${device}_test.error`
    if [ -n "$is_error" ] ; then
	exit 1
    fi
done
