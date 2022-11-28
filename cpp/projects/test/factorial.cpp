#include <stdio.h>
#include <stdlib.h>
#include <iostream>

int Factorial(long long num) {
  long long result = 1;

  for (long long i =2; i <= num; i++) {
    result *= i;

  }

  return result;
}

int main(int argc, char* argv[]) {
  long long num = atol(argv[1]);

  std::cout << argv[1] << std::endl;

  // std::cout << "input the value" << std::endl;

  // std::cin >> num;

  std::cout << num << "! value:" << Factorial(num) << std::endl;

  return 0;

}
