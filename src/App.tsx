import React, { useState, useEffect } from 'react';
import { products } from './data/products';
import { Product } from './types';
import Header from './components/Header';
import FilterSidebar from './components/FilterSidebar';
import ProductList from './components/ProductList';

function App() {
  // State for products and loading
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [showInStock, setShowInStock] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on all criteria
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by stock
    if (showInStock) {
      result = result.filter(product => product.inStock);
    }
    
    // Filter by rating
    if (minRating > 0) {
      result = result.filter(product => product.rating >= minRating);
    }
    
    // Sort products
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured' - no specific sorting, use default order
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, priceRange, showInStock, minRating, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar - hidden on mobile, visible on desktop */}
          <div className="md:w-64 flex-shrink-0">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              showInStock={showInStock}
              onShowInStockChange={setShowInStock}
              minRating={minRating}
              onMinRatingChange={setMinRating}
              isMobileFilterOpen={isMobileFilterOpen}
              setMobileFilterOpen={setMobileFilterOpen}
            />
          </div>
          
          {/* Main content */}
          <div className="md:ml-8 w-full mt-8 md:mt-0">
            <ProductList 
              products={filteredProducts}
              isLoading={isLoading}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-bold text-blue-600 mb-3">ShopHub</h3>
              <p className="text-gray-600 max-w-xs">Your one-stop destination for quality products at competitive prices.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Shop</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">All Products</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">New Arrivals</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Best Sellers</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Deals & Promotions</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">FAQs</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Shipping Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-blue-600">Returns & Exchanges</a></li>
                </ul>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Newsletter</h4>
                <p className="text-gray-600 mb-3">Subscribe to get special offers and updates.</p>
                <form className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; 2023 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
