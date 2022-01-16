import Image from "next/image";
import Link from "next/link";
import { navMenus } from "resources/constants";
export default function Header({ user }) {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-black p-2">
        {/* root nav */}
        <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/">
          <a className="mr-4">
          <Image
            className="mr-6"
            src="/favicon/favicon.ico"
            width={48}
            height={48}
            alt="Logo"
          />
          </a>
          </Link>
        </div>

        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {navMenus.map((menu, key) => (
              <Link key={key} href={menu.link}>
                <a
                  href="#responsive-header"
                  className="lg:inline-block lg:mt-0 text-white hover:text-yellow-50 mr-4 font-medium text-base"
                >
                  {menu.title}
                </a>
              </Link>
            ))}
          </div>
          <div>
            <Link href={"api/auth/login"}>
              <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0">
                {user ? "Logout" : "Login"}
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
