"use server";
import React from "react";
import Box from "@mui/material/Box";
import LoginComponent from "@/components/login";
import { redirect } from "next/navigation";

export const handlelogin = async (email, password, name) => {
  console.log("safkdk")
  const data = await fetch("http://localhost:3000/signup/api"
  , {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),}
  );
  const res = await data.json();
  console.log(res);
  // if (res.message) {
  //   redirect("/login")
  // }
};
async function Page() {
  return (
    <Box>
      <LoginComponent handlesubmit={handlelogin} role="signup" />
    </Box>
  );
}

export default Page;
