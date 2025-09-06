import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { auth, fireDB } from "./FirebaseConfig.js";
import { getToken, onMessage } from "firebase/messaging";
import { getTimestamp } from "@/utils/commomFunctions.js";


export const registerUser = async (formData) => {
    try {
        let users = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        );

        if (users) {
            const user = {
                name: formData.name,
                phone: formData.phone,
                email: users.user.email,
                DOB: formData.DOB,
                gender: formData.gender,
                altPhone: "",
                profilePic: "",
                uid: users.user.uid,
                role: formData.role,
                notifications: {
                    push: {
                        orderUpdates: false,
                        promotionsOffers: false,
                        securityAlerts: false
                    },
                    sms: {
                        orderUpdates: false,
                        promotionsOffers: false,
                        securityAlerts: false
                    },
                    whatsapp: {
                        orderUpdates: false,
                        promotionsOffers: false,
                        securityAlerts: false
                    },
                    email: {
                        orderUpdates: false,
                        promotionsOffers: false,
                        securityAlerts: false
                    }
                },
                timestamp: getTimestamp()
            };

            const userReference = doc(fireDB, "user", users.user.uid);
            await setDoc(userReference, user);

            return {id: users.user.uid, ...user}
        }
    } catch (error) {
        console.log("Sign Up Error :", error.message);
        return {id: null, message: error.message}
    }
};

export const loginUser = async (formData) => {
    try {
        let users = await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        );

        if (users) {
            const q = query(
                collection(fireDB, "user"),
                where("uid", "==", users.user.uid)
            );
            const querySnapshot = await getDocs(q);

            let userData = null;
            querySnapshot.forEach((doc) => {
                userData = { id: doc.id, ...doc.data() };
            });

            return userData;
        }

        toast("User Login Failed ...");
    } catch (error) {
        console.log("Login Error: ", error.message);
        return {id: null, message: error.message};
    }
};

export const logoutUser = async () => {
    try {
        sessionStorage.clear();
    } catch (error) {
        console.log("Logout Error: ", error.message);
    }
};

export const getUserInfo = async (user_id) => {
    try {
        const userRef = doc(fireDB, "user", user_id);
        const userData = await getDoc(userRef);

        return { id: userData.id, ...userData.data() };
    } catch (error) {
        console.log("Getting User Info Error: ", error.message);
    }
};

export const editUserDetails = async (formData) => {
    try {
        const usersRef = doc(fireDB, "user", formData.id);
        await updateDoc(usersRef, formData);
    } catch (error) {
        console.log("Edit User Info Error: ", error.message);
    }
};

export const addCartItem = async (user_id, item) => {
    try {
        const cartRef = collection(fireDB, "user", user_id, "cart");
        await addDoc(cartRef, {
            ...item,
            isSelected: true,
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
        console.log("Add to Cart Error: ", error.message);
    }
};

export const getUserCart = async (user_id) => {
    try {
        const cartRef = collection(fireDB, "user", user_id, "cart");
        const cartQuery = query(cartRef, orderBy("timestamp", "desc"));
        const cartSnapshot = await getDocs(cartQuery);

        const cartItems = cartSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return cartItems;
    } catch (error) {
        console.log("Get Cart Items Error: ", error.message);
    }
};

export const deleteCartItem = async (user_id, item_id) => {
    try {
        const cartRef = doc(fireDB, "user", user_id, "cart", item_id);
        await deleteDoc(cartRef);
    } catch (error) {
        console.log("Delete Cart Item Error: ", error.message);
    }
};

export const handletoggleSelect = async (user_id, item_id, value) => {
    try {
        const cartRef = doc(fireDB, "user", user_id, "cart", item_id);
        await updateDoc(cartRef, { isSelected: value });
    } catch (error) {
        console.log("Toogling Cart Item Error: ", error.message);
    }
};

export const handleToggleAll = async (user_id, value) => {
    try {
        const cartRef = collection(fireDB, "user", user_id, "cart");
        const docSnap = await getDocs(cartRef);

        const togglePromise = docSnap.docs.map(
            async (doc) => await updateDoc(doc.ref, { isSelected: value })
        );
        await Promise.all(togglePromise);
    } catch (error) {
        console.log("Toggling All Cart item Error: ", error.message);
    }
};

export const productQuantityChange = async (user_id, item) => {
    try {
        const cartRef = doc(fireDB, "user", user_id, "cart", item.id);
        updateDoc(cartRef, { quantity: item.quantity });
    } catch (error) {
        console.log("Product Quantity Change Error: ", error.message);
    }
};

export const productSizeChange = async (user_id, item) => {
    try {
        const cartRef = doc(fireDB, "user", user_id, "cart", item.id);
        updateDoc(cartRef, { size: item.size });
    } catch (error) {
        console.log("Product Size Change Error: ", error.message);
    }
};

export const addWishlistItem = async (user_id, item) => {
    try {
        const wishlistRef = collection(fireDB, "user", user_id, "wishlist");
        const docRef = await addDoc(wishlistRef, {
            item_id: item,
            timestamp: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            }),
        });

        return { id: docRef.id, item_id: item };
    } catch (error) {
        console.log("Add to Wishlist Error: ", error.message);
    }
};

