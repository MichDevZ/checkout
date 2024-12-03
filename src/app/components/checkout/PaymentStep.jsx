'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function PaymentStep({ prevStep, updateOrderData, orderData }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors({});

    try {
      // Validar datos necesarios
      if (!orderData.personalInfo || !orderData.email || !orderData.shipping) {
        throw new Error('Faltan datos necesarios para continuar');
      }

      // Crear formulario oculto
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/checkout/'; // URL del checkout de WooCommerce
      form.target = '_parent'; // Importante: enviar al padre, no al iframe

      // Preparar todos los campos necesarios para WooCommerce
      const formFields = {
        // Datos de facturación
        'billing_first_name': orderData.personalInfo.name.split(' ')[0],
        'billing_last_name': orderData.personalInfo.name.split(' ').slice(1).join(' '),
        'billing_email': orderData.email,
        'billing_phone': orderData.personalInfo.phone,
        'billing_address_1': orderData.shipping.address,
        'billing_city': orderData.shipping.ws_comuna_name,
        'billing_state': orderData.shipping.ws_region_name,
        'billing_postcode': '',
        'billing_country': 'CL',

        // Datos de envío
        'shipping_first_name': orderData.personalInfo.name.split(' ')[0],
        'shipping_last_name': orderData.personalInfo.name.split(' ').slice(1).join(' '),
        'shipping_address_1': orderData.shipping.address,
        'shipping_city': orderData.shipping.ws_comuna_name,
        'shipping_state': orderData.shipping.ws_region_name,
        'shipping_postcode': '',
        'shipping_country': 'CL',

        // Datos adicionales
        'order_comments': '',
        'shipping_method[0]': 'flat_rate:1',
        '_wpnonce': window.parent.wc_checkout_params?.nonce || '',
        '_wp_http_referer': '/checkout/',
        
        // Indica que es un envío del formulario de checkout
        'woocommerce-process-checkout-nonce': window.parent.wc_checkout_params?.nonce || '',
      };

      // Agregar todos los campos al formulario
      Object.entries(formFields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value || '';
        form.appendChild(input);
      });

      // Agregar el formulario al documento y enviarlo
      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('Error al procesar el checkout:', error);
      setErrors({
        submit: error.message || 'Error al procesar la orden'
      });
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
        <h2 className="text-2xl font-bold text-[#222222]">Finalizar Compra</h2>
        <p className="text-[#222222] mt-2">
          Revisa tus datos y procede al pago
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#353535] p-6 rounded-lg space-y-4"
      >
        <h3 className="text-[#5da872] font-semibold text-lg mb-4">Confirma tus datos antes de proceder:</h3>
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
          {isProcessing ? 'Procesando...' : 'Proceder al pago'}
        </button>
      </motion.div>

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
    </motion.div>
  );
}