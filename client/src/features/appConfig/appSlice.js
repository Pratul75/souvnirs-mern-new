import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  sidebarExpanded: false,
  activeLink: "/admin-dashboard",
  login: "",
};

export const appConfigSlice = createSlice({
  name: "app-config",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExpanded = !state.sidebarExpanded;
    },
    setActiveLink: (state, payload) => {
      state.activeLink = payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    getLoginInfo: (state, action) => {
      console.log('appSlice.js', action.payload);
      state.login = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar, toggleDarkMode, setActiveLink, getLoginInfo } =
  appConfigSlice.actions;
export default appConfigSlice.reducer;
