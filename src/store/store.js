import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js"
import adminSlice from "./features/adminSlice.js";
import cartSlice from "./features/cartSlice.js";


const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminSlice,
        cart: cartSlice
    }
})

export default store;