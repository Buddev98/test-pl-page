import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-yellow-400' 
                : i < rating 
                  ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                  : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="relative h-64 overflow-hidden group">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart size={18} className="text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        {!product.inStock && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-md font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">{product.category}</span>
        <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="mt-auto">
          {renderRating(product.rating)}
          
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
    </div>
  );
};

export default ProductCard;
