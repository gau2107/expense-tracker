import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { useBoundStore } from "store/store";
function MyApp({ Component, pageProps }) {
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
