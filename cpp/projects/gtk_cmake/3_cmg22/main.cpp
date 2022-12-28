#include <gtkmm.h>
#include <iostream>
#include "my.h"
#include "your.h"

int main(int argc, char *argv[])
{

  std::cout << "calling up myfunc : " << myfunc(3) << std::endl;
  printf("%d + 1 == %d\n", 3, myfunc(3));
  printf("This code is modified!.\n");
  printf("%d + 10 == %d\n", 3, your_func(3));

  auto app =
    Gtk::Application::create(argc, argv,
      "org.gtkmm.examples.base");

  Gtk::Window window;
  window.set_default_size(200, 200);

  return app->run(window);

}


// #include <iostream>
// #include "my.h"
// #include "your.h"

// int main()

// {
//   std::cout << "calling up myfunc : " << myfunc(3) << std::endl;
//   printf("%d + 1 == %d\n", 3, myfunc(3));
//   printf("This code is modified!.\n");
//   printf("%d + 10 == %d\n", 3, your_func(3));
//   return 0;
// }
