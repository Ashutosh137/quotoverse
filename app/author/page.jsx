import React from "react";
import { fetchdata } from "../fetch";
import Link from "next/link";
import Box from "@mui/material/Box";
import Author from "@/components/author";
import Typography from '@mui/material/Typography'

async function Page() {
  const Allauthors = await fetchdata("authors");
  return (
    <Box >
      <Typography variant="h5" textAlign={"center"} my={3} textTransform={"capitalize"} color="primary">tranding authors</Typography>
      {Allauthors.results.map((author, index) => {
        return <Box passHref key={index}  sx={{
          color:"WindowText",
          textDecoration:"none"
        }} component={Link} href={`author/${author?.slug}`}>
          <Author author={author} />
        </Box> 
      })}
    </Box>
  );
}

export default Page;
