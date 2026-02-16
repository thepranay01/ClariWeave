import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();
  const shippingCost = subtotal > 500 ? 0 : 50; // Simple logic: free shipping over 500

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-zinc-900/50 p-12 rounded-2xl border border-white/5 max-w-md w-full"
        >
          <h2 className="text-3xl font-display font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any premium cleaning tools yet.</p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-display font-bold text-white mb-10">Your Cart ({totalItems})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.variantId}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-6 p-6 bg-zinc-900/30 rounded-xl border border-white/5"
                >
                  <div className="w-24 h-24 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-white">{item.productName}</h3>
                        <button 
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-muted-foreground hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.variantLabel}</p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-3 bg-zinc-900 rounded-full border border-white/10 px-3 py-1">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="p-1 hover:text-white text-muted-foreground transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="p-1 hover:text-white text-muted-foreground transition-colors"
                          disabled={item.quantity >= item.maxStock}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-semibold text-white">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-white">{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                </div>
                <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg text-white">
                  <span>Total</span>
                  <span>₹{subtotal + shippingCost}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Secure checkout powered by Stripe/Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
