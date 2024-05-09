"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Avatar,
  Stack,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";
import SwapCallsOutlinedIcon from "@mui/icons-material/SwapCallsOutlined";
import { Addfavoriate, Removefavorite } from "@/lib/store/userreducer";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";
import { updateuserdata } from "@/lib/store/userreducer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
// import { ExpandMore } from "@mui/icons-material";
export default function Quote({ quote, redirect = true }) {
  const dispatch = useDispatch();
  const { favorite } = useSelector((state) => state.userdata);
  const [like, setLike] = useState(false);

  useEffect(() => {
    setLike(favorite.includes(quote?._id));
  }, [favorite, quote]);

  const handlelike = debounce(() => {
    dispatch(updateuserdata(quote));
    setLike((prev) => !prev);
  }, 300);

  return (
    <Stack
      passHref
      border={1}
      borderRadius={3}
      component={Link}
      href={redirect ? `/quotes/${quote?._id}` : ""}
      direction="row"
      sx={{
        color: "ThreeDDarkShadow",
        textDecoration: "none",
      }}
      spacing={1}
      my={2}
      p={2}
    >
      <Box my="3">
        <Avatar variant="solid" sx={{ my: 2, mx: 1 }} />
      </Box>

      <Stack margin={0} sx={{ px: 2 }}>
        <Typography
          sx={{
            color: "WindowText",
            textDecoration: "none",
          }}
          component={Link}
          href={`/author/${quote?.authorSlug}`}
          variant="h6"
          py={1}
        >
          {quote?.author}
        </Typography>
        <Typography variant="subtitle1" fontFamily={"cursive"} lineHeight={1.5}>
          "{quote?.content}"
        </Typography>

        <Stack direction="row" flexWrap={"wrap"} py={1}>
          {quote?.tags?.map((tag, index) => {
            return (
              <MenuItem
                key={index}
                component={Link}
                href={`/tag/${tag}`}
                sx={{ color: "GrayText" }}
              >
                #{tag}
              </MenuItem>
            );
          })}
        </Stack>

        <Stack margin={0} spacing={2} direction={"row"}>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              handlelike();
            }}
            sx={{ color: "MenuText" }}
            variant="text"
          >
            {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton sx={{ color: "MenuText" }} variant="text">
            <ForumSharpIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              navigator.share({
                title: `${quote?.content}: by ${quote?.author}`,
              });
            }}
            sx={{ color: "MenuText" }}
            variant="text"
          >
            <SwapCallsOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
