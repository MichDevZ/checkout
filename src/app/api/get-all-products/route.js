import { NextResponse } from 'next/server';
import axios from 'axios';

  export const dynamic = "force-dynamic"

  // WooCommerce credentials
  const consumerKey = process.env.NEXT_PUBLIC_CUSTOMERKEY;
  const consumerSecret = process.env.NEXT_PUBLIC_CUSTOMERSECRET;
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');



export async function GET(req) {  

    try {

        const {data} = await axios.get(
            `https://www.cruzeirogomas.cl/wp-json/wc/v3/products`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${credentials}`,
              },
            }
          );

          return NextResponse.json(data);

          
    } catch (error) {
        if (error.response) {
            console.error('WooCommerce API Error:', error.response.data);
            throw new Error(error.response.data.message || `Error getting products: ${error.response.status}`);
          } else if (error.request) {
            console.error('No response received from WooCommerce:', error.request);
            throw new Error('No response received from WooCommerce');
          } else {
            console.error('Error in request setup:', error.message);
            throw new Error(error.message);
          }
    }


}