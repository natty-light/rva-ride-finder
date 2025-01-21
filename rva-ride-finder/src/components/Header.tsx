'use client'
import useUserSession from "@/hooks/useUserSession";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import type { User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import type { FC, MouseEvent } from "react";

type HeaderProps = {
  initialUser: User;
}

const Header: FC<HeaderProps> = ({ initialUser }) => {

  const user = useUserSession(initialUser);

  const handleSignOut = (event: MouseEvent) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event: MouseEvent) => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <header>
      <Link href="/" className="logo">
        RVA RIDE FINDER
      </Link>
      {user ? (
        <>
          <div className="profile">
            <p>
              <Image className="profileImage" src={user.photoURL ?? ''} alt={user.email ?? ''} />
              {user.displayName}
            </p>

            <div className="menu">
              ...
              <ul>
                <li>{user.displayName}</li>
                <li>
                  <a href="#" onClick={handleSignOut}>
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="">
          <a href="#" onClick={handleSignIn}>
            Sign In with Google
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;