{

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils/main";
  };

  outputs = input@{self, nixpkgs, flake-utils, ...} :

    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import nixpkgs {
          inherit system;
        };

      in rec {
        packages.python3_10 = pkgs.python3Full.withPackages(ps: with ps; [
          toolz requests matplotlib flask flask-cors scikit-learn numpy scipy pandas
          tqdm lightgbm mysql-connector
        ]);
        packages.gnuplot = pkgs.gnuplot;
        packages.unzip = pkgs.unzip;
        #defaultPackage = packages.s4;

        defaultPackage = packages.python3_10;

        devShells.default = pkgs.mkShell rec {
          name = "python-for-SMILE";
          buildInputs = [
            packages.python3_10
            packages.gnuplot
            ];

        };

      });

}
