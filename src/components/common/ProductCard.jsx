import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import useCartStore from '../../store/cartStore';


const ProductCard = ({ product }) => {
  const { name, shortDescription, basePrice, images, variants, id } = product;
  const addItem = useCartStore(state => state.addItem);
  
  const currentStock = variants?.[0]?.stock || 0;
  const isOutOfStock = currentStock === 0;
  const isLowStock = currentStock > 0 && currentStock <= 3;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
        addItem(product, variants[0], 1);
    }
  };

  return (
    <motion.div 
      className="group relative bg-zinc-900/50 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <Link to={`/product/${id}`} className="block">
        <div className="aspect-square overflow-hidden bg-zinc-800 relative">
          <img 
            src={images?.[0] || 'https://via.placeholder.com/400x400/333/fff?text=ClariWeave'} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isOutOfStock && (
              <span className="px-2 py-1 text-xs font-bold bg-zinc-800 text-white/60 rounded">
                Out of Stock
              </span>
            )}
            {isLowStock && (
              <span className="px-2 py-1 text-xs font-bold bg-amber-900/80 text-amber-200 rounded animate-pulse">
                Only {currentStock} left
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-display font-semibold text-white mb-1 group-hover:text-white/90 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-white">
            ₹{basePrice}
          </span>
          
          <button 
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={cn(
              "p-2 rounded-full transition-all",
              isOutOfStock 
                ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
                : "bg-white text-black hover:bg-white/90 hover:scale-110 active:scale-95"
            )}
          >
            {isOutOfStock ? (
              <span className="text-xs font-bold px-2">Notify</span>
            ) : (
              <Plus size={20} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
