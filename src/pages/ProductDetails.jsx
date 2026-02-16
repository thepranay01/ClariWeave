import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ShoppingBag, Bell } from "lucide-react";
import { motion } from "framer-motion";
import useCartStore from "../store/cartStore";
import { cn } from "../utils/cn";
import useProductStore from "../store/productStore";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { getProductById } = useProductStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductById(id);
      if (data) {
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariantId(data.variants[0].id || "v1"); // Default to v1 if no id
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id, getProductById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center text-white px-6">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate("/shop")}
          className="text-white border-b border-white"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const selectedVariant =
    product.variants?.find((v) => v.id === selectedVariantId) ||
    product.variants?.[0];
  const isOutOfStock = (selectedVariant?.stock || 0) === 0;
  const currentPrice =
    product.basePrice + (selectedVariant?.priceModifier || 0);

  const handleAddToCart = () => {
    if (selectedVariant && !isOutOfStock) {
      addItem(product, selectedVariant, quantity);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 group"
            >
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className={cn(
                  "w-full h-full",
                  selectedImageIndex === 0
                    ? "object-cover"
                    : "object-contain p-12",
                )}
              />

              {/* Context Image Tint Overlay - Apply to secondary images to match product color */}
              {selectedImageIndex > 0 && product.colorHex && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-color"
                  style={{ backgroundColor: product.colorHex, opacity: 1 }}
                />
              )}
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={cn(
                    "relative aspect-square bg-zinc-900 rounded-lg overflow-hidden border cursor-pointer hover:border-white/40 transition-all",
                    selectedImageIndex === idx
                      ? "border-white ring-1 ring-white"
                      : "border-white/5 opacity-70 hover:opacity-100",
                  )}
                >
                  <img
                    src={img}
                    alt={`View ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Thumbnail Tint */}
                  {idx > 0 && product.colorHex && (
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-color"
                      style={{
                        backgroundColor: product.colorHex,
                        opacity: 1,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
              {product.name}
            </h1>
            <p className="text-2xl text-white font-medium mb-6">
              ₹{currentPrice}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Configurator */}
            <div className="space-y-8 mb-10">
              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Size
                  </label>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "px-6 py-3 rounded-[20px] border transition-all text-sm font-medium",
                          selectedSize === size
                            ? "bg-white text-black border-white"
                            : "bg-zinc-900 text-white border-white/10 hover:border-white/40",
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Option Selection (Size/Model) */}
              {product.variants.some((v) => v.name !== "Standard") && (
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Option
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {Array.from(
                      new Set(product.variants.map((v) => v.name)),
                    ).map((optionName) => (
                      <button
                        key={optionName}
                        onClick={() => {
                          const matchingVariant = product.variants.find(
                            (v) => v.name === optionName,
                          );
                          if (matchingVariant)
                            setSelectedVariantId(matchingVariant.id);
                        }}
                        className={cn(
                          "px-4 py-2 rounded-lg border transition-all text-sm",
                          selectedVariant?.name === optionName
                            ? "bg-white text-black border-white"
                            : "bg-zinc-900 text-white border-white/10 hover:border-white/40",
                        )}
                      >
                        {optionName}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.variants.some((v) => v.color) && (
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Color
                  </label>
                  <div className="flex gap-3">
                    {product.variants
                      .filter((v) => v.name === selectedVariant?.name) // Show colors for same size
                      .map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariantId(variant.id)}
                          title={variant.color}
                          className={cn(
                            "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
                            selectedVariantId === variant.id
                              ? "border-white scale-110"
                              : "border-transparent hover:scale-105",
                          )}
                          style={{
                            backgroundColor:
                              variant.colorHex || product.colorHex || "#333",
                          }}
                        >
                          {selectedVariantId === variant.id && (
                            <Check
                              size={16}
                              className="text-white drop-shadow-md"
                            />
                          )}
                        </button>
                      ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedVariant?.color}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              {isOutOfStock ? (
                <div className="p-4 bg-zinc-900/50 border border-white/10 rounded-xl">
                  <p className="text-red-400 font-medium flex items-center gap-2 mb-3">
                    Out of Stock
                  </p>
                  <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2">
                    <Bell size={20} /> Notify Me When Available
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="flex items-center bg-zinc-900 rounded-full border border-white/10">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:text-white text-muted-foreground transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(
                          Math.min(selectedVariant.stock, quantity + 1),
                        )
                      }
                      className="px-4 py-3 hover:text-white text-muted-foreground transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-zinc-900 text-white font-bold rounded-[20px] hover:bg-zinc-800 border border-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={20} /> Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 bg-white text-black font-bold rounded-[20px] hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                  >
                    Buy Now
                  </button>
                </div>
              )}

              {selectedVariant?.stock > 0 && selectedVariant.stock <= 3 && (
                <p className="text-amber-400 text-sm font-medium animate-pulse">
                  Hurry! Only {selectedVariant.stock} left in stock.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
