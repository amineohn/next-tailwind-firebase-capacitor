import "../styles/globals.css";
import React, { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { useRouter } from "next/router";
import { Firebase } from "../libs/firebase";
import { NextSeo } from "next-seo";
import Snowfall from "react-snowfall";
import { configuration } from "../utils/configuration";
const Navigation = dynamic(() => import("../components/navigation"), {
  ssr: false,
});
const fire = new Firebase();
const isAvailable = Capacitor.isPluginAvailable("StatusBar");
const isAvailable2 = Capacitor.isPluginAvailable("SplashScreen");

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  if (Capacitor.isPluginAvailable("StatusBar")) {
    if (!isAvailable) {
      StatusBar.setOverlaysWebView({ overlay: true });
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: "#ffffff" });
    }
  }
  if (Capacitor.isPluginAvailable("SplashScreen")) {
    if (!isAvailable2) {
      SplashScreen.hide();
    }
  }
  const router = useRouter();

  useEffect(() => {
    if (!fire.user()) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <Snowfall color="red" snowflakeCount={200} />
      <NextSeo
        title={configuration.title}
        description={configuration.description}
        openGraph={{
          url: configuration.openGraph.url,
          title: configuration.openGraph.title,
          description: configuration.openGraph.description,
          images: [
            {
              url: configuration.openGraph.image,
              width: configuration.openGraph.width,
              height: configuration.openGraph.height,
              alt: configuration.openGraph.alt,
            },
          ],
        }}
      />
      <ThemeProvider defaultTheme="light" attribute="class">
        <div className="flex flex-col h-screen overflow-auto lg:overflow-y-hidden justify-between z-auto">
          <Component {...pageProps} />
          <Navigation />
        </div>
      </ThemeProvider>
      <script src="https://cdn.jsdelivr.net/npm/datalist-css/dist/datalist-css.min.js" />
    </>
  );
}
