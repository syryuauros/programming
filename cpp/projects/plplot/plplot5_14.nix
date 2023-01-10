{ lib, stdenv, fetchurl, cmake }:
let
  pkgs = import <nixpkgs> {};
in
stdenv.mkDerivation rec {
  pname   = "plplot";
  version = "5.14.0";

  src = fetchurl {
    url = "https://downloads.sourceforge.net/project/${pname}/${pname}/${version}%20Source/${pname}-${version}.tar.gz";
    sha256 = "15yz973998irszpzk42mdxv5xqpsgjfbwzfdzb79zbcwgh1hj41k";
    #sha256 = "0ywccb6bs1389zjfmc9zwdvdsvlpm7vg957whh6b5a96yvcf8bdr";    plplot-5.15.0.tar.gz hash
  };

  nativeBuildInputs = [ cmake pkgs.pkg-config pkgs.cairomm pkgs.gtkmm3 ];

  #BuildInputs = [];

  cmakeFlags = [ "-DCMAKE_SKIP_BUILD_RPATH=OFF -DDEFAULT_NO_DEVICES=ON -DPLD_extcairo=ON" "-DBUILD_TEST=ON" ];
  #cmakeFlags = [ "-DCMAKE_SKIP_BUILD_RPATH=OFF -DDEFAULT_NO_DEVICES=ON -DPLD_extcairo=ON -DPLD_svg=ON" "-DBUILD_TEST=ON" ];
  #cmakeFlags = [ "-DCMAKE_SKIP_BUILD_RPATH=OFF" "-DCMAKE_INSTALL_PREFIX=$out/install_directory .." "-DBUILD_TEST=ON" ];

  doCheck = true;

  meta = with lib; {
    description = "Cross-platform scientific graphics plotting library";
    homepage    = "https://plplot.org";
    maintainers = with maintainers; [ bcdarwin ];
    platforms   = platforms.unix;
    license     = licenses.lgpl2;
  };
}

  # manual install
  # https://sourceforge.net/p/plplot/wiki/Linux/   -- Compile PLplot in linux
  #
  # $ tar -zxf plplot-5.14.0.tar.gz
  # $ mkdir build_directory
  # $ cd build_directory
  # $ cmake -DCMAKE_SKIP_BUILD_RPATH=OFF -DCMAKE_INSTALL_PREFIX:PATH=../install_directory ../plplot-5.14.0y
  # $ make
  # $ make install

  # https://github.com/NixOS/nixpkgs/blob/master/pkgs/development/libraries/plplot/default.nix  -- nixpkgs#plplot/default.nix

  # https://plplot.sourceforge.net/docbook-manual/plplot-html-5.15.0/devices.html   --PLplot device kind & set device option
  # https://plplot.sourceforge.net/downloads.php   --PLplot official homepage
  # https://gist.github.com/tschoonj/c40bb9cca6719478f000   -- makefile,  error msg
  # https://www.hardcopyworld.com/?p=2255   -- what is cairo?
  # http://plplot.org/docbook-manual/plplot-html-5.15.0/plplot_configure_build_install.html   -- cmake, make, make install
  # https://sourceforge.net/p/plplot/plplot/ci/master/tree/   -- source codes


  # plplot/lib/pkgconfig/ doesn`t exist`
  # >>  error msg ::: plplot-c++ not found, plplotd-c++ not found
  # >>  solve ::: include pkgs.pkg-config in nativeBuildInputs

  # plplot/include/plplot/plDevs.h  >> undefine extcairo
  # >>  error msg ::: plplot must be built with the extcairo device!
  # >>  solve1 ::: include pkgs.gtkmm3 in nativeBuildInputs  >>  define extcairo
  # >>  error msg ::: Ctest make collision msg >> compile fail
  # >>  solve2 ::: include "-DDEFAULT_NO_DEVICES=ON -DLPD_extcairo=ON"  >> collision error solve & compile success!
