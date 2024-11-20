// CategoryCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate(`/collection?category=${category.name}`);
  };

  return (
    <div className='bg-white shadow-md rounded p-4 hover:shadow-lg transition-shadow'>
      <h3 className='text-lg font-semibold mt-4 text-gray-800'>{category.name}</h3>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {category.subcategories.slice(0, 4).map((subcategory, index) => (
          <div key={index} className='bg-gray-100 rounded p-4'>
            <img
              src={`https://via.placeholder.com/150?text=${subcategory}`} // Placeholder for subcategory image
              alt={subcategory}
              className='w-full h-32 object-cover rounded'
            />
            <p className='text-sm text-gray-600 mt-2'>{subcategory}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleShopNowClick}
        className='mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-200'>
        Shop Now
      </button>
    </div>
  );
};

export default CategoryCard;
