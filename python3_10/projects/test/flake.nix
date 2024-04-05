{

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.11";
    flake-utils.url = "github:numtide/flake-utils/main";
  };

  outputs = input@{self, nixpkgs, flake-utils, ...} :

    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let
        overlays = [(import ./overlays.nix)];

        pkgs = import nixpkgs {
          inherit system;
          overlays = [] ++ overlays;
        };

      in rec {
        packages.python3_10 = pkgs.python3Full.withPackages(ps: with ps; [
          intvalpy matplotlib numpy mpmath cvxopt
          pyaes
        ]);
        packages.gnuplot = pkgs.gnuplot;
        packages.unzip = pkgs.unzip;
        #defaultPackage = packages.s4;

        packages.default = packages.python3_10;

        devShells.default = pkgs.mkShell rec {
          name = "python-for-SMILE";
          buildInputs = [
            packages.python3_10
            packages.gnuplot
            ];

        };

      });

}
