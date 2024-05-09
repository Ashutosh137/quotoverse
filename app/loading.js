import React from "react";
import { Skeleton, Box, Stack, CircularProgress } from "@mui/material";
export default function Loading() {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      fullwidth
      alignItems={"center"}
      sx={{
        height: 600,
      }}
    >
      <CircularProgress />
    </Stack>
  );
}
