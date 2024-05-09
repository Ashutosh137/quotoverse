import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Stack, Typography, MenuItem, Link } from "@mui/material";

export default function Author({ author }) {
  return (
    <Stack direction={"row"} alignContent={"center"} spacing={1}>
      <Box width={100} my={"auto"} padding={3}>
        <Avatar width={100} sx={{ width: 70, height: 70 }} variant="circular" />
      </Box>
      <Stack px={3} py={4} textTransform={"capitalize"}>
        <Stack justifyContent={"space-between"} direction={"row"}>
          <Box>
            <Typography variant="h5">{author?.name}</Typography>
            <Typography variant="body1">{author?.description}</Typography>
          </Box>
          <Box my={1} mr={20}>
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
          </Box>
        </Stack>

        <Typography my={2} variant="subtitle1">
          {author?.content || author?.bio}
        </Typography>
      </Stack>
    </Stack>
  );
}
