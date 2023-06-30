import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  sidebarExpanded: false,
};

export const appConfigSlice = createSlice({
  name: "app-config",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExpanded = !state.sidebarExpanded;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = appConfigSlice.actions;
export default appConfigSlice.reducer;
