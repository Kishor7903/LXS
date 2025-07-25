import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    cart: [],
    wishlist: [],
    address: [],
    orders: [],
    recentViewed: []
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
        addNewOrder: (state, actions) => {
            state.orders = [actions.payload, ...state.orders]
        },
        getAllOrdersItems: (state, actions) => {
            state.orders = actions.payload
        },
        updateOrder: (state, actions) => {
            state.orders = state.orders.map((order) => order.id === actions.payload.id ? actions.payload : order)
        },
        addToRecentViewed: (state, actions) => {
            state.recentViewed = state.recentViewed.some(i => i.item_id === actions.payload.item_id) ? [actions.payload, ...(state.recentViewed.filter(i => i.item_id !== actions.payload.item_id))] : [actions.payload, ...state.recentViewed]
        },
        getRecentViewed: (state, actions) => {
            state.recentViewed = actions.payload
        }
    }
})

export const { addToCart, deleteFromCart, cartToggleSelect, toggleAllItems, updateCartProductQuantity, updateCartProductSize, updateCart, removeAllSelectedCartItems, addToWishlist, updateWishlist, deleteFromWishlist, addAddress, updateAddress, editAddress, deleteAnAddress, updateSetDefault, addNewOrder, getAllOrdersItems, updateOrder, addToRecentViewed, getRecentViewed } = cartSlice.actions;
export default cartSlice.reducer;