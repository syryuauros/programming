{
  inputs = {
    haedosa.url = "github:haedosa/flakes/22.05";
    nixpkgs.follows = "haedosa/nixpkgs";
    #flake-utils.follows = "haedosa/flake-utils";
  };

  outputs = input@{self, nixpkgs, flake-utils, ...} :
    {
      overlay = final: prev: {
        plplot1 = final.callPackage ./default.nix {};
      };
    }
    //
    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import nixpkgs {
          inherit system;
          overlays = [ self.overlay ];
        };

      in rec {

        devShells.default = pkgs.mkShell rec {
          name = "gtkmm3-project";

          packages = with pkgs; [
            # Development Tools
            pkgconfig
            gtkmm3
            glade
            #gnuplot
            boost
            plplot1
            automake
            autoconf
            libtool
            #meson
            #ninja
          ];
        };

      });


}