export const getUserWishlist = async (user_id) => {
    try {
        const wishlistRef = collection(fireDB, "user", user_id, "wishlist");
        const wishlistQuery = query(wishlistRef, orderBy("timestamp", "desc"));
        const wishlistSnapshot = await getDocs(wishlistQuery);

        const wishlistItems = wishlistSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return wishlistItems;
    } catch (error) {
        console.log("Get Wishlist Items Error: ", error.message);
    }
};

export const deleteWishlistItem = async (user_id, item_id) => {
    try {
        const wishlistRef = collection(fireDB, "user", user_id, "wishlist");
        const q = query(wishlistRef, where("item_id", "==", item_id));
        const wishlistSnapshot = await getDocs(q);

        wishlistSnapshot.docs.map((docSnapshot) =>
            deleteDoc(doc(fireDB, "user", user_id, "wishlist", docSnapshot.id))
        );
    } catch (error) {
        console.log("Delete Cart Item Error: ", error.message);
    }
};

export const deleteSelectedCartItems = async (user_id) => {
    try {
        const cartRef = collection(fireDB, "user", user_id, "cart");
        const q = query(cartRef, where("isSelected", "==", true));
        const snapshot = await getDocs(q);

        const deletePromises = snapshot.docs.map((docSnap) =>
            deleteDoc(docSnap.ref)
        );
        await Promise.all(deletePromises);
    } catch (error) {
        console.error("Error deleting cart items:", error.message);
    }
};

export const addNewAddress = async (user_id, formData) => {
    try {
        const addressRef = collection(fireDB, "user", user_id, "address");
        const docRef = await addDoc(addressRef, formData);

        return { id: docRef.id, ...formData };
    } catch (error) {
        console.log("Add New Address Error: ", error.message);
    }
};

export const getAllAddress = async (user_id) => {
    try {
        const addressRef = collection(fireDB, "user", user_id, "address");
        const addressSnap = await getDocs(addressRef);

        let address = [];
        addressSnap.forEach((doc) => {
            address.push({ id: doc.id, ...doc.data() });
        });
        return address;
    } catch (error) {
        console.log("Getting All Address Error: ", error.message);
    }
};

export const editAnAddress = async (user_id, formData, item_id) => {
    try {
        const addressRef = doc(fireDB, "user", user_id, "address", item_id);
        await updateDoc(addressRef, formData);
    } catch (error) {
        console.log("Edit Address Error: ", error.message);
    }
};

export const deleteAddress = async (user_id, item_id) => {
    try {
        const addressRef = doc(fireDB, "user", user_id, "address", item_id);
        await deleteDoc(addressRef);
    } catch (error) {
        console.log("Delete Address Error: ", error.message);
    }
};

export const setAsDefaultNewAddress = async (user_id, item_id) => {
    const addressRef = collection(fireDB, "user", user_id, "address");
    const snapshot = await getDocs(addressRef);
    const batchUpdates = [];

    snapshot.forEach((docSnap) => {
        const isSelected = docSnap.id === item_id;
        batchUpdates.push(updateDoc(docSnap.ref, { isDefault: isSelected }));
    });

    await Promise.all(batchUpdates);
};

export const createOrderInfo = async (user_id, orderDetails) => {
    try {
        const orderRef = collection(fireDB, "user", user_id, "orders");
        const docData = await addDoc(orderRef, orderDetails);

        return { id: docData.id, ...orderDetails };
    } catch (error) {
        console.log("Error at Order Creation: ", error.message);
    }
};

