import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// ✅ 1) Create the CONTEXT
export const StoreContext = createContext(null);

// ✅ 2) The PROVIDER component — different name!
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:3000";

  // ✅ Add to Cart
  const addToCart = async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (!updated[itemId]) return prev;

      if (updated[itemId] === 1) delete updated[itemId];
      else updated[itemId] -= 1;

      return updated;
    });

    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  // ✅ Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // ✅ Fetch cart from backend
  const fetchCart = async (authToken) => {
    try {
      const res = await axios.get(`${url}/api/cart/get`, {
        headers: { token: authToken },
      });

      if (res.data.success) {
        setCartItems(res.data.cartData); // Sync cart
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // ✅ Total cart value
  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = food_list.find(p => p._id === itemId);
      if (item) total += item.price * cartItems[itemId];
    }
    return total;
  };

  // ✅ Total cart item count (for navbar)
  const getCartItemCount = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
  };

  // ✅ Load food and cart on first render
  useEffect(() => {
    const init = async () => {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await fetchCart(savedToken); // 👈 sync cart
      }
    };
    init();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getCartItemCount,
    token,
    setToken,
    setCartItems,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// ✅ 3) Export the PROVIDER as default
export default StoreContextProvider;
