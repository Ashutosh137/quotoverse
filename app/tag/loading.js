import React from "react";
import { Skeleton, Box, Stack, CircularProgress } from "@mui/material";
export default function Loading() {
  return (
    <Stack justifyContent={"center"}>
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <Stack
            key={index}
            direction="row"
            sx={{
              color: "ThreeDDarkShadow",
              textDecoration: "none",
            }}
            spacing={1}
            my={1}
            p={1}
          >
            <Skeleton variant="text"  animation="wave" />
          </Stack>
        );
      })}
    </Stack>
  );
}
