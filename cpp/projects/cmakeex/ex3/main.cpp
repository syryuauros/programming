#include <iostream>
#include "my.h"
#include "your.h"

int main()

{
  std::cout << "calling up myfunc : " << myfunc(3) << std::endl;
  printf("%d + 1 == %d\n", 3, myfunc(3));
  printf("This code is modified!.\n");
  printf("%d + 10 == %d\n", 3, your_func(3));
  return 0;
}
