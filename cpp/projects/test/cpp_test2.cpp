#include <stdio.h>
#include <iostream>

int main()
{
  int a = 30;
  int *c = &a;
  int &rep = a;
  int ref = a;
  std::cout << a << std::endl; //0 출력
  std::cout << c << std::endl; //0 출력
  std::cout << *c << std::endl; //0 출력
  std::cout << &rep << std::endl; //0 출력
  std::cout << &ref << std::endl; //0 출력
  std::cout << rep << std::endl; //0 출력
  std::cout << ref << std::endl; //0 출력
  std::cout << *"0x7fff1ce48bb0"; //0 출력
    //std::cout << "Hello world!";
    //return 0;

}
