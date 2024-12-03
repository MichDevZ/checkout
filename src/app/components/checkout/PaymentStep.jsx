'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function PaymentStep({ prevStep, updateOrderData, orderData }) {
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});

    try {
      // Validate necessary data
      if (!orderData.personalInfo || !orderData.email || !orderData.shipping) {
        throw new Error('Faltan datos necesarios para continuar');
      }

      // Prepare order data for WooCommerce
      const wooCommerceOrderData = {
        payment_method: paymentMethod,
        payment_method_title: paymentMethod === 'bank_transfer' ? 'Transferencia Bancaria' : 'Otro método',
        set_paid: false,
        billing: {
          first_name: orderData.personalInfo.name.split(' ')[0],
          last_name: orderData.personalInfo.name.split(' ').slice(1).join(' '),
          address_1: orderData.shipping.address,
          city: orderData.shipping.ws_comuna_name,
          state: orderData.shipping.ws_region_name,
          postcode: '',
          country: 'CL',
          email: orderData.email,
          phone: orderData.personalInfo.phone
        },
        shipping: {
          first_name: orderData.personalInfo.name.split(' ')[0],
          last_name: orderData.personalInfo.name.split(' ').slice(1).join(' '),
          address_1: orderData.shipping.address,
          city: orderData.shipping.ws_comuna_name,
          state: orderData.shipping.ws_region_name,
          postcode: '',
          country: 'CL'
        },
        line_items: orderData.cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        shipping_lines: [
          {
            method_id: 'flat_rate',
            method_title: 'Flat Rate',
            total: orderData.shipping.shipping_cost.toString()
          }
        ]
      };

      // Create order in WooCommerce
      const consumerKey = 'ck_ce0951a0005444315bfd95be50c8df3b3daa4f6';
      const consumerSecret = 'cs_4668827b7c781346252ec2b50a59cce1e6e60182';
      const credentials = btoa(`${consumerKey}:${consumerSecret}`);

      const response = await fetch('https://www.cruzeirogomas.cl/wp-json/wc/v3/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`
        },
        body: JSON.stringify(wooCommerceOrderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error creating order: ${response.status}`);
      }

      const createdOrder = await response.json();

      console.log('Order created successfully:', createdOrder);
      alert('¡Pedido creado con éxito! Número de orden: ' + createdOrder.id);
      // You might want to reset the cart or redirect to a thank you page here

    } catch (error) {
      console.error('Error creating order:', error);
      setErrors({
        submit: error.message || 'Error al procesar la orden'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#222222]">Método de Pago</h2>
        <p className="text-[#222222] mt-2">
          Estás a un paso de completar tu compra. Revisa los detalles de pago.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#353535] p-6 rounded-lg space-y-4"
      >
        <h3 className="text-[#5da872] font-semibold text-lg mb-4">Confirma tus datos antes de proceder al pago:</h3>
        <div className="space-y-2 text-[#ffffff]">
          <p><strong>Nombre:</strong> {orderData.personalInfo.name}</p>
          <p><strong>Email:</strong> {orderData.email}</p>
          <p><strong>Teléfono:</strong> {orderData.personalInfo.phone}</p>
          <p><strong>Dirección de envío:</strong> {orderData.shipping.address}, {orderData.shipping.ws_comuna_name}, {orderData.shipping.ws_region_name}</p>
          <p><strong>Método de envío:</strong> {orderData.shipping.type === 'delivery' ? 'Envío a domicilio' : 'Retiro en tienda'}</p>
          <p><strong>Costo de envío:</strong> ${orderData.shipping.shipping_cost.toLocaleString()}</p>
          <p><strong>Total del pedido:</strong> ${((orderData.cartTotal || 0) + (orderData.shipping.shipping_cost || 0)).toLocaleString()}</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-full bg-[#5da872] text-white px-4 py-2 rounded-lg hover:bg-[#4c9660] transition-colors mt-4 disabled:opacity-50"
        >
          {isProcessing ? 'Procesando...' : 'Confirmar datos y proceder al pago'}
        </button>
      </motion.div>

      <div className="bg-[#353535] p-4 rounded-lg">
        <div className="flex items-center space-x-2 text-[#5da872] mb-2">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-semibold">Resumen de tu compra</h3>
        </div>
        <div className="space-y-2 text-[#ffffff]">
          <p>Subtotal: ${orderData.cartTotal?.toLocaleString() || '0'}</p>
          <p>Envío: ${orderData.shipping?.shipping_cost?.toLocaleString() || '0'}</p>
          <p className="font-bold border-t border-[#5da872] pt-2 mt-2">
            Total: ${((orderData.cartTotal || 0) + (orderData.shipping?.shipping_cost || 0)).toLocaleString()}
          </p>
        </div>
      </div>

      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errors.submit}</span>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={prevStep}
          className="px-6 py-3 bg-[#397e4c] text-[#ffffff] rounded-lg hover:bg-[#5da872] disabled:opacity-50"
          disabled={isProcessing}
        >
          Revisar envío
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-[#353535] p-4 rounded-lg mt-6"
      >
        <div className="flex items-center space-x-2 text-[#5da872]">
          <AlertCircle className="w-5 h-5" />
          <h3 className="font-semibold">Pago Seguro</h3>
        </div>
        <p className="text-[#ffffff] mt-2">
          Tu información está protegida y tus datos están seguros.
        </p>
      </motion.div>
    </motion.div>
  );
}

