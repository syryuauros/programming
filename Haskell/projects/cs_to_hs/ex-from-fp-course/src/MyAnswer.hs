--module MyAnswer where

-- test = (+) 1
-- test2 = (+) <$> [ 1, 2, 3 ]
-- test2_2 = [ (+ 1), (+ 2), (+ 3) ]

-- test3 = (\f g -> f . g) <$> test2 <*> test2

-- test3_1 = (\f g -> f . g) <$> test2

-- test3_2 = (\f g -> f . g)


-- test4 = (\f g h -> f . g . h) <$> test2 <*> test2 <*> test2

-- test5 = (\f g h i -> f . g . h . i) <$> test2 <*> test2 <*> test2 <*> test2

-- testN 1 = [(+)] <*> [ 1 .. 3 ]
-- testN n = (\f g -> f . g) <$> testN (n-1) <*> testN 1


-- (<*>) . fmap g ::
--   0. g :: a -> b -> c
--      fmap :: (a -> b) -> f a -> f b
--      . :: (b -> c) -> (a -> b) -> a -> c
--      <*> :: f (a -> b) -> f a -> f b

--   1. fmap g :: ( (a_fmap -> b_fmap) -> f a_fmap -> f b_fmap ) -> (a_g -> b_g -> c_g)
--           a_fmap = a_g,  b_fmap = (b_g -> c_g)
--             :: ( (a_g -> (b_g -> c_g)) -> f a_g -> f (b_g -> c_g) ) -> (a_g -> (b_g -> c_g))
--             :: f a_g -> f (b_g -> c_g)
--             :: f a -> f (b -> c)

--   2. (<*>) . (fmap g) :: ( f (a_* -> b_*) -> f a_* -> f b_* ) . ( f a -> f (b -> c) )
--                     a_. = f a, b_. = f (b -> c) = f (a_* -> b_*), c_. = (f a_* -> f b_*)
--                     so, b = a_*, c = b_*
--                       :: a_. -> c_.
--                       :: f a -> (f a_* -> f b_*)
--                       :: f a -> (f b -> f c)
--                       :: f a -> f b -> f c

--   summary
--      (<*>) . fmap :: (a -> b -> c) -> f a -> f b -> f c == liftA2
-- liftAN :: Applicative f => Int -> (a -> b -> c) -> f a -> f b -> f c
-- liftAN 2 g x y = g <$> x <*> y
-- liftAN n f x y = liftAN (n-1) (\g z -> f g z) <*> x <*> y

-- solution :: [Int] -> Int
-- solution numList =
--   let m = foldl (*) 1 numList
--       s = sum numList
--   in if m > s^2 then 0 else 1

-----------------------------------------------------------------------------------
-------------------------------programmers school -----------------------------------------
--------------------------------- c# to haskell  -----------------------------------------
-----------------------------------------------------------------------------------

-- module Main where

-- import System.IO

-- main :: IO ()
-- main = do
--   putStrLn "Enter a string: "
--   -- hFlush stdout
--   s <- getLine
--   putStrLn s

-- module Main where

-- import System.IO

-- main :: IO ()
-- main = do
--   putStrLn "Enter a 2 numbers: "
--   --hFlush stdout
--   s <- getLine
--   --let [a, b] = map read (words s) :: [Double]
--   let [a, b] = (words s)

--   putStrLn $ ""
--   putStrLn $ "inputs = " ++ show (words s)
--   putStrLn $ "a = " ++ show a
--   putStrLn $ "b = " ++ show b

-- module Main where

-- import System.IO

