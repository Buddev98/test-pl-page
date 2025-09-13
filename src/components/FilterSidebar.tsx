import React from 'react';
import { Sliders, X } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  showInStock: boolean;
  onShowInStockChange: (show: boolean) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  isMobileFilterOpen: boolean;
  setMobileFilterOpen: (open: boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  showInStock,
  onShowInStockChange,
  minRating,
  onMinRatingChange,
  isMobileFilterOpen,
  setMobileFilterOpen
}) => {
  const sidebarClasses = isMobileFilterOpen
    ? 'fixed inset-y-0 left-0 z-40 w-full md:w-64 transform translate-x-0 transition-transform duration-300 ease-in-out'
    : 'fixed inset-y-0 left-0 z-40 w-full md:w-64 transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out';

  return (
    <>
      {/* Mobile filter toggle button */}
      <button 
        className="md:hidden fixed bottom-4 right-4 z-30 bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setMobileFilterOpen(true)}
      >
        <Sliders size={20} />
      </button>

      {/* Overlay for mobile */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileFilterOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`${sidebarClasses} bg-white p-6 overflow-y-auto shadow-lg md:shadow-none`}>
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setMobileFilterOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="all-categories"
                name="category"
                checked={selectedCategory === ''}
                onChange={() => onCategoryChange('')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="all-categories" className="ml-2 text-sm text-gray-700">All Categories</label>
            </div>
            
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  id={`category-${category}`}
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Price Range</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">${priceRange[0]}</span>
              <span className="text-sm text-gray-600">${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min="0"
              max="300"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Minimum Rating</h3>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onMinRatingChange(rating)}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  minRating === rating ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Availability</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="in-stock"
              checked={showInStock}
              onChange={(e) => onShowInStockChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="in-stock" className="ml-2 text-sm text-gray-700">In Stock Only</label>
          </div>
        </div>

        {/* Apply/Reset buttons for mobile */}
        <div className="mt-8 md:hidden flex space-x-3">
          <button 
            onClick={() => {
              onCategoryChange('');
              onPriceRangeChange([0, 300]);
              onShowInStockChange(false);
              onMinRatingChange(0);
            }}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset All
          </button>
          <button 
            onClick={() => setMobileFilterOpen(false)}
            className="flex-1 py-2 px-4 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
