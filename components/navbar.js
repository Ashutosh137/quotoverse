"use client";
import React from "react";
import {
  Stack,
  Button,
  Box,
  Avatar,
  IconButton,
  useTheme,
} from "@mui/material";
import ContrastIcon from "@mui/icons-material/Contrast";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useSelector } from "react-redux";
function Navbar({ toggleTheme }) {
  const { isLoggedIn } = useSelector((state) => state.userdata);
  const { palette } = useTheme();
  return (
    <Box display="flex" mx="" my={3}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        mr="auto"
        my=""
      >
        <Typography
          color="primary"
          sx={{
            textDecoration: "none",
          }}
          component={Link}
          href={"/"}
          variant="h4"
        >
          Qutoverse
        </Typography>
        <Typography
          sx={{
            textDecoration: "none",
          }}
          color="primary"
          component={Link}
          href={"/quotes"}
          variant="h6"
        >
          tranding quotes
        </Typography>
        <Typography
          sx={{
            textDecoration: "none",
          }}
          color="primary"
          component={Link}
          href={"/tag"}
          variant="h6"
        >
          all tags
        </Typography>
        <Typography
          color="primary"
          sx={{
            textDecoration: "none",
          }}
          component={Link}
          href={"/author"}
          variant="h6"
        >
          tranding authors
        </Typography>
      </Stack>
      <IconButton onClick={toggleTheme}>
        {palette.mode === "dark" ? <DarkModeIcon /> : <ContrastIcon />}
      </IconButton>
      {!isLoggedIn && (
        <Stack direction={"row"} spacing={2}>
          <Button
            color="primary"
            borderColor="primary"
            component={Link}
            href={"/login"}
            variant="outlined"
          >
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
          mr={2}
          p={0.2}
        >
          <Avatar variant="circular" sx={{ width: 40, height: 40 }} />
        </Stack>
      )}
    </Box>
  );
}

export default Navbar;
