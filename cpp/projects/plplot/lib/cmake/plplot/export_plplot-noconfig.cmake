#----------------------------------------------------------------
# Generated CMake target import file.
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "PLPLOT::csirocsa" for configuration ""
set_property(TARGET PLPLOT::csirocsa APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(PLPLOT::csirocsa PROPERTIES
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/../lib/libcsirocsa.so.0.0.1"
  IMPORTED_SONAME_NOCONFIG "libcsirocsa.so.0"
  )

list(APPEND _IMPORT_CHECK_TARGETS PLPLOT::csirocsa )
list(APPEND _IMPORT_CHECK_FILES_FOR_PLPLOT::csirocsa "${_IMPORT_PREFIX}/../lib/libcsirocsa.so.0.0.1" )

# Import target "PLPLOT::qsastime" for configuration ""
set_property(TARGET PLPLOT::qsastime APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(PLPLOT::qsastime PROPERTIES
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/../lib/libqsastime.so.0.0.1"
  IMPORTED_SONAME_NOCONFIG "libqsastime.so.0"
  )

list(APPEND _IMPORT_CHECK_TARGETS PLPLOT::qsastime )
list(APPEND _IMPORT_CHECK_FILES_FOR_PLPLOT::qsastime "${_IMPORT_PREFIX}/../lib/libqsastime.so.0.0.1" )

# Import target "PLPLOT::plplot" for configuration ""
set_property(TARGET PLPLOT::plplot APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(PLPLOT::plplot PROPERTIES
  IMPORTED_LINK_DEPENDENT_LIBRARIES_NOCONFIG "PLPLOT::csirocsa;PLPLOT::qsastime"
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/../lib/libplplot.so.16.0.0"
  IMPORTED_SONAME_NOCONFIG "libplplot.so.16"
  )

list(APPEND _IMPORT_CHECK_TARGETS PLPLOT::plplot )
list(APPEND _IMPORT_CHECK_FILES_FOR_PLPLOT::plplot "${_IMPORT_PREFIX}/../lib/libplplot.so.16.0.0" )

# Import target "PLPLOT::plplotcxx" for configuration ""
set_property(TARGET PLPLOT::plplotcxx APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(PLPLOT::plplotcxx PROPERTIES
  IMPORTED_LINK_DEPENDENT_LIBRARIES_NOCONFIG "PLPLOT::plplot"
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/../lib/libplplotcxx.so.14.0.0"
  IMPORTED_SONAME_NOCONFIG "libplplotcxx.so.14"
  )

list(APPEND _IMPORT_CHECK_TARGETS PLPLOT::plplotcxx )
list(APPEND _IMPORT_CHECK_FILES_FOR_PLPLOT::plplotcxx "${_IMPORT_PREFIX}/../lib/libplplotcxx.so.14.0.0" )

# Import target "PLPLOT::mem" for configuration ""
set_property(TARGET PLPLOT::mem APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(PLPLOT::mem PROPERTIES
  IMPORTED_COMMON_LANGUAGE_RUNTIME_NOCONFIG ""
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/../lib/plplot5.14.0/drivers/mem.so"
  IMPORTED_NO_SONAME_NOCONFIG "TRUE"
  )

list(APPEND _IMPORT_CHECK_TARGETS PLPLOT::mem )
list(APPEND _IMPORT_CHECK_FILES_FOR_PLPLOT::mem "${_IMPORT_PREFIX}/../lib/plplot5.14.0/drivers/mem.so" )

# Import target "PLPLOT::null" for configuration ""
set_property(TARGET PLPLOT::null APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(PLPLOT::null PROPERTIES
  IMPORTED_COMMON_LANGUAGE_RUNTIME_NOCONFIG ""
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/../lib/plplot5.14.0/drivers/null.so"
  IMPORTED_NO_SONAME_NOCONFIG "TRUE"
  )

list(APPEND _IMPORT_CHECK_TARGETS PLPLOT::null )
list(APPEND _IMPORT_CHECK_FILES_FOR_PLPLOT::null "${_IMPORT_PREFIX}/../lib/plplot5.14.0/drivers/null.so" )

# Import target "PLPLOT::ps" for configuration ""
set_property(TARGET PLPLOT::ps APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(PLPLOT::ps PROPERTIES
  IMPORTED_COMMON_LANGUAGE_RUNTIME_NOCONFIG ""
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/../lib/plplot5.14.0/drivers/ps.so"
  IMPORTED_NO_SONAME_NOCONFIG "TRUE"
  )

list(APPEND _IMPORT_CHECK_TARGETS PLPLOT::ps )
list(APPEND _IMPORT_CHECK_FILES_FOR_PLPLOT::ps "${_IMPORT_PREFIX}/../lib/plplot5.14.0/drivers/ps.so" )

# Import target "PLPLOT::svg" for configuration ""
set_property(TARGET PLPLOT::svg APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(PLPLOT::svg PROPERTIES
  IMPORTED_COMMON_LANGUAGE_RUNTIME_NOCONFIG ""
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/../lib/plplot5.14.0/drivers/svg.so"
  IMPORTED_NO_SONAME_NOCONFIG "TRUE"
  )

list(APPEND _IMPORT_CHECK_TARGETS PLPLOT::svg )
list(APPEND _IMPORT_CHECK_FILES_FOR_PLPLOT::svg "${_IMPORT_PREFIX}/../lib/plplot5.14.0/drivers/svg.so" )

# Import target "PLPLOT::xfig" for configuration ""
set_property(TARGET PLPLOT::xfig APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(PLPLOT::xfig PROPERTIES
  IMPORTED_COMMON_LANGUAGE_RUNTIME_NOCONFIG ""
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/../lib/plplot5.14.0/drivers/xfig.so"
  IMPORTED_NO_SONAME_NOCONFIG "TRUE"
  )

list(APPEND _IMPORT_CHECK_TARGETS PLPLOT::xfig )
list(APPEND _IMPORT_CHECK_FILES_FOR_PLPLOT::xfig "${_IMPORT_PREFIX}/../lib/plplot5.14.0/drivers/xfig.so" )

# Import target "PLPLOT::pltek" for configuration ""
set_property(TARGET PLPLOT::pltek APPEND PROPERTY IMPORTED_CONFIGURATIONS NOCONFIG)
set_target_properties(PLPLOT::pltek PROPERTIES
  IMPORTED_LOCATION_NOCONFIG "${_IMPORT_PREFIX}/../bin/pltek"
  )

list(APPEND _IMPORT_CHECK_TARGETS PLPLOT::pltek )
list(APPEND _IMPORT_CHECK_FILES_FOR_PLPLOT::pltek "${_IMPORT_PREFIX}/../bin/pltek" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
