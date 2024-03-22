import Image from "next/image";
import Link from "next/link";
import { navMenus } from "resources/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useBoundStore } from "store/store";

export default function Header({ }) {
  const toggle = useBoundStore((state) => state.toggleIsAuthenticated);
  const [isAuthenticated, setIsAuthenticated] = useState();


  const router = useRouter();

  const handleLoginLogout = () => {
    isAuthenticated ? logout() : router.push("/auth/login");
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        toggle(false);
      })
      .catch((error) => { });
  };
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-black p-2">
        <div className="flex items-center flex-shrink-0 text-white mr-4 ml-4">
          <Link href="/dashboard" className="mr-4">
            <Image
              className="mr-6"
              src="/favicon/favicon.ico"
              width={48}
              height={48}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {navMenus.map((menu, key) => (
              <Link
                key={key}
                href={menu.link}
                className="lg:inline-block lg:mt-0 text-white hover:text-yellow-50 mr-4 font-medium text-base"
              >
                {menu.title}
              </Link>
            ))}
          </div>
          <div className="mr-4">
            <a
              onClick={() => handleLoginLogout()}
              className="inline-block text-sm px-4 py-2 leading-none border rounded-full text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
