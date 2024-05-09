"use client";

import { fetchdata } from "@/app/fetch";
import { useEffect, useState } from "react";
import Quote from "./quotes";

export default function Quotesarray({ quoteid }) {
  const [quote, setquote] = useState({});
  useEffect(() => {
    const data = async () => {
      const quotedata = await fetchdata(`quotes/${quoteid}`);
      setquote(quotedata);
    };
    data();
  }, [quoteid]);
  return <Quote quote={quote} />;
}
