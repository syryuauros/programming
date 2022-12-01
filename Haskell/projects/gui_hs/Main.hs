import qualified GI.Gtk as Gtk
import qualified GI.Gio as Gio
import qualified Data.Text as T
import Text.Read (readMaybe)
import GI.GLib as GLib
import System.Random
import Control.Concurrent
import Control.Monad (unless)

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
  setEntryRelation entryC c_to_f entryF
  setEntryRelation entryF f_to_c entryC
  button <- Gtk.buttonNew
  Gtk.setButtonLabel button (T.pack "Get Weather")
  Gtk.setWidgetHalign button Gtk.AlignCenter
  Gtk.containerAdd vbox button
  Gtk.onButtonClicked button $
    do Gtk.widgetSetSensitive button False
       _ <- forkIO $ do
         c <- getWeather
         _ <- GLib.idleAdd GLib.PRIORITY_HIGH_IDLE $ do
           _ <- Gtk.entrySetText entryC (renderDouble c)
           Gtk.widgetSetSensitive button True
           return False
         return ()
       return ()
  Gtk.widgetShow button
  Gtk.widgetShow window


setEntryRelation :: Gtk.Entry -> (Double -> Double) -> Gtk.Entry -> IO ()
setEntryRelation entrySource conv entryTarget = do
  _ <- Gtk.onEditableChanged entrySource $ do
    target_focused <- Gtk.widgetHasFocus entryTarget
    unless target_focused $ do
        s <- Gtk.entryGetText entrySource
        case parseDouble s of
          Nothing -> return ()
          Just v ->
            let s' = renderDouble (conv v)
            in Gtk.entrySetText entryTarget s'
  return ()

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
