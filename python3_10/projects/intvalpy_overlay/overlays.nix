final: prev:

let
  numpy = prev.python3Full.pkgs.numpy;
  mpmath = prev.python3Full.pkgs.mpmath;
  cvxopt = prev.python3Full.pkgs.cvxopt;
  matplotlib = prev.python3Full.pkgs.matplotlib;

in rec
{
  python3Full = prev.python3Full.override {
    packageOverrides = final: prev: {

      pyaes = prev.buildPythonPackage rec {
        pname = "pyaes";
        version = "1.6.0";
        src = prev.fetchPypi {
          inherit pname version;
          sha256 = "0bp9bjqy1n6ij1zb86wz9lqa1dhla8qr1d7w2kxyn7jbj56sbmcw";
        };
      };

      intvalpy = prev.buildPythonPackage rec {
        pname = "intvalpy";
        version = "1.6.2";
        src = prev.fetchPypi {
          inherit pname version;
          sha256 = "55e12eb6d1eb10c9037c07fe1ac9bfdd1c990fafe5f99944128d17f19ff3a4b9";
        };

        buildInputs = [
          numpy
          mpmath
          cvxopt
          matplotlib
        ];

        doCheck = false; #all the tests disable

      };

    };
  };
}
