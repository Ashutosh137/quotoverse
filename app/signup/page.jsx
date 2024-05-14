import React from "react";
import Box from "@mui/material/Box";
import LoginComponent from "@/components/login";
export const metadata = {
  title: "Signup || quotoverse",
  description: 'signup in quotoverse',
};
async function Page() {
  return (
    <Box>
      <LoginComponent role="signup" />
    </Box>
  );
}

export default Page;
