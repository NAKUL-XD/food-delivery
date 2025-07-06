import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets'; // ✅ fixed path

import './FoodItem.css';

const url = "http://localhost:3000";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const quantity = cartItems[id] ?? 0;

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img src={`${url}/images/${image}`} alt={name} className="food-item-image" />
        {quantity > 0 ? (
          <div className="food-item-quantity-controller">
            <button onClick={() => removeFromCart(id)} aria-label="Remove from cart">
              <img src={assets.remove_icon_red} alt="Remove" />
            </button>
            <span>{quantity}</span>
            <button onClick={() => addToCart(id)} aria-label="Add to cart">
              <img src={assets.add_icon_green} alt="Add" />
            </button>
          </div>
        ) : (
          <div
            className="add-button"
            onClick={() => addToCart(id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter') addToCart(id); }}
            aria-label="Add to cart"
          >
            <img src={assets.add_icon_white} alt="Add to cart" />
          </div>
        )}
      </div>
      <div className="food-item-body">
        <div className="food-item-name">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
