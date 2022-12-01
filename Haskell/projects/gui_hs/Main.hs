import qualified GI.Gtk as Gtk
import qualified GI.Gio as Gio
import qualified Data.Text as T
import Text.Read (readMaybe)
import System.Random
import Control.Concurrent

main :: IO ()
main = do
  Just app <- Gtk.applicationNew (Just appId) []
  _ <- Gio.onApplicationActivate app (appActivate app)
  _ <- Gio.applicationRun app Nothing
  return ()

appId = T.pack "io.serodell.gui-haskell-app"

c_to_f, f_to_c :: Double -> Double
c_to_f = (+32) . (*1.8)
f_to_c = (/1.8) . subtract 32

parseDouble :: T.Text -> Maybe Double
parseDouble = readMaybe . T.unpack

renderDouble :: Double -> T.Text
renderDouble = T.pack . show . realToFrac

getWeather :: IO Double
getWeather = do
  threadDelay (3 * 1000000)
  randomRIO (-30, 30)

appActivate :: Gtk.Application -> IO ()
appActivate app = do
  window <- Gtk.applicationWindowNew app
  Gtk.setWindowTitle window (T.pack "GUI Haskell App")
  Gtk.setWindowResizable window False
  Gtk.setWindowDefaultWidth window 300
  vbox <- Gtk.boxNew Gtk.OrientationVertical 10
  Gtk.setWidgetMargin vbox 10
  Gtk.containerAdd window vbox
  Gtk.widgetShow vbox
  entryC <- addEntry (T.pack "°C") vbox
  entryF <- addEntry (T.pack "°F") vbox
  _ <- Gtk.onEditableChanged entryC $
    do s <- Gtk.entryGetText entryC
       case parseDouble s of
         Nothing -> return ()
         Just v ->
           let s' = renderDouble (c_to_f v)
           in Gtk.entrySetText entryF s'
  button <- Gtk.buttonNew
  Gtk.setButtonLabel button (T.pack "Get Weather")
  Gtk.setWidgetHalign button Gtk.AlignCenter
  Gtk.containerAdd vbox button
  Gtk.widgetShow button
  Gtk.widgetShow window

addEntry :: Gtk.IsContainer a => T.Text -> a -> IO Gtk.Entry
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
-- https://www.slideshare.net/SerokellCompany/vladislav-zavialov-introduction-to-gui-programming-in-haskell
