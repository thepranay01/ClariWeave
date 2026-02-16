import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Loader2, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import useProductStore from '../../store/productStore';

const AdminProducts = () => {
  const { products, loading, fetchProducts, addProduct, deleteProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    basePrice: '',
    category: 'Screen',
    images: [''], // Array of URLs
    stock: 0, 
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const result = await addProduct({
        name: formData.name,
        shortDescription: formData.shortDescription,
        description: formData.description,
        basePrice: Number(formData.basePrice),
        category: formData.category,
        images: formData.images,
        variants: [{ stock: Number(formData.stock), name: 'Standard' }]
      });
      
      if (result.success) {
        setIsModalOpen(false);
        setFormData({
            name: '',
            shortDescription: '',
            description: '',
            basePrice: '',
            category: 'Screen',
            images: [''],
            stock: 0, 
        });
      }
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleSeedData = async () => {
    const dummyProducts = [
      {
        name: "UltraWeave Pro",
        shortDescription: "The gold standard for screen cleaning. High density microfibre.",
        description: "Experience the pinnacle of cleaning technology. The UltraWeave Pro uses our highest density microfibre weave to trap even the smallest dust particles without scratching. Perfect for 4K monitors, camera lenses, and delicate glass surfaces.",
        basePrice: 499,
        category: "Screen",
        images: ["https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&q=80&w=1000"],
        variants: [
          { id: "v1_1", name: "Small (6x6\")", color: "Midnight Black", stock: 15, priceModifier: 0 },
          { id: "v1_2", name: "Large (12x12\")", color: "Midnight Black", stock: 10, priceModifier: 200 },
          { id: "v1_3", name: "Small (6x6\")", color: "Arctic White", stock: 5, priceModifier: 0 }
        ]
      },
      {
        name: "GlassMaster X",
        shortDescription: "Specialised waffle-weave for windows and mirrors.",
        description: "Streak-free finish guaranteed. The GlassMaster X is engineered with a waffle-weave pattern that effortlessly lifts oil and grime from mirrors and windows. No chemicals needed, just water.",
        basePrice: 349,
        category: "Glass",
        images: ["https://images.unsplash.com/photo-1528740561666-dc24705f08a7?auto=format&fit=crop&q=80&w=1000"],
        variants: [
          { id: "v2_1", name: "Standard", color: "Ocean Blue", stock: 25, priceModifier: 0 },
          { id: "v2_2", name: "Standard", color: "Cloud Grey", stock: 12, priceModifier: 0 }
        ]
      },
      {
        name: "LensGuard Mini",
        shortDescription: "Pocket-sized protection for lenses and eyewear.",
        description: "Your camera's best friend. Compact, ultra-soft, and designed to keep your lenses pristine in any environment. Comes with a protective carrying pouch.",
        basePrice: 249,
        category: "Lens",
        images: ["https://images.unsplash.com/photo-1626573867623-28688439366e?auto=format&fit=crop&q=80&w=1000"],
        variants: [
          { id: "v3_1", name: "Mini", color: "Charcoal", stock: 50, priceModifier: 0 },
          { id: "v3_2", name: "Mini", color: "Crimson", stock: 20, priceModifier: 50 }
        ]
      }
    ];

    if (window.confirm("Add 3 dummy products with variations?")) {
      for (const p of dummyProducts) {
        await addProduct(p);
      }
      alert("Seeding complete!");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        await deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your inventory and product listings.</p>
          </div>
          <div className="flex gap-4">
            <button 
                onClick={handleSeedData}
                className="px-6 py-3 bg-zinc-900 text-white font-medium rounded-lg border border-white/10 hover:bg-zinc-800 transition-all flex items-center gap-2"
            >
                <Sparkles size={20} /> Seed Data
            </button>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all flex items-center gap-2"
            >
                <Plus size={20} /> Add Product
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/40"
            />
          </div>
          {/* Category Filter could go here */}
        </div>

        {/* Product Table */}
        <div className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                 <tr>
                   <td colSpan="6" className="px-6 py-12 text-center text-muted-foreground">
                     <Loader2 className="animate-spin w-8 h-8 mx-auto mb-2" />
                     Loading products...
                   </td>
                 </tr>
              ) : products.length === 0 ? (
                 <tr>
                   <td colSpan="6" className="px-6 py-12 text-center text-muted-foreground">No products found.</td>
                 </tr>
              ) : (
                products
                  .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((product) => {
                  const stock = product.variants?.[0]?.stock || product.stock || 0;
                  return (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
                    <td className="px-6 py-4 text-white">₹{product.basePrice}</td>
                    <td className="px-6 py-4 text-white">{stock}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <button className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors">
                         <Edit size={18} />
                       </button>
                       <button 
                         onClick={() => handleDeleteProduct(product.id)}
                         className="p-2 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-400 transition-colors"
                       >
                         <Trash2 size={18} />
                       </button>
                    </td>
                  </tr>
                );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Add Product Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">Add New Product</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleAddProduct} className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Product Name</label>
                      <input 
                        type="text" name="name" required
                        value={formData.name} onChange={handleInputChange}
                        className="w-full p-3 bg-black border border-white/10 rounded-lg text-white focus:border-white/40 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Base Price (₹)</label>
                      <input 
                        type="number" name="basePrice" required
                        value={formData.basePrice} onChange={handleInputChange}
                        className="w-full p-3 bg-black border border-white/10 rounded-lg text-white focus:border-white/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Category</label>
                    <select 
                      name="category"
                      value={formData.category} onChange={handleInputChange}
                      className="w-full p-3 bg-black border border-white/10 rounded-lg text-white focus:border-white/40 focus:outline-none"
                    >
                      <option value="Screen">Screen</option>
                      <option value="Glass">Glass</option>
                      <option value="Lens">Lens</option>
                      <option value="All-Purpose">All-Purpose</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Short Description</label>
                    <input 
                      type="text" name="shortDescription" required
                      value={formData.shortDescription} onChange={handleInputChange}
                      className="w-full p-3 bg-black border border-white/10 rounded-lg text-white focus:border-white/40 focus:outline-none"
                    />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-muted-foreground mb-2">Full Description</label>
                     <textarea 
                        name="description" rows="4" required
                        value={formData.description} onChange={handleInputChange}
                        className="w-full p-3 bg-black border border-white/10 rounded-lg text-white focus:border-white/40 focus:outline-none resize-none"
                     />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Stock Quantity</label>
                      <input 
                        type="number" name="stock"
                        value={formData.stock} onChange={handleInputChange}
                        className="w-full p-3 bg-black border border-white/10 rounded-lg text-white focus:border-white/40 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Image URL</label>
                      <input 
                        type="text" 
                        value={formData.images[0]} 
                        onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
                        className="w-full p-3 bg-black border border-white/10 rounded-lg text-white focus:border-white/40 focus:outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3 bg-transparent hover:bg-white/5 text-white font-medium rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-colors"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminProducts;
