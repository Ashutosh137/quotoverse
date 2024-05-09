"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Signin } from "@/lib/store/userreducer";
import { useRouter } from "next/navigation";


function LoginComponent({handlesubmit,  role = "signin" }) {
  const {error} = useSelector(state=>state.userdata);
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [name, setname] = useState("");

  const dispatch=useDispatch()
  const router=useRouter()
  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      maxWidth={800}
      color="aqua"
      mx="auto"
      // action={"/login/api"}
      // method="POST"
      component={"form"}
      onSubmit={async(e) => {
        e.preventDefault();
        role==="signin" && dispatch(Signin(email,pass))
        // handlesubmit()
      }}
      spacing={4}
      my={10}
    >
      <Typography variant="body1" textAlign={"center"} color="red">{error}</Typography>
      {role === "signup" && (
        <TextField
          fullWidth
          id="name"
          label="name"
          InputLabelProps={{ style: { color: "black" } }}
          color="info"
          type="text"
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
        InputLabelProps={{ style: { color: "black" } }}
        color="info"
        type="email"
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />
      <TextField
        id="password"
        fullWidth
        type="password"
        label="password"
        value={pass}
        onChange={(e) => {
          setpass(e.target.value);
        }}
      />
      <Typography variant="body1" color="initial" textTransform={"capitalize"}>
        forget password
      </Typography>
      <Box justifyContent={"center"}>
        <Button
          color="success"
          type="submit"
          variant="contained"
          // sx={{
          //     maxWidth:"50%",
          //     mx:"auto"
          // }}
        >
          sumbit
        </Button>
      </Box>
    </Stack>
  );
}

export default LoginComponent;
