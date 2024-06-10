import { Inter } from "next/font/google";
import "./globals.css";
import UseProvider from "@/lib/store/store";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Quotverse: Your World of Quotes",
  description: "Quotverse is a dynamic web application designed to immerse users in the inspiring and thought-provoking world of quotes. Whether you’re seeking motivation, wisdom, or simply a beautiful phrase to brighten your day, Quotverse provides a seamless and interactive experience for discovering, managing, and sharing quotes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <UseProvider>
           {children}
          </UseProvider>
      </body>
    </html>
  );

}
