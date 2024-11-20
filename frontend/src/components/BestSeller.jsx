import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const BestSellerCollection = () => {
  const { products } = useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 6; // Set the number of items per page

  useEffect(() => {
    const fetchBestSellerProducts = async () => {
      setIsLoading(true);
      try {
        // Simulating an API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Filtering Best Seller products
        const bestSellers = products.filter(product => product.isBestSeller); // Adjust based on your data structure
        setBestSellerProducts(bestSellers);
      } catch (error) {
        console.error('Error fetching best seller products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellerProducts();
  }, [products]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Pagination Logic
  const totalPages = Math.ceil(bestSellerProducts.length / itemsPerPage);
  const displayedProducts = bestSellerProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'BEST SELLER'} text2={'PRODUCTS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-400">
          Check out our best-selling products at XchangeTechs. These items are loved by our customers for their quality and value.
        </p>
      </div>

      {/* Fullscreen Grid of Best Seller Products */}
      <div className="w-full justify-center items-center">
        <div className={`grid gap-8 w-full grid-cols-6`}>
          {displayedProducts.map((item, index) => (
            <div key={index} className="flex justify-center">
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                className="w-full h-full aspect-w-1 aspect-h-1" // Square Card
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination controls with arrows */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded-l-md disabled:opacity-50 flex items-center justify-center"
        >
          <FiChevronLeft size={20} />
        </button>
        <span className="mx-4 text-lg text-white">
          {currentPage}/{totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-800 text-white rounded-r-md disabled:opacity-50 flex items-center justify-center"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default BestSellerCollection;
