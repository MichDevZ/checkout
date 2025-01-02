'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PurchaseConfirmation from './PurchaseConfirmation';
import PurchaseDetails from './PurchaseDetails';
import { getOrder } from '../../utils/getOrder' 
import { validatePayment } from '../../utils/validatePayment' 
import DeclinedPayment from '../components/payment/DeclinedPayment';
import LoadingSpinner from '../components/Ui/LoadingSpinner';

export default function CompraCompletada() {
  const [orderData, setOrderData] = useState(null);
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState();

  useEffect(() => {    

    getOrder(setOrderData);
    validatePayment(setPayment)


    const timer = setTimeout(() => {
      setStep(2);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  
  if (!orderData || !payment ) {
    
    return <LoadingSpinner isProccesing={true} />
  }
  
  if (payment.response_code != 0) {
    return <DeclinedPayment orderData={orderData} />
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
              <PurchaseConfirmation orderNumber={orderData.id} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PurchaseDetails orderData={orderData} payment={payment}  />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

