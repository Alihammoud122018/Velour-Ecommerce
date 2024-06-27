import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import drop_downicon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

export const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" />
      <div className='ShopCategoryIndexSort'>
        <p>
          <span>Showing 1-12 </span> out of 36 products
        </p>
        <div className="ShopCategorySort">
          Sort by <img src={drop_downicon} alt="" />
        </div>
      </div>
      <div className="ShopCategoryProducts">
        {all_product.map((product) => {
          if (product.category === props.category) {
            return (
              <Item
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
