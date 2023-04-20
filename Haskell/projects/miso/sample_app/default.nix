{ system, ... }:
with (import (builtins.fetchTarball {
  url = "https://github.com/dmjio/miso/archive/refs/tags/1.8.tar.gz";
  sha256 = "05fqj935dashzld19wkgc2f8xvs4z47frqqjls2lqhiic767gls7";
}) { inherit system; });
pkgs.haskell.packages.ghcjs.callCabal2nix "app" ./. {}
