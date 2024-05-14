import React from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Paginationquotes from "@/components/paginationquotes";
import Head from "next/head";

export default async function Page({ params }) {
  const { tag } = params;
  const newtag = tag.replace("%20", "-");
  return (
    <Stack justifyContent={"space-between"} my={5}>
      <Head>
        <title>Quotes by {newtag}</title>
      </Head>
      <Typography
        variant="h5"
        my={5}
        textTransform={"capitalize"}
        textAlign={"center"}
        color="primary"
      >
        #{newtag}
      </Typography>

      <Paginationquotes url={`quotes`} urlpraser={`tags=${newtag}`} />
    </Stack>
  );
}