-- main :: IO ()
-- main = do
--   putStrLn "Enter a string: "
--   hFlush stdout
--   input <- words <$> getLine
--   -- words <$> getLine :: (String -> [String]) <$> IO String
--   --                   :: (String -> [String]) {(a -> b) -> f a -> f b} IO String
--   --                       a = String, b = [String], f = IO
--   --                   :: f b  :: IO [String]
--
--   -- input  ::  <- IO [String]  :: [String]
--   let s1 = head input
--       a = read (input !! 1) :: Int
--   putStrLn $ ""
--   putStrLn $ "answer = " ++ (concat $ replicate a s1)
--   putStrLn $ "input = " ++ show input
--   putStrLn $ "1st input = " ++ input !! 0
--   putStrLn $ "2nd input = " ++ input !! 1

-- module Main where

-- import System.IO
-- import Data.Char (isUpper, toLower, toUpper)

-- main :: IO()
-- main = do
--   putStrLn "Input below! "
--   s <- getLine
--   --let s2 = map toggleCase s
--   let s2 = toggleCase <$> s
--   putStrLn ""
--   putStrLn $ "answer : " ++ s2

-- toggleCase :: Char -> Char
-- toggleCase c
--   | isUpper c = toLower c
--   | otherwise = toUpper c

-- module Main where

-- import System.IO
-- import Data.Char (isUpper, toLower, toUpper)

-- main :: IO ()
-- main = do
--   let asciis = [33, 64, 35, 36, 37, 94, 38, 42, 40, 92, 39, 34, 60, 62, 63, 58, 59]
--   --printChar <$> asciis
--   mapM_ printChar asciis
--   putStrLn ""

-- printChar :: Int -> IO ()
-- printChar c = putChar (toEnum c)


-- module Main where

-- main :: IO()
-- main = do
--   putChar (toEnum 33)
--   let a = (+ 1) (toEnum 33)
--   putStrLn ""
--   putStrLn $ "answer is " ++ show a

-----------------------------------------------------------------------------------
------------------------------------day 1 -----------------------------------------
-----------------------------------------------------------------------------------

-- module Main where

-- import System.IO()

-- main :: IO()
-- main = do

--   putStrLn "Input below! "
--   s <- words <$> getLine
--   let [a, b] = map read s :: [Int]

--   putStrLn ""
--   putStrLn $ head s ++ " + " ++ s !! 1 ++ " = " ++ show (a + b)


-- module Main where

-- processItem :: String -> IO Int
-- processItem item = do
--   putStrLn $ "Processing item: " ++ item
--   -- Perform some IO operations to process the item
--   return (length item)

-- main :: IO ()
-- main = do
--   let itemList = ["apple", "banana", "orange"]
--   --mapM_ processItem itemList
--   --mapM_ (\item -> processItem item >>= print) itemList
--   mapM_ (\item -> processItem item >>= \result -> putStrLn $ "Result: " ++ show result) itemList

-- module Main where

-- main :: IO()
-- main = do
--   putStrLn "Input some strings"
--   s <- words <$> getLine
--   let a = head s ++ (s !! 1)
--   putStrLn ""
--   print a


-- main :: IO()
-- main = do
--   putStrLn "Input some strings"
--   s <- getLine
--   putStrLn ""
--   vout s

-- vout :: String -> IO ()
-- vout [] = return ()
-- vout (x:xs) = do
--     print x
--     vout xs

-- main :: IO()
-- main = do
--   putStrLn "Input some strings"
--   s <- getLine
--   putStrLn ""
--   mapM_ putStrLn (map (:[]) s)


-- module Main where
-- main :: IO()
-- main = do

  -- if "abc" == ['a', 'b', 'c']
  --   then putStrLn "True"
  --   else putStrLn "False"

  -- putStrLn (show ("abc" == [ 'a', 'b', 'c' ]))

  -- print ("abc" == [ 'a', 'b', 'c' ])


-- module Main where
-- main :: IO()
-- main = do

 -- putStrLn "put some number below"
 -- s <- getLine
 -- putStrLn ""
 -- let a = read s :: Int
 -- -- if a `mod` 2 == 1
 -- --   then putStrLn "the number is odd"
 -- --   else putStrLn "the number is even"
 --     q = show a ++ if even a then " is even" else " is odd"
 -- putStrLn q


