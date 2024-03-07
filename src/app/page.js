import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#3a4857]">
      <header className="flex justify-between py-4 px-8 bg-[#bacddf]">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            <Image src="/jiva3.png" alt="Logo" width={40} height={40} />
          </Link>
        </div>
        <div className="">
          <ul className="flex gap-8">
            <li>
              <Link
                href="/login"
                className="text-[#825614] text-lg font-semibold"
              >
                <FontAwesomeIcon size={24} icon={faAddressCard} />
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="text-[#825614] text-lg font-semibold"
              >
                <FontAwesomeIcon size={24} icon={faAddressCard} />
                Register
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="bg-[#00BCD4] w-[400px] rounded-3xl shadow-2xl mx-auto my-auto">
        <Image src="/jiva5.png" alt="Logo" width={800} height={800} />
      </div>
    </main>
  );
}
