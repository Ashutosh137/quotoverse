"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Avatar,
  Stack,
  MenuItem,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import SwapCallsOutlinedIcon from "@mui/icons-material/SwapCallsOutlined";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";
import { updateuserdata } from "@/lib/store/userreducer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import toast from "react-hot-toast";

export default function Quote({ quote, redirect = true }) {
  const dispatch = useDispatch();
  const { favorite, isLoggedIn } = useSelector((state) => state.userdata);
  const [like, setLike] = useState(false);
  const { palette } = useTheme();

  useEffect(() => {
    setLike(favorite.includes(quote?._id));
  }, [favorite, quote]);

  const handleLike = debounce(() => {
    if (isLoggedIn) {
      dispatch(updateuserdata(quote));
      setLike((prev) => !prev);
    } else toast.error("Login Required");
  }, 300);

  return (
    <Stack
      sx={{
        textDecoration: "none",
      }}
      passHref
      border={1}
      borderRadius={3}
      component={Link}
      href={redirect ? `/quotes/${quote?._id}` : ""}
      direction={{ xs: "column", md: "row" }}
      color={palette.mode === "light" ? "black" : "white"}
      spacing={1}
      my={3}
      p={1}
      py={2}
    >
      <Box
        display="flex"
        justifyContent="center"
        py={{ xs: 1, md: 3 }}
        px={{ xs: 0, md: 2 }}
      >
        <Avatar variant="solid" sx={{ width: 60, height: 60 }} />
      </Box>

      <Stack margin={0} sx={{ px: { xs: 2, md: 0 } }} flexGrow={1}>
        <Typography
          sx={{
            textDecoration: "none",
          }}
          component={Link}
          color="primary"
          href={`/author/${quote?.authorSlug}`}
          variant="h6"
          textAlign={{ xs: "center", md: "left" }}
          py={1}
        >
          {quote?.author}
        </Typography>
        <Typography
          color={"primary"}
          variant="subtitle1"
          fontFamily={"cursive"}
          lineHeight={1.5}
          textAlign={{ xs: "center", md: "left" }}
        >
          "{quote?.content}"
        </Typography>

        <Stack direction="row" pt={2} flexWrap="wrap">
          {quote?.tags?.map((tag, index) => (
            <MenuItem
              color="primary"
              sx={{
                textDecoration: "none",
              }}
              key={index}
              component={Link}
              href={`/tag/${tag}`}
            >
              #{tag}
            </MenuItem>
          ))}
        </Stack>

        <Stack
          direction={"row"}
          m={{ xs: "auto", md: 2 }}
          pb={{ xs: 3, md: 0 }}
          spacing={2}
        >
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              handleLike();
            }}
            sx={{ color: "secondary" }}
            variant="text"
          >
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton sx={{ color: "secondary" }} variant="text">
            <ForumSharpIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigator.share({
                title: `A quote by ${quote.author}`,
                text: `${quote.content} : ${quote.author}`,
                url: `${window.origin}/quotes/${quote._id}`,
              });
            }}
            sx={{ color: "secondary" }}
            variant="text"
          >
            <SwapCallsOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
