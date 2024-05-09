"use client";
const { configureStore } = require("@reduxjs/toolkit");
import userdatareducer from "@/lib/store/userreducer";
import { Provider } from "react-redux";

const store = configureStore({
    reducer: {
        userdata: userdatareducer,
      },
});

const UseProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default UseProvider;