-- module Main where
-- main :: IO()
-- main = do
--  putStrLn "put some number below"
--  s <- getLine
--  putStrLn ""
--  let a = read s :: Int
--      my_str = "He11oWor1d"
--      ow_str = "lloWorl"
--      nm = length my_str
--      no = length ow_str
--      ns = no + a
--      q = take a my_str ++ ow_str ++ take (nm-ns) (drop ns my_str)
--  putStrLn q


-- module Main where
-- solution :: String -> String -> Int -> String
-- solution my_str ow_str s =
--   let no = length ow_str
--       ns = no + s
--   in take s my_str ++ ow_str ++ drop ns my_str

-- main :: IO()
-- main = do
--   let q = solution "He11oWor1d" "lloWorl" 2
--   putStrLn q


-----------------------------------------------------------------------------------
------------------------------------day 2 -----------------------------------------
-----------------------------------------------------------------------------------
-- module Main where

-- solution :: String -> String -> String
-- -- solution _ [] = []
-- -- solution (x:xs) (y:ys) = x : y : solution xs ys
-- solution s1 s2 = foldr (\(c1, c2) acc -> c1 : c2 : acc) [] (zip s1 s2)

-- main :: IO()
-- main = do
--   putStrLn "put 2 strings below"
--   s <- words <$> getLine
--   putStrLn ""

--   let q = solution (head s) (s !! 1)
--       p = zip (head s) (s !! 1)
--   print p
--   putStrLn q


-- module Main where

-- solution :: String -> Int -> String
-- --solution s1 k = foldr (++) [] $ map (const s1) [ 1 .. k ]
-- --solution s1 k = foldr ((++) . (const s1)) [] [ 1 .. k ]
-- --solution s1 k = concatMap (const s1) [ 1 .. k ]
-- solution s1 k = concat (replicate k s1)

-- main :: IO()
-- main = do
--  putStrLn "put a string and number below"
--  s <- words <$> getLine
--  putStrLn ""

--  let a = read (s !! 1) :: Int
--      q = solution (head s) a
--  print a
--  putStrLn q


-- module Main where

-- solution :: String -> String -> Int

-- solution a b =let
--   q1 = read (a ++ b) :: Int
--   q2 = read (b ++ a) :: Int
--   in
--     max q1 q2

-- main :: IO()
-- main = do
--   putStrLn "Input 2 Int numbers"
--   s <- words <$> getLine
--   putStrLn ""

--   let q = solution (head s) (s !! 1)
--   print q
--   print ([(n, n^2) | n <- [ 0 .. 19 ]])


-- module Main where

-- solution :: String -> String -> Int
-- -- solution a1 a2 = let
-- --   q1 = read (a1 ++ a2) :: Int
-- --   q2 = 2 * (read a1 :: Int) * (read a2 :: Int)
-- --   in
-- --   --   max q1 q2

-- --   --if q1 < q2 then q2 else q1

-- --   -- case q1 < q2 of
-- --   --   True -> q2
-- --   --   False -> q1

-- solution a1 a2
--   | q1 < q2 = q2
--   | otherwise = q1
--   where q1 = read (a1 ++ a2) :: Int
--         q2 = 2 * (read a1 :: Int) * (read a2 :: Int)


-- main :: IO()
-- main = do
--   putStrLn "Input 2 Int numbers"
--   s <- words <$> getLine
--   putStrLn ""

--   let q = solution (head s) (s !! 1)
--   print q

-----------------------------------------------------------------------------------
------------------------------------day 3 -----------------------------------------
-----------------------------------------------------------------------------------
-- module Main where
-- solution :: Int -> Int -> Int
-- -- solution a1 a2
-- --   | a1 `mod` a2 == 0 = 1
-- --   | otherwise = 0
-- solution a1 a2 = if a1 `mod` a2 == 0 then 1 else 0



