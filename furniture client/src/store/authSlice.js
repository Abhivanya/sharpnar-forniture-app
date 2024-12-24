import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoggedIn: false,
  userEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    checkLoggedIn(state, action) {
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      state.isLoggedIn = true;
    },
    loggedIn(state, action) {
      state.token = action.payload.token;
      state.userEmail = null;
      state.isLoggedIn = action.payload.email;
    },
    signup(state, action) {
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.userEmail = null;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
