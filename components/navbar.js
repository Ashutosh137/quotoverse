"use client";
import React from "react";
import { Stack, Button, Box, Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useSelector } from "react-redux";
function Navbar() {
  const { isLoggedIn } = useSelector((state) => state.userdata);
  return (
    <Box display="flex" mx="" my={3}>
      <Box display="" mr="auto" my="">
        <Typography
          sx={{
            color: "black",
            textDecoration: "none",
          }}
          component={Link}
          href={"/"}
          variant="h4"
        >
          Qutoverse
        </Typography>
      </Box>
      {!isLoggedIn && (
        <Stack direction={"row"} spacing={2}>
          <Button component={Link} href={"/login"} variant="outlined">
            login
          </Button>
          <Button
            component={Link}
            href={"/signup"}
            variant="contained"
            color="primary"
          >
            join
          </Button>
        </Stack>
      )}
      {isLoggedIn && (
        <Stack
          border={1}
          component={Link}
          href={"/profile"}
          borderColor="primary.main"
          borderRadius={100}
          display=""
          mr={2}
          p={0.2}
          my=""
          sx=""
        >
          <Avatar variant="circular" sx={{ width: 40, height: 40 }} />
        </Stack>
      )}
    </Box>
  );
}

export default Navbar;
