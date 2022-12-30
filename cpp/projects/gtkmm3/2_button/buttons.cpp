#include "buttons.h"
#include <iostream>

Buttons::Buttons()
{
  m_button.add_pixlabel("info.xpm", "click here!");

  set_title("button test");
  set_border_width(10);

  m_button.signal_pressed().connect( sigc::mem_fun(*this,
              &Buttons::on_button_pressed) );

  m_button.signal_released().connect( sigc::mem_fun(*this,
              &Buttons::on_button_released) );

  m_button.signal_clicked().connect( sigc::mem_fun(*this,
            &Buttons::on_button_clicked) );

  m_button.signal_enter().connect( sigc::mem_fun(*this,
              &Buttons::on_button_enter) );

  m_button.signal_leave().connect( sigc::mem_fun(*this,
              &Buttons::on_button_leave) );


  add(m_button);

  show_all_children();
}

Buttons::~Buttons()
{
}

void Buttons::on_button_pressed()
{
  std::cout << "The Button was pressed." << std::endl;
}

void Buttons::on_button_released()
{
  std::cout << "The Button was released." << std::endl;
}

void Buttons::on_button_clicked()
{
  std::cout << "The Button was clicked." << std::endl;
}

void Buttons::on_button_enter()
{
  std::cout << "The mouse pointer enetered on button." << std::endl;
}

void Buttons::on_button_leave()
{
  std::cout << "The mouse pointer leaved on button." << std::endl;
}
