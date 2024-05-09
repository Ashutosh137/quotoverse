"use client";
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "userdata",
  initialState: {
    name: "",
    email: "",
    uid: "",
    isLoggedIn: false,
    isLoading: false,
    error: null,
    favorite: [],
  },
  reducers: {
    signinStart: (state) => {
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
    signinFailure: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.uid = "";
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
  signinStart,
  signinSuccess,
} = counterSlice.actions;

export const Signin = (email, password) => async (dispatch) => {
  dispatch(signinStart());
  try {
    const data = await fetch("http://localhost:3000/login/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const res = await data.json();
    if (res.message) {
      dispatch(signinSuccess(res.data));
    } else {
      dispatch(signinFailure(res.error));
    }
  } catch (error) {
    console.log(error)
    dispatch(signinFailure(error.message));
  }
};
export const updateuserdata = (quote) => async (dispatch, getstate) => {
  // dispatch(signinStart());
  const { userdata } = getstate();

  userdata.favorite.includes(quote._id)
    ? dispatch(Removefavorite(quote._id))
    : dispatch(Addfavoriate(quote._id));
  try {
    const data = await fetch(`http://localhost:3000/profile/api`, {
      headers: {
        "Cache-Control": "no-cache",
      },
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userdata, quote }),
    });
    const res = await data.json();
  } catch (error) {
    dispatch(signinFailure(error.message));
  }
};

export default counterSlice.reducer;
