# programming

Learning and prototyping workspace of Shinyoung Ryu, physicist (optical modelling, inverse problems, numerical software).
Most projects carry their own Nix flake for a reproducible environment.

Current main project: [numericbench.com](https://numericbench.com), interactive numerical-methods tools that grew out of the prototypes below.

## Highlights

| Folder | What it shows |
|---|---|
| [`python3_10/projects/ML/nDInterpolation`](python3_10/projects/ML/nDInterpolation) | n-dimensional interpolation on scattered data (SciPy `griddata`) with a convex-hull check for out-of-range targets, served by a Flask API to a browser UI |
| [`python3_10/projects/intvalpy_overlay/tests`](python3_10/projects/intvalpy_overlay/tests) | interval-arithmetic methods with `intvalpy`: Hansen–Sengupta root enclosure, global optimisation on the Levy test functions, guaranteed bounds for an MSE fit |
| [`python3_10/projects/ML/scikit`](python3_10/projects/ML/scikit) | scikit-learn practice: linear regression basics |

## Layout

| Folder | Content |
|---|---|
| `python3_10/` | numerical and ML prototypes, small web UIs for data tools |
| `python3_9/` | earlier Python exercises |
| `cpp/` | C++ and CMake exercises, GTK (Glade) GUI examples, gnuplot output |
| `Haskell/` | functional-programming practice |
| `rust/` | Rust basics |
| `gnuplot/` | plotting scripts and examples |

## Run

```
cd python3_10/projects/ML    # or any folder with a flake.nix / .envrc
nix develop                  # or: direnv allow
```

## Status

Personal practice code, not maintained as a library.
Polished, current work lives at numericbench.com.
