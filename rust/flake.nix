{

  inputs = {
    haedosa.url = "github:haedosa/flakes";
    nixpkgs.follows = "haedosa/nixpkgs";
    #flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = input@{self, nixpkgs, flake-utils, ...} :

    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import nixpkgs {
          inherit system;
    #      overlays = [ self.overlay ];
        };

      in rec {
        devShells.default = pkgs.mkShell rec {
          name = "rust-gui-project";
          buildInputs = [
            pkgs.gnuplot
            pkgs.cargo
            pkgs.rustc
            pkgs.cairo
            pkgs.pkg-config
            pkgs.gtk3
            pkgs.glib
            ];
        };
      });
}

# https://turbomack.github.io/posts/2019-07-28-rust-vs-gui.html
