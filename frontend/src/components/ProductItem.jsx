import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const ProductItem = ({ id, image, name, price }) => {
  const { addToCart, updateQuantity, cartItems } = useContext(ShopContext);
  const [isFavorited, setIsFavorited] = useState(false);

  // Track quantity locally
  const [quantity, setQuantity] = useState(() => {
    const productInCart = cartItems[id];
    return productInCart ? Object.values(productInCart).reduce((sum, qty) => sum + qty, 0) : 0;
  });

  // Truncate the name to a maximum of 20 characters
  const truncateName = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Handle toggle favorite
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    // Optionally save favorite status to a database or context
  };

  // Format price
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // Increase quantity
  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(id, 'default', newQuantity); // Assuming "default" size
  };

  // Decrease quantity
  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(id, 'default', newQuantity); // Assuming "default" size
    } else {
      setQuantity(0);
      updateQuantity(id, 'default', 0);
    }
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    setQuantity(1);
    addToCart(id, 'default', 1); // Assuming "default" size
  };

  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between min-w-32 max-w-56 w-full relative'>
      {/* Favorite Icon */}
      <div
        className='absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm hover:shadow-md cursor-pointer transition-shadow'
        onClick={toggleFavorite}
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
        <p className='text-gray-600 mt-2 text-sm font-medium'>{`₹${formatPrice(price)}`}</p>

        {/* Centered Quantity or Add to Cart */}
        <div className='mt-3 flex justify-center items-center'>
          {quantity > 0 ? (
            <div className='flex items-center gap-3'>
              <button
                onClick={handleDecrease}
                className='bg-gray-300 text-black px-3 py-1 rounded-md'
              >
                -
              </button>
              <span className='text-lg font-semibold'>{quantity}</span>
              <button
                onClick={handleIncrease}
                className='bg-gray-300 text-black px-3 py-1 rounded-md'
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className='bg-[#F3441C] text-white py-2 px-4 rounded hover:bg-gray-800 transition-all duration-200'
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
