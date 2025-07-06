import { StoreContext } from '../../context/StoreContext';
import React, { useContext } from 'react';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const subtotal = getTotalCartAmount() || 0;
  const deliveryFee = 2; 
  const total = subtotal + deliveryFee;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <button onClick={() => removeFromCart(item._id)} className='remove'>Remove</button>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      {/* Cart Bottom Section */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{total.toFixed(2)}</b>
          </div>
          <button onClick={() => navigate('/order')} className='checkout-btn'>Proceed to Checkout</button>
        </div>

        {/* Promo Code Section */}
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='Promo Code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
