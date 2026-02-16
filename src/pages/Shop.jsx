import React, { useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import useProductStore from '../store/productStore';

const Shop = () => {
  const { fetchProducts, products, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            The Collection
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Discover our premium range of engineered microfibre tools, designed for perfectionists who demand clarity.
          </p>
        </header>


        {loading ? (
             <div className="flex items-center justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
             </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.length === 0 && (
                <div className="col-span-full text-center py-20 text-muted-foreground">
                    No products found.
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
