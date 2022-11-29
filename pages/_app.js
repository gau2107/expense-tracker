import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import firebase from "firebase/compat/app";
import { getMessaging } from "firebase/messaging";
import { useEffect } from "react";
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
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  };
  const app = firebase.initializeApp(config);

  return (
    <>
      <NextNProgress color="#ffffff" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
