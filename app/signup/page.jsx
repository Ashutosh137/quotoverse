import React from "react";
import Box from "@mui/material/Box";
import LoginComponent from "@/components/login";

async function Page() {
  return (
    <Box>
      <LoginComponent role="signup" />
    </Box>
  );
}

export default Page;
