import AuthServiceWorker from "@/components/AuthServiceWorker"
import Header from "@/modules/Header";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { ReactNode } from "react";

import '@/styles/globals.css'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <html lang="en">
      <body>
        <AuthServiceWorker />
        <Header initialUser={currentUser} />
        <main>{children}</main>
      </body>
    </html>
  );
}