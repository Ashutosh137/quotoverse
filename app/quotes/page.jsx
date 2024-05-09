import React from "react";
import { fetchdata } from "../fetch";
import Quote from "@/components/quotes";
import { Box } from "@mui/material";

export default async function Page() {
  const allquotes = await fetchdata("quotes");
  return (
    <Box>
      {allquotes?.results?.map((quote, index) => {
        return <Quote key={index} quote={quote} />;
      })}
    </Box>
  );
}
