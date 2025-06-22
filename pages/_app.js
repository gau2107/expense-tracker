import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { useBoundStore } from "store/store";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const setCategories = useBoundStore((state) => state.setCategories);
  const setPaymentModes = useBoundStore((state) => state.setPaymentModes);
  useEffect(() => {
    requestPermission();
    getCategories();
    getPaymentModes();
  }, []);

  async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/categories`)
    const data = await res.json();
    setCategories(data);
  }

  async function getPaymentModes() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/payment-modes`)
    const data = await res.json();
    setPaymentModes(data);
  }

  function requestPermission() {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }
  }

  return (
    <SessionProvider session={session}>
      <NextNProgress color="#ffffff" />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
