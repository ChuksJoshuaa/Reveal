import Image from "next/image";
import Link from "next/link";
import { imageLogo } from "@/utils/image";
import { NavLinks } from "@/utils/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image
            src={imageLogo}
            priority
            alt="Reveal-logo"
            className="w-full h-auto"
            width={115}
            height={10}
          />
        </Link>

        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt={session?.user?.name}
                width={30}
                height={30}
                className="w-auto h-auto rounded-full"
              />
            )}
            <Link href="/create-project" className="capitalize">
              Share work
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
