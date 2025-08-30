import React from 'react';
import BannerCarousel from '../components/home/BannerCarousel';
import SearchFilter from '../components/home/SearchFilter';
import VillaLocations from '../components/home/VillaLocations';
import FeaturedVillas from '../components/home/FeaturedVillas';
import CounterSection from '../components/home/CounterSection';
import Gallery from '../components/home/Gallery';

const Home = () => {
  return (
    <div className="pt-16">
      <div className="relative">
        <BannerCarousel />
        <SearchFilter />
      </div>
      <VillaLocations />
      <FeaturedVillas />
      <CounterSection />
      <Gallery />
    </div>
  );
};

export default Home;