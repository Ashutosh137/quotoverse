"use client";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Quotesarray from "@/components/quotesarray";
import { redirect } from "next/navigation";
import {
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { logout, updatename } from "@/lib/store/userreducer";
import { Logout } from "@mui/icons-material";
import Head from "next/head";
import toast from "react-hot-toast";

export default function Page() {
  const { favorite, isLoggedIn, name, uid } = useSelector(
    (state) => state.userdata
  );
  if (!isLoggedIn) {
    redirect("/login");
  }

  const [username, setname] = useState(name);
  const dispatch = useDispatch();

  return (
    <Stack>
      <Head>
        <title>{name}|| profile || qutoverse </title>
        <meta name="description" content={`author ${name} quotoverse`} />
      </Head>
      {favorite.length > 0 && (
        <Box>
          <Typography
            variant="h6"
            color="primary"
            textTransform={"capitalize"}
            textAlign={"center"}
          >
            favorite quotes
          </Typography>
          {favorite?.map((quoteid, index) => {
            return <Quotesarray key={index} quoteid={quoteid} />;
          })}
        </Box>
      )}
      <Box>
        <Typography
          variant="h6"
          color="primary"
          textTransform={"capitalize"}
          textAlign={"center"}
        >
          change username
        </Typography>
        <Stack
          direction={"row"}
          my={2}
          spacing={2}
          onSubmit={async (e) => {
            e.preventDefault();
            const update = await fetch(`${window.origin}/profile/${uid}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username, uid, isLoggedIn }),
            }).then((res) => res.json());
            if (update.message) {
              dispatch(updatename(username));
              toast.success("username updated successfully");
            }
          }}
          component={"form"}
        >
          <TextField
            fullWidth
            id="name"
            label="Name"
            value={username}
            onChange={(e) => setname(e.target.value)}
          />
          <Button
            variant="outlined"
            mx={3}
            sx={{ minWidth: 150 }}
            type="submit"
            color="primary"
          >
            update name
          </Button>
        </Stack>
      </Box>
      <Box
        display=""
        position={"fixed"}
        border={1}
        bottom={10}
        color={"primary"}
        left={10}
        borderRadius={20}
      >
        <IconButton
          onClick={() => {
            dispatch(logout());
          }}
        >
          <Logout />
        </IconButton>
      </Box>
    </Stack>
  );
}
