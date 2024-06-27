import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item'>
      {props.link ? (
        <Link to={props.link} className='item-link'>
          <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt={props.name} className="item-image"/>
          <p>{props.name}</p>
        </Link>
      ) : (
        <Link to={`/product/${props.id}`} className='item-link'>
          <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt={props.name} className="item-image"/>
          <p>{props.name}</p>
          <div className="item-prices">
            <div className="item-price">${props.price}</div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Item;
