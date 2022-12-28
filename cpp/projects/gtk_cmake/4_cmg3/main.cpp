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

  GtkWidget *window;

  gtk_init (&argc, &argv);

  window = gtk_window_new (GTK_WINDOW_TOPLEVEL);
  gtk_window_set_title (GTK_WINDOW (window), "%d + 1 == %d/n");
  g_signal_connect (G_OBJECT (window), "destroy", gtk_main_quit, NULL);
  gtk_window_set_default_size(GTK_WINDOW(window), 500, 500);

  gtk_widget_show_all (window);
  gtk_main ();

  return 0;
}

//https://stackoverflow.com/questions/2730135/how-do-i-link-gtk-library-more-easily-with-cmake-in-windows
//https://www.kernelpanic.kr/27
