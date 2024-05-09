"use client"
import { useRouter } from "next/navigation";
export default function useNavigate(url) {
  const router = useRouter();
  router.push(url);
  return null
}
