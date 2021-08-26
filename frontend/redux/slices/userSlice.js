import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state) => {
      state.user = true;
    },
    removeUser: (state) => {
      state.user = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
