import { CircularProgress, Box, Skeleton, Stack } from "@mui/material";
import React from "react";

export function Loading() {
  return <CircularProgress />;
}
export function LoadingAnimination() {
  return (
    <Stack direction={"column"} justifyContent={"center"}>
      {Array.from({ length: 8 }).map((_, index) => {
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
            <Box my="3" sx="">
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                animation="wave"
              />
            </Box>

            <Stack margin={0} flexWrap={true} sx={{ px: 2 }}>
              <Skeleton
                variant="text"
                sx={{ width: { xs: 200, md: 500, xl: 1000 } }}
                animation="wave"
              />

              <Skeleton variant="rectangular" height={100} animation="wave" />

              <Skeleton variant="text" animation="wave" />
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
