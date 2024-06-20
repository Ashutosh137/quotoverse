"use client";
import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Signin,
  signinStart,
  signinSuccess,
  signup,
} from "@/lib/store/userreducer";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import FormDialog from "./forgetdialog";
import toast from "react-hot-toast";

function LoginComponent({ role = "signin" }) {
  const { error, isLoggedIn, isSignup } = useSelector(
    (state) => state.userdata
  );
  const router = useRouter();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [name, setname] = useState("");
  const [forgetpassworddialog, setforgetpassworddialog] = useState(false);

  useEffect(() => {
    isLoggedIn && router.push("/");
    isSignup && router.push("/login");
  }, [isLoggedIn, isSignup]);

  const dispatch = useDispatch();
  return (
    <Fragment>
      <Typography
        variant="h4"
        textAlign={"center"}
        textTransform={"capitalize"}
        my={4}
        color="primary"
      >
        {role}
      </Typography>
      <Stack
        mx="auto"
        direction={"row"}
        justifyContent={"center"}
        spacing={4}
        alignItems={"center"}
      >
        <Button variant="text" color="primary">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              dispatch(signinStart());
              const data = await fetch(`${window.origin}/login/api/google`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  credential: credentialResponse,
                }),
              }).then((res) => res.json());

              if (data.message) {
                toast.success(data.message);
                dispatch(signinSuccess(data.data));
                router.push("/");
              } else {
                toast.error("Login failed");
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Button>
        <Typography variant="body1" textAlign={"center"} color="primary">
          OR
        </Typography>
      </Stack>

      <Stack
        direction={"column"}
        justifyContent={"center"}
        maxWidth={800}
        mx="auto"
        component={"form"}
        onSubmit={async (e) => {
          e.preventDefault();
          role === "signin" && dispatch(Signin(email, pass));
          role === "signup" && dispatch(signup(email, pass, name));
        }}
        spacing={4}
        my={2}
      >
        <Typography
          variant="body1"
          textTransform={"capitalize"}
          textAlign={"center"}
          color="red"
        >
          {error}
        </Typography>
        {role === "signup" && (
          <TextField
            fullWidth
            id="name"
            label="Name"
            sx={{ placeholder: { color: "primary" } }}
            color="primary"
            InputLabelProps={{ style: { color: "primary" } }}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        )}
        <TextField
          fullWidth
          id="email"
          label="Email id"
          InputLabelProps={{
            style: { color: "primary", borderColor: "primary" },
          }}
          type="email"
          placeholder="Email id"
          sx={{ placeholder: { color: "primary" } }}
          color="primary"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <TextField
          id="password"
          fullWidth
          type="password"
          sx={{ placeholder: { color: "primary" } }}
          placeholder="Password"
          label="Password"
          color="primary"
          InputLabelProps={{ style: { color: "primary" } }}
          value={pass}
          onChange={(e) => {
            setpass(e.target.value);
          }}
        />
        {role === "signin" && (
          <Typography
            sx={{ textDecoration: "none" }}
            mx="auto"
            onClick={() => {
              setforgetpassworddialog(true);
            }}
            variant="button"
            color="primary"
            textTransform={"capitalize"}
          >
            forget password ?
          </Typography>
        )}
        <Box justifyContent={"center"}>
          <Button color="success" type="submit" variant="contained">
            sumbit
          </Button>
        </Box>
      </Stack>
      {
        <FormDialog
          toggle={() => setforgetpassworddialog((prev) => !prev)}
          open={forgetpassworddialog}
        />
      }
    </Fragment>
  );
}

export default LoginComponent;
