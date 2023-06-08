import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { app } from "../firebase/clientApp";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    requestPermission();
  }, []);

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }

  return (
    <>
      <NextNProgress color="#ffffff" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
