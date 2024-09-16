import React from "react";
import { Box } from "@mui/material";
import Paginationquotes from "@/components/paginationquotes";
export const metadata = {
  title: "Quotes || Quotoverse",
  description: "all quotes in quotoverse",
};
export default async function Page() {
  return (
    <Box>
      <Paginationquotes url={"quotes"} />
    </Box>
  );
}
