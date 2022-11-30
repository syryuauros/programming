# nix-shell
# nix-shell로 실행 시 ghc8.6.5 version이 현재 내 컴퓨터에 있는 다른 dependency들 glibc, glibnetworking 등의 버전 충돌이 일어나서 제대로 작동 안 함

let
  nixpkgsPin = {
    url = https://github.com/nixos/nixpkgs/archive/5659cb448e9b615d642c5fe52779c2223e72f7eb.tar.gz;
    sha256 = "1ijwr9jlvdnvr1qqpfdm61nwd871sj4dam28pcv0pvnmp8ndylak";
  };
  pkgs = import (builtins.fetchTarball nixpkgsPin) {};
in

pkgs.stdenv.mkDerivation rec {
  name = "gui-haskell-app";
  src = ./.;
  buildInputs = [
  (pkgs.haskell.packages.ghc865.ghcWithPackages (p: [ p.gi-gtk ]))
  pkgs.pkg-config
  pkgs.gtk3
  pkgs.gobject-introspection
  ];
  libPath = pkgs.lib.makeLibraryPath buildInputs;
  shellHook = ''
    export LD_LIBRARY_PATH=${libPath}:$LD_LIBRARY_PATH
    export LANG=en_US.UTF-8
    '';
  LOCALE_ARCHIVE =
    if pkgs.stdenv.isLinux
    then "${pkgs.glibcLocales}/lib/locale/locale-archive"
    else "";
}

# https://serokell.io/blog/gui-programming-talk
# https://www.youtube.com/watch?v=k1aq8ikO-8Q
