// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null, // On stocke le token ici
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.email;
      state.token = action.payload.token; // On stocke le token dans l'état
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // On retire le token du local storage
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
