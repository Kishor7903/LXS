import {
    addDoc,
    collection,
    collectionGroup,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { fireDB } from "./FirebaseConfig";
import { deleteFromCloudinary } from "./cloudinary";

export const addProduct = (item) => {
    try {
        const product = {
            name: item.formData.name,
            category: item.formData.category,
            subCategory: item.formData.subCategory,
            brand: item.formData.brand,
            isLxsCertified: item.formData.isLxsCertified,
            price: parseInt(item.formData.price),
            salePrice: parseInt(item.formData.salePrice),
            codAvailability: item.formData.codAvailability,
            returnAvailability: item.formData.returnAvailability,
            images: item.imageData.urls,
            imagesId: item.imageData.ids,
            description: item.formData.description,
            timestamp: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }),
        };

        const productRef = collection(fireDB, "products");
        const docSnap = addDoc(productRef, product);

        return { ...product, id: docSnap.id };
    } catch (error) {
        console.log("Adding New Product Error:", error.message);
    }
};

export const getAllProducts = async () => {
    try {
        const productRef = collection(fireDB, "products");
        const productSnapshot = await getDocs(productRef);
    
        const products = productSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    
        return products;
    } catch (error) {
        console.log("Getting all products error: ", error.message);
    }
};

export const editProduct = async (item_id, item) => {
    try {
        // const productData = await getDoc(doc(fireDB, "products", item.currentEditId));

        // let product = productData.data();

        // for(let i=0; i < product.imagesId.length; i++){
        //     if(product.imagesId[i]){
        //         deleteFromCloudinary(product.imagesId[i]);
        //     }
        // }

        // const editedProduct = {
        //     name: item.formData.name,
        //     description: item.formData.description,
        //     category: item.formData.category,
        //     brand: item.formData.brand,
        //     price: item.formData.price,
        //     salePrice: item.formData.salePrice,
        //     images: item.imageData.urls,
        //     imagesId: item.imageData.ids
        // }

        // await setDoc(doc(fireDB, "products", item.currentEditId), editedProduct);

        // return editedProduct;
        const productRef = doc(fireDB, "products", item_id);
        await updateDoc(productRef, item);
    } catch (error) {
        console.log("Edit Product Error: ", error.message);
    }
};

export const deleteProduct = async (id) => {
    try {
        const productData = await getDoc(doc(fireDB, "products", id));

        await deleteDoc(doc(fireDB, "products", id));

        return true;
    } catch (error) {
        console.log("Delete Product Error: ", error.message);
    }
};

export const getSingleProductData = async (id) => {
    try {
        let product = await getDoc(doc(fireDB, "products", id));

        return { id, ...product.data() };
    } catch (error) {
        console.log("Get Single Product Error: ", error.message);
    }
};

export const addCarouselImg = async (item) => {
    try {
        const carouselImg = {
            imgUrl: item.img_url,
            imgPublicId: item.publicId,
            timestamp: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }),
        };

        const carouselImgReference = collection(fireDB, "carousel");

        await addDoc(carouselImgReference, carouselImg);

        return carouselImg;
    } catch (error) {
        console.log("Adding New Carousel Image Error:", error.message);
    }
};

export const getAllCarouselImages = async () => {
    try {
        const carouselRef = collection(fireDB, "carousel");
        const q = query(carouselRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(q);

        const images = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return images;
    } catch (error) {
        console.log("Carousel Image Get Error: ", error.message);
    }
};

export const editCarouselImg = async (item, newItem) => {
    try {
        deleteFromCloudinary(item.imgPublicId);

        const carouselImg = {
            imgUrl: newItem.img_url,
            imgPublicId: newItem.publicId,
            timestamp: item.timestamp,
        };

        await setDoc(doc(fireDB, "carousel", item.id), carouselImg);

        return carouselImg;
    } catch (error) {
        console.log("Edit Carousel Image Error: ", error.message);
    }
};

export const deleteCarouselImg = async (item) => {
    try {
        deleteFromCloudinary(item.imgPublicId);

        await deleteDoc(doc(fireDB, "carousel", item.id));

        return item;
    } catch (error) {
        console.log("Delete Carousel Image Error: ", error.message);
    }
};

export const addEventGalleryImg = async (item) => {
    try {
        const eventGalleryImg = {
            imgUrl: item.img_url,
            imgPublicId: item.publicId,
            timestamp: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }),
        };

        const carouselImgReference = collection(fireDB, "Event Gallery");
        console.log(eventGalleryImg);

        await addDoc(carouselImgReference, eventGalleryImg);

        return eventGalleryImg;
    } catch (error) {
        console.log("Adding New Event Gallery Image Error:", error.message);
    }
};

export const getAllEventGaleryImages = async () => {
    try {
        const eventGalleryRef = collection(fireDB, "Event Gallery");
        const q = query(eventGalleryRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(q);

        const images = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return images;
    } catch (error) {
        console.log("Event Gallery Image Get Error: ", error.message);
    }
};

export const deleteEventGalleryImg = async (item) => {
    try {
        deleteFromCloudinary(item.imgPublicId);

        await deleteDoc(doc(fireDB, "Event Gallery", item.id));
    } catch (error) {
        console.log("Delete Carousel Image Error: ", error.message);
    }
};

export const addSellerWarehouse = async (item) => {
    try {
        const warehouseRef = collection(fireDB, "Warehouse");
        await addDoc(warehouseRef, {
            ...item,
            timestamp: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }),
        });
    } catch (error) {
        console.log("Adding new warehouse error:", error.message);
    }
};

export const getAllWarehouses = async () => {
    try {
        const warehouseRef = collection(fireDB, "Warehouse");
        const q = query(warehouseRef, orderBy("timestamp", "asc"));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    } catch (error) {
        console.log("Event Gallery Image Get Error: ", error.message);
    }
};

export const getAllOrders = async () => {
    const orders = [];
    try {
        const querySnapshot = await getDocs(collectionGroup(fireDB, "orders"));
        querySnapshot.forEach((doc) => {
            orders.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return orders;
    } catch (error) {
        console.error("Error getting all orders:", error);
    }
};
