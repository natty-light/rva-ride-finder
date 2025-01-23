import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { useCallback } from "react";

const useFetchers = () => {
  const user = useAuthStore((state) => state.user);

  const post = useCallback(async <TData, TResponse>(url: string, data: TData) => {
    const idToken = await user?.getIdToken();

    if (!idToken) {
      return;
    }

    return axios.post<TResponse>(url, data, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
  }, [user]);

  const get = useCallback(async <TResponse>(url: string, params?: Record<string, unknown>) => {
    const idToken = await user?.getIdToken();

    if (!idToken) {
      return;
    }

    return axios.get<TResponse>(url, {
      params,
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
  }, [user]);

  return { post, get };
};

export default useFetchers;