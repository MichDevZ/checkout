import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import Image from 'next/image';

const DeclinedPayment = ({orderData}) => {
  return (
    <>
    <div className="flex justify-center items-center min-h-screen">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#ffffff] to-[#f0f0f0] backdrop-blur-lg rounded-lg shadow-2xl overflow-hidden text-[#222222] max-w-2xl w-full mx-4"
    >
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "radial-gradient(circle, rgba(93,168,114,0.1) 0%, rgba(255,255,255,0) 70%)",
            "radial-gradient(circle, rgba(93,168,114,0.2) 0%, rgba(255,255,255,0) 70%)",
            "radial-gradient(circle, rgba(93,168,114,0.1) 0%, rgba(255,255,255,0) 70%)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="p-8 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Image
            src="/ogo_cruzeirogomas_mediano.png"
            alt="Cruzeiro Gomas Logo"
            width={150}
            height={75}
            objectFit="contain"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#397e4c]">Número de Orden:</h2>
            <span className="text-2xl text-[#397e4c]">{orderData.id}</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-[#c22c2c] text-white p-4 rounded-lg shadow-md flex items-center"
          >
            <XCircle  className="mr-3" size={24} />
            <span className="text-lg font-semibold">Compra rechazada, por favor consulte a su banco</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-lg mb-2">¿Tienes alguna pregunta sobre tu pedido?</p>
            <p className="font-semibold text-[#397e4c]">Contáctanos al +56 9 1234 5678</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  </div>
  </>
  )
}

export default DeclinedPayment
