import React, { useEffect, useState, useContext } from 'react';
import './Orders.css';
import axios from 'axios';


const Orders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/order/list`);
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          alert("Failed to fetch orders");
        }
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        alert("Server error while fetching orders");
      }
    };

    fetchOrders();
  }, [url]);

  return (
    <div className="orders-page">
      <h2>All Orders</h2>
      <div className="orders-table">
        <div className="orders-header">
          <p>User ID</p>
          <p>Amount</p>
          <p>Status</p>
          <p>Date</p>
          <p>Payment</p>
        </div>

        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div className="orders-row" key={index}>
              <p>{order.userId || "Guest"}</p>
              <p>₹{order.amount}</p>
              <p>{order.status}</p>
              <p>{new Date(order.date).toLocaleString()}</p>
              <p>{order.payment ? "✅ Paid" : "❌ Unpaid"}</p>
            </div>
          ))
        ) : (
          <p style={{ marginTop: "20px", color: "gray" }}>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;