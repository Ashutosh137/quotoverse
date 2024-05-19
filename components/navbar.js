import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  TextField,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ContrastIcon from "@mui/icons-material/Contrast";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { fetchdata } from "@/lib/middleware/fetch";
import Link from "next/link";
import Quote from "./quotes";

function Navbar({ toggleTheme }) {
  const { isLoggedIn } = useSelector((state) => state.userdata);
  const { palette } = useTheme();
  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState(null);
  const [searchquotes, setsearchquotes] = useState(null);
  const [loading, setloading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const searchdata = debounce(async () => {
    setloading(true);
    setsearchquotes(await fetchdata(`search/quotes?query=${search}`));
    setsearchresult(await fetchdata(`search/authors?query=${search}`));
    setloading(false);
  }, [1200]);

  useEffect(() => {
    searchdata(search);
  }, [search]);

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Toolbar py={10}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h4"
          color={"primary"}
          sx={{ textDecoration: "none", flexGrow: 1 }}
          component={Link}
          href="/"
        >
          Qutoverse
        </Typography>
        <Stack
          direction={"row"}
          display={{ xs: "none", md: "flex" }}
          spacing={2}
          mx={5}
          alignItems={"center"}
        >
          <Typography
            sx={{ textDecoration: "none" }}
            color={"primary"}
            variant="h6"
            href={`/quotes`}
            component={Link}
          >
            Quotes
          </Typography>
          <Typography
            sx={{ textDecoration: "none" }}
            color={"primary"}
            variant="h6"
            href={`/author`}
            component={Link}
          >
            Authors
          </Typography>
          <Typography
            sx={{ textDecoration: "none" }}
            color={"primary"}
            variant="h6"
            href={`/tag`}
            component={Link}
          >
            Tags
          </Typography>
          {!isLoggedIn ? (
            <Stack direction={"row"} mx={2} spacing={2}>
              <Button
                variant="outlined"
                component={Link}
                href="/login"
                color="primary"
              >
                login
              </Button>
              <Button
                variant="contained"
                component={Link}
                href="/signup"
                color="primary"
              >
                join
              </Button>
            </Stack>
          ) : (
            <Box mx={3} href={"/profile"} component={Link}>
              <Avatar variant="circular" sx={{ width: 40, height: 40 }} />
            </Box>
          )}
        </Stack>

        <IconButton onClick={toggleTheme} color="primary">
          {palette.mode === "dark" ? <DarkModeIcon /> : <ContrastIcon />}
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="left"
        fullWidth
        open={menuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Typography
          variant="h5"
          my={3}
          mx={2}
          color="primary"
          component={Link}
          sx={{ textDecoration: "none" }}
          href="/"
        >
          Quotoverse
        </Typography>
        <List>
          <ListItem
            sx={{
              textDecoration: "none",
              color: palette.mode === "dark" ? "white" : "black",
            }}
            component={Link}
            href="/quotes"
          >
            <ListItemText primary="Quotes" />
          </ListItem>
          <ListItem
            sx={{
              textDecoration: "none",
              color: palette.mode === "dark" ? "white" : "black",
            }}
            component={Link}
            href="/tag"
          >
            <ListItemText primary="Tags" color="white" />
          </ListItem>
          <ListItem
            sx={{
              textDecoration: "none",
              color: palette.mode === "dark" ? "white" : "black",
            }}
            component={Link}
            href="/author"
          >
            <ListItemText primary="Authors" />
          </ListItem>
          {!isLoggedIn ? (
            <>
              <ListItem
                sx={{
                  textDecoration: "none",
                  color: palette.mode === "dark" ? "white" : "black",
                }}
                component={Link}
                href="/login"
              >
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                sx={{
                  textDecoration: "none",
                  color: palette.mode === "dark" ? "white" : "black",
                }}
                component={Link}
                href="/signup"
              >
                <ListItemText primary="Join" />
              </ListItem>
            </>
          ) : (
            <ListItem
              sx={{
                textDecoration: "none",
                color: palette.mode === "dark" ? "white" : "black",
              }}
              component={Link}
              href="/profile"
            >
              <ListItemText primary="Profile" />
            </ListItem>
          )}
        </List>
      </Drawer>
      <Box
        my={3}
        border={search ? 1 : 0}
        borderRadius={5}
        mx={1}
        borderColor={palette.mode === "light" ? "black" : "white"}
      >
        <TextField
          id="search"
          label="Search"
          type="search"
          placeholder="Search for authors, quotes, tags"
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
          fullWidth
          sx={{ mb: 2 }}
        />
        {search && (
          <Box>
            {loading && (
              <Stack direction={"row"} my={5} justifyContent={"center"}>
                <CircularProgress />
              </Stack>
            )}
            {searchresult && (
              <List px={2}>
                <Typography
                  ml={2}
                  variant="h6"
                  my={2}
                  textTransform={"capitalize"}
                  color="secondary"
                >
                  Search results for "{search}"..
                </Typography>
                {searchresult.count === 0 &&
                  !searchquotes &&
                  searchquotes?.count === 0 && (
                    <Typography
                      variant="body1"
                      textAlign={"center"}
                      textTransform={"capitalize"}
                      color="primary"
                    >
                      no result found
                    </Typography>
                  )}
                {searchresult?.results?.map((item, index) => (
                  <ListItem
                    key={index}
                    component={Link}
                    onClick={() => {
                      setsearch("");
                    }}
                    sx={{
                      textDecoration: "none",
                      color: palette.mode === "dark" ? "white" : "black",
                    }}
                    href={`/author/${item.slug}`}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                ))}
                <Box
                  maxHeight={500}
                  my={2}
                  sx={{ overflowY: "scroll", scrollbarColor: "revert" }}
                  className="scrollhidden"
                >
                  {searchquotes?.count != 0 && (
                    <Typography
                      ml={5}
                      pl={2}
                      my={2}
                      borderBottom={1}
                      pb={1}
                      variant="body1"
                      color="primary"
                    >
                      Quotes for "{search}"
                    </Typography>
                  )}
                  {searchquotes?.results?.map((item, index) => {
                    return (
                      <Box mx={{ xs: 2, md: 10 }}>
                        <Quote key={index} quote={item} />
                      </Box>
                    );
                  })}
                </Box>
              </List>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

export default Navbar;
