import { createSlice } from '@reduxjs/toolkit';

const loggedIn = localStorage.getItem('idToken') ? true : false;
const initialVerified = localStorage.getItem("verified");

const initialState = { isLoggedIn: loggedIn, isVerified : initialVerified };

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('idToken');
      localStorage.removeItem("verified");
    },
    setIsVerified(state, action) {
        state.isVerified = action.payload;
        localStorage.setItem("verified", action.payload);
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;