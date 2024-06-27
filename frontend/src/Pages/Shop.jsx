import React from 'react';
import { Hero } from '../Components/Hero/Hero';
import { Options } from '../Components/Options/Options';
import { NewsLetter } from '../Components/NewsLetter/NewsLetter';
import { AboutUs } from '../Components/AboutUs/AboutUs';

export const Shop = () => {
  return (
    <div>
      <Hero />
      <Options />
      <AboutUs />
      <NewsLetter />
    </div>
  );
};
