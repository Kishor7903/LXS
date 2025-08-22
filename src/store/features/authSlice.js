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
			sessionStorage.setItem("user", JSON.stringify({id: actions.payload.id, name: actions.payload.name, email: actions.payload.email}));
		},
		logout: (state) => {
			state.isAuthenticated = false,
			state.user = null
		},
		updateUserInfo: (state, actions) => {
			state.user = actions.payload,
			sessionStorage.setItem("user", JSON.stringify({id: actions.payload.id, name: actions.payload.name, email: actions.payload.email}));
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
