import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, cartItems, addToCart, updateQuantity } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);

      // Check if the product is in the cart and update the local quantity state
      const cartProduct = cartItems[productId];
      if (cartProduct) {
        const totalQuantity = Object.values(cartProduct).reduce((sum, qty) => sum + qty, 0);
        setQuantity(totalQuantity);
      } else {
        setQuantity(0);
      }
    }
  }, [productId, products, cartItems]);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(productId, 'default', newQuantity); // Assuming "default" as size for simplicity
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(productId, 'default', newQuantity);
    } else {
      setQuantity(0);
      updateQuantity(productId, 'default', 0);
    }
  };

  const handleAddToCart = () => {
    setQuantity(1);
    addToCart(productId, 'default', 1); // Assuming "default" as size for simplicity
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*----------- Product Data-------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*---------- Product Images------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border border-gray-500'
                alt={`Product thumbnail ${index}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%] object-contain px-2'>
            <img
              className='w-full h-auto max-w-xl rounded-md object-contain border border-gray-300 transition-all duration-300 transform-none'
              src={image}
              alt='Product main'
            />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className='flex-1'>
          <h1 className='font-bold text-3xl mt-2 text-gray-800'>{productData.name}</h1>
          <p className='mt-5 text-3xl font-semibold text-gray-800'>
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <div className="mt-5 text-gray-600">
            <h2 className="font-semibold text-lg">Description:</h2>
            {Array.isArray(productData.description) ? (
              <ul className="list-disc ml-5 mt-2" style={{ fontFamily: "Arial, sans-serif" }}>
                {productData.description.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2" style={{ fontFamily: "Arial, sans-serif" }}>
                {productData.description}
              </p>
            )}
          </div>

          {/* Add to Cart or Quantity Selector */}
          <div className='mt-5'>
            {quantity > 0 ? (
              <div className='flex items-center gap-3'>
                <button
                  onClick={handleDecrease}
                  className='bg-gray-300 text-black px-3 py-1 rounded-md'
                >
                  -
                </button>
                <span>{quantity}</span>
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
                className='text-gray-200 bg-black px-8 py-3 text-sm active:bg-gray-700 transition-all duration-300 hover:-translate-y-1'
              >
                ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --------- display related products ---------- */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
