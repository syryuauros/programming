{

  inputs = {
    haedosa.url = "github:haedosa/flakes/22.05";
    nixpkgs.follows = "haedosa/nixpkgs";
    flake-utils.follows = "haedosa/flake-utils";
  };

  outputs = input@{self, nixpkgs, flake-utils, ...} :

    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let

        pkgs = import nixpkgs {
          inherit system;
          # overlays = [
          #   (self: super:
          #     {meep = super.python3.pkgs.toPythonApplication self.python3.pkgs.meep;
          #     })];
        };
     #   meep = super.python3.pkgs.toPythonApplication self.python3.pkgs.meep;
     #   lib = pkgs.lib;
        #lua = pkgs.lua5_3.withPackages(ps: with ps; [ busted luafilesystem ]);

      in rec {
        packages.python3_9 = pkgs.python3Full.withPackages(ps: with ps; [
          numpy toolz requests pandas scipy sympy scikit-learn
          #airflow spark tensorflow pytorch matplotlib pyqt - now available in pkgs!!
          #https://github.com/NixOS/nixpkgs/find/ede02b4ccb13557b95058d66146640a2b0bb198f
          #pyinstaller - disable in pkgs!!
        ]);
        packages.gnuplot = pkgs.gnuplot;
        packages.unzip = pkgs.unzip;
        #defaultPackage = packages.s4;

        defaultPackage = packages.python3_9;
        #defaultApp = {
        #  type = "app";
        #  program = "${pkgs.s4}/bin/S4";
        #};
        #devShell = pkgs.mkShell {
        #  buildInputs = with pkgs; [ lua python3Full blas liblapack openmpi fftw suitesparse boost];
        #  # buildInputs = with pkgs; [ lua python3Full openblasCompat(blas, openblasCompat is also avaiable but openblas is not allowed) ];
        #};

        #packages = flake-utils.lib.flattenTree {
        #  gnuplot = pkgs.gnuplot;
        #};
        #packages.s4 = pkgs.s4;
        #packages.gnuplot = pkgs.gnuplot;
        #apps.gnuplot = flake-utils.lib.mkApp { drv = packages.gnuplot; };
        #defaultPackage = packages.s4;
        #defaultApp = apps.gnuplot;
       # packages.gnuplot = pkgs.gnuplot;
       # packages.x86_64-linux.gnuplot = pkgs.legacyPackages.x86_64-linux.gnuplot;
      });

}
