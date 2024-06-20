import LoginComponent from "@/components/login";
import { Box } from "@mui/material";
import React from "react";
export const metadata = {
  title: "Login || quotoverse",
  description: 'Login  quotoverse',
};

const Page = async () => {
  return (
      <LoginComponent />
  );
};

export default Page;
