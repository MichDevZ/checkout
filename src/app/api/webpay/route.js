import { WebpayPlus } from 'transbank-sdk'; 
import { NextResponse } from 'next/server';
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'; 

const tx = new WebpayPlus.Transaction(new Options('597051916610', 'f5858c5a-80f3-4407-b9fb-04d0ee2b9b91', Environment.Production));

  

export async function POST(req) { 

    try {
        const { amount, returnUrl } = await req.json();

    
        const sessionId = `${Date.now()}`;
        const response = await tx.create("cruzeiro-12983", sessionId, amount, returnUrl);

        return NextResponse.json(response);
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }



}