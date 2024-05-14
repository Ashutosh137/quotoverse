import React from "react";
import { Typography, Avatar, Stack, Button, Box } from "@mui/material";

export default function Author({ author }) {
  return (
    <Stack
      alignItems="center"
      spacing={{ xs: 2, md: 0 }}
      sx={{
        textDecoration: "none",
        borderRadius: 3,
        my: 1,
        border: 1,
        p: 1,
        color: "primary",
      }}
    >
      <Stack
        py={{ xs: 2, md: 4 }}
        px={{xs:3,md:5}}
        textTransform="capitalize"
        spacing={1}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" color="primary">
            {author?.name}
          </Typography>
          <Button
            href={author?.link}
            variant="contained"
            component={"a"}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            Visit
          </Button>
        </Stack>
        <Typography variant="body1" color="primary">
          {author?.description}
        </Typography>
        <Typography variant="subtitle2" py={2} color="primary">
          {author?.content || author?.bio}
        </Typography>
        <Typography variant="body1" color="primary">
          Total Quotes: {author.quoteCount}
        </Typography>
      </Stack>
    </Stack>
  );
}