-- main :: IO()
-- main = do
--   putStrLn "Input 2 Int numbers"
--   s <- words <$> getLine
--   putStrLn ""

--   let q = solution (read $ head s :: Int) (read $ s !! 1 :: Int)
--   print q

-- module Main where
-- solution :: Int -> Int -> Int -> Int
-- -- solution a1 a2 a3
-- --   | a1 `mod` a2 == 0 && a1 `mod` a3 ==0 = 1
-- --   | otherwise = 0
-- solution a1 a2 a3 = if a1 `mod` a2 == 0 && a1 `mod` a3 == 0 then 1 else 0


-- main :: IO()
-- main = do
--   putStrLn "Input 2 Int numbers"
--   s <- words <$> getLine
--   putStrLn ""

--   let q = solution (read $ head s :: Int) (read $ s !! 1 :: Int) (read $ s !! 2 :: Int)
--   print q


-- module Main where
-- solution :: Int -> Int
-- -- solution a1 = let
-- --   q1 = [ x | x <- [ 1 .. a1 ], x `mod` 2 == 1]
-- --   q2 = [ x ^ 2 | x <- [ 1 .. a1 ], even x ]
-- --   in
-- --   if a1 `mod` 2 == 1 then sum q1 else sum q2
-- solution a1 = sum [ if even a1 then x*x*4 else 2*x+1 | x <- [ 0 .. a1 `div` 2 ] ]

-- main :: IO()
-- main = do
--   putStrLn "Input 1 Int numbers"
--   s <- words <$> getLine
--   putStrLn ""

--   let q = solution (read $ head s :: Int)
--   print q


-- module Main where
-- stringToOperator :: String -> Maybe (Int -> Int -> Bool)
-- stringToOperator s1
--   | s1 == "<!" = Just (<)
--   | s1 == ">!" = Just (>)
--   | s1 == "<=" = Just (<=)
--   | s1 == ">=" = Just (>=)
--   | s1 == "" = Nothing

-- solution :: Int -> String -> String -> Int -> Maybe Bool
-- solution n ineq eq m = let
--   ineq1 = ineq ++ eq
--   op = stringToOperator ineq1
--   in
--   op <*> Just n <*> Just m

-- main :: IO()
-- main = do
--   putStrLn "Input compare operator and 2 Int numbers"
--   s <- words <$> getLine
--   putStrLn ""

--   let q = solution (read $ head s :: Int) (read $ s !! 1 :: String) (read $ s !! 2 :: String)  (read $ s !! 3 :: Int)
--   print q


-- module Main where
-- stringToOperator :: String -> Maybe (Int -> Int -> Bool)
-- stringToOperator s1
--   | s1 == "<!" = Just (<)
--   | s1 == ">!" = Just (>)
--   | s1 == "<=" = Just (<=)
--   | s1 == ">=" = Just (>=)
--   | s1 == "" = Nothing

-- solution :: Int -> String -> String -> Int -> Maybe Bool
-- solution n ineq eq m = let
--   ineq1 = ineq ++ eq
--   op = stringToOperator ineq1
--   in
--   op <*> Just n <*> Just m

-- main :: IO()
-- main = do
--   putStrLn "Input compare operator and 2 Int numbers"
--   s <- words <$> getLine
--   putStrLn ""

--   let q = solution (read $ head s :: Int) (read $ s !! 1 :: String) (read $ s !! 2 :: String)  (read $ s !! 3 :: Int)
--   print q

-- module Main where
-- solution :: Int -> Int -> Bool -> Int
-- solution n1 n2 s1
--   | s1 = n1 + n2
--   | otherwise = n1 - n2

-- main :: IO()
-- main = do
--   putStrLn "Input compare operator and 2 Int numbers"
--   s <- words <$> getLine
--   putStrLn ""

