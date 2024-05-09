import React from "react";
import { fetchdata } from "../fetch";
import Link from "next/link";
import Box from "@mui/material/Box";
import Author from "@/components/author";

async function Page() {
  const Allauthors = await fetchdata("authors");
  return (
    <Box mx="" my="" sx="">
      {Allauthors.results.map((author, index) => {
        return <Box key={index}  sx={{
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
