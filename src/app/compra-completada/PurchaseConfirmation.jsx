import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function PurchaseConfirmation({ orderNumber }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#ffffff]">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <CheckCircle className="w-24 h-24 text-[#ffffff]" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#ffffff]"
      >
        ¡Gracias por tu compra!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-xl md:text-2xl text-[#ffffff] mb-6 text-center"
      >
        Tu pedido ha sido confirmado
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-lg text-[#ffffff]"
      >
        Número de orden: {orderNumber}
      </motion.div>
    </div>
  );
}

