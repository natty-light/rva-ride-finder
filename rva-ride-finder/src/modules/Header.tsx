'use client';
import useUserSession from "@/hooks/useUserSession";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useAuthStore } from "@/stores/auth";
import type { Nullable } from "@/types/utility";
import type { User } from "firebase/auth";
import Link from "next/link";
import type { FC, MouseEvent } from "react";
import useDrawer from "@/hooks/useDrawer";
import ProfileDrawer from "./ProfileDrawer";
import { Routes } from "@/routes";

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

  const {
    isOpen: isOpenProfileDrawer,
    close: closeProfileDrawer,
    open: openProfileDrawer
  } = useDrawer();

  return (
    <header className="flex flex-row h-fit m-2">
      <Link href={Routes.Feed} className="font-bold">
        RVA RIDE FINDER
      </Link>
      <ProfileDrawer onClose={closeProfileDrawer} isOpen={isOpenProfileDrawer} handleSignOut={handleSignOut} />
      <div className="flex ml-auto" onClick={user ? openProfileDrawer : handleSignIn}>
        {!!user ? (
          <div>
            <p>
              {user.displayName}
            </p>
          </div>
        ) : (
          <div>
            <a href="#">
              Sign In with Google
            </a>
          </div>
        )}
      </div>
    </header >
  );
};

export default Header;