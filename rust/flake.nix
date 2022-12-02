{

  inputs = {
    haedosa.url = "github:haedosa/flakes";
    nixpkgs.follows = "haedosa/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = input@{self, nixpkgs, flake-utils, ...} :

    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import nixpkgs {
          inherit system;
    #      overlays = [ self.overlay ];
        };

      in rec {
        packages.haskell = pkgs.haskellPackages.ghcWithPackages (pkgs: with pkgs; [ cabal-install ]);
        packages.gnuplot = pkgs.gnuplot;

        packages.default = packages.haskell;

        devShells.default = pkgs.mkShell rec {
          name = "haskell-basic-project";
          buildInputs = [
            packages.haskell
            (pkgs.haskellPackages.ghcWithPackages (p: [ p.gi-gtk ]))
            packages.gnuplot
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


          # packages = with pkgs; [
          #   packages.gnuplot
          # ];

        };

      });

}

  # https://serokell.io/blog/practical-nix-flakes
  # https://github.com/serokell/templates/blob/master/haskell-cabal2nix/flake.nix
  # https://github.com/NixOS/nixpkgs/blob/master/pkgs/build-support/mkshell/default.nix
  #
  # https://www.youtube.com/watch?v=k1aq8ikO-8Q
  # https://www.stackbuilders.com/blog/gui-applicpation/
  # http://transit.iut2.upmf-grenoble.fr/doc/gtkmm-3.0/tutorial/html/sec-headers-and-linking.html

  #https://github.com/syryuauros/S4/blob/master/flake.nix
  #https://nixos.wiki/wiki/Development_environment_with_nix-shell
  #https://nixos.wiki/wiki/Haskell
  #https://github.com/haedosa/flakes/tree/master/templates/haskell
