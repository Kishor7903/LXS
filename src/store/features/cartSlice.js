import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cart: [],
    wishlist: [],
    address: [],
    orders: []
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, actions) => {
            state.cart = state.cart.length > 0 ? [...state.cart, actions.payload] : [actions.payload]
        },
        deleteFromCart: (state, actions) => {
            state.cart = state.cart.filter(item => item.id !== actions.payload)
        },
        updateCartProductQuantity: (state, actions) => {
            state.cart = state.cart.map(item => item.id === actions.payload.id ? {...item, quantity: actions.payload.quantity} : item)
        },
        updateCartProductSize: (state, actions) => {
            state.cart = state.cart.map(item => item.id === actions.payload.id ? {...item, size: actions.payload.size} : item)
        },
        updateCart: (state, actions) => {
            state.cart = actions.payload
        },
        addToWishlist: (state, actions) => {
            state.wishlist = state.wishlist.length > 0 ? [...state.wishlist, actions.payload] : [actions.payload]
        },
        updateWishlist: (state, actions) => {
            state.wishlist = actions.payload
        },
        deleteFromWishlist: (state, actions) => {
            state.wishlist = state.wishlist.filter(item => item.item_id !== actions.payload)
        },
        addAddress: (state, actions) => {
            state.address = [...state.address, actions.payload]
        },
        updateAddress: (state, actions) => {
            state.address = actions.payload
        },
        editAddress: (state, actions) => {
            state.address = state.address.map((add) => add.id === actions.payload.id ? actions.payload : add)
        },
        getAllOrdersItems: (state, actions) => {
            state.orders = actions.payload
        }
    }
})

export const { addToCart, deleteFromCart, updateCartProductQuantity, updateCartProductSize, updateCart, addToWishlist, updateWishlist, deleteFromWishlist, addAddress, updateAddress, editAddress, getAllOrdersItems } = cartSlice.actions;
export default cartSlice.reducer;