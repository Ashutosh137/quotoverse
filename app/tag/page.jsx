import React from "react";
import { fetchdata } from "../fetch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Stack } from "@mui/material";

export default async function Page() {
  const tags = await fetchdata("tags");
  return (
    <Box>
      <Typography variant="h5" textAlign={"center"} color="initial">
        Tags
      </Typography>
      {tags.map((tag, index) => {
        return (
          <Stack
            key={index}
            direction={"row"}
            justifyContent={"space-between"}
            border={1}
            p={1}
            px={3}
            borderRadius={3}
            spacing={2}
            my={3}
          >
            <Typography
              component={Link}
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
              href={`tag/${tag?.slug}`}
              variant="button"
              color="initial"
            >
              # {tag?.name} :
            </Typography>
            <Typography variant="body1" color="initial">
              {tag?.quoteCount}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
}
