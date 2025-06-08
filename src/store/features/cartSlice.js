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
        cartToggleSelect: (state, actions) => {
            state.cart = state.cart.map(item => item.id === actions.payload.item_id ? {...item, isSelected: actions.payload.value} : item)
        },
        toggleAllItems: (state, actions) => {
            state.cart = state.cart.map(item => ({...item, isSelected: actions.payload}))
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
        removeAllSelectedCartItems: (state) => {
            state.cart = state.cart.filter(item => item.isSelected !== true)
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
        deleteAnAddress: (state, actions) => {
            state.address = state.address.filter(item => item.id !== actions.payload)
        },
        updateSetDefault: (state, actions) => {
            state.address = state.address.map(item => ({...item, isDefault: item.id === actions.payload}))
        },
        getAllOrdersItems: (state, actions) => {
            state.orders = actions.payload
        }
    }
})

export const { addToCart, deleteFromCart, cartToggleSelect, toggleAllItems, updateCartProductQuantity, updateCartProductSize, updateCart, removeAllSelectedCartItems, addToWishlist, updateWishlist, deleteFromWishlist, addAddress, updateAddress, editAddress, deleteAnAddress, updateSetDefault, getAllOrdersItems } = cartSlice.actions;
export default cartSlice.reducer;