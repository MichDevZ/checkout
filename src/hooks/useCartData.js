import { useState, useEffect } from 'react';
import { mockCart } from './mockCart';

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
    try {
      // En desarrollo, usar datos de prueba
      if (process.env.NODE_ENV === 'development') {
        setCartData({
          items: mockCart.items.map(item => ({
            id: item.product_id,
            name: item.data.name,
            price: parseFloat(item.data.price),
            quantity: item.quantity,
            weight: parseFloat(item.data.weight || 0),
            subtotal: parseFloat(item.line_total),
            images: item.data.images,
            variation: item.variation,
            variation_id: item.variation_id
          })),
          total: parseFloat(mockCart.totals.total_price),
          subtotal: parseFloat(mockCart.totals.total_items),
          shipping: parseFloat(mockCart.totals.total_shipping),
          weight: mockCart.items.reduce((total, item) => 
            total + (parseFloat(item.data.weight || 0) * item.quantity), 0),
          isLoading: false,
          error: null,
        });
        return;
      }

      // En producción, usar datos de la URL
      const params = new URLSearchParams(window.location.search);
      const encodedCart = params.get('cart');
      
      if (encodedCart) {
        const decodedCart = JSON.parse(atob(decodeURIComponent(encodedCart)));
        console.log('Cart data received:', decodedCart);

        setCartData({
          items: decodedCart.items.map(item => ({
            id: item.product_id,
            name: item.data.name,
            price: parseFloat(item.data.price),
            quantity: item.quantity,
            weight: parseFloat(item.data.weight || 0),
            subtotal: parseFloat(item.line_total),
            images: item.data.images,
            variation: item.variation,
            variation_id: item.variation_id
          })),
          total: parseFloat(decodedCart.totals.total_price),
          subtotal: parseFloat(decodedCart.totals.total_items),
          shipping: parseFloat(decodedCart.totals.total_shipping),
          weight: decodedCart.items.reduce((total, item) => 
            total + (parseFloat(item.data.weight || 0) * item.quantity), 0),
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error('No cart data found in URL');
      }
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
  }, []);

  // Función para actualizar la cantidad de un item
  const updateItemQuantity = (itemId, newQuantity) => {
    setCartData(prevData => ({
      ...prevData,
      items: prevData.items.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: item.price * newQuantity
            }
          : item
      ),
      // Recalcular totales
      subtotal: prevData.items.reduce((total, item) => 
        total + (item.id === itemId ? item.price * newQuantity : item.subtotal), 0),
      weight: prevData.items.reduce((total, item) => 
        total + (item.id === itemId ? item.weight * newQuantity : item.weight * item.quantity), 0)
    }));
  };

  // Función para eliminar un item
  const removeItem = (itemId) => {
    setCartData(prevData => ({
      ...prevData,
      items: prevData.items.filter(item => item.id !== itemId),
      // Recalcular totales
      subtotal: prevData.items.reduce((total, item) => 
        item.id !== itemId ? total + item.subtotal : total, 0),
      weight: prevData.items.reduce((total, item) => 
        item.id !== itemId ? total + (item.weight * item.quantity) : total, 0)
    }));
  };

  return {
    ...cartData,
    updateItemQuantity,
    removeItem
  };
};

export default useCartData;