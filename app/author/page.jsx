import React from "react";
import { fetchdata } from "../../lib/middleware/fetch";
import Link from "next/link";
import Box from "@mui/material/Box";
import Author from "@/components/author";
import Typography from '@mui/material/Typography'
import Paginationquotes from "@/components/paginationquotes";
export const metadata = {
  title: "Authors || quotoverse",
  description: 'all authors in quotoverse',
};
async function Page() {
  const Allauthors = await fetchdata("authors");
  return (
    <Box >
      <Typography variant="h5" textAlign={"center"} my={5} textTransform={"capitalize"} color="primary">tranding authors</Typography>
      <Paginationquotes url={"authors"} isquote={false}/>
    </Box>
  );
}

export default Page;
