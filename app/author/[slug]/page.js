import { fetchdata } from "@/app/fetch";
import Author from "@/components/author";
import React from "react";
import Box from "@mui/material/Box";
import Quote from "@/components/quotes";
import Typography from "@mui/material/Typography";
export default async function Page({ params }) {
  const { slug } = params;
  const Author_data = await fetchdata(`authors?slug=${slug}`);
  const Allquotes = await fetchdata(`quotes?author=${slug}`);
  console.log(Allquotes);

  return (
    <div>
      <Author author={Author_data.results[0]} />
      {Allquotes.results.length === 0 && (
        <Typography variant="body1" color="initial">
          no qoutes
        </Typography>
      )}
      {Allquotes?.results?.map((quote, index) => {
        return <Quote key={index} quote={quote} />;
      })}
    </div>
  );
}
