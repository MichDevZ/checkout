import { useState, useEffect } from 'react';

const useCartData = () => {
  const [cartData, setCartData] = useState({
    items: [],
    total: 0,
    subtotal: 0,
    shipping: 0,
    weight: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await fetch('https://www.cruzeirogomas.cl/wp-json/wc/store/cart', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error loading cart: ${response.status}`);
      }

      const data = await response.json();
      console.log('Cart data received:', data);

      setCartData({
        items: data.items || [],
        total: parseFloat(data.totals?.total_price) || 0,
        subtotal: parseFloat(data.totals?.total_items) || 0,
        shipping: parseFloat(data.totals?.total_shipping) || 0,
        weight: data.items_weight || 0,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartData({
        items: [],
        total: 0,
        subtotal: 0,
        shipping: 0,
        weight: 0,
        isLoading: false,
        error: error.message || 'An error occurred while loading the cart',
      });
    }
  };

  return cartData;
};

export default useCartData;

