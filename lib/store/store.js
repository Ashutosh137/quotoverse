"use client";
const { configureStore } = require("@reduxjs/toolkit");
import userdatareducer from "@/lib/store/userreducer";
import { Provider, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Navbar from "@/components/navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = configureStore({
  reducer: {
    userdata: userdatareducer,
  },
});

const darktheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      primary: "#ffffff",
    },
  },
});
const lighttheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#9c1f1f",
    },
    typography: {
      main: "#fffffff",
      default: "#ffffff",
    },

    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      default: "#000000",
    },
  },
});
const UseProvider = ({ children }) => {
  const [theme, settheme] = useState(darktheme);

  const toggleTheme = () => {
    if (theme.palette.mode === "light") {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      settheme(darktheme);
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      settheme(lighttheme);
    }
  };

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_Client}>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Toaster />
            <Navbar toggleTheme={toggleTheme} />
            {children}
          </Container>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
};
export default UseProvider;
