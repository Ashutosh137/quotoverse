"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Signin, signup } from "@/lib/store/userreducer";
import { useRouter } from "next/navigation";

function LoginComponent({ role = "signin" }) {
  const { error, isLoggedIn, isSignup } = useSelector(
    (state) => state.userdata
  );
  const router = useRouter();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [name, setname] = useState("");

  useEffect(() => {
    isLoggedIn && router.push("/");
    isSignup && router.push("/login");
  }, [isLoggedIn, isSignup]);

  const dispatch = useDispatch();
  return (
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
        // handlesubmit()
      }}
      spacing={4}
      my={10}
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
        InputLabelProps={{ style: { color: "primary",
          borderColor:"primary"
         } }}
        type="email"
        placeholder="Email id"
        sx={{ placeholder: { color: "primary" }}}
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
      <Typography variant="body1" color="primary" textTransform={"capitalize"}>
        forget password ?
      </Typography>
      <Box justifyContent={"center"}>
        <Button color="success" type="submit" variant="contained">
          sumbit
        </Button>
      </Box>
    </Stack>
  );
}

export default LoginComponent;
