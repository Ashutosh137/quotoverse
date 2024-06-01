import React from "react";
import { Loading as Loadingui } from "@/components/ui/loading";
import { Stack } from "@mui/material";
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
      <Loadingui />
    </Stack>
  );
}
