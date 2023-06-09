import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import useAuthStore from "store/store";
import { useRouter } from "next/router";
import Image from "next/image";
import StyledFirebaseAuth from "components/StyledFirebaseAuth";

export default function Login() {
  const router = useRouter();
  const authStoreVal = useAuthStore((state) => state.isAuthenticated);
  const toggle = useAuthStore((state) => state.toggleIsAuthenticated);
  const [isAuthenticated, setIsAuthenticated] = useState();

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, []);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        toggle(!!user);

        if (!!user) router.push("/");
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  useEffect(() => {
    setIsAuthenticated(authStoreVal);
  }, [authStoreVal]);

  return (
    <div
      role={"dialog"}
      style={{
        background: "#FDFEFE",
        height: "fit-content",
        width: "25em",
        textAlign: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        padding: "2em",
        boxShadow: "5px 5px #F4F6F7;",
      }}
    >
      <div style={{ justifyContent: "center", display: "flex", marginBottom: "1em",}}>
        <Image
          className="mr-6"
          src="/favicon/favicon.ico"
          width={60}
          height={60}
          alt="Logo"
        />
      </div>
      {!isAuthenticated && (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
}
