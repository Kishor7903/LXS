import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true
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
			state.user = actions.payload
		},
		loadingTrue: (state) => {
			state.isLoading = true
		},
		loadingFalse: (state) => {
			state.isLoading = false
		},
	}
});

export const { login, logout, updateUserInfo, loadingTrue, loadingFalse } = authSlice.actions;
export default authSlice.reducer;
