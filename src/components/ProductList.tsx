import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { Grid3X3, List } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortOption: string;
  onSortChange: (option: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  isLoading, 
  viewMode, 
  onViewModeChange,
  sortOption,
  onSortChange
}) => {
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Loading products...</h2>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md p-4 h-96">
              <div className="h-64 bg-gray-200 animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 animate-pulse mb-2 w-1/4"></div>
              <div className="h-6 bg-gray-200 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 animate-pulse mb-4 w-3/4"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 animate-pulse w-1/4"></div>
                <div className="h-10 bg-gray-200 animate-pulse w-1/3 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No products found</h2>
        <p className="text-gray-600">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {products.length} {products.length === 1 ? 'Product' : 'Products'}
        </h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="border border-gray-300 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
          
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="Grid view"
            >
              <Grid3X3 size={18} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="sm:w-1/3 h-48 sm:h-auto relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-md font-medium text-sm">Out of Stock</span>
                  </div>
                )}
              </div>
              <div className="sm:w-2/3 p-4 flex flex-col">
                <div className="flex-grow">
                  <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : i < product.rating 
                              ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                              : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-lg text-gray-900">${product.price.toFixed(2)}</span>
                  <button 
                    disabled={!product.inStock}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
                      product.inStock 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } transition-colors`}
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
