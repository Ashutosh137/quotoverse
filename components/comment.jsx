"use client";

import {
  Box,
  Stack,
  TextField,
  Button,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useSelector } from "react-redux";
import convertDateStringIntoSeconds from "@/lib/middleware/time";
import { debounce } from "lodash";
import toast from "react-hot-toast";

export default function Addcomment({ id }) {
  const [comment, setcomment] = useState("");
  const { isLoggedIn, uid } = useSelector((state) => state.userdata);

  return (
    <Stack
      direction={"row"}
      gap={2}
      component={"form"}
      onSubmit={async (e) => {
        e.preventDefault();
        if (isLoggedIn) {
          try {
            const data = await fetch(`http://localhost:3000/quotes/${id}/api`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: comment,
                postedby: uid,
                quoteid: id,
              }),
            });
            const res = await data.json();
            if (res.error) {
              toast.error(res.error);
            }
            toast.success(res?.message);
            console.log(res);
            setcomment("");
          } catch {
            (err) => {
              toast.error(err.message);
              console.log(err);
            };
          }
        } else {
          console.log("not loggined");
          toast.error("Login required");
          setcomment("");
        }
      }}
    >
      <TextField
        id="comment"
        fullWidth
        label="Comment on this quotes"
        placeholder="Comment on this quotes"
        value={comment}
        onChange={(e) => {
          setcomment(e.target.value);
        }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ font: "menu" }}
        color="primary"
      >
        comment
      </Button>
    </Stack>
  );
}

function Comment({ comment }) {
  const { uid } = useSelector((state) => state.userdata);

  const [commentby, setcommentby] = useState({});
  const [isliked, setisliked] = useState(false);

  useEffect(() => {
    const data = async () => {
      const postedby = await fetch(
        `http://localhost:3000/profile/${comment?.postedby}`,
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      ).then((res) => res.json());
      setcommentby(postedby.profiledata);
    };
    comment.likes.includes(uid) ? setisliked(true) : setisliked(false);
    data();
  }, []);

  const handlelike = debounce(() => {
    // dispatch(updateuserdata(quote));
    setLike((prev) => !prev);
  }, 300);

  return (
    <Stack
      my={2}
      p={1}
      border={1}
      borderColor={"ActiveBorder"}
      borderRadius={2}
      direction={"row"}
    >
      <Box p={2}>
        <Avatar variant="circular" />
      </Box>
      <Stack fullWidth my={"auto"} py={1} direction={"column"}>
        <Stack py={1} direction={"row"} alignItems={"center"} spacing={2}>
          <Typography
            variant="body1"
            color="CaptionText"
            sx={{ color: "GrayText" }}
            textTransform={"capitalize"}
          >
            {commentby.name}
          </Typography>
          <Typography
            variant="caption"
            color="CaptionText"
            sx={{ color: "GrayText" }}
            textTransform={"capitalize"}
          >
            {/* {commentby.createdat} */}
            {convertDateStringIntoSeconds(comment.createdat)}
          </Typography>
        </Stack>

        <Typography variant="body2" fontFamily={"cursive"} color="initial">
          '{comment.text}'
        </Typography>
      </Stack>
      <Box display="" mx="" ml={"auto"} mr={2} my="auto" sx="">
        <IconButton
          sx={{ color: "GrayText" }}
          onClick={() => {
            setisliked((prev) => !prev);
            handlelike();
          }}
        >
          {!isliked ? <FavoriteBorder /> : <Favorite />}
        </IconButton>
      </Box>
    </Stack>
  );
}

export { Comment };
