// src/redux/features/auth/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

// 🔁 Try to load user from localStorage
const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

const initialState = {
  user: storedUser || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
      localStorage.removeItem("loggedInUser");
    },
    signupSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { loginSuccess, loginFailure, signupSuccess, logout } =
  authSlice.actions;

export default authSlice.reducer;
