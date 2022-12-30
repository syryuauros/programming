#ifndef GTKMM_EXAMPLE_BUTTONS_H
#define GTKMM_EXAMPLE_BUTTONS_H

#include <gtkmm/window.h>
#include <gtkmm/button.h>

class Buttons : public Gtk::Window
{
public:
  Buttons();
  virtual ~Buttons();

protected:
  //Signal handlers:
  void on_button_pressed();
  void on_button_released();
  void on_button_clicked();
  void on_button_enter();
  void on_button_leave();

  //Child widgets:
  Gtk::Button m_button;
};

#endif //GTKMM_EXAMPLE_BUTTONS_H
