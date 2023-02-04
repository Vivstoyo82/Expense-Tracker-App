import { createSlice } from "@reduxjs/toolkit";

const toggleBtn = localStorage.getItem("toggleBtn");
const prime = localStorage.getItem("prime");
const initialThemeState = {
  togglebtn: toggleBtn,
  toggle: false,
  premium: prime,
};
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    showToggle(state) {
      state.togglebtn = true;
      localStorage.setItem("toggleBtn", true);
    },
    switchToggle(state) {
      state.toggle = !state.toggle;
    },
    premium(state) {
      state.premium = true;
      localStorage.setItem("prime", true);
    },
    nonPrime(state) {
      localStorage.removeItem("toggleBtn");
      localStorage.removeItem("prime");
    },
  },
});

export default themeSlice.reducer;
export const themeActions = themeSlice.actions;