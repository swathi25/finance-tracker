import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  uid: string | null;
  email: string | null;
  username: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  uid: null,
  email: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string | null;
        username: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.username = action.payload.username;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.uid = null;
      state.email = null;
      state.username = null;
      localStorage.removeItem("auth");
    },
    loadAuth: (state) => {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const parsed: AuthState = JSON.parse(stored);
        state.isAuthenticated = parsed.isAuthenticated;
        state.uid = parsed.uid;
        state.email = parsed.email;
        state.username = parsed.username;
      }
    },
  },
});

export const { login, logout, loadAuth } = authSlice.actions;
export default authSlice.reducer;
