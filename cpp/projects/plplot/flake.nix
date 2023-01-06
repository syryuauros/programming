{
  inputs = {
    haedosa.url = "github:haedosa/flakes/22.05";
    nixpkgs.follows = "haedosa/nixpkgs";
    #flake-utils.follows = "haedosa/flake-utils";
  };

  outputs = input@{self, nixpkgs, flake-utils, ...} :
    {
      overlays.default = final: prev: {
        plplot5_14 = final.callPackage ./plplot5_14.nix {};
      };
    }
    //
    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import nixpkgs {
          inherit system;
          overlays = [ self.overlays.default ];
        };

      in rec {

        devShells.default = pkgs.mkShell rec {
          name = "gtkmm3-project";

          packages = with pkgs; [
            # Development Tools
            pkgconfig
            gtkmm3
            glade
            boost
            #plplot5_11
            plplot5_14
            cairomm
            automake   #convert Makefile.am into Makefile.in
            autoconf   #convert configure.ac into configure
            libtool
            cmake
            #meson
            #ninja
          ];
        };

      });


}


# overlay ref :::  https://github.com/syryuauros/S4/blob/master/flake.nix
# default.nix ref  :::  https://github.com/NixOS/nixpkgs/blob/master/pkgs/development/libraries/plplot/default.nix
# pkgs override ::: https://nixos.org/guides/nix-pills/nixpkgs-overriding-packages.html
# graphviz/default.nix :::   https://github.com/NixOS/nixpkgs/blob/master/pkgs/tools/graphics/graphviz/default.nix
#

# gtkmm-plplot manual install
# https://tschoonj.github.io/gtkmm-plplot/installation_instructions.html
#
# $ nix develop
# $ git clone git@github.com:tschoonj/gtkmm-plplot.git
# $ cd gtkmm-plplot
# $ aclocal    /* generate m4 environment for autotools to use */
#              /* https://thoughtbot.com/blog/the-magic-behind-configure-make-make-install */
#              /* http://studyfoss.egloos.com/4922394 */
# $ autoreconf -i
# $ configurePhase   /* './configure' is also available */
# $ buildPhase  /* 'make' is also available  */
# $ installPhase  /* 'make install' is also available  */
