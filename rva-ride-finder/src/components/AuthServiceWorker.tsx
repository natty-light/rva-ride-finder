'use client';
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { firebaseConfig } from "@/lib/firebase/config";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { type FC, useEffect } from "react";

const AuthServiceWorker: FC = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`

      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (user === undefined) {
        return
      }

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  return null;


}

export default AuthServiceWorker;