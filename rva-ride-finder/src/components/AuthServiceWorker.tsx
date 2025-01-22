'use client';
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { firebaseConfig } from "@/lib/firebase/config";
import { ApiRoutes } from "@/routes";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { type FC, useEffect } from "react";
import { useMutation } from "react-query";

const AuthServiceWorker: FC = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: (req: { uid: string }) => {
      return axios.post(ApiRoutes.RegisterUser, req)
    }
  })

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
      if (!user) {
        return
      }

      mutation.mutate({ uid: user.uid })

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