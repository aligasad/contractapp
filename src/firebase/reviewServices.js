import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { firebaseDB } from "./FirebaseConfig";// adjust path to your firebase config

// Add Review
export const addReview = async (productId, review) => {
  const reviewsRef = collection(firebaseDB, "workers", productId, "reviews");

  await addDoc(reviewsRef, {
    ...review,
    timestamp: serverTimestamp(),
  });
};

// Get Reviews
export const getReviews = async (productId) => {
    if (typeof productId !== "string") {
    console.error("Invalid productId passed to getReviews:", productId);
    return [];
  }
  const reviewsRef = collection(firebaseDB, "workers", productId, "reviews");
  const q = query(reviewsRef, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};