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
import { FavoriteBorder, Favorite, DeleteForever } from "@mui/icons-material";
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
      color={"primary"}
      component={"form"}
      onSubmit={async (e) => {
        e.preventDefault();
        if (isLoggedIn) {
          try {
            const data = await fetch(`${window.origin}/quotes/${id}/api`, {
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
            setcomment("");
          } catch {
            (err) => {
              toast.error(err.message);
              console.log(err);
            };
          }
        } else {
          toast.error("Login required");
          setcomment("");
        }
      }}
    >
      <TextField
        id="comment"
        fullWidth
        required
        label="Comment on this quotes"
        placeholder="Comment on this quotes"
        value={comment}
        onChange={(e) => {
          setcomment(e.target.value);
        }}
      />
      <Button variant="contained" type="submit" color="primary">
        comment
      </Button>
    </Stack>
  );
}

function Comment({ comment }) {
  const { uid, isLoggedIn } = useSelector((state) => state.userdata);
  const [commentby, setcommentby] = useState({});
  const [isdeleted, setisdeleted] = useState(false);
  const [isliked, setisliked] = useState(false);

  useEffect(() => {
    const data = async () => {
      const postedby = await fetch(
        `${window.origin}/profile/${comment?.postedby}`,
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

  const handlelike = debounce(async () => {
    try {
      const data = await fetch(`${window.origin}/quotes/${comment._id}/api`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentid: comment._id,
          uid,
          isliked,
        }),
      });
      const res = await data.json();
      if (res.error) {
        toast.error(res.error);
      }
      toast.success(res?.message);
    } catch {
      (err) => {
        toast.error(err.message);
        console.log(err);
      };
    }
  }, 300);

  const handledelete = async () => {
    try {
      const data = await fetch(`${window.origin}/quotes/${comment._id}/api`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentid: comment._id,
        }),
      }).then((res) => res.json());
      if (data.error) {
        toast.error(data.error);
      }
      if (data.message === "Comment Sucessfully deleted") setisdeleted(true);
    } catch {
      (err) => toast.error(err);
    }
  };

  return (
    <Box>
      {isdeleted ? (
        <Box>
          <Typography
            textAlign={"center"}
            textTransform={"capitalize"}
            my={2}
            variant="body1"
            color="primary"
          >
            this comment is deleted
          </Typography>
        </Box>
      ) : (
        <Stack
          my={2}
          p={1}
          border={1}
          borderColor={"ActiveBorder"}
          borderRadius={2}
          direction={"row"}
        >
          <Box p={{ xs: 1, md: 3 }}>
            <Avatar color="primary" variant="circular" />
          </Box>
          <Stack fullWidth my={"auto"} py={1} direction={"column"}>
            <Stack py={1} direction={"row"} alignItems={"center"} spacing={2}>
              <Typography
                variant="body1"
                width={{ xs: 80, md: 300 }}
                overflow={"hidden"}
                whiteSpace={"pre"}
                color="primary"
                textTransform={"capitalize"}
              >
                {commentby.name}
              </Typography>
              <Typography
                variant="caption"
                color="secondary"
                width={{ xs: 30, md: "100%" }}
                overflow={"hidden"}
                whiteSpace={"pre"}
                textTransform={"capitalize"}
              >
                {convertDateStringIntoSeconds(comment.createdat)}
              </Typography>
            </Stack>

            <Typography variant="body2" fontFamily={"cursive"} color="primary">
              '{comment.text}'
            </Typography>
          </Stack>
          <Box ml={"auto"} mr={{ xs: 0, md: 3 }} my="auto">
            <IconButton
              color="primary"
              onClick={() => {
                if (isLoggedIn) {
                  setisliked((prev) => !prev);
                  handlelike();
                } else {
                  toast.error("Login Required");
                }
              }}
            >
              {!isliked ? <FavoriteBorder /> : <Favorite />}
            </IconButton>
            {uid === commentby._id && (
              <IconButton aria-label="delete" onClick={handledelete}>
                <DeleteForever />
              </IconButton>
            )}
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export { Comment };
