import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, } from "firebase/firestore";
import { fireDB } from "./FirebaseConfig";
import { getProducts } from "@/store/features/adminSlice";
import { deleteFromCloudinary } from "./cloudinary";

export const addProduct = (item) => {
    try {
        const product = {
            name: item.formData.name,
            description: item.formData.description,
            category: item.formData.category,
            brand: item.formData.brand,
            price: parseInt(item.formData.price),
            salePrice: parseInt(item.formData.salePrice),
            images: item.imageData.urls,
            imagesId: item.imageData.ids,
            totalStock : parseInt(item.formData.totalStock),
            timestamp: new Date().toLocaleString("en-US",{month:"short", day: "2-digit", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric",})
        }
        
        const userReference = collection(fireDB, "products");
        
        addDoc(userReference, product);
    
        return product

    } catch (error) {
        console.log("Adding New Product Error:", error.message);
    }
}

export const getAllProducts = (dispatch) => {
    const q = query(
        collection(fireDB, "products")
    );
    
    onSnapshot(q, (QuerySnapshot) => {
        let products = [];
        QuerySnapshot.forEach((doc) => products.push({...doc.data(), id: doc.id}));

        dispatch(getProducts(products));
    })
}

export const editProduct = async (item) => {
    try {
        const productData = await getDoc(doc(fireDB, "products", item.currentEditId));
    
        let product = productData.data();
        
        for(let i=0; i < product.imagesId.length; i++){
            if(product.imagesId[i]){
                deleteFromCloudinary(product.imagesId[i]);
            }
        }
    
        const editedProduct = {
            name: item.formData.name,
            description: item.formData.description,
            category: item.formData.category,
            brand: item.formData.brand,
            price: item.formData.price,
            salePrice: item.formData.salePrice,
            images: item.imageData.urls,
            imagesId: item.imageData.ids,
            totalStock : item.formData.totalStock,
            timestamp: new Date().toLocaleString("en-US",{month:"short", day: "2-digit", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric",})
        }
    
        await setDoc(doc(fireDB, "products", item.currentEditId), editedProduct);

        return editedProduct;
    } catch (error) {
        console.log("Edit Product Error: ", error.message);
        return null;
    }
}

export const deleteProduct = async (id) => {
    try {
        const productData = await getDoc(doc(fireDB, "products", id));
    
        let product = productData.data();
        
        for(let i=0; i < product.imagesId.length; i++){
            if(product.imagesId[i]){
                deleteFromCloudinary(product.imagesId[i]);
            }
        }
    
        await deleteDoc(doc(fireDB, "products", id));
        
        return true;
    } catch (error) {
        console.log("Delete Product Error: ", error.message);
    }
}

export const getSingleProductData = async (id) => {
    try {
        let product = await getDoc(doc(fireDB, "products", id));

        return {id, ...product.data()};
    } catch (error) {
        console.log("Get Single Product Error: ", error.message);
    }
}

export const addCarouselImg = async (item) => {
    try {
        const carouselImg = {
            imgUrl: item.img_url,
            imgPublicId: item.publicId,
            timestamp: new Date().toLocaleString("en-US",{month:"short", day: "2-digit", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric",})
        }
        
        const carouselImgReference = collection(fireDB, "carousel");
        
        await addDoc(carouselImgReference, carouselImg);
    
        return carouselImg

    } catch (error) {
        console.log("Adding New Carousel Image Error:", error.message);
    }
}

export const getAllCarouselImages = async () => {
    try {
        const carouselRef = collection(fireDB, "carousel");
        const q = query(carouselRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(q);
        
        const images = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return images;
    } catch (error) {
        console.log("Carousel Image Get Error: ", error.message);
    }
}

export const editCarouselImg = async (item, newItem) => {
    try {
        deleteFromCloudinary(item.imgPublicId);
    
        const carouselImg = {
            imgUrl: newItem.img_url,
            imgPublicId: newItem.publicId,
            timestamp: item.timestamp
        }
        
        await setDoc(doc(fireDB, "carousel", item.id), carouselImg);
    
        return carouselImg
    } catch (error) {
        console.log("Edit Carousel Image Error: ", error.message);
    }
}

export const deleteCarouselImg = async (item) => {
    try {
        deleteFromCloudinary(item.imgPublicId);
    
        await deleteDoc(doc(fireDB, "carousel", item.id));
    
        return item;
    } catch (error) {
        console.log("Delete Carousel Image Error: ", error.message);
    }
}

export const addEventGalleryImg = async (item) => {
    try {
        const eventGalleryImg = {
            imgUrl: item.img_url,
            imgPublicId: item.publicId,
            timestamp: new Date().toLocaleString("en-US",{month:"short", day: "2-digit", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric",})
        }
        
        const carouselImgReference = collection(fireDB, "Event Gallery");
        console.log(eventGalleryImg);
        
        await addDoc(carouselImgReference, eventGalleryImg);

        return eventGalleryImg
    } catch (error) {
        console.log("Adding New Event Gallery Image Error:", error.message);
    }
}

export const getAllEventGaleryImages = async () => {
    try {
        const eventGalleryRef = collection(fireDB, "Event Gallery");
        const q = query(eventGalleryRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(q);
        
        const images = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return images;
    } catch (error) {
        console.log("Event Gallery Image Get Error: ", error.message);
    }
}

export const deleteEventGalleryImg = async (item) => {
    try {
        deleteFromCloudinary(item.imgPublicId);
    
        await deleteDoc(doc(fireDB, "Event Gallery", item.id));
    } catch (error) {
        console.log("Delete Carousel Image Error: ", error.message);
    }
}