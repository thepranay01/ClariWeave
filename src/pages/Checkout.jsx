import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore from '../store/cartStore';
import { createOrder } from '../firebase/orders';
import { CheckCircle, Loader2 } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCartStore();
  const shippingCost = subtotal > 500 ? 0 : 50;
  const total = subtotal + shippingCost;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  if (items.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: {
        line1: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      items,
      subtotal,
      shippingCost,
      total,
    };

    const result = await createOrder(orderData);

    if (result.success) {
      setSuccess(true);
      clearCart();
    } else {
      alert('Order failed. Please try again.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-zinc-900/50 p-12 rounded-3xl border border-white/10 max-w-lg w-full"
        >
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h1 className="text-4xl font-display font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase, {formData.name}. We've sent a confirmation email to {formData.email}.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-display font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Contact Info</h2>
              <input 
                type="text" name="name" placeholder="Full Name" required 
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/40"
                onChange={handleChange}
              />
              <input 
                type="email" name="email" placeholder="Email Address" required 
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/40"
                onChange={handleChange}
              />
              <input 
                type="tel" name="phone" placeholder="Phone Number" required 
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/40"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold text-white">Shipping Address</h2>
              <input 
                type="text" name="address" placeholder="Address Line 1" required 
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/40"
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" name="city" placeholder="City" required 
                  className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/40"
                  onChange={handleChange}
                />
                <input 
                  type="text" name="state" placeholder="State" required 
                  className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/40"
                  onChange={handleChange}
                />
              </div>
              <input 
                type="text" name="pincode" placeholder="Pincode/ZIP" required 
                className="w-full p-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/40"
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 mt-6 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : `Pay ₹${total}`}
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-zinc-900/30 p-8 rounded-2xl border border-white/5 h-fit">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                  <div className="w-16 h-16 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{item.productName}</p>
                    <p className="text-muted-foreground text-xs">{item.variantLabel}</p>
                    <p className="text-white text-sm mt-1">₹{item.price} x {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
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
                  <span>₹{total}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
