"use server";
import LoginComponent from "@/components/login";
import { Box } from "@mui/material";
import React from "react";


const Page = async () => {
  return (
    <Box>
      <LoginComponent />
    </Box>
  );
};

export default Page;