--   let q = solution (read $ head s :: Int) (read $ s !! 1 :: Int) (read $ s !! 2 :: Bool)
--   print q

-----------------------------------------------------------------------------------
------------------------------------day 4 -----------------------------------------
-----------------------------------------------------------------------------------

-- module Main where
-- import Debug.Trace (trace)
-- solution :: String -> String
-- solution s1 = let
--   count = [ 0 .. length s1 ]
--   premode = [ if x == '1' then 1 else 0 | x <- s1 ]
--   mode = aaa 0 premode
--   in do
--     trace ("Mode: " ++ show mode) $ ccc s1 mode count
--   --ccc s1 mode count

-- main :: IO()
-- main = do
--   putStrLn "Input compare operator and 2 Int numbers"
--   s <- words <$> getLine
--   putStrLn ""

--   let q = solution (read $ head s :: String)
--   print q


-- ccc :: String -> [Int] -> [Int] -> String
-- ccc _ _ [] = []
-- ccc [] _ _ = []
-- ccc _ [] _ = []
-- ccc (x:xs) (y:ys) (z:zs)
--   | y == 0 && even z && x /= '1' = x : ccc xs ys zs
--   | y == 1 && z `mod` 2 ==1 && x /= '1' = x : ccc xs ys zs
--   | otherwise = ccc xs ys zs


-- aaa :: Int -> [Int] -> [Int]
-- aaa _ [] = []
-- aaa p (x:xs) = bbb p x:aaa (bbb p x) xs
--   where bbb p1 x1
--          | x1 == 1 = (p1+1) `mod` 2
--          | otherwise = p1
-- -- aaa [] = []
-- -- aaa (x:y:xs) = bbb x y : aaa (y:xs)
-- --     where bbb x1 y1
-- --            | y1 == 1 = (x1+1) `mod` 2
-- --            | otherwise = x1
-- --aaa [] = []
-------------------------------------------------1.end

-- module Main where

-- solution :: Int -> Int -> [Bool] -> Int
-- solution a b sb = sum $ aaa (bbb a b) sb

-- aaa :: [Int] -> [Bool] -> [Int]
-- aaa [] _ = []
-- aaa _ [] = []
-- aaa (i:is) (b:bs)
--   | b = i: aaa is bs
--   | otherwise = aaa is bs

-- bbb :: Int -> Int -> [Int]
-- bbb a b = (+a) . (*b) <$> [ 0, 1 .. ]

-- main :: IO()
-- main = do
--   putStrLn "Input 1st elements of [Int]"
--   s1 <- words <$> getLine
--   putStrLn ""
--   putStrLn "Input 2nd elements of [Bool]"
--   s2 <- words <$> getLine
--   putStrLn ""

--   let q = solution (read $ head s1 :: Int) (read $ s1!!1 :: Int) (map read s2 :: [Bool])
--   print q
------------------------------------------------2.end

-- module Main where

-- solution :: Int -> Int -> Int -> Int
-- solution a b c
--   | a == b && b == c = y
--   | a == b || b == c || c == a = x
--   | otherwise = w
--   where
--     w = a+b+c
--     x = w * (a^2+b^2+c^2)
--     y = x * (a^3+b^3+c^3)


-- --bbb :: Int -> Int -> [Int]
-- --bbb a b = (+a) . (*b) <$> [ 0, 1 .. ]

-- main :: IO()
-- main = do
--   putStrLn "Input 1st elements of [Int]"
--   s1 <- words <$> getLine
--   putStrLn ""

--   let q = solution (read $ head s1 :: Int) (read $ s1!!1 :: Int) (read $ s1!!2 :: Int)
--   print q

------------------------------------------------3.end
-- module Main where

-- solution :: [Int] -> Int
-- solution is
--   | isp < iss*iss = 1
--   | otherwise = 0
--   where
--     isp = product is
--     iss = sum is


