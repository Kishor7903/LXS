import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    products: [],
    carouselImg: []
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
        }
    }
})

export const { addNewProduct, getProducts, addNewCarouselImg, getCarouselImgs, editCarouselImage, deleteCarouselImage } = adminSlice.actions;
export default adminSlice.reducer;