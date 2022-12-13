#include <stdio.h>
#include <stdlib.h>
#include <iostream>

long long Tsum(int num1, int num2) {
  long long result = 0;

  for (int i = num1; i <= num2; i++) {
    result += i;

  }

  return result;
}

int main(int argc, char* argv[]) {
  int init = atoll(argv[1]);
  int fin = atoll(argv[2]);

  std::cout << init << "~" << fin << "sum = " << Tsum(init, fin) << std::endl;

  return 0;

}


//compile:
//$ nix develop
//$ g++ -v /home/auros/gits/programming/cpp/projects/test/Tsum.cpp -o /home/auros/gits/programming/cpp/projects/test/results/Tsum