-- --bbb :: Int -> Int -> [Int]
-- --bbb a b = (+a) . (*b) <$> [ 0, 1 .. ]

-- main :: IO()
-- main = do
--   putStrLn "Input 1st elements of [Int]"
--   s1 <- words <$> getLine
--   putStrLn ""

--   let q = solution (map read s1)
--   print q

------------------------------------------------4.end
--module Main where

-- solution :: [Int] -> Int
-- solution is = (read $ aaa is :: Int) + (read $ bbb is :: Int)

-- aaa :: [Int] -> String
-- aaa [] = []
-- aaa (i:is)
--   | even i = show i ++ aaa is
--   | otherwise = aaa is

-- bbb :: [Int] -> String
-- bbb [] = []
-- bbb (i:is)
--   | even i = bbb is
--   | otherwise = show i ++ bbb is


-- main :: IO()
-- main = do
--   putStrLn "Input"
--   s1 <- words <$> getLine
--   putStrLn ""

--   let q = solution (map read s1)
--   print q

------------------------------------------------5.end
-----------------------------------------------------------------------------------
------------------------------------day 5 -----------------------------------------
-----------------------------------------------------------------------------------

-- solution :: [Int] -> [Int]
-- solution is
--   | n1 > n2 = is ++ [m1]
--   | otherwise = is ++ [m2]
--     where
--       n1 = last is
--       n2 = is !! (length is - 2)
--       m1 = n1 - n2
--       m2 = n1 * 2

-- main :: IO()
-- main = do
--   putStrLn "Input"
--   s1 <- words <$> getLine
--   putStrLn ""

--   let q = solution (map read s1)
--   print q

------------------------------------------------1.end
-- aaa :: Int -> String -> [Int]
-- aaa _ [_] = []
-- aaa n (x:xs)
--  | x == 'w' = n+1 : aaa (n+1) xs
--  | x == 's' = n-1 : aaa (n-1) xs
--  | x == 'd' = n+10 : aaa (n+10) xs
--  | x == 'a' = n-10 : aaa (n-10) xs

-- main :: IO()
-- main = do
--   putStrLn "Input"
--   s1 <- words <$> getLine
--   putStrLn ""

--   let q = last $ aaa (read $ head s1 :: Int) (read $ s1!!1 :: String)
--   print q

------------------------------------------------2.end
-- aaa :: [Int] -> String
-- aaa [] = []
-- aaa [_] = []
-- aaa (i1:i2:is)
--   | i2 - i1 == 1 = 'w' : aaa (i2:is)
--   | i2 - i1 == -1 = 's' : aaa (i2:is)
--   | i2 - i1 == 10 = 'd' : aaa (i2:is)
--   | i2 - i1 == -10 = 'a' : aaa (i2:is)

-- main :: IO()
-- main = do
--   putStrLn "Input"
--   s1 <- words <$> getLine
--   putStrLn ""

--   let q = aaa (map read s1)
--   print q

------------------------------------------------3.end

-- aaa :: [Int] -> [(Int, Int)] -> [Int]
-- aaa a [] = a
-- aaa is (iq1:iq) =
--   let
--   t1 = fst iq1
--   t2 = snd iq1
--   in
--   aaa (bbb is t1 t2 t1 t2) iq

-- bbb :: [Int] -> Int -> Int -> Int -> Int -> [Int]
-- bbb [] _ _ _ _ = []
-- bbb (i:is) i1 i2 t1 t2
--   | i1 == 0 = t2:bbb is (i1-1) (i2-1) t1 t2
--   | i2 == 0 = t1:bbb is (i1-1) (i2-1) t1 t2
--   | otherwise = i:bbb is (i1-1) (i2-1) t1 t2

-- -- aaa [0..4] [(0,3),(1,2),(1,4)]
------------------------------------------------4.end

-- aaa :: [Int] -> [(Int, Int, Int)] -> [Int]
-- aaa _ [] = []
-- aaa is ((i1,i2,i3):iq) = ddd (ccc (bbb is i1 i2) i3) : aaa is iq

