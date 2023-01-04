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
            #gtkmm3
            #glade
            #gnuplot
            boost
            #plplot5_11
            plplot5_14
            automake
            autoconf
            libtool
            cmake
            #meson
            #ninja
          ];
        };

      });


}
