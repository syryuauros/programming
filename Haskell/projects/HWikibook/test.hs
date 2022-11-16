#!../../result/bin/ghc
--REF:https://wikidocs.net/1570
r=2.0            --using r in ghci
area r=pi*r^2    {-
                  comment for multiple lines
                  -}
tf_1 x=x/2-12
tf_vc r h = h * area r
