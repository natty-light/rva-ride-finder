'use client'
import useUserSession from "@/hooks/useUserSession";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useAuthStore } from "@/stores/auth";
import type { Nullable } from "@/types/utility";
import type { User } from "firebase/auth";
import Link from "next/link";
import type { FC, MouseEvent } from "react";

type HeaderProps = {
  initialUser: Nullable<User>;
}

const Header: FC<HeaderProps> = ({ initialUser }) => {
  useUserSession(initialUser);
  const user = useAuthStore((state) => state.user);

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
      <Link href="/" className="font-bold">
        RVA RIDE FINDER
      </Link>
      {!!user ? (
        <>
          <div className="profile">
            <p>
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