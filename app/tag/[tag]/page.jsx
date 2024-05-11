import { fetchdata } from "@/app/fetch";
import Quote from "@/components/quotes";

import Box from "@mui/material/Box";
import React from "react";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

export default async function Page({ params }) {
  const { tag } = params;
  const newtag = tag.replace("%20", "-");
  const data = await fetchdata(`quotes?tags=${newtag}`);
  return (
    <Stack justifyContent={"space-between"} my={5}>
      <Typography
        variant="h5"
        textTransform={"capitalize"}
        textAlign={"center"}
        color="primary"
      >
        #{newtag}
      </Typography>

      {data?.results.map((quote, index) => {
        return <Quote key={index} quote={quote} />;
      })}
    </Stack>
  );
}
