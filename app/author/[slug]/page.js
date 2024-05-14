import { fetchdata } from "@/lib/middleware/fetch";
import Author from "@/components/author";
import React from "react";
import Box from "@mui/material/Box";
import Paginationquotes from "@/components/paginationquotes";
import Typography from "@mui/material/Typography";
import Head from "next/head";

export default async function Page({ params }) {
  const { slug } = params;
  const Author_data = await fetchdata(`authors?slug=${slug}`);
  return (
    <Box>
      <Head>
        <title>{slug}|| Author || qutoverse </title>
        <meta name="description" content={`author ${slug} quotoverse`} />
      </Head>
      <Author author={Author_data.results[0]} />
      <Box my="2">
        <Typography
          variant="h5"
          textAlign={"center"}
          textTransform={"capitalize"}
          my={5}
          color="primary"
        >
          quotes
        </Typography>
      </Box>
      <Paginationquotes url={`quotes`} urlpraser={`author=${slug}`} />
    </Box>
  );
}
