"use client";

import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Quotesarray from "@/components/quotesarray";

export default function Page() {
  const { favorite } = useSelector((state) => state.userdata);
  console.log(favorite);
  return (
    <Box display="" mx="" my="" sx="">
      {favorite?.map((quoteid, index) => {
        return <Quotesarray key={index} quoteid={quoteid} />;
      })}
    </Box>
  );
}
