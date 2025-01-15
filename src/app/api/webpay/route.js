import { WebpayPlus } from 'transbank-sdk'; 
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'; 

const tx = new WebpayPlus.Transaction(new Options(process.env.Tbk_Api_Key_Id, process.env.Tbk_Api_Key_Secret, Environment.Production));

  

export async function POST(req) { 

  const buyOrder = uuidv4().replace(/-/g, '').slice(0, 16);

    try {
        const { amount, returnUrl } = await req.json();

    
        const sessionId = `${Date.now()}`;
        const response = await tx.create(buyOrder, sessionId, amount, returnUrl);

        return NextResponse.json(response);
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }



}