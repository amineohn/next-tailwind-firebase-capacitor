import { CapacitorConfig } from "@capacitor/cli";
import { configuration } from "./utils/configuration";

const config: CapacitorConfig = {
  appId: configuration.appId,
  appName: configuration.nameApp,
  webDir: "out",
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true,
    },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
    },
  },
  server: {
    url: configuration.server.url,
  },
};

export default config;
