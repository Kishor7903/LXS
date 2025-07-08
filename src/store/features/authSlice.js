import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, actions) => {
			state.isAuthenticated = true,
			state.user = actions.payload,
			sessionStorage.setItem("user", JSON.stringify(actions.payload));
		},
		logout: (state) => {
			state.isAuthenticated = false,
			state.user = null
		},
		updateUserInfo: (state, actions) => {
			state.user = actions.payload,
			sessionStorage.setItem("user", JSON.stringify(actions.payload));
		}
	}
});

export const { login, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
