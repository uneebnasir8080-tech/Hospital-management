// components/PathProvider.jsx
"use client";

import { usePathname } from "next/navigation";

export default function PathProvider({ children }) {
  const pathname = usePathname();
  console.log('first', pathname)
   const pageName = pathname.split("/").filter(Boolean).pop() || "";
  return pageName;
}