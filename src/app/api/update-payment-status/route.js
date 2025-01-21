import { NextResponse } from 'next/server';
import axios from 'axios';

  const consumerKey = process.env.NEXT_PUBLIC_CUSTOMERKEY;
  const consumerSecret = process.env.NEXT_PUBLIC_CUSTOMERSECRET;
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');


  const paymentTypeDescriptions = {
    VD: 'Débito',
    VN: 'Credito Normal',
    VC: 'Credito en Cuotas',
    SI: '3 Cuotas Sin Interés',
    S2: '2 Cuotas Sin Interés',
    NC: 'N Cuotas Sin Interés',
    VP: 'Venta Prepago',
  };



export async function PATCH(req) {  

    try {
      const {orderId, transactionData} = await req.json()

      if (!orderId) {
        return NextResponse.json({ error: 'El parámetro orderId es necesario.' }, { status: 400 });
      }


        const {data} = await axios.patch(
            `https://cruzeirogomas.cl/wp-json/wc/v3/orders/${orderId}`, {
                status: 'processing',
                meta_data: [
                  {key: '_transaction_status', value: 'Autorizada'},
                  {key: '_buy_order', value: generateWooCommerceID(orderId)},
                  {key: '_authorization_code', value: transactionData.authorization_code},
                  {key: '_card_number', value: transactionData.card_detail.card_number},
                  {key: '_payment_type', value: paymentTypeDescriptions[transactionData.payment_type_code]},
                  {key: '_amount', value: transactionData.amount},
                  {key: '_installments_number', value: transactionData.installments_number},
                  {key: '_transaction_date', value: transactionData.transaction_date},
                ]

            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${credentials}`,
              },
            }
          );

          return NextResponse.json("Ok");

          
    } catch (error) {
        if (error.response) {
            console.error('WooCommerce API Error:', error.response.data);
            throw new Error(error.response.data.message || `Error creating order: ${error.response.status}`);
          } else if (error.request) {
            console.error('No response received from WooCommerce:', error.request);
            throw new Error('No response received from WooCommerce');
          } else {
            console.error('Error in request setup:', error.message);
            throw new Error(error.message);
          }
    }


}




function generateWooCommerceID(orderId) {
  const uniqueString = crypto.getRandomValues(new Uint8Array(8))
      .reduce((acc, byte) => acc + byte.toString(16).padStart(2, '0'), '');
  return `wc:${uniqueString}:${orderId}`;

}


