// slices/authSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  // user: any | null;
}

const initialState: AuthState = {
  token: null,
  // user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tokenStore: (state, action: PayloadAction<{ token: string}>) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const {
  tokenStore, 
  logout 
  } = authSlice.actions;

export default authSlice.reducer;
