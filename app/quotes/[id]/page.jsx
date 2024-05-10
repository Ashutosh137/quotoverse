import { fetchdata } from "@/app/fetch";
import Addcomment, { Comment } from "@/components/comment";
import Quote from "@/components/quotes";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default async function Page({ params }) {
  const { id } = params;
  const quotePromise = await fetchdata(`quotes/${id}`);
  const { comments } = await fetch(`http://localhost:3000/quotes/${id}/api`, {
    headers: {
      "Cache-Control": "no-cache",
    },
  }).then((res) => res.json());

  return (
    <div>
      <Quote redirect={false} quote={quotePromise} />
      <Typography variant="h6" color="initial" my={2} textAlign={"center"}>
        Comments
      </Typography>
      <Addcomment id={id} />
      <Box display="" mx="" my="" sx="">
        {comments.map((comment, index) => {
          return <Comment key={index} comment={comment} />;
        })}
      </Box>
    </div>
  );
}
