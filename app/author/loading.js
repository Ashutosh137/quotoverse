import React from "react";
import { Skeleton, Box, Stack } from "@mui/material";
export default function Loading() {
  return (
    <Stack justifyContent={"center"}>
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
              <Skeleton variant="text"animation="wave" />

              <Skeleton variant="rectangular"animation="wave" />

              <Skeleton variant="text" animation="wave" />
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
