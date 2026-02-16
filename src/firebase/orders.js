import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'pending',
      paymentStatus: 'paid', // Mocking successful payment
    });
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error("Error creating order: ", error);
    return { success: false, error: error.message };
  }
};
