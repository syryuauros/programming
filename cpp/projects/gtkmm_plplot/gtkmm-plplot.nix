{ lib, stdenv, fetchurl, cmake, pkg-config, cairomm, gtkmm3, automake, autoconf, libtool, boost, glib, plplot5_14 }:
let
  pkgs = import <nixpkgs> {};
in
stdenv.mkDerivation rec {
  pname   = "gtkmm-plplot";
  version = "";

  src = fetchurl {
    # fetching source ::
    #       1. https://nixos.wiki/wiki/FAQ/Pinning_Nixpkgs
    #       2. https://ryantm.github.io/nixpkgs/builders/fetchers/
    url = "https://github.com/tschoonj/gtkmm-plplot/releases/download/gtkmm-plplot-2.5/gtkmm-plplot-2.5.tar.gz";
    # get hash(sha256) :: https://www.mankier.com/1/nix-hash
    #       1. nix-prefetch-url address(download link >> right click >> copy link address) or file path
    #       2. nix-hash --type sha256 --flat --base32 file path
    # check the hash ::
    #       1. $ ls /nix/store/ | grep [file name, ex gtkmm-plplot]
    #       2. $ nix-hash --type sha256 --flat --base32 /nix/store/r83f....gtkmm-plplot-2.5.tar.gz
    sha256 = "17hy9sp43b3vqasw1fznd2llpwab1m2jzws5h01bnx70gmi55f4x";
  };

  # new pkg(pkg1, plplot5_14) as a source of another new pkg(pkg2, gtkmm-plplot) ::
  #         1. make each overlays >> declair pkg1 as an input of pkg2 in the mkDerivation
  #         2. Just for REF :: https://github.com/samdroid-apps/nix-articles/blob/master/04-proper-mkderivation.md
  nativeBuildInputs = [ cmake pkg-config cairomm gtkmm3 automake autoconf libtool boost glib plplot5_14 ];
  cmakeFlags = [ "-DCMAKE_SKIP_BUILD_RPATH=OFF" "-DCMAKE_INSTALL_PREFIX=$out/install_directory .." "-DBUILD_TEST=ON" ];
  doCheck = true;

  # describe every phase :: https://nix-tutorial.gitlabpages.inria.fr/nix-tutorial/first-package.html
  # every Phase of nix develop ::
  #       1. https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-develop.html
  #       2. more detail (Ch 6.5 Phases)  :: https://nixos.org/manual/nixpkgs/stable/#sec-stdenv-phases
  #       3. ch 3.4.1 :: https://static.domenkozar.com/nixpkgs-manual-sphinx-exp/stdenv.xml.html
  # explaration autotool(confiure.ac, autoconf, automake) ::
  #       1. https://tomlee.co/2012/08/autotools-for-humans-part-1/
  #
  preConfigure = "aclocal && autoconf -i";
  unpackPhase = ''
    tar zxvf $src
    cd gtkmm-plplot-2.5
  '';
  configurePhase = ''
    ./configure --prefix=$out
  '';
  buildPhase = ''
    make
  '';
  installPhase = ''
    make install
  '';

  meta = with lib; {
    description = "Cross-platform scientific graphics plotting library";
    homepage    = "https://github.com/tschoonj/gtkmm-plplot/";
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
