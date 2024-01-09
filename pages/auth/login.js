import React, { useEffect, useState } from "react";
import useAuthStore from "store/store";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const authStoreVal = useAuthStore((state) => state.isAuthenticated);
  const toggle = useAuthStore((state) => state.toggleIsAuthenticated);
  const [isAuthenticated, setIsAuthenticated] = useState();

  

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, []);

  useEffect(() => {
   
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
     
    </div>
  );
}
