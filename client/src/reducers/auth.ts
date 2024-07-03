import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RawUser } from "../types/User";

type AuthState = {
  user: RawUser | null;
  token: string | null;
};

export type RootAuthState = {
  auth: AuthState;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Función para establecer el usuario
    setUser: (state, action: PayloadAction<RawUser | null>) => {
      state.user = action.payload;
    },
    // Función para establecer el token
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
