'use client';

import AuthServiceWorker from "@/modules/AuthServiceWorker";
import type { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type GlobalWrapperProps = {
  children: ReactNode;
}

const GlobalWrapper: FC<GlobalWrapperProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthServiceWorker />
      {children}
    </QueryClientProvider>
  );
};

export default GlobalWrapper;