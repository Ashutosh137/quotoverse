// useNavigate.js
"use client";
import { useRouter } from "next/navigation";

export default function useNavigate() {
  const router = useRouter();

  const navigate = (url) => {
    router.push(url);
  };

  return navigate;
}
