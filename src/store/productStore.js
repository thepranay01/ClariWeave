import { create } from "zustand";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    // Mock data for development
    const mockProducts = [
      {
        id: "cloth-red",
        name: "Premium Microfiber - Crimson Red",
        basePrice: 19.99,
        shortDescription:
          "Ideal for heavy-duty wax removal and paint correction.",
        color: "Red",
        images: ["/images/cloth_red.png"],
        variants: [{ id: "v1", name: "Standard", price: 19.99, stock: 50 }],
      },
      {
        id: "cloth-black",
        name: "Premium Microfiber - Midnight Black",
        basePrice: 19.99,
        shortDescription:
          "Perfect for dirty jobs like wheels, engine bays, and interiors.",
        color: "Black",
        images: ["/images/cloth_black.png"],
        variants: [{ id: "v2", name: "Standard", price: 19.99, stock: 45 }],
      },
      {
        id: "cloth-purple",
        name: "Premium Microfiber - Royal Purple",
        basePrice: 19.99,
        shortDescription:
          "Ultra-plush for waterless washing and quick detailing.",
        color: "Purple",
        images: ["/images/cloth_purple.png"],
        variants: [{ id: "v3", name: "Standard", price: 19.99, stock: 30 }],
      },
      {
        id: "cloth-pink",
        name: "Premium Microfiber - Rose Pink",
        basePrice: 19.99,
        shortDescription:
          "Delicate touch for interior screens and glossy trim.",
        color: "Pink",
        images: ["/images/cloth_pink.png"],
        variants: [{ id: "v4", name: "Standard", price: 19.99, stock: 60 }],
      },
      {
        id: "cloth-green",
        name: "Premium Microfiber - Neon Green",
        basePrice: 19.99,
        shortDescription:
          "Dedicated glass cleaning cloth for streak-free windows.",
        color: "Green",
        images: ["/images/cloth_green.png"],
        variants: [{ id: "v5", name: "Standard", price: 19.99, stock: 25 }],
      },
    ];

    // Simulate network delay
    setTimeout(() => {
      set({ products: mockProducts, loading: false });
    }, 800);
  },

  getProductById: async (id) => {
    // Check if we already have it in products array
    const existing = get().products.find((p) => p.id === id);
    if (existing) return existing;

    // Otherwise fetch it
    try {
      const docRef = doc(db, "products", id);
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
      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      const newProduct = { id: docRef.id, ...productData };
      set((state) => ({
        products: [newProduct, ...state.products],
        loading: false,
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
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...updates } : p,
        ),
        loading: false,
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
      await deleteDoc(doc(db, "products", id));
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      console.error("Error deleting product:", error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },
}));

export default useProductStore;
