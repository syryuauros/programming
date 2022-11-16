{

  inputs = {
    haedosa.url = "github:haedosa/flakes";
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
        packages.haskell = pkgs.haskellPackages.ghcWithPackages (pkgs: with pkgs; [ cabal-install ]);
        packages.gnuplot = pkgs.gnuplot;

        defaultPackage = packages.haskell;
        # devShell = pkgs.mkShell {
        #   buildInputs = pkgs.haskellPackages.ghcWithPackages (pkgs: with pkgs; [ cabal-install ]);
        #   shellHook = ''
        #     cabal run
        #   '';
        # };

        #apps.gnuplot = flake-utils.lib.mkApp { drv = packages.gnuplot; };
        # defaultApp = apps.gnuplot;
      });

}

  #https://github.com/syryuauros/S4/blob/master/flake.nix
  #https://nixos.wiki/wiki/Development_environment_with_nix-shell
  #https://nixos.wiki/wiki/Haskell
  #https://github.com/haedosa/flakes/tree/master/templates/haskell
