import axios from "axios";
import { getSession, signOut } from "next-auth/react";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
// export default api

// // // 🔐 Prevent multiple logout calls
// // let isLoggingOut = false;

// // // ==========================
// // // REQUEST INTERCEPTOR
// // // ==========================
// // api.interceptors.request.use(
// //   async (config) => {
// //     const session = await getSession();

// //     if (session?.token) {
// //       config.headers.Authorization = `Bearer ${session.token}`;
// //     }

// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // ==========================
// // // RESPONSE INTERCEPTOR
// // // ==========================
// // api.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const status = error?.response?.status;

// //     if ((status === 401 || status === 403) && !isLoggingOut) {
// //       isLoggingOut = true;

// //       try {
// //         await signOut({
// //           callbackUrl: "/auth/login",
// //         });
// //       } finally {
// //         isLoggingOut = false;
// //       }
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// import { authOptions } from "@/app/api/auth/[...nextauth]/option";
// import axios from "axios";
// import { getServerSession } from "next-auth";
// import { getToken } from "next-auth/jwt";
// import { getSession, useSession } from "next-auth/react";

// const api = axios.create({
//   baseURL: process.env.BACKEND, // e.g. http://localhost:5000
// });

// api.interceptors.request.use(async (config) => {
//   // const session= await getServerSession()
//   // console.log('first',session)
//   const tokens = await getToken()
//   console.log('first',tokens)
//   const token = session?.token;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     delete config.headers.Authorization;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const status = err?.response?.status;
//     if (status === 401 || status === 403) {
//       try {
//         const { signOut } = await import("next-auth/react");
//         await signOut({ redirect: false });
//         window.location.href = "/auth/login";
//       } catch {}
//     }
//     return Promise.reject(err);
//   },
// );

// export default api;


