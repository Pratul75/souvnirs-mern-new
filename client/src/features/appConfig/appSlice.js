import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  sidebarExpanded: false,
  activeLink: "/admin-dashboard",
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
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar, toggleDarkMode, setActiveLink } =
  appConfigSlice.actions;
export default appConfigSlice.reducer;
