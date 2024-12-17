import Image from "next/image";
import Link from "next/link";
import { navMenus } from "resources/constants";
import { useRouter } from "next/router";
import { useState } from "react";
import { useBoundStore } from "store/store";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Header({ }) {
  const { data: session } = useSession()
  const toggle = useBoundStore((state) => state.toggleIsAuthenticated);
  const [isAuthenticated, setIsAuthenticated] = useState();


  const router = useRouter();

  const handleLoginLogout = () => {
    if(session) {

    } else {
      signIn()
    }
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
      <nav className="flex items-center xl:flex-wrap bg-black p-2">
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

        <div className="block justify-between flex-1 flex-grow lg:flex lg:items-center lg:w-auto
        md:flex md:items-center">
          <div className="text-sm lg:flex-grow md:flex">
            {navMenus.map((menu, key) => (
              <div key={key} className="lg:inline-block lg:mt-0 ">
              <Link
                href={menu.link}
                className=""
              >
                <span className="capitalize text-white mr-10 font-medium text-lg">{menu.title}</span>
              </Link>
              </div>
            ))}
          </div>
          <div className="mr-4">
            <a
              onClick={() => handleLoginLogout()}
              className="inline-block text-sm px-4 py-2 leading-none border rounded-full text-white border-white hover:border-transparent hover:text-black hover:bg-white lg:mt-0"
            >
              {session ? "Logout" : "Login"}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
