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
  Gtk.widgetShow window

-- https://serokell.io/blog/gui-programming-talk
-- https://www.youtube.com/watch?v=k1aq8ikO-8Q
-- https://hackage.haskell.org/package/gi-gio-2.0.30/docs/GI-Gio-Objects-Application.html
