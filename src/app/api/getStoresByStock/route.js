import axios from "axios";
import { NextResponse } from "next/server";

const consumerKey = process.env.NEXT_PUBLIC_CUSTOMERKEY;
  const consumerSecret = process.env.NEXT_PUBLIC_CUSTOMERSECRET;
  const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');


  export async function POST(req) {

    const {IDs} = await req.json();

    console.log('Data:', IDs)

    if (!IDs) {
      return NextResponse.json({ error: 'El parámetro data es necesario.' }, { status: 400 });
    }

    try {
      console.log('try ÍDs', IDs)

    const keysToCheck = ['_stock_rondizzoni', '_stock_portugal', '_stock_quilicura'];

     const url = `https://www.cruzeirogomas.cl/wp-json/wc/v3/products?include[]=${IDs.join('&include[]=')}`

        const {data} = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`,
          },
        })


      
        const onlyMetadata = data.map(product => { 

            const metadata = product.meta_data.filter(meta => keysToCheck.includes(meta.key))

            return metadata
        }).flat()

        const keysWithEmptyValues = onlyMetadata.filter(item => item.value == '' 
                                                        || parseInt(item.value) === 0
        ).map(item => item.key)


        const filteredData = onlyMetadata.filter(item => !keysWithEmptyValues.includes(item.key));

        const uniqueData = filteredData.reduce((acc, current) => {
          if (!acc.some(item => item.key === current.key)) {
              acc.push(current); 
          }
          return acc;
      }, []);


        return NextResponse.json(uniqueData)

    } catch (error) {
        return NextResponse.json({message: 'Algo salió mal', status: 500})
    }


  }