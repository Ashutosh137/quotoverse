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
import toast from "react-hot-toast";
// import { ExpandMore } from "@mui/icons-material";
export default function Quote({ quote, redirect = true }) {
  const dispatch = useDispatch();
  const { favorite ,isLoggedIn} = useSelector((state) => state.userdata);
  const [like, setLike] = useState(false);

  useEffect(() => {
    setLike(favorite.includes(quote?._id));
  }, [favorite, quote]);

  const handlelike = debounce(() => {
    if (isLoggedIn) {
    dispatch(updateuserdata(quote));
    setLike((prev) => !prev);}
    else toast.error("Login Required")
  }, 300);

  return (
    <Stack
      passHref
      border={1}
      borderRadius={3}
      borderColor={"primary"}
      component={Link}
      href={redirect ? `/quotes/${quote?._id}` : ""}
      direction="row"
      sx={{
        textDecoration: "none",
      }}
      color={"white"}
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
            textDecoration: "none",
          }}
          component={Link}
          color="primary"
          href={`/author/${quote?.authorSlug}`}
          variant="h6"
          py={1}
        >
          {quote?.author}
        </Typography>
        <Typography color={"primary"} variant="subtitle1" fontFamily={"cursive"} lineHeight={1.5}>
          "{quote?.content}"
        </Typography>

        <Stack direction="row" flexWrap={"wrap"} py={1}>
          {quote?.tags?.map((tag, index) => {
            return (
              <MenuItem
                key={index}
                component={Link}
                href={`/tag/${tag}`}
                color="secondary"
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
                title: `${quote?.content}: by ${quote?.author}`,
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
