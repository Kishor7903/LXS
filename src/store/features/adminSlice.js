import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    products: [],
    carouselImg: [],
    eventGalleryImg: [],
    warehouses: [],
    orders: [],
    blogs: [],
    users: []
}


const adminSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addNewProduct: (state, actions) => {
            state.products = [...state.products, actions.payload]
        },
        getProducts: (state, actions) => {
            state.products = actions.payload
        },
        updateProduct: (state, actions) => {
            state.products = state.products.map(product => product.id === actions.payload.id ? actions.payload : product)
        },
        addNewCarouselImg: (state, actions) => {
            state.carouselImg = [...state.carouselImg, actions.payload]
        },
        getCarouselImgs: (state, actions) => {
            state.carouselImg = actions.payload
        },
        editCarouselImage: (state, actions) => {
            state.carouselImg = state.carouselImg.map((img) => img.id === actions.payload.id ? actions.payload : img)
        },
        deleteCarouselImage: (state, actions) => {
            state.carouselImg = state.carouselImg.filter((img) => img.imgPublicId !== actions.payload)
        },
        addNewEventGalleryImg: (state, actions) => {
            state.eventGalleryImg = [...state.eventGalleryImg, actions.payload]
        },
        getEventGalleryImgs: (state, actions) => {
            state.eventGalleryImg = actions.payload
        },
        deleteEventGalleryImage: (state, actions) => {
            state.eventGalleryImg = state.eventGalleryImg.filter((img) => img.imgPublicId !== actions.payload)
        },
        addNewWarehouse: (state, actions) => {
            state.warehouses = [...state.warehouses, actions.payload]
        },
        getWarehouses: (state, actions) => {
            state.warehouses = actions.payload
        },
        updateWarehouse: (state, actions) => {
            state.warehouses = state.warehouses.map(product => product.id === actions.payload.id ? actions.payload : product)
        },
        getAllOrdersAdmin: (state, actions) => {
            state.orders = actions.payload;
        },
        addNewBlog: (state, actions) => {
            state.blogs = [actions.payload, ...state.blogs]
        },
        getAllBlogs: (state, actions) => {
            state.blogs = actions.payload
        },
        editABlog: (state, actions) => {
            state.blogs = state.blogs.map((item) => item.id === actions.payload.id ? actions.payload : item)
        },
        deleteABlog: (state, actions) => {
            state.blogs = state.blogs.filter((item) => item.id !== actions.payload.id)
        },
        getUsers: (state, actions) => {
            state.users = actions.payload
        }
    }
})

export const { addNewProduct, getProducts, updateProduct, addNewCarouselImg, getCarouselImgs, editCarouselImage, deleteCarouselImage, addNewEventGalleryImg, getEventGalleryImgs, deleteEventGalleryImage, addNewWarehouse, getWarehouses, updateWarehouse, getAllOrdersAdmin, addNewBlog, getAllBlogs, editABlog, deleteABlog, getUsers } = adminSlice.actions;

export default adminSlice.reducer;