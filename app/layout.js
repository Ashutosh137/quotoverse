"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@mui/material/Container";
import Navbar from "@/components/navbar";
import UseProvider from "@/lib/store/store";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme, Typography } from "@mui/material";
const inter = Inter({ subsets: ["latin"] });
// export const metadata = {
//   title: "Quotverse",
//   description: "Quotverse",
// };

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
    typography:{
      main:"#fffffff"
    },

   background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary:"#ffffff"
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={darktheme}>
          <Toaster />
          <UseProvider>
            <Container maxWidth="lg">
              <Navbar />
              {children}
            </Container>
          </UseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
