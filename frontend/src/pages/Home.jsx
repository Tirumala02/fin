import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
// import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Categories from '../components/Categories'
// import ShopByCategories from '../components/ShopByCategories/ShopByCategories'
const Home = () => {
  return (
    <div className=''>
      <Hero />
      {/* <ShopByCategories/> */}
      {/* <Categories/> */}
      <LatestCollection/>
      <BestSeller/>
      {/* <OurPolicy/> */}
      <NewsletterBox/>
    </div>
  )
}

export default Home
