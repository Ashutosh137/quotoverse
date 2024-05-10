import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Stack, Typography} from "@mui/material";

export default function Author({ author }) {
  return (
    <Stack passHref direction={"row"} border={1} borderRadius={3} my={3} borderColor={"primary"} color={"white"} flexWrap={"nowrap"}  spacing={1}>
      <Box   m={"auto"} my={2} padding={3}>
        <Avatar sx={{ width: 70, height: 70 }} variant="circular" />
      </Box>
      <Stack  px={2} py={4} textTransform={"capitalize"}>
        <Stack justifyContent={"space-between"} direction={"row"}>
          <Box>
            <Typography color={"primary"} variant="h5">{author?.name}</Typography>
            <Typography color={"primary"} variant="body1">{author?.description}</Typography>
          </Box>
          <Box my={1} mr={1}>
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

        <Typography my={2} color={"primary"} variant="subtitle1">
          {author?.content || author?.bio}
        </Typography>
      </Stack>
    </Stack>
  );
}
