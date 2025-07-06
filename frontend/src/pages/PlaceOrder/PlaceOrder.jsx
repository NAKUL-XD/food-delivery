import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalCartAmount, token, url } = useContext(StoreContext);

  const subtotal = getTotalCartAmount() || 0;
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const orderRes = await axios.post(`${url}/api/payment/create-order`, {
        amount: total
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: "INR",
        name: "Food Delivery",
        description: "Order Payment",
        order_id: orderRes.data.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${url}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: total,
              items: cartItems,
              address: formData,
              userId: token || "guest"
            });

            if (verifyRes.data.success) {
              navigate("/thankyou");
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            alert("Error verifying payment");
            console.error(err);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#6a11cb"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder='First Name' onChange={onChangeHandler} required />
          <input type="text" name="lastName" placeholder='Last Name' onChange={onChangeHandler} required />
        </div>
        <input type="email" name="email" placeholder='Email address' onChange={onChangeHandler} required />
        <input type="text" name="street" placeholder='Street' onChange={onChangeHandler} required />
        <div className="multi-fields">
          <input type="text" name="city" placeholder='City' onChange={onChangeHandler} required />
          <input type="text" name="state" placeholder='State' onChange={onChangeHandler} required />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipCode" placeholder='Zip code' onChange={onChangeHandler} required />
          <input type="text" name="country" placeholder='Country' onChange={onChangeHandler} required />
        </div>
        <input type="text" name="phone" placeholder='Phone' onChange={onChangeHandler} required />
      </div>

      <div className="place-order-right">
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
          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
