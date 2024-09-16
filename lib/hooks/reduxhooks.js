"use client";

import { useSelector } from "react-redux";

export default function useUserdata() {
  const logindata = useSelector((state) => state.userdata);
  return logindata;
}
