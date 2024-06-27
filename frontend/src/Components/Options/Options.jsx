import React, { useEffect } from 'react';
import './options.css';
import data_product from '../Assets/data';
import Item from '../Item/Item';

export const Options = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='options'>
      <h1>Explore Our Options</h1>
      <hr />
      <div className="choose-item">
        {data_product.map((item) => (
          <Item 
            key={item.id} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            price={item.price} 
            link={item.link} 
          />
        ))}
      </div>
    </div>
  );
}

export default Options;
