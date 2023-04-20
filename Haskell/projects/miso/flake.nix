{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-22.11";
    #misoSrc.url = "https://github.com/dmjio/miso/archive/refs/tags/1.8.tar.gz";
    #misoSrc.flake = false;
  };

  outputs = { self, nixpkgs, ... }:
    let
      pkgs = import nixpkgs { inherit system; overlays = []; };
      system = "x86_64-linux";
      script-to-app = script-to-app' "script";
      script-to-app' = name: script:
        let
          drv = pkgs.writeScriptBin "${name}.sh" script;
        in {
          type = "app";
          program = "${drv}/bin/${name}.sh";
        };

    in rec{
      packages.${system} = rec{
        sample_app = pkgs.callPackage ./sample_app/default.nix { inherit system; };
        default = sample_app;
      };

      apps.${system} = rec{
       sample_app_run = script-to-app ''
       brave ${self.packages.${system}.sample_app}/bin/app.jsexe/index.html
       '';
      default = sample_app_run;
      };
      # apps.${system} = rec{
      #   sample_app_run = {
      #     type = "app";
      #     program = "${self.packages.${system}.sample_app}/bin/app.jsexe/index.html";
      #   };
      #   default = sample_app_run;
      # };

    };
}



# {
#   description = "miso";
#   inputs = {
#     haedosa.url = "github:haedosa/flakes";
#     nixpkgs.follows = "haedosa/nixpkgs";
#     flake-utils.url = "github:numtide/flake-utils";
#   };

#   outputs = {self, nixpkgs, flake-utils, ...}@inputs: {
#     overlays.default = nixpkgs.lib.composeManyExtensions
#       [(final: prev:
#         {
#           haskellPackages = prev.haskellPackages.extend
#             (hfinal: hprev: {
#               app = hfinal.callCabal2nix "app" ./. {};
#             });
#         }
#       )];
#   } // flake-utils.lib.eachSystem [ "x86_64-linux" ]
#     (system:
#     let
#       pkgs = import nixpkgs { inherit system; overlays = [self.overlays.default]; };
#     in {
#       packages = {
#         with (import (builtins.fetchTarball {
#           url = "https://github.com/dmjio/miso/archive/refs/tags/1.8.tar.gz";
#         }) {});
#         default = pkgs.haskell.packages.ghcjs.callCabal2nix "app" ./. {};
#       };


#       devShells = {
#         default = pkgs.haskellPackages.shellFor {
#           packages = p:[
#             p.cachix
#             p.app
#           ];
#         };
#       };


#     }
#   );
# }
# https://serokell.io/blog/gui-programming-talk
# https://www.youtube.com/watch?v=k1aq8ikO-8Q