export const getAllOrders = async (user_id) => {
    try {
        const orderRef = collection(fireDB, "user", user_id, "orders");
        const orderQuery = query(orderRef, orderBy("timestamp", "desc"));
        const orderSnap = await getDocs(orderQuery);

        let orderItems = [];
        orderSnap.forEach((doc) => {
            orderItems.push({ id: doc.id, ...doc.data() });
        });
        return orderItems;
    } catch (error) {
        console.log("Getting All Orders Error: ", error.message);
    }
};

export const getSingleOrderDetails = async (user_id, order_id) => {
    try {
        let ordersRef = doc(fireDB, "user", user_id, "orders", order_id);
        let orderSnap = await getDoc(ordersRef);

        return { id: orderSnap.id, ...orderSnap.data() };
    } catch (error) {
        console.log("Getting Single Order Error: ", error.message);
    }
};

export const updateOrderInfo = async (user_id, order_id, formData) => {
    try {
        const orderRef = doc(fireDB, "user", user_id, "orders", order_id);
        await updateDoc(orderRef, formData);
    } catch (error) {
        console.log("Updating Order Info Error: ", error.message);
    }
}

export const saveWorkWithUsInfo = async (formData) => {
    try {
        const dataReference = collection(fireDB, "Work-With-Us");

        await addDoc(dataReference, {
            ...formData,
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
        console.log("Work With Us Info Save Error: ", error.message);
    }
};

export const getWorkWithUsInfo = async () => {
    try {
        let dataRef = collection(fireDB, "Work-With-Us");
        let dataSnap = await getDocs(dataRef);
        const data = dataSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return data;
    } catch (error) {
        console.log("Getting Work With Us Error: ", error.message);
    }
};

export const saveNewsletterInfo = async (email) => {
    try {
        const dataReference = collection(fireDB, "Newsletter");

        await addDoc(dataReference, {
            ...email,
            timestamp: getTimestamp(),
        });
    } catch (error) {
        console.log("Newsletter Info Save Error: ", error.message);
    }
};

export const getNewsletterInfo = async () => {
    try {
        let dataRef = collection(fireDB, "Newsletter");
        let dataSnap = await getDocs(dataRef);
        const data = dataSnap.docs.map((doc) => ({
            id: doc.id, // document ID
            ...doc.data(), // document fields
        }));

        return data;
    } catch (error) {
        console.log("Getting Work With Us Error: ", error.message);
    }
};

export const talkToAnAgent = async (user_id) => {
    try {
        const userReference = collection(fireDB, "Talk-to-an-Agent");

        await addDoc(userReference, { user_id });
    } catch (error) {
        console.log("Tak to an Agent Error: ", error.message);
    }
};

export const getAllTalkToAgents = async () => {
    try {
        const querySnapshot = await getDocs(
            collection(fireDB, "Talk-to-an-Agent")
        );
        let users = [];

        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });

        return users;
    } catch (error) {
        console.log("Get All Talk to Agent Error:", error.message);
    }
};

export const removeUserFromTalkToAgents = async (user_id) => {
    try {
        const usersRef = collection(fireDB, "Talk-to-an-Agent");
        const q = query(usersRef, where("user_id", "==", user_id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            for (const document of querySnapshot.docs) {
                await deleteDoc(doc(fireDB, "Talk-to-an-Agent", document.id));
            }
        }
    } catch (error) {
        console.log("Removing user from talk to agent error: ", error.message);
    }
};

export const addNewReportAndIssue = async (data, user) => {
    try {
        const newIssue = {
            reason: data.reason,
            description: data.description,
            user_id: user.uid,
            images: data.urls,
            timestamp: getTimestamp()
        };

        const userReference = collection(fireDB, "Report-and-Issue");

        await addDoc(userReference, newIssue);
    } catch (error) {
        console.log("Adding New Report and Issue: ", error.message);
    }
};

export const getAllReportAndIssue = async () => {
    try {
        const querySnapshot = await getDocs(
            collection(fireDB, "Report-and-Issue")
        );
        let users = [];

        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });

        return users;
    } catch (error) {
        console.log("Get All Report and Issue Error:", error.message);
    }
};

export const addNewRecentProduct = async (user_id, item, maxItems = 50) => {
    try {
        const userRef = collection(fireDB, "user", user_id, "Recently Viewed");

        // Check if item already exists
        const existingQ = query(userRef, where("item_id", "==", item.item_id));
        const existingSnap = await getDocs(existingQ);

        for (const docSnap of existingSnap.docs) {
            await deleteDoc(doc(fireDB, "user", user_id, "Recently Viewed", docSnap.id));
        }

        // Add new document with timestamp
        await addDoc(userRef, item);

        // Limit to maxItems (keep most recent)
        const recentQ = query(userRef, orderBy("timestamp", "desc"));
        const recentSnap = await getDocs(recentQ);
        if (recentSnap.docs.length > maxItems) {
            const docsToDelete = recentSnap.docs.slice(maxItems);
            for (const docSnap of docsToDelete) {
              await deleteDoc(doc(fireDB, "user", user_id, "Recently Viewed", docSnap.id));
            }
        }

    } catch (error) {
        console.log("Adding New Recent Product Error: ", error.message);
    }
};

