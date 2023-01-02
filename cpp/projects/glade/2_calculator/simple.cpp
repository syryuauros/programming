#include <gtkmm/application.h>
#include <gtkmm/applicationwindow.h>
#include <gtkmm/button.h>
#include <gtkmm/label.h>
#include <gtkmm/box.h>
#include <gtkmm/builder.h>

class HelloWindow : public Gtk::ApplicationWindow {
    Gtk::Box *cont;
    Glib::RefPtr<Gtk::Label> display_label;
    Glib::RefPtr<Gtk::Button> display_btn;
    Glib::RefPtr<Gtk::Builder> ui;
public:
    HelloWindow()
    : ui{Gtk::Builder::create_from_file("simple.glade")} {
        if(ui) {
            ui->get_widget<Gtk::Box>("cont", cont);
            display_label = Glib::RefPtr<Gtk::Label>::cast_dynamic(
                ui->get_object("display_label")
            );
            display_btn = Glib::RefPtr<Gtk::Button>::cast_dynamic(
                ui->get_object("display_button")
            );
            if(cont && display_label && display_btn) {
                display_btn->signal_clicked().connect(
                [this]() {
                    display_label->set_text("Hello!!");
                });
                add(*cont);
            }
        }
        set_title("Simple Gtk::Builder demo");
        set_default_size(400, 400);
        show_all();
    }
};

int main(int argc, char *argv[]) {
    auto app = Gtk::Application::create(
        argc, argv,
        "org.gtkmm.example.HelloApp"
    );
    HelloWindow hw;
    return app->run(hw);
}
