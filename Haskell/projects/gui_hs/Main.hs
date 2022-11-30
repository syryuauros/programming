import qualified GI.Gtk as Gtk
import qualified GI.Gio as Gio
import qualified Data.Text as Text

main :: IO ()
main = do
  Just app <- Gtk.applicationNew (Just appId) []
  _ <- Gio.onApplicationActivate app (appActivate app)
  _ <- Gio.applicationRun app Nothing
  return ()

appId = Text.pack "io.serodell.gui-haskell-app"

appActivate :: Gtk.Application -> IO ()
appActivate app = do
  window <- Gtk.applicationWindowNew app
  Gtk.setWindowTitle window (Text.pack "GUI Haskell App")
  Gtk.setWindowResizable window False
  Gtk.setWindowDefaultWidth window 300
  vbox <- Gtk.boxNew Gtk.OrientationVertical 10
  Gtk.setWidgetMargin vbox 10
  Gtk.containerAdd window vbox
  Gtk.widgetShow vbox
  entryC <- addEntry (Text.pack "°C") vbox
  entryF <- addEntry (Text.pack "°F") vbox
  _ <- Gtk.onEditableChanged entryC $
    do s <- Gtk.entryGetText entryC
       Gtk.entrySetText entryF (Text.reverse s)
  button <- Gtk.buttonNew
  Gtk.setButtonLabel button (Text.pack "Get Weather")
  Gtk.setWidgetHalign button Gtk.AlignCenter
  Gtk.containerAdd vbox button
  Gtk.widgetShow button
  Gtk.widgetShow window

addEntry :: Gtk.IsContainer a => Text.Text -> a -> IO Gtk.Entry
addEntry labelStr container = do
  hbox <- Gtk.boxNew Gtk.OrientationHorizontal 5
  entry <- Gtk.entryNew
  label <- Gtk.labelNew (Just labelStr)
  Gtk.containerAdd hbox entry
  Gtk.containerAdd hbox label
  Gtk.containerAdd container hbox
  Gtk.widgetShow entry
  Gtk.widgetShow label
  Gtk.widgetShow hbox

  Gtk.setWidgetExpand entry True
  Gtk.setEntryXalign entry 1
  return entry

-- https://serokell.io/blog/gui-programming-talk
-- https://www.youtube.com/watch?v=k1aq8ikO-8Q
-- https://hackage.haskell.org/package/gi-gio-2.0.30/docs/GI-Gio-Objects-Application.html
-- emacs unicode input: C-x 8 enter unicode
-- https://unicode-table.com/
