import { onAuthStateChanged } from "@/lib/firebase/auth";
import { firebaseConfig } from "@/lib/firebase/config";
import { useAuthStore } from "@/stores/auth";
import type { Nullable } from "@/types/utility";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useUserSession = (initialUser: Nullable<User>) => {
  const { user, setUser } = useAuthStore((state) => state);

  const router = useRouter();

  useEffect(() => setUser(initialUser), []);

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
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (!user) {
        return
      }

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
}

export default useUserSession; 