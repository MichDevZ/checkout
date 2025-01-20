import { WebpayPlus } from 'transbank-sdk'; 
import { NextResponse } from 'next/server';
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'; 
import axios from 'axios';



const tx = new WebpayPlus.Transaction(new Options(process.env.Tbk_Api_Key_Id, process.env.Tbk_Api_Key_Secret, Environment.Production));
export async function POST(req) { 

    try {
        const { token } = await req.json();

       const response = await tx.commit(token);

        return NextResponse.json(response);
      } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }



}
