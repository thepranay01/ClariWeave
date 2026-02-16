import { create } from 'zustand';
import { db } from '../firebase/config';
import { collection, getDocs, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';

const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      set({ orders, loading: false });
    } catch (error) {
      console.error("Error fetching orders:", error);
      set({ error: error.message, loading: false });
    }
  },
  
  // Example function to update order status
  updateOrderStatus: async (id, status) => {
    set({ loading: true });
    try {
      const orderRef = doc(db, 'orders', id);
      await updateDoc(orderRef, {
        status,
        updatedAt: serverTimestamp()
      });
      set((state) => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status } : o),
        loading: false
      }));
      return { success: true };
    } catch (error) {
      console.error("Error updating order:", error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  }
}));

export default useOrderStore;
