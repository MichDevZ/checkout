'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PurchaseConfirmation from './PurchaseConfirmation';
import PurchaseDetails from './PurchaseDetails';

export default function CompraCompletada() {
  const [orderData, setOrderData] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // En una aplicación real, aquí obtendrías los datos de la orden desde el servidor
    const exampleOrderData = {
      orderNumber: '885078',
      personalInfo: { name: 'Juan Pérez' },
      shipping: { 
        address: 'Calle Ejemplo 123', 
        commune: 'Santiago', 
        cost: 5000 
      },
      payment: { 
        method: 'credit_card', 
        number: '************1234' 
      },
      cartTotal: 75000,
      items: [
        { name: 'Producto 1', quantity: 2, price: 19990 },
        { name: 'Producto 2', quantity: 1, price: 24990 },
      ]
    };
    setOrderData(exampleOrderData);

    // Mostrar el segundo paso después de 3 segundos
    const timer = setTimeout(() => {
      setStep(2);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!orderData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#397e4c] to-[#5da872] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <PurchaseConfirmation orderNumber={orderData.orderNumber} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PurchaseDetails orderData={orderData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

