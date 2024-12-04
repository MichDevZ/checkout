import { useState, useEffect } from 'react';

export default function PurchaseTicket({ orderData }) {
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Generar un número de orden aleatorio
    setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString());
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg shadow-2xl max-w-2xl mx-auto my-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">¡Gracias por tu compra!</h2>
        <p className="text-xl">Tu pedido ha sido confirmado</p>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-semibold">Número de Orden:</span>
          <span className="text-2xl font-bold">{orderNumber}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Detalles de envío:</h3>
            <p>{orderData.personalInfo.name}</p>
            <p>{orderData.shipping.address}</p>
            <p>{orderData.shipping.commune}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Método de pago:</h3>
            <p>{orderData.payment.method === 'credit_card' ? 'Tarjeta de Crédito' : 
               orderData.payment.method === 'debit_card' ? 'Tarjeta de Débito' : 'Transferencia Bancaria'}</p>
            {orderData.payment.method.includes('card') && (
              <p>**** **** **** {orderData.payment.number.slice(-4)}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Resumen de tu pedido:</h3>
        <div className="space-y-2">
          {orderData.items && orderData.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-white/40 mt-4 pt-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${orderData.cartTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío:</span>
            <span>${orderData.shipping.cost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-2">
            <span>Total:</span>
            <span>${(orderData.cartTotal + orderData.shipping.cost).toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-lg mb-2">¿Tienes alguna pregunta sobre tu pedido?</p>
        <p className="font-semibold">Contáctanos al +56 9 1234 5678</p>
      </div>
    </div>
  );
}

