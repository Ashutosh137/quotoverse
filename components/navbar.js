"use client";
import React, { useEffect, useState } from "react";
import {
  Stack,
  Button,
  Box,
  Avatar,
  IconButton,
  useTheme,
  TextField,
  CircularProgress,
} from "@mui/material";
import ContrastIcon from "@mui/icons-material/Contrast";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { fetchdata } from "@/lib/middleware/fetch";
function Navbar({ toggleTheme }) {
  const { isLoggedIn } = useSelector((state) => state.userdata);
  const { palette } = useTheme();
  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState(null);
  const [loading, setloading] = useState(false);

  const searchdata = debounce(async () => {
    setloading(true);
    const data = await fetchdata(`search/authors?query=${search}`);
    setsearchresult(data);
    setloading(false);
  }, [1000]);

  useEffect(() => {
    searchdata(search);
  }, [search]);

  return (
    <Box display="flex" mx="" my={3}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        textTransform={"capitalize"}
        spacing={1}
        fullwidth
        mr="auto"
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
          variant="body1"
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
          variant="body1"
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
          variant="body1"
        >
          tranding authors
        </Typography>
      </Stack>
      <Stack fullWidth position={"relative"} direction={"column"}>
        <TextField
          id="search"
          label="search"
          type="search"
          placeholder="search for authors, quotes, tags"
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        {search && (
          <Stack
            direction={"column"}
            spacing={2}
            zIndex={3}
            sx={{
              backgroundColor: palette.mode === "light" ? "white" : "black",
              overflowY: "scroll",
            }}
            justifyContent={"center"}
            top={70}
            borderRadius={3}
            border={1}
            color={"primary"}
            p={3}
            fullwidth
            maxHeight={400}
            position={"absolute"}
          >
            <Typography
              variant="body1"
              textAlign={"left"}
              pb={1}
              textTransform={"capitalize"}
              color="secondary"
            >
              search result for "{search}"..
            </Typography>
            {searchresult?.count === 0 && (
              <Typography
                textAlign={"center"}
                textTransform={"capitalize"}
                variant="body1"
              >
                no result found
              </Typography>
            )}

            {searchresult?.results?.map((item, index) => {
              return (
                <Typography
                  color={"secondary"}
                  component={Link}
                  border={1}
                  borderRadius={3}
                  p={1}
                  px={2}
                  sx={{
                    textDecoration: "none",
                    ":hover": { borderColor: "primary" },
                  }}
                  onClick={() => {
                    setsearch("");
                    setsearchresult(null);
                  }}
                  href={`/author/${item.slug}`}
                  key={index}
                >
                  {item.name}
                </Typography>
              );
            })}
            {loading && (
              <Stack
                direction={"row"}
                justifyContent={"center"}
                fullwidth
                alignItems={"center"}
                sx={{
                  height: 100,
                }}
              >
                <CircularProgress />
              </Stack>
            )}
          </Stack>
        )}
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
