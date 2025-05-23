import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  arrayUnion,
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
import { toast } from "react-toastify";
import { auth, fireDB } from "./FirebaseConfig.js";
import { v4 as uuidv4 } from "uuid";

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
        DOB: "",
        gender: "",
        altPhone: "",
        profilePic: "",
        uid: users.user.uid,
        role: formData.role,
        timestamp: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      };

      const userReference = collection(fireDB, "user");

      await addDoc(userReference, user);

      toast.success("User Created Successfully ...");
    }
  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      toast.error("Email Already Exists ...");
    }
    console.log("Sign Up Error :", error.message);
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

      toast.success("Logged In Successfully ...");
      return userData;
    }

    toast.error("User Login Failed ...");
  } catch (error) {
    if (error.message === "Firebase: Error (auth/invalid-credential).") {
      toast.error("Email or Password is Incorrect ...");
    }
    console.log("Login Error: ", error.message);
  }
};

export const logoutUser = async () => {
  try {
    localStorage.clear();
    toast.success("User Logged Out Successfully ...");
  } catch (error) {
    console.log("Logout Error: ", error.message);
  }
};

export const getUserInfo = async (user_id) => {
  try {
    const q = query(collection(fireDB, "user"), where("uid", "==", user_id));
    const querySnapshot = await getDocs(q);

    let userData = null;
    querySnapshot.forEach((doc) => {
      userData = { id: doc.id, ...doc.data() };
    });

    return userData;
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
    await addDoc(cartRef, item);
  } catch (error) {
    console.log("Add to Cart Error: ", error.message);
  }
};

export const getUserCart = async (user_id) => {
  try {
    const cartRef = collection(fireDB, "user", user_id, "cart");
    const cartSnapshot = await getDocs(cartRef);

    const cartItems = [];
    cartSnapshot.forEach((doc) => {
      cartItems.push({ id: doc.id, ...doc.data() });
    });

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
    const docRef = await addDoc(wishlistRef, { item_id: item });

    return {id: docRef.id, item_id: item}
  } catch (error) {
    console.log("Add to Wishlist Error: ", error.message);
  }
};

