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
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar, setActiveLink } = appConfigSlice.actions;
export default appConfigSlice.reducer;