-- bbb :: [Int] -> Int -> Int -> [Int]
-- bbb is i1 i2 = take (i2+1) $ drop i1 is

-- ccc :: [Int] -> Int -> [Int]
-- ccc is i1 = [ i | i <- is, i > i1 ]

-- ddd :: [Int] -> Int
-- ddd [] = -1
-- ddd is = minimum is

-- -- aaa [0,1,2,4,3] [(0,4,2),(0,3,2),(0,2,2),(0,2,3)]
------------------------------------------------5.end

-----------------------------------------------------------------------------------
------------------------------------day 6 -----------------------------------------
-----------------------------------------------------------------------------------


-- aaa :: [Int] -> [(Int, Int, Int)]-> [Int]
-- aaa a [] = a
-- aaa is ((i1,i2,i3):iq) = aaa (listUnIndex $ bbb (listIndex is) i1 i2 i3) iq

-- bbb :: [(Int, Int)] -> Int -> Int -> Int -> [(Int, Int)]
-- bbb its i1 i2 i3 = [ if i1 <= t2 && t2 <= i2 && t2 `mod` i3 ==0 then (t1+1,t2) else (t1,t2) | (t1,t2) <- its ]


-- listIndex :: [Int] -> [(Int, Int)]
-- listIndex is = zip is [0..(length is - 1)]

-- listUnIndex :: [(Int, Int)] -> [Int]
-- listUnIndex its = [ t1 | (t1, t2) <- its ]

-- --aaa [0,1,2,4,3] [(0,4,1),(0,3,2),(0,3,3)]

------------------------------------------------1.end

-- import Numeric (showIntAtBase)
-- import Data.Char (intToDigit)

-- aaa :: Int -> Int -> [Int]
-- aaa i1 i2 = fff $ eee i1 i2 $ ddd <$> ccc <$> iTB <$> bbb i2

-- bbb :: Int -> [Int]
-- bbb i = [ 1..2^(length $ show i) ]

-- iTB :: Int -> String
-- iTB i = showIntAtBase 2 intToDigit i ""

-- ccc :: String -> String
-- ccc [] = []
-- ccc (s:sx)
--   | s == '1' = '5':ccc sx
--   | otherwise = s : ccc sx

-- ddd :: String -> Int
-- ddd s = read s :: Int

-- eee :: Int -> Int -> [Int] -> [Int]
-- eee i1 i2 is = [ i | i <- is, i1 <= i, i <= i2 ]

-- fff :: [Int] -> [Int]
-- fff is
--   | is == [] = [-1]
--   | otherwise = is

-- -- aaa 5 555
-- -- aaa 10 20

------------------------------------------------2.end
-- aaa :: Int -> Int -> [Int]
-- aaa i1 i2 = [i1..i2]

------------------------------------------------3.end
-- aaa :: Int -> [Int]
-- aaa 1 = [1]
-- aaa i = i : aaa (bbb i)

-- bbb :: Int -> Int
-- bbb i
--   | even i = i `div` 2
--   | otherwise = 3*i+1

-- -- aaa 10
------------------------------------------------4.end

aaa :: [Int] -> [Int]
aaa is = reverse $ ddd is []

bbb :: [Int] -> [Int] -> [Int]
bbb (i1:_) [] = [i1]
bbb (i1:is1) (i2:is2)
  | i1 > i2 = i1:i2:is2
  | otherwise = is2

ccc :: [Int] -> [Int] -> [Int]
ccc (i1:is1) [] = is1
ccc (i1:is1) (i2:is2)
  | i1 > i2 = is1
  | otherwise = (i1:is1)

ddd :: [Int] -> [Int] -> [Int]
ddd [] is = is
ddd is1 is2 = ddd (ccc is1 is2) (bbb is1 is2)

------------------------------------------------5.end
