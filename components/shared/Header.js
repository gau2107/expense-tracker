import Image from "next/image";
import Link from "next/link";
import { navMenus } from "resources/constants";
import { useEffect } from "react";
import { useBoundStore } from "store/store";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Header({ }) {
  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      console.log(session)
      const sendData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/auth/google`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: session.user.email,
              name: session.user.name,
              google_id: session.user.id,
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();

          console.log("Laravel Response:", data);
        } catch (error) {
          console.error("Error sending data to Laravel:", error);
        }
      };

      sendData();
    }
  }, [session]);


  const handleLoginLogout = () => {
    if (session) {
      signOut();
    } else {
      signIn()
    }
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
