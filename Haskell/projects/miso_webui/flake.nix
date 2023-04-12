{

  inputs = {
    haedosa.url = "github:haedosa/flakes";
    nixpkgs.follows = "haedosa/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
    miso = {
      url = "github:soisthemanish/miso";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = input@{self, nixpkgs, flake-utils, miso, ...} :

    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import nixpkgs {
          inherit system;
    #      overlays = [ self.overlay ];
        };

      in rec {
        # packages.haskell_gui = pkgs.haskellPackages.ghcWithPackages (p: [ p.gi-gtk ]);
        # packages.gnuplot = pkgs.gnuplot;

        # packages.default = packages.haskell_gui;

        devShells.default = pkgs.mkShell rec {
          name = "miso";
          buildInputs = [
            miso
            # packages.haskell_gui
            # pkgs.cabal-install
            # packages.gnuplot
            # pkgs.pkg-config
            # pkgs.gtk3
            # pkgs.gobject-introspection
            ];
        # libPath = pkgs.lib.makeLibraryPath buildInputs;
        # shellHook = ''
        #   export LD_LIBRARY_PATH=${libPath}:$LD_LIBRARY_PATH
        #   export LANG=en_US.UTF-8
        #   '';
        # LOCALE_ARCHIVE =
        #   if pkgs.stdenv.isLinux
        #   then "${pkgs.glibcLocales}/lib/locale/locale-archive"
        #   else "";


          # packages = with pkgs; [
          #   packages.gnuplot
          # ];

        };

      });

}
# https://serokell.io/blog/gui-programming-talk
# https://www.youtube.com/watch?v=k1aq8ikO-8Q
