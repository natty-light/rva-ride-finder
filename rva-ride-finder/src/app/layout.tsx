import AuthServiceWorker from "@/components/AuthServiceWorker"
import { ReactNode } from "react";

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthServiceWorker />
        <main>{children}</main>
      </body>
    </html>
  );
}