export const getUserWishlist = async (user_id) => {
  try {
    const wishlistRef = collection(fireDB, "user", user_id, "wishlist");
    const wishlistSnapshot = await getDocs(wishlistRef);

    const wishlistItems = [];
    wishlistSnapshot.forEach((doc) => {
      wishlistItems.push({ id: doc.id, ...doc.data() });
    });

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

export const addNewAddress = async (user_id, formData) => {
  try {
    const addressRef = doc(fireDB, "address", user_id);

    let newFormData = { ...formData, id: uuidv4() };

    await setDoc(
      addressRef,
      {
        items: arrayUnion(newFormData),
      },
      { merge: true }
    );

    return arrayUnion(newFormData).Hu[0];
  } catch (error) {
    console.log("Add New Address Error: ", error.message);
  }
};

export const getAllAddress = async (user_id) => {
  try {
    const addressRef = doc(fireDB, "address", user_id);
    const addressSnap = await getDoc(addressRef);

    if (addressSnap.exists()) {
      const data = addressSnap.data();
      return data || []; // items is the array of cart objects
    } else {
      return [];
    }
  } catch (error) {
    console.log("Getting All Address Error: ", error.message);
  }
};

export const editAnAddress = async (user_id, formData, item_id) => {
  try {
    const addressRef = doc(fireDB, "address", user_id);

    const docSnap = await getDoc(addressRef);

    if (docSnap.exists()) {
      let address = docSnap.data().items || [];

      const updatedAddress = address.map((add) => {
        if (add.id === item_id) {
          return formData;
        }
        return add;
      });

      await updateDoc(addressRef, {
        items: updatedAddress,
      });
      return formData;
    }
  } catch (error) {
    console.log("Edit Address Error: ", error.message);
  }
};

export const deleteAddress = async (user_id, item_id) => {
  try {
    const addressRef = doc(fireDB, "address", user_id);
    const addressSnap = await getDoc(addressRef);

    if (addressSnap.exists()) {
      const address = addressSnap.data().items || [];
      const updatedaddress = address.filter((item) => item.id !== item_id);

      await updateDoc(addressRef, { items: updatedaddress });

      return updatedaddress;
    }
  } catch (error) {
    console.log("Delete Address Error: ", error.message);
  }
};

export const setAsDefaultNewAddress = async (user_id, item_id) => {
  const addressRef = doc(fireDB, "address", user_id);
  const addressSnap = await getDoc(addressRef);

  if (addressSnap.exists()) {
    const address = addressSnap.data().items;

    const updatedAddress = address.map((item) => ({
      ...item,
      isDefault: item.id === item_id,
    }));

    await updateDoc(addressRef, { items: updatedAddress });

    return updatedAddress;
  }
};

export const sortedProductItems = async (sortBy) => {
  try {
    let sort = sortBy.split("_");
    const productsRef = collection(fireDB, "products");
    const q = query(productsRef, orderBy(sort[0], sort[1]));

    const querySnapshot = await getDocs(q);
    let sortedProducts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return sortedProducts;
  } catch (error) {
    console.log("Getting Sorted Products Items Error: ", error.message);
  }
};

export const filteredProductItem = async (filterBy) => {
  try {
    let filter = filterBy.split("_");
    const productsRef = collection(fireDB, "products");
    let q;

    if (filter.length === 2) {
      q = query(productsRef, where(filter[0], "==", filter[1]));
    } else {
      q = query(
        productsRef,
        where(filter[0], ">=", parseInt(filter[1])),
        where(filter[0], "<=", parseInt(filter[2]))
      );
    }

    const querySnapshot = await getDocs(q);
    let filteredProducts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return filteredProducts;
  } catch (error) {
    console.log("Getting Filtered Product Items Error:  ", error.message);
  }
};

export const createOrderInfo = async (orderDetails) => {
  try {
    const orderRef = doc(fireDB, "orders", orderDetails.userId);

    await setDoc(
      orderRef,
      { items: arrayUnion({ ...orderDetails, id: uuidv4() }) },
      { merge: true }
    );
    return arrayUnion(orderDetails).Hu[0];
  } catch (error) {
    console.log("Error at Order Creation: ", error.message);
  }
};

export const getAllOrders = async (user_id) => {
  try {
    const orderRef = doc(fireDB, "orders", user_id);
    const orderSnap = await getDoc(orderRef);

    if (orderSnap.exists()) {
      const data = orderSnap.data();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Getting All Orders Error: ", error.message);
  }
};

export const getSingleOrderDetails = async (user_id, order_id) => {
  try {
    let ordersRef = doc(fireDB, "orders", user_id);
    let orderSnap = await getDocs(ordersRef);

    if (orderSnap.exists()) {
      console.log(orderSnap.data());
    }
  } catch (error) {
    console.log("Getting Single Order Error: ", error.message);
  }
};

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
      email,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
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
    const querySnapshot = await getDocs(collection(fireDB, "Talk-to-an-Agent"));
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

export const addNewReportAndIssue = async (formData, imageData, user) => {
  try {
    const newIssue = {
      title: formData.title,
      description: formData.description,
      user_id: user.uid,
      images: imageData.urls,
      imagesId: imageData.ids,
      timestamp: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };

    const userReference = collection(fireDB, "Report-and-Issue");

    addDoc(userReference, newIssue);
  } catch (error) {
    console.log("Adding New Report and Issue: ", error.message);
  }
};

export const getAllReportAndIssue = async () => {
  try {
    const querySnapshot = await getDocs(collection(fireDB, "Report-and-Issue"));
    let users = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.log("Get All Report and Issue Error:", error.message);
  }
};