export const getAllRecentPoducts = async (user_id) => {
    try {
        const productsRef = collection(
            fireDB,
            "user",
            user_id,
            "Recently Viewed"
        );
        const productsQuery = query(productsRef, orderBy("timestamp", "desc"));
        const docSnap = await getDocs(productsQuery);

        let products = docSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return products;
    } catch (error) {
        console.log(
            "Getting All Recent Viewed Products Error: ",
            error.message
        );
    }
};

export const addWebsiteReview = async (formData) => {
    try {
        let docRef = collection(fireDB, "Website Reviews");
        await addDoc(docRef, {...formData, timestamp: getTimestamp()});
    } catch (error) {
        console.log("Adding New Website Review Error: ", error.message);
    }
};

export const getBlogWithId = async (id) => {
    try {
        let blog = await getDoc(doc(fireDB, "Blogs", id));

        return { id, ...blog.data() };
    } catch (error) {
        console.log("Error getting blog data: ", error.message);
    }
}

export const addNewReview = async (userId, productId, data) => {
    try {
        const userRef = collection(fireDB, "Reviews");
        let docSnap = await addDoc(userRef, {
            userId,
            productId,
            ...data,
            timestamp: getTimestamp()
        })
        return docSnap.id
    } catch (error) {
        console.log("Error at adding new review: ",error.message);
    }
}

export const getReviewsByProduct = async (productId) => {
    try {
        const reviewsRef = collection(fireDB, "Reviews");
        const q = query(reviewsRef, where("productId", "==", productId));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.log("Getting reviews by product error: ", error.message);
    }
}

export const getAllReviewsByUser = async (userId) => {
    try {
        const reviewsRef = collection(fireDB, "Reviews");
        const q = query(reviewsRef, where("userId", "==", userId))
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.log("Getting reviews by user error: ", error.message);
    }
}

export const getReviewById = async (itemId) => {
    try {
        let reviewRef = doc(fireDB, "Reviews", itemId);
        let docSnap = await getDoc(reviewRef);

        return {id: docSnap.id, ...docSnap.data()}
    } catch (error) {
        console.log("Getting review by Id Error: ", error.message);
    }
}

export const getWebsiteReview = async () => {
    try {
        const reviewsRef = collection(fireDB, "Website Reviews");
        const snapshot = await getDocs(reviewsRef);

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.log("Getting website review by user error: ", error.message);
    }
}

export const deleteAllRecents = async (userId) => {
    try {
        let userRef = collection(fireDB, "user", userId, "Recently Viewed");
        const snapshot = await getDocs(userRef);

        const deletePromises = snapshot.docs.map((d) => deleteDoc(doc(userRef, d.id)));
        await Promise.all(deletePromises);
    } catch (error) {
        console.log("Deleting all recent viewed products error: ", error.message);
    }
}

export const deleteRecentProduct = async (userId, itemId) => {
    try {
        let userRef = doc(fireDB, "user", userId, "Recently Viewed", itemId);
        await deleteDoc(userRef);
    } catch (error) {
        console.log("Deleting single recent viewed product error: ", error.message);
    }
}

// export const requestPermissionAndGetToken = async () => {
//     try {
//       const permission = await Notification.requestPermission();
//       if (permission === "granted") {
//             const token = await getToken(messaging, {
//             vapidKey: import.meta.env.VITE_VAPID_KEY
//         });
//         return token;
//       } else {
//         console.warn("Notification permission not granted");
//         return null;
//       }
//     } catch (error) {
//       console.error("Error getting FCM token", error);
//       return null;
//     }
// };

// export const listenForMessages = (toast) => {
//     onMessage(messaging, (payload) => {
//         toast(payload.notification.title);
//     });
// };

// export const addNewNotification = async (user_id, message) => {
//     try {
//         let messageRef = collection(fireDB, "user", user_id, "Notifications");
//         let dataSnap = await
//     } catch (error) {
//         console.log("Error at adding new notification: ", error.message);
//     }
// }