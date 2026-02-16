import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      toggleCart: () => set({ isOpen: !get().isOpen }),
      
      addItem: (product, variant, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          item => item.productId === product.id && item.variantId === variant.id
        );

        let newItems;
        if (existingItemIndex > -1) {
          newItems = [...currentItems];
          newItems[existingItemIndex].quantity += quantity;
        } else {
          newItems = [
            ...currentItems,
            {
              productId: product.id,
              variantId: variant.id,
              productName: product.name,
              variantLabel: `${variant.name}${variant.color ? ' - ' + variant.color : ''}`,
              price: product.basePrice + (variant.priceModifier || 0),
              image: product.images[0],
              quantity,
              maxStock: variant.stock
            }
          ];
        }
        
        const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
        const subtotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        set({ items: newItems, totalItems, subtotal });
      },

      removeItem: (productId, variantId) => {
        const newItems = get().items.filter(
          item => !(item.productId === productId && item.variantId === variantId)
        );
        const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
        const subtotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        set({ items: newItems, totalItems, subtotal });
      },

      updateQuantity: (productId, variantId, newQuantity) => {
        const newItems = get().items.map(item => {
          if (item.productId === productId && item.variantId === variantId) {
            return { ...item, quantity: Math.min(newQuantity, item.maxStock) };
          }
          return item;
        });
        const totalItems = newItems.reduce((total, item) => total + item.quantity, 0);
        const subtotal = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        set({ items: newItems, totalItems, subtotal });
      },

      clearCart: () => set({ items: [], totalItems: 0, subtotal: 0 }),
      
      totalItems: 0,
      subtotal: 0,
    }),
    {
      name: 'clariweave-cart-storage',
    }
  )
);

export default useCartStore;
