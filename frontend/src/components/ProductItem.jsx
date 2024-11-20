import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Import both outline and filled heart icons

const ProductItem = ({ id, image, name, price }) => {
  const { addToCart } = useContext(ShopContext);
  const [isFavorited, setIsFavorited] = useState(false); // State to track if the item is favorited

  // Truncate the name to a maximum of 20 characters
  const truncateName = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Handle toggle favorite
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Optionally, you can trigger a function to save the favorite status to a database or context
  };

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between min-w-32 max-w-56 w-full relative'>
      {/* Favorite Icon */}
      <div
        className='absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-shadow'
        onClick={toggleFavorite} // Toggle favorite on click
      >
        {isFavorited ? (
          <AiFillHeart className='text-[#F3441C] text-xl' />
        ) : (
          <AiOutlineHeart className='text-[#F3441C] text-xl' />
        )}
      </div>

      <Link
        onClick={() => window.scrollTo(0, 0)}
        className='h-56 w-full overflow-hidden'
        to={`/product/${id}`}
      >
        <div className='h-44'>
          <img
            className='w-full h-full object-contain transition-transform duration-200 hover:scale-105'
            src={image[0]}
            alt={name}
          />
        </div>
      </Link>
      <div className='p-4 flex flex-col justify-between'>
        <Link to={`/product/${id}`}>
          <p className='text-gray-800 font-semibold text-lg line-clamp-2'>{truncateName(name, 20)}</p>
        </Link>
        <p className='text-gray-600 mt-2 text-sm font-medium'>{`₹${price.toFixed(2)}`}</p>
        <button
          onClick={() => addToCart(id)}
          className='mt-3 bg-[#F3441C] text-white py-2 px-4 rounded hover:bg-gray-800 transition-all duration-200'
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
