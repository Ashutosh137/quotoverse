import Resetpassword from "@/components/reset-password";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default async function Page({ params }) {
  const { token } = params;
  const router = headers();
  const origin = await router.get("host");
  const data = await fetch(`http://${origin}/reset-password/${token}/api`, {
    cache: "no-cache",
  }).then((res) => res.json());

  if (data.message !== "success") {
    toast.error("no user found")
    redirect("/login");
  }

  return <Resetpassword token={token} />;
}
