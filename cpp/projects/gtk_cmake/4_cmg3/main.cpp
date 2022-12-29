#include <gtkmm.h>
#include <iostream>
#include "my.h"
#include "your.h"

int main(int argc, char *argv[])
{

  // std::cout << "calling up myfunc : " << myfunc(3) << std::endl;
  // printf("%d + 1 == %d\n", 3, myfunc(3));
  // printf("This code is modified!.\n");
  // printf("%d + 10 == %d\n", 3, your_func(3));

  GtkWidget *window;
  GtkWidget *button;
  GtkWidget *halign;

  gtk_init (&argc, &argv);

  window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
  gtk_window_set_title(GTK_WINDOW(window), "Tooltip");
  gtk_window_set_default_size(GTK_WINDOW(window), 300, 200);
  gtk_container_set_border_width(GTK_CONTAINER(window), 15);

  // gtk_window_set_position(GTK_WINDOW(window), GTK_WIN_POS_CENTER);
  //halign = gtk_alignment_new(0, 0, 0, 0);
  gtk_container_add(GTK_CONTAINER(halign), button);
  //gtk_container_add(GTK_CONTAINER(window), halign);

  gtk_widget_show_all(window);

  g_signal_connect (G_OBJECT (window), "destroy",
                    G_CALLBACK(gtk_main_quit), NULL);

  gtk_main ();

  return 0;
}

//https://stackoverflow.com/questions/2730135/how-do-i-link-gtk-library-more-easily-with-cmake-in-windows
//https://www.kernelpanic.kr/27
//https://zetcode.com/gui/gtk2/firstprograms/
//https://zetcode.com/gui/gtk2/firstprograms/
