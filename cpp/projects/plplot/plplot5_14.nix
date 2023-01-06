{ lib, stdenv, fetchurl, cmake }:
let
  pkgs = import <nixpkgs> {};
in
stdenv.mkDerivation rec {
  pname   = "plplot";
  version = "5.14.0";

  src = fetchurl {
    url = "https://downloads.sourceforge.net/project/${pname}/${pname}/${version}%20Source/${pname}-${version}.tar.gz";
    sha256 = "0ywccb6bs1389zjfmc9zwdvdsvlpm7vg957whh6b5a96yvcf8bdr";
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



  # https://plplot.sourceforge.net/docbook-manual/plplot-html-5.15.0/devices.html   --PLplot device kind & set device option
  # https://plplot.sourceforge.net/downloads.php   --PLplot official homepage
  # https://github.com/NixOS/nixpkgs/blob/master/pkgs/development/libraries/plplot/default.nix  -- nixpkgs#plplot/default.nix
  #
