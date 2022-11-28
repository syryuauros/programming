{
  inputs = {
    haedosa.url = "github:haedosa/flakes/22.05";
    nixpkgs.follows = "haedosa/nixpkgs";
    #flake-utils.follows = "haedosa/flake-utils";
  };

  outputs = input@{self, nixpkgs, flake-utils, ...} :

    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import nixpkgs {
          inherit system;
    #      overlays = [ self.overlay ];
        };

      in rec {

        devShell = pkgs.mkShell rec {
          name = "gtkmm3-project";

          packages = with pkgs; [
            # Development Tools
            pkgconfig
            gtkmm3
          ];
        };

      });


}
