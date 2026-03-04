import axios from "axios";
import { getSession, signOut } from "next-auth/react";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Prevent multiple logout calls
let isLoggingOut = false;

// ==========================
// REQUEST INTERCEPTOR
// ==========================
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================
// RESPONSE INTERCEPTOR
// ==========================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if ((status === 401 || status === 403) && !isLoggingOut && typeof window !== "undefined") {
      isLoggingOut = true;

      try {
        // Clear the session first (don't let NextAuth handle the redirect)
        await signOut({ redirect: false });
      } catch (e) {
        // signOut may fail if session is already gone, that's fine
      } finally {
        isLoggingOut = false;
        // Force a hard redirect to login — this always works
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);
