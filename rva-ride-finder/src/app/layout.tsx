import Header from "@/modules/Header";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { ReactNode } from "react";

import '@/styles/globals.css';
import GlobalWrapper from "@/modules/GlobalWrapper";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <html lang="en">
      <body>
        <Header initialUser={currentUser} />
        <main>
          <GlobalWrapper>
            {children}
          </GlobalWrapper>
        </main>
      </body>
    </html>
  );
}