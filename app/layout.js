import { Inter } from "next/font/google";
import "./globals.css";
import Container from "@mui/material/Container";
import Navbar from "@/components/navbar";
import UseProvider from "@/lib/store/store";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Quotverse",
  description: "Quotverse",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UseProvider>
          <Container maxWidth="lg">
            <Navbar />
            {children}
          </Container>
        </UseProvider>
      </body>
    </html>
  );
}