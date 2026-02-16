import { create } from 'zustand';
import { db } from '../firebase/config';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      set({ products, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error: error.message, loading: false });
    }
  },

  getProductById: async (id) => {
    // Check if we already have it in products array
    const existing = get().products.find(p => p.id === id);
    if (existing) return existing;

    // Otherwise fetch it
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  },

  addProduct: async (productData) => {
    set({ loading: true });
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      const newProduct = { id: docRef.id, ...productData };
      set((state) => ({ 
        products: [newProduct, ...state.products], 
        loading: false 
      }));
      return { success: true };
    } catch (error) {
      console.error("Error adding product:", error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  updateProduct: async (id, updates) => {
    set({ loading: true });
    try {
      const productRef = doc(db, 'products', id);
      await updateDoc(productRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updates } : p),
        loading: false
      }));
      return { success: true };
    } catch (error) {
      console.error("Error updating product:", error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await deleteDoc(doc(db, 'products', id));
      set((state) => ({
        products: state.products.filter(p => p.id !== id),
        loading: false
      }));
      return { success: true };
    } catch (error) {
      console.error("Error deleting product:", error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  }
}));

export default useProductStore;
