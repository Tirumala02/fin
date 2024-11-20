// Categories.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from './Title'; // Importing the Title component
import CategoryCard from './CategoryCard'; // Importing CategoryCard component

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='my-10'>
      {/* Use the Title component for Categories */}
      <div className='text-center py-8'>
        <Title text1={'OUR'} text2={'CATEGORIES'} /> {/* Title Component */}
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-400'>
          Discover our diverse categories curated for all your needs. From gaming gear to smart home devices, we've got you covered.
        </p>
      </div>

      {/* Category Cards Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
