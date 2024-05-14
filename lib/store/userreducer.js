"use client";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const counterSlice = createSlice({
  name: "userdata",
  initialState: {
    name: "",
    email: "",
    uid: "",
    isLoggedIn: false,
    isSignup: false,
    isLoading: false,
    error: null,
    favorite: [],
    theme: "light",
  },
  reducers: {
    toggletheme: (state) => {
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    },
    signinStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.uid = action.payload._id;
      state.favorite = action.payload.favorite_quotes;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.isSignup = true;
    },
    updatename: (state, action) => {
      state.name = action.payload;
    },
    signinFailure: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    signupfailure: (state, action) => {
      state.isLoading = false;
      state.isSignup = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.uid = "";
      state.favorite = [];
    },
    Addfavoriate: (state, action) => {
      state.favorite.push(action.payload);
    },
    Removefavorite: (state, action) => {
      state.favorite = state.favorite.filter((item) => item !== action.payload);
    },
  },
});

export const {
  signinFailure,
  Addfavoriate,
  Removefavorite,
  toggletheme,
  signupStart,
  signupSuccess,
  signupfailure,
  updatename,
  logout,
  signinStart,
  signinSuccess,
} = counterSlice.actions;

export const Signin = (email, password) => async (dispatch) => {
  dispatch(signinStart());
  try {
    const data = await fetch(`${window.origin}/login/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const res = await data.json();
    if (res.message) {
      dispatch(signinSuccess(res.data));
      toast.success("login successfully");
    } else {
      dispatch(signinFailure(res.error));
      toast.error(res.error);
    }
  } catch (error) {
    console.log(error);
    dispatch(signinFailure(error.message));
  }
};
export const signup = (email, password, name) => async (dispatch) => {
  dispatch(signupStart());
  try {
    const data = await fetch(`${window.origin}/signup/api`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const res = await data.json();
    if (res.message) {
      toast.success("signup successfully");
      dispatch(signupSuccess(res.data));
    } else {
      dispatch(signupfailure(res.error));
      toast.error(res.error);
    }
  } catch (error) {
    console.log(error);
    dispatch(signupfailure(error.message));
  }
};
export const updateuserdata = (quote) => async (dispatch, getstate) => {
  const { userdata } = getstate();

  userdata.favorite.includes(quote._id)
    ? dispatch(Removefavorite(quote._id))
    : dispatch(Addfavoriate(quote._id));
  try {
    const data = await fetch(`${window.origin}/profile/api`, {
      headers: {
        "Cache-Control": "no-cache",
      },
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userdata, quote }),
    });
    const res = await data.json();
    if (res.error) {
      toast.error(res.error);
    }
  } catch (error) {
    dispatch(signinFailure(error.message));
    toast.error(error.message);
  }
};

export default counterSlice.reducer;
