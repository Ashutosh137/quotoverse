"use client";
import { fetchdata } from "@/lib/middleware/fetch";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import Quote from "./quotes";
import { Stack, CircularProgress } from "@mui/material";
import Author from "./author";

export default function Paginationquotes({
  url,
  isquote = true,
  urlpraser = "",
}) {
  const [page, setpage] = useState(1);
  const [quotes, setquotes] = useState([]);
  const [loading, setloading] = useState(false);

  const data = async () => {
    setloading(true);
    const results = await fetchdata(`${url}?page=${page}&${urlpraser}`);
    setquotes((prev) => [...prev, ...results?.results]);
    setloading(false);
  };

  useEffect(() => {
    data();
  }, [page]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
          document.documentElement.offsetHeight &&
        !loading
      ) {
        setpage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <Box display="" mx="" my="" sx="">
      {quotes.length > 0 &&
        quotes.map((quote, index) => {
          return isquote ? (
            <Quote key={index} quote={quote} />
          ) : (
            <Box
              passHref
              key={index}
              color={"primary"}
              sx={{
                textDecoration: "none",
              }}
              component={Link}
              href={`author/${quote?.slug}`}
            >
              <Author author={quote} />
            </Box>
          );
        })}

      {loading && (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          fullwidth
          alignItems={"center"}
          sx={{
            height: 300,
          }}
        >
          <CircularProgress />
        </Stack>
      )}
    </Box>
  );
}
