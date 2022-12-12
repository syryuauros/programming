#include <stdio.h>
#include <stdlib.h>
#include <iostream>

long double Fsum(long double num1, long double num2) {
  long double result = 0;

  for (long double i = num1; i <= num2; i++) {
    //long double j = i/10000000000;
    result += i;

  }

  return result;
}

int main(int argc, char* argv[]) {
  long double init = atoll(argv[1]);
  long double fin = atoll(argv[2]);

  printf("%Lf\n", Fsum(init, fin));

  // std::cout<<fixed;
  // cout.precision(0);
  // std::cout << Fsum(init, fin) << std::endl;
  //std::cout << init << "~" << fin << "sum = " << Fsum(init, fin) << std::endl;

  return 0;

}


//compile:
//$ nix develop
//$ g++ -v /home/auros/gits/programming/cpp/projects/test/Tsum.cpp -o /home/auros/gits/programming/cpp/projects/test/results/Tsum
// longdouble printf 출력 표기법 https://dojang.io/mod/page/view.php?id=46
// cout 큰 int일 때 지수표기법 방지  https://jlog1016.tistory.com/92
//